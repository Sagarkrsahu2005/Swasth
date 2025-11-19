# Emergency Hospital System - Quick Start Guide

## 5-Minute Setup

### Prerequisites
- Node.js 18+
- MongoDB (local or Atlas)
- Git

### 1. Clone & Setup Frontend

\`\`\`bash
# In one terminal
npm install
npm run dev
\`\`\`

Frontend running at: http://localhost:3000

### 2. Setup Backend

\`\`\`bash
# In another terminal
cd backend
npm install
\`\`\`

Create \`.env\`:
\`\`\`
MONGODB_URI=mongodb://localhost:27017/hospital-system
JWT_SECRET=dev-secret-key
PORT=5000
FRONTEND_URL=http://localhost:3000
\`\`\`

Start backend:
\`\`\`bash
npm run dev
\`\`\`

Backend running at: http://localhost:5000

### 3. Seed Database (Optional)

\`\`\`bash
cd backend
npm run seed
\`\`\`

## Testing the App

### Login (Demo)
- Go to http://localhost:3000/login
- Phone: Any number (e.g., +1-555-0000)
- OTP: Any 4+ digit code

### Dashboard Features
- **Search Hospitals**: Filter by location/specialty
- **View Details**: Click any hospital for full info
- **Smart Routing**: Get best hospital recommendations
- **Admin Panel**: Update real-time data

## Directory Structure

\`\`\`
.
├── app/                    # Frontend pages
│   ├── page.tsx           # Dashboard
│   ├── login/page.tsx     # Login page
│   ├── hospital/[id]/     # Hospital details
│   ├── routing/page.tsx   # Smart routing
│   ├── map/page.tsx       # Map view
│   ├── ambulance/page.tsx # Ambulance tracking
│   └── admin/             # Admin dashboards
├── components/            # Reusable components
├── lib/                   # Utilities
├── backend/               # Express server
│   ├── src/
│   │   ├── models/        # Database schemas
│   │   ├── routes/        # API endpoints
│   │   └── server.ts      # Server setup
│   └── package.json
└── SETUP.md              # Full setup guide
\`\`\`

## Key Features

✓ Real-time hospital availability tracking
✓ Smart hospital routing algorithm
✓ Live ambulance tracking with Socket.IO
✓ Hospital admin dashboard
✓ Government analytics dashboard
✓ Responsive design
✓ Phone + OTP authentication
✓ RESTful API with JWT auth
✓ MongoDB with Mongoose

## Environment Variables

### Frontend (.env.local)
\`\`\`
NEXT_PUBLIC_API_URL=http://localhost:5000/api
NEXT_PUBLIC_SOCKET_URL=http://localhost:5000
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your-key
\`\`\`

### Backend (.env)
\`\`\`
MONGODB_URI=mongodb://localhost:27017/hospital-system
JWT_SECRET=your-secret
PORT=5000
FRONTEND_URL=http://localhost:3000
\`\`\`

## Common Issues

**Port already in use?**
\`\`\`bash
# Change port in backend/.env
PORT=5001
\`\`\`

**MongoDB not connecting?**
\`\`\`bash
# Check if MongoDB is running
mongo --version
mongod
\`\`\`

**Socket.IO errors?**
- Verify both frontend and backend are running
- Check console for connection errors
- Ensure CORS is configured correctly

## Next Steps

1. **Enable Google Maps**: Add your API key
2. **Connect Firebase**: Implement phone auth
3. **Deploy**: Use deployment guides in docs
4. **Add Tests**: Implement unit/integration tests
5. **Optimize Performance**: Add caching and indexing

## Support

- Check SETUP.md for detailed configuration
- See API_DOCUMENTATION.md for API reference
- Review DEPLOYMENT.md for production setup
- Check TESTING.md for testing strategies

## Project Stats

- **Frontend**: Next.js 14, React 19, Tailwind CSS
- **Backend**: Express, MongoDB, Socket.IO
- **Database**: MongoDB with geospatial indexing
- **Authentication**: JWT + Firebase (optional)
- **Real-time**: Socket.IO for live updates
- **API Routes**: 15+ endpoints with filters
- **Pages**: 8 main pages with responsive design
