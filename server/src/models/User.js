const mongoose = require('mongoose')

const userSchema = new mongoose.Schema(
  {
    name: { type: String, trim: true, default: '' },
    contact: { type: String, required: true, trim: true, unique: true },
    otp: { type: String, default: '' },
    otpExpiry: { type: Date },
  },
  { timestamps: true }
)

module.exports = mongoose.model('User', userSchema)
