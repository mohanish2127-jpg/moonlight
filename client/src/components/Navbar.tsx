import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Menu, X, ShoppingCart, User } from 'lucide-react'
import { Button } from './ui/button'

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Products', href: '/products' },
  { label: 'Categories', href: '/categories' },
]

function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <nav className="sticky top-0 z-50 bg-moon-bg/95 backdrop-blur-sm border-b border-moon-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="font-display font-semibold text-lg text-moon-text tracking-tight">
            MoonlightAnime
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className="text-sm text-moon-muted hover:text-moon-text transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-2">
            <Link to="/cart">
              <Button
                variant="ghost"
                size="icon"
                className="text-moon-muted hover:text-moon-text hover:bg-moon-surface"
              >
                <ShoppingCart className="w-[18px] h-[18px]" />
              </Button>
            </Link>
            <Link to="/login">
              <Button
                variant="ghost"
                size="icon"
                className="text-moon-muted hover:text-moon-text hover:bg-moon-surface"
              >
                <User className="w-[18px] h-[18px]" />
              </Button>
            </Link>
          </div>

          <button
            className="md:hidden text-moon-text"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {mobileOpen && (
          <div className="md:hidden pb-4 space-y-3 border-t border-moon-border pt-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className="block text-sm text-moon-muted hover:text-moon-text transition-colors"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="flex gap-3 pt-2">
              <Link to="/cart" onClick={() => setMobileOpen(false)}>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-moon-border text-moon-text hover:bg-moon-surface"
                >
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  Cart
                </Button>
              </Link>
              <Link to="/login" onClick={() => setMobileOpen(false)}>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-moon-border text-moon-text hover:bg-moon-surface"
                >
                  <User className="w-4 h-4 mr-2" />
                  Account
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar
