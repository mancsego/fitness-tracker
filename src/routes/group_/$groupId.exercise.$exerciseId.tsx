import Loading from '@/components/common/Loading'
import type { HistoryEntry } from '@/types'
import { createFileRoute, Link } from '@tanstack/react-router'

export const Route = createFileRoute('/group_/$groupId/exercise/$exerciseId')({
  pendingComponent: Loading,
  component: () => <ExerciseHistory />,
  loader: async ({ params }) => {
    console.log('Boing')

    console.log(params)
  },
})

function HistoryItem({ entry }: { entry: HistoryEntry }) {
  return (
    <div className="px-2 py-3 flex justify-around border-b">
      <span>{entry.weight} kg</span>
      <span>
        {entry.reps} x {entry.sets}
      </span>
    </div>
  )
}

function ExerciseHistory() {
  const { groupId } = Route.useParams()
  const entries = [
    {
      id: 1,
      exercise_id: 1,
      weight: 12,
      sets: 2,
      reps: 12,
    },
    {
      id: 2,
      exercise_id: 1,
      weight: 12,
      sets: 2,
      reps: 12,
    },
  ]

  const history = entries.map((entry) => (
    <HistoryItem entry={entry} key={`he-${entry.id}`} />
  ))

  return (
    <div className="text-center">
      <Link to="/group/$groupId" params={{ groupId: '' + groupId }}>
        <h1 className="border-b px-3 py-2">
          History for: <span className="font-bold">{'test'}</span>
        </h1>
      </Link>

      <div>{history}</div>
    </div>
  )
}
