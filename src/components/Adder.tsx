import { useRef } from 'react'

export default function Adder({
  handler,
  placeholder,
}: {
  handler: (name: string) => void
  placeholder: string
}) {
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
        id="new-exercise"
        name="new-exercise"
        className="flex-1"
        ref={name}
        placeholder={placeholder}
      />
      <button className="btn btn-primary" onClick={handle}>
        bang!
      </button>
    </div>
  )
}
