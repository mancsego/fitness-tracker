import { useExerciseStore } from '@/store/exercises'
import { useHistoryStore } from '@/store/history'
import type { Exercise, ExerciseType } from '@/types'
import { Link, useParams } from '@tanstack/react-router'
import { lazy, useRef, useState, type Ref } from 'react'

const [, ...SET_OPTIONS] = [...Array(7).keys()]
const [, ...REP_OPTIONS] = [...Array(41).keys()]
const [, ...SECONDS_OPTIONS] = Array.from({ length: 13 }, (_, i) => i * 10)
const WEIGHTS = Array.from({ length: 30 }, (_, i) => i * 2)

const ActionIcon = lazy(() => import('@/components/common/ActionIcon'))
const Switch = lazy(() => import('@/components/common/Switch'))

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
  const [type, setType] = useState<ExerciseType>(item.type)

  const update = useExerciseStore(({ update }) => update)
  const remove = useExerciseStore(({ remove }) => remove)

  const handleUpdate = () => {
    const name = nameRef?.current?.value ?? item.name
    update({ ...item, name, type })

    close()
  }

  const handleRemove = () => {
    remove(item.id)

    close()
  }

  if (!visible) return null

  return (
    <>
      <div className="absolute top-2.5 left-4  z-10">
        <Switch<ExerciseType>
          id={`${item.id}-type`}
          options={[
            { value: 'regular', label: 'Regular' },
            { value: 'endurance', label: 'Endurance' },
          ]}
          defaultValue={item.type}
          onChange={(t) => {
            setType(t)
          }}
        />
      </div>
      <div className="min-w-full flex items-center">
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
    </>
  )
}

function LoadSelector({
  item,
  ref,
}: {
  item: Exercise
  ref: Ref<HTMLSelectElement>
}) {
  return (
    <select
      name="weights"
      id={`${item.id}-weights`}
      defaultValue={item.weight}
      ref={ref}
      className={`${item.type === 'endurance' ? 'hidden' : ''}`}
    >
      {(item.type ? WEIGHTS : [0]).map((v) => (
        <option value={v} key={'load-' + v}>
          {v} kg
        </option>
      ))}
    </select>
  )
}

function SetSelector({
  item,
  ref,
}: {
  item: Exercise
  ref: Ref<HTMLSelectElement>
}) {
  return (
    <select
      name="sets"
      id={`${item.id}-sets`}
      defaultValue={item.sets}
      ref={ref}
    >
      {SET_OPTIONS.map((v) => (
        <option value={v} key={'metric-' + v}>
          {v}
        </option>
      ))}
    </select>
  )
}

function MetricSelector({
  item,
  ref,
}: {
  item: Exercise
  ref: Ref<HTMLSelectElement>
}) {
  const metricType = item.type === 'endurance' ? SECONDS_OPTIONS : REP_OPTIONS
  const unit = item.type === 'endurance' ? 'secs' : ''

  return (
    <select
      name="metric"
      id={`${item.id}-metric`}
      defaultValue={item.metric}
      ref={ref}
    >
      {metricType.map((v) => (
        <option value={v} key={'metric-' + v}>
          {v} {unit}
        </option>
      ))}
    </select>
  )
}

export default function ExerciseItem({ item }: { item: Exercise }) {
  const [updating, setUpdating] = useState(false)
  const [editing, setEditing] = useState(false)
  const weightRef = useRef<HTMLSelectElement>(null)
  const metricRef = useRef<HTMLSelectElement>(null)
  const setsRef = useRef<HTMLSelectElement>(null)
  const update = useExerciseStore(({ update }) => update)
  const createHistory = useHistoryStore(({ create }) => create)
  const { groupId } = useParams({ strict: false })

  const sync = async () => {
    setUpdating(true)
    const weight = +(weightRef?.current?.value ?? item.weight)
    const metric = +(metricRef?.current?.value ?? item.metric)
    const sets = +(setsRef?.current?.value ?? item.sets)

    const updatedItem = {
      ...item,
      weight,
      metric,
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
    <div className="text-left my-2 flex flex-col min-h-[140px] card card-primary-accent relative">
      <div className="flex items-center justify-between pt-2">
        <Link
          to="/group/$groupId/exercise/$exerciseId"
          params={{ groupId: groupId ?? '-', exerciseId: '' + item.id }}
          className={`link ${editing ? 'text-transparent' : ''}`}
        >
          {item.name}
        </Link>
        <div className="mt-1">
          <button className="pill" onClick={toggleEditView}>
            edit
          </button>
        </div>
      </div>

      <div className="flex flex-1 justify-between items-center py-4 overflow-hidden">
        <EditView visible={editing} item={item} close={toggleEditView} />
        <LoadSelector item={item} ref={weightRef} />
        <div className="flex items-center">
          <SetSelector item={item} ref={setsRef} />
          <span className="multiplier mr-1">x</span>
          <MetricSelector item={item} ref={metricRef} />
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
