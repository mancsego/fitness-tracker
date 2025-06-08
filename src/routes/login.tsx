import { useAuthStore } from '@/store/auth'
import { backend } from '@/util/backend'
import { getCurrentTheme } from '@/util/theme-handler'
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { lazy, useEffect, useState } from 'react'

export const Route = createFileRoute('/login')({
  component: LoginView,
})

const useDark = getCurrentTheme() === 'dark'
const Header = lazy(() => import('@/components/common/Header'))
const appearance = {
  theme: ThemeSupa,
  variables: {
    default: {
      colors: {
        inputLabelText: useDark ? '#d9f1ee' : '#00695c',
        inputText: useDark ? '#d9f1ee' : '#00695c',
      },
    },
  },
}

function LoginView() {
  const navigate = useNavigate({ from: '/login' })
  const login = useAuthStore(({ login }) => login)
  const refresh = useAuthStore(({ refresh }) => refresh)

  const [hasSession, setHasSession] = useState(false)

  useEffect(() => {
    const {
      data: { subscription },
    } = backend.auth.onAuthStateChange((_, session) => {
      if (!session) return

      login(session)
      navigate({ to: '/' })
    })
    return () => subscription.unsubscribe()
  }, [login, navigate])

  useEffect(() => {
    try {
      refresh()
      setHasSession(true)
      navigate({ to: '/' })
    } catch {
      setHasSession(false)
    }
  }, [navigate, refresh, setHasSession])

  const component = hasSession ? (
    <div className="flex justify-around py-5 uppercase">
      <h1>Logged in!</h1>
    </div>
  ) : (
    <Auth
      supabaseClient={backend}
      providers={[]}
      showLinks={false}
      appearance={appearance}
    />
  )

  return (
    <>
      <Header title="login" />
      <main className="mx-5">{component}</main>
    </>
  )
}
