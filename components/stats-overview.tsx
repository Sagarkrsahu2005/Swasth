import { Card } from '@/components/ui/card'
import { Building2, Bed, Activity, Wind } from 'lucide-react'
import { Hospital } from '@/lib/mock-data'

export default function StatsOverview({ hospitals }: { hospitals: Hospital[] }) {
  const totalBeds = hospitals.reduce((sum, h) => sum + h.beds.available, 0)
  const totalICU = hospitals.reduce((sum, h) => sum + h.icuBeds.available, 0)
  const totalVentilators = hospitals.reduce((sum, h) => sum + h.ventilators.available, 0)
  const greenHospitals = hospitals.filter(h => h.status === 'GREEN').length

  const stats = [
    { icon: Building2, label: 'Available Hospitals', value: greenHospitals, total: hospitals.length, color: 'text-emerald-600' },
    { icon: Bed, label: 'Total Beds', value: totalBeds, color: 'text-blue-600' },
    { icon: Activity, label: 'ICU Beds', value: totalICU, color: 'text-red-600' },
    { icon: Wind, label: 'Ventilators', value: totalVentilators, color: 'text-orange-600' },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
      {stats.map((stat, idx) => {
        const Icon = stat.icon
        return (
          <Card key={idx} className="p-6 glass">
            <div className="flex items-center gap-4">
              <Icon className={`w-8 h-8 ${stat.color}`} />
              <div>
                <p className="text-sm text-muted">{stat.label}</p>
                <p className="text-2xl font-bold">
                  {stat.value}
                  {stat.total && <span className="text-sm text-muted ml-1">/ {stat.total}</span>}
                </p>
              </div>
            </div>
          </Card>
        )
      })}
    </div>
  )
}
