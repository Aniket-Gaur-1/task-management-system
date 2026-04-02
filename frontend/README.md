# Frontend Web App - Task Management System

Next.js + React web application for task management.

## Quick Start

### Prerequisites
- Node.js 18+
- npm

### Installation

```bash
# Install dependencies
npm install

# Setup environment
cp .env.local.example .env.local
# Edit .env.local with your API URL

# Start development server
npm run dev
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## Project Structure

```
app/
├── page.tsx              # Root page (redirects to dashboard or login)
├── auth/
│   ├── login/page.tsx    # Login page
│   └── register/page.tsx # Registration page
└── dashboard/
    └── page.tsx          # Main task dashboard

components/
├── TaskForm.tsx          # Modal form for creating tasks
├── TaskList.tsx          # Grid of tasks
└── TaskItem.tsx          # Individual task card

lib/
├── api.ts                # Axios instance with interceptors
└── services.ts           # API service functions

hooks/
└── useAuth.ts            # Authentication hook

styles/
├── auth.module.css       # Authentication pages styling
├── dashboard.module.css  # Dashboard styling
├── taskForm.module.css   # Task form styling
├── taskItem.module.css   # Task item styling
└── taskList.module.css   # Task list styling
```

## Environment Variables

Create `.env.local` file:

```
NEXT_PUBLIC_API_URL=http://localhost:3000
```

## Features

### Authentication
- User registration with email, name, and password
- User login with email and password
- JWT token storage in localStorage
- Automatic token refresh on expiration
- Logout functionality

### Task Management
- Create tasks with title and optional description
- View all tasks in a responsive grid
- Filter tasks by status (pending, in-progress, completed)
- Search tasks by title
- Paginate through tasks (10 per page)
- Toggle task completion status
- Delete tasks

### UI/UX
- Responsive design (mobile, tablet, desktop)
- Toast notifications for user feedback
- Loading states
- Error handling
- Gradient background
- Clean, modern card-based layout

## Pages

### `/auth/login`
User login page with email and password fields.

### `/auth/register`
User registration page with email, name, and password fields.

### `/dashboard`
Main task management dashboard with:
- Task creation form
- Task list with pagination
- Filtering and search features
- User logout button

### `/`
Root page that redirects to dashboard if logged in, otherwise to login.

## API Integration

### Token Management
- Access tokens are stored in localStorage
- Refresh tokens are stored in localStorage
- Automatic token refresh on 401 responses
- Fallback to login on token refresh failure

### Error Handling
- Toast notifications for all errors
- User-friendly error messages
- Proper loading states

## Development

### Start Dev Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000)

### Build for Production
```bash
npm run build
npm start
```

## Styling

The app uses CSS Modules for styling:
- No global styles conflict
- Scoped styling per component
- Mobile-first responsive design
- Gradient backgrounds
- Smooth transitions and hover effects

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Performance

- Code splitting with Next.js
- Optimized images
- CSS Modules tree-shaking
- Client-side caching of tokens

## Troubleshooting

### Cannot connect to API
- Check `NEXT_PUBLIC_API_URL` in `.env.local`
- Ensure backend is running on the specified port
- Check CORS settings on backend

### Tokens not persisting
- Check localStorage in browser DevTools
- Ensure cookies aren't being cleared
- Check token expiration times

### Blank dashboard
- Check browser console for errors
- Verify API authentication endpoints
- Check network tab in DevTools
