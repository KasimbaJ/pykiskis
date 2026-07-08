import { Link } from 'react-router-dom'
import { Home } from 'lucide-react'

// Branded catch-all for unknown URLs — replaces the router's bare fallback.
export default function NotFound() {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="max-w-sm text-center">
        <p className="text-5xl font-bold text-blue-600 mb-2">404</p>
        <h1 className="text-xl font-bold text-slate-800 mb-2">Page not found</h1>
        <p className="text-sm text-slate-500 mb-5">
          The page you were looking for doesn&apos;t exist or has moved.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 transition-colors"
        >
          <Home className="w-4 h-4" />
          Back to home
        </Link>
      </div>
    </div>
  )
}
