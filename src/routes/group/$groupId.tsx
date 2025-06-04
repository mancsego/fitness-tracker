import Loading from '@/components/common/Loading'
import ExerciseItem from '@/components/exercise/ExerciseItem'
import { useExerciseStore } from '@/store/exercises'
import { createFileRoute } from '@tanstack/react-router'
import { lazy } from 'react'

export const Route = createFileRoute('/group/$groupId')({
  component: ExerciseView,
  pendingComponent: Loading,
  loader: async ({ params: { groupId } }) => {
    const read = useExerciseStore.getState().read
    await read(+groupId)
  },
})

const Adder = lazy(() => import('@/components/common/Adder'))

function ExerciseView() {
  const entities = useExerciseStore(({ exercises }) => exercises)
  const create = useExerciseStore(({ create }) => create)

  const exercises = entities.map((item) => (
    <ExerciseItem item={item} key={item.id} />
  ))

  const handler = (name: string) => {
    create(name)
  }

  return (
    <div className="px-2 text-center">
      <h1>Exercises</h1>
      <Adder handler={handler} placeholder="Type name..." />
      <div className="flex flex-col mb-1">{exercises}</div>
    </div>
  )
}
