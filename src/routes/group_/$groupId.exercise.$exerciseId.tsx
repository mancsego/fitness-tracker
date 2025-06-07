import Loading from '@/components/common/Loading'
import { startSession } from '@/store/auth'
import { useExerciseStore } from '@/store/exercises'
import { useHistoryStore } from '@/store/history'
import type { Exercise, HistoryEntry } from '@/types'
import { createFileRoute } from '@tanstack/react-router'
import { lazy, useEffect, useState } from 'react'

export const Route = createFileRoute('/group_/$groupId/exercise/$exerciseId')({
  pendingComponent: Loading,
  component: () => <ExerciseHistory />,
  loader: async ({ params: { exerciseId } }) => {
    await startSession()
    const read = useHistoryStore.getState().read
    await read(+exerciseId)
  },
})

const Header = lazy(() => import('@/components/common/Header'))

function HistoryItem({ entry }: { entry: HistoryEntry }) {
  return (
    <div className="border-b pt-1 pb-3 px-2 text-center">
      <div className="text-sm muted">
        {new Date(entry.created_at).toLocaleDateString()}
      </div>
      <div className="flex justify-around">
        <span>{entry.weight} kg</span>
        <span>
          {entry.reps}
          <span className="multiplier">x</span>
          {entry.sets}
        </span>
      </div>
    </div>
  )
}

function ExerciseHistory() {
  const { groupId, exerciseId } = Route.useParams()
  const entries = useHistoryStore(({ history }) => history)
  const findExercise = useExerciseStore(({ findOne }) => findOne)

  const [exercise, setExercise] = useState<Exercise | null | undefined>(null)

  const history = entries.map((entry) => (
    <HistoryItem entry={entry} key={`he-${entry.id}`} />
  ))

  useEffect(() => {
    ;(async () => {
      setExercise(await findExercise(+groupId, +exerciseId))
    })()
  }, [setExercise, findExercise, exerciseId, groupId])

  if (!exercise)
    return (
      <Header
        backLink="/group/$groupId"
        title={exercise === undefined ? 'Oh-oh, no such exercise!' : ''}
        params={{ groupId }}
      />
    )

  return (
    <>
      <Header
        backLink="/group/$groupId"
        title={`History for: ${exercise?.name}`}
        params={{ groupId }}
      />
      <main>{history}</main>
    </>
  )
}
