'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'

export default function CommentForm({ postId }: { postId: string }) {
  const { data: session } = useSession()
  const router = useRouter()
  const [content, setContent] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  if (!session) {
    return (
      <div className="mb-6 p-4 bg-gray-50 rounded-md text-center text-gray-600">
        コメントするにはログインが必要です
      </div>
    )
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch('/api/comments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          postId,
          content,
        }),
      })

      if (response.ok) {
        setContent('')
        router.refresh()
      } else {
        const error = await response.json()
        alert(error.error || 'コメントの投稿に失敗しました')
      }
    } catch (error) {
      console.error('Error creating comment:', error)
      alert('コメントの投稿に失敗しました')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        rows={4}
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 mb-2"
        placeholder="コメントを入力..."
        required
      />
      <button
        type="submit"
        disabled={isSubmitting}
        className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? '投稿中...' : 'コメントする'}
      </button>
    </form>
  )
}
