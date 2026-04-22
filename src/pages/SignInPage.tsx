import { SignIn } from '@clerk/clerk-react'
import { Code2 } from 'lucide-react'

export default function SignInPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-slate-100 flex flex-col items-center justify-center p-4 gap-6">
      <div className="flex items-center gap-2">
        <Code2 className="w-8 h-8 text-blue-600" />
        <span className="text-2xl font-bold text-slate-800">Pykiškis</span>
      </div>
      <SignIn
        routing="path"
        path="/sign-in"
        signUpUrl="/sign-up"
        fallbackRedirectUrl="/"
      />
    </div>
  )
}
