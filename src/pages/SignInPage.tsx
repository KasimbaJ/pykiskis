import { SignIn } from '@clerk/clerk-react'
import AuthLayout from '../components/auth/AuthLayout'

export default function SignInPage() {
  return (
    <AuthLayout mode="signin">
      <SignIn
        routing="path"
        path="/sign-in"
        signUpUrl="/sign-up"
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
