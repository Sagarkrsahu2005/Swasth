# Deployment Guide

## Frontend Deployment (Vercel)

### 1. Prepare for Deployment
\`\`\`bash
cd frontend
npm run build
\`\`\`

### 2. Deploy to Vercel
\`\`\`bash
npm install -g vercel
vercel
\`\`\`

### 3. Set Environment Variables
In Vercel Dashboard:
- \`NEXT_PUBLIC_API_URL\` = \`https://your-backend-url.com/api\`
- \`NEXT_PUBLIC_SOCKET_URL\` = \`https://your-backend-url.com\`
- \`NEXT_PUBLIC_GOOGLE_MAPS_API_KEY\` = Your Google Maps key

## Backend Deployment

### Option 1: Heroku

\`\`\`bash
# Install Heroku CLI
# Login to Heroku
heroku login

# Create app
heroku create your-hospital-backend

# Set environment variables
heroku config:set MONGODB_URI=your-mongodb-uri
heroku config:set JWT_SECRET=your-secret-key
heroku config:set FRONTEND_URL=your-vercel-url

# Deploy
git push heroku main
\`\`\`

### Option 2: Railway

\`\`\`bash
# Install Railway CLI
npm install -g @railway/cli

# Login
railway login

# Create project
railway init

# Set environment variables in Railway dashboard

# Deploy
railway up
\`\`\`

### Option 3: DigitalOcean App Platform

1. Fork repository to GitHub
2. Connect GitHub to DigitalOcean
3. Create new app from repository
4. Add environment variables
5. Deploy

## Database Setup

### MongoDB Atlas (Cloud)

1. Create account at mongodb.com/cloud
2. Create cluster
3. Create database user
4. Whitelist IP addresses
5. Get connection string
6. Add to \`MONGODB_URI\`

### Local MongoDB

\`\`\`bash
# Install MongoDB
brew install mongodb-community

# Start service
brew services start mongodb-community

# Create database
mongo
> use hospital-system
\`\`\`

## SSL/TLS Certificates

### For Custom Domain
- Use Let's Encrypt (free)
- Configure in reverse proxy (Nginx)
- Or use Vercel/Heroku's built-in SSL

## Database Backups

### Automated Backups
\`\`\`bash
# MongoDB Atlas provides automated backups
# Configure in Cluster settings

# Or use mongodump for manual backups
mongodump --uri "mongodb+srv://user:pass@cluster.mongodb.net/hospital-system"
\`\`\`

## Monitoring & Logging

### Application Monitoring
- Vercel Analytics (frontend)
- Sentry (error tracking)
- New Relic (performance)

### Log Aggregation
\`\`\`bash
# Using Winston for logging
npm install winston

# Logs sent to cloud services:
# - Loggly
# - Datadog
# - CloudWatch
\`\`\`

## Performance Optimization

### Frontend
- Enable Image Optimization
- Implement caching strategies
- Use CDN for static assets
- Code splitting

### Backend
- Use database indexing
- Implement pagination
- Add response caching
- Use compression middleware

## Security Checklist

- [ ] Enable HTTPS everywhere
- [ ] Set secure cookies
- [ ] Implement CORS properly
- [ ] Rate limiting enabled
- [ ] Input validation
- [ ] SQL injection prevention
- [ ] XSS protection
- [ ] CSRF tokens
- [ ] Use environment variables for secrets
- [ ] Regular dependency updates
- [ ] Security headers configured

## CI/CD Pipeline

### GitHub Actions Example

\`\`\`yaml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '18'
      
      - name: Install dependencies
        run: npm install
      
      - name: Run tests
        run: npm test
      
      - name: Build
        run: npm run build
      
      - name: Deploy to Vercel
        run: vercel --prod
        env:
          VERCEL_TOKEN: \${{ secrets.VERCEL_TOKEN }}
\`\`\`

## Troubleshooting

### Common Issues

**Frontend won't connect to backend**
- Check API_URL environment variable
- Verify CORS settings
- Check backend is running
- Test with Postman

**Socket.IO not connecting**
- Verify Socket URL
- Check firewall/proxy settings
- Test WebSocket support
- Check for CORS issues

**Database connection timeout**
- Verify MongoDB connection string
- Check whitelist IP addresses
- Ensure database is running
- Test credentials

**High memory usage**
- Check for memory leaks
- Implement pagination
- Optimize database queries
- Use caching

## Health Checks

### Backend Health Check
\`\`\`bash
curl http://your-backend-url/health
\`\`\`

### Monitor Endpoints
- /health - API health
- /metrics - Performance metrics
- /logs - Application logs

## Scaling

### Horizontal Scaling
- Use load balancer
- Deploy multiple backend instances
- Database replication
- Cache layer (Redis)

### Vertical Scaling
- Increase server resources
- Optimize code
- Database optimization
- Connection pooling
\`\`\`
