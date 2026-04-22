export interface Level {
  id: number;
  title: string;
  description: string;
  task: string;
  starterCode: string;
  expectedOutput: string;
  validationMode: 'exact' | 'contains' | 'regex';
  hints: [string, string, string];
  solution: string;
  explanation: string;
  concept: string;
  phase: 1 | 2 | 3 | 4 | 5;
  levelMode: 'code' | 'theory';
  inputValues?: string[];
}

export interface PhaseInfo {
  id: 1 | 2 | 3 | 4 | 5;
  title: string;
  subtitle: string;
  color: string;
  levelCount: number;
}

export interface LevelProgress {
  completed: boolean;
  attempts: number;
  completedAt?: string;
  bestCode?: string;
}

export interface StudentProgress {
  studentName: string;
  levels: Record<number, LevelProgress>;
  currentStreak: number;
  bestStreak: number;
  lastActiveAt: string;
}

export interface ExecutionResult {
  output: string;
  error: string | null;
  timedOut: boolean;
}
