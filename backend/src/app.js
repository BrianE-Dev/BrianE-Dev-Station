import cors from 'cors'
import express from 'express'
import helmet from 'helmet'
import morgan from 'morgan'

import { env } from './config/env.js'
import { errorHandler, notFoundHandler } from './middleware/error.js'
import apiRoutes from './routes/index.js'

export const app = express()

app.use(helmet())
app.use(cors({ origin: env.clientUrl, credentials: true }))
app.use(express.json())
app.use(morgan('dev'))

app.get('/health', (_req, res) => {
  res.json({ status: 'ok', service: 'Brainedev-api' })
})

app.use('/api', apiRoutes)

app.use(notFoundHandler)
app.use(errorHandler)
