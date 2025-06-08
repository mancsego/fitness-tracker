import type { AuthResponse, AuthSession, Session } from '@supabase/supabase-js'
import type { SupabaseAuthClient } from '@supabase/supabase-js/dist/module/lib/SupabaseAuthClient'
import { redirect } from '@tanstack/react-router'
import { create } from 'zustand'

type AuthStore = {
  data: {
    access_token: string | null
    refresh_token: string | null
  }
  login: (session: Session) => Promise<void>
  register: (email: string, password: string) => Promise<void>
  refresh: () => void
}

const RT = 'rt_m'
const AT = 'at_m'

const useAuthStore = create<AuthStore>((set, get) => ({
  data: {
    access_token: null,
    refresh_token: null,
  },
  register: async (email: string, password: string) => {
    const res = await (
      await auth
    ).signUp({
      email,
      password,
    })

    const session = getSession(res)
    set({
      data: {
        access_token: session.access_token,
        refresh_token: session.refresh_token,
      },
    })
    stashTokens(session)
  },
  login: async (session: Session) => {
    set({
      data: {
        access_token: session.access_token,
        refresh_token: session.refresh_token,
      },
    })
    stashTokens(session)
  },
  refresh: () => {
    const token =
      get().data.refresh_token ?? unStashTokens().refresh_token ?? ''

    if (token) return

    throw Error('No session')
    // const res = await (await auth).refreshSession({ refresh_token: token })
    // const session = getSession(res)

    // stashTokens(session)
  },
}))

const getSession = (res: AuthResponse) => {
  const { error, data } = res
  if (!error && data.session) return data.session

  throw Error(error?.message || 'No session created')
}

const unStashTokens = (): {
  access_token: string | null
  refresh_token: string | null
} => ({
  access_token: sessionStorage.getItem(AT),
  refresh_token: localStorage.getItem(RT),
})

const stashTokens = (session: AuthSession) => {
  setTimeout(() => {
    sessionStorage.setItem(AT, session.access_token)
    localStorage.setItem(RT, session.refresh_token)
  }, 0)
}

const startSession = async () => {
  try {
    const auth = useAuthStore.getState()

    await auth.refresh()
  } catch (e) {
    console.error(e)

    throw redirect({ to: '/login' })
  }
}

const auth = (() => {
  let auth: undefined | SupabaseAuthClient

  return (async () => {
    if (auth) return auth

    const { backend } = await import('@/util/backend')
    auth = backend.auth

    return auth
  })()
})()

export { startSession, useAuthStore }
