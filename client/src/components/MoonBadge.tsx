import { Badge } from './ui/badge'
import { cn } from '../lib/utils'

interface MoonBadgeProps {
  children: React.ReactNode
  variant?: 'primary' | 'accent' | 'gold' | 'success'
  className?: string
}

const variantMap = {
  primary: 'bg-moon-primary/20 text-moon-primary-light border-moon-primary/40',
  accent: 'bg-moon-accent/20 text-pink-300 border-moon-accent/40',
  gold: 'bg-moon-gold/20 text-moon-gold border-moon-gold/40',
  success: 'bg-moon-success/20 text-green-300 border-moon-success/40',
}

function MoonBadge({ children, variant = 'primary', className }: MoonBadgeProps) {
  return <Badge className={cn('border', variantMap[variant], className)}>{children}</Badge>
}

export default MoonBadge
