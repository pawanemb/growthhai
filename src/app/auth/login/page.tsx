'use client'

import { useState } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/navigation'
import { toast } from 'react-hot-toast'
import Link from 'next/link'
import Image from 'next/image'
import AuthButtons from '@/components/auth/AuthButtons'
import './login.css'

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  const router = useRouter()
  const supabase = createClientComponentClient()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) {
        throw error
      }

      toast.success('Logged in successfully')
      router.push('/dashboard')
      router.refresh()
    } catch (error: any) {
      toast.error(error.message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="login">
      <h1 className="welcome-back">Welcome Back .!</h1>
      <div className="skip-the-lag-wrapper">
        <h1 className="skip-the-lag">Skip the lag ?</h1>
      </div>
      <div className="div"></div>
      <div className="thank-you-for-your-patience-pl"></div>
      
      <div className="wrapper">
        <div className="div1">
          <div className="table">
            <div className="upper-section">
              <div className="login-text">
                <h1 className="login1">Login</h1>
                <div className="glad-youre-back">Glad you're back.!</div>
              </div>
              
              <form onSubmit={handleSubmit} className="credentials">
                <div className="username">
                  <input
                    className="username1"
                    placeholder="Username"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                
                <div className="password-rem">
                  <div className="password">
                    <input
                      className="password1"
                      placeholder="Password"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="closed-eye-icon"
                    >
                      {showPassword ? (
                        <Image
                          src="/closed-eye.svg"
                          alt="Hide password"
                          width={18}
                          height={18}
                        />
                      ) : (
                        <Image
                          src="/closed-eye.svg"
                          alt="Show password"
                          width={18}
                          height={18}
                        />
                      )}
                    </button>
                  </div>
                  
                  <div className="remember">
                    <input
                      className="fluentcheckbox-checked-16-fil"
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                    />
                    <div className="remember-me">Remember me</div>
                  </div>
                </div>
                
                <div className="login-bt-fp">
                  <button type="submit" className="login2" disabled={isLoading}>
                    <div className="login3">{isLoading ? 'Signing in...' : 'Login'}</div>
                  </button>
                  <Link href="/auth/reset-password" className="forgot-password">
                    Forgot password ?
                  </Link>
                </div>
              </form>
            </div>
            
            <div className="other-logins">
              <div className="or">
                <div className="div2"></div>
                <div className="or1">Or</div>
                <div className="or-child"></div>
              </div>
              <div className="div3">
                <AuthButtons />
              </div>
            </div>
          </div>
          
          <div className="dont-have-an-account-signup-parent">
            <Link href="/auth/signup" className="dont-have-an">
              Don't have an account ? Signup
            </Link>
            <div className="customer-care">
              <div className="div4">
                <Link href="/terms" className="terms-conditions">
                  Terms & Conditions
                </Link>
              </div>
              <div className="support-options">
                <Link href="/support" className="support">
                  Support
                </Link>
              </div>
              <div className="customer-care-wrapper">
                <div className="customer-care1">Customer Care</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="login-child"></div>
    </div>
  )
}
