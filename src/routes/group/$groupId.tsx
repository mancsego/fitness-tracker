import Loading from '@/components/common/Loading'
import ExerciseItem from '@/components/exercise/ExerciseItem'
import { startSession } from '@/store/auth'
import { useExerciseStore } from '@/store/exercises'
import { useGroupStore } from '@/store/groups'
import type { Group } from '@/types'
import { createFileRoute } from '@tanstack/react-router'
import { lazy, useEffect, useState } from 'react'

export const Route = createFileRoute('/group/$groupId')({
  component: ExerciseView,
  pendingComponent: Loading,
  loader: async ({ params: { groupId } }) => {
    await startSession()
    const read = useExerciseStore.getState().read
    await read(+groupId)
  },
})

const Adder = lazy(() => import('@/components/common/Adder'))
const Header = lazy(() => import('@/components/common/Header'))

function ExerciseView() {
  const entities = useExerciseStore(({ exercises }) => exercises)
  const create = useExerciseStore(({ create }) => create)
  const findGroups = useGroupStore(({ findOne }) => findOne)
  const { groupId } = Route.useParams()
  const [group, setGroup] = useState<Group | null | undefined>(null)

  useEffect(() => {
    ;(async () => {
      setGroup(await findGroups(+groupId))
    })()
  }, [setGroup, findGroups, groupId])

  const exercises = entities.map((item) => (
    <ExerciseItem item={item} key={item.id} />
  ))

  const handler = (name: string) => {
    create(name)
  }

  if (!group)
    return (
      <Header
        backLink="/"
        title={group == undefined ? 'Oh-oh! Noo such group :(' : ''}
      />
    )

  return (
    <>
      <Header backLink="/" title={group.name} />
      <main className="px-2">
        <Adder handler={handler} placeholder="Type name..." />
        <div className="flex flex-col mb-1">{exercises}</div>
      </main>
    </>
  )
}
