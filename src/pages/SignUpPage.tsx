import { SignUp } from '@clerk/clerk-react'
import AuthLayout from '../components/auth/AuthLayout'

export default function SignUpPage() {
  return (
    <AuthLayout mode="signup">
      <SignUp
        routing="path"
        path="/sign-up"
        signInUrl="/sign-in"
        fallbackRedirectUrl="/"
        appearance={{
          elements: {
            card: 'shadow-none border-0 bg-transparent',
            rootBox: 'w-full',
            cardBox: 'w-full',
            formButtonPrimary:
              'bg-blue-600 hover:bg-blue-700 text-sm normal-case font-medium',
          },
        }}
      />
    </AuthLayout>
  )
}
