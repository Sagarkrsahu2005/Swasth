'use client'

import { useMemo } from 'react'
import Navbar from '@/components/navbar'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'
import { useHospitals } from '@/lib/hospital-context'

export default function GovernmentDashboard() {
  const { hospitals } = useHospitals()

  const stats = useMemo(() => {
    const totalHospitals = hospitals.length
    const activeHospitals = hospitals.filter(h => h.status !== 'RED').length
    const totalBeds = hospitals.reduce((sum, h) => sum + h.beds.total, 0)
    const availableBeds = hospitals.reduce((sum, h) => sum + h.beds.available, 0)
    const criticalHospitals = hospitals.filter(h => h.status === 'RED').length

    return {
      totalHospitals,
      activeHospitals,
      totalBeds,
      availableBeds,
      criticalHospitals,
      occupancyRate: Math.round(((totalBeds - availableBeds) / totalBeds) * 100),
    }
  }, [hospitals])

  // Generate availability history
  const availabilityHistory = useMemo(() => {
    const baseAvailable = hospitals.reduce((sum, h) => sum + h.beds.available, 0)
    return [
      { time: '00:00', beds: baseAvailable + 20, icu: hospitals.reduce((sum, h) => sum + h.icuBeds.available, 0) + 5, ventilators: hospitals.reduce((sum, h) => sum + h.ventilators.available, 0) + 3 },
      { time: '04:00', beds: baseAvailable + 15, icu: hospitals.reduce((sum, h) => sum + h.icuBeds.available, 0) + 3, ventilators: hospitals.reduce((sum, h) => sum + h.ventilators.available, 0) + 2 },
      { time: '08:00', beds: baseAvailable, icu: hospitals.reduce((sum, h) => sum + h.icuBeds.available, 0), ventilators: hospitals.reduce((sum, h) => sum + h.ventilators.available, 0) },
      { time: '12:00', beds: baseAvailable - 5, icu: hospitals.reduce((sum, h) => sum + h.icuBeds.available, 0) - 2, ventilators: hospitals.reduce((sum, h) => sum + h.ventilators.available, 0) - 1 },
      { time: '16:00', beds: baseAvailable - 10, icu: hospitals.reduce((sum, h) => sum + h.icuBeds.available, 0) - 3, ventilators: hospitals.reduce((sum, h) => sum + h.ventilators.available, 0) - 2 },
      { time: '20:00', beds: baseAvailable - 5, icu: hospitals.reduce((sum, h) => sum + h.icuBeds.available, 0) - 1, ventilators: hospitals.reduce((sum, h) => sum + h.ventilators.available, 0) },
      { time: '24:00', beds: baseAvailable + 10, icu: hospitals.reduce((sum, h) => sum + h.icuBeds.available, 0) + 4, ventilators: hospitals.reduce((sum, h) => sum + h.ventilators.available, 0) + 1 },
    ]
  }, [hospitals])

  const statusDistribution = useMemo(() => {
    const green = hospitals.filter(h => h.status === 'GREEN').length
    const yellow = hospitals.filter(h => h.status === 'YELLOW').length
    const red = hospitals.filter(h => h.status === 'RED').length
    return [
      { name: 'Available', value: green, color: '#06a77d' },
      { name: 'Limited', value: yellow, color: '#f77f00' },
      { name: 'Full', value: red, color: '#d62828' },
    ]
  }, [hospitals])

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-surface to-background">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">Government Dashboard</h1>
          <p className="text-muted text-lg">System-wide hospital network overview and analytics</p>
        </div>

        {/* Key Stats */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
          <Card className="p-6 glass">
            <p className="text-sm text-muted mb-2">Total Hospitals</p>
            <p className="text-3xl font-bold text-foreground">{stats.totalHospitals}</p>
          </Card>
          <Card className="p-6 glass">
            <p className="text-sm text-muted mb-2">Active</p>
            <p className="text-3xl font-bold text-green-600">{stats.activeHospitals}</p>
          </Card>
          <Card className="p-6 glass">
            <p className="text-sm text-muted mb-2">Available Beds</p>
            <p className="text-3xl font-bold text-blue-600">{stats.availableBeds}/{stats.totalBeds}</p>
          </Card>
          <Card className="p-6 glass">
            <p className="text-sm text-muted mb-2">Occupancy Rate</p>
            <p className="text-3xl font-bold">{stats.occupancyRate}%</p>
          </Card>
          <Card className="p-6 glass">
            <p className="text-sm text-muted mb-2">Critical</p>
            <p className="text-3xl font-bold text-red-600">{stats.criticalHospitals}</p>
          </Card>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Availability Trend */}
          <Card className="p-6 glass">
            <h3 className="text-lg font-bold mb-4">24-Hour Availability Trend</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={availabilityHistory}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="beds" stroke="#e63946" strokeWidth={2} />
                <Line type="monotone" dataKey="icu" stroke="#0066cc" strokeWidth={2} />
                <Line type="monotone" dataKey="ventilators" stroke="#f77f00" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </Card>

          {/* Status Distribution */}
          <Card className="p-6 glass">
            <h3 className="text-lg font-bold mb-4">Hospital Status Distribution</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={statusDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name} (${value})`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {statusDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </Card>
        </div>

        {/* Hospital List */}
        <Card className="p-6 glass">
          <h3 className="text-lg font-bold mb-4">All Hospitals</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 font-semibold">Hospital Name</th>
                  <th className="text-left py-3 px-4 font-semibold">City</th>
                  <th className="text-left py-3 px-4 font-semibold">Status</th>
                  <th className="text-left py-3 px-4 font-semibold">Bed Occupancy</th>
                  <th className="text-left py-3 px-4 font-semibold">Available</th>
                </tr>
              </thead>
              <tbody>
                {hospitals.map((hospital) => {
                  const occupancyRate = Math.round(((hospital.beds.total - hospital.beds.available) / hospital.beds.total) * 100)
                  const statusColor: Record<string, string> = {
                    GREEN: 'bg-emerald-100 text-emerald-800',
                    YELLOW: 'bg-amber-100 text-amber-800',
                    RED: 'bg-red-100 text-red-800',
                  }

                  return (
                    <tr key={hospital.id} className="border-b border-border hover:bg-surface transition">
                      <td className="py-4 px-4 font-medium">{hospital.name}</td>
                      <td className="py-4 px-4">{hospital.city}</td>
                      <td className="py-4 px-4">
                        <Badge className={statusColor[hospital.status]}>
                          {hospital.status === 'GREEN' ? 'Available' : hospital.status === 'YELLOW' ? 'Limited' : 'Full'}
                        </Badge>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-2">
                          <div className="flex-1 bg-surface rounded-full h-2">
                            <div
                              className={`h-2 rounded-full transition-all ${
                                occupancyRate > 80
                                  ? 'bg-red-500'
                                  : occupancyRate > 50
                                    ? 'bg-amber-500'
                                    : 'bg-emerald-500'
                              }`}
                              style={{ width: `${occupancyRate}%` }}
                            />
                          </div>
                          <span className="text-xs font-semibold w-8">{occupancyRate}%</span>
                        </div>
                      </td>
                      <td className="py-4 px-4 font-semibold">
                        {hospital.beds.available}/{hospital.beds.total}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </Card>
      </main>
    </div>
  )
}
