import { Router, Request, Response } from 'express'

const router = Router()

// List activities
router.get('/', (_req: Request, res: Response) => {
  res.json({ message: 'List activities (stub)' })
})

// Log activity
router.post('/', (_req: Request, res: Response) => {
  res.status(201).json({ message: 'Log activity (stub)' })
})

export default router
