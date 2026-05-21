import { db } from '../models/data-store.js'
import { publicUser } from '../utils/sanitize.js'

export function dashboardStats(_req, res) {
  res.json({
    stats: {
      users: db.users.length,
      courses: db.courses.length,
      lessons: db.lessons.length,
      ebooks: db.ebooks.length,
      purchases: db.purchases.length,
      completedLessons: db.lessonProgress.filter((item) => item.completed).length,
    },
  })
}

export function listUsers(_req, res) {
  res.json({ users: db.users.map(publicUser) })
}
