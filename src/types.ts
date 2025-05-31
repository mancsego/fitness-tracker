type Exercise = {
  id: number
  group_id: number
  name: string
  sets: number
  reps: number
}

type Group = {
  id: number
  name: string
}

export type { Exercise, Group }
