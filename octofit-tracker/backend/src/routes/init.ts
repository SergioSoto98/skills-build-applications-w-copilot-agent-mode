import { Router, Request, Response } from 'express'
import { User, Team, Activity, Workout } from '../models'

const router = Router()

// Populate the database with initial sample data.
router.post('/', async (_req: Request, res: Response) => {
  try {
    const existingUsers = await User.countDocuments()
    if (existingUsers > 0) {
      return res.status(200).json({ message: 'Database already populated' })
    }

    // Create users
    const users = await User.create([
      { username: 'alice', email: 'alice@example.com' },
      { username: 'bob', email: 'bob@example.com' },
      { username: 'carla', email: 'carla@example.com' }
    ])

    // Create teams
    const teams = await Team.create([
      { name: 'Red Octos', members: [users[0]._id, users[1]._id] },
      { name: 'Blue Tentacles', members: [users[2]._id] }
    ])

    // Create workouts
    const workouts = await Workout.create([
      {
        name: 'Quick Cardio',
        description: 'Short cardio blast',
        exercises: [{ name: 'Run', durationSeconds: 600 }]
      },
      {
        name: 'Core Builder',
        description: 'Core-focused circuit',
        exercises: [{ name: 'Plank', durationSeconds: 90 }, { name: 'Sit-ups', reps: 20 }]
      }
    ])

    // Create activities
    await Activity.create([
      { user: users[0]._id, type: 'run', distanceKm: 5, calories: 320 },
      { user: users[1]._id, type: 'bike', distanceKm: 10, calories: 450 },
      { user: users[2]._id, type: 'workout', calories: 200 },
      { user: users[0]._id, type: 'swim', durationMinutes: 30, calories: 280 }
    ])

    return res.status(201).json({ message: 'Database populated', users: users.length, teams: teams.length, workouts: workouts.length })
  } catch (err) {
    console.error('Failed to populate DB', err)
    return res.status(500).json({ message: 'Failed to populate DB', error: String(err) })
  }
})

export default router
