'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'

interface User {
  id: string
  name: string
  role: 'PUBLIC_USER' | 'HOSPITAL_ADMIN' | 'GOV_ADMIN'
  phoneNumber: string
  hospitalId?: string
}

interface AuthContextType {
  user: User | null
  isLoading: boolean
  logout: () => void
  isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Force fresh login each browser session: use sessionStorage instead of localStorage.
    const token = typeof window !== 'undefined' ? sessionStorage.getItem('authToken') : null
    const userRole = typeof window !== 'undefined' ? sessionStorage.getItem('userRole') : null

    if (token && userRole) {
      setUser({
        id: 'mock-user-id',
        name: 'User',
        role: (userRole as any) || 'PUBLIC_USER',
        phoneNumber: (typeof window !== 'undefined' ? sessionStorage.getItem('userPhone') : '') || '',
      })
    }
    setIsLoading(false)
  }, [])

  const logout = () => {
    sessionStorage.removeItem('authToken')
    sessionStorage.removeItem('userRole')
    sessionStorage.removeItem('userPhone')
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, isLoading, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}
