@echo off
REM Quick Deployment Setup for Windows

echo.
echo 🚀 Task Management System - Pre-Deployment Setup
echo ================================================
echo.

REM Generate JWT secrets
echo Generating JWT secrets...
for /f "delims=" %%i in ('node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"') do set SECRET1=%%i
for /f "delims=" %%i in ('node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"') do set SECRET2=%%i

echo.
echo ✅ Generated Secrets:
echo.
echo JWT_ACCESS_SECRET=%SECRET1%
echo JWT_REFRESH_SECRET=%SECRET2%
echo.
echo 📋 Copy these to Railway environment variables!
echo.

REM Check backend build
echo Building backend...
cd backend
call npm run build
if errorlevel 1 (
    echo ❌ Backend build failed
    exit /b 1
)
echo ✅ Backend build successful
cd ..

REM Check frontend build
echo.
echo Building frontend...
cd frontend
call npm run build
if errorlevel 1 (
    echo ❌ Frontend build failed
    exit /b 1
)
echo ✅ Frontend build successful
cd ..

echo.
echo ✅ All systems ready for deployment!
echo.
echo 📚 Next steps:
echo 1. Visit https://railway.app and deploy the backend folder
echo 2. Visit https://vercel.com and deploy the frontend folder
echo 3. Add environment variables to both platforms
echo 4. Set NEXT_PUBLIC_API_URL in Vercel to your Railway URL
echo.
echo 📖 For detailed instructions, see DEPLOYMENT.md
echo.
pause
