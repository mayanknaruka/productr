import styles from './DeleteModal.module.css'

export default function DeleteModal({ productName, onConfirm, onClose, loading }) {
  return (
    <div className={styles.overlay} onClick={e => e.target === e.currentTarget && onClose()}>
      <div className={styles.modal}>
        <div className={styles.header}>
          <h2>Delete Product</h2>
          <button className={styles.close} onClick={onClose}>✕</button>
        </div>
        <div className={styles.body}>
          <p>
            Are you sure you really want to delete this Product{' '}
            <strong>"{productName}"</strong> ?
          </p>
        </div>
        <div className={styles.footer}>
          <button className={styles.deleteBtn} onClick={onConfirm} disabled={loading}>
            {loading ? 'Deleting...' : 'Delete'}
          </button>
        </div>
      </div>
    </div>
  )
}
