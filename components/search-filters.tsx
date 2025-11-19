import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Search } from 'lucide-react'

interface SearchFiltersProps {
  searchLocation: string
  setSearchLocation: (value: string) => void
  selectedSpecialty: string
  setSelectedSpecialty: (value: string) => void
  specialties: string[]
  emergencyLevel: string
  setEmergencyLevel: (value: string) => void
}

export default function SearchFilters({
  searchLocation,
  setSearchLocation,
  selectedSpecialty,
  setSelectedSpecialty,
  specialties,
  emergencyLevel,
  setEmergencyLevel,
}: SearchFiltersProps) {
  const handleSearch = () => {
    console.log("[v0] Search triggered:", { searchLocation, selectedSpecialty, emergencyLevel });
  }

  const handleReset = () => {
    setSearchLocation('')
    setSelectedSpecialty('all')
    setEmergencyLevel('MODERATE')
    console.log("[v0] Filters reset");
  }

  return (
    <Card className="p-6 glass mb-8">
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium mb-2">Location</label>
          <Input
            placeholder="City or address"
            value={searchLocation}
            onChange={(e) => setSearchLocation(e.target.value)}
            className="w-full"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Specialty</label>
          <Select value={selectedSpecialty} onValueChange={setSelectedSpecialty}>
            <SelectTrigger>
              <SelectValue placeholder="Any specialty" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Any Specialty</SelectItem>
              {specialties.map((spec) => (
                <SelectItem key={spec} value={spec}>{spec}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Emergency Level</label>
          <Select value={emergencyLevel} onValueChange={setEmergencyLevel}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="CRITICAL">Critical</SelectItem>
              <SelectItem value="URGENT">Urgent</SelectItem>
              <SelectItem value="MODERATE">Moderate</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button onClick={handleSearch} className="h-10 col-span-1 md:col-span-2 flex items-center justify-center">
          <Search className="w-4 h-4 mr-2" />
          Search
        </Button>
        <Button onClick={handleReset} variant="outline" className="h-10">
          Reset
        </Button>
      </div>
    </Card>
  )
}
