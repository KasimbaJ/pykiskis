import { RefreshCw } from 'lucide-react'

// Friendly fallback for React Router route errors — most commonly a failed
// dynamically-imported chunk right after a new deploy. Replaces React Router's
// developer-facing default page. (lazyWithReload in main.tsx already auto-reloads
// once on a chunk error; this covers the residual case.)
export default function RouteError() {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="max-w-sm text-center">
        <h1 className="text-xl font-bold text-slate-800 mb-2">Something went wrong</h1>
        <p className="text-sm text-slate-500 mb-4">
          This page didn&apos;t load. It can happen right after the app updates —
          reloading almost always fixes it.
        </p>
        <button
          onClick={() => window.location.reload()}
          className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 transition-colors"
        >
          <RefreshCw className="w-4 h-4" />
          Reload page
        </button>
      </div>
    </div>
  )
}
