# Task Management System

A full-stack task management application built with Node.js, TypeScript, Next.js, and PostgreSQL.

🔗 **Live Demo:** https://task-management-system-5898.vercel.app

## Features
- User authentication with JWT tokens
- Task CRUD operations
- Task filtering and searching
- Pagination
- Responsive design
- Real-time notifications

## Tech Stack

### Backend
- Node.js + TypeScript
- Express.js
- Prisma ORM
- PostgreSQL database
- JWT authentication
- bcrypt password hashing

### Frontend
- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Axios for API calls
- React Hot Toast for notifications

## Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn
- PostgreSQL database (or use [Neon](https://neon.tech) / [Render](https://render.com) free tier)

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd task-management-system
```

2. Backend Setup
```bash
cd backend
npm install
```

Create a `.env` file in the `backend/` directory:
```env
DATABASE_URL="postgresql://user:password@host:5432/dbname"
JWT_ACCESS_SECRET="your-access-secret"
JWT_REFRESH_SECRET="your-refresh-secret"
PORT=3001
FRONTEND_URL="http://localhost:3000"
```
```bash
npx prisma migrate deploy
npm run dev
```

3. Frontend Setup (in a new terminal)
```bash
cd frontend
npm install
```

Create a `.env.local` file in the `frontend/` directory:
```env
NEXT_PUBLIC_API_URL="http://localhost:3001"
```
```bash
npm run dev
```

4. Access the application
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:3001

## API Endpoints

### Authentication
- `POST /auth/register` - Register a new user
- `POST /auth/login` - Login user
- `POST /auth/refresh` - Refresh access token
- `POST /auth/logout` - Logout user

### Tasks
- `GET /tasks` - Get paginated tasks (with filtering/searching)
- `POST /tasks` - Create a new task
- `GET /tasks/:id` - Get a specific task
- `PATCH /tasks/:id` - Update a task
- `DELETE /tasks/:id` - Delete a task
- `PATCH /tasks/:id/toggle` - Toggle task status

## Deployment

- **Frontend:** Vercel
- **Backend:** Render
- **Database:** Render PostgreSQL

## Project Structure
```
task-management-system/
├── backend/
│   ├── prisma/
│   │   ├── schema.prisma
│   │   └── migrations/
│   ├── src/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── utils/
│   │   └── server.ts
│   ├── package.json
│   └── tsconfig.json
└── frontend/
    ├── app/
    │   ├── dashboard/
    │   ├── login/
    │   ├── register/
    │   └── layout.tsx
    ├── components/
    ├── types/
    ├── package.json
    └── tsconfig.json
```
