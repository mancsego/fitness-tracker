export default function ExerciseItem({
  name,
  reps,
  sets,
}: {
  name: string
  reps: number
  sets: number
}) {
  return (
    <div className="flex flex-1 justify-between py-2">
      <span className="font-bold">{name}</span>
      <span>
        {sets} <span className="font-semibold">x</span> {reps}
      </span>
    </div>
  )
}
