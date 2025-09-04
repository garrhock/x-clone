'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import ProfilePicture from '../../ui/avatar'
import { getProfileById } from '@/lib/supabase/queries'

interface ReplyFormProps {
  parentPostId: string // pass the postId you’re replying to
  onReply?: () => void // optional callback after posting (refresh replies)
}

export default function ReplyForm({ parentPostId, onReply }: ReplyFormProps) {
  const [content, setContent] = useState('')
  const [isPosting, setIsPosting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [files, setFiles] = useState<FileList | null>(null)
  const [user, setUser] = useState<any>(null)

  const supabase = createClient()

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
        const profile = await getProfileById(user.id)
        if (profile) setUser(profile)
      }
    }
    fetchUser()
  }, [supabase])

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setIsPosting(true)
    setError(null)
    try {
      let fileUrls: string[] = []

      if (files && files.length > 0) {
        for (let i = 0; i < files.length; i++) {
          const file = files[i]
          const path = `public/${Date.now()}-${file.name}`

          const { error: uploadError } = await supabase.storage
            .from('post-files')
            .upload(path, file)

          if (uploadError) throw uploadError

          const { data: urlData } = supabase.storage
            .from('post-files')
            .getPublicUrl(path)

          fileUrls.push(urlData.publicUrl)
        }
      }

      const { error: insertError } = await supabase
        .from('posts')
        .insert({
          text: content,
          file_urls: fileUrls,
          user_id: user.id,
          parent_post_id: parentPostId, // link reply to parent
        })

      if (insertError) throw insertError

      setContent('')
      setFiles(null)
      if (onReply) onReply()
    } catch (err: any) {
      setError(err.message || 'Failed to reply')
    } finally {
      setIsPosting(false)
    }
  }

  if (!user) return null

  return (
    <form onSubmit={handleSubmit} className="flex flex-row items-stretch w-full">
      {/* Avatar */}
      <div className="pt-[12px] basis-[40px] mr-[8px] flex flex-col">
        <ProfilePicture userId={user.id} avatarUrl={user.avatar_url} />
      </div>

      {/* Text & Toolbar */}
      <div className="flex flex-row pt-[4px] justify-center basis-0 flex-grow static">
        <textarea
          name="content"
          value={content}
          onChange={e => setContent(e.target.value)}
          placeholder="Post your reply"
          className="placeholder-muted ml-[2px] py-[12px] w-full text-[20px] font-normal bg-transparent border-none outline-none resize-none"
          rows={1}
          required
          disabled={isPosting}
        />
        <div className="sticky bottom-[-1px] pb-[8px] top-0 flex flex-row">
          <div className="justify-between items-center flex flex-row w-full">
            <div className="mt-[8px] items-center flex flex-row">
              <button
                type="submit"
                className="bg-foreground min-h-[36px] min-w-[36px] ml-[12px] px-[16px] rounded-full"
                disabled={isPosting || !content.trim()}
              >
                <span className="text-background text-[15px] font-bold">
                  {isPosting ? 'Posting…' : 'Reply'}
                </span>
              </button>
            </div>
          </div>
        </div>
        {error && <div className="text-red-500 mt-2">{error}</div>}
      </div>
    </form>
  )
}
