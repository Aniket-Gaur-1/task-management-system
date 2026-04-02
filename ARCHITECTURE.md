# Architecture Overview

## 🏗️ System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        User's Browser                            │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │           Next.js Frontend (React)                      │   │
│  │  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  │   │
│  │  │ Login Page   │  │ Register Page│  │  Dashboard   │  │   │
│  │  └──────────────┘  └──────────────┘  └──────────────┘  │   │
│  │  ┌──────────────────────────────────────────────────┐  │   │
│  │  │     State Management & API Integration          │  │   │
│  │  │  (useAuth, API services, Axios)                 │  │   │
│  │  └──────────────────────────────────────────────────┘  │   │
│  └─────────────────────────────────────────────────────────┘   │
│                            │                                     │
│                   HTTP/HTTPS(REST API)                           │
│                            │                                     │
└────────────────────────────┼─────────────────────────────────────┘
                             │
                             ▼
         ┌───────────────────────────────────────┐
         │    Node.js/Express Backend API        │
         │  ┌─────────────────────────────────┐  │
         │  │   API Router                    │  │
         │  │ ├─ /auth routes                 │  │
         │  │ └─ /tasks routes (protected)    │  │
         │  └─────────────────────────────────┘  │
         │  ┌─────────────────────────────────┐  │
         │  │   Controllers                   │  │
         │  │ ├─ Auth Controller              │  │
         │  │ └─ Tasks Controller             │  │
         │  └─────────────────────────────────┘  │
         │  ┌─────────────────────────────────┐  │
         │  │   Middleware                    │  │
         │  │ ├─ Authentication Middleware    │  │
         │  │ ├─ Error Handler                │  │
         │  │ └─ CORS                         │  │
         │  └─────────────────────────────────┘  │
         │  ┌─────────────────────────────────┐  │
         │  │   Utilities                     │  │
         │  │ └─ JWT (token generation)       │  │
         │  └─────────────────────────────────┘  │
         └───────────────────────────────────────┘
                        │
                        │ (Prisma ORM)
                        ▼
         ┌───────────────────────────────┐
         │    PostgreSQL Database        │
         │  ┌─────────────────────────┐  │
         │  │  Users Table            │  │
         │  │  Tasks Table            │  │
         │  └─────────────────────────┘  │
         └───────────────────────────────┘
```

## 📊 Data Flow Diagram

### Authentication Flow
```
User Input (Email/Password)
    │
    ▼
Frontend Component (Login Page)
    │
    ├─→ Validate Input
    │
    ▼
API Request → Backend Auth Controller
    │
    ├─→ Check User Exists
    ├─→ Verify Password (bcrypt)
    │
    ▼
Generate Tokens
    ├─→ Access Token (15m)
    └─→ Refresh Token (7d)
    │
    ▼
Response with Tokens
    │
    ▼
Frontend Store Tokens
    ├─→ localStorage (accessToken)
    └─→ localStorage (refreshToken)
    │
    ▼
Redirect to Dashboard
```

### Task Management Flow
```
User Action (Create/Read/Edit/Delete Task)
    │
    ▼
Frontend Component
    │
    ├─→ API Call with Token in Header
    │   Authorization: Bearer <accessToken>
    │
    ▼
Backend Route Handler
    │
    ├─→ Auth Middleware
    │   ├─→ Verify Token
    │   └─→ Extract userId
    │
    ▼
Task Controller
    │
    ├─→ Validate Input
    ├─→ Ensure User Ownership
    │
    ▼
Prisma ORM
    │
    ├─→ Query/Modify Database
    │
    ▼
Response
    │
    ├─→ JSON Response
    ├─→ HTTP Status Code
    │
    ▼
Frontend
    │
    ├─→ Update UI
    └─→ Show Toast Notification
```

## 🔌 API Layer Architecture

### Request Flow
```
HTTP Request
    │
    ▼
Express Router
    │
    ├─→ Route Matching
    │
    ▼
Middleware Chain
    ├─→ Body Parser (JSON)
    ├─→ CORS
    └─→ Authentication (if protected)
    │
    ▼
Controller Function
    │
    ├─→ Input Validation
    ├─→ Business Logic
    ├─→ Prisma Operations
    │
    ▼
Response
    │
    ├─→ HTTP Status Code
    └─→ JSON Body
```

## 🗄️ Database Schema Relationships

```
┌────────────────────┐
│      Users         │
├────────────────────┤
│ id (PK)            │
│ email (UNIQUE)     │
│ name               │
│ password           │
│ createdAt          │
│ updatedAt          │
└────────────────────┘
         │
         │ (1 to Many)
         │
         ▼
┌────────────────────┐
│      Tasks         │
├────────────────────┤
│ id (PK)            │
│ title              │
│ description        │
│ status             │
│ userId (FK)        │──────→ References Users.id
│ createdAt          │
│ updatedAt          │
│ (Index on userId)  │
└────────────────────┘
```

## 🔐 Authentication & Authorization Flow

```
1. User Credentials
        │
        ▼
2. Bcrypt Hash Comparison
        │
        ├─→ Hash matches?
        │   Yes ↓
        │
3. Generate JWT Tokens
        ├─→ Access Token (payload: userId, exp: 15m)
        └─→ Refresh Token (payload: userId, exp: 7d)
        │
        ▼
4. Send Tokens to Client
        │
        ▼
5. Client Stores Tokens
        ├─→ localStorage
        │
6. Client Includes Token in Headers
        ├─→ Authorization: Bearer <token>
        │
        ▼
7. Backend Validates Token
        ├─→ Signature valid?
        ├─→ Not expired?
        ├─→ Extract userId from payload
        │
        ▼
8. Token Expired?
        ├─→ No: Continue to next middleware
        └─→ Yes:
            ├─→ Try Refresh Token
            ├─→ Get new Access Token
            └─→ Retry original request
```

## 🔄 Component Communication

### Frontend

```
App
├── auth/
│   ├── login/page.tsx
│   │   └── Uses: authAPI.login
│   │       └── Calls: useAuth.setTokens
│   │           └── Stores: localStorage
│   │
│   └── register/page.tsx
│       └── Uses: authAPI.register
│
└── dashboard/page.tsx
    ├── Uses: taskAPI (getTasks, createTask, etc.)
    ├── Uses: useAuth (authentication state)
    │
    └── Components:
        ├── TaskForm
        │   └── onAddTask → taskAPI.createTask
        │
        ├── TaskList
        │   └── Displays tasks in grid
        │
        └── TaskItem
            ├── onDelete → taskAPI.deleteTask
            └── onToggle → taskAPI.toggleTask
```

### Backend

```
Request → Route → Auth Middleware
                      ↓
              Extract userId from JWT
                      ↓
                 Controller
                      ↓
        ┌─────────────┼─────────────┐
        ▼             ▼             ▼
    Validate      Verify User     Query DB
    Input         Ownership       (Prisma)
        │             │             │
        └─────────────┼─────────────┘
                      ▼
                   Response
```

## 🚀 Deployment Architecture

### Development
```
Laptop/Machine
├── Frontend (npm run dev)
│   └── localhost:3001
├── Backend (npm run dev)
│   └── localhost:3000
└── PostgreSQL
    └── localhost:5432
```

### Docker Development
```
Docker Desktop
├── Frontend Container
│   └── :3001
├── Backend Container
│   └── :3000
└── PostgreSQL Container
    └── :5432
```

### Production
```
┌──────────────────┐
│    CDN / Static  │
│  (Frontend Build)│
│  (Vercel/Netlify)
└──────────────────┘
         │
         │ HTTPS
         ▼
┌──────────────────────┐
│   Load Balancer      │
└──────────────────────┘
         │
         ▼
┌──────────────────────┐
│  Backend Instances   │ (Railway/Heroku/AWS)
│  (Node.js/Express)   │
└──────────────────────┘
         │
         ▼
┌──────────────────────┐
│  PostgreSQL Database │ (AWS RDS/Heroku Postgres)
└──────────────────────┘
```

## 🔄 Token Refresh Mechanism

```
Frontend makes request with expired token
         │
         ▼
Backend returns 401
         │
         ▼
Axios interceptor catches 401
         │
         ▼
Check if already retried?
├─→ Yes: Redirect to login
└─→ No: Proceed to refresh
         │
         ▼
Call /auth/refresh with refreshToken
         │
         ├─→ Valid?
         │   Yes ↓
         │   ├─→ Get new accessToken
         │   ├─→ Store in localStorage
         │   └─→ Retry original request
         │
         └─→ Invalid?
             └─→ Clear tokens
             └─→ Redirect to login
```

## 📈 Scalability Considerations

### Current Architecture Can Scale:
1. **Horizontal Scaling** - Multiple backend instances
2. **Database Replication** - PostgreSQL read replicas
3. **Caching** - Add Redis for token/data caching
4. **CDN** - Serve frontend static files
5. **Load Balancing** - Distribute requests
6. **Monitoring** - Add logging & monitoring

### Future Enhancements:
- WebSockets for real-time updates
- Microservices architecture
- GraphQL API
- Task queues for async operations
- File upload support
- Advanced filtering/analytics

---

**This architecture follows industry best practices for:**
- Security (JWT, bcrypt, CORS)
- Scalability (stateless API)
- Maintainability (separation of concerns)
- Performance (pagination, indexing)
- User Experience (responsive, notifications)
