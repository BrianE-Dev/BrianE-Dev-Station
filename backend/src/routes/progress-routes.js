import { Router } from 'express'

import { listProgress, updateProgress } from '../controllers/progress-controller.js'
import { requireAuth } from '../middleware/auth.js'

export const progressRoutes = Router()

progressRoutes.get('/', requireAuth, listProgress)
progressRoutes.put('/', requireAuth, updateProgress)
