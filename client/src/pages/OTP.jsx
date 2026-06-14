import { useState, useRef, useEffect } from 'react'
import { useNavigate, useLocation, Link } from 'react-router-dom'
import AuthLayout from '../components/AuthLayout'
import styles from './Auth.module.css'
import api from '../api/axios'
import { useAuth } from '../context/AuthContext'

export default function OTP() {
  const [otp, setOtp] = useState(['', '', '', '', '', ''])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [resendTimer, setResendTimer] = useState(20)
  const [canResend, setCanResend] = useState(false)
  const inputs = useRef([])
  const navigate = useNavigate()
  const location = useLocation()
  const { login } = useAuth()
  const contact = location.state?.contact || ''
  const demoOtp = location.state?.demoOtp || ''

  useEffect(() => {
    if (!contact) navigate('/login')
    // Auto-fill OTP if demo mode
    if (demoOtp) {
      setOtp(demoOtp.split(''))
    }
    inputs.current[0]?.focus()
  }, [])

  useEffect(() => {
    if (resendTimer <= 0) { setCanResend(true); return }
    const t = setTimeout(() => setResendTimer(r => r - 1), 1000)
    return () => clearTimeout(t)
  }, [resendTimer])

  const handleChange = (i, val) => {
    if (!/^\d?$/.test(val)) return
    const next = [...otp]
    next[i] = val
    setOtp(next)
    setError('')
    if (val && i < 5) inputs.current[i + 1]?.focus()
  }

  const handleKeyDown = (i, e) => {
    if (e.key === 'Backspace' && !otp[i] && i > 0) {
      inputs.current[i - 1]?.focus()
    }
  }

  const handlePaste = (e) => {
    const paste = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6)
    if (paste.length === 6) {
      setOtp(paste.split(''))
      inputs.current[5]?.focus()
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const code = otp.join('')
    if (code.length < 6) { setError('Please enter a valid OTP'); return }
    setLoading(true)
    setError('')
    try {
      const res = await api.post('/auth/verify-otp', { contact, otp: code })
      login(res.data.user)
      navigate('/')
    } catch (err) {
      setError('Please enter a valid OTP')
    } finally {
      setLoading(false)
    }
  }

  const handleResend = async () => {
    if (!canResend) return
    setCanResend(false)
    setResendTimer(20)
    setOtp(['', '', '', '', '', ''])
    setError('')
    await api.post('/auth/send-otp', { contact })
    inputs.current[0]?.focus()
  }

  const hasError = !!error

  return (
    <AuthLayout>
      <div className={styles.formWrap}>
        <h2 className={styles.title}>Login to your Productr Account</h2>

        <form onSubmit={handleSubmit} noValidate>
          <div className={styles.field}>
            <label className={styles.label}>Enter OTP</label>
            {demoOtp && (
              <div className={styles.demoBox}>
                Your OTP: <strong>{demoOtp}</strong>
              </div>
            )}
            <div className={styles.otpRow} onPaste={handlePaste}>
              {otp.map((digit, i) => (
                <input
                  key={i}
                  ref={el => inputs.current[i] = el}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={e => handleChange(i, e.target.value)}
                  onKeyDown={e => handleKeyDown(i, e)}
                  className={`${styles.otpBox} ${hasError ? styles.otpBoxErr : ''}`}
                />
              ))}
            </div>
            {error && <p className={styles.errMsg}>{error}</p>}
          </div>

          <button type="submit" className={styles.btn} disabled={loading}>
            {loading ? 'Verifying...' : 'Enter your OTP'}
          </button>

          <p className={styles.resendRow}>
            Didnt recive OTP ?{' '}
            {canResend
              ? <button type="button" className={styles.resendLink} onClick={handleResend}>Resend</button>
              : <span className={styles.resendTimer}>Resend in {resendTimer}s</span>
            }
          </p>
        </form>
      </div>

      <div className={styles.signupBox}>
        <p className={styles.signupGray}>Don't have a Productr Account?</p>
        <Link to="/register" className={styles.signupLink}>SignUp Here</Link>
      </div>
    </AuthLayout>
  )
}
