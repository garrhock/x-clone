// app/auth/callback/page.tsx
'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

export default function AuthCallback() {
  const supabase = createClient()
  const router = useRouter()

  useEffect(() => {
    const handleAuth = async () => {
      const { error } = await supabase.auth.getSession() // Will parse URL fragment
      if (error) console.error('Session error:', error)
      router.replace('/') // or wherever you want them to go after login
    }

    handleAuth()
  }, [router, supabase])

  return <p className="text-center mt-10">Logging you in...</p>
}
