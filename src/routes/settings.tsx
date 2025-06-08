import { createFileRoute } from '@tanstack/react-router'
import { lazy } from 'react'

export const Route = createFileRoute('/settings')({
  component: SettingsView,
})

const Header = lazy(() => import('@/components/common/Header'))

function SettingsView() {
  return (
    <>
      <Header link="/" title="Home" />
      <main className="px-2 text-center">
        <div className="flex flex-col mt-2">Helo</div>
      </main>
    </>
  )
}
