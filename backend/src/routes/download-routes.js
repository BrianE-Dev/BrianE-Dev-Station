import { Router } from 'express'

import { createEbookDownload, downloadEbookFile } from '../controllers/download-controller.js'
import { requireAuth } from '../middleware/auth.js'

export const downloadRoutes = Router()

downloadRoutes.post('/ebooks/:ebookId', requireAuth, createEbookDownload)
downloadRoutes.get('/:ebookId/file', downloadEbookFile)
