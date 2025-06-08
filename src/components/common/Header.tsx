import { Link } from '@tanstack/react-router'

export default function Header({
  backLink,
  title,
  params = {},
}: {
  backLink: string
  title: string
  params?: Record<string, string>
}) {
  return (
    <header className="section-highlight">
      <Link to={backLink} params={params} className="focusable mr-2">
        <svg className="fill-primary dark:fill-dark-primary-accent size-6">
          <use xlinkHref="#back" />
        </svg>
      </Link>
      <h2>
        <span>{title}</span>
      </h2>
    </header>
  )
}
