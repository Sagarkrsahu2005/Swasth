'use client'

import Navbar from '@/components/navbar'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { useHospitals } from '@/lib/hospital-context'
import { MapPin, Bed, AlertCircle } from 'lucide-react'

export default function MapPage() {
  const { hospitals } = useHospitals()

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'GREEN': return 'bg-emerald-100 text-emerald-800 border-emerald-300'
      case 'YELLOW': return 'bg-amber-100 text-amber-800 border-amber-300'
      case 'RED': return 'bg-red-100 text-red-800 border-red-300'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-surface to-background">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">Hospital Map View</h1>
          <p className="text-muted text-lg">Real-time hospital locations and availability</p>
        </div>

        {/* Map Placeholder with Info */}
        <Card className="p-6 glass mb-8 h-96 flex items-center justify-center bg-gradient-to-br from-surface to-background">
          <div className="text-center">
            <MapPin className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p className="text-muted text-lg mb-2">Map View Coming Soon</p>
            <p className="text-sm text-muted">Hospital map and real-time location tracking will be displayed here</p>
          </div>
        </Card>

        {/* Hospital List with Coordinates */}
        <h2 className="text-2xl font-bold text-foreground mb-6">All Hospital Locations</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {hospitals.map(hospital => (
            <Card key={hospital.id} className="p-4 glass">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-bold mb-1">{hospital.name}</h3>
                  <div className="flex items-center gap-2 text-sm text-muted mb-2">
                    <MapPin className="w-4 h-4" />
                    <span>{hospital.address}</span>
                  </div>
                  <div className="text-xs text-muted mb-3">
                    Coordinates: {hospital.coordinates.lat.toFixed(4)}, {hospital.coordinates.lng.toFixed(4)}
                  </div>
                </div>
                <Badge className={getStatusColor(hospital.status)}>
                  {hospital.status === 'GREEN' ? 'Available' : hospital.status === 'YELLOW' ? 'Limited' : 'Full'}
                </Badge>
              </div>
              <div className="pt-3 border-t border-border">
                <div className="flex items-center gap-2 text-sm">
                  <Bed className="w-4 h-4 text-primary" />
                  <span className="text-muted">Beds:</span>
                  <span className="font-bold">{hospital.beds.available}/{hospital.beds.total}</span>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </main>
    </div>
  )
}
