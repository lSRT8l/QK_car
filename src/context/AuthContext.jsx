import { createContext, useContext, useState, useEffect, useCallback } from 'react'

const AuthContext = createContext(null)

const ADMIN_CREDENTIALS = {
  email: 'admin@carcare.sa',
  password: 'admin123',
}

function loadFromStorage(key, fallback) {
  try {
    const raw = localStorage.getItem(key)
    if (raw) return JSON.parse(raw)
  } catch (e) { /* ignore */ }
  return fallback
}

function saveToStorage(key, data) {
  try {
    localStorage.setItem(key, JSON.stringify(data))
  } catch (e) { /* ignore */ }
}

export function AuthProvider({ children }) {
  const [users, setUsers] = useState(() => loadFromStorage('cc_users', []))
  const [currentUser, setCurrentUser] = useState(() => loadFromStorage('cc_currentUser', null))
  const [isAdmin, setIsAdmin] = useState(() => loadFromStorage('cc_isAdmin', false))

  useEffect(() => { saveToStorage('cc_users', users) }, [users])
  useEffect(() => { saveToStorage('cc_currentUser', currentUser) }, [currentUser])
  useEffect(() => { saveToStorage('cc_isAdmin', isAdmin) }, [isAdmin])

  const signup = useCallback((name, email, phone, password) => {
    const exists = users.find((u) => u.email === email)
    if (exists) return { error: 'البريد الإلكتروني مسجل مسبقاً' }
    const newUser = {
      id: `usr-${Date.now()}`,
      name, email, phone, password,
      createdAt: new Date().toISOString(),
    }
    setUsers((prev) => [...prev, newUser])
    setCurrentUser({ id: newUser.id, name, email, phone })
    return { user: newUser }
  }, [users])

  const login = useCallback((email, password) => {
    const user = users.find((u) => u.email === email && u.password === password)
    if (!user) return { error: 'البريد الإلكتروني أو كلمة المرور غير صحيحة' }
    setCurrentUser({ id: user.id, name: user.name, email: user.email, phone: user.phone })
    return { user }
  }, [users])

  const adminLogin = useCallback((email, password) => {
    if (email === ADMIN_CREDENTIALS.email && password === ADMIN_CREDENTIALS.password) {
      setIsAdmin(true)
      return { success: true }
    }
    return { error: 'بيانات الدخول الخاصة بالإدارة غير صحيحة' }
  }, [])

  const logout = useCallback(() => {
    setCurrentUser(null)
    setIsAdmin(false)
  }, [])

  const updateProfile = useCallback((updates) => {
    if (!currentUser) return
    setUsers((prev) => prev.map((u) =>
      u.id === currentUser.id ? { ...u, ...updates } : u
    ))
    setCurrentUser((prev) => ({ ...prev, ...updates }))
  }, [currentUser])

  return (
    <AuthContext.Provider
      value={{
        currentUser, isAdmin,
        signup, login, adminLogin, logout, updateProfile,
        adminEmail: ADMIN_CREDENTIALS.email,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
