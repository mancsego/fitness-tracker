import ExerciseItem from '@/components/ExerciseItem'
import type { Exercise } from '@/types'
import { lazy, useState } from 'react'

const Adder = lazy(() => import('@/components/Adder'))

export default function ExerciseList() {
  const initialState = [
    {
      id: 123,
      group_id: 1,
      name: 'Falafel',
      weight: 10,
      sets: 2,
      reps: 10,
    },
  ]
  const [state, setState] = useState<Exercise[]>(initialState)

  const exercises = state.map((item) => (
    <ExerciseItem item={item} key={item.id} />
  ))

  const handler = (name: string) => {
    const ex = {
      id: Math.floor(Math.random() * 100),
      name,
      group_id: 1,
      weight: 0,
      sets: 0,
      reps: 0,
    }
    setState((prev) => [...prev, ex])
  }

  return (
    <div className="px-2">
      <h1>Exercises</h1>
      <Adder handler={handler} placeholder="Type name..." />
      <div className="flex flex-col border-b-1 mb-1">{exercises}</div>
    </div>
  )
}
