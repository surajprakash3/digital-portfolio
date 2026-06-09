# Deployment Instructions

## Frontend (Vercel)

1. Connect your GitHub repository to [Vercel](https://vercel.com).
2. Root Directory: `frontend`
3. Framework Preset: `Vite`
4. Build Command: `npm run build`
5. Output Directory: `dist`
6. Add Environment Variables:
   - `VITE_API_URL`: Your backend URL (e.g., `https://api.yourportfolio.com`)

## Backend (Render / Railway)

### Render
1. Create a "Web Service" on [Render](https://render.com).
2. Root Directory: `backend`
3. Runtime: `Node`
4. Build Command: `npm install`
5. Start Command: `node server.js`
6. Add Environment Variables:
   - `MONGODB_URI`: Your MongoDB Atlas connection string.
   - `PORT`: `5000`

### MongoDB Atlas
1. Create a free cluster.
2. Under "Network Access", allow your server IP (or `0.0.0.0/0` for testing).
3. Under "Database Access", create a user with read/write permissions.
4. Copy the connection string and replace `<password>` with your user password.
