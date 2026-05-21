import { Router } from 'express'

import { adminRoutes } from './admin-routes.js'
import { authRoutes } from './auth-routes.js'
import { courseRoutes } from './course-routes.js'
import { downloadRoutes } from './download-routes.js'
import { ebookRoutes } from './ebook-routes.js'
import { paymentRoutes } from './payment-routes.js'
import { progressRoutes } from './progress-routes.js'
import { purchaseRoutes } from './purchase-routes.js'

const router = Router()

router.get('/', (_req, res) => {
  res.json({
    name: 'BrianE-Dev API',
    version: '0.1.0',
    endpoints: {
      auth: '/api/auth',
      courses: '/api/courses',
      ebooks: '/api/ebooks',
      payments: '/api/payments',
      purchases: '/api/purchases',
      downloads: '/api/downloads',
      progress: '/api/progress',
      admin: '/api/admin',
    },
  })
})

router.use('/auth', authRoutes)
router.use('/courses', courseRoutes)
router.use('/ebooks', ebookRoutes)
router.use('/payments', paymentRoutes)
router.use('/purchases', purchaseRoutes)
router.use('/downloads', downloadRoutes)
router.use('/progress', progressRoutes)
router.use('/admin', adminRoutes)

export default router
