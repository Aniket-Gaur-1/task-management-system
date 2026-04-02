# Setup Guide - Task Management System

## 🚀 Quick Start (Development)

### Option 1: Local Development (Recommended for Development)

#### Prerequisites
- Node.js 18+
- PostgreSQL 12+
- npm

#### Step 1: Clone/Setup Project
```bash
cd d:\task-management-system
```

#### Step 2: Backend Setup
```bash
cd backend

# Install dependencies
npm install

# Copy and configure environment
copy .env.example .env

# Edit .env file with:
# - Your PostgreSQL connection string
# - JWT secrets (use unique random strings)
# - PORT=3000

# Generate Prisma Client
npm run prisma:generate

# Run database migrations
npm run prisma:migrate

# Start backend
npm run dev
```

Backend will run at: `http://localhost:3000`

#### Step 3: Frontend Setup (in new terminal)
```bash
cd frontend

# Install dependencies
npm install

# Copy and configure environment
copy .env.local.example .env.local

# Edit .env.local:
# NEXT_PUBLIC_API_URL=http://localhost:3000

# Start frontend
npm run dev
```

Frontend will run at: `http://localhost:3000` or `http://localhost:3001` (if 3000 is taken)

#### Step 4: Access Application
Open your browser and navigate to `http://localhost:3001` (or the frontend port shown)

### Your .env Examples

#### Backend (.env)
```
DATABASE_URL=postgresql://username:password@localhost:5432/task_management
JWT_SECRET=your_random_secret_key_min_32_characters_long_12345678901234567
JWT_REFRESH_SECRET=your_random_refresh_secret_key_min_32_characters_long_123456789
PORT=3000
NODE_ENV=development
```

#### Frontend (.env.local)
```
NEXT_PUBLIC_API_URL=http://localhost:3000
```

## 🐳 Option 2: Docker Compose (Production-like)

### Prerequisites
- Docker
- Docker Compose

### Quick Start
```bash
cd task-management-system

# Copy environment file
copy .env.example .env

# Start all services
docker-compose up -d

# Wait for services to start (~30 seconds)

# Run database migrations
docker-compose exec backend npm run prisma:migrate
```

Services will be available at:
- Frontend: `http://localhost:3001`
- Backend: `http://localhost:3000`
- PostgreSQL: `localhost:5432`

### Stop Services
```bash
docker-compose down
```

### View Logs
```bash
# All services
docker-compose logs -f

# Specific service
docker-compose logs -f backend
docker-compose logs -f frontend
docker-compose logs -f postgres
```

## 📚 Database Setup Instructions

### Option A: Local PostgreSQL Setup

#### Windows (using PostgreSQL installer)
1. Download PostgreSQL from https://www.postgresql.org/download/windows/
2. Run installer and remember the password you set for `postgres` user
3. PostgreSQL will be running on `localhost:5432`
4. Create a new database:
   ```bash
   psql -U postgres
   CREATE DATABASE task_management;
   \q
   ```

#### macOS (using Homebrew)
```bash
brew install postgresql@15
brew services start postgresql@15

psql postgres
CREATE DATABASE task_management;
\q
```

#### Linux (Ubuntu/Debian)
```bash
sudo apt-get install postgresql postgresql-contrib
sudo -u postgres psql

CREATE DATABASE task_management;
\q
```

### Option B: Using Docker
```bash
# Run PostgreSQL in Docker
docker run --name task-db -e POSTGRES_PASSWORD=taskpass123 -e POSTGRES_DB=task_management -p 5432:5432 -d postgres:15-alpine
```

## 🧪 Testing the Application

### 1. Register a New Account
- Navigate to `http://localhost:3001/auth/register`
- Fill in: Email, Full Name, Password, Confirm Password
- Click "Register"

### 2. You Should Be Redirected to Dashboard
- If not, navigate to `http://localhost:3001/dashboard`

### 3. Create Tasks
- Click "+ Add New Task"
- Enter task title (required)
- Enter task description (optional)
- Click "Add Task"

### 4. Test Filtering and Search
- Use the search box to find tasks by title
- Use the status dropdown to filter by: All Tasks, Pending, In Progress, Completed

### 5. Test Task Operations
- Click "✓ Complete" to mark a task as done (status changes to completed)
- Click "↩ Undo" to mark a task as pending again
- Click "Delete" to remove a task

### 6. Test Pagination
- Create multiple tasks (more than 10)
- Use "Previous" and "Next" buttons to navigate

### 7. Logout
- Click "Logout" button in top right
- You should be redirected to login page

## 🔧 Troubleshooting

### Backend won't start
```bash
# Check if port 3000 is already in use
netstat -ano | findstr :3000

# If in use, either:
# 1. Stop the process using that port
# 2. Or change PORT in .env
```

### Database connection error
- Verify PostgreSQL is running
- Check DATABASE_URL in .env is correct
- Ensure database exists
- Try: `psql -U username -d task_management -c "SELECT 1;"`

### Frontend can't connect to backend
- Check NEXT_PUBLIC_API_URL in .env.local
- Verify backend is running at that URL
- Check browser console for CORS errors
- Ensure backend CORS is enabled

### Prisma migration errors
```bash
# Reset database (WARNING: deletes all data)
npm run prisma:migrate -- --skip-generate

# Or manually in psql:
DROP DATABASE task_management;
CREATE DATABASE task_management;

# Then re-run migrations
npm run prisma:migrate
```

### Tokens not working
- Clear browser localStorage: F12 → Application → LocalStorage → Clear
- Logout and login again
- Check token expiration times

## 📦 Production Deployment

### Deploying Backend (Heroku, Railway, Render)

1. Set environment variables on hosting platform:
   ```
   DATABASE_URL=your_production_database_url
   JWT_SECRET=generate_strong_secret
   JWT_REFRESH_SECRET=generate_strong_secret
   NODE_ENV=production
   PORT=3000
   ```

2. Deploy with `npm run build` and `npm start`

### Deploying Frontend (Vercel, Netlify)

1. Set environment variable:
   ```
   NEXT_PUBLIC_API_URL=your_backend_production_url
   ```

2. Deploy Next.js application

3. Update backend CORS settings to allow production frontend URL

## 📝 API Health Check

Test if backend is running:
```bash
curl http://localhost:3000/health
```

Should return:
```json
{
  "status": "OK",
  "message": "Server is running"
}
```

## 🆘 Need Help?

### Common Issues & Solutions

| Issue | Solution |
|-------|----------|
| "Cannot find module" | Run `npm install` in that directory |
| "Port already in use" | Change PORT in .env or kill process on that port |
| "Database error" | Check DATABASE_URL, ensure PostgreSQL is running |
| "CORS error" | Backend needs proper CORS configuration |
| "Token expired" | Clear localStorage and login again |
| "Blank dashboard" | Check browser console for errors |

## 🎓 Next Steps

1. **Understand the Architecture**
   - Read main README.md for project structure
   - Review backend/README.md for API details
   - Review frontend/README.md for UI details

2. **Customize**
   - Add more task fields in Prisma schema
   - Enhance UI with additional features
   - Add task priority, due dates, categories

3. **Extend**
   - Add task comments/notes
   - Add task attachments
   - Add team collaboration features
   - Add notifications

4. **Deploy**
   - Set up production database
   - Deploy backend to cloud
   - Deploy frontend to Vercel/Netlify
   - Configure custom domain

## 📚 Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Express.js Documentation](https://expressjs.com/)
- [Prisma Documentation](https://www.prisma.io/docs/)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [JWT Documentation](https://jwt.io/)
