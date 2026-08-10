import { Link } from 'react-router-dom'

function Footer() {
  return (
    <footer className="bg-moon-surface border-t border-moon-border mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-10">
          <div>
            <h3 className="font-display font-semibold text-base text-moon-text mb-3">
              MoonlightAnime
            </h3>
            <p className="text-sm text-moon-muted leading-relaxed">
              Premium anime merchandise for collectors and fans.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-medium text-moon-text mb-3">Shop</h4>
            <ul className="space-y-2 text-sm text-moon-muted">
              <li>
                <Link to="/products" className="hover:text-moon-text transition-colors">
                  All Products
                </Link>
              </li>
              <li>
                <Link to="/categories" className="hover:text-moon-text transition-colors">
                  Categories
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-medium text-moon-text mb-3">Support</h4>
            <ul className="space-y-2 text-sm text-moon-muted">
              <li>
                <Link to="/contact" className="hover:text-moon-text transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/faq" className="hover:text-moon-text transition-colors">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-moon-border mt-10 pt-6 text-center text-xs text-moon-muted">
          © {new Date().getFullYear()} MoonlightAnime. All rights reserved.
        </div>
      </div>
    </footer>
  )
}

export default Footer
