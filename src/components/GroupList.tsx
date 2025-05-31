import type { Group } from '@/types'
import { lazy, useState } from 'react'

const Adder = lazy(() => import('@/components/Adder'))

export default function GroupList() {
  const initialState = [
    {
      id: 123,
      name: 'Falafel group',
    },
  ]
  const [state, setState] = useState<Group[]>(initialState)

  const exercises = state.map(({ id, name }) => <div key={id}>{name}</div>)

  const handler = (name: string) => {
    const ex = {
      id: Math.floor(Math.random() * 100),
      name,
    }
    setState((prev) => [...prev, ex])
  }

  return (
    <div className="px-2">
      <h1>Groups</h1>
      <div className="flex flex-col border-b-1 mb-1">{exercises}</div>
      <Adder handler={handler} placeholder="Type name..." />
    </div>
  )
}
