// Clerk JWT verification using Web Crypto (no packages required)
const CLERK_DOMAIN = 'https://nice-redbird-5.clerk.accounts.dev'
const JWKS_URL = `${CLERK_DOMAIN}/.well-known/jwks.json`

function b64urlDecode(str: string): string {
  const s = str.replace(/-/g, '+').replace(/_/g, '/')
  return atob(s + '='.repeat((4 - (s.length % 4)) % 4))
}

function b64urlToBytes(str: string): Uint8Array {
  return Uint8Array.from(b64urlDecode(str), (c) => c.charCodeAt(0))
}

export interface ClerkPayload {
  sub: string
  exp: number
  iat: number
  iss?: string
  azp?: string
  /**
   * Role claim, present when the Clerk session token is customised to include
   *   { "role": "{{user.public_metadata.role}}" }
   * (Clerk Dashboard → Sessions → Customize session token).  When present it
   * lets verifyTeacher skip a REST round-trip.  Absent tokens fall back to REST.
   */
  role?: string
}

/**
 * Verify a token AND confirm the user has the `teacher` role.
 *
 * Fast path: if the session token carries a `role` claim (see ClerkPayload.role)
 * we trust it — the JWT is already signature-verified, so the claim is as
 * trustworthy as `sub`, and we avoid a Clerk API call on every teacher request.
 *
 * Fallback: tokens minted before the claim was configured have no `role`, so we
 * look the user up via the Clerk REST API (the original behaviour).  This makes
 * the change safe to deploy BEFORE the dashboard claim is added — nothing breaks
 * in the interim; it just keeps paying the REST cost until the claim is live.
 *
 * Returns the payload for a teacher, else null.
 */
export async function verifyTeacher(
  token: string | undefined,
  clerkSecretKey: string,
): Promise<ClerkPayload | null> {
  if (!token) return null
  const payload = await verifyClerkToken(token)
  if (!payload) return null

  // Fast path — trust the signed role claim when it's present.
  if (typeof payload.role === 'string') {
    return payload.role === 'teacher' ? payload : null
  }

  // Fallback — no claim on this token; ask Clerk.
  const res = await fetch(`https://api.clerk.com/v1/users/${payload.sub}`, {
    headers: { Authorization: `Bearer ${clerkSecretKey}` },
  })
  if (!res.ok) return null
  const user = (await res.json()) as { public_metadata?: { role?: string } }
  return user.public_metadata?.role === 'teacher' ? payload : null
}

// JWKS cache — Clerk's signing keys rotate rarely, so caching them at module
// scope (persists across requests on a warm worker) removes a fetch from every
// authenticated request and a hard dependency on Clerk being reachable per call.
let jwksCache: { keys: JsonWebKey[]; fetchedAt: number } | null = null
const JWKS_TTL_MS = 60 * 60 * 1000 // 1 hour

async function getJwks(forceRefresh = false): Promise<JsonWebKey[] | null> {
  const now = Date.now()
  if (!forceRefresh && jwksCache && now - jwksCache.fetchedAt < JWKS_TTL_MS) {
    return jwksCache.keys
  }
  const res = await fetch(JWKS_URL)
  if (!res.ok) return jwksCache?.keys ?? null // keep stale keys if Clerk blips
  const { keys } = (await res.json()) as { keys: JsonWebKey[] }
  jwksCache = { keys, fetchedAt: now }
  return keys
}

export async function verifyClerkToken(token: string): Promise<ClerkPayload | null> {
  try {
    const parts = token.split('.')
    if (parts.length !== 3) return null
    const [h, p, s] = parts

    const header = JSON.parse(b64urlDecode(h)) as { kid?: string; alg?: string }

    // Require RS256 explicitly (reject "none"/HS256/absent alg).
    if (header.alg !== 'RS256' || !header.kid) return null

    // Look up the signing key; if the kid isn't in the cache (key rotation),
    // refresh the JWKS once and try again.
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const findKid = (keys: JsonWebKey[]) => keys.find((k) => (k as any).kid === header.kid)
    let keys = await getJwks()
    if (!keys) return null
    let jwk = findKid(keys)
    if (!jwk) {
      keys = await getJwks(true)
      if (!keys) return null
      jwk = findKid(keys)
    }
    if (!jwk) return null

    const publicKey = await crypto.subtle.importKey(
      'jwk',
      jwk,
      { name: 'RSASSA-PKCS1-v1_5', hash: 'SHA-256' },
      false,
      ['verify'],
    )

    const isValid = await crypto.subtle.verify(
      'RSASSA-PKCS1-v1_5',
      publicKey,
      b64urlToBytes(s),
      new TextEncoder().encode(`${h}.${p}`),
    )
    if (!isValid) return null

    const payload = JSON.parse(b64urlDecode(p)) as ClerkPayload

    // Validate expiry
    if (payload.exp < Date.now() / 1000) return null

    // Validate issuer — must be present AND originate from our Clerk instance
    if (payload.iss !== CLERK_DOMAIN) return null

    return payload
  } catch {
    return null
  }
}
