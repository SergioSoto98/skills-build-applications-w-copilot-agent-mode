import express from 'express'
import { connectMongoose, getMongoUri } from './config/database'
import usersRouter from './routes/users'
import teamsRouter from './routes/teams'
import activitiesRouter from './routes/activities'
import leaderboardRouter from './routes/leaderboard'
import workoutsRouter from './routes/workouts'
import initRouter from './routes/init'

const app = express()
const PORT = process.env.PORT ? Number(process.env.PORT) : 8000

const CODESPACE_NAME = process.env.CODESPACE_NAME
const API_URL = CODESPACE_NAME
  ? `https://${CODESPACE_NAME}-8000.app.github.dev`
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

export async function startServer(): Promise<void> {
  try {
    await connectMongoose()
    const uri = getMongoUri()
    console.log('Connected to MongoDB at', uri)
    console.log('API URL:', API_URL)
    app.listen(PORT, () => console.log(`Server listening on port ${PORT}`))
  } catch (err) {
    console.error('Failed to start server', err)
    process.exit(1)
  }
}

export default app
