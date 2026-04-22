import type { Level } from '../../types'
import { phase1Levels } from './phase1'
import { phase2Levels } from './phase2'
import { phase3Levels } from './phase3'
import { phase4Levels } from './phase4'
import { phase5Levels } from './phase5'

export const levels: Level[] = [
  ...phase1Levels,
  ...phase2Levels,
  ...phase3Levels,
  ...phase4Levels,
  ...phase5Levels,
]

export function getLevelsByPhase(phase: number): Level[] {
  return levels.filter((l) => l.phase === phase)
}

export function getLevelById(id: number): Level | undefined {
  return levels.find((l) => l.id === id)
}
