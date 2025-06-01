export default function ActionIcon({
  use,
  action,
}: {
  use: string
  action: () => void
}) {
  return (
    <div className="p-2 link" onClick={action}>
      <svg className="fill-primary size-7">
        <use xlinkHref={`#${use}`} />
      </svg>
    </div>
  )
}
