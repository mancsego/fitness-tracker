import type { Exercise } from '@/types'
import { Link } from '@tanstack/react-router'
import { lazy, useState } from 'react'

const [, ...SET_OPTIONS] = [...Array(7).keys()]
const [, ...REP_OPTIONS] = [...Array(17).keys()]
const WEIGHTS = Array.from({ length: 15 }, (_, i) => (i + 1) * 2)

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
    <div className="text-left mt-2">
      <Link
        to="/group/$groupId/exercise/$exerciseId"
        params={{ groupId: '' + 1, exerciseId: '' + item.id }}
      >
        <div className="font-bold border-b px-3 py-2">{item.name}</div>
      </Link>
      <div className="flex flex-1 justify-between items-center py-2 overflow-hidden">
        <EditView visible={editing} item={item} close={toggleEditView} />
        <ActionIcon use="edit" action={toggleEditView} />
        <div>
          <select name="weights" id="weights" defaultValue={item.weight}>
            {WEIGHTS.map((v) => (
              <option value={v} key={'weight-' + v}>
                {v} kg
              </option>
            ))}
          </select>
        </div>
        <div className="flex items-center">
          <select name="sets" id="sets" defaultValue={item.sets}>
            {SET_OPTIONS.map((v) => (
              <option value={v} key={'reps-' + v}>
                {v}
              </option>
            ))}
          </select>
          x
          <select name="reps" id="reps" defaultValue={item.reps}>
            {REP_OPTIONS.map((v) => (
              <option value={v} key={'reps-' + v}>
                {v}
              </option>
            ))}
          </select>
        </div>
        <ActionIcon use="sync" action={sync} />
      </div>
    </div>
  )
}
