import { Link } from '@tanstack/react-router'

export default function Header({
  title,
  link = undefined,
  params = {},
}: {
  title: string
  link?: string
  params?: Record<string, string>
}) {
  const backLink =
    link && title ? (
      <Link to={link} params={params} className="focusable mr-2">
        <svg className="fill-primary dark:fill-dark-primary-accent size-8">
          <use xlinkHref="#back" />
        </svg>
      </Link>
    ) : null

  return (
    <header className="section-highlight">
      {backLink}
      <h2>
        <span>{title}</span>
      </h2>
      <div className="grow flex justify-end">
        <Link to="/settings" className="focusable mr-2 [&.active]:hidden">
          <svg className="fill-primary dark:fill-dark-primary-accent size-8">
            <use xlinkHref="#cog" />
          </svg>
        </Link>
      </div>
    </header>
  )
}
