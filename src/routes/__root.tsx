import IconSet from '@/components/common/IconSet'
import { createRootRoute, Link, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'

export const Route = createRootRoute({
  component: App,
})

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <IconSet />
      <header className="flex justify-center items-center h-10">
        <Link to="/" className="[&.active]:hidden">
          <span>Home</span>
        </Link>
      </header>
      <main className="grow flex flex-col">
        <Outlet />
        <TanStackRouterDevtools />
      </main>
    </div>
  )
}
