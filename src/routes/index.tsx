import Loading from '@/components/common/Loading'
import GroupItem from '@/components/group/GroupItem'
import { useGroupStore } from '@/store/groups'
import { createFileRoute } from '@tanstack/react-router'
import { lazy } from 'react'

export const Route = createFileRoute('/')({
  component: GroupView,
  loader: async () => {
    const read = useGroupStore.getState().read
    await read()
  },
  pendingComponent: Loading,
})

const Adder = lazy(() => import('@/components/common/Adder'))

function GroupView() {
  const groups = useGroupStore(({ groups }) => groups)
  const create = useGroupStore(({ create }) => create)

  const exercises = groups.map((item) => (
    <GroupItem key={item.id} group={item} />
  ))

  const handler = (name: string) => {
    create(name)
  }

  return (
    <div className="px-2 text-center">
      <h1>Groups</h1>
      <Adder handler={handler} placeholder="Type name..." />
      <div className="flex flex-col mt-2">{exercises}</div>
    </div>
  )
}
