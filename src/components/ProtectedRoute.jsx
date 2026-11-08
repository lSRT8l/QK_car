import { Navigate } from 'react-router-dom'

export function ProtectedUserRoute({ children }) {
  const user = JSON.parse(localStorage.getItem('cc_currentUser') || 'null')
  if (!user) return <Navigate to="/login" replace />
  return children
}

export function ProtectedAdminRoute({ children }) {
  const isAdmin = JSON.parse(localStorage.getItem('cc_isAdmin') || 'false')
  if (!isAdmin) return <Navigate to="/admin-login" replace />
  return children
}
