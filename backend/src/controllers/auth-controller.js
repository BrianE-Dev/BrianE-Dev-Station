import bcrypt from 'bcryptjs'

import { db, roles } from '../models/data-store.js'
import { signAccessToken } from '../services/token-service.js'
import { createId } from '../utils/ids.js'
import { publicUser } from '../utils/sanitize.js'

export async function signup(req, res) {
  const { username, email, password } = req.body

  if (!username || !email || !password) {
    return res.status(400).json({ message: 'username, email, and password are required' })
  }

  const existingUser = db.users.find((user) => user.email.toLowerCase() === email.toLowerCase())
  if (existingUser) {
    return res.status(409).json({ message: 'Email is already registered' })
  }

  const passwordHash = await bcrypt.hash(password, 10)
  const user = {
    id: createId('user'),
    username,
    email,
    passwordHash,
    role: roles.student,
    createdAt: new Date().toISOString(),
  }

  db.users.push(user)

  res.status(201).json({
    user: publicUser(user),
    token: signAccessToken(user),
  })
}

export async function login(req, res) {
  const { email, password } = req.body

  if (!email || !password) {
    return res.status(400).json({ message: 'email and password are required' })
  }

  const user = db.users.find((item) => item.email.toLowerCase() === email.toLowerCase())
  const validPassword = user ? await bcrypt.compare(password, user.passwordHash) : false

  if (!user || !validPassword) {
    return res.status(401).json({ message: 'Invalid email or password' })
  }

  res.json({
    user: publicUser(user),
    token: signAccessToken(user),
  })
}

export function me(req, res) {
  res.json({ user: publicUser(req.user) })
}
