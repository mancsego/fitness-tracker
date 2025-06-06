import { useAuthStore } from '@/store/auth'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useRef } from 'react'

export const Route = createFileRoute('/login')({
  component: LoginView,
})

function LoginView() {
  const login = useAuthStore(({ login }) => login)
  const navigate = useNavigate({ from: '/login' })
  const emailRef = useRef<HTMLInputElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)

  const handle = async () => {
    const email = emailRef?.current?.value
    const password = passwordRef?.current?.value

    if (!(email && password)) return

    await login(email, password)
    navigate({ to: '/' })
  }

  return (
    <form className="flex flex-col justify-center grow *:mb-2" action={handle}>
      <div className="flex justify-center">
        <h1>Login</h1>
      </div>
      <input
        ref={emailRef}
        type="email"
        id="email"
        name="email"
        placeholder="Email"
        autoComplete="email"
        required
      />
      <input
        ref={passwordRef}
        type="password"
        id="pwd"
        name="pwd"
        placeholder="Password"
        autoComplete="current-password"
        required
      />
      <div className="mx-1 flex">
        <button className="btn btn-primary">Login</button>
      </div>
    </form>
  )
}
