'use client'

import { useState, useEffect } from 'react'
import { post } from './actions'
import { createClient } from '@/lib/supabase/client'
import PostingToolBar from '@/components/posts/toolbars/posting-toolbar';
import ProfilePicture from '../ui/avatar';
import { getProfileById } from '@/lib/supabase/queries';

export default function PostForm() {
  const [content, setContent] = useState('')
  const [isPosting, setIsPosting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [files, setFiles] = useState<FileList | null>(null)
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    const fetchUser = async () => {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
        const profile = await getProfileById(user.id)
        if (profile) setUser(profile)
      }
    }
    fetchUser()
  }, [])

  const supabase = createClient()

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setIsPosting(true)
    setError(null)
    try {
      let fileUrls: string[] = []
      if (files && files.length > 0) {
        for (let i = 0; i < files.length; i++) {
          const file = files[i]
          const { data, error } = await supabase.storage
            .from('post-files')
            .upload(`public/${Date.now()}-${file.name}`, file)
          if (error) throw error
          const { data: urlData } = supabase.storage
            .from('post-files')
            .getPublicUrl(`public/${Date.now()}-${file.name}`)
          fileUrls.push(urlData.publicUrl)
        }
      }
      const formData = new FormData()
      formData.append('content', content)
      fileUrls.forEach(url => formData.append('file_urls[]', url))
      await post(formData)
      setContent('')
      setFiles(null)
    } catch (err: any) {
      setError(err.message || 'Failed to post')
    } finally {
      setIsPosting(false)
    }
  }

  if (!user) {
    return null // or a loading spinner
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-row items-stretch w-full">
      {/* Avatar */}
      <div className="pt-[12px] basis-[40px] mr-[8px] flex flex-col">
        <ProfilePicture userId={user.id} avatarUrl={user.avatar_url} />
      </div>
      {/* Text & Toolbar */}
      <div className="flex flex-col pt-[4px] justify-center basis-0 flex-grow static">
        <textarea
          name="content"
          value={content}
          onChange={e => setContent(e.target.value)}
          placeholder="What's happening?"
          className="placeholder-muted ml-[2px] py-[12px] w-full text-[20px] font-normal bg-transparent border-none outline-none resize-none"
          rows={1}
          required
          disabled={isPosting}
        />
        <div className="sticky bottom-[-1px] pb-[8px] top-0 flex flex-col">
          <div className="justify-between items-center flex flex-row w-full">
            {/* Toolbar */}
            <PostingToolBar/>
            {/* Post Button */}
            <div className="mt-[8px] items-center flex flex-row">
              <button
                type="submit"
                className="bg-foreground min-h-[36px] min-w-[36px] ml-[12px] px-[16px] rounded-full"
                disabled={isPosting || !content.trim()}
              >
                <div className="text-[15px] wrap-break-word text-center font-bold items-center flex flex-row justify-center flex-grow">
                  <span className="text-background text-[15px] wrap-break-word max-w-full min-w-0 overflow-ellipsis overflow-hidden ">
                    {isPosting ? 'Posting...' : 'Post'}
                  </span>
                </div>
              </button>
            </div>
          </div>
        </div>
        {error && <div className="text-red-500 mt-2">{error}</div>}
      </div>
    </form>
  )
}
