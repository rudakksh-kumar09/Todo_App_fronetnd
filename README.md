# TodoApp Frontend

A modern, responsive React application for task management with JWT authentication and Google OAuth integration.

## Features

- **Modern React**: Built with React 18 and functional components with hooks
- **Responsive Design**: Mobile-first design that works on all devices
- **Authentication**: JWT-based auth with Google OAuth integration
- **Real-time Updates**: Instant UI updates with optimistic rendering
- **Toast Notifications**: User-friendly notifications for all actions
- **Protected Routes**: Secure route protection for authenticated users
- **Beautiful UI**: Clean, modern interface with smooth animations

## Tech Stack

- **Frontend**: React 18 with Hooks
- **Routing**: React Router v6
- **HTTP Client**: Axios
- **Authentication**: @react-oauth/google
- **Notifications**: React Toastify
- **Styling**: CSS3 with CSS Grid and Flexbox
- **Build Tool**: Create React App

## Project Structure

```
frontend/
├── public/
│   ├── index.html
│   └── manifest.json
├── src/
│   ├── components/
│   │   ├── Navbar.js           # Navigation component
│   │   ├── ProtectedRoute.js   # Route protection
│   │   ├── TodoForm.js         # Add todo form
│   │   └── TodoItem.js         # Individual todo item
│   ├── context/
│   │   └── AuthContext.js      # Authentication context
│   ├── pages/
│   │   ├── Home.js             # Landing page
│   │   ├── Login.js            # Login page
│   │   ├── Register.js         # Registration page
│   │   └── Dashboard.js        # Main dashboard
│   ├── services/
│   │   └── api.js              # API client
│   ├── styles/
│   │   ├── index.css           # Global styles
│   │   ├── Auth.css            # Authentication pages
│   │   ├── Dashboard.css       # Dashboard styles
│   │   ├── Home.css            # Home page styles
│   │   ├── Navbar.css          # Navigation styles
│   │   ├── TodoForm.css        # Todo form styles
│   │   └── TodoItem.css        # Todo item styles
│   ├── App.js                  # Main app component
│   └── index.js                # Entry point
├── package.json
└── README.md
```

## Setup Instructions

### Prerequisites

- Node.js 16+ and npm
- Backend API running on port 5000

### Installation

1. **Navigate to frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure environment variables:**
   ```bash
   # Update .env file with your settings
   REACT_APP_API_URL=http://localhost:5000/api
   REACT_APP_GOOGLE_CLIENT_ID=your-google-client-id
   ```

4. **Start development server:**
   ```bash
   npm start
   ```

The application will open at `http://localhost:3000`

## Available Scripts

- `npm start` - Start development server
- `npm build` - Build for production
- `npm test` - Run tests
- `npm eject` - Eject from Create React App

## Pages & Components

### Pages

1. **Home (`/`)** - Landing page with features and call-to-action
2. **Login (`/login`)** - User authentication with email/password and Google OAuth
3. **Register (`/register`)** - User registration form
4. **Dashboard (`/dashboard`)** - Protected main application interface

### Key Components

1. **Navbar** - Responsive navigation with auth state management
2. **ProtectedRoute** - Route wrapper for authenticated-only pages
3. **TodoForm** - Form for creating new todos
4. **TodoItem** - Individual todo with edit, delete, and complete functionality

### Context

- **AuthContext** - Global authentication state management

### Services

- **API Client** - Centralized HTTP client with interceptors for auth

## Features in Detail

### Authentication
- Email/password registration and login
- Google OAuth integration
- JWT token management
- Automatic token refresh
- Protected route handling

### Todo Management
- Create todos with title and description
- Edit todos inline
- Mark todos as complete/incomplete
- Delete todos with confirmation
- Filter todos by status
- Sort todos by various criteria
- Bulk actions for multiple todos

### UI/UX
- Responsive design for all screen sizes
- Loading states and error handling
- Toast notifications for user feedback
- Smooth animations and transitions
- Accessible form controls

## Google OAuth Setup

1. **Google Cloud Console:**
   - Create a new project or select existing
   - Enable Google+ API
   - Create OAuth 2.0 credentials
   - Add authorized origins: `http://localhost:3000`

2. **Update environment:**
   ```bash
   REACT_APP_GOOGLE_CLIENT_ID=your-actual-client-id
   ```

## API Integration

The frontend communicates with the Flask backend through:

- **Authentication endpoints:** `/api/register`, `/api/login`
- **Todo endpoints:** `/api/todos` (CRUD operations)
- **Protected routes:** Automatic JWT token inclusion

## Deployment

### Build for Production

```bash
npm run build
```

### Deploy to Render (Recommended)

This project is configured for easy deployment on Render.com:

1. **Push to GitHub**
2. **Connect repository to Render**
3. **Render will auto-detect configuration** from `render.yaml`

Or manually create a Static Site with:
- **Build Command**: `npm install && npm run build`
- **Publish Directory**: `./build`
- **Environment Variables**:
  - `REACT_APP_API_URL=https://todo-app-rqn6.onrender.com/api`
  - `GENERATE_SOURCEMAP=false`

See `RENDER_DEPLOYMENT.md` for detailed instructions.

### Deploy to Netlify/Vercel

1. Connect your GitHub repository
2. Set build command: `npm run build`
3. Set publish directory: `build`
4. Configure environment variables in dashboard

### Environment Variables for Production

- `REACT_APP_API_URL` - Your backend API URL (configured for https://todo-app-rqn6.onrender.com/api)
- `REACT_APP_GOOGLE_CLIENT_ID` - Google OAuth client ID

## Customization

### Styling
- CSS files in `/src/styles/`
- CSS custom properties for theming
- Responsive breakpoints for mobile support

### Components
- Modular component structure
- Reusable UI components
- Props-based customization

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Performance

- Code splitting with React.lazy (can be added)
- Optimized bundle size
- Efficient re-rendering with React hooks
- Image optimization for production

## Contributing

1. Follow the existing code structure
2. Use consistent naming conventions
3. Add proper error handling
4. Test on multiple screen sizes
5. Update documentation as needed

## Troubleshooting

### Common Issues

1. **CORS errors:** Ensure backend CORS is configured for `http://localhost:3000`
2. **Google OAuth not working:** Verify client ID and authorized origins
3. **API calls failing:** Check backend is running on port 5000
4. **Styling issues:** Clear browser cache and restart dev server

### Debug Mode

Set `REACT_APP_DEBUG=true` in `.env` for additional console logging.

## License

This project is for educational purposes.
