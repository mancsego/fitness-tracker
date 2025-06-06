import Loading from '@/components/common/Loading'
import { startSession } from '@/store/auth'
import { useExerciseStore } from '@/store/exercises'
import { useHistoryStore } from '@/store/history'
import type { Exercise, HistoryEntry } from '@/types'
import { createFileRoute, Link } from '@tanstack/react-router'
import { useEffect, useState } from 'react'

export const Route = createFileRoute('/group_/$groupId/exercise/$exerciseId')({
  pendingComponent: Loading,
  component: () => <ExerciseHistory />,
  loader: async ({ params: { exerciseId } }) => {
    await startSession()
    const read = useHistoryStore.getState().read
    await read(+exerciseId)
  },
})

function HistoryItem({ entry }: { entry: HistoryEntry }) {
  return (
    <div className="border-b pt-1 pb-3 px-2">
      <div className="text-sm muted">
        {new Date(entry.created_at).toLocaleDateString()}
      </div>
      <div className="flex justify-around">
        <span>{entry.weight} kg</span>
        <span>
          {entry.reps} x {entry.sets}
        </span>
      </div>
    </div>
  )
}

function ExerciseHistory() {
  const { groupId, exerciseId } = Route.useParams()
  const eId = +exerciseId
  const entries = useHistoryStore(({ history }) => history)
  const findExercise = useExerciseStore(({ findOne }) => findOne)

  const [exercise, setExercise] = useState<Exercise | undefined>(undefined)

  const history = entries.map((entry) => (
    <HistoryItem entry={entry} key={`he-${entry.id}`} />
  ))

  useEffect(() => {
    ;(async () => {
      setExercise(await findExercise(eId))
    })()
  }, [setExercise, findExercise, eId])

  if (!exercise)
    return (
      <div className="text-center">
        <h1>Oh-oh, no such exercise! </h1>
        <Link to="/group/$groupId" params={{ groupId }}>
          <h1 className="border-b px-3 py-2">Let's go back!</h1>
        </Link>
      </div>
    )

  return (
    <div className="text-center">
      <Link to="/group/$groupId" params={{ groupId: '' + exercise.group_id }}>
        <h2 className="border-b px-3 py-2">
          History for: <span className="font-bold">{exercise.name}</span>
        </h2>
      </Link>

      <div>{history}</div>
    </div>
  )
}
