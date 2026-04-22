import { create } from 'zustand'

export interface PendingInput {
  prompt: string
  partialOutput: string
}

interface EditorState {
  code: string;
  output: string;
  error: string | null;
  isRunning: boolean;
  showHints: boolean;
  showSolution: boolean;
  currentHintIndex: number;
  feedbackType: 'success' | 'error' | null;
  pendingInput: PendingInput | null;

  setCode: (code: string) => void;
  setOutput: (output: string) => void;
  setError: (error: string | null) => void;
  setIsRunning: (running: boolean) => void;
  toggleHints: () => void;
  showNextHint: () => void;
  setShowSolution: (show: boolean) => void;
  setFeedbackType: (type: 'success' | 'error' | null) => void;
  setPendingInput: (input: PendingInput | null) => void;
  resetEditor: (starterCode: string) => void;
}

export const useEditorStore = create<EditorState>((set, get) => ({
  code: '',
  output: '',
  error: null,
  isRunning: false,
  showHints: false,
  showSolution: false,
  currentHintIndex: 0,
  feedbackType: null,
  pendingInput: null,

  setCode: (code) => set({ code }),
  setOutput: (output) => set({ output }),
  setError: (error) => set({ error }),
  setIsRunning: (isRunning) => set({ isRunning }),
  toggleHints: () => set((s) => ({ showHints: !s.showHints })),
  showNextHint: () => {
    const state = get()
    if (state.currentHintIndex < 2) {
      set({ currentHintIndex: state.currentHintIndex + 1 })
    }
  },
  setShowSolution: (show) => set({ showSolution: show }),
  setFeedbackType: (feedbackType) => set({ feedbackType }),
  setPendingInput: (pendingInput) => set({ pendingInput }),
  resetEditor: (starterCode) =>
    set({
      code: starterCode,
      output: '',
      error: null,
      isRunning: false,
      showHints: false,
      showSolution: false,
      currentHintIndex: 0,
      feedbackType: null,
      pendingInput: null,
    }),
}))
