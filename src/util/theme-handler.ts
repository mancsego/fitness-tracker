import type { ChangeEvent } from 'react'

const THEME_KEY = 'theme'

const handleThemeChange =
  () =>
  ({ target: { value } }: ChangeEvent<HTMLSelectElement>) => {
    setTimeout(() => {
      localStorage.setItem(THEME_KEY, value)
    }, 0)
    document.documentElement.classList = value
  }

const getCurrentTheme = () => localStorage.getItem(THEME_KEY) ?? ''

const setupTheme = () => {
  document.documentElement.classList = getCurrentTheme()
}

export { getCurrentTheme, handleThemeChange, setupTheme }
