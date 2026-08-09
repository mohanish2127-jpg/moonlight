import { Router } from 'express'
import { register, login } from '../controllers/authController'
import { validateRequest } from '../middleware/validateRequest'
import { registerSchema, loginSchema } from '../validators/authValidators'
import { register, login, refresh } from '../controllers/authController'
import { register, login, refresh, verifyEmail } from '../controllers/authController'
const router = Router()
router.get('/verify-email', verifyEmail)
router.post('/register', validateRequest(registerSchema), register)
router.post('/login', validateRequest(loginSchema), login)
router.post('/refresh', refresh)
export default router
