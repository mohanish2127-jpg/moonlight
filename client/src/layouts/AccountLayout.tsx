import { NavLink, Outlet } from 'react-router-dom'
import { LayoutDashboard, User, MapPin, Settings, Activity } from 'lucide-react'
import { cn } from '../lib/utils'

const links = [
  { label: 'Dashboard', href: '/account', icon: LayoutDashboard },
  { label: 'Profile', href: '/account/profile', icon: User },
  { label: 'Addresses', href: '/account/addresses', icon: MapPin },
  { label: 'Settings', href: '/account/settings', icon: Settings },
  { label: 'Activity', href: '/account/activity', icon: Activity },
]

function AccountLayout() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="grid grid-cols-1 md:grid-cols-[220px_1fr] gap-8">
        <aside className="space-y-1">
          {links.map((link) => {
            const Icon = link.icon
            return (
              <NavLink
                key={link.href}
                to={link.href}
                end={link.href === '/account'}
                className={({ isActive }) =>
                  cn(
                    'flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors',
                    isActive
                      ? 'bg-moon-surface text-moon-text'
                      : 'text-moon-muted hover:text-moon-text hover:bg-moon-surface'
                  )
                }
              >
                <Icon className="w-4 h-4" />
                {link.label}
              </NavLink>
            )
          })}
        </aside>

        <main>
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default AccountLayout
