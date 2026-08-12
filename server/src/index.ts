import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import compression from 'compression'
import cookieParser from 'cookie-parser'
import pinoHttp from 'pino-http'
import dotenv from 'dotenv'
import { errorHandler, notFoundHandler } from './middleware/errorHandler'
import { loggerOptions } from './config/logger'
import authRoutes from './routes/authRoutes'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

const httpLogger = pinoHttp(loggerOptions)

app.use(helmet())
app.use(cors({ origin: 'http://localhost:5173', credentials: true }))
app.use(compression())
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(httpLogger)

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', message: 'MoonlightAnime API is running' })
})

app.use('/api/auth', authRoutes)
app.use(notFoundHandler)
app.use(errorHandler)

app.listen(PORT, () => {
  httpLogger.logger.info(`Server running on http://localhost:${PORT}`)
})
