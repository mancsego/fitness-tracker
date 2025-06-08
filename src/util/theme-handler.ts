import type { ChangeEvent } from 'react'

const THEME_KEY = 'theme'

const handleThemeChange =
  () =>
  ({ target: { value } }: ChangeEvent<HTMLSelectElement>) => {
    setTimeout(() => {
      localStorage.setItem(THEME_KEY, value)
    }, 0)
    setupTheme(value)
  }

const getCurrentTheme = () => localStorage.getItem(THEME_KEY) ?? ''

const setupTheme = (theme: string) => {
  document.documentElement.classList = theme
  const themeColor = document.querySelector('meta[name="theme-color"]')

  const root = document.documentElement
  const styles = getComputedStyle(root)

  const light = styles.getPropertyValue('--color-background').trim()
  const dark = styles
    .getPropertyValue('--color-dark-secondary-background')
    .trim()

  themeColor?.setAttribute('content', theme === 'dark' ? dark : light)
}

export { getCurrentTheme, handleThemeChange, setupTheme }
