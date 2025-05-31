import Adder from '@/components/Adder'
import ExerciseItem from '@/components/ExerciseItem'
import type { Exercise } from '@/types'
import { useState } from 'react'

export default function ExerciseList() {
  const initialState = [
    {
      id: 123,
      group_id: 1,
      name: 'Falafel',
      sets: 10,
      reps: 2,
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
      sets: 0,
      reps: 0,
    }
    setState((prev) => [...prev, ex])
  }

  return (
    <div className="px-2">
      <div className="flex flex-col border-b-1 mb-1">{exercises}</div>
      <Adder handler={handler} placeholder="Type name..." />
    </div>
  )
}

export type { Exercise }
