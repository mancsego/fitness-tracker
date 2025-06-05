type Exercise = {
  id: number
  group_id: number
  name: string
  weight: number
  sets: number
  reps: number
}

type HistoryEntry = {
  id: number
  exercise_id: number
  weight: number
  sets: number
  reps: number
  created_at: string
}

type Group = {
  id: number
  name: string
}

export type { Exercise, Group, HistoryEntry }
