export default function Loading() {
  return (
    <div className="p-2 flex justify-around">
      <svg className="fill-primary size-10 animate-spin">
        <use xlinkHref="#sync" />
      </svg>
    </div>
  )
}
