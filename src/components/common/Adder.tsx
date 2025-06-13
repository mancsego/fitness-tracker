import { useRef } from 'react'

export default function Adder({
  handler,
  placeholder,
}: {
  handler: (name: string) => void
  placeholder: string
}) {
  const id = crypto.randomUUID()
  const name = useRef<HTMLInputElement>(null)
  const currentName = () => name?.current

  const handle = () => {
    const current = currentName()
    if (!current?.value) return

    handler(current.value)
    current.value = ''
  }
  return (
    <div className="flex items-center justify-between pt-2">
      <input
        type="text"
        id={id}
        name={id}
        className="flex-1"
        ref={name}
        placeholder={placeholder}
      />
      <button className="btn btn-primary" onClick={handle}>
        <span className="flex justify-around">
          <svg className="fill-primary dark:fill-dark-background size-7">
            <use xlinkHref="#save" />
          </svg>
        </span>
      </button>
    </div>
  )
}
