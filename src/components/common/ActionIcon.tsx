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
    <div className={className + ' p-2 focusable'} onClick={action}>
      <svg className="fill-primary size-5">
        <use xlinkHref={`#${use}`} />
      </svg>
    </div>
  )
}
