import { useQuery } from '@tanstack/react-query'
import api from '../lib/api'
import Loader from '../components/Loader'
import MoonCard from '../components/MoonCard'
import MoonBadge from '../components/MoonBadge'

function Dashboard() {
  const { data, isLoading } = useQuery({
    queryKey: ['me'],
    queryFn: () => api.get('/auth/me').then((res) => res.data.data),
  })

  if (isLoading) {
    return (
      <div className="flex justify-center py-20">
        <Loader />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-moon-text">Welcome back, {data?.name}</h1>
        <p className="text-sm text-moon-muted mt-1">Here's an overview of your account</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <MoonCard title="Account Status" glow="none">
          <MoonBadge variant={data?.isVerified ? 'success' : 'gold'}>
            {data?.isVerified ? 'Verified' : 'Unverified'}
          </MoonBadge>
        </MoonCard>

        <MoonCard title="Orders" glow="none">
          <p className="text-2xl font-semibold text-moon-text">0</p>
          <p className="text-xs text-moon-muted">Total orders placed</p>
        </MoonCard>

        <MoonCard title="Wishlist" glow="none">
          <p className="text-2xl font-semibold text-moon-text">0</p>
          <p className="text-xs text-moon-muted">Items saved</p>
        </MoonCard>
      </div>
    </div>
  )
}

export default Dashboard
