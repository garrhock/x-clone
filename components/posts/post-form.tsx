'use client'

import { postTweet } from './actions'

export default function PostForm() {
  return (
    <form action={postTweet}>
      <textarea
        name="content"
        placeholder="What's happening?"
        required
      />
      <button type="submit">
        Tweet
      </button>
    </form>
  )
}
