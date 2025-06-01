import type { Group } from '@/types'
import { lazy, useState } from 'react'

const ActionIcon = lazy(() => import('@/components/ActionIcon'))

function EditView({
  item,
  visible,
  close,
}: {
  item: Group
  visible: boolean
  close: () => void
}) {
  const update = () => {
    console.log(item)
    close()
  }

  const remove = () => {
    console.log(item)

    close()
  }

  if (!visible) return null

  return (
    <div className="min-w-full flex">
      <ActionIcon use="close" action={close} />
      <input
        id={`name-${item.id}`}
        name={`name-${item.id}`}
        className="max-w-[170px]"
        type="text"
        defaultValue={item.name}
      />
      <ActionIcon use="delete" action={remove} />
      <ActionIcon use="save" action={update} />
    </div>
  )
}

export default function GroupItem({ group }: { group: Group }) {
  const [editing, setEditing] = useState(false)

  const toggleEditView = () => {
    setEditing((prev) => !prev)
  }
  return (
    <div className="flex items-center py-2">
      <EditView item={group} visible={editing} close={toggleEditView} />
      <ActionIcon use="edit" action={toggleEditView} />
      {group.name}
    </div>
  )
}
