const nodemailer = require('nodemailer')

const sendOTP = async (to, otp) => {
  // Always log to terminal as fallback
  console.log(`\n📧 OTP for ${to}: ${otp}\n`)

  const user = process.env.EMAIL_USER
  const pass = process.env.EMAIL_PASS

  if (!user || !pass) {
    console.log('⚠️  EMAIL_USER or EMAIL_PASS not set — OTP only in terminal')
    return
  }

  // Remove spaces from app password (Gmail gives it with spaces)
  const cleanPass = pass.replace(/\s/g, '')

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: { user, pass: cleanPass },
  })

  try {
    await transporter.sendMail({
      from: `"Productr" <${user}>`,
      to,
      subject: 'Your Productr Login OTP',
      html: `
        <div style="font-family:Inter,sans-serif;max-width:480px;margin:0 auto;padding:32px;background:#f8f8fa;border-radius:12px;">
          <h2 style="color:#1a237e;margin-bottom:8px;">Productr 🔗</h2>
          <p style="color:#555;margin-bottom:24px;">Your one-time login code is:</p>
          <div style="background:#1a237e;color:#fff;font-size:2.2rem;font-weight:800;letter-spacing:14px;text-align:center;padding:24px;border-radius:8px;">
            ${otp}
          </div>
          <p style="color:#aaa;font-size:0.82rem;margin-top:20px;">Expires in 5 minutes. Do not share it with anyone.</p>
        </div>
      `,
    })
    console.log(`✅ OTP email sent to ${to}`)
  } catch (err) {
    console.error(`❌ Email failed: ${err.message}`)
    console.log(`👆 Use the terminal OTP above instead`)
  }
}

module.exports = { sendOTP }
