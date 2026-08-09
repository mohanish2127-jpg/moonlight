import { Response, NextFunction } from 'express'
import { AuthRequest } from './authenticate'
import { ForbiddenError } from '../utils/apiError'

export function authorize(...allowedRoles: string[]) {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user) {
      next(new ForbiddenError('Not authenticated'))
      return
    }

    if (!allowedRoles.includes(req.user.role)) {
      next(new ForbiddenError('You do not have permission to access this resource'))
      return
    }

    next()
  }
}
