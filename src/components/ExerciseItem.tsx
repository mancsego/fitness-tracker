import type { Exercise } from '@/types'
import { lazy, useState } from 'react'

const REPS_OPTIONS = [...Array(16).keys()]
const ActionIcon = lazy(() => import('@/components/ActionIcon'))

function EditView({
  item,
  visible,
  close,
}: {
  item: Exercise
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

export default function ExerciseItem({ item }: { item: Exercise }) {
  const [editing, setEditing] = useState(false)
  const sync = () => {
    console.log('Syncing...')
  }

  const toggleEditView = () => {
    setEditing((prev) => !prev)
  }
  return (
    <div className="flex flex-1 justify-between items-center py-2 overflow-hidden">
      <EditView visible={editing} item={item} close={toggleEditView} />
      <ActionIcon use="edit" action={toggleEditView} />
      <div className="w-[80px]">
        <div className="font-bold">{item.name}</div>
        <div className="text-sm text-gray-500">{item.weight} kg</div>
      </div>
      <div className="flex items-center">
        <select name="sets" id="sets" defaultValue={item.sets}>
          {REPS_OPTIONS.map((v) => (
            <option value={v} key={'reps-' + v}>
              {v}
            </option>
          ))}
        </select>
        x
        <select name="reps" id="reps" defaultValue={item.reps}>
          {REPS_OPTIONS.map((v) => (
            <option value={v} key={'reps-' + v}>
              {v}
            </option>
          ))}
        </select>
      </div>
      <ActionIcon use="sync" action={sync} />
    </div>
  )
}
