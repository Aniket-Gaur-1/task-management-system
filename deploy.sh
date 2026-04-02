#!/bin/bash
# Quick Deployment Setup

echo "🚀 Task Management System - Pre-Deployment Setup"
echo "================================================"

# Generate JWT secrets
echo ""
echo "Generating JWT secrets..."
SECRET1=$(node -e "console.log(require('crypto').randomBytes(32).toString('hex'))")
SECRET2=$(node -e "console.log(require('crypto').randomBytes(32).toString('hex'))")

echo ""
echo "✅ Generated Secrets:"
echo ""
echo "JWT_ACCESS_SECRET=$SECRET1"
echo "JWT_REFRESH_SECRET=$SECRET2"
echo ""
echo "📋 Copy these to Railway environment variables!"
echo ""

# Check backend build
echo "Building backend..."
cd backend
npm run build
if [ $? -eq 0 ]; then
  echo "✅ Backend build successful"
else
  echo "❌ Backend build failed"
  exit 1
fi

cd ..

# Check frontend build
echo ""
echo "Building frontend..."
cd frontend
npm run build
if [ $? -eq 0 ]; then
  echo "✅ Frontend build successful"
else
  echo "❌ Frontend build failed"
  exit 1
fi

cd ..

echo ""
echo "✅ All systems ready for deployment!"
echo ""
echo "📚 Next steps:"
echo "1. Visit https://railway.app and deploy the backend folder"
echo "2. Visit https://vercel.com and deploy the frontend folder"
echo "3. Add environment variables to both platforms"
echo "4. Set NEXT_PUBLIC_API_URL in Vercel to your Railway URL"
echo ""
echo "📖 For detailed instructions, see DEPLOYMENT.md"
