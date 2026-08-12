import { Button } from '../components/ui/button'
import MoonCard from '../components/MoonCard'
import { Plus, MapPin } from 'lucide-react'

function Addresses() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-moon-text">Addresses</h1>
        <Button className="bg-moon-primary hover:bg-moon-primary-light text-white">
          <Plus className="w-4 h-4 mr-2" />
          Add Address
        </Button>
      </div>

      <MoonCard glow="none">
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <MapPin className="w-10 h-10 text-moon-muted mb-3" />
          <p className="text-moon-text font-medium">No addresses saved yet</p>
          <p className="text-sm text-moon-muted mt-1">Add an address to speed up checkout</p>
        </div>
      </MoonCard>
    </div>
  )
}

export default Addresses
