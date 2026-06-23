# OctoFit Tracker — Backend

This README contains instructions to install dependencies, run the backend server, seed the database, and verify API endpoints.

Prerequisites
- Node.js (LTS) and npm installed locally
- MongoDB running locally on port `27017`

Ports
- Backend API: `8000`
- Frontend dev (Vite): `5173`
- MongoDB: `27017`

Install
```bash
# From repository root
npm install --prefix octofit-tracker/backend
```

Run backend in development
```bash
npm run dev --prefix octofit-tracker/backend
# Server listens on port 8000 by default
```

Seed the database (two options)

- Using the API route (requires the server running):
```bash
curl -X POST http://localhost:8000/init-populate-octofit_db
```

- Or run the seed script directly (uses `mongodb://localhost:27017/octofit_db` by default):
```bash
npm run seed --prefix octofit-tracker/backend
```

Notes about configuration
- To change the MongoDB connection string set `MONGO_URI` environment variable before running.
- In Codespaces the server exposes an `apiUrl` based on `CODESPACE_NAME` (see `/` root endpoint response).

Verify data creation (example curl checks)
```bash
curl http://localhost:8000/api/users
curl http://localhost:8000/api/teams
curl http://localhost:8000/api/activities
curl http://localhost:8000/api/leaderboard
curl http://localhost:8000/api/workouts
```

If endpoints return arrays/counts consistent with the seed step, the data tier is populated.

Troubleshooting
- If `npm` is not available, install Node.js from https://nodejs.org/
- Ensure `mongod` is running locally: `ps aux | grep mongod` (or start your MongoDB service)
