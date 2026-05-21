import { createId } from '../utils/ids.js'

export function createCheckout({ userId, courseId, ebookId, amount }) {
  const reference = createId('paystack')

  return {
    reference,
    amount,
    currency: 'NGN',
    authorizationUrl: `https://checkout.paystack.com/${reference}`,
    status: 'pending',
    userId,
    courseId: courseId ?? null,
    ebookId: ebookId ?? null,
  }
}
