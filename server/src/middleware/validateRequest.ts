import { Request, Response, NextFunction } from 'express'
import { ZodType } from 'zod'
import { sendError } from '../utils/apiResponse'

export function validateRequest(schema: ZodType) {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body)

    if (!result.success) {
      sendError(res, 400, 'Validation failed', result.error.flatten())
      return
    }

    req.body = result.data
    next()
  }
}
