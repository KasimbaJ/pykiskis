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
}

export async function verifyClerkToken(token: string): Promise<ClerkPayload | null> {
  try {
    const parts = token.split('.')
    if (parts.length !== 3) return null
    const [h, p, s] = parts

    const header = JSON.parse(b64urlDecode(h)) as { kid?: string; alg?: string }

    // Only accept RS256 tokens
    if (header.alg && header.alg !== 'RS256') return null

    const jwksRes = await fetch(JWKS_URL)
    if (!jwksRes.ok) return null
    const { keys } = (await jwksRes.json()) as { keys: JsonWebKey[] }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const jwk = keys.find((k) => (k as any).kid === header.kid)
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

    // Validate issuer — must originate from our Clerk instance
    if (payload.iss && payload.iss !== CLERK_DOMAIN) return null

    return payload
  } catch {
    return null
  }
}
