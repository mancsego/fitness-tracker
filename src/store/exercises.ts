import type { Exercise } from '@/types'
import type { SupabaseClient } from '@supabase/supabase-js'
import { create } from 'zustand'

type ExerciseStore = {
  groupId: number
  exercises: Exercise[]
  create: (name: string, groupId: number) => Promise<void>
  read: (groupId: number) => Promise<void>
  findOne: (
    groupId: number,
    exerciseId: number,
  ) => Promise<Exercise | undefined>
  update: (item: Exercise) => Promise<void>
  remove: (id: number) => Promise<void>
}

const useExerciseStore = create<ExerciseStore>((set, get) => ({
  groupId: 0,
  exercises: [],
  create: async (name: string, groupId: number) => {
    const { data } = await (await getTable())
      .insert({ name, group_id: groupId })
      .select()
    const record = data?.[0]

    if (!record) return

    set((state) => ({ exercises: [...state.exercises, record] }))
  },
  read: async (groupId: number) => {
    const state = get()

    if (state.groupId === groupId && state.exercises.length) return

    const { data } = await (await getTable()).select().eq('group_id', groupId)
    set({ exercises: data ?? [], groupId })
  },
  findOne: async (groupId: number, exerciseId: number) => {
    await get().read(groupId)

    return get().exercises.find((item) => item.id === exerciseId)
  },
  update: async (item: Exercise) => {
    const { status } = await (await getTable())
      .update({ ...item })
      .eq('id', item.id)
    if (status !== 204) return

    set((state) => ({
      exercises: state.exercises.map((i) => (i.id !== item.id ? i : item)),
    }))
  },
  remove: async (id: number) => {
    const { status } = await (await getTable()).delete().eq('id', id)
    if (status !== 204) return

    set((state) => ({
      exercises: state.exercises.filter((item) => item.id !== id),
    }))
  },
}))

const getTable = (() => {
  const table = 'exercises'
  let cache: undefined | SupabaseClient

  return async () => {
    if (cache) return cache.from(table)

    const { backend } = await import('@/util/backend')

    cache = backend
    return cache.from(table)
  }
})()

export { useExerciseStore }
