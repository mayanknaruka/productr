const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS, // Gmail App Password
  },
})

const sendOTP = async (to, otp) => {
  // If email not configured, just log (for local dev)
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    console.log(`📧 OTP for ${to}: ${otp}`)
    return
  }

  await transporter.sendMail({
    from: `"Productr" <${process.env.EMAIL_USER}>`,
    to,
    subject: 'Your Productr Login OTP',
    html: `
      <div style="font-family:Inter,sans-serif;max-width:480px;margin:0 auto;padding:32px;background:#f8f8fa;border-radius:12px;">
        <h2 style="color:#1a237e;margin-bottom:8px;">Productr</h2>
        <p style="color:#555;margin-bottom:24px;">Your one-time login code:</p>
        <div style="background:#1a237e;color:#fff;font-size:2rem;font-weight:800;letter-spacing:12px;text-align:center;padding:20px;border-radius:8px;">
          ${otp}
        </div>
        <p style="color:#aaa;font-size:0.82rem;margin-top:20px;">This code expires in 5 minutes. Do not share it.</p>
      </div>
    `,
  })
  console.log(`📧 OTP sent to ${to}`)
}

module.exports = { sendOTP }
