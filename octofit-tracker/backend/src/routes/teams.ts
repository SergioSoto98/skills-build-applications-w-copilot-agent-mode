import { Router, Request, Response } from 'express'

const router = Router()

// List teams
router.get('/', (_req: Request, res: Response) => {
  res.json({ message: 'List teams (stub)' })
})

// Create team
router.post('/', (_req: Request, res: Response) => {
  res.status(201).json({ message: 'Create team (stub)' })
})

export default router
