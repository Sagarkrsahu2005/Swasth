'use client'

import { useMemo } from 'react'
import Navbar from '@/components/navbar'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { useHospitals } from '@/lib/hospital-context'
import { Ambulance, MapPin, Clock, AlertCircle } from 'lucide-react'

export default function AmbulancePage() {
  const { ambulances, hospitals } = useHospitals()

  const ambulancesByHospital = useMemo(() => {
    const grouped: Record<string, any[]> = {}
    ambulances.forEach(amb => {
      if (!grouped[amb.hospitalId]) grouped[amb.hospitalId] = []
      grouped[amb.hospitalId].push(amb)
    })
    return grouped
  }, [ambulances])

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'AVAILABLE': return 'bg-emerald-100 text-emerald-800'
      case 'RESPONDING': return 'bg-blue-100 text-blue-800'
      case 'IN_TRANSIT': return 'bg-amber-100 text-amber-800'
      case 'BUSY': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'AVAILABLE': return '✓'
      case 'RESPONDING': return '→'
      case 'IN_TRANSIT': return '⚡'
      case 'BUSY': return '⊘'
      default: return '?'
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-surface to-background">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">Ambulance Live Tracking</h1>
          <p className="text-muted text-lg">Real-time ambulance availability and status across all hospitals</p>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="p-6 glass">
            <p className="text-sm text-muted mb-2">Total Ambulances</p>
            <p className="text-3xl font-bold">{ambulances.length}</p>
          </Card>
          <Card className="p-6 glass">
            <p className="text-sm text-muted mb-2">Available</p>
            <p className="text-3xl font-bold text-emerald-600">{ambulances.filter(a => a.status === 'AVAILABLE').length}</p>
          </Card>
          <Card className="p-6 glass">
            <p className="text-sm text-muted mb-2">In Transit</p>
            <p className="text-3xl font-bold text-amber-600">{ambulances.filter(a => a.status === 'IN_TRANSIT').length}</p>
          </Card>
          <Card className="p-6 glass">
            <p className="text-sm text-muted mb-2">Busy/Responding</p>
            <p className="text-3xl font-bold text-red-600">{ambulances.filter(a => a.status === 'BUSY' || a.status === 'RESPONDING').length}</p>
          </Card>
        </div>

        {/* Ambulances by Hospital */}
        <div className="space-y-6">
          {hospitals.map(hospital => (
            <Card key={hospital.id} className="p-6 glass">
              <div className="mb-4">
                <h3 className="text-xl font-bold mb-1">{hospital.name}</h3>
                <p className="text-sm text-muted">{hospital.address}</p>
              </div>

              {ambulancesByHospital[hospital.id] && ambulancesByHospital[hospital.id].length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left py-3 px-4 font-semibold">ID</th>
                        <th className="text-left py-3 px-4 font-semibold">Status</th>
                        <th className="text-left py-3 px-4 font-semibold">Location</th>
                        <th className="text-left py-3 px-4 font-semibold">Last Updated</th>
                      </tr>
                    </thead>
                    <tbody>
                      {ambulancesByHospital[hospital.id].map(amb => (
                        <tr key={amb.id} className="border-b border-border hover:bg-surface transition">
                          <td className="py-4 px-4 font-medium">{amb.id}</td>
                          <td className="py-4 px-4">
                            <Badge className={getStatusColor(amb.status)}>
                              <span className="mr-1">{getStatusIcon(amb.status)}</span>
                              {amb.status}
                            </Badge>
                          </td>
                          <td className="py-4 px-4">
                            <div className="flex items-center gap-2 text-muted">
                              <MapPin className="w-4 h-4" />
                              {amb.location.lat.toFixed(4)}, {amb.location.lng.toFixed(4)}
                            </div>
                          </td>
                          <td className="py-4 px-4">
                            <div className="flex items-center gap-2 text-muted">
                              <Clock className="w-4 h-4" />
                              Just now
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="py-8 text-center text-muted">
                  <AlertCircle className="w-8 h-8 mx-auto mb-2 opacity-50" />
                  <p>No ambulances available at this hospital</p>
                </div>
              )}
            </Card>
          ))}
        </div>
      </main>
    </div>
  )
}
