import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'

// Shared shell for the public /privacy and /terms pages.
export default function LegalPage({
  title,
  updated,
  children,
}: {
  title: string
  updated: string
  children: ReactNode
}) {
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-2xl mx-auto px-6 py-12">
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-blue-600 mb-8"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Pykiškis
        </Link>

        <h1 className="text-3xl font-bold text-slate-900 mb-1">{title}</h1>
        <p className="text-sm text-slate-400 mb-8">Last updated: {updated}</p>

        <div className="space-y-4 text-[15px] leading-relaxed text-slate-700 [&_h2]:text-lg [&_h2]:font-bold [&_h2]:text-slate-900 [&_h2]:mt-8 [&_h2]:mb-1 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-1 [&_a]:text-blue-600 [&_a]:underline-offset-2 hover:[&_a]:underline">
          {children}
        </div>

        <div className="mt-12 pt-6 border-t border-slate-200 text-sm text-slate-400">
          <Link to="/privacy" className="hover:text-blue-600">Privacy Policy</Link>
          <span className="mx-2">·</span>
          <Link to="/terms" className="hover:text-blue-600">Terms of Use</Link>
        </div>
      </div>
    </div>
  )
}
