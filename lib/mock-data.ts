export interface Hospital {
  id: string
  name: string
  address: string
  city: string
  distance: number
  status: 'GREEN' | 'YELLOW' | 'RED'
  phone: string
  email: string
  rating: number
  beds: {
    available: number
    total: number
  }
  icuBeds: {
    available: number
    total: number
  }
  ventilators: {
    available: number
    total: number
  }
  oxygen: {
    available: number
    total: number
  }
  specialties: string[]
  doctors: Doctor[]
  acceptedInsurance: string[]
  coordinates: { lat: number; lng: number }
  ambulances: { available: number; total: number }
}

export interface Doctor {
  id: string
  name: string
  specialty: string
  available: boolean
}

export interface Ambulance {
  id: string
  hospitalId: string
  status: 'AVAILABLE' | 'RESPONDING' | 'IN_TRANSIT' | 'BUSY'
  location: { lat: number; lng: number }
  lastUpdated: string
}

export const MOCK_HOSPITALS: Hospital[] = [
  {
    id: '1',
    name: 'Mumbai General Hospital',
    address: '123 LBS Marg, Kurla',
    city: 'Mumbai',
    distance: 2.5,
    status: 'GREEN',
    phone: '+91-22-4000-1001',
    email: 'info@mumbaigeneral.com',
    rating: 4.8,
    beds: { available: 45, total: 150 },
    icuBeds: { available: 12, total: 30 },
    ventilators: { available: 8, total: 20 },
    oxygen: { available: 95, total: 100 },
    specialties: ['Cardiology', 'Trauma', 'Neurology', 'Orthopedics'],
    doctors: [
      { id: 'd1', name: 'Dr. Sarah Johnson', specialty: 'Cardiology', available: true },
      { id: 'd2', name: 'Dr. Michael Chen', specialty: 'Trauma', available: true },
      { id: 'd3', name: 'Dr. Emily Rodriguez', specialty: 'Neurology', available: false },
    ],
    acceptedInsurance: ['Aetna', 'Blue Cross', 'UnitedHealth', 'Cigna'],
    coordinates: { lat: 19.0728, lng: 72.8826 },
    ambulances: { available: 5, total: 12 },
  },
  {
    id: '2',
    name: 'Hiranandani Care Hospital',
    address: '456 Powai Lake Road',
    city: 'Mumbai',
    distance: 5.2,
    status: 'YELLOW',
    phone: '+91-22-4000-1002',
    email: 'info@hiranandanicare.com',
    rating: 4.6,
    beds: { available: 15, total: 200 },
    icuBeds: { available: 3, total: 25 },
    ventilators: { available: 2, total: 15 },
    oxygen: { available: 40, total: 100 },
    specialties: ['Trauma', 'Surgery', 'Pediatrics'],
    doctors: [
      { id: 'd4', name: 'Dr. James Wilson', specialty: 'Trauma', available: true },
      { id: 'd5', name: 'Dr. Lisa Anderson', specialty: 'Surgery', available: true },
    ],
    acceptedInsurance: ['Aetna', 'Cigna'],
    coordinates: { lat: 19.1176, lng: 72.9051 },
    ambulances: { available: 2, total: 8 },
  },
  {
    id: '3',
    name: 'CityCare Emergency Centre',
    address: '789 Parel Road',
    city: 'Mumbai',
    distance: 1.8,
    status: 'RED',
    phone: '+91-22-4000-1003',
    email: 'info@citycare-emergency.com',
    rating: 4.5,
    beds: { available: 0, total: 100 },
    icuBeds: { available: 0, total: 20 },
    ventilators: { available: 0, total: 10 },
    oxygen: { available: 5, total: 50 },
    specialties: ['Cardiology', 'Emergency', 'Respiratory'],
    doctors: [
      { id: 'd6', name: 'Dr. Robert Martinez', specialty: 'Cardiology', available: false },
    ],
    acceptedInsurance: ['Blue Cross', 'UnitedHealth'],
    coordinates: { lat: 19.0033, lng: 72.8443 },
    ambulances: { available: 0, total: 5 },
  },
  {
    id: '4',
    name: 'Metropolitan Hospital Mumbai',
    address: '321 Linking Road, Bandra West',
    city: 'Mumbai',
    distance: 3.1,
    status: 'GREEN',
    phone: '+91-22-4000-1004',
    email: 'info@metropolitanmumbai.com',
    rating: 4.7,
    beds: { available: 60, total: 180 },
    icuBeds: { available: 15, total: 35 },
    ventilators: { available: 10, total: 25 },
    oxygen: { available: 98, total: 100 },
    specialties: ['Oncology', 'Neurology', 'Orthopedics', 'Gastroenterology'],
    doctors: [
      { id: 'd7', name: 'Dr. Patricia Lee', specialty: 'Oncology', available: true },
      { id: 'd8', name: 'Dr. David Thompson', specialty: 'Neurology', available: true },
    ],
    acceptedInsurance: ['Aetna', 'Blue Cross', 'UnitedHealth', 'Cigna'],
    coordinates: { lat: 19.0600, lng: 72.8347 },
    ambulances: { available: 4, total: 10 },
  },
  {
    id: '5',
    name: 'Riverside Medical Complex Mumbai',
    address: '654 Mithi River Road, Andheri East',
    city: 'Mumbai',
    distance: 4.5,
    status: 'GREEN',
    phone: '+91-22-4000-1005',
    email: 'info@riversidemumbai.com',
    rating: 4.4,
    beds: { available: 80, total: 220 },
    icuBeds: { available: 20, total: 40 },
    ventilators: { available: 15, total: 30 },
    oxygen: { available: 100, total: 100 },
    specialties: ['Orthopedics', 'Neurology', 'Pediatrics', 'Dermatology'],
    doctors: [
      { id: 'd9', name: 'Dr. Susan Garcia', specialty: 'Orthopedics', available: true },
      { id: 'd10', name: 'Dr. Kevin O\'Connor', specialty: 'Pediatrics', available: false },
    ],
    acceptedInsurance: ['UnitedHealth', 'Cigna', 'Aetna'],
    coordinates: { lat: 19.1150, lng: 72.8696 },
    ambulances: { available: 6, total: 14 },
  },
]

export const MOCK_AMBULANCES: Ambulance[] = [
  {
    id: 'amb1',
    hospitalId: '1',
    status: 'AVAILABLE',
    location: { lat: 19.0760, lng: 72.8777 },
    lastUpdated: new Date().toISOString(),
  },
  {
    id: 'amb2',
    hospitalId: '1',
    status: 'IN_TRANSIT',
    location: { lat: 19.0800, lng: 72.8800 },
    lastUpdated: new Date().toISOString(),
  },
  {
    id: 'amb3',
    hospitalId: '2',
    status: 'RESPONDING',
    location: { lat: 19.1176, lng: 72.9055 },
    lastUpdated: new Date().toISOString(),
  },
  {
    id: 'amb4',
    hospitalId: '4',
    status: 'AVAILABLE',
    location: { lat: 19.0600, lng: 72.8347 },
    lastUpdated: new Date().toISOString(),
  },
]

export const SPECIALTIES = [
  'Cardiology',
  'Trauma',
  'Neurology',
  'Orthopedics',
  'Surgery',
  'Pediatrics',
  'Oncology',
  'Emergency',
  'Respiratory',
  'Gastroenterology',
  'Dermatology',
]

export const INSURANCE_PROVIDERS = [
  'Aetna',
  'Blue Cross',
  'UnitedHealth',
  'Cigna',
  'Humana',
  'TRICARE',
]
