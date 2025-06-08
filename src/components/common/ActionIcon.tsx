export default function ActionIcon({
  use,
  action,
  className = '',
}: {
  use: string
  action: () => void
  className?: string
}) {
  return (
    <div className={className + ' p-1 focusable'} onClick={action}>
      <svg className="fill-primary dark:fill-dark-primary-accent size-7">
        <use xlinkHref={`#${use}`} />
      </svg>
    </div>
  )
}
