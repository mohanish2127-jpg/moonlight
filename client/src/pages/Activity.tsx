import MoonCard from '../components/MoonCard'
import { Clock } from 'lucide-react'

function Activity() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-moon-text">Activity</h1>

      <MoonCard glow="none">
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <Clock className="w-10 h-10 text-moon-muted mb-3" />
          <p className="text-moon-text font-medium">No recent activity</p>
          <p className="text-sm text-moon-muted mt-1">
            Your orders, reviews, and account changes will appear here
          </p>
        </div>
      </MoonCard>
    </div>
  )
}

export default Activity
