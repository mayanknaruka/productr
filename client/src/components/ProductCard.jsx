import { useState } from 'react'
import { updateProduct } from '../api/products'
import EditProductModal from './EditProductModal'
import DeleteModal from './DeleteModal'
import { deleteProduct } from '../api/products'
import styles from './ProductCard.module.css'

export default function ProductCard({ product, onRefresh, onToast }) {
  const [showEdit, setShowEdit] = useState(false)
  const [showDelete, setShowDelete] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const [publishing, setPublishing] = useState(false)

  const handlePublishToggle = async () => {
    setPublishing(true)
    try {
      await updateProduct(product._id, { published: !product.published })
      onRefresh()
    } finally {
      setPublishing(false)
    }
  }

  const handleDeleteConfirm = async () => {
    setDeleting(true)
    try {
      await deleteProduct(product._id)
      setShowDelete(false)
      onRefresh()
      onToast?.('Product Deleted Successfully')
    } finally {
      setDeleting(false)
    }
  }

  const handleEditSuccess = () => {
    setShowEdit(false)
    onRefresh()
    onToast?.('Product Updated Successfully')
  }

  return (
    <>
      <div className={styles.card}>
        <div className={styles.imgWrap}>
          <img
            src={product.image || 'https://via.placeholder.com/300x180?text=No+Image'}
            alt={product.name}
          />
          <div className={styles.dots}>
            <span className={styles.dotActive} />
            <span className={styles.dot} />
            <span className={styles.dot} />
            <span className={styles.dot} />
          </div>
        </div>

        <div className={styles.body}>
          <h3 className={styles.name}>{product.name}</h3>
          <div className={styles.details}>
            <div className={styles.row}>
              <span>Product type -</span>
              <span>{product.category}</span>
            </div>
            <div className={styles.row}>
              <span>Quantity Stock -</span>
              <span>{product.stock}</span>
            </div>
            <div className={styles.row}>
              <span>MRP-</span>
              <span>₹ {product.mrp || Math.round(product.price * 1.33)}</span>
            </div>
            <div className={styles.row}>
              <span>Selling Price -</span>
              <span>₹ {product.price}</span>
            </div>
            <div className={styles.row}>
              <span>Brand Name -</span>
              <span>{product.brand || '-'}</span>
            </div>
            <div className={styles.row}>
              <span>Total Number of images -</span>
              <span>{product.imageCount || 1}</span>
            </div>
            <div className={styles.row}>
              <span>Exchange Eligibility -</span>
              <span>{product.returnEligible === false ? 'NO' : 'YES'}</span>
            </div>
          </div>

          <div className={styles.actions}>
            <button
              className={`${styles.publishBtn} ${product.published ? styles.unpublishBtn : ''}`}
              onClick={handlePublishToggle}
              disabled={publishing}
            >
              {publishing ? '...' : product.published ? 'Unpublish' : 'Publish'}
            </button>
            <button
              className={styles.editBtn}
              onClick={() => setShowEdit(true)}
            >
              Edit
            </button>
            <button
              className={styles.deleteBtn}
              onClick={() => setShowDelete(true)}
              aria-label="Delete product"
            >
              🗑
            </button>
          </div>
        </div>
      </div>

      {showEdit && (
        <EditProductModal
          product={product}
          onClose={() => setShowEdit(false)}
          onSuccess={handleEditSuccess}
        />
      )}

      {showDelete && (
        <DeleteModal
          productName={product.name}
          onClose={() => setShowDelete(false)}
          onConfirm={handleDeleteConfirm}
          loading={deleting}
        />
      )}
    </>
  )
}
