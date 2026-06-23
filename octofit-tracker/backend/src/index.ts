import express from 'express'
import mongoose from 'mongoose'
import usersRouter from './routes/users'
import teamsRouter from './routes/teams'
import activitiesRouter from './routes/activities'
import leaderboardRouter from './routes/leaderboard'
import workoutsRouter from './routes/workouts'
import initRouter from './routes/init'

const app = express()
const PORT = process.env.PORT ? Number(process.env.PORT) : 8000
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/octofit_db'

// Codespaces-aware API URL: when running inside Codespaces provide a public URL
// Clients (frontend) can read this value from an endpoint or logs if needed.
const CODESPACE_NAME = process.env.CODESPACE_NAME
const API_URL = CODESPACE_NAME
  ? `https://${CODESPACE_NAME}-8000.githubpreview.dev`
  : `http://localhost:${PORT}`

app.use(express.json())

// Mount API routers under /api
app.use('/api/users', usersRouter)
app.use('/api/teams', teamsRouter)
app.use('/api/activities', activitiesRouter)
app.use('/api/leaderboard', leaderboardRouter)
app.use('/api/workouts', workoutsRouter)
app.use('/init-populate-octofit_db', initRouter)

app.get('/', (_req, res) => {
  res.json({ message: 'OctoFit Tracker API running', apiUrl: API_URL })
})

async function start() {
  try {
    await mongoose.connect(MONGO_URI)
    console.log('Connected to MongoDB at', MONGO_URI)
    console.log('API URL:', API_URL)
    app.listen(PORT, () => console.log(`Server listening on port ${PORT}`))
  } catch (err) {
    console.error('Failed to connect to MongoDB', err)
    process.exit(1)
  }
}

start()
