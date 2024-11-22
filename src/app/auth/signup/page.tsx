'use client'

import { useState } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/navigation'
import { toast } from 'react-hot-toast'
import Link from 'next/link'
import Image from 'next/image'
import AuthButtons from '@/components/auth/AuthButtons'
import './signup.css'

export default function SignupPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [fullName, setFullName] = useState('')
  const [companyName, setCompanyName] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [acceptTerms, setAcceptTerms] = useState(false)
  const router = useRouter()
  const supabase = createClientComponentClient()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)

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

      if (error) {
        throw error
      }

      toast.success('Check your email to confirm your account')
      router.push('/auth/login')
      router.refresh()
    } catch (error: any) {
      toast.error(error.message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="signup">
      <h1 className="welcome-text">Welcome to Growthh.ai</h1>
      <div className="skip-the-lag-wrapper">
        <h1 className="skip-the-lag">Skip the lag ?</h1>
      </div>
      <div className="circle-bg"></div>
      <div className="circle-bg-2"></div>
      
      <div className="wrapper">
        <div className="content">
          <div className="form-section">
            <div className="signup-text">
              <h1 className="signup-heading">Sign Up</h1>
              <div className="welcome-back">Start your journey with us!</div>
            </div>
            
            <form onSubmit={handleSubmit} className="signup-form">
              <div className="input-field">
                <input
                  className="input"
                  placeholder="Full Name"
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                />
              </div>

              <div className="input-field">
                <input
                  className="input"
                  placeholder="Company Name"
                  type="text"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  required
                />
              </div>
              
              <div className="input-field">
                <input
                  className="input"
                  placeholder="Email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              
              <div className="password-field">
                <input
                  className="input"
                  placeholder="Password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="eye-icon"
                >
                  <Image
                    src="/closed-eye.svg"
                    alt={showPassword ? "Hide password" : "Show password"}
                    width={18}
                    height={18}
                  />
                </button>
              </div>

              <div className="terms">
                <input
                  type="checkbox"
                  checked={acceptTerms}
                  onChange={(e) => setAcceptTerms(e.target.checked)}
                  required
                />
                <span>I accept the Terms & Conditions</span>
              </div>
              
              <div className="signup-button-section">
                <button type="submit" className="signup-button" disabled={isLoading || !acceptTerms}>
                  <span>{isLoading ? 'Creating account...' : 'Sign Up'}</span>
                </button>
              </div>
            </form>

            <div className="other-signup">
              <div className="divider">
                <div className="line"></div>
                <span>Or</span>
                <div className="line"></div>
              </div>
              <div className="social-buttons">
                <AuthButtons />
              </div>
            </div>
          </div>
          
          <div className="footer">
            <div className="login-link">
              <Link href="/auth/login">
                Already have an account? Login
              </Link>
            </div>
            <div className="links">
              <div className="link-group">
                <Link href="/terms">Terms & Conditions</Link>
              </div>
              <div className="link-group">
                <Link href="/support">Support</Link>
              </div>
              <div className="link-group">
                <span>Customer Care</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
