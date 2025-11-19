# Testing Guide

## Frontend Testing

### Unit Tests
\`\`\`bash
npm install --save-dev @testing-library/react jest

# Run tests
npm run test
\`\`\`

### E2E Tests
\`\`\`bash
npm install --save-dev @playwright/test

# Run tests
npx playwright test
\`\`\`

## Backend Testing

### Unit Tests
\`\`\`bash
npm install --save-dev jest ts-jest @types/jest

# Run tests
npm run test
\`\`\`

### Integration Tests
\`\`\`bash
# Test API endpoints
npm run test:integration
\`\`\`

## Manual Testing

### Test Scenarios

#### Public User Flow
1. Go to /login
2. Enter phone number
3. Enter OTP
4. Should redirect to /
5. Search hospitals by location
6. Click "View Details"
7. Click "Route Me"
8. See routing recommendations

#### Hospital Admin Flow
1. Login with admin credentials
2. Go to /admin
3. Update availability values
4. Click "Update Availability"
5. Dashboard should reflect changes in real-time

#### Government Admin Flow
1. Login with government credentials
2. Go to /admin/gov
3. View aggregated statistics
4. Check charts and hospital list

## Performance Testing

### Load Testing
\`\`\`bash
npm install -g artillery

# Create load-test.yml
artillery quick --count 100 --num 1000 https://your-backend-url/api/hospitals
\`\`\`

### Lighthouse Audit
\`\`\`bash
npm install -g lighthouse

lighthouse https://your-frontend-url
\`\`\`

## Security Testing

### OWASP Top 10
- [ ] Injection attacks
- [ ] Authentication bypass
- [ ] Sensitive data exposure
- [ ] XML External Entities
- [ ] Broken access control
- [ ] Security misconfiguration
- [ ] Cross-Site Scripting
- [ ] Insecure deserialization
- [ ] Using components with known vulnerabilities
- [ ] Insufficient logging

### Tools
\`\`\`bash
npm install -g snyk
snyk test
\`\`\`
\`\`\`
