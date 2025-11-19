'use client'

import { useState, useMemo, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/components/auth-context'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'
import Navbar from '@/components/navbar'
import HospitalList from '@/components/hospital-list'
import StatsOverview from '@/components/stats-overview'
import SearchFilters from '@/components/search-filters'
import { useHospitals } from '@/lib/hospital-context'
import { SPECIALTIES } from '@/lib/mock-data'

export default function Dashboard() {
  const router = useRouter()
  const { isAuthenticated, isLoading } = useAuth()
  const { hospitals } = useHospitals()
  const [searchLocation, setSearchLocation] = useState('')
  const [selectedSpecialty, setSelectedSpecialty] = useState('all')
  const [emergencyLevel, setEmergencyLevel] = useState('MODERATE')

  const filteredHospitals = useMemo(() => {
    return hospitals.filter(h => {
      const matchesLocation = searchLocation === '' || 
        h.city.toLowerCase().includes(searchLocation.toLowerCase()) ||
        h.address.toLowerCase().includes(searchLocation.toLowerCase())
      const matchesSpecialty = selectedSpecialty === 'all' || selectedSpecialty === '' || h.specialties.includes(selectedSpecialty)
      return matchesLocation && matchesSpecialty
    })
  }, [hospitals, searchLocation, selectedSpecialty])

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.replace('/login')
    }
  }, [isAuthenticated, isLoading, router])

  if (!isAuthenticated) {
    return null // Prevent flashing dashboard before redirect
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-surface to-background">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">Find Emergency Care</h1>
          <p className="text-muted text-lg">Get instant access to real-time hospital availability</p>
        </div>

        {/* Search Section */}
        <SearchFilters 
          searchLocation={searchLocation}
          setSearchLocation={setSearchLocation}
          selectedSpecialty={selectedSpecialty}
          setSelectedSpecialty={setSelectedSpecialty}
          specialties={SPECIALTIES}
          emergencyLevel={emergencyLevel}
          setEmergencyLevel={setEmergencyLevel}
        />

        {/* Stats Overview */}
        <StatsOverview hospitals={filteredHospitals} />

        {/* Hospital List */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold text-foreground mb-6">Available Hospitals ({filteredHospitals.length})</h2>
          <HospitalList hospitals={filteredHospitals} />
        </div>
      </main>
    </div>
  )
}
