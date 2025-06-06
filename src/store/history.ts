import type { Exercise, HistoryEntry } from '@/types'
import type { SupabaseClient } from '@supabase/supabase-js'
import { create } from 'zustand'

type HistoryStore = {
  history: HistoryEntry[]
  create: (item: Exercise) => Promise<void>
  read: (groupId: number) => Promise<void>
}

const useHistoryStore = create<HistoryStore>((set) => ({
  history: [],
  create: async (item: Exercise) => {
    const { data } = await (
      await getTable()
    )
      .insert({
        exercise_id: item.id,
        weight: item.weight,
        sets: item.sets,
        reps: item.reps,
      })
      .select()
    const record = data?.[0]

    if (!record) return

    set((state) => ({ history: [...state.history, record] }))
  },
  read: async (exercise: number) => {
    const { data } = await (await getTable())
      .select()
      .eq('exercise_id', exercise)

    set({ history: data ?? [] })
  },
}))

const getTable = (() => {
  const table = 'exercise_history'
  let cache: undefined | SupabaseClient

  return async () => {
    if (cache) return cache.from(table)

    const { backend } = await import('@/util/backend')

    cache = backend
    return cache.from(table)
  }
})()

export { useHistoryStore }
