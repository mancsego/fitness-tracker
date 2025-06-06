import type { Exercise, HistoryEntry } from '@/types'
import type { Database } from '@/util/backend'
import { PostgrestQueryBuilder } from '@supabase/postgrest-js'
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
      await table
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
    const { data } = await (await table).select().eq('exercise_id', exercise)

    set({ history: data ?? [] })
  },
}))

const table = (() => {
  let cache:
    | undefined
    | PostgrestQueryBuilder<
        Database['public'],
        Database['public']['Tables']['exercise_history'],
        'exercise_history'
      >

  return (async () => {
    if (cache) return cache

    const { backend } = await import('@/util/backend')

    cache = backend.from('exercise_history')
    return cache
  })()
})()

export { useHistoryStore }
