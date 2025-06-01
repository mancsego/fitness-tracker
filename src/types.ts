type Exercise = {
  id: number
  group_id: number
  name: string
  weight: number
  sets: number
  reps: number
}

type Group = {
  id: number
  name: string
}

export type { Exercise, Group }
