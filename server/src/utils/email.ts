import transporter from '../config/mailer'

export async function sendVerificationEmail(to: string, name: string, token: string) {
  const verifyUrl = `${process.env.CLIENT_URL}/verify-email?token=${token}`

  if (process.env.NODE_ENV !== 'production') {
    console.log('\n📧 [DEV] Verification email would be sent to:', to)
    console.log('🔗 [DEV] Verification link:', verifyUrl, '\n')
    return
  }

  await transporter.sendMail({
    from: process.env.EMAIL_FROM,
    to,
    subject: 'Verify your MoonlightAnime account',
    html: `
      <div style="font-family: sans-serif; max-width: 480px; margin: 0 auto;">
        <h2 style="color: #7c3aed;">Welcome to MoonlightAnime, ${name}!</h2>
        <p>Please verify your email address to activate your account.</p>
        <a href="${verifyUrl}" style="display: inline-block; padding: 12px 24px; background: #7c3aed; color: white; text-decoration: none; border-radius: 6px; margin: 16px 0;">
          Verify Email
        </a>
        <p style="color: #888; font-size: 14px;">This link expires in 24 hours. If you didn't create this account, you can safely ignore this email.</p>
      </div>
    `,
  })
}
