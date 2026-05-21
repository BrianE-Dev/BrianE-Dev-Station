import { db } from '../models/data-store.js'
import { createCheckout } from '../services/payment-service.js'

export function createPaymentCheckout(req, res) {
  const { courseId, ebookId } = req.body

  if (!courseId && !ebookId) {
    return res.status(400).json({ message: 'courseId or ebookId is required' })
  }

  const product = courseId
    ? db.courses.find((course) => course.id === courseId)
    : db.ebooks.find((ebook) => ebook.id === ebookId)

  if (!product) {
    return res.status(404).json({ message: 'Product not found' })
  }

  const checkout = createCheckout({
    userId: req.user.id,
    courseId,
    ebookId,
    amount: product.price,
  })

  res.status(201).json({ checkout })
}

export function handlePaystackWebhook(req, res) {
  const { event, data } = req.body

  if (event !== 'charge.success') {
    return res.json({ received: true })
  }

  const metadata = data?.metadata ?? {}
  const purchase = {
    id: `purchase_${data.reference}`,
    userId: metadata.userId,
    courseId: metadata.courseId ?? null,
    ebookId: metadata.ebookId ?? null,
    paymentReference: data.reference,
    createdAt: new Date().toISOString(),
  }

  db.purchases.push(purchase)
  res.status(201).json({ received: true, purchase })
}
