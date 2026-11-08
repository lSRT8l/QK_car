import { Routes, Route } from 'react-router-dom'
import { DataProvider } from './context/DataContext'
import { AuthProvider } from './context/AuthContext'
import Layout from './components/Layout'
import { ProtectedUserRoute, ProtectedAdminRoute } from './components/ProtectedRoute'
import Home from './pages/Home'
import About from './pages/About'
import Services from './pages/Services'
import Booking from './pages/Booking'
import Admin from './pages/Admin'
import Login from './pages/Login'
import Signup from './pages/Signup'
import AdminLogin from './pages/AdminLogin'
import UserDashboard from './pages/UserDashboard'

export default function App() {
  return (
    <AuthProvider>
      <DataProvider>
        <Routes>
          {/* Auth pages - no layout */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/admin-login" element={<AdminLogin />} />

          {/* Public pages - with layout */}
          <Route path="/" element={<Layout><Home /></Layout>} />
          <Route path="/about" element={<Layout><About /></Layout>} />
          <Route path="/services" element={<Layout><Services /></Layout>} />

          {/* Protected user pages */}
          <Route path="/booking" element={<Layout><Booking /></Layout>} />
          <Route path="/dashboard" element={
            <ProtectedUserRoute>
              <Layout><UserDashboard /></Layout>
            </ProtectedUserRoute>
          } />

          {/* Protected admin pages */}
          <Route path="/admin" element={
            <ProtectedAdminRoute>
              <Admin />
            </ProtectedAdminRoute>
          } />
        </Routes>
      </DataProvider>
    </AuthProvider>
  )
}
