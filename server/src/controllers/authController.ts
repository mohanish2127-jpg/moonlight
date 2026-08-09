import { Request, Response, NextFunction } from 'express'
import { registerUser, loginUser } from '../services/authService'
import { sendSuccess } from '../utils/apiResponse'
import { refreshAccessToken } from '../services/authService'
import { UnauthorizedError } from '../utils/apiError'
import { verifyUserEmail } from '../services/authService'
import { forgotPassword, resetPassword } from '../services/authService'
import { googleAuth } from '../services/authService'

export async function googleAuthHandler(req: Request, res: Response, next: NextFunction) {
  try {
    const { idToken } = req.body
    if (!idToken) {
      throw new UnauthorizedError('Google ID token is required')
    }
    const { user, accessToken, refreshToken } = await googleAuth(idToken)
    res.cookie('refreshToken', refreshToken, REFRESH_COOKIE_OPTIONS)
    sendSuccess(res, 200, { user, accessToken }, 'Google authentication successful')
  } catch (err) {
    next(err)
  }
}
export async function forgotPasswordHandler(req: Request, res: Response, next: NextFunction) {
  try {
    const result = await forgotPassword(req.body)
    sendSuccess(res, 200, result, result.message)
  } catch (err) {
    next(err)
  }
}

export async function resetPasswordHandler(req: Request, res: Response, next: NextFunction) {
  try {
    const result = await resetPassword(req.body)
    sendSuccess(res, 200, result, result.message)
  } catch (err) {
    next(err)
  }
}
export async function verifyEmail(req: Request, res: Response, next: NextFunction) {
  try {
    const { token } = req.query
    if (!token || typeof token !== 'string') {
      throw new UnauthorizedError('Verification token missing')
    }
    const result = await verifyUserEmail(token)
    sendSuccess(res, 200, result, 'Email verified successfully')
  } catch (err) {
    next(err)
  }
}
export async function refresh(req: Request, res: Response, next: NextFunction) {
  try {
    const token = req.cookies.refreshToken
    if (!token) {
      throw new UnauthorizedError('No refresh token provided')
    }
    const { accessToken } = await refreshAccessToken(token)
    sendSuccess(res, 200, { accessToken }, 'Token refreshed')
  } catch (err) {
    next(err)
  }
}
const REFRESH_COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax' as const,
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
}

export async function register(req: Request, res: Response, next: NextFunction) {
  try {
    const { user, accessToken, refreshToken } = await registerUser(req.body)
    res.cookie('refreshToken', refreshToken, REFRESH_COOKIE_OPTIONS)
    sendSuccess(res, 201, { user, accessToken }, 'Registration successful')
  } catch (err) {
    next(err)
  }
}

export async function login(req: Request, res: Response, next: NextFunction) {
  try {
    const { user, accessToken, refreshToken } = await loginUser(req.body)
    res.cookie('refreshToken', refreshToken, REFRESH_COOKIE_OPTIONS)
    sendSuccess(res, 200, { user, accessToken }, 'Login successful')
  } catch (err) {
    next(err)
  }
}
