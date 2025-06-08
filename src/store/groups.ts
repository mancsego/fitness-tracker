import type { Group } from '@/types'
import type { SupabaseClient } from '@supabase/supabase-js'
import { create } from 'zustand'

type GroupStore = {
  groups: Group[]
  create: (name: string) => Promise<void>
  read: () => Promise<void>
  findOne: (id: number) => Promise<Group | undefined>
  update: (id: number, name: string) => Promise<void>
  remove: (id: number) => Promise<void>
}

const useGroupStore = create<GroupStore>((set, get) => ({
  groups: [],
  create: async (name: string) => {
    const { data } = await (await getTable()).insert({ name }).select()
    const record = data?.[0]

    if (!record) return

    set((state) => ({ groups: [...state.groups, record] }))
  },
  read: async () => {
    if (get().groups.length) return

    const { data } = await (await getTable()).select().order('id')
    set({ groups: data ?? [] })
  },
  findOne: async (id: number) => {
    await get().read()

    return get().groups.find((item) => item.id === id)
  },
  update: async (id: number, name: string) => {
    const { status } = await (await getTable()).update({ name }).eq('id', id)
    if (status !== 204) return

    set((state) => ({
      groups: state.groups.map((item) =>
        item.id !== id ? item : { id, name },
      ),
    }))
  },
  remove: async (id: number) => {
    const { status } = await (await getTable()).delete().eq('id', id)
    if (status !== 204) return

    set((state) => ({
      groups: state.groups.filter((item) => item.id !== id),
    }))
  },
}))

const getTable = (() => {
  const table = 'groups'
  let cache: undefined | SupabaseClient

  return async () => {
    if (cache) return cache.from(table)

    const { backend } = await import('@/util/backend')

    cache = backend
    return cache.from(table)
  }
})()

export { useGroupStore }
