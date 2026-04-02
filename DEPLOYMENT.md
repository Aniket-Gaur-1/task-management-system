# Task Management System - Deployment Guide

## Overview
- **Frontend:** Vercel (Next.js)
- **Backend:** Railway (Node.js + Express)
- **Database:** PostgreSQL (Railway)

---

## ✅ Pre-Deployment Checklist

- [ ] Code pushed to GitHub
- [ ] All tests passing locally
- [ ] `.env.production` ready with secrets
- [ ] Database schema finalized
- [ ] No sensitive data in git history

---

## 🚀 Step 1: Deploy Backend to Railway

### 1.1 Sign up on Railway
- Go to [railway.app](https://railway.app)
- Sign up with GitHub (recommended)
- Create a new project

### 1.2 Deploy PostgreSQL Database
1. Click "Create" → "Add Service"
2. Select "PostgreSQL"
3. Railway creates it and provides `DATABASE_URL` automatically

### 1.3 Deploy Node.js Backend
1. Click "Add Service" → "GitHub Repo"
2. Select your task-management-system repo
3. Configure:
   - **Root Directory:** `backend`
   - **Build Command:** `npm install && npm run build`
   - **Start Command:** `npm run start`

### 1.4 Add Environment Variables
In Railway Dashboard:
1. Go to your Node.js service → Variables
2. Add these variables:
   ```
   NODE_ENV=production
   JWT_ACCESS_SECRET=<generate-with-node-command-below>
   JWT_REFRESH_SECRET=<generate-with-node-command-below>
   ```
3. **Generate secrets** in your terminal:
   ```bash
   node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
   ```
   Run this command twice and copy each output

4. PostgreSQL's `DATABASE_URL` is auto-set ✅

### 1.5 Verify Deployment
- Railway shows "Deployment Success"
- Your backend URL appears (e.g., `https://backend-service-production-xxx.railway.app`)
- **Save this URL** for the next step

---

## 🚀 Step 2: Deploy Frontend to Vercel

### 2.1 Sign up on Vercel
- Go to [vercel.com](https://vercel.com)
- Sign up with GitHub
- Authorize Vercel to access your repos

### 2.2 Create New Project
1. Click "Add New" → "Project"
2. Select your `task-management-system` repository
3. Click "Import"

### 2.3 Configure Project
1. **Framework:** Select "Next.js" (auto-detected)
2. **Root Directory:** `frontend`
3. **Build & Development Settings:**
   - Build Command: `npm run build`
   - Output Directory: `.next`
   - Install Command: `npm install`

### 2.4 Add Environment Variables
Before deploying, add:
```
NEXT_PUBLIC_API_URL=https://your-railway-backend-url.railway.app
```

Replace `your-railway-backend-url` with the actual URL from Step 1.5

### 2.5 Deploy
- Click "Deploy"
- Wait for build to complete
- Vercel provides your frontend URL (e.g., `https://task-management-system.vercel.app`)

---

## 🧪 Step 3: Test Live Application

1. **Open your frontend URL** in browser
2. **Register a new account**
   ```
   Email: test@example.com
   Name: Test User
   Password: TestPassword123
   ```
3. **Test features:**
   - ✅ Login/Logout
   - ✅ Create task
   - ✅ Search tasks
   - ✅ Filter by status
   - ✅ Update task
   - ✅ Delete task
   - ✅ Complete task

---

## 📝 Troubleshooting

### Backend not working
```bash
# Check logs on Railway
# 1. Go to your Node service
# 2. Click "Deployments" → latest
# 3. Check "Build Logs" or "Runtime Logs"
```

Common issues:
- `DATABASE_URL` not set → Add to Railway variables
- JWT secrets empty → Generate and add to variables
- Port conflicts → Railway auto-assigns, should work

### Frontend shows white screen
```
# Check browser console (F12)
# If you see "Cannot fetch API"
# → Backend URL is wrong in NEXT_PUBLIC_API_URL
```

### Database migration failed
```bash
# Run this in Railway console:
npx prisma migrate deploy
```

---

## 🔄 Updating Deployment

### Update Backend
1. Push changes to GitHub (main branch)
2. Railway auto-redeploys on git push
3. Check "Deployments" tab for status

### Update Frontend
1. Push changes to GitHub (main branch)
2. Vercel auto-redeploys on git push
3. Check deployment status on Vercel dashboard

---

## 💰 Costs

- **Vercel:** Free tier (up to 100GB bandwidth/month)
- **Railway:** Free tier ($5/month credit, always active)
- **Total:** ~$0-5/month for light usage

---

## 🎯 Next Steps (Optional)

1. **Add Custom Domain**
   - Vercel: Settings → Domains
   - Railway: Settings → Networking

2. **Add SSL Certificate** (auto-enabled on both platforms)

3. **Setup Monitoring**
   - Railway: Monitoring tab
   - Vercel: Analytics

4. **Enable Database Backups** (Railway)

---

## 📞 Support

- **Railway Docs:** https://docs.railway.app
- **Vercel Docs:** https://vercel.com/docs
- **Prisma Docs:** https://www.prisma.io/docs/
