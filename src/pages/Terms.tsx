import LegalPage from '../components/LegalPage'

export default function Terms() {
  return (
    <LegalPage title="Terms of Use" updated="8 July 2026">
      <p>
        These terms cover how Pykiškis, a browser-based Python learning tool, may be used.
        By using it you agree to them. If you are a student, your school provides Pykiškis
        to you for learning.
      </p>

      <h2>Using Pykiškis</h2>
      <ul>
        <li>Pykiškis is for learning to program. Please use it for that purpose.</li>
        <li>
          The in-browser code editor runs your Python safely inside your own browser. Do
          not attempt to misuse it to disrupt the service, or to harm other people, systems,
          or data.
        </li>
        <li>Keep your account details to yourself and do not sign in as anyone else.</li>
      </ul>

      <h2>Accounts</h2>
      <p>
        Accounts are created and managed through your school. Your teacher can add or remove
        students and can see class progress and test results to support your learning.
      </p>

      <h2>Your work</h2>
      <p>
        The code and answers you write remain yours. We store them only to show your progress
        and results to you and your teacher.
      </p>

      <h2>Availability and warranty</h2>
      <p>
        Pykiškis is offered free of charge, as-is, for educational use. We work to keep it
        running smoothly but cannot guarantee it will always be available or error-free, and
        we are not liable for any loss arising from its use to the extent the law allows.
      </p>

      <h2>Changes</h2>
      <p>
        We may update the service and these terms over time; the date above shows when they
        last changed.
      </p>
    </LegalPage>
  )
}
