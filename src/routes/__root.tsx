import IconSet from '@/components/common/IconSet'
import { createRootRoute, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'

export const Route = createRootRoute({
  component: App,
})

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <IconSet />
      <div className="grow flex flex-col">
        <Outlet />
        <TanStackRouterDevtools />
      </div>
    </div>
  )
}
