import { useState, useRef } from 'react'
import styles from './AddProductModal.module.css'
import { updateProduct } from '../api/products'

const PRODUCT_TYPES = ['Foods', 'Electronics', 'Clothing', 'Sports', 'Home & Living', 'Beauty', 'Books', 'Other']

export default function EditProductModal({ product, onClose, onSuccess }) {
  const [form, setForm] = useState({
    name: product.name || '',
    category: product.category || '',
    stock: product.stock?.toString() || '',
    mrp: product.mrp?.toString() || '',
    price: product.price?.toString() || '',
    brand: product.brand || '',
    returnEligible: product.returnEligible === false ? 'No' : 'Yes',
    description: product.description || '',
  })
  const [images, setImages] = useState(
    product.image ? [{ url: product.image, existing: true }] : []
  )
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const fileRef = useRef()

  const validate = () => {
    const e = {}
    if (!form.name.trim()) e.name = 'Please enter product name'
    if (!form.category) e.category = 'Select product type'
    if (!form.stock) e.stock = 'Enter quantity'
    if (!form.mrp) e.mrp = 'Enter MRP'
    if (!form.price) e.price = 'Enter selling price'
    if (!form.brand.trim()) e.brand = 'Enter brand name'
    return e
  }

  const handleChange = (field, val) => {
    setForm(f => ({ ...f, [field]: val }))
    setErrors(e => ({ ...e, [field]: '' }))
  }

  const handleFiles = (e) => {
    const files = Array.from(e.target.files)
    const previews = files.map(f => ({ file: f, url: URL.createObjectURL(f) }))
    setImages(prev => [...prev, ...previews])
  }

  const removeImage = (idx) => setImages(prev => prev.filter((_, i) => i !== idx))

  const handleSubmit = async (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }
    setLoading(true)
    try {
      await updateProduct(product._id, {
        name: form.name,
        description: form.name,
        category: form.category,
        stock: Number(form.stock),
        price: Number(form.price),
        mrp: Number(form.mrp),
        brand: form.brand,
        returnEligible: form.returnEligible === 'Yes',
        image: images[0]?.url || product.image || '',
        imageCount: images.length || product.imageCount || 1,
      })
      onSuccess()
    } catch {
      setErrors({ submit: 'Failed to update product. Try again.' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={styles.overlay} onClick={e => e.target === e.currentTarget && onClose()}>
      <div className={styles.modal}>
        <div className={styles.header}>
          <h2>Edit Product</h2>
          <button className={styles.close} onClick={onClose}>✕</button>
        </div>

        <form onSubmit={handleSubmit} noValidate className={styles.body}>
          <div className={styles.field}>
            <label>Product Name</label>
            <input
              type="text"
              value={form.name}
              onChange={e => handleChange('name', e.target.value)}
              className={errors.name ? styles.inputErr : ''}
            />
            {errors.name && <span className={styles.errMsg}>{errors.name}</span>}
          </div>

          <div className={styles.field}>
            <label>Product Type</label>
            <div className={styles.selectWrap}>
              <select value={form.category} onChange={e => handleChange('category', e.target.value)}>
                <option value="">Select product type</option>
                {PRODUCT_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
          </div>

          <div className={styles.field}>
            <label>Quantity Stock</label>
            <input type="number" value={form.stock} onChange={e => handleChange('stock', e.target.value)} />
          </div>

          <div className={styles.field}>
            <label>MRP</label>
            <input type="number" value={form.mrp} onChange={e => handleChange('mrp', e.target.value)} />
          </div>

          <div className={styles.field}>
            <label>Selling Price</label>
            <input type="number" value={form.price} onChange={e => handleChange('price', e.target.value)} />
          </div>

          <div className={styles.field}>
            <label>Brand Name</label>
            <input type="text" value={form.brand} onChange={e => handleChange('brand', e.target.value)} />
          </div>

          <div className={styles.field}>
            <div className={styles.uploadHeader}>
              <label>Upload Product Images</label>
              {images.length > 0 && (
                <button type="button" className={styles.addMore} onClick={() => fileRef.current.click()}>
                  Add More Photos
                </button>
              )}
            </div>
            {images.length === 0 ? (
              <div className={styles.uploadBox} onClick={() => fileRef.current.click()}>
                <p className={styles.uploadDesc}>Enter Description</p>
                <p className={styles.uploadBrowse}>Browse</p>
              </div>
            ) : (
              <div className={styles.imagePreviews}>
                {images.map((img, i) => (
                  <div key={i} className={styles.imgThumb}>
                    <img src={img.url} alt="" />
                    <button type="button" className={styles.removeImg} onClick={() => removeImage(i)}>✕</button>
                  </div>
                ))}
              </div>
            )}
            <input ref={fileRef} type="file" accept="image/*" multiple hidden onChange={handleFiles} />
          </div>

          <div className={styles.field}>
            <label>Exchange or return eligibility</label>
            <div className={styles.selectWrap}>
              <select value={form.returnEligible} onChange={e => handleChange('returnEligible', e.target.value)}>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>
          </div>

          {errors.submit && <p className={styles.errMsg}>{errors.submit}</p>}

          <div className={styles.footer}>
            <button type="submit" className={styles.createBtn} disabled={loading}>
              {loading ? 'Updating...' : 'Update'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
