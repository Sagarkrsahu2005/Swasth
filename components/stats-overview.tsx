import { Card } from '@/components/ui/card'
import { Building2, Bed, Activity, Wind, TrendingUp, Heart } from 'lucide-react'
import { Hospital } from '@/lib/mock-data'

export default function StatsOverview({ hospitals }: { hospitals: Hospital[] }) {
  const totalBeds = hospitals.reduce((sum, h) => sum + h.beds.available, 0)
  const totalICU = hospitals.reduce((sum, h) => sum + h.icuBeds.available, 0)
  const totalVentilators = hospitals.reduce((sum, h) => sum + h.ventilators.available, 0)
  const greenHospitals = hospitals.filter(h => h.status === 'GREEN').length

  const stats = [
    {
      icon: Building2,
      label: 'Available Hospitals',
      value: greenHospitals,
      total: hospitals.length,
      color: 'text-emerald-600',
      bgColor: 'from-emerald-500 to-emerald-600',
      lightBg: 'bg-emerald-50',
      trend: '+12%'
    },
    {
      icon: Bed,
      label: 'Total Beds',
      value: totalBeds,
      color: 'text-blue-600',
      bgColor: 'from-blue-500 to-blue-600',
      lightBg: 'bg-blue-50',
      trend: '+5%'
    },
    {
      icon: Heart,
      label: 'ICU Beds',
      value: totalICU,
      color: 'text-red-600',
      bgColor: 'from-red-500 to-red-600',
      lightBg: 'bg-red-50',
      trend: '+8%'
    },
    {
      icon: Wind,
      label: 'Ventilators',
      value: totalVentilators,
      color: 'text-orange-600',
      bgColor: 'from-orange-500 to-orange-600',
      lightBg: 'bg-orange-50',
      trend: '+3%'
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {stats.map((stat, idx) => {
        const Icon = stat.icon
        return (
          <Card
            key={idx}
            className={`relative overflow-hidden p-6 border-2 hover:border-blue-200 hover:shadow-xl transition-all duration-500 group animate-in fade-in slide-in-from-bottom`}
            style={{ animationDelay: `${idx * 100}ms` }}
          >
            {/* Gradient background on hover */}
            <div className={`absolute inset-0 bg-gradient-to-br ${stat.bgColor} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />

            {/* Floating icon decoration */}
            <div className={`absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br ${stat.bgColor} opacity-5 rounded-full blur-2xl group-hover:opacity-10 transition-opacity`} />

            <div className="relative z-10">
              <div className="flex items-start justify-between mb-4">
                <div className={`p-3 ${stat.lightBg} rounded-xl shadow-sm group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className={`w-6 h-6 ${stat.color}`} />
                </div>
                <div className="flex items-center gap-1 text-xs font-semibold text-green-600 bg-green-50 px-2 py-1 rounded-full">
                  <TrendingUp className="w-3 h-3" />
                  {stat.trend}
                </div>
              </div>

              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">{stat.label}</p>
                <p className="text-3xl font-bold text-gray-900">
                  {stat.value}
                  {stat.total && <span className="text-lg text-gray-400 ml-2">/ {stat.total}</span>}
                </p>
              </div>
            </div>
          </Card>
        )
      })}
    </div>
  )
}
