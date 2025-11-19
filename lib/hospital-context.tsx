'use client'

import React, { createContext, useContext, useState, useCallback, useEffect } from 'react'
import { Hospital, Ambulance, MOCK_HOSPITALS, MOCK_AMBULANCES } from './mock-data'

interface HospitalContextType {
  hospitals: Hospital[]
  ambulances: Ambulance[]
  updateHospitalAvailability: (hospitalId: string, field: string, value: number) => void
  updateAmbulanceStatus: (ambulanceId: string, status: string) => void
  getHospitalById: (id: string) => Hospital | undefined
}

const HospitalContext = createContext<HospitalContextType | undefined>(undefined)

export function HospitalProvider({ children }: { children: React.ReactNode }) {
  const [hospitals, setHospitals] = useState<Hospital[]>(MOCK_HOSPITALS)
  const [ambulances, setAmbulances] = useState<Ambulance[]>(MOCK_AMBULANCES)

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setHospitals(prev => prev.map(hospital => ({
        ...hospital,
        beds: {
          ...hospital.beds,
          available: Math.max(0, hospital.beds.available + (Math.random() > 0.7 ? -1 : 1)),
        },
        oxygen: {
          ...hospital.oxygen,
          available: Math.min(hospital.oxygen.total, hospital.oxygen.available + (Math.random() > 0.6 ? 1 : 0)),
        },
      })))
    }, 5000) // Update every 5 seconds

    return () => clearInterval(interval)
  }, [])

  const updateHospitalAvailability = useCallback((hospitalId: string, field: string, value: number) => {
    setHospitals(prev => prev.map(h => 
      h.id === hospitalId 
        ? { ...h, [field]: { ...h[field as keyof Hospital], available: value } }
        : h
    ))
  }, [])

  const updateAmbulanceStatus = useCallback((ambulanceId: string, status: string) => {
    setAmbulances(prev => prev.map(a =>
      a.id === ambulanceId
        ? { ...a, status: status as 'AVAILABLE' | 'RESPONDING' | 'IN_TRANSIT' | 'BUSY', lastUpdated: new Date().toISOString() }
        : a
    ))
  }, [])

  const getHospitalById = useCallback((id: string) => {
    return hospitals.find(h => h.id === id)
  }, [hospitals])

  return (
    <HospitalContext.Provider value={{ hospitals, ambulances, updateHospitalAvailability, updateAmbulanceStatus, getHospitalById }}>
      {children}
    </HospitalContext.Provider>
  )
}

export function useHospitals() {
  const context = useContext(HospitalContext)
  if (!context) {
    throw new Error('useHospitals must be used within HospitalProvider')
  }
  return context
}
