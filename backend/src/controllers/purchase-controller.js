import { db } from '../models/data-store.js'

export function myPurchases(req, res) {
  const purchases = db.purchases.filter((purchase) => purchase.userId === req.user.id)

  res.json({ purchases })
}

export function grantPurchase(req, res) {
  const { userId, courseId, ebookId, paymentReference } = req.body

  if (!userId || (!courseId && !ebookId) || !paymentReference) {
    return res.status(400).json({ message: 'userId, paymentReference, and courseId or ebookId are required' })
  }

  const purchase = {
    id: `purchase_${paymentReference}`,
    userId,
    courseId: courseId ?? null,
    ebookId: ebookId ?? null,
    paymentReference,
    createdAt: new Date().toISOString(),
  }

  db.purchases.push(purchase)
  res.status(201).json({ purchase })
}
