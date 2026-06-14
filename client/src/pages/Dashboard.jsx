import { useEffect, useState } from 'react'
import AppLayout from '../components/AppLayout'
import TopBar from '../components/TopBar'
import EmptyState from '../components/EmptyState'
import ProductCard from '../components/ProductCard'
import Toast from '../components/Toast'
import { getProducts } from '../api/products'
import styles from './Dashboard.module.css'

export default function Dashboard() {
  const [products, setProducts] = useState([])
  const [tab, setTab] = useState('published')
  const [loading, setLoading] = useState(true)
  const [toast, setToast] = useState('')

  const fetchProducts = () => {
    setLoading(true)
    getProducts()
      .then(res => setProducts(res.data))
      .catch(() => {})
      .finally(() => setLoading(false))
  }

  useEffect(() => { fetchProducts() }, [])

  const published = products.filter(p => p.published)
  const unpublished = products.filter(p => !p.published)
  const current = tab === 'published' ? published : unpublished

  return (
    <AppLayout>
      <TopBar title="🏠 Home" />
      <div className={styles.content}>
        <div className={styles.tabs}>
          <button
            className={`${styles.tab} ${tab === 'published' ? styles.activeTab : ''}`}
            onClick={() => setTab('published')}
          >
            Published
          </button>
          <button
            className={`${styles.tab} ${tab === 'unpublished' ? styles.activeTab : ''}`}
            onClick={() => setTab('unpublished')}
          >
            Unpublished
          </button>
        </div>

        {loading ? (
          <div className={styles.loadingWrap}><div className={styles.spinner} /></div>
        ) : current.length === 0 ? (
          <EmptyState
            title={tab === 'published' ? 'No Published Products' : 'No Unpublished Products'}
            subtitle={
              tab === 'published'
                ? 'Your Published Products will appear here\nCreate your first product to publish'
                : 'Your Unpublished Products will appear here\nCreate your first product to publish'
            }
          />
        ) : (
          <div className={styles.grid}>
            {current.map(p => (
              <ProductCard
                key={p._id}
                product={p}
                onRefresh={fetchProducts}
                onToast={setToast}
              />
            ))}
          </div>
        )}
      </div>

      {toast && <Toast message={toast} onClose={() => setToast('')} />}
    </AppLayout>
  )
}
