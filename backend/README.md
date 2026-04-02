# Backend API - Task Management System

Node.js + TypeScript backend API for task management with JWT authentication.

## Quick Start

### Prerequisites
- Node.js 18+
- PostgreSQL
- npm

### Installation

```bash
# Install dependencies
npm install

# Setup environment
cp .env.example .env
# Edit .env with your database URL and secrets

# Generate Prisma Client
npm run prisma:generate

# Run migrations
npm run prisma:migrate

# Start development server
npm run dev
```

## Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build TypeScript to JavaScript
- `npm start` - Start production server
- `npm run prisma:generate` - Generate Prisma client
- `npm run prisma:migrate` - Run database migrations
- `npm run prisma:studio` - Open Prisma Studio UI

## Project Structure

```
src/
├── index.ts              # Express app setup & server start
├── controllers/
│   ├── auth.ts           # Authentication logic
│   └── tasks.ts          # Task CRUD logic
├── routes/
│   ├── auth.ts           # Auth endpoints
│   └── tasks.ts          # Task endpoints
├── middleware/
│   ├── auth.ts           # JWT verification middleware
│   └── errorHandler.ts   # Error handling middleware
└── utils/
    └── jwt.ts            # JWT token generation & verification
```

## Environment Variables

Create `.env` file:

```
DATABASE_URL=postgresql://user:password@localhost:5432/task_management
JWT_SECRET=super_secret_key_change_this
JWT_REFRESH_SECRET=refresh_secret_key_change_this
PORT=3000
NODE_ENV=development
```

## Database Setup

### Using PostgreSQL locally

```bash
# Create database
createdb task_management

# Run migrations
npm run prisma:migrate

# View database
npm run prisma:studio
```

## API Examples

### Register
```bash
curl -X POST http://localhost:3000/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "name": "John Doe",
    "password": "password123",
    "confirmPassword": "password123"
  }'
```

### Login
```bash
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "password123"
  }'
```

### Create Task (requires token)
```bash
curl -X POST http://localhost:3000/tasks \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -d '{
    "title": "My Task",
    "description": "Task description"
  }'
```

### Get Tasks
```bash
curl -X GET "http://localhost:3000/tasks?page=1&limit=10&status=pending" \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"
```

## Error Handling

All errors return appropriate HTTP status codes:
- `400` - Bad Request (validation error)
- `401` - Unauthorized (invalid/missing token)
- `404` - Not Found
- `409` - Conflict (email already registered)
- `500` - Server Error

Example error response:
```json
{
  "error": "Email already registered"
}
```

## Security Considerations

- Passwords are hashed with bcrypt (10 rounds)
- JWT tokens have expiration times
- Access tokens expire in 15 minutes
- Refresh tokens expire in 7 days
- All task endpoints require authentication
- Users can only access their own tasks
