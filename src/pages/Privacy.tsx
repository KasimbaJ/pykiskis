import LegalPage from '../components/LegalPage'

export default function Privacy() {
  return (
    <LegalPage title="Privacy Policy" updated="8 July 2026">
      <p>
        Pykiškis is a browser-based Python learning tool used in the classroom. This
        policy explains what information we hold, why, and the choices you have. It is
        written in plain language; if anything is unclear, please ask your teacher.
      </p>

      <h2>Who is responsible for your data</h2>
      <p>
        Pykiškis is provided to students through their school. The school (acting through
        the teacher) decides which students use it and is the data controller for
        students&apos; learning records. Pykiškis processes that data on the school&apos;s behalf.
      </p>

      <h2>What we collect</h2>
      <ul>
        <li>
          <strong>Account details</strong> — your name (or username) and email address,
          handled by our sign-in provider, Clerk, when you create an account.
        </li>
        <li>
          <strong>Learning progress</strong> — which lessons you complete, your quiz and
          test scores, the code you submit in exercises, and your practice streak.
        </li>
        <li>
          <strong>Basic technical data</strong> — if the app crashes, we log the error
          (page and browser) to help us fix it. We do not use advertising or third-party
          tracking, and we never sell your data.
        </li>
      </ul>

      <h2>Where it is stored</h2>
      <p>
        Learning data is stored in a Cloudflare D1 database hosted in the European Union.
        Sign-in is handled by Clerk. Both are established providers with their own security
        and privacy protections.
      </p>

      <h2>Cookies</h2>
      <p>
        We use only the essential cookies our sign-in provider needs to keep you securely
        logged in. We do not use advertising or analytics cookies.
      </p>

      <h2>How long we keep it</h2>
      <p>
        We keep your learning records while you are an active student. A teacher can remove
        a student, which deletes that student&apos;s progress and test scores from our database.
      </p>

      <h2>Your rights</h2>
      <p>
        Under data-protection law (including the GDPR) you can ask to see the data we hold
        about you, correct it, or have it deleted. Please make these requests through your
        teacher or school, who can action them or pass them to us.
      </p>

      <h2>Changes</h2>
      <p>
        We may update this policy as the service evolves; the date above shows when it last
        changed.
      </p>
    </LegalPage>
  )
}
