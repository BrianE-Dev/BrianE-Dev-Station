import { Router } from 'express'

import { grantPurchase, myPurchases } from '../controllers/purchase-controller.js'
import { requireAuth, requireRole } from '../middleware/auth.js'

export const purchaseRoutes = Router()

purchaseRoutes.get('/me', requireAuth, myPurchases)
purchaseRoutes.post('/grant', requireAuth, requireRole('ADMIN'), grantPurchase)
