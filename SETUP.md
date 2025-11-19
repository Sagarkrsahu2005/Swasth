# Emergency Hospital Real-Time Availability System

A full-stack application for real-time hospital availability tracking, smart routing, and emergency ambulance management.

## Tech Stack

**Frontend:**
- Next.js 14 with App Router
- TypeScript
- Tailwind CSS
- Socket.IO Client
- React Hook Form + Zod
- Axios

**Backend:**
- Node.js + Express + TypeScript
- MongoDB + Mongoose
- Socket.IO Server
- JWT Authentication
- Firebase Auth (optional)

## Project Structure

\`\`\`
/
├── frontend/           # Next.js application
│   ├── app/           # Pages and layouts
│   ├── components/    # Reusable components
│   ├── lib/           # Utilities and API clients
│   └── public/        # Static assets
├── backend/           # Express server
│   ├── src/
│   │   ├── models/    # Mongoose schemas
│   │   ├── routes/    # API endpoints
│   │   └── server.ts  # Main server file
│   └── package.json
└── SETUP.md          # This file
\`\`\`

## Installation

### Frontend

\`\`\`bash
cd frontend
npm install
\`\`\`

Create `.env.local`:
\`\`\`
NEXT_PUBLIC_API_URL=http://localhost:5000/api
NEXT_PUBLIC_SOCKET_URL=http://localhost:5000
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your-google-maps-key
\`\`\`

### Backend

\`\`\`bash
cd backend
npm install
\`\`\`

Create `.env`:
\`\`\`
MONGODB_URI=mongodb://localhost:27017/hospital-system
JWT_SECRET=your-secret-key-here
PORT=5000
FRONTEND_URL=http://localhost:3000
\`\`\`

## Running

### Development

**Terminal 1 - Backend:**
\`\`\`bash
cd backend
npm run dev
\`\`\`

**Terminal 2 - Frontend:**
\`\`\`bash
cd frontend
npm run dev
\`\`\`

Frontend: http://localhost:3000
Backend: http://localhost:5000

### Database Setup

1. Install MongoDB locally or use MongoDB Atlas cloud service
2. The backend will create collections automatically when models are used
3. (Optional) Run seed script: `npm run seed` in backend directory

## Features

### Public User
- Search hospitals by location and specialty
- View real-time hospital availability
- See smart routing recommendations
- Track ambulances (when routed)

### Hospital Admin
- Update real-time availability data
- View hospital profile
- Manage ambulances

### Government Admin
- View system-wide statistics
- Monitor all hospitals
- Access aggregated data

## API Endpoints

### Authentication
- `POST /api/auth/firebase-login` - Login with Firebase token

### Hospitals
- `GET /api/hospitals` - List hospitals with filters
- `GET /api/hospitals/:id` - Get hospital details
- `PUT /api/hospitals/:id/availability` - Update availability (Protected)

### Ambulances
- `GET /api/ambulances/hospital/:hospitalId` - Get ambulances
- `PUT /api/ambulances/:id/location` - Update location

### Routing
- `POST /api/routing/best-hospital` - Get best hospital recommendation

## Socket.IO Events

**Client → Server:**
- `hospitalAvailabilityUpdate` - Send availability update
- `ambulanceLocationUpdate` - Send ambulance location

**Server → Client:**
- `hospitalAvailabilityUpdated` - Broadcast availability changes
- `ambulanceLocationUpdated` - Broadcast ambulance location changes

## Environment Variables

### Frontend (.env.local)
- `NEXT_PUBLIC_API_URL` - Backend API base URL
- `NEXT_PUBLIC_SOCKET_URL` - Socket.IO server URL
- `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` - Google Maps API key

### Backend (.env)
- `MONGODB_URI` - MongoDB connection string
- `JWT_SECRET` - Secret for JWT signing
- `PORT` - Server port
- `FRONTEND_URL` - Frontend URL for CORS
- `FIREBASE_*` - Firebase credentials (optional)

## Deployment

### Frontend
1. Deploy to Vercel (recommended for Next.js)
2. Set environment variables in Vercel dashboard
3. Connect GitHub repository

### Backend
1. Deploy to Heroku, Railway, or similar
2. Ensure MongoDB instance is accessible
3. Set environment variables
4. Configure CORS to allow frontend domain

## Next Steps

1. **Implement Firebase Authentication** - Replace mock auth with real Firebase
2. **Add Google Maps Integration** - Enable map view features
3. **Setup Database Seeding** - Seed hospitals and initial data
4. **Add Tests** - Write unit and integration tests
5. **Performance Optimization** - Add caching and pagination
6. **Real-time Dashboard** - Enhance admin dashboard with charts

## Troubleshooting

### Connection Issues
- Ensure MongoDB is running
- Check that ports 3000 (frontend) and 5000 (backend) are available
- Verify CORS settings match your frontend URL

### Socket.IO Not Working
- Ensure Socket.IO server is running
- Check browser console for connection errors
- Verify `NEXT_PUBLIC_SOCKET_URL` is correct

### API Errors
- Check backend logs for detailed error messages
- Verify JWT token is being sent in Authorization header
- Ensure database collections exist
