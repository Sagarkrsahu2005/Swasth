import Link from 'next/link'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { MapPin, Bed, Activity } from 'lucide-react'
import { Hospital } from '@/lib/mock-data'

interface HospitalListProps {
  hospitals: Hospital[]
}

const getStatusColor = (status: string) => {
  switch (status) {
    case 'GREEN': return 'bg-emerald-100 text-emerald-800 border-emerald-300'
    case 'YELLOW': return 'bg-amber-100 text-amber-800 border-amber-300'
    case 'RED': return 'bg-red-100 text-red-800 border-red-300'
    default: return 'bg-gray-100 text-gray-800'
  }
}

export default function HospitalList({ hospitals }: HospitalListProps) {
  if (hospitals.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted text-lg">No hospitals found. Try adjusting your search.</p>
      </div>
    )
  }

  const handleViewDetails = (id: string) => {
    console.log("[v0] View details clicked for hospital:", id);
  }

  const handleRouteMe = (id: string) => {
    console.log("[v0] Route me clicked for hospital:", id);
  }

  return (
    <div className="grid grid-cols-1 gap-4">
      {hospitals.map((hospital) => (
        <Card key={hospital.id} className="p-6 hover:shadow-lg transition glass">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <h3 className="text-xl font-bold">{hospital.name}</h3>
                <Badge className={getStatusColor(hospital.status)}>
                  {hospital.status === 'GREEN' ? 'Available' : hospital.status === 'YELLOW' ? 'Limited' : 'Full'}
                </Badge>
              </div>
              <div className="flex items-center gap-1 text-muted text-sm">
                <MapPin className="w-4 h-4" />
                {hospital.address}, {hospital.city} • {hospital.distance} km away
              </div>
            </div>
            <div className="text-right">
              <div className="text-lg font-bold text-primary mb-1">⭐ {hospital.rating}</div>
            </div>
          </div>

          <div className="grid grid-cols-4 gap-4 mb-4">
            <div className="bg-surface p-3 rounded-lg">
              <div className="text-xs text-muted mb-1">Beds</div>
              <div className="text-lg font-bold text-primary">{hospital.beds.available}</div>
              <div className="text-xs text-muted">of {hospital.beds.total}</div>
            </div>
            <div className="bg-surface p-3 rounded-lg">
              <div className="text-xs text-muted mb-1">ICU</div>
              <div className="text-lg font-bold text-secondary">{hospital.icuBeds.available}</div>
              <div className="text-xs text-muted">of {hospital.icuBeds.total}</div>
            </div>
            <div className="bg-surface p-3 rounded-lg">
              <div className="text-xs text-muted mb-1">Ventilators</div>
              <div className="text-lg font-bold text-accent">{hospital.ventilators.available}</div>
              <div className="text-xs text-muted">of {hospital.ventilators.total}</div>
            </div>
            <div className="bg-surface p-3 rounded-lg">
              <div className="text-xs text-muted mb-1">Oxygen</div>
              <div className="text-lg font-bold text-foreground">{hospital.oxygen.available}</div>
              <div className="text-xs text-muted">of {hospital.oxygen.total}</div>
            </div>
          </div>

          <div className="flex items-center gap-2 mb-4">
            {hospital.specialties.slice(0, 3).map((spec) => (
              <Badge key={spec} variant="secondary" className="text-xs">
                {spec}
              </Badge>
            ))}
            {hospital.specialties.length > 3 && (
              <Badge variant="secondary" className="text-xs">+{hospital.specialties.length - 3}</Badge>
            )}
          </div>

          <div className="flex gap-2">
            <Link href={`/hospital/${hospital.id}`} className="flex-1">
              <Button className="w-full" onClick={() => handleViewDetails(hospital.id)}>View Details</Button>
            </Link>
            <Link href={`/routing?hospitalId=${hospital.id}`} className="flex-1">
              <Button variant="outline" className="w-full" onClick={() => handleRouteMe(hospital.id)}>Route Me</Button>
            </Link>
          </div>
        </Card>
      ))}
    </div>
  )
}
