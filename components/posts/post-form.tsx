'use client'

import { useState } from 'react'
import { post } from './actions'
import { MdPhoto } from "react-icons/md";
import { AiOutlineGif } from "react-icons/ai";
import { BiPoll } from "react-icons/bi";
import { HiOutlineEmojiHappy } from "react-icons/hi";
import { RiCalendarScheduleLine } from "react-icons/ri";
import { createClient } from '@/lib/supabase/client'
const TOOLBAR_ITEMS = [
  { title: 'Media', icon: MdPhoto },
  { title: 'GIF', icon: AiOutlineGif  },
  { title: 'Poll', icon: BiPoll },
  { title: 'Emoji', icon: HiOutlineEmojiHappy },
  { title: 'Schedule', icon: RiCalendarScheduleLine },
];

export default function PostForm() {
  const [content, setContent] = useState('')
  const [isPosting, setIsPosting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [files, setFiles] = useState<FileList | null>(null)

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

  return (
    <form onSubmit={handleSubmit} className="flex flex-row items-stretch w-full">
      {/* Avatar */}
      <div className="pt-[12px] basis-[40px] mr-[8px] flex flex-col">
        <div className="relative h-[40px] w-[40px]">
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full">
            <img
              src="https://pbs.twimg.com/profile_images/1880129627672219648/alLHN898_normal.jpg"
              alt="User avatar"
              className="w-full h-full rounded-full object-cover"
            />
          </div>
        </div>
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
        <input
          type="file"
          accept="image/*,video/*"
          multiple
          onChange={e => setFiles(e.target.files)}
          className="my-2"
        />
        <div className="sticky bottom-[-1px] pb-[8px] top-0 flex flex-col">
          <div className="justify-between items-center flex flex-row w-full">
            {/* Toolbar */}
            <nav className="mt-[8px] ml-[-8px] flex-1 items-center flex flex-row">
              <div className="basis-0 h-full items-center flex flex-row grow">
                <div className="overflow-hidden shrink-1 grow-1 h-full block items-stretch">
                  <div className="scroll-px-[36px] flex-nowrap overflow-x-auto overflow-y-hidden h-full flex flex-row flex-grow p-[2px] items-stretch">
                    {TOOLBAR_ITEMS.map((item) => (
                      <div key={item.title} className="justify-center items-stretch flex flex-col">
                        <button type="button" className="cursor-pointer min-h-[36px] min-w-[36px] rounded-full ">
                          <div className="text-highlight text-[15px] font-bold wrap-break-word text-center min-w-0 flex flex-row justify-center flex-grow">
                            <item.icon className="relative h-[20px] align-bottom max-w-[100%] w-[20px] inline-block" />
                          </div>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </nav>
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
