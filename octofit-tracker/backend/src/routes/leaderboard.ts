import { Router, Request, Response } from 'express'

const router = Router()

// Get leaderboard
router.get('/', (_req: Request, res: Response) => {
  res.json({ message: 'Leaderboard (stub)' })
})

export default router
