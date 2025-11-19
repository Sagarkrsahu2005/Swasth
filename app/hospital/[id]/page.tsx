'use client'

import { useParams } from 'next/navigation'
import Navbar from '@/components/navbar'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Phone, MapPin, Clock, Users, AlertCircle } from 'lucide-react'
import { useHospitals } from '@/lib/hospital-context'

export default function HospitalDetails() {
  const params = useParams()
  const { getHospitalById } = useHospitals()
  
  const hospital = getHospitalById(params.id as string)

  if (!hospital) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-surface to-background">
        <Navbar />
        <main className="max-w-4xl mx-auto px-4 py-8">
          <div className="text-center py-12">
            <p className="text-muted text-lg">Hospital not found</p>
          </div>
        </main>
      </div>
    )
  }

  const statusColors: Record<string, string> = {
    GREEN: 'bg-emerald-100 text-emerald-800 border-emerald-300',
    YELLOW: 'bg-amber-100 text-amber-800 border-amber-300',
    RED: 'bg-red-100 text-red-800 border-red-300',
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-surface to-background">
      <Navbar />

      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-4xl font-bold text-foreground mb-2">{hospital.name}</h1>
              <div className="flex items-center gap-2">
                <Badge className={statusColors[hospital.status]}>
                  {hospital.status === 'GREEN' ? 'Available' : hospital.status === 'YELLOW' ? 'Limited' : 'Full'}
                </Badge>
                <Badge variant="outline">⭐ {hospital.rating}</Badge>
                <Badge variant="outline">24/7 Emergency</Badge>
              </div>
            </div>
            <Button size="lg" className="gap-2">
              <Phone className="w-5 h-5" />
              {hospital.phone}
            </Button>
          </div>
        </div>

        {/* Info Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card className="p-6 glass">
            <h3 className="font-bold text-lg mb-4">Contact Information</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary mt-0.5" />
                <div>
                  <p className="font-medium">{hospital.address}</p>
                  <p className="text-sm text-muted">{hospital.city}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-primary" />
                <a href={`tel:${hospital.phone}`} className="text-primary hover:underline">{hospital.phone}</a>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-primary" />
                <p>24/7 Emergency Services</p>
              </div>
            </div>
          </Card>

          <Card className="p-6 glass">
            <h3 className="font-bold text-lg mb-4">Specialties & Staff</h3>
            <div className="flex flex-wrap gap-2 mb-4">
              {hospital.specialties.map((spec) => (
                <Badge key={spec} variant="secondary">{spec}</Badge>
              ))}
            </div>
            <h4 className="font-bold mb-3 text-sm">Doctors On Duty: {hospital.doctors.length}</h4>
            <div className="space-y-2">
              {hospital.doctors.map((doc) => (
                <div key={doc.id} className="flex items-center gap-2 text-sm">
                  <div className={`w-2 h-2 rounded-full ${doc.available ? 'bg-emerald-500' : 'bg-gray-400'}`}></div>
                  <span>{doc.name}</span>
                  <span className="text-xs text-muted">({doc.specialty})</span>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Availability */}
        <Card className="p-6 glass mb-8">
          <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
            <AlertCircle className="w-5 h-5" />
            Current Real-Time Availability
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-surface rounded-lg">
              <p className="text-sm text-muted mb-1">General Beds</p>
              <p className="text-3xl font-bold text-primary">{hospital.beds.available}</p>
              <p className="text-xs text-muted mt-1">of {hospital.beds.total}</p>
            </div>
            <div className="text-center p-4 bg-surface rounded-lg">
              <p className="text-sm text-muted mb-1">ICU Beds</p>
              <p className="text-3xl font-bold text-secondary">{hospital.icuBeds.available}</p>
              <p className="text-xs text-muted mt-1">of {hospital.icuBeds.total}</p>
            </div>
            <div className="text-center p-4 bg-surface rounded-lg">
              <p className="text-sm text-muted mb-1">Ventilators</p>
              <p className="text-3xl font-bold text-accent">{hospital.ventilators.available}</p>
              <p className="text-xs text-muted mt-1">of {hospital.ventilators.total}</p>
            </div>
            <div className="text-center p-4 bg-surface rounded-lg">
              <p className="text-sm text-muted mb-1">Oxygen Cylinders</p>
              <p className="text-3xl font-bold">{hospital.oxygen.available}</p>
              <p className="text-xs text-muted mt-1">of {hospital.oxygen.total}</p>
            </div>
          </div>
        </Card>

        {/* Insurance */}
        <Card className="p-6 glass">
          <h3 className="font-bold text-lg mb-4">Accepted Insurance</h3>
          <div className="flex flex-wrap gap-2">
            {hospital.acceptedInsurance.map((partner) => (
              <Badge key={partner} variant="outline">{partner}</Badge>
            ))}
          </div>
        </Card>
      </main>
    </div>
  )
}
