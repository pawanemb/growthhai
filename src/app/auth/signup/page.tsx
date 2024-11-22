'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { FcGoogle } from 'react-icons/fc'
import { FaLinkedin } from 'react-icons/fa'
import { toast } from 'react-hot-toast'
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'
import styles from './signup.module.css'

export default function Signup() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [fullName, setFullName] = useState('')
  const [companyName, setCompanyName] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [acceptTerms, setAcceptTerms] = useState(false)
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const supabase = createClientComponentClient()

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    if (!acceptTerms) {
      toast.error('Please accept the terms of service')
      setLoading(false)
      return
    }

    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
            company_name: companyName,
          },
        },
      })

      if (error) throw error

      router.push('/auth/verify-email')
      toast.success('Please check your email to verify your account')
    } catch (error: any) {
      toast.error(error.message || 'Failed to sign up')
    } finally {
      setLoading(false)
    }
  }

  const handleSocialSignup = async (provider: 'google' | 'linkedin') => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      })

      if (error) throw error
    } catch (error: any) {
      toast.error(error.message || `Failed to sign up with ${provider}`)
    }
  }

  return (
    <div className={styles['signup-container']}>
      <div className={styles['signup-card']}>
        <div className={styles['signup-header']}>
          <h1>Create an account</h1>
          <p>Get started with Growthh.ai</p>
        </div>

        <form onSubmit={handleSignup} className={styles['signup-form']}>
          <div className={styles['form-group']}>
            <label htmlFor="fullName">Full name</label>
            <input
              id="fullName"
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Enter your full name"
              required
            />
          </div>

          <div className={styles['form-group']}>
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>

          <div className={styles['form-group']}>
            <label htmlFor="companyName">Company name</label>
            <input
              id="companyName"
              type="text"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              placeholder="Enter your company name"
              required
            />
          </div>

          <div className={styles['form-group']}>
            <label htmlFor="password">Password</label>
            <div className={styles['password-input-wrapper']}>
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Create a password"
                required
              />
              <button
                type="button"
                className={styles['password-toggle']}
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <AiOutlineEyeInvisible size={18} /> : <AiOutlineEye size={18} />}
              </button>
            </div>
          </div>

          <div className={styles['terms-checkbox']}>
            <input
              type="checkbox"
              id="terms"
              checked={acceptTerms}
              onChange={(e) => setAcceptTerms(e.target.checked)}
            />
            <label htmlFor="terms">
              I agree to the{' '}
              <Link href="/terms" target="_blank">
                Terms of Service
              </Link>{' '}
              and{' '}
              <Link href="/privacy" target="_blank">
                Privacy Policy
              </Link>
            </label>
          </div>

          <button type="submit" className={styles['signup-button']} disabled={loading}>
            {loading ? 'Creating account...' : 'Create account'}
          </button>
        </form>

        <div className={styles.divider}>
          <div className={styles['divider-text']}>
            <span>Or continue with</span>
          </div>
        </div>

        <div className={styles['social-buttons']}>
          <button
            type="button"
            className={styles['social-button']}
            onClick={() => handleSocialSignup('google')}
          >
            <FcGoogle />
            Google
          </button>
          <button
            type="button"
            className={styles['social-button']}
            onClick={() => handleSocialSignup('linkedin')}
          >
            <FaLinkedin className="text-[#0A66C2]" />
            LinkedIn
          </button>
        </div>

        <p className={styles['login-prompt']}>
          Already have an account?{' '}
          <Link href="/auth/login" className={styles['login-link']}>
            Sign in
          </Link>
        </p>
      </div>
    </div>
  )
}
