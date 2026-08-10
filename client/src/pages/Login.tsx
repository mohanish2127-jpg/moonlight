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
      <div className="w-full max-w-sm space-y-6 bg-moon-surface border border-moon-primary/30 rounded-2xl p-8 shadow-[0_0_40px_-10px_rgba(168,85,247,0.4)]">
        <h1 className="text-3xl font-bold text-moon-primary text-center">Login</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-moon-text">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              className="bg-moon-bg border-moon-primary/30 text-moon-text placeholder:text-moon-muted focus-visible:ring-moon-primary"
              {...register('email')}
            />
            {errors.email && <p className="text-sm text-moon-accent">{errors.email.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="text-moon-text">
              Password
            </Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              className="bg-moon-bg border-moon-primary/30 text-moon-text placeholder:text-moon-muted focus-visible:ring-moon-primary"
              {...register('password')}
            />
            {errors.password && (
              <p className="text-sm text-moon-accent">{errors.password.message}</p>
            )}
          </div>

          <Button
            type="submit"
            className="w-full bg-moon-primary hover:bg-moon-primary-light text-white"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Logging in...' : 'Login'}
          </Button>
        </form>
      </div>
    </div>
  )
}

export default Login
