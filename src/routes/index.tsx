import GroupItem from '@/components/GroupItem'
import Loading from '@/components/Loading'
import type { Group } from '@/types'
import { createFileRoute } from '@tanstack/react-router'
import { lazy, useState } from 'react'

export const Route = createFileRoute('/')({
  component: GroupView,
  pendingComponent: Loading,
})

const Adder = lazy(() => import('@/components/Adder'))

function GroupView() {
  const initialState = [
    {
      id: 123,
      name: 'Falafel group',
    },
  ]
  const [state, setState] = useState<Group[]>(initialState)

  const exercises = state.map((item) => (
    <GroupItem key={item.id} group={item} />
  ))

  const handler = (name: string) => {
    const ex = {
      id: Math.floor(Math.random() * 100),
      name,
    }
    setState((prev) => [...prev, ex])
  }

  return (
    <div className="px-2 text-center">
      <h1>Groups</h1>
      <Adder handler={handler} placeholder="Type name..." />
      <div className="flex flex-col mt-2">{exercises}</div>
    </div>
  )
}
