import IconSet from '@/components/IconSet'
import { createRootRoute, Link, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'

export const Route = createRootRoute({
  component: App,
})

function App() {
  return (
    <>
      <IconSet />
      <header className="flex justify-center">
        <Link to="/" className="[&.active]:font-bold">
          Home
        </Link>
      </header>
      <main className="bg-slate-50 py-5">
        <Outlet />
        <TanStackRouterDevtools />
      </main>
      <footer className="flex justify-center">Footer</footer>
    </>
  )
}
