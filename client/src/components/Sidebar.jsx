import { NavLink } from 'react-router-dom'
import styles from './Sidebar.module.css'

export default function Sidebar() {
  return (
    <aside className={styles.sidebar}>
      <div className={styles.brand}>
        <span className={styles.logo}>Productr</span>
        <span className={styles.logoIcon}>🔗</span>
      </div>
      <div className={styles.search}>
        <span className={styles.searchIcon}>🔍</span>
        <input type="text" placeholder="Search" />
      </div>
      <nav className={styles.nav}>
        <NavLink to="/" end className={({ isActive }) => `${styles.link} ${isActive ? styles.active : ''}`}>
          <span className={styles.icon}>🏠</span> Home
        </NavLink>
        <NavLink to="/products" className={({ isActive }) => `${styles.link} ${isActive ? styles.active : ''}`}>
          <span className={styles.icon}>🛍</span> Products
        </NavLink>
      </nav>
    </aside>
  )
}
