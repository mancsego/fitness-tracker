import type { Exercise } from '@/types'

export default function ExerciseItem({ item }: { item: Exercise }) {
  return (
    <div className="flex flex-1 justify-between py-2">
      <span className="font-bold">{item.name}</span>
      <span>
        {item.sets} <span className="font-semibold">x</span> {item.reps}
      </span>
    </div>
  )
}
