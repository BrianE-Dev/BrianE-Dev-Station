import { db } from '../models/data-store.js'
import { createSignedDownloadUrl } from '../services/download-service.js'

export function createEbookDownload(req, res) {
  const ebook = db.ebooks.find((item) => item.id === req.params.ebookId)

  if (!ebook) {
    return res.status(404).json({ message: 'Ebook not found' })
  }

  const purchase = db.purchases.find((item) => item.userId === req.user.id && item.ebookId === ebook.id)

  if (!purchase) {
    return res.status(403).json({ message: 'Purchase required to download this ebook' })
  }

  res.json({ download: createSignedDownloadUrl(ebook) })
}

export function downloadEbookFile(req, res) {
  const ebook = db.ebooks.find((item) => item.id === req.params.ebookId)

  if (!ebook || !req.query.token) {
    return res.status(404).json({ message: 'Download not found' })
  }

  res.json({
    message: 'Connect this endpoint to Cloudflare R2 or S3 streaming in production.',
    ebookId: ebook.id,
    pdfUrl: ebook.pdfUrl,
  })
}
