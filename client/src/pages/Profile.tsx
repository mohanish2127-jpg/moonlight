import { useQuery } from '@tanstack/react-query'
import api from '../lib/api'
import Loader from '../components/Loader'
import { Input } from '../components/ui/input'
import { Label } from '../components/ui/label'
import { Button } from '../components/ui/button'

function Profile() {
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
    <div className="space-y-6 max-w-lg">
      <h1 className="text-2xl font-semibold text-moon-text">Profile</h1>

      <div className="flex items-center gap-4">
        <div className="w-16 h-16 rounded-full bg-moon-surface border border-moon-border flex items-center justify-center text-moon-muted text-xl font-medium">
          {data?.avatar ? (
            <img
              src={data.avatar}
              alt={data.name}
              className="w-full h-full rounded-full object-cover"
            />
          ) : (
            data?.name?.charAt(0).toUpperCase()
          )}
        </div>
        <Button
          variant="outline"
          size="sm"
          className="border-moon-border text-moon-text hover:bg-moon-surface"
        >
          Change Avatar
        </Button>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label className="text-moon-text">Name</Label>
          <Input
            defaultValue={data?.name}
            className="bg-moon-surface border-moon-border text-moon-text"
          />
        </div>

        <div className="space-y-2">
          <Label className="text-moon-text">Email</Label>
          <Input
            defaultValue={data?.email}
            disabled
            className="bg-moon-surface border-moon-border text-moon-muted"
          />
        </div>

        <div className="space-y-2">
          <Label className="text-moon-text">Phone</Label>
          <Input
            defaultValue={data?.phone || ''}
            placeholder="Add a phone number"
            className="bg-moon-surface border-moon-border text-moon-text placeholder:text-moon-muted"
          />
        </div>

        <Button className="bg-moon-primary hover:bg-moon-primary-light text-white">
          Save Changes
        </Button>
      </div>
    </div>
  )
}

export default Profile
