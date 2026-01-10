import { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext()

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

// Simple demo user so the app works without real sign-in
const DEMO_USER = {
  name: 'Demo Student',
  email: 'student@example.com',
  role: 'student',
  _id: 'demo-user-id'
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(DEMO_USER)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // For now, skip any API auth and just use the demo user
    setUser(DEMO_USER)
    setLoading(false)
  }, [])

  // Login/register just set the demo user and report success,
  // so the UI doesn't break if you visit those pages.
  const login = async () => {
    setUser(DEMO_USER)
    return { success: true }
  }

  const register = async () => {
    setUser(DEMO_USER)
    return { success: true }
  }

  const logout = () => {
    // Keep demo user active; effectively disable logout for now
    setUser(DEMO_USER)
  }

  const value = {
    user,
    loading,
    login,
    register,
    logout
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

