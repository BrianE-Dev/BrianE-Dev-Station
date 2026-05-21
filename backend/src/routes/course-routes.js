import { Router } from 'express'

import { createCourse, createLesson, getCourse, listCourses } from '../controllers/course-controller.js'
import { requireAuth, requireRole } from '../middleware/auth.js'

export const courseRoutes = Router()

courseRoutes.get('/', listCourses)
courseRoutes.get('/:slug', getCourse)
courseRoutes.post('/', requireAuth, requireRole('ADMIN', 'INSTRUCTOR'), createCourse)
courseRoutes.post('/:courseId/lessons', requireAuth, requireRole('ADMIN', 'INSTRUCTOR'), createLesson)
