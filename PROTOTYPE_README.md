# Swasth Emergency Hospital System - Prototype Version

This is a fully functional prototype of the Emergency Hospital Real-Time Availability & Routing System with **zero database requirements**. All data is simulated with mock data and real-time state management.

## Features

### 1. **Dashboard** (`/`)
- Search hospitals by location and specialty
- View real-time availability (beds, ICU, ventilators, oxygen)
- Hospital status indicators (Green/Yellow/Red)
- Quick view and routing options

### 2. **Hospital Details** (`/hospital/[id]`)
- Complete hospital information
- Doctor roster with availability
- Insurance providers accepted
- Real-time resource availability
- Contact information

### 3. **Smart Routing** (`/routing`)
- AI-powered hospital recommendation engine
- Multi-factor scoring algorithm:
  - Distance: 20%
  - Availability: 40%
  - Hospital Status: 30%
  - Specialty Match: 10%
- Alternative hospital suggestions
- Emergency level filtering

### 4. **Admin Dashboard** (`/admin`)
- Update real-time hospital availability
- Select any hospital to manage
- Modify beds, ICU beds, ventilators, and oxygen levels
- Real-time updates reflected across the system

### 5. **Government Dashboard** (`/admin/gov`)
- System-wide analytics
- 24-hour availability trends (chart)
- Hospital status distribution (pie chart)
- Occupancy rates
- Beds available across all hospitals

### 6. **Ambulance Tracking** (`/ambulance`)
- Real-time ambulance status by hospital
- Status types: Available, Responding, In Transit, Busy
- Location coordinates
- Summary statistics

### 7. **Map View** (`/map`)
- Hospital locations with coordinates
- Real-time availability at each location
- Ready for Google Maps integration

## Getting Started

### Installation
1. Clone or download the project
2. Install dependencies: `npm install`
3. Run the development server: `npm run dev`
4. Open `http://localhost:3000`

### Mock Data
All data is defined in `lib/mock-data.ts`:
- **5 Hospital Records** with complete details
- **Multiple Ambulances** with status tracking
- **Real-time updates** every 5 seconds (simulated)

### Data Management
The `lib/hospital-context.tsx` provides:
- `useHospitals()` hook for accessing hospital data
- Real-time state updates
- Simulated availability changes
- Ambulance status management

## How to Modify Mock Data

### Add a New Hospital
Edit `lib/mock-data.ts` and add to `MOCK_HOSPITALS`:
\`\`\`typescript
{
  id: '6',
  name: 'Your Hospital Name',
  address: '123 Your Street',
  city: 'Your City',
  distance: 3.5,
  status: 'GREEN',
  // ... other fields
}
\`\`\`

### Update Hospital Status
Use the Admin Dashboard at `/admin` to:
1. Select the hospital from dropdown
2. Adjust availability numbers
3. Click "Update Availability"

### Add New Specialties
Edit the `SPECIALTIES` array in `lib/mock-data.ts`:
\`\`\`typescript
export const SPECIALTIES = [
  'Cardiology',
  'Your Specialty',
  // ...
]
\`\`\`

## Real-Time Updates

The system simulates real-time updates:
- Hospital availability changes every 5 seconds
- Beds increase/decrease randomly (±1)
- Oxygen levels naturally replenish

To disable this, comment out the `useEffect` in `lib/hospital-context.tsx`.

## Routing Algorithm

The smart routing system scores hospitals on:
1. **Distance** (20%): Closer hospitals score higher
2. **Availability** (40%): More available beds/resources
3. **Status** (30%): Green > Yellow > Red
4. **Specialty** (10%): Bonus for matching specialties

Example: A hospital 2km away with 80% availability and matching specialty scores ~85-90%.

## Customization

### Colors & Theme
Edit `app/globals.css` to customize the color scheme:
- Primary color (medical red)
- Secondary colors (blue for ICU)
- Status colors (green/yellow/red)

### Add More Hospitals
Simply extend `MOCK_HOSPITALS` in `lib/mock-data.ts`. The app will automatically:
- Display them in the dashboard
- Include them in routing calculations
- Show them in the admin dropdown

### Modify Hospital Details
Each hospital has all fields needed:
- Contact information
- Specialties
- Doctors
- Insurance providers
- Real-time availability

## Next Steps: Production Migration

When ready to go live:
1. Replace mock data with real API calls
2. Connect to actual database (MongoDB/PostgreSQL)
3. Implement Socket.IO for true real-time updates
4. Add Google Maps integration
5. Implement user authentication
6. Add SMS/Push notifications

## File Structure

\`\`\`
app/
├── page.tsx              # Dashboard
├── hospital/[id]/        # Hospital details
├── routing/              # Smart routing
├── admin/                # Hospital admin
│   └── gov/              # Government dashboard
├── ambulance/            # Ambulance tracking
└── map/                  # Map view

lib/
├── mock-data.ts          # All mock data
├── hospital-context.tsx  # State management
└── api.ts                # API client setup

components/
├── navbar.tsx
├── hospital-list.tsx
├── stats-overview.tsx
└── search-filters.tsx
\`\`\`

## Performance

The prototype is optimized with:
- `useMemo` for expensive calculations
- Context API for state management
- Efficient re-renders
- Simulated real-time updates

## Support

For questions or issues:
1. Check the mock data in `lib/mock-data.ts`
2. Review the hospital context in `lib/hospital-context.tsx`
3. Inspect component props and state
4. Use browser dev tools to trace data flow

Enjoy your fully functional hospital emergency system prototype!
