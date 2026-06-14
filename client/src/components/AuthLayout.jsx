import styles from './AuthLayout.module.css'

export default function AuthLayout({ children }) {
  return (
    <div className={styles.page}>
      <div className={styles.card}>

        {/* Left Panel — wavy background + floating card */}
        <div className={styles.left}>
          <div className={styles.brandTop}>
            <span className={styles.logoText}>Productr</span>
            <span className={styles.logoEmoji}>🔗</span>
          </div>

          <div className={styles.floatingCard}>
            <img
              src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500&q=85"
              alt="Runner"
              className={styles.runnerImg}
            />
            <p className={styles.floatingText}>
              Uplist your<br />product to market
            </p>
          </div>
        </div>

        {/* Right Panel */}
        <div className={styles.right}>
          {children}
        </div>

      </div>
    </div>
  )
}
