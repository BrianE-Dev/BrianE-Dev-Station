import { Router } from 'express'

import { dashboardStats, listUsers } from '../controllers/admin-controller.js'
import { requireAuth, requireRole } from '../middleware/auth.js'

export const adminRoutes = Router()

adminRoutes.use(requireAuth, requireRole('ADMIN'))
adminRoutes.get('/stats', dashboardStats)
adminRoutes.get('/users', listUsers)
