import ExerciseItem from '@/components/ExerciseItem'
import Loading from '@/components/Loading'
import type { Exercise } from '@/types'
import { createFileRoute } from '@tanstack/react-router'
import { lazy, useState } from 'react'

export const Route = createFileRoute('/group/$groupId')({
  component: ExerciseView,
  pendingComponent: Loading,
  loader: async ({ params }) => {
    console.log(params)
  },
})

const Adder = lazy(() => import('@/components/Adder'))

function ExerciseView() {
  const initialState = [
    {
      id: 123,
      group_id: 1,
      name: 'Falafel',
      weight: 12,
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
    <div className="px-2 text-center">
      <h1>Exercises</h1>
      <Adder handler={handler} placeholder="Type name..." />
      <div className="flex flex-col mb-1">{exercises}</div>
    </div>
  )
}
