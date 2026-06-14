import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import AuthLayout from '../components/AuthLayout'
import styles from './Auth.module.css'
import api from '../api/axios'

export default function Register() {
  const [form, setForm] = useState({ name: '', contact: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.name.trim() || !form.contact.trim()) { setError('All fields are required.'); return }
    setError('')
    setLoading(true)
    try {
      await api.post('/auth/register', form)
      navigate('/otp', { state: { contact: form.contact.trim() } })
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthLayout>
      <div className={styles.formWrap}>
        <h2 className={styles.title}>Create your Productr Account</h2>

        <form onSubmit={handleSubmit} noValidate>
          <div className={styles.field}>
            <label className={styles.label}>Full Name</label>
            <input
              type="text"
              placeholder="Enter your name"
              value={form.name}
              onChange={e => setForm({ ...form, name: e.target.value })}
              className={styles.input}
            />
          </div>
          <div className={styles.field}>
            <label className={styles.label}>Email or Phone number</label>
            <input
              type="text"
              placeholder="Enter email or phone number"
              value={form.contact}
              onChange={e => setForm({ ...form, contact: e.target.value })}
              className={`${styles.input} ${error ? styles.inputErr : ''}`}
            />
            {error && <p className={styles.errMsg}>{error}</p>}
          </div>
          <button type="submit" className={styles.btn} disabled={loading}>
            {loading ? 'Creating Account...' : 'Sign Up'}
          </button>
        </form>
      </div>

      <div className={styles.signupBox}>
        <p className={styles.signupGray}>Already have a Productr Account?</p>
        <Link to="/login" className={styles.signupLink}>Login Here</Link>
      </div>
    </AuthLayout>
  )
}
