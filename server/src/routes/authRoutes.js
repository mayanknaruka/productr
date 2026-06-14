const express = require('express')
const router = express.Router()
const { body, validationResult } = require('express-validator')
const User = require('../models/User')
const { sendOTP } = require('../utils/mailer')

const genOTP = () => Math.floor(100000 + Math.random() * 900000).toString()

// POST /api/auth/register
router.post('/register',
  [
    body('contact').notEmpty().withMessage('Email or phone is required'),
    body('name').notEmpty().withMessage('Name is required'),
  ],
  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() })

    const { name, contact } = req.body
    try {
      let user = await User.findOne({ contact })
      if (user) return res.status(400).json({ message: 'Account already exists. Please login.' })

      const otp = genOTP()
      user = await User.create({ name, contact, otp, otpExpiry: new Date(Date.now() + 5 * 60 * 1000) })
      await sendOTP(contact, otp)
      res.status(201).json({ message: 'OTP sent successfully' })
    } catch (err) {
      res.status(500).json({ message: err.message })
    }
  }
)

// POST /api/auth/send-otp
router.post('/send-otp',
  [body('contact').notEmpty().withMessage('Contact is required')],
  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() })

    const { contact } = req.body
    try {
      let user = await User.findOne({ contact })
      if (!user) {
        user = new User({ contact, name: '' })
      }
      const otp = genOTP()
      user.otp = otp
      user.otpExpiry = new Date(Date.now() + 5 * 60 * 1000)
      await user.save()
      await sendOTP(contact, otp)
      res.json({ message: 'OTP sent successfully' })
    } catch (err) {
      res.status(500).json({ message: err.message })
    }
  }
)

// POST /api/auth/verify-otp
router.post('/verify-otp',
  [
    body('contact').notEmpty(),
    body('otp').isLength({ min: 6, max: 6 }).withMessage('Invalid OTP'),
  ],
  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) return res.status(400).json({ message: 'Please enter a valid OTP' })

    const { contact, otp } = req.body
    try {
      const user = await User.findOne({ contact })
      if (!user || user.otp !== otp) {
        return res.status(400).json({ message: 'Please enter a valid OTP' })
      }
      if (user.otpExpiry < new Date()) {
        return res.status(400).json({ message: 'OTP expired. Please request a new one.' })
      }
      user.otp = ''
      await user.save()
      res.json({
        message: 'Login successful',
        user: { id: user._id, name: user.name, contact: user.contact }
      })
    } catch (err) {
      res.status(500).json({ message: err.message })
    }
  }
)

module.exports = router
