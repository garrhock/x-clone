'use server'

import { createClient } from '@/lib/supabase/server'

export async function post(formData: FormData) {
  const supabase = await createClient()
  const content = formData.get('content') as string
  const fileUrls = formData.getAll('file_urls[]') as string[]

  const { data: { user } } = await supabase.auth.getUser()

  if (!user) throw new Error('Not logged in')

  const { error } = await supabase
    .from('posts')
    .insert({
      user_id: user.id,
      text: content,
      file_urls: fileUrls,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    })

  if (error) throw new Error(error.message)
}