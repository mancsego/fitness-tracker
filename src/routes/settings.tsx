import { getCurrentTheme, handleThemeChange } from '@/util/theme-handler'
import { createFileRoute } from '@tanstack/react-router'
import { lazy } from 'react'

export const Route = createFileRoute('/settings')({
  component: SettingsView,
})

const Header = lazy(() => import('@/components/common/Header'))

function SettingsView() {
  const currentTheme = getCurrentTheme()
  return (
    <>
      <Header link="/" title="Home" />
      <main className="px-2 text-center">
        <div className="flex flex-col mt-2">
          <div className="flex items-center">
            <label htmlFor="theme" className="flex-1/2">
              Theme:{' '}
            </label>
            <select
              name="theme"
              id="theme"
              defaultValue={currentTheme}
              className="flex-1/2"
              onChange={handleThemeChange()}
            >
              <option value="light">Light</option>
              <option value="dark">Dark</option>
            </select>
          </div>
        </div>
      </main>
    </>
  )
}
