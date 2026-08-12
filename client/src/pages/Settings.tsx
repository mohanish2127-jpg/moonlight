import { Button } from '../components/ui/button'
import MoonCard from '../components/MoonCard'
import { useAuthStore } from '../store/authStore'
import { useNavigate } from 'react-router-dom'

function Settings() {
  const clearAuth = useAuthStore((s) => s.clearAuth)
  const navigate = useNavigate()

  const handleLogout = () => {
    clearAuth()
    navigate('/login')
  }

  return (
    <div className="space-y-6 max-w-lg">
      <h1 className="text-2xl font-semibold text-moon-text">Settings</h1>

      <MoonCard title="Password" glow="none">
        <p className="text-sm text-moon-muted mb-3">
          Change your password to keep your account secure
        </p>
        <Button
          variant="outline"
          className="border-moon-border text-moon-text hover:bg-moon-surface-hover"
        >
          Change Password
        </Button>
      </MoonCard>

      <MoonCard title="Notifications" glow="none">
        <p className="text-sm text-moon-muted">Manage email and order notification preferences</p>
      </MoonCard>

      <MoonCard title="Danger Zone" glow="accent">
        <p className="text-sm text-moon-muted mb-3">Sign out of your account on this device</p>
        <Button variant="destructive" onClick={handleLogout}>
          Log Out
        </Button>
      </MoonCard>
    </div>
  )
}

export default Settings
