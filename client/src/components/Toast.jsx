import { useEffect } from 'react'
import styles from './Toast.module.css'

export default function Toast({ message, onClose }) {
  useEffect(() => {
    const t = setTimeout(onClose, 3000)
    return () => clearTimeout(t)
  }, [])

  return (
    <div className={styles.toast}>
      <span className={styles.check}>✓</span>
      <span>{message}</span>
      <button className={styles.x} onClick={onClose}>✕</button>
    </div>
  )
}
