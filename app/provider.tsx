'use client'

import { HospitalProvider } from '@/lib/hospital-context'
import { AuthProvider } from '@/components/auth-context'
export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <HospitalProvider>
        {children}
      </HospitalProvider>
    </AuthProvider>
  )
}
