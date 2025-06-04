import type { Exercise } from '@/types'
import { create } from 'zustand'

type ExerciseStore = {
  exercises: Exercise[]
  create: (name: string) => Promise<void>
  read: (groupId: number) => Promise<void>
  update: (item: Exercise) => Promise<void>
  remove: (id: number) => Promise<void>
}

const useExerciseStore = create<ExerciseStore>((set) => ({
  exercises: [],
  create: async (name: string) => {
    set((state) => ({
      exercises: [
        ...state.exercises,
        {
          id: Math.floor(Math.random() * 100),
          name,
          group_id: 1,
          weight: 0,
          sets: 0,
          reps: 0,
        },
      ],
    }))
  },
  read: async (groupId: number) => {
    console.log(groupId)
    set({
      exercises: [
        {
          id: 123,
          group_id: 1,
          name: 'Falafel',
          weight: 12,
          sets: 2,
          reps: 10,
        },
      ],
    })
  },
  update: async (item: Exercise) => {
    set((state) => ({
      exercises: state.exercises.map((i) => {
        if (i.id !== item.id) return item

        return item
      }),
    }))
  },
  remove: async (id: number) => {
    set((state) => ({
      exercises: state.exercises.filter((item) => item.id !== id),
    }))
  },
}))

export { useExerciseStore }
