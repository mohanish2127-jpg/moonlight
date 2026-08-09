import { Router } from 'express'
import {
  register,
  login,
  refresh,
  verifyEmail,
  forgotPasswordHandler,
  resetPasswordHandler,
  googleAuthHandler,
} from '../controllers/authController'
import { validateRequest } from '../middleware/validateRequest'
import {
  registerSchema,
  loginSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
} from '../validators/authValidators'
import { authenticate } from '../middleware/authenticate'
import { getMe } from '../controllers/authController' // add getMe to the existing import instead of a new line
const router = Router()

router.get('/verify-email', verifyEmail)
router.post('/register', validateRequest(registerSchema), register)
router.post('/login', validateRequest(loginSchema), login)
router.post('/refresh', refresh)
router.post('/forgot-password', validateRequest(forgotPasswordSchema), forgotPasswordHandler)
router.post('/reset-password', validateRequest(resetPasswordSchema), resetPasswordHandler)
router.post('/google', googleAuthHandler)
router.get('/me', authenticate, getMe)
export default router
