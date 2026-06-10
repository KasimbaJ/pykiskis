import { useState } from 'react'
import { useAuth } from '@clerk/clerk-react'
import { Plus, X, Loader2, Users } from 'lucide-react'
import type { StudentProgress } from '../../types'
import { useClassesStore } from '../../stores/useClassesStore'

interface Props {
  students: StudentProgress[]
  onClose: () => void
}

// ─────────────────────────────────────────────────────────────────────────────
// ClassManager — create classes and assign students to them. Membership toggles
// persist immediately via the class-members API.
// ─────────────────────────────────────────────────────────────────────────────

export default function ClassManager({ students, onClose }: Props) {
  const { getToken } = useAuth()
  const classes = useClassesStore((s) => s.classes)
  const createClass = useClassesStore((s) => s.create)
  const setMembers = useClassesStore((s) => s.setMembers)

  const [newName, setNewName] = useState('')
  const [creating, setCreating] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(classes[0]?.id ?? null)
  const [busyUser, setBusyUser] = useState<string | null>(null)

  const editing = classes.find((c) => c.id === editingId) ?? null

  const create = async () => {
    const name = newName.trim()
    if (!name || creating) return
    setCreating(true)
    try {
      const token = await getToken()
      if (token) await createClass(token, name)
      setNewName('')
    } finally {
      setCreating(false)
    }
  }

  const toggleMember = async (userId: string, isMember: boolean) => {
    if (!editing || busyUser) return
    setBusyUser(userId)
    try {
      const token = await getToken()
      if (token) {
        await setMembers(token, editing.id, isMember ? { remove: [userId] } : { add: [userId] })
      }
    } finally {
      setBusyUser(null)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-4" onClick={onClose}>
      <div
        className="bg-white rounded-xl border border-slate-200 shadow-xl w-full max-w-lg max-h-[85vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-5 py-3 border-b border-slate-200">
          <h3 className="font-bold text-slate-800 flex items-center gap-2">
            <Users className="w-4 h-4 text-blue-600" /> Manage Classes
          </h3>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-5 space-y-4 overflow-y-auto">
          {/* Create a class */}
          <div className="flex gap-2">
            <input
              type="text"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && create()}
              placeholder="New class name (e.g. 8A Python)"
              className="flex-1 rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={create}
              disabled={!newName.trim() || creating}
              className="inline-flex items-center gap-1 px-3 py-2 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 disabled:opacity-50"
            >
              {creating ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
              Create
            </button>
          </div>

          {classes.length === 0 ? (
            <p className="text-sm text-slate-400 text-center py-6">
              No classes yet. Create one above, then assign students.
            </p>
          ) : (
            <>
              {/* Pick a class to edit */}
              <div className="flex flex-wrap gap-2">
                {classes.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => setEditingId(c.id)}
                    className={`px-3 py-1.5 rounded-full text-sm font-medium border ${
                      editingId === c.id
                        ? 'bg-blue-600 text-white border-blue-600'
                        : 'bg-white text-slate-600 border-slate-200 hover:border-blue-300'
                    }`}
                  >
                    {c.name} <span className="opacity-70">({c.memberIds.length})</span>
                  </button>
                ))}
              </div>

              {/* Assign students to the selected class */}
              {editing && (
                <div className="border border-slate-200 rounded-lg divide-y divide-slate-100 max-h-64 overflow-y-auto">
                  {students.map((s) => {
                    const isMember = editing.memberIds.includes(s.userId)
                    return (
                      <label
                        key={s.userId}
                        className="flex items-center gap-3 px-3 py-2 text-sm cursor-pointer hover:bg-slate-50"
                      >
                        <input
                          type="checkbox"
                          checked={isMember}
                          disabled={busyUser === s.userId}
                          onChange={() => toggleMember(s.userId, isMember)}
                          className="accent-blue-600"
                        />
                        <span className="text-slate-700">{s.studentName}</span>
                        {busyUser === s.userId && <Loader2 className="w-3 h-3 animate-spin text-slate-400" />}
                      </label>
                    )
                  })}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}
