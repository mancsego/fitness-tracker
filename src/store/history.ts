import type { Exercise, HistoryEntry } from '@/types'
import type { SupabaseClient } from '@supabase/supabase-js'
import { create } from 'zustand'

type HistoryStore = {
  exercise: number
  history: HistoryEntry[]
  create: (item: Exercise) => Promise<void>
  read: (groupId: number) => Promise<void>
}

const useHistoryStore = create<HistoryStore>((set, get) => ({
  exercise: 0,
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

    set((state) => ({ history: [record, ...state.history] }))
  },
  read: async (exercise: number) => {
    const state = get()
    if (state.exercise === exercise && state.history.length) return

    const { data } = await (await getTable())
      .select()
      .eq('exercise_id', exercise)
      .order('id', { ascending: false })

    const preparedData =
      data?.map((entry) => ({
        ...entry,
        created_at: new Date(entry.created_at).toLocaleDateString(),
      })) ?? []

    set({ history: preparedData, exercise })
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
