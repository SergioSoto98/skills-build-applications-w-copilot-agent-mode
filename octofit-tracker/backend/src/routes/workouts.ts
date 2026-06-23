import { Router, Request, Response } from 'express'

const router = Router()

// List workouts
router.get('/', (_req: Request, res: Response) => {
  res.json({ message: 'List workouts (stub)' })
})

// Create workout
router.post('/', (_req: Request, res: Response) => {
  res.status(201).json({ message: 'Create workout (stub)' })
})

export default router
