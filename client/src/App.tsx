import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from './lib/queryClient'
import MainLayout from './layouts/MainLayout'
import AccountLayout from './layouts/AccountLayout'
import ProtectedRoute from './components/ProtectedRoute'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import Profile from './pages/Profile'
import Addresses from './pages/Addresses'
import Settings from './pages/Settings'
import Activity from './pages/Activity'
import NotFound from './pages/NotFound'

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            <Route element={<ProtectedRoute />}>
              <Route element={<AccountLayout />}>
                <Route path="/account" element={<Dashboard />} />
                <Route path="/account/profile" element={<Profile />} />
                <Route path="/account/addresses" element={<Addresses />} />
                <Route path="/account/settings" element={<Settings />} />
                <Route path="/account/activity" element={<Activity />} />
              </Route>
            </Route>

            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  )
}

export default App
