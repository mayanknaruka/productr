import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import AuthLayout from '../components/AuthLayout'
import styles from './Auth.module.css'
import api from '../api/axios'

export default function Login() {
  const [contact, setContact] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [demoOtp, setDemoOtp] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!contact.trim()) { setError('Please enter your email or phone number.'); return }
    setError('')
    setDemoOtp('')
    setLoading(true)
    try {
      const res = await api.post('/auth/send-otp', { contact: contact.trim() })
      // Show OTP on screen for demo (when email is not configured)
      if (res.data.demo_otp) {
        setDemoOtp(res.data.demo_otp)
      }
      navigate('/otp', { state: { contact: contact.trim(), demoOtp: res.data.demo_otp } })
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to send OTP. Try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthLayout>
      <div className={styles.formWrap}>
        <h2 className={styles.title}>Login to your Productr Account</h2>

        <form onSubmit={handleSubmit} noValidate>
          <div className={styles.field}>
            <label className={styles.label}>Email or Phone number</label>
            <input
              type="text"
              placeholder="Enter email or phone number"
              value={contact}
              onChange={e => { setContact(e.target.value); setError('') }}
              className={`${styles.input} ${error ? styles.inputErr : ''}`}
              autoFocus
            />
            {error && <span className={styles.errMsg}>{error}</span>}
          </div>

          {demoOtp && (
            <div className={styles.demoBox}>
              Demo OTP: <strong>{demoOtp}</strong>
            </div>
          )}

          <button type="submit" className={styles.btn} disabled={loading}>
            {loading ? 'Sending OTP...' : 'Login'}
          </button>
        </form>
      </div>

      <div className={styles.signupBox}>
        <p className={styles.signupGray}>Don't have a Productr Account?</p>
        <Link to="/register" className={styles.signupLink}>SignUp Here</Link>
      </div>
    </AuthLayout>
  )
}
