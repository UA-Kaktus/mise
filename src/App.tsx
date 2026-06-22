import { useState } from 'react'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-slate-50 text-slate-900">
      <h1 className="text-4xl font-bold tracking-tight">Mise</h1>
      <p className="text-slate-500">
        Household meal planning — Tailwind v4 підключено ✅
      </p>
      <button
        type="button"
        onClick={() => setCount((c) => c + 1)}
        className="rounded-lg bg-emerald-600 px-5 py-2.5 font-medium text-white transition-colors hover:bg-emerald-700 focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:outline-none"
      >
        count is {count}
      </button>
    </div>
  )
}

export default App
