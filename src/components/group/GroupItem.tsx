import { useGroupStore } from '@/store/groups'
import type { Group } from '@/types'
import { Link } from '@tanstack/react-router'
import { lazy, useRef, useState } from 'react'

const ActionIcon = lazy(() => import('@/components/common/ActionIcon'))

function EditView({
  item,
  visible,
  close,
}: {
  item: Group
  visible: boolean
  close: () => void
}) {
  const nameRef = useRef<HTMLInputElement>(null)

  const update = useGroupStore(({ update }) => update)
  const remove = useGroupStore(({ remove }) => remove)

  const handleUpdate = () => {
    update(item.id, nameRef?.current?.value ?? '')
    close()
  }

  const handleRemove = () => {
    remove(item.id)

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
        ref={nameRef}
        type="text"
        defaultValue={item.name}
      />
      <ActionIcon use="delete" action={handleRemove} />
      <ActionIcon use="save" action={handleUpdate} />
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
      <Link to="/group/$groupId" params={{ groupId: '' + group.id }}>
        {group.name}
      </Link>
    </div>
  )
}
