import { useState } from 'react'
import Adder from './Adder'
import ExerciseItem from './ExerciseItem'

type Exercise = {
  id?: number
  name: string
  sets: number
  reps: number
}

export default function ExerciseList() {
  const initialState = [
    {
      id: 123,
      name: 'Falafel',
      sets: 10,
      reps: 2,
    },
  ]
  const [state, setState] = useState<Exercise[]>(initialState)

  const exercises = state.map(({ id, name, sets, reps }) => (
    <ExerciseItem name={name} sets={sets} reps={reps} key={id} />
  ))

  const handler = (name: string) => {
    const ex = { id: Math.floor(Math.random() * 100), name, sets: 0, reps: 0 }
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
