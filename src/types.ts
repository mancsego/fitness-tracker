type ExerciseType = 'regular' | 'endurance'

type Exercise = {
  id: number
  type: ExerciseType
  group_id: number
  name: string
  weight: number
  sets: number
  metric: number
}

type HistoryEntry = {
  id: number
  exercise_id: number
  weight: number
  sets: number
  metric: number
  created_at: string
}

type Group = {
  id: number
  name: string
}

export type { Exercise, ExerciseType, Group, HistoryEntry }
