const mongoose = require('mongoose')

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, default: '' },
    price: { type: Number, required: true, min: 0 },
    mrp: { type: Number, default: 0 },
    category: { type: String, required: true, trim: true },
    brand: { type: String, default: '' },
    image: { type: String, default: '' },
    stock: { type: Number, default: 0, min: 0 },
    rating: { type: Number, default: 0, min: 0, max: 5 },
    published: { type: Boolean, default: false },
    returnEligible: { type: Boolean, default: true },
    imageCount: { type: Number, default: 1 },
  },
  { timestamps: true }
)

module.exports = mongoose.model('Product', productSchema)
