import { Router } from 'express'
import {
  register,
  login,
  refresh,
  verifyEmail,
  forgotPasswordHandler,
  resetPasswordHandler,
} from '../controllers/authController'
import { validateRequest } from '../middleware/validateRequest'
import {
  registerSchema,
  loginSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
} from '../validators/authValidators'

const router = Router()

router.get('/verify-email', verifyEmail)
router.post('/register', validateRequest(registerSchema), register)
router.post('/login', validateRequest(loginSchema), login)
router.post('/refresh', refresh)
router.post('/forgot-password', validateRequest(forgotPasswordSchema), forgotPasswordHandler)
router.post('/reset-password', validateRequest(resetPasswordSchema), resetPasswordHandler)

export default router
