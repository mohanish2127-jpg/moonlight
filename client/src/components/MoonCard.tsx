import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { cn } from '../lib/utils'

interface MoonCardProps {
  title?: string
  children: React.ReactNode
  className?: string
  glow?: 'primary' | 'accent' | 'gold' | 'none'
}

const glowMap = {
  primary: 'shadow-glow-primary',
  accent: 'shadow-glow-accent',
  gold: 'shadow-glow-gold',
  none: '',
}

function MoonCard({ title, children, className, glow = 'primary' }: MoonCardProps) {
  return (
    <Card
      className={cn('bg-moon-surface border-moon-border rounded-moon', glowMap[glow], className)}
    >
      {title && (
        <CardHeader>
          <CardTitle className="text-moon-text font-display">{title}</CardTitle>
        </CardHeader>
      )}
      <CardContent>{children}</CardContent>
    </Card>
  )
}

export default MoonCard
