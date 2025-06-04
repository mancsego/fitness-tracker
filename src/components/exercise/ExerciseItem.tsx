import { useExerciseStore } from '@/store/exercises'
import type { Exercise } from '@/types'
import { Link } from '@tanstack/react-router'
import { lazy, useRef, useState } from 'react'

const [, ...SET_OPTIONS] = [...Array(7).keys()]
const [, ...REP_OPTIONS] = [...Array(17).keys()]
const WEIGHTS = Array.from({ length: 15 }, (_, i) => (i + 1) * 2)

const ActionIcon = lazy(() => import('@/components/common/ActionIcon'))

function EditView({
  item,
  visible,
  close,
}: {
  item: Exercise
  visible: boolean
  close: () => void
}) {
  const nameRef = useRef<HTMLInputElement>(null)

  const update = useExerciseStore(({ update }) => update)
  const remove = useExerciseStore(({ remove }) => remove)

  const handleUpdate = () => {
    const name = nameRef?.current?.value ?? item.name
    update({ ...item, name })

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
        type="text"
        ref={nameRef}
        defaultValue={item.name}
      />
      <ActionIcon use="delete" action={handleRemove} />
      <ActionIcon use="save" action={handleUpdate} />
    </div>
  )
}

export default function ExerciseItem({ item }: { item: Exercise }) {
  const [editing, setEditing] = useState(false)
  const weightRef = useRef<HTMLSelectElement>(null)
  const repsRef = useRef<HTMLSelectElement>(null)
  const setsRef = useRef<HTMLSelectElement>(null)
  const update = useExerciseStore(({ update }) => update)

  const sync = () => {
    const weight = +(weightRef?.current?.value ?? item.weight)
    const reps = +(repsRef?.current?.value ?? item.reps)
    const sets = +(setsRef?.current?.value ?? item.sets)

    const updatedItem = {
      ...item,
      weight,
      reps,
      sets,
    }
    update(updatedItem)
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
          <select
            name="weights"
            id="weights"
            defaultValue={item.weight}
            ref={weightRef}
          >
            {WEIGHTS.map((v) => (
              <option value={v} key={'weight-' + v}>
                {v} kg
              </option>
            ))}
          </select>
        </div>
        <div className="flex items-center">
          <select name="sets" id="sets" defaultValue={item.sets} ref={setsRef}>
            {SET_OPTIONS.map((v) => (
              <option value={v} key={'reps-' + v}>
                {v}
              </option>
            ))}
          </select>
          x
          <select name="reps" id="reps" defaultValue={item.reps} ref={repsRef}>
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
