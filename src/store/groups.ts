import type { Group } from '@/types'
import { create } from 'zustand'

type GroupStore = {
  loaded: boolean
  groups: Group[]
  create: (name: string) => Promise<void>
  read: () => Promise<void>
  update: (id: number, name: string) => Promise<void>
  remove: (id: number) => Promise<void>
}

const useGroupStore = create<GroupStore>((set) => ({
  loaded: false,
  groups: [],
  create: async (name: string) => {
    set((state) => ({ groups: [...state.groups, { name, id: 123445 }] }))
  },
  read: async () => {
    await new Promise((resolve) => {
      setTimeout(resolve, 3000)
    })
    set({
      groups: [
        {
          id: 123,
          name: 'Falafel group',
        },
        {
          id: 1234,
          name: 'Falafel group2',
        },
      ],
      loaded: true,
    })
  },
  update: async (id: number, name: string) => {
    set((state) => ({
      groups: state.groups.map((item) => {
        if (item.id !== id) return item

        return { id, name }
      }),
    }))
  },
  remove: async (id: number) => {
    set((state) => ({
      groups: state.groups.filter((item) => item.id !== id),
    }))
  },
}))

export { useGroupStore }
