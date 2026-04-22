import { useState, useCallback, useRef, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import CodeMirror from '@uiw/react-codemirror'
import { python } from '@codemirror/lang-python'
import { oneDark } from '@codemirror/theme-one-dark'
import {
  Play, Share2, RotateCcw, ChevronDown,
  Loader2, Check, Terminal, ChevronRight,
} from 'lucide-react'
import Header from '../components/layout/Header'
import { runPython, provideInput, setInputRequestHandler } from '../services/pythonRunner'
import { usePyodide } from '../hooks/usePyodide'

interface PendingInput {
  prompt: string
  partialOutput: string
}

// ── Example snippets ───────────────────────────────────────────
interface Example {
  label: string
  code: string
  stdin?: string
}

const EXAMPLES: Example[] = [
  {
    label: 'Hello World',
    code: `# Classic first program
print("Hello, World!")
print("Welcome to Python! 🐍")`,
  },
  {
    label: 'Calculator',
    code: `# Simple calculator
a, b = 15, 4

print(f"{a} + {b} = {a + b}")
print(f"{a} - {b} = {a - b}")
print(f"{a} * {b} = {a * b}")
print(f"{a} / {b} = {a / b:.2f}")
print(f"{a} // {b} = {a // b}")
print(f"{a} % {b} = {a % b}")
print(f"{a} ** {b} = {a ** b}")`,
  },
  {
    label: 'Fibonacci',
    code: `# Fibonacci sequence
def fibonacci(n):
    a, b = 0, 1
    sequence = []
    for _ in range(n):
        sequence.append(a)
        a, b = b, a + b
    return sequence

fib = fibonacci(10)
print("First 10 Fibonacci numbers:")
print(fib)
print(f"Sum: {sum(fib)}")`,
  },
  {
    label: 'Lists & Loops',
    code: `# Working with lists
fruits = ["apple", "banana", "cherry", "date", "elderberry"]

print("All fruits:")
for i, fruit in enumerate(fruits, 1):
    print(f"  {i}. {fruit.capitalize()}")

# List comprehension
long_fruits = [f.upper() for f in fruits if len(f) > 5]
print(f"\\nFruits with more than 5 letters:")
print(long_fruits)`,
  },
  {
    label: 'Dictionaries',
    code: `# Grade book
grades = {
    "Alice": 92,
    "Bob": 78,
    "Charlie": 85,
    "Diana": 96,
    "Eve": 71,
}

print("Grade Report (ranked):")
for name, score in sorted(grades.items(), key=lambda x: -x[1]):
    letter = "A" if score >= 90 else "B" if score >= 80 else "C"
    print(f"  {name:10s}: {score}  ({letter})")

avg = sum(grades.values()) / len(grades)
print(f"\\nClass average: {avg:.1f}")`,
  },
  {
    label: 'Classes (OOP)',
    code: `# Object-Oriented Python
class Animal:
    def __init__(self, name, sound):
        self.name = name
        self.sound = sound

    def speak(self):
        return f"{self.name} says {self.sound}!"

class Dog(Animal):
    def __init__(self, name):
        super().__init__(name, "Woof")

    def fetch(self, item):
        return f"{self.name} fetches the {item}!"

dog = Dog("Buddy")
print(dog.speak())
print(dog.fetch("ball"))
print(f"Is a Dog?    {isinstance(dog, Dog)}")
print(f"Is an Animal? {isinstance(dog, Animal)}")`,
  },
  {
    label: 'User Input',
    code: `# Reading user input
name = input("Enter your name: ")
age  = int(input("Enter your age: "))

print(f"\\nHello, {name}!")
print(f"You are {age} years old.")

if age >= 18:
    print("You are an adult.")
else:
    print(f"You'll be an adult in {18 - age} year(s).")`,
    stdin: 'Alice\n20',
  },
  {
    label: 'Error Handling',
    code: `# try / except / finally
def safe_divide(a, b):
    try:
        result = a / b
        print(f"{a} / {b} = {result:.2f}")
    except ZeroDivisionError:
        print(f"Error: cannot divide {a} by zero!")
    except TypeError as e:
        print(f"Type error: {e}")
    finally:
        print("---")

safe_divide(10, 2)
safe_divide(7, 0)
safe_divide(5, "x")`,
  },
]

const DEFAULT_CODE = EXAMPLES[0].code

// ── Component ──────────────────────────────────────────────────
export default function PlaygroundPage() {
  const [searchParams] = useSearchParams()
  const { isLoading: pyodideLoading, progress } = usePyodide()
  const examplesRef = useRef<HTMLDivElement>(null)

  const [code, setCode] = useState<string>(
    () => searchParams.get('code') ?? DEFAULT_CODE,
  )
  const [stdin, setStdin]           = useState('')
  const [showStdin, setShowStdin]   = useState(false)
  const [output, setOutput]         = useState('')
  const [outputError, setOutputError] = useState('')
  const [hasRun, setHasRun]         = useState(false)
  const [isRunning, setIsRunning]   = useState(false)
  const [copied, setCopied]           = useState(false)
  const [showExamples, setShowExamples] = useState(false)
  const [pendingInput, setPendingInput] = useState<PendingInput | null>(null)
  const playgroundInputRef = useRef<HTMLInputElement>(null)

  // Close examples dropdown on outside click
  useEffect(() => {
    function handleOutside(e: MouseEvent) {
      if (examplesRef.current && !examplesRef.current.contains(e.target as Node)) {
        setShowExamples(false)
      }
    }
    document.addEventListener('mousedown', handleOutside)
    return () => document.removeEventListener('mousedown', handleOutside)
  }, [])

  // Auto-focus the inline input field when a prompt arrives
  useEffect(() => {
    if (pendingInput) playgroundInputRef.current?.focus()
  }, [pendingInput])

  const handleRun = useCallback(async () => {
    if (isRunning || pyodideLoading) return
    setIsRunning(true)
    setOutput('')
    setOutputError('')
    setHasRun(true)
    setPendingInput(null)

    // Register input handler — fires when Python calls input()
    setInputRequestHandler((prompt, partialOutput) => {
      setPendingInput({ prompt, partialOutput })
    })

    const inputValues = stdin.split('\n').filter((l) => l.trim() !== '')
    const result = await runPython(code, inputValues)

    setInputRequestHandler(null)
    setPendingInput(null)
    setOutput(result.output)
    setOutputError(result.error ?? '')
    setIsRunning(false)
  }, [code, stdin, isRunning, pyodideLoading])

  const handleReset = useCallback(() => {
    setCode(DEFAULT_CODE)
    setStdin('')
    setOutput('')
    setOutputError('')
    setHasRun(false)
    setShowStdin(false)
  }, [])

  const handleShare = useCallback(async () => {
    const params = new URLSearchParams({ code })
    const url = `${window.location.origin}/playground?${params.toString()}`
    await navigator.clipboard.writeText(url)
    setCopied(true)
    setTimeout(() => setCopied(false), 2500)
  }, [code])

  const loadExample = useCallback((ex: Example) => {
    setCode(ex.code)
    setStdin(ex.stdin ?? '')
    setOutput('')
    setOutputError('')
    setHasRun(false)
    setShowExamples(false)
    if (ex.stdin) setShowStdin(true)
  }, [])

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col">
      <Header />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-4 flex flex-col gap-4">

        {/* ── Toolbar ── */}
        <div className="flex items-center gap-3 flex-wrap shrink-0">
          <div className="flex items-center gap-2">
            <Terminal className="w-5 h-5 text-blue-400" />
            <h1 className="text-lg font-bold text-white">Python Playground</h1>
            <span className="hidden sm:inline text-xs text-slate-500 ml-1">
              — write and run any Python code
            </span>
          </div>

          {/* Examples dropdown */}
          <div className="relative" ref={examplesRef}>
            <button
              onClick={() => setShowExamples((v) => !v)}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-700 text-slate-200 rounded-lg text-sm hover:bg-slate-600 transition-colors"
            >
              <ChevronDown className="w-3.5 h-3.5" />
              Examples
            </button>
            {showExamples && (
              <div className="absolute left-0 top-full mt-1 bg-white rounded-xl shadow-2xl z-50 min-w-[180px] py-1 border border-slate-100 overflow-hidden">
                {EXAMPLES.map((ex) => (
                  <button
                    key={ex.label}
                    onClick={() => loadExample(ex)}
                    className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-blue-50 hover:text-blue-700 transition-colors"
                  >
                    {ex.label}
                    {ex.stdin && (
                      <span className="ml-2 text-xs text-slate-400">(uses input)</span>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="flex-1" />

          {/* Run */}
          <button
            onClick={handleRun}
            disabled={isRunning || pyodideLoading}
            className="flex items-center gap-2 px-4 py-1.5 bg-green-500 text-white rounded-lg text-sm font-semibold hover:bg-green-600 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            {isRunning
              ? <Loader2 className="w-4 h-4 animate-spin" />
              : <Play className="w-4 h-4" />}
            Run
          </button>

          {/* Share */}
          <button
            onClick={handleShare}
            className="flex items-center gap-2 px-3 py-1.5 bg-slate-700 text-slate-200 rounded-lg text-sm hover:bg-slate-600 transition-colors"
          >
            {copied
              ? <Check className="w-4 h-4 text-green-400" />
              : <Share2 className="w-4 h-4" />}
            {copied ? 'Copied!' : 'Share'}
          </button>

          {/* Reset */}
          <button
            onClick={handleReset}
            className="flex items-center gap-2 px-3 py-1.5 bg-slate-700 text-slate-200 rounded-lg text-sm hover:bg-slate-600 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reset
          </button>
        </div>

        {/* ── Pyodide loading bar ── */}
        {pyodideLoading && (
          <div className="bg-slate-800 border border-slate-700 rounded-lg p-3 shrink-0">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-blue-400 flex items-center gap-1.5">
                <Loader2 className="w-3 h-3 animate-spin" />
                {progress.message}
              </span>
              <span className="text-xs text-slate-500 tabular-nums">{progress.pct}%</span>
            </div>
            <div className="w-full bg-slate-700 rounded-full h-1 overflow-hidden">
              <div
                className="bg-blue-500 h-full rounded-full transition-all duration-500 ease-out"
                style={{ width: `${progress.pct}%` }}
              />
            </div>
          </div>
        )}

        {/* ── Editor + Output ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

          {/* Left: editor */}
          <div className="flex flex-col rounded-xl overflow-hidden border border-slate-700">
            <div className="bg-slate-800 px-4 py-2.5 flex items-center gap-2 shrink-0">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
              </div>
              <span className="text-slate-400 text-sm ml-2">main.py</span>
            </div>
            <CodeMirror
              value={code}
              onChange={(val) => setCode(val)}
              extensions={[python()]}
              theme={oneDark}
              height="min(520px, 55vh)"
              basicSetup={{
                lineNumbers: true,
                highlightActiveLineGutter: true,
                foldGutter: false,
                tabSize: 4,
              }}
            />
          </div>

          {/* Right: stdin + output */}
          <div className="flex flex-col gap-3">

            {/* Stdin (collapsible) */}
            <div className="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden">
              <button
                onClick={() => setShowStdin((v) => !v)}
                className="w-full flex items-center justify-between px-4 py-2.5 text-sm text-slate-300 hover:text-white hover:bg-slate-700/50 transition-colors"
              >
                <span className="flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-slate-400" />
                  Standard Input (stdin)
                  {stdin.trim() && (
                    <span className="w-2 h-2 rounded-full bg-blue-400 flex-shrink-0" />
                  )}
                </span>
                <ChevronRight
                  className={`w-4 h-4 text-slate-400 transition-transform duration-150 ${showStdin ? 'rotate-90' : ''}`}
                />
              </button>
              {showStdin && (
                <textarea
                  value={stdin}
                  onChange={(e) => setStdin(e.target.value)}
                  placeholder={"One value per line (for input() calls)\ne.g.\nAlice\n25"}
                  rows={4}
                  spellCheck={false}
                  className="w-full bg-slate-900 text-slate-200 text-sm font-mono px-4 py-3 resize-y border-t border-slate-700 focus:outline-none placeholder:text-slate-600"
                />
              )}
            </div>

            {/* Output */}
            <div
              className="flex flex-col rounded-xl border border-slate-700 overflow-hidden"
              style={{ minHeight: 'min(432px, 45vh)' }}
            >
              <div className="bg-slate-800 px-4 py-2.5 flex items-center justify-between shrink-0">
                <span className="text-slate-400 text-sm flex items-center gap-2">
                  <Terminal className="w-3.5 h-3.5" />
                  Output
                  {pendingInput && (
                    <span className="text-yellow-400 text-xs animate-pulse">waiting for input…</span>
                  )}
                </span>
                {hasRun && (output || outputError) && (
                  <button
                    onClick={() => { setOutput(''); setOutputError(''); setHasRun(false) }}
                    className="text-xs text-slate-500 hover:text-slate-300 transition-colors"
                  >
                    Clear
                  </button>
                )}
              </div>

              <div className="flex-1 bg-slate-950 p-4 overflow-auto font-mono text-sm leading-relaxed">
                {/* ── Waiting for input() ── */}
                {pendingInput ? (
                  <div>
                    {pendingInput.partialOutput && (
                      <pre className="text-green-400 whitespace-pre-wrap">{pendingInput.partialOutput}</pre>
                    )}
                    <div className="flex items-baseline mt-0.5">
                      <span className="text-green-400 whitespace-pre">{pendingInput.prompt}</span>
                      <input
                        ref={playgroundInputRef}
                        type="text"
                        spellCheck={false}
                        onKeyDown={(e) => {
                          if (e.key !== 'Enter') return
                          provideInput(e.currentTarget.value)
                          setPendingInput(null)
                        }}
                        className="flex-1 min-w-0 bg-transparent text-yellow-300 outline-none caret-yellow-300 ml-0.5"
                      />
                    </div>
                    <p className="text-slate-600 text-xs mt-2">Press Enter to submit</p>
                  </div>
                ) : !hasRun && !isRunning ? (
                  <p className="text-slate-600 italic select-none">
                    Click{' '}
                    <span className="text-green-500 not-italic font-medium">Run</span>
                    {' '}to see output here…
                  </p>
                ) : isRunning ? (
                  <span className="text-slate-500 flex items-center gap-2">
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    Executing…
                  </span>
                ) : hasRun && !output && !outputError ? (
                  <p className="text-slate-500 italic">No output produced.</p>
                ) : (
                  <>
                    {output && <pre className="text-green-400 whitespace-pre-wrap">{output}</pre>}
                    {outputError && <pre className="text-red-400 whitespace-pre-wrap mt-2">{outputError}</pre>}
                  </>
                )}
              </div>
            </div>

          </div>
        </div>

      </main>
    </div>
  )
}
