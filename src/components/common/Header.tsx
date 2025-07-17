import { Link } from '@tanstack/react-router'

function HeaderLink({ to, icon }: { to: string; icon: string }) {
  return (
    <Link to={to} className="focusable mr-2 p-2 [&.active]:hidden">
      <svg className="fill-primary dark:fill-dark-primary-accent size-8">
        <use xlinkHref={`#${icon}`} />
      </svg>
    </Link>
  )
}

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
      <Link to={link} params={params} className="focusable mr-2 p-2">
        <svg className="fill-primary dark:fill-dark-primary-accent size-8">
          <use xlinkHref="#back" />
        </svg>
      </Link>
    ) : null

  return (
    <header className="section-highlight">
      {backLink}
      <h2>{title}</h2>
      <div className="grow flex justify-end">
        <HeaderLink to="/sessions" icon="dumbbell" />
        <HeaderLink to="/settings" icon="cog" />
      </div>
    </header>
  )
}
