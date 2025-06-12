'use server'

import { createClient } from '@/lib/supabase/server'

export async function postTweet(formData: FormData) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) throw new Error('Not logged in')

  const content = formData.get('content') as string

  const { error } = await supabase.from('tweets').insert({
    user_id: user.id,
    content,
    created_at: new Date().toISOString()
  })

  if (error) throw new Error(error.message)
}
