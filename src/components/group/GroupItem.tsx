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
      <ActionIcon use="close" action={close} />
    </div>
  )
}

export default function GroupItem({ group }: { group: Group }) {
  const [editing, setEditing] = useState(false)

  const toggleEditView = () => {
    setEditing((prev) => !prev)
  }
  return (
    <div className="flex justify-between items-center  py-4 mb-2 card min-h-[72px]">
      <Link
        to="/group/$groupId"
        className={`${editing ? 'hidden' : ''}`}
        params={{ groupId: '' + group.id }}
      >
        {group.name}
      </Link>
      <EditView item={group} visible={editing} close={toggleEditView} />
      <button
        className={`${editing ? 'hidden' : 'pill'}`}
        onClick={toggleEditView}
      >
        edit
      </button>
    </div>
  )
}
