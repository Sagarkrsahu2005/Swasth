'use client'

import { useState } from 'react'
import { useParams } from 'next/navigation'
import Navbar from '@/components/navbar'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useHospitals } from '@/lib/hospital-context'
import { AlertCircle, CheckCircle } from 'lucide-react'

export default function AdminDashboard() {
  const { hospitals, updateHospitalAvailability } = useHospitals()
  
  const defaultHospital = hospitals[0]
  const [selectedHospitalId, setSelectedHospitalId] = useState(defaultHospital?.id || '')
  const [availability, setAvailability] = useState({
    beds: defaultHospital?.beds.available || 45,
    icuBeds: defaultHospital?.icuBeds.available || 12,
    ventilators: defaultHospital?.ventilators.available || 8,
    oxygen: defaultHospital?.oxygen.available || 95,
  })
  const [loading, setLoading] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')

  const selectedHospital = hospitals.find(h => h.id === selectedHospitalId)

  const handleUpdateAvailability = async () => {
    if (!selectedHospitalId) {
      console.log("[v0] No hospital selected");
      return
    }

    // Validate values
    if (selectedHospital) {
      if (availability.beds > selectedHospital.beds.total) {
        console.log("[v0] Invalid beds value");
        alert('Beds cannot exceed total capacity');
        return
      }
      if (availability.icuBeds > selectedHospital.icuBeds.total) {
        console.log("[v0] Invalid ICU beds value");
        alert('ICU beds cannot exceed total capacity');
        return
      }
      if (availability.ventilators > selectedHospital.ventilators.total) {
        console.log("[v0] Invalid ventilators value");
        alert('Ventilators cannot exceed total capacity');
        return
      }
      if (availability.oxygen > selectedHospital.oxygen.total) {
        console.log("[v0] Invalid oxygen value");
        alert('Oxygen cannot exceed total capacity');
        return
      }
    }

    setLoading(true)
    setSuccessMessage('')
    
    // Simulate API call
    setTimeout(() => {
      if (selectedHospitalId) {
        updateHospitalAvailability(selectedHospitalId, 'beds', availability.beds)
        updateHospitalAvailability(selectedHospitalId, 'icuBeds', availability.icuBeds)
        updateHospitalAvailability(selectedHospitalId, 'ventilators', availability.ventilators)
        updateHospitalAvailability(selectedHospitalId, 'oxygen', availability.oxygen)
        console.log("[v0] Hospital availability updated successfully");
      }
      setLoading(false)
      setSuccessMessage('Hospital availability updated successfully!')
      setTimeout(() => setSuccessMessage(''), 3000)
    }, 800)
  }

  const handleHospitalChange = (hospitalId: string) => {
    setSelectedHospitalId(hospitalId)
    const hospital = hospitals.find(h => h.id === hospitalId)
    if (hospital) {
      setAvailability({
        beds: hospital.beds.available,
        icuBeds: hospital.icuBeds.available,
        ventilators: hospital.ventilators.available,
        oxygen: hospital.oxygen.available,
      })
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-surface to-background">
      <Navbar />

      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">Hospital Admin Dashboard</h1>
          <p className="text-muted text-lg">Update real-time hospital availability</p>
        </div>

        <Card className="p-6 glass">
          <h2 className="text-2xl font-bold mb-6">Update Hospital Availability</h2>
          
          <div className="mb-6">
            <Label className="mb-2 block">Select Hospital</Label>
            <Select value={selectedHospitalId} onValueChange={handleHospitalChange}>
              <SelectTrigger>
                <SelectValue placeholder="Select a hospital" />
              </SelectTrigger>
              <SelectContent>
                {hospitals.map(hospital => (
                  <SelectItem key={hospital.id} value={hospital.id}>
                    {hospital.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {selectedHospital && (
            <>
              <div className="mb-6 p-4 bg-surface rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h3 className="font-bold text-lg">{selectedHospital.name}</h3>
                    <p className="text-sm text-muted">{selectedHospital.address}, {selectedHospital.city}</p>
                  </div>
                  <Badge className={selectedHospital.status === 'GREEN' ? 'bg-emerald-100 text-emerald-800' : selectedHospital.status === 'YELLOW' ? 'bg-amber-100 text-amber-800' : 'bg-red-100 text-red-800'}>
                    {selectedHospital.status}
                  </Badge>
                </div>
              </div>

              {successMessage && (
                <div className="mb-6 p-4 bg-emerald-50 text-emerald-700 rounded-lg flex items-center gap-2">
                  <CheckCircle className="w-5 h-5" />
                  {successMessage}
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div>
                  <Label className="mb-2 block">Available Beds</Label>
                  <div className="flex gap-2">
                    <Input
                      type="number"
                      min="0"
                      max={selectedHospital.beds.total}
                      value={availability.beds}
                      onChange={(e) => setAvailability({ ...availability, beds: parseInt(e.target.value) || 0 })}
                    />
                    <span className="flex items-center px-3 bg-surface rounded-md text-muted">/ {selectedHospital.beds.total}</span>
                  </div>
                </div>
                <div>
                  <Label className="mb-2 block">Available ICU Beds</Label>
                  <div className="flex gap-2">
                    <Input
                      type="number"
                      min="0"
                      max={selectedHospital.icuBeds.total}
                      value={availability.icuBeds}
                      onChange={(e) => setAvailability({ ...availability, icuBeds: parseInt(e.target.value) || 0 })}
                    />
                    <span className="flex items-center px-3 bg-surface rounded-md text-muted">/ {selectedHospital.icuBeds.total}</span>
                  </div>
                </div>
                <div>
                  <Label className="mb-2 block">Available Ventilators</Label>
                  <div className="flex gap-2">
                    <Input
                      type="number"
                      min="0"
                      max={selectedHospital.ventilators.total}
                      value={availability.ventilators}
                      onChange={(e) => setAvailability({ ...availability, ventilators: parseInt(e.target.value) || 0 })}
                    />
                    <span className="flex items-center px-3 bg-surface rounded-md text-muted">/ {selectedHospital.ventilators.total}</span>
                  </div>
                </div>
                <div>
                  <Label className="mb-2 block">Available Oxygen Cylinders</Label>
                  <div className="flex gap-2">
                    <Input
                      type="number"
                      min="0"
                      max={selectedHospital.oxygen.total}
                      value={availability.oxygen}
                      onChange={(e) => setAvailability({ ...availability, oxygen: parseInt(e.target.value) || 0 })}
                    />
                    <span className="flex items-center px-3 bg-surface rounded-md text-muted">/ {selectedHospital.oxygen.total}</span>
                  </div>
                </div>
              </div>

              <Button onClick={handleUpdateAvailability} disabled={loading} size="lg" className="w-full">
                {loading ? 'Updating...' : 'Update Availability'}
              </Button>
            </>
          )}
        </Card>
      </main>
    </div>
  )
}
