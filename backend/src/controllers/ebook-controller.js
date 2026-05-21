import { db } from '../models/data-store.js'
import { createId } from '../utils/ids.js'

export function listEbooks(_req, res) {
  res.json({ ebooks: db.ebooks })
}

export function getEbook(req, res) {
  const ebook = db.ebooks.find((item) => item.id === req.params.id)

  if (!ebook) {
    return res.status(404).json({ message: 'Ebook not found' })
  }

  res.json({ ebook })
}

export function createEbook(req, res) {
  const { title, description, price = 0, pdfUrl, coverImage } = req.body

  if (!title || !description || !pdfUrl) {
    return res.status(400).json({ message: 'title, description, and pdfUrl are required' })
  }

  const ebook = {
    id: createId('ebook'),
    title,
    description,
    price,
    pdfUrl,
    coverImage: coverImage ?? '',
  }

  db.ebooks.push(ebook)
  res.status(201).json({ ebook })
}
