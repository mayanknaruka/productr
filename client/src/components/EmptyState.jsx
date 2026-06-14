import styles from './EmptyState.module.css'

export default function EmptyState({ title, subtitle, action, onAction }) {
  return (
    <div className={styles.wrap}>
      <svg width="54" height="54" viewBox="0 0 54 54" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="1.5" y="1.5" width="21" height="21" rx="4" stroke="#1a237e" strokeWidth="2.5"/>
        <rect x="31.5" y="1.5" width="21" height="21" rx="4" stroke="#1a237e" strokeWidth="2.5"/>
        <rect x="1.5" y="31.5" width="21" height="21" rx="4" stroke="#1a237e" strokeWidth="2.5"/>
        <line x1="42" y1="34" x2="42" y2="50" stroke="#1a237e" strokeWidth="2.5" strokeLinecap="round"/>
        <line x1="34" y1="42" x2="50" y2="42" stroke="#1a237e" strokeWidth="2.5" strokeLinecap="round"/>
      </svg>

      <h3 className={styles.title}>{title}</h3>

      {subtitle && subtitle.split('\n').map((line, i) => (
        <p key={i} className={styles.sub}>{line}</p>
      ))}

      {action && (
        <button className={styles.btn} onClick={onAction}>{action}</button>
      )}
    </div>
  )
}
