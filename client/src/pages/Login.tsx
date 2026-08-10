import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { loginSchema, type LoginFormData } from '../types/authSchemas'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Label } from '../components/ui/label'

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  })

  const onSubmit = async (data: LoginFormData) => {
    console.log('Login form submitted:', data)
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
            <Label htmlFor="password" className="text-moon-text">
              Password
            </Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              className="bg-moon-bg border-moon-border text-moon-text placeholder:text-moon-muted focus-visible:ring-moon-primary"
              {...register('password')}
            />
            {errors.password && <p className="text-sm text-red-400">{errors.password.message}</p>}
          </div>

          <Button
            type="submit"
            className="w-full bg-moon-primary hover:bg-moon-primary-light text-white"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Signing in...' : 'Sign In'}
          </Button>
        </form>
      </div>
    </div>
  )
}

export default Login
