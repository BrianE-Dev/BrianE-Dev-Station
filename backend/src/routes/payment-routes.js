import { Router } from 'express'

import { createPaymentCheckout, handlePaystackWebhook } from '../controllers/payment-controller.js'
import { requireAuth } from '../middleware/auth.js'

export const paymentRoutes = Router()

paymentRoutes.post('/checkout', requireAuth, createPaymentCheckout)
paymentRoutes.post('/webhooks/paystack', handlePaystackWebhook)
