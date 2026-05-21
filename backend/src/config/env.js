import dotenv from 'dotenv'

dotenv.config()

export const env = {
  port: Number(process.env.PORT ?? 4000),
  clientUrl: process.env.CLIENT_URL ?? 'http://localhost:5173',
  jwtSecret: process.env.JWT_SECRET ?? 'dev-secret-change-before-production',
  jwtExpiresIn: process.env.JWT_EXPIRES_IN ?? '7d',
  paystackSecretKey: process.env.PAYSTACK_SECRET_KEY ?? '',
  r2PublicBaseUrl: process.env.R2_PUBLIC_BASE_URL ?? '',
}
