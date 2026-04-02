# Quick Reference Guide

## 🚀 Quick Start Commands

### Backend
```bash
cd backend
npm install
cp .env.example .env
npm run prisma:generate
npm run prisma:migrate
npm run dev
```

### Frontend
```bash
cd frontend
npm install
cp .env.local.example .env.local
npm run dev
```

## 📋 Common Commands

### Backend Commands
| Command | Purpose |
|---------|---------|
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Build TypeScript to JavaScript |
| `npm start` | Start production server |
| `npm run prisma:generate` | Generate Prisma Client |
| `npm run prisma:migrate` | Run database migrations |
| `npm run prisma:studio` | Open Prisma Studio UI |

### Frontend Commands
| Command | Purpose |
|---------|---------|
| `npm run dev` | Start dev server |
| `npm run build` | Build for production |
| `npm start` | Start production server |
| `npm run lint` | Run ESLint |

### Docker Commands
```bash
# Start all services
docker-compose up -d

# Stop all services
docker-compose down

# View logs
docker-compose logs -f

# Run backend migrations
docker-compose exec backend npm run prisma:migrate

# View database
docker-compose exec postgres psql -U taskuser -d task_management
```

## 🔑 Key Files to Modify

| File | Purpose |
|------|---------|
| `backend/.env` | Backend configuration |
| `frontend/.env.local` | Frontend API URL |
| `backend/prisma/schema.prisma` | Database schema |
| `backend/src/controllers/tasks.ts` | Task business logic |
| `frontend/components/TaskForm.tsx` | Task creation UI |
| `frontend/styles/*.module.css` | UI styling |

## 📍 Important Ports

| Service | Port | URL |
|---------|------|-----|
| Backend | 3000 | http://localhost:3000 |
| Frontend | 3001 | http://localhost:3001 |
| PostgreSQL | 5432 | localhost:5432 |
| Prisma Studio | 5555 | http://localhost:5555 |

## 🔍 API Base URLs

- **Development**: `http://localhost:3000`
- **Production Backend**: Update in `frontend/.env.local`
- **Auth Header**: `Authorization: Bearer {accessToken}`

## 📝 Environment Variables Checklist

### Backend (.env)
```
✓ DATABASE_URL
✓ JWT_SECRET (min 32 chars)
✓ JWT_REFRESH_SECRET (min 32 chars)
✓ PORT
✓ NODE_ENV
```

### Frontend (.env.local)
```
✓ NEXT_PUBLIC_API_URL
```

## 🧪 Testing API Endpoints

### Using cURL

**Register**
```bash
curl -X POST http://localhost:3000/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "name": "Test User",
    "password": "password123",
    "confirmPassword": "password123"
  }'
```

**Login**
```bash
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'
```

**Get Tasks** (replace TOKEN with actual token)
```bash
curl -X GET "http://localhost:3000/tasks?page=1&limit=10" \
  -H "Authorization: Bearer TOKEN"
```

**Create Task**
```bash
curl -X POST http://localhost:3000/tasks \
  -H "Authorization: Bearer TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "My Task",
    "description": "Task description"
  }'
```

## 🐛 Debugging Tips

### Check if services are running
```bash
# Backend
curl http://localhost:3000/health

# Frontend running
curl http://localhost:3001
```

### View server logs
```bash
# Backend dev server shows logs in terminal

# Frontend build errors shown in terminal

# Production logs:
# Docker: docker-compose logs -f backend
```

### Check database
```bash
# Using psql
psql -U username -d task_management

# List tables
\dt

# View schema
\dt+

# Exit
\q
```

### Browser DevTools
- **Console**: Check for JavaScript errors
- **Network**: View API calls and responses
- **Application**: Check localStorage for tokens
- **Storage**: Debug data persistence

## 📂 Project Structure Quick View

```
task-management-system/
├── backend/               # Express API
│   ├── src/              # Source code
│   ├── prisma/           # Database schema
│   └── .env              # Configuration
├── frontend/             # Next.js app
│   ├── app/              # Pages
│   ├── components/       # React components
│   ├── lib/              # Utilities
│   └── .env.local        # Configuration
├── README.md             # Main docs
├── SETUP.md              # Setup guide
├── CHECKLIST.md          # Features list
└── docker-compose.yml    # Docker setup
```

## 🔗 Important URLs

- **Main README**: [README.md](./README.md)
- **Setup Guide**: [SETUP.md](./SETUP.md)
- **Features Checklist**: [CHECKLIST.md](./CHECKLIST.md)
- **Backend Docs**: [backend/README.md](./backend/README.md)
- **Frontend Docs**: [frontend/README.md](./frontend/README.md)

## 🆘 Quick Troubleshooting

| Problem | Solution |
|---------|----------|
| Port 3000 taken | `netstat -ano \| findstr :3000` then kill process |
| DB connection error | Check DATABASE_URL in .env |
| CORS errors | Backend needs to allow frontend URL |
| Tokens not saving | Check localStorage in DevTools |
| 401 errors | Token expired, logout and login again |
| Module not found | Run `npm install` in that directory |
| TypeScript errors | `npm run build` to see full errors |

## 💡 Development Workflow

1. **Make changes** to backend/frontend code
2. **Dev server auto-reloads** (hot reload enabled)
3. **Test changes** using API client or browser
4. **Check logs** for errors
5. **Debug** using browser DevTools or server logs
6. **Repeat**

## 🚀 Production Checklist

Before deploying:
- [ ] Change JWT secrets to strong random values
- [ ] Set NODE_ENV=production
- [ ] Use production database
- [ ] Configure CORS for production domain
- [ ] Set NEXT_PUBLIC_API_URL to production backend
- [ ] Run `npm run build` for production builds
- [ ] Set up environment variables on hosting platform
- [ ] Enable HTTPS on production
- [ ] Set up database backups
- [ ] Configure logging/monitoring

## 📊 API Response Format

### Success Response
```json
{
  "data": {},
  "message": "Success message"
}
```

### Error Response
```json
{
  "error": "Error message"
}
```

### Paginated Response
```json
{
  "tasks": [],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 50,
    "pages": 5
  }
}
```

## 🎓 Learning Resources

- [Next.js Docs](https://nextjs.org/docs)
- [Express Docs](https://expressjs.com/)
- [Prisma Docs](https://www.prisma.io/docs/)
- [PostgreSQL Docs](https://www.postgresql.org/docs/)
- [TypeScript Docs](https://www.typescriptlang.org/docs/)
- [JWT](https://jwt.io/)

---

**Last Updated**: April 2024
**Version**: 1.0.0
