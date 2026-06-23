/**
 * Seed the octofit_db database with test data
 *
 * Usage: `ts-node src/scripts/seed.ts` or `npm run seed`
 */
import mongoose from 'mongoose'
import { User, Team, Activity, Workout, Leaderboard } from '../models'

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/octofit_db'

async function seed() {
  console.log('Seed the octofit_db database with test data')
  await mongoose.connect(MONGO_URI)
  console.log('Connected to', MONGO_URI)

  // Clear existing
  await Promise.all([
    User.deleteMany({}),
    Team.deleteMany({}),
    Activity.deleteMany({}),
    Workout.deleteMany({}),
    Leaderboard.deleteMany({})
  ])

  // Create users
  const users = await User.create([
    { username: 'alice', email: 'alice@example.com', totalPoints: 120 },
    { username: 'bob', email: 'bob@example.com', totalPoints: 95 },
    { username: 'carla', email: 'carla@example.com', totalPoints: 150 }
  ])

  // Create teams
  const teams = await Team.create([
    { name: 'Red Octos', members: [users[0]._id, users[1]._id], totalPoints: 215 },
    { name: 'Blue Tentacles', members: [users[2]._id], totalPoints: 150 }
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
  const activities = await Activity.create([
    { user: users[0]._id, type: 'run', distanceKm: 5, calories: 320 },
    { user: users[1]._id, type: 'bike', distanceKm: 12, calories: 480 },
    { user: users[2]._id, type: 'workout', calories: 260 },
    { user: users[0]._id, type: 'swim', durationMinutes: 30, calories: 280 }
  ])

  // Create leaderboard entries (users and teams)
  await Leaderboard.create([
    { subjectType: 'user', subject: users[2]._id, points: 150, rank: 1, period: 'all-time' },
    { subjectType: 'user', subject: users[0]._id, points: 120, rank: 2, period: 'all-time' },
    { subjectType: 'user', subject: users[1]._id, points: 95, rank: 3, period: 'all-time' },
    { subjectType: 'team', subject: teams[0]._id, points: 215, rank: 1, period: 'all-time' },
    { subjectType: 'team', subject: teams[1]._id, points: 150, rank: 2, period: 'all-time' }
  ])

  // Log verification counts
  const [uCount, tCount, aCount, wCount, lCount] = await Promise.all([
    User.countDocuments(),
    Team.countDocuments(),
    Activity.countDocuments(),
    Workout.countDocuments(),
    Leaderboard.countDocuments()
  ])

  console.log(`Seed complete: users=${uCount}, teams=${tCount}, activities=${aCount}, workouts=${wCount}, leaderboard=${lCount}`)

  await mongoose.disconnect()
  process.exit(0)
}

seed().catch((err) => {
  console.error('Seeding failed', err)
  process.exit(1)
})
