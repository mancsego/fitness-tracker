import type { Group } from '@/types'
import { create } from 'zustand'

type GroupStore = {
  groups: Group[]
  create: (name: string) => Promise<void>
  read: () => Promise<void>
  update: (id: number, name: string) => Promise<void>
  remove: (id: number) => Promise<void>
}

const useGroupStore = create<GroupStore>((set) => ({
  groups: [],
  create: async (name: string) => {
    const { data } = await (await table).insert({ name }).select()
    const record = data?.[0]

    if (!record) return

    set((state) => ({ groups: [...state.groups, record] }))
  },
  read: async () => {
    const { data } = await (await table).select()
    set({ groups: data ?? [] })
  },
  update: async (id: number, name: string) => {
    const { status } = await (await table).update({ name }).eq('id', id)
    if (status !== 204) return

    set((state) => ({
      groups: state.groups.map((item) => {
        if (item.id !== id) return item

        return { id, name }
      }),
    }))
  },
  remove: async (id: number) => {
    const { status } = await (await table).delete().eq('id', id)
    if (status !== 204) return

    set((state) => ({
      groups: state.groups.filter((item) => item.id !== id),
    }))
  },
}))

const table = (async () => {
  const { db } = await import('@/util/database')
  return db.from('groups')
})()

export { useGroupStore }
