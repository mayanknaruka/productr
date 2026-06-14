import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import styles from './TopBar.module.css'

export default function TopBar({ title, showSearch }) {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <header className={styles.topbar}>
      <div className={styles.left}>
        {title && (
          <span className={styles.title}>{title}</span>
        )}
        {showSearch && (
          <div className={styles.search}>
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
              <circle cx="5.5" cy="5.5" r="4.5" stroke="#aaa" strokeWidth="1.5"/>
              <path d="M9 9L12 12" stroke="#aaa" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
            <input type="text" placeholder="Search Services, Products" />
          </div>
        )}
      </div>

      <div className={styles.right}>
        <div className={styles.avatarWrap} onClick={() => setOpen(o => !o)}>
          <div className={styles.avatarCircle}>
            {(user?.name || user?.contact || 'U')[0].toUpperCase()}
          </div>
          <span className={styles.chevron}>▾</span>

          {open && (
            <div className={styles.dropdown}>
              <p className={styles.dropName}>{user?.name || user?.contact}</p>
              <button onClick={handleLogout} className={styles.dropLogout}>Logout</button>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
