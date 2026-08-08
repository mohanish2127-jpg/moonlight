import { Request, Response, NextFunction } from 'express'
import { ApiError } from '../utils/apiError'
import { sendError } from '../utils/apiResponse'

export function errorHandler(err: unknown, _req: Request, res: Response, _next: NextFunction) {
  if (err instanceof ApiError) {
    sendError(res, err.statusCode, err.message)
    return
  }

  console.error('Unexpected error:', err)
  sendError(res, 500, 'Internal Server Error')
}

export function notFoundHandler(_req: Request, res: Response) {
  sendError(res, 404, 'Route not found')
}
