import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useNavigate, Link } from 'react-router-dom'
import { loginSchema, type LoginFormData } from '../types/authSchemas'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Label } from '../components/ui/label'
import { useAuthStore } from '../store/authStore'
import api from '../lib/api'

function Login() {
  const navigate = useNavigate()
  const setAuth = useAuthStore((s) => s.setAuth)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  })

  const mutation = useMutation({
    mutationFn: (data: LoginFormData) => api.post('/auth/login', data),
    onSuccess: (res) => {
      const { user, accessToken } = res.data.data
      setAuth(user, accessToken)
      navigate('/account')
    },
  })

  const onSubmit = (data: LoginFormData) => {
    mutation.mutate(data)
  }

  return (
    <div className="h-full min-h-screen flex items-center justify-center px-4 bg-moon-bg">
      <div className="w-full max-w-sm space-y-6 bg-moon-surface border border-moon-border rounded-moon p-8 shadow-glow-primary">
        <div className="text-center space-y-1">
          <h1 className="text-2xl font-semibold text-moon-text">Welcome back</h1>
          <p className="text-sm text-moon-muted">Sign in to your account</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-moon-text">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              className="bg-moon-bg border-moon-border text-moon-text placeholder:text-moon-muted focus-visible:ring-moon-primary"
              {...register('email')}
            />
            {errors.email && <p className="text-sm text-red-400">{errors.email.message}</p>}
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password" className="text-moon-text">
                Password
              </Label>
              <Link to="/forgot-password" className="text-xs text-moon-muted hover:text-moon-text">
                Forgot password?
              </Link>
            </div>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              className="bg-moon-bg border-moon-border text-moon-text placeholder:text-moon-muted focus-visible:ring-moon-primary"
              {...register('password')}
            />
            {errors.password && <p className="text-sm text-red-400">{errors.password.message}</p>}
          </div>

          {mutation.isError && (
            <p className="text-sm text-red-400 text-center">
              {(mutation.error as any)?.response?.data?.message || 'Login failed'}
            </p>
          )}

          <Button
            type="submit"
            className="w-full bg-moon-primary hover:bg-moon-primary-light text-white"
            disabled={mutation.isPending}
          >
            {mutation.isPending ? 'Signing in...' : 'Sign In'}
          </Button>
        </form>

        <p className="text-center text-sm text-moon-muted">
          Don't have an account?{' '}
          <Link to="/register" className="text-moon-primary-light hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Login
