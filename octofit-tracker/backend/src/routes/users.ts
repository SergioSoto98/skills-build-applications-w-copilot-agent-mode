import { Router, Request, Response } from 'express'

const router = Router()

// List users
router.get('/', (_req: Request, res: Response) => {
  res.json({ message: 'List users (stub)' })
})

// Create user
router.post('/', (_req: Request, res: Response) => {
  res.status(201).json({ message: 'Create user (stub)' })
})

export default router
