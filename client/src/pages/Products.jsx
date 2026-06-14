import { useEffect, useState } from 'react'
import AppLayout from '../components/AppLayout'
import TopBar from '../components/TopBar'
import EmptyState from '../components/EmptyState'
import ProductCard from '../components/ProductCard'
import AddProductModal from '../components/AddProductModal'
import Toast from '../components/Toast'
import { getProducts } from '../api/products'
import styles from './Products.module.css'

export default function Products() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [toast, setToast] = useState('')

  const fetchProducts = () => {
    setLoading(true)
    getProducts()
      .then(res => setProducts(res.data))
      .catch(() => {})
      .finally(() => setLoading(false))
  }

  useEffect(() => { fetchProducts() }, [])

  const handleAddSuccess = () => {
    setShowModal(false)
    setToast('Product added Successfully')
    fetchProducts()
  }

  return (
    <AppLayout>
      <TopBar title="🛍️ Products" showSearch />
      <div className={styles.content}>
        {loading ? (
          <div className={styles.loadingWrap}><div className={styles.spinner} /></div>
        ) : products.length === 0 ? (
          <EmptyState
            title="Feels a little empty over here..."
            subtitle={'You can create products without connecting store\nyou can add products to store anytime'}
            action="Add your Products"
            onAction={() => setShowModal(true)}
          />
        ) : (
          <>
            <div className={styles.header}>
              <h2>Products</h2>
              <button className={styles.addBtn} onClick={() => setShowModal(true)}>
                + Add Products
              </button>
            </div>
            <div className={styles.grid}>
              {products.map(p => (
                <ProductCard
                  key={p._id}
                  product={p}
                  onRefresh={fetchProducts}
                  onToast={setToast}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {showModal && (
        <AddProductModal
          onClose={() => setShowModal(false)}
          onSuccess={handleAddSuccess}
        />
      )}
      {toast && <Toast message={toast} onClose={() => setToast('')} />}
    </AppLayout>
  )
}
