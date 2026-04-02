# Production Backend Setup Guide

## ✅ Pre-Deployment Checklist

- [ ] All TypeScript compiles without errors
- [ ] Environment variables configured
- [ ] Database migrations are tested
- [ ] Error handling is in place
- [ ] Security headers configured
- [ ] CORS properly configured
- [ ] Health check endpoint working
- [ ] Graceful shutdown implemented
- [ ] Logs are properly formatted

## 🔧 Production Environment Variables

### Required Variables
```env
# Database (PostgreSQL on Railway)
DATABASE_URL="postgresql://user:password@host:5432/dbname"

# JWT Secrets (generate with: node -c "console.log(require('crypto').randomBytes(32).toString('hex'))")
JWT_ACCESS_SECRET="very-long-random-string-here"
JWT_REFRESH_SECRET="another-long-random-string-here"

# Server Configuration
PORT=3001
NODE_ENV="production"

# Frontend URL (for CORS)
FRONTEND_URL="https://your-frontend.vercel.app"
```

### How to Generate Secure Secrets
```bash
# Generate a 32-byte random hex string
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# Run this command twice to get both secrets
```

## 📦 Build Process

```bash
# 1. Install dependencies
npm install

# 2. Build TypeScript
npm run build

# 3. Generate Prisma Client
npx prisma generate

# 4. Run database migrations
npm run db:migrate:prod

# 5. Start server
npm run start
```

## 🚀 Deployment Commands (for Railway)

### Initial Setup
1. Connect GitHub repository to Railway
2. Set root directory to `backend/`
3. Build command: `npm install && npm run build`
4. Start command: `npm run start`
5. Add environment variables in Railway dashboard

### First Deployment
```bash
# Railway automatically runs this after build
npm run db:migrate:prod
```

### Verify Production Server
```bash
# Check health endpoint
curl https://your-backend.railway.app/health

# Expected response:
# {
#   "status": "ok",
#   "environment": "production",
#   "timestamp": "2024-04-02T12:00:00.000Z"
# }
```

## 📊 Monitoring & Logs

### Railway Logs
1. Go to Railway Dashboard
2. Select your Node.js service
3. Click "Deployments" → latest deployment
4. Check "Runtime Logs" or "Build Logs"

### Key Logs to Watch
- ✅ "Database connected" - Database is accessible
- ✅ "Server running on port 3001" - Server started
- ❌ "Failed to start server" - Check DATABASE_URL
- ❌ "401 Unauthorized" - Check JWT secrets

### Health Check
```bash
# Monitor health periodically
curl -X GET https://your-backend.railway.app/health

# Should return 200 status with:
# { "status": "ok", "environment": "production" }
```

## 🔒 Security Checklist

- [ ] JWT_ACCESS_SECRET is strong (32+ bytes random)
- [ ] JWT_REFRESH_SECRET is strong (32+ bytes random)
- [ ] CORS is restricted to frontend URL
- [ ] HTTPS is enforced (Railway does this automatically)
- [ ] Error messages don't leak sensitive info
- [ ] Database password is strong
- [ ] API runs on HTTPS only
- [ ] Rate limiting would be good (optional)

## 🐛 Troubleshooting

### "Database connection failed"
- Check DATABASE_URL format: `postgresql://user:password@host:5432/dbname`
- Verify PostgreSQL is running (Railway creates it automatically)
- Check if migrations were applied

### "JWT verification failed"
- Ensure JWT_ACCESS_SECRET matches what's in Railway
- Ensure JWT_REFRESH_SECRET matches what's in Railway
- Check that secrets aren't truncated

### "CORS error from frontend"
- Add frontend URL to FRONTEND_URL env variable
- Or set to `*` temporarily for testing (not recommended for production)

### "502 Bad Gateway"
- Check server is actually running
- Check logs in Railway dashboard
- Verify PORT is correct (should be 3001)

## 📈 Performance Tips

1. **Connection Pooling** - Prisma handles this automatically
2. **Database Indexes** - Already set on email, user IDs
3. **API Response Compression** - Add compression middleware if needed
4. **Caching** - Consider Redis later if needed
5. **Load Testing** - Test with concurrent users before launch

## 🔄 Deployment Updates

To deploy new changes:
1. Push to GitHub main branch
2. Railway auto-detects and rebuilds
3. Check "Deployments" tab for status
4. Monitor logs for any errors

## 📍 Important URLs

- **Backend Dashboard:** https://railway.app
- **Logs:** Railway Dashboard → Your Service → Runtime Logs
- **API Health:** https://your-backend.railway.app/health
- **API Root:** https://your-backend.railway.app/

## ✨ What's Ready for Production

✅ Express.js server with proper middleware  
✅ PostgreSQL database via Prisma ORM  
✅ JWT authentication (access + refresh tokens)  
✅ Error handling middleware  
✅ Health check endpoint  
✅ Graceful shutdown  
✅ CORS configuration  
✅ Environment variable support  
✅ Database migrations  
✅ Production build optimization  

You're ready to deploy! 🚀
