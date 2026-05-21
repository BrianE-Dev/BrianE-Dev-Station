import { db } from '../models/data-store.js'

export function listProgress(req, res) {
  const progress = db.lessonProgress.filter((item) => item.userId === req.user.id)
  res.json({ progress })
}

export function updateProgress(req, res) {
  const { lessonId, completed = true } = req.body

  if (!lessonId) {
    return res.status(400).json({ message: 'lessonId is required' })
  }

  const existing = db.lessonProgress.find((item) => item.userId === req.user.id && item.lessonId === lessonId)

  if (existing) {
    existing.completed = completed
    existing.updatedAt = new Date().toISOString()
    return res.json({ progress: existing })
  }

  const progress = {
    userId: req.user.id,
    lessonId,
    completed,
    updatedAt: new Date().toISOString(),
  }

  db.lessonProgress.push(progress)
  res.status(201).json({ progress })
}
