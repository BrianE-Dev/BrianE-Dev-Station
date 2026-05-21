import jwt from 'jsonwebtoken'

import { env } from '../config/env.js'

export function signAccessToken(user) {
  return jwt.sign(
    {
      email: user.email,
      role: user.role,
    },
    env.jwtSecret,
    {
      expiresIn: env.jwtExpiresIn,
      subject: user.id,
    },
  )
}
