import Loading from '@/components/common/Loading'
import { startSession } from '@/store/auth'
import { useExerciseStore } from '@/store/exercises'
import { useHistoryStore } from '@/store/history'
import type { Exercise, ExerciseType, HistoryEntry } from '@/types'
import { createFileRoute } from '@tanstack/react-router'
import { lazy, useEffect, useState } from 'react'
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

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

function HistoryItem({
  entry,
  type,
}: {
  entry: HistoryEntry
  type: ExerciseType | null | undefined
}) {
  const endurance = type === 'endurance'
  const weights = (
    <div className={endurance ? 'hidden' : ''}>
      <span className={entry.weight > 0 ? '' : 'text-gray-500 line-through'}>
        {entry.weight} kg
      </span>
    </div>
  )

  return (
    <div className="pt-3 pb-5 px-2 text-center card border-secondary uppercase mt-2">
      <div className="text-lg text-secondary font-bold py-2">
        {entry.created_at}
      </div>
      <div className="flex justify-around pt-4">
        {weights}
        <div>
          <span>{entry.sets}</span>
          <span>x</span>
          <span>
            {entry.metric} {endurance ? 'secs' : 'reps'}
          </span>
        </div>
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
    <HistoryItem entry={entry} key={`he-${entry.id}`} type={exercise?.type} />
  ))

  const chart = (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        data={entries}
        margin={{ top: 20, bottom: 0, left: -30, right: 20 }}
      >
        <XAxis dataKey="created_at" />
        <YAxis />
        <CartesianGrid strokeDasharray="3 3" />
        <Line dataKey="weight" className="*:store-primary" />
        <Line
          dataKey="metric"
          type="monotone"
          className="*:stroke-primary-accent"
        />
        <Tooltip />
      </LineChart>
    </ResponsiveContainer>
  )

  useEffect(() => {
    ;(async () => {
      setExercise(await findExercise(+groupId, +exerciseId))
    })()
  }, [setExercise, findExercise, exerciseId, groupId])

  if (!exercise)
    return (
      <Header
        link="/group/$groupId"
        title={exercise === undefined ? 'Oh-oh, no such exercise!' : ''}
        params={{ groupId }}
      />
    )

  return (
    <>
      <Header
        link="/group/$groupId"
        title={`History for: ${exercise?.name}`}
        params={{ groupId }}
      />
      <main className="border-t pt-2 px-2">
        <div className="flex h-64">{chart}</div>
        {history}
      </main>
    </>
  )
}
