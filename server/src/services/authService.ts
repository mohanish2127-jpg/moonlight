import bcrypt from 'bcryptjs'
import prisma from '../config/prisma'
import { ConflictError, UnauthorizedError } from '../utils/apiError'
import {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
  generateEmailVerificationToken,
  verifyEmailVerificationToken,
  generatePasswordResetToken,
  verifyPasswordResetToken,
} from '../utils/jwt'
import { sendVerificationEmail, sendPasswordResetEmail } from '../utils/email'
import type {
  RegisterInput,
  LoginInput,
  ForgotPasswordInput,
  ResetPasswordInput,
} from '../validators/authValidators'
export async function registerUser(input: RegisterInput) {
  const existingUser = await prisma.user.findUnique({ where: { email: input.email } })

  if (existingUser) {
    throw new ConflictError('An account with this email already exists')
  }

  const hashedPassword = await bcrypt.hash(input.password, 10)

  const user = await prisma.user.create({
    data: {
      name: input.name,
      email: input.email,
      password: hashedPassword,
    },
  })

  const verificationToken = generateEmailVerificationToken(user.id)
  await sendVerificationEmail(user.email, user.name, verificationToken)

  const accessToken = generateAccessToken({ userId: user.id, role: user.role })
  const refreshToken = generateRefreshToken({ userId: user.id, role: user.role })

  return {
    user: { id: user.id, name: user.name, email: user.email, role: user.role },
    accessToken,
    refreshToken,
  }
}

export async function loginUser(input: LoginInput) {
  const user = await prisma.user.findUnique({ where: { email: input.email } })

  if (!user) {
    throw new UnauthorizedError('Invalid email or password')
  }

  const isPasswordValid = await bcrypt.compare(input.password, user.password)

  if (!isPasswordValid) {
    throw new UnauthorizedError('Invalid email or password')
  }

  const accessToken = generateAccessToken({ userId: user.id, role: user.role })
  const refreshToken = generateRefreshToken({ userId: user.id, role: user.role })

  return {
    user: { id: user.id, name: user.name, email: user.email, role: user.role },
    accessToken,
    refreshToken,
  }
}

export async function refreshAccessToken(refreshToken: string) {
  let payload
  try {
    payload = verifyRefreshToken(refreshToken)
  } catch {
    throw new UnauthorizedError('Invalid or expired refresh token')
  }

  const user = await prisma.user.findUnique({ where: { id: payload.userId } })

  if (!user) {
    throw new UnauthorizedError('User no longer exists')
  }

  const accessToken = generateAccessToken({ userId: user.id, role: user.role })

  return { accessToken }
}

export async function verifyUserEmail(token: string) {
  let payload
  try {
    payload = verifyEmailVerificationToken(token)
  } catch {
    throw new UnauthorizedError('Invalid or expired verification link')
  }

  const user = await prisma.user.update({
    where: { id: payload.userId },
    data: { isVerified: true },
  })

  return { email: user.email }
}
export async function forgotPassword(input: ForgotPasswordInput) {
  const user = await prisma.user.findUnique({ where: { email: input.email } })

  // Always return success even if user doesn't exist — prevents email enumeration attacks
  if (!user) {
    return { message: 'If an account exists, a reset link has been sent' }
  }

  const resetToken = generatePasswordResetToken(user.id)
  await sendPasswordResetEmail(user.email, user.name, resetToken)

  return { message: 'If an account exists, a reset link has been sent' }
}

export async function resetPassword(input: ResetPasswordInput) {
  let payload
  try {
    payload = verifyPasswordResetToken(input.token)
  } catch {
    throw new UnauthorizedError('Invalid or expired reset link')
  }

  const hashedPassword = await bcrypt.hash(input.newPassword, 10)

  await prisma.user.update({
    where: { id: payload.userId },
    data: { password: hashedPassword },
  })

  return { message: 'Password reset successfully' }
}
