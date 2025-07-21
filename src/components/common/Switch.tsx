type Option<T> = {
  value: T
  label: string
}

function Option<T>({
  id,
  option: { label, value },
  onChange,
  selected,
}: {
  id: string
  option: Option<T>
  onChange: (v: T) => void
  selected: boolean
}) {
  const handleChange = () => {
    onChange(value)
  }

  return (
    <div key={`${id}-${value}`}>
      <input
        type="radio"
        id={`${id}-${value}`}
        name={id}
        defaultChecked={selected}
        onChange={handleChange}
        className="sr-only peer"
      />
      <label
        htmlFor={`${id}-${value}`}
        className="px-4 py-2 text-sm font-medium rounded-full cursor-pointer transition-colors duration-200 ease-in bg-secondary-accent dark:bg-dark-secondary-background peer-checked:bg-primary-accent peer-checked:dark:bg-dark-primary-accent peer-checked:dark:text-primary"
      >
        {label}
      </label>
    </div>
  )
}

export default function Switch<T>({
  id,
  defaultValue,
  options,
  onChange,
}: {
  id: string
  defaultValue: T
  options: Option<T>[]
  onChange: (value: T) => void
}) {
  const handleChange = (e: T) => {
    const selectedOption = options.find((o) => o.value == e)

    if (!selectedOption) return

    onChange(e)
  }

  return (
    <div className="flex items-center">
      <div className="flex px-px py-2 border rounded-full">
        {options.map((option) => (
          <Option
            key={`${id}-${option.value}`}
            id={id}
            option={option}
            onChange={handleChange}
            selected={defaultValue == option.value}
          />
        ))}
      </div>
    </div>
  )
}
