import Loading from '@/components/common/Loading'
import { useExerciseStore } from '@/store/exercises'
import { useHistoryStore } from '@/store/history'
import type { HistoryEntry } from '@/types'
import { createFileRoute, Link } from '@tanstack/react-router'

export const Route = createFileRoute('/group_/$groupId/exercise/$exerciseId')({
  pendingComponent: Loading,
  component: () => <ExerciseHistory />,
  loader: async ({ params: { exerciseId } }) => {
    const read = useHistoryStore.getState().read
    await read(+exerciseId)
  },
})

function HistoryItem({ entry }: { entry: HistoryEntry }) {
  return (
    <div className="border-b">
      <div className="px-2 py-3 flex justify-around">
        <span>{entry.weight} kg</span>
        <span>
          {entry.reps} x {entry.sets}
        </span>
      </div>
      <div className="text-sm muted">{entry.created_at}</div>
    </div>
  )
}

function ExerciseHistory() {
  const { groupId, exerciseId } = Route.useParams()
  const eId = +exerciseId
  const entries = useHistoryStore(({ history }) => history)
  const exercise = useExerciseStore(({ exercises }) =>
    exercises.find(({ id }) => eId === id),
  )

  const history = entries.map((entry) => (
    <HistoryItem entry={entry} key={`he-${entry.id}`} />
  ))

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
        <h1 className="border-b px-3 py-2">
          History for: <span className="font-bold">{exercise.name}</span>
        </h1>
      </Link>

      <div>{history}</div>
    </div>
  )
}
