# Render Deployment Guide

This React frontend is configured to deploy on Render.com and connect to your backend at `https://todo-app-rqn6.onrender.com`.

## Files Created/Modified for Deployment:

1. **render.yaml** - Render service configuration
2. **.env.production** - Production environment variables
3. **.env.development** - Development environment variables  
4. **public/_redirects** - Handles client-side routing for SPA
5. **package.json** - Removed local proxy configuration

## Deploy Steps:

### Option 1: Automatic Deployment (Recommended)
1. Push your code to GitHub
2. Connect your GitHub repo to Render
3. Render will automatically detect the `render.yaml` file and deploy

### Option 2: Manual Configuration on Render
1. Create a new **Static Site** on Render
2. Connect your GitHub repository
3. Use these settings:
   - **Build Command**: `npm ci && npm run build` (or `npm install && npm run build`)
   - **Publish Directory**: `./build`
   - **Environment Variables**:
     - `REACT_APP_API_URL` = `https://todo-app-rqn6.onrender.com/api`
     - `GENERATE_SOURCEMAP` = `false`

## Troubleshooting Build Issues:

If you get "react-scripts: not found" error:
1. Ensure `package-lock.json` is committed to your repository
2. Try using `npm install` instead of `npm ci` in build command
3. Check that all dependencies are listed in `package.json`

## Environment Variables:

- **REACT_APP_API_URL**: Points to your deployed backend
- **GENERATE_SOURCEMAP**: Disabled for faster builds and smaller bundle size

## Notes:

- The `_redirects` file ensures all routes are handled by React Router
- Environment files separate development and production API URLs
- CORS should be configured on your backend to allow requests from your frontend domain

## Testing Locally:

To test with production environment:
```bash
npm run build
npx serve -s build
```

Your frontend will be accessible at the URL provided by Render after deployment.
