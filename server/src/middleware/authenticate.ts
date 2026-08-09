import { Request, Response, NextFunction } from 'express'
import { verifyAccessToken } from '../utils/jwt'
import { UnauthorizedError } from '../utils/apiError'

export interface AuthRequest extends Request {
  user?: {
    userId: string
    role: string
  }
}

export function authenticate(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    const authHeader = req.headers.authorization

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedError('No access token provided')
    }

    const token = authHeader.split(' ')[1]
    const payload = verifyAccessToken(token)

    req.user = { userId: payload.userId, role: payload.role }
    next()
  } catch {
    next(new UnauthorizedError('Invalid or expired access token'))
  }
}
