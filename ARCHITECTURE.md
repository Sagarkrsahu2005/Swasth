# System Architecture

## High-Level Overview

\`\`\`
┌─────────────────────────────────────────────────────────────┐
│                     Frontend (Next.js)                       │
│  ├─ Dashboard (Hospital List & Search)                      │
│  ├─ Hospital Details Page                                   │
│  ├─ Smart Routing (AI Algorithm)                            │
│  ├─ Map View (Google Maps)                                  │
│  ├─ Ambulance Tracking                                      │
│  ├─ Admin Dashboards (Hospital & Government)               │
│  └─ Authentication (Phone + OTP)                            │
└──────────────────────┬──────────────────────────────────────┘
                       │
         ┌─────────────┼─────────────┐
         │             │             │
      REST API    Socket.IO    GraphQL (Future)
         │             │             │
┌──────────────────────┴──────────────────────────────────────┐
│                   Backend (Express.js)                      │
│  ├─ Authentication Routes                                  │
│  ├─ Hospital Management                                    │
│  ├─ Ambulance Tracking                                     │
│  ├─ Smart Routing Engine                                   │
│  ├─ Real-time Updates (Socket.IO)                          │
│  └─ Admin Analytics                                        │
└──────────────────────┬──────────────────────────────────────┘
                       │
┌──────────────────────┴──────────────────────────────────────┐
│                  MongoDB Database                           │
│  ├─ Collections: Users, Hospitals, Ambulances              │
│  ├─ Geospatial Indexing for Location Queries               │
│  ├─ Availability History Logs                              │
│  └─ Real-time Replication (Optional)                       │
└──────────────────────────────────────────────────────────────┘
\`\`\`

## Data Flow

### Real-time Hospital Update
\`\`\`
Hospital Admin Updates Availability
           ↓
Backend Receives PUT Request
           ↓
Validates & Updates MongoDB
           ↓
Logs Change to AvailabilityLog Collection
           ↓
Emits Socket.IO Event: hospitalAvailabilityUpdated
           ↓
All Connected Clients Receive Update
           ↓
Frontend Updates UI Without Refresh
\`\`\`

### Smart Routing Algorithm
\`\`\`
User Initiates Emergency Routing
           ↓
Frontend Collects:
- User Location (Geolocation API)
- Emergency Level (CRITICAL/URGENT/MODERATE)
- Required Specialty (Optional)
           ↓
Backend Receives POST /routing/best-hospital
           ↓
MongoDB Geospatial Query Finds Nearby Hospitals
           ↓
Algorithm Scores Each Hospital:
- Distance (Weight: 20%)
- Availability (Weight: 40%)
- Status (Weight: 30%)
- Emergency Level Match (Weight: 10%)
           ↓
Returns Best Match + 2 Alternatives
           ↓
Frontend Shows Results with Routing Options
\`\`\`

## Database Schema

### Hospital Collection
\`\`\`javascript
{
  _id: ObjectId,
  name: String,
  location: { type: "Point", coordinates: [lng, lat] },
  currentAvailability: {
    availableBeds: Number,
    availableICUBeds: Number,
    availableVentilators: Number,
    availableOxygenCylinders: Number,
    doctorsOnDuty: [{ specialty, count }]
  },
  status: "GREEN" | "YELLOW" | "RED",
  specialties: [String],
  // ... other fields
  createdAt: Date,
  updatedAt: Date
}
\`\`\`

### User Collection
\`\`\`javascript
{
  _id: ObjectId,
  phoneNumber: String (unique),
  firebaseUid: String (unique),
  role: "PUBLIC_USER" | "HOSPITAL_ADMIN" | "GOV_ADMIN",
  hospitalId: ObjectId (optional),
  // ... other fields
  createdAt: Date,
  updatedAt: Date
}
\`\`\`

## API Architecture

### Layered Structure
\`\`\`
┌─────────────────────────────┐
│      Route Handlers         │
│   (Express Endpoints)       │
└──────────────┬──────────────┘
               │
┌──────────────┴──────────────┐
│   Service Layer             │
│  (Business Logic)           │
└──────────────┬──────────────┘
               │
┌──────────────┴──────────────┐
│   Data Access Layer         │
│   (Mongoose Models)         │
└──────────────┬──────────────┘
               │
┌──────────────┴──────────────┐
│   MongoDB Database          │
└─────────────────────────────┘
\`\`\`

## Authentication Flow

\`\`\`
1. User enters phone number on login page
           ↓
2. Firebase sends OTP via SMS
           ↓
3. User enters OTP
           ↓
4. Firebase verifies OTP, returns ID token
           ↓
5. Frontend sends ID token to Backend
           ↓
6. Backend verifies token with Firebase
           ↓
7. Backend creates/retrieves user in MongoDB
           ↓
8. Backend generates JWT token
           ↓
9. Frontend stores JWT in localStorage
           ↓
10. JWT included in all subsequent API requests
\`\`\`

## Scalability Considerations

### Current Architecture (MVP)
- Single backend instance
- Single MongoDB instance
- Direct Socket.IO connections

### Scaling to Production
- Load balancer for multiple backend instances
- MongoDB replica set for data redundancy
- Redis cache for frequently accessed data
- Separate Socket.IO namespace servers
- CDN for static frontend assets
- Database sharding by city/region
- Implement message queue for async operations

## Security Layers

\`\`\`
┌─ Frontend Security ─────────────────┐
│ - HTTPS only                        │
│ - JWT stored securely              │
│ - Input validation                 │
│ - XSS protection                   │
└────────────────────────────────────┘
         ↓
┌─ API Security ──────────────────────┐
│ - CORS configuration                │
│ - Rate limiting                     │
│ - Input sanitization                │
│ - SQL injection prevention          │
└────────────────────────────────────┘
         ↓
┌─ Database Security ─────────────────┐
│ - Mongoose schema validation        │
│ - MongoDB authentication            │
│ - Encrypted passwords (bcrypt)      │
│ - Connection SSL/TLS                │
└────────────────────────────────────┘
\`\`\`

## Performance Optimization

### Frontend
- Code splitting with Next.js
- Image optimization
- Font caching
- Service workers for offline support
- Component memoization

### Backend
- Database indexing (geospatial, time-based)
- Response compression (gzip)
- Pagination for large datasets
- Connection pooling
- Query optimization

### Data
- Redis caching for frequent queries
- Aggregation pipeline for statistics
- Real-time WebSocket instead of polling
- Batch updates for bulk changes
\`\`\`
