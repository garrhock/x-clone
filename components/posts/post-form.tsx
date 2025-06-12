'use client'

import { useState } from 'react'
import { postTweet } from './actions'

export default function PostForm() {
  const [content, setContent] = useState('')

  return (
    <form action={postTweet}>
      <textarea
        name="content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="What's happening?"
        required
      />
      <button type="submit">Tweet</button>
    </form>
  )
}
