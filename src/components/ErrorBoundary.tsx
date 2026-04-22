import { Component, type ReactNode } from 'react'
import { RefreshCw } from 'lucide-react'

interface Props { children: ReactNode }
interface State { hasError: boolean; message: string }

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false, message: '' }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, message: error.message }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
          <div className="max-w-sm text-center">
            <h1 className="text-xl font-bold text-slate-800 mb-2">
              Something went wrong
            </h1>
            {this.state.message && (
              <p className="text-sm text-slate-500 font-mono bg-slate-100 rounded p-3 mb-4 text-left break-all">
                {this.state.message}
              </p>
            )}
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
    return this.props.children
  }
}
