import { useExerciseStore } from '@/store/exercises'
import { useHistoryStore } from '@/store/history'
import type { Exercise } from '@/types'
import { Link, useParams } from '@tanstack/react-router'
import { lazy, useRef, useState } from 'react'

const [, ...SET_OPTIONS] = [...Array(7).keys()]
const [, ...REP_OPTIONS] = [...Array(17).keys()]
const WEIGHTS = Array.from({ length: 15 }, (_, i) => i * 2)

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
      <ActionIcon use="delete" action={handleRemove} />
      <input
        id={`name-${item.id}`}
        name={`name-${item.id}`}
        className="grow"
        type="text"
        ref={nameRef}
        defaultValue={item.name}
      />
      <ActionIcon use="save" action={handleUpdate} />
    </div>
  )
}

export default function ExerciseItem({ item }: { item: Exercise }) {
  const [updating, setUpdating] = useState(false)
  const [editing, setEditing] = useState(false)
  const weightRef = useRef<HTMLSelectElement>(null)
  const repsRef = useRef<HTMLSelectElement>(null)
  const setsRef = useRef<HTMLSelectElement>(null)
  const update = useExerciseStore(({ update }) => update)
  const createHistory = useHistoryStore(({ create }) => create)
  const { groupId } = useParams({ strict: false })

  const sync = async () => {
    setUpdating(true)
    const weight = +(weightRef?.current?.value ?? item.weight)
    const reps = +(repsRef?.current?.value ?? item.reps)
    const sets = +(setsRef?.current?.value ?? item.sets)

    const updatedItem = {
      ...item,
      weight,
      reps,
      sets,
    }
    await update(updatedItem)
    await createHistory(updatedItem)

    setTimeout(() => {
      setUpdating(false)
    }, 1000)
  }

  const toggleEditView = () => {
    setEditing((prev) => !prev)
  }
  return (
    <div className="text-left my-2 flex flex-col min-h-[110px] card card-primary-accent">
      <div className="flex items-center justify-between">
        <Link
          to="/group/$groupId/exercise/$exerciseId"
          params={{ groupId: groupId ?? '-', exerciseId: '' + item.id }}
          className="link"
        >
          {item.name}
        </Link>
        <button className="pill" onClick={toggleEditView}>
          edit
        </button>
      </div>

      <div className="flex flex-1 justify-between items-center py-2 overflow-hidden">
        <EditView visible={editing} item={item} close={toggleEditView} />
        <div>
          <select
            name="weights"
            id={`${item.id}-weights`}
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
          <select
            name="sets"
            id={`${item.id}-sets`}
            defaultValue={item.sets}
            ref={setsRef}
          >
            {SET_OPTIONS.map((v) => (
              <option value={v} key={'reps-' + v}>
                {v}
              </option>
            ))}
          </select>
          <span className="multiplier mr-1">x</span>
          <select
            name="reps"
            id={`${item.id}-reps`}
            defaultValue={item.reps}
            ref={repsRef}
          >
            {REP_OPTIONS.map((v) => (
              <option value={v} key={'reps-' + v}>
                {v}
              </option>
            ))}
          </select>
        </div>
        <ActionIcon
          use="sync"
          action={sync}
          className={updating ? 'animate-spin' : ''}
        />
      </div>
    </div>
  )
}
