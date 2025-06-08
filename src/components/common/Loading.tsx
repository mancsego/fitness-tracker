export default function Loading() {
  return (
    <div className="p-2 flex justify-around">
      <svg className="fill-primary dark:fill-dark-primary size-10 animate-spin">
        <use xlinkHref="#sync" />
      </svg>
    </div>
  )
}
