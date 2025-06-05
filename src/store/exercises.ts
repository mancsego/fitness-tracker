import type { Exercise } from '@/types'
import type { Database } from '@/util/database'
import { PostgrestQueryBuilder } from '@supabase/postgrest-js'
import { create } from 'zustand'

type ExerciseStore = {
  exercises: Exercise[]
  create: (name: string) => Promise<void>
  read: (groupId: number) => Promise<void>
  findOne: (id: number) => Promise<Exercise | undefined>
  update: (item: Exercise) => Promise<void>
  remove: (id: number) => Promise<void>
}

const useExerciseStore = create<ExerciseStore>((set, get) => ({
  exercises: [],
  create: async (name: string) => {
    const { data } = await (await table).insert({ name, group_id: 2 }).select()
    const record = data?.[0]

    if (!record) return

    set((state) => ({ exercises: [...state.exercises, record] }))
  },
  read: async (groupId: number) => {
    const { data } = await (await table).select().eq('group_id', groupId)

    set({ exercises: data ?? [] })
  },
  findOne: async (id: number) => {
    const found = get().exercises.find((item) => item.id === id)
    if (found) return found

    const { data } = await (await table).select().eq('id', id)

    return data?.[0]
  },
  update: async (item: Exercise) => {
    const { status } = await (await table).update({ ...item }).eq('id', item.id)
    if (status !== 204) return

    set((state) => ({
      exercises: state.exercises.map((i) => (i.id !== item.id ? i : item)),
    }))
  },
  remove: async (id: number) => {
    const { status } = await (await table).delete().eq('id', id)
    if (status !== 204) return

    set((state) => ({
      exercises: state.exercises.filter((item) => item.id !== id),
    }))
  },
}))

const table = (() => {
  let cache:
    | undefined
    | PostgrestQueryBuilder<
        Database['public'],
        Database['public']['Tables']['exercises'],
        'exercises'
      >

  return (async () => {
    if (cache) return cache

    const { db } = await import('@/util/database')

    cache = db.from('exercises')
    return cache
  })()
})()

export { useExerciseStore }
