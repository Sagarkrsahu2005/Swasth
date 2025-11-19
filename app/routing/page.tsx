'use client'

import { useState, useMemo, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Navbar from '@/components/navbar'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Zap, MapPin, Phone, AlertCircle, Siren } from 'lucide-react'
import { useHospitals } from '@/lib/hospital-context'
import { SPECIALTIES } from '@/lib/mock-data'
import Link from 'next/link'

function haversineDistance(lat1: number, lon1: number, lat2: number, lon2: number) {
  const toRad = (v: number) => (v * Math.PI) / 180
  const R = 6371 // km
  const dLat = toRad(lat2 - lat1)
  const dLon = toRad(lon2 - lon1)
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  return R * c
}

function RoutingContent() {
  const searchParams = useSearchParams()
  const { hospitals } = useHospitals()
  const [emergencyLevel, setEmergencyLevel] = useState('URGENT')
  const [requiredSpecialty, setRequiredSpecialty] = useState('all')
  const [userLocation, setUserLocation] = useState<{lat: number; lng: number} | null>(null)
  const [locError, setLocError] = useState('')
  const [isLocLoading, setIsLocLoading] = useState(false)

export default function RoutingPage() {
  const searchParams = useSearchParams()
  const { hospitals } = useHospitals()
  const [userLocation, setUserLocation] = useState<{lat: number; lng: number} | null>(null)
  const [locError, setLocError] = useState('')
  const [isLocLoading, setIsLocLoading] = useState(false)
  const [emergencyLevel, setEmergencyLevel] = useState('URGENT')
  const [requiredSpecialty, setRequiredSpecialty] = useState('all')

  const handleCallNow = () => {
    if (bestHospital) {
      console.log("[v0] Calling hospital:", bestHospital.phone);
      window.location.href = `tel:${bestHospital.phone}`;
    }
  }

  const handleOpenMaps = () => {
    if (bestHospital) {
      const mapsUrl = `https://www.google.com/maps/search/${encodeURIComponent(bestHospital.name)},${encodeURIComponent(bestHospital.city)}`;
      window.open(mapsUrl, '_blank');
      console.log("[v0] Opening maps for:", bestHospital.name);
    }
  }

  const handleGetRecommendation = () => {
    console.log("[v0] Getting recommendation with:", { emergencyLevel, requiredSpecialty });
  }

  useEffect(() => {
    // Attempt geolocation on mount
    setIsLocLoading(true)
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        pos => {
          setUserLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude })
          setIsLocLoading(false)
        },
        err => {
          setLocError('Location access denied. Distances may be approximate.')
          setIsLocLoading(false)
        },
        { enableHighAccuracy: true, timeout: 8000 }
      )
    } else {
      setLocError('Geolocation not supported.')
      setIsLocLoading(false)
    }
  }, [])

  const routingResults = useMemo(() => {
    const scored = hospitals.map(h => {
      let score = 0
      // Recalculate distance if user location available
      const effectiveDistance = userLocation ? haversineDistance(userLocation.lat, userLocation.lng, h.coordinates.lat, h.coordinates.lng) : h.distance
      // Distance score (20%)
      const distanceScore = Math.max(0, 100 - (effectiveDistance * 10))
      score += distanceScore * 0.2
      
      // Availability score (40%)
      const bedAvailability = (h.beds.available / h.beds.total) * 100
      const icuAvailability = (h.icuBeds.available / h.icuBeds.total) * 100
      const ventilatorAvailability = (h.ventilators.available / h.ventilators.total) * 100
      const availabilityScore = (bedAvailability + icuAvailability + ventilatorAvailability) / 3
      score += availabilityScore * 0.4
      
      // Status score (30%)
      const statusScore = h.status === 'GREEN' ? 100 : h.status === 'YELLOW' ? 60 : 0
      score += statusScore * 0.3
      
      // Specialty match (10%)
      const specialtyScore = requiredSpecialty !== 'all' && h.specialties.includes(requiredSpecialty) ? 100 : 0
      score += specialtyScore * 0.1
      
      return { ...h, score: Math.round(score), effectiveDistance: parseFloat(effectiveDistance.toFixed(2)) }
    })

    return scored.sort((a, b) => b.score - a.score)
  }, [hospitals, requiredSpecialty, userLocation])

  const bestHospital = routingResults[0]
  const alternatives = routingResults.slice(1, 3)

  const handleRequestAmbulance = () => {
    if (!bestHospital) return
    console.log('[v0] Requesting ambulance for hospital', bestHospital.id)
    alert('Ambulance request sent (demo).')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-surface to-background">
      <Navbar />

      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">Find Best Hospital</h1>
          <p className="text-muted text-lg">AI-powered hospital routing for your emergency</p>
          {isLocLoading && <p className="text-xs text-primary mt-2">Acquiring location...</p>}
          {locError && <p className="text-xs text-red-600 mt-2">{locError}</p>}
          {userLocation && !isLocLoading && !locError && (
            <p className="text-xs text-emerald-600 mt-2">Location locked: {userLocation.lat.toFixed(4)}, {userLocation.lng.toFixed(4)}</p>
          )}
        </div>

        {/* Search Form */}
        <Card className="p-6 glass mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium mb-2">Emergency Level</label>
              <Select value={emergencyLevel} onValueChange={setEmergencyLevel}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="CRITICAL">Critical - Life-threatening</SelectItem>
                  <SelectItem value="URGENT">Urgent - Serious condition</SelectItem>
                  <SelectItem value="MODERATE">Moderate - Stable condition</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Required Specialty (Optional)</label>
              <Select value={requiredSpecialty} onValueChange={setRequiredSpecialty}>
                <SelectTrigger>
                  <SelectValue placeholder="Any specialty" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Any Specialty</SelectItem>
                  {SPECIALTIES.map(spec => (
                    <SelectItem key={spec} value={spec}>{spec}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-end">
              <Button onClick={handleGetRecommendation} className="w-full gap-2">
                <Zap className="w-4 h-4" />
                Get Recommendation
              </Button>
            </div>
          </div>
        </Card>

        {/* Results */}
        {bestHospital && (
          <>
            {/* Best Hospital */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-foreground mb-4">Recommended Hospital</h2>
              <Card className="p-6 glass border-2 border-primary">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold mb-2">{bestHospital.name}</h3>
                    <div className="flex items-center gap-4 mb-4 text-sm text-muted">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {bestHospital.effectiveDistance ?? bestHospital.distance} km away
                      </span>
                      <Badge className={bestHospital.status === 'GREEN' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'}>
                        {bestHospital.status === 'GREEN' ? 'Available' : 'Limited'}
                      </Badge>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-4xl font-bold text-primary mb-1">{bestHospital.score}%</div>
                    <p className="text-xs text-muted">Match Score</p>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="p-3 bg-surface rounded-lg">
                    <p className="text-xs text-muted mb-1">Available Beds</p>
                    <p className="text-lg font-bold text-primary">{bestHospital.beds.available}</p>
                  </div>
                  <div className="p-3 bg-surface rounded-lg">
                    <p className="text-xs text-muted mb-1">ICU Beds</p>
                    <p className="text-lg font-bold text-secondary">{bestHospital.icuBeds.available}</p>
                  </div>
                  <div className="p-3 bg-surface rounded-lg">
                    <p className="text-xs text-muted mb-1">Ventilators</p>
                    <p className="text-lg font-bold text-accent">{bestHospital.ventilators.available}</p>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  <Button size="lg" className="flex-1 gap-2" onClick={handleCallNow}>
                    <Phone className="w-4 h-4" />
                    Call Now
                  </Button>
                  <Button size="lg" variant="outline" className="flex-1" onClick={handleOpenMaps}>Open in Maps</Button>
                  <Button size="lg" variant="secondary" className="flex-1 gap-2" onClick={handleRequestAmbulance}>
                    <Siren className="w-4 h-4" />
                    Request Ambulance
                  </Button>
                </div>
              </Card>
            </div>

            {/* Alternatives */}
            {alternatives.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-4">Alternative Hospitals</h2>
                <div className="space-y-3">
                  {alternatives.map((hospital) => (
                    <Card key={hospital.id} className="p-4 glass hover:shadow-lg transition cursor-pointer">
                      <Link href={`/hospital/${hospital.id}`}>
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <h4 className="font-bold mb-1">{hospital.name}</h4>
                            <div className="flex items-center gap-4 text-sm text-muted">
                              <span className="flex items-center gap-1">
                                <MapPin className="w-4 h-4" />
                                {hospital.effectiveDistance ?? hospital.distance} km
                              </span>
                              <Badge variant="outline">{hospital.status}</Badge>
                              <span>{hospital.beds.available} beds available</span>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-lg font-bold text-primary mb-2">{hospital.score}%</p>
                            <Button variant="outline" size="sm">View</Button>
                          </div>
                        </div>
                      </Link>
                    </Card>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  )
}

export default function RoutingPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <RoutingContent />
    </Suspense>
  )
}
