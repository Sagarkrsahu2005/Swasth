'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'
import { Heart } from 'lucide-react'

export default function LoginPage() {
  const router = useRouter()
  const [step, setStep] = useState<'phone' | 'otp'>('phone')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [otp, setOtp] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSendOTP = async () => {
    setLoading(true)
    setError('')

    if (!phoneNumber || phoneNumber.length < 10) {
      setError('Please enter a valid phone number')
      setLoading(false)
      return
    }

    try {
      // In production, integrate with Firebase Phone Auth
      // For demo, just proceed to OTP verification
      setTimeout(() => {
        setStep('otp')
        setLoading(false)
      }, 1000)
    } catch (err) {
      setError('Failed to send OTP')
      setLoading(false)
    }
  }

  const handleVerifyOTP = async () => {
    setLoading(true)
    setError('')

    if (!otp || otp.length < 4) {
      setError('Please enter a valid OTP')
      setLoading(false)
      return
    }

    try {
      // In production, verify OTP with Firebase and get token
      const mockToken = 'mock-jwt-token-' + Date.now()
      // Store in sessionStorage so login is required each new browser session
      sessionStorage.setItem('authToken', mockToken)
      sessionStorage.setItem('userRole', 'PUBLIC_USER')

      router.push('/')
    } catch (err) {
      setError('Invalid OTP. Please try again.')
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-surface to-background flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 font-bold text-2xl mb-4">
            <Heart className="w-8 h-8 text-primary" />
            <span>Swasth</span>
          </Link>
          <h1 className="text-3xl font-bold text-foreground mb-2">Emergency Help</h1>
          <p className="text-muted">Find hospitals and ambulances in minutes</p>
        </div>

        {/* Login Card */}
        <Card className="p-8 glass">
          {step === 'phone' ? (
            // Phone Input
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Phone Number</label>
                <Input
                  type="tel"
                  placeholder="+1 (555) 000-0000"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  disabled={loading}
                />
              </div>

              {error && <div className="p-3 bg-red-50 text-red-800 text-sm rounded-lg">{error}</div>}

              <Button onClick={handleSendOTP} disabled={loading} className="w-full">
                {loading ? 'Sending...' : 'Send OTP'}
              </Button>

              <div className="text-center text-sm text-muted">
                For testing, use any phone number
              </div>
            </div>
          ) : (
            // OTP Input
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Enter OTP</label>
                <Input
                  type="text"
                  placeholder="000000"
                  maxLength={6}
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  disabled={loading}
                />
              </div>

              {error && <div className="p-3 bg-red-50 text-red-800 text-sm rounded-lg">{error}</div>}

              <Button onClick={handleVerifyOTP} disabled={loading} className="w-full">
                {loading ? 'Verifying...' : 'Verify & Login'}
              </Button>

              <Button
                onClick={() => {
                  setStep('phone')
                  setError('')
                }}
                variant="outline"
                className="w-full"
              >
                Change Phone
              </Button>

              <div className="text-center text-sm text-muted">
                For testing, use any 4+ digit OTP
              </div>
            </div>
          )}
        </Card>

        {/* Test Credentials */}
        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg text-sm text-blue-800">
          <p className="font-medium mb-2">Test Credentials (Demo):</p>
          <ul className="space-y-1 text-xs">
            <li>• Phone: Any number (e.g., +1-555-000-0000)</li>
            <li>• OTP: Any 4+ digit code</li>
            <li>• Role: PUBLIC_USER (default)</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
