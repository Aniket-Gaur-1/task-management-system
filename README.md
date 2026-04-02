# Task Management System

A full-stack task management application built with Node.js, TypeScript, Next.js, and SQLite.

## Features

- User authentication with JWT tokens
- Task CRUD operations
- Task filtering and searching
- Pagination
- Responsive design
- Real-time notifications

## Tech Stack

### Backend
- Node.js
- TypeScript
- Express.js
- Prisma ORM
- SQLite database
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

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd task-management-system
   ```

2. **Backend Setup**
   ```bash
   cd backend
   npm install
   npm run db:generate
   npm run db:push
   npm run dev
   ```

3. **Frontend Setup** (in a new terminal)
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

4. **Access the application**
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

## Usage

1. Register a new account or login with existing credentials
2. Create, edit, delete, and manage your tasks
3. Use filters to view pending or completed tasks
4. Search tasks by title
5. Toggle task status with the checkmark button

## Project Structure

```
task-management-system/
├── backend/
│   ├── prisma/
│   │   └── schema.prisma
│   ├── src/
│   │   ├── auth/
│   │   ├── tasks/
│   │   ├── middleware/
│   │   ├── models/
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