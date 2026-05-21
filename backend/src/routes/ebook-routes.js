import { Router } from 'express'

import { createEbook, getEbook, listEbooks } from '../controllers/ebook-controller.js'
import { requireAuth, requireRole } from '../middleware/auth.js'

export const ebookRoutes = Router()

ebookRoutes.get('/', listEbooks)
ebookRoutes.get('/:id', getEbook)
ebookRoutes.post('/', requireAuth, requireRole('ADMIN', 'INSTRUCTOR'), createEbook)
