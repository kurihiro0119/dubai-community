import { format } from 'date-fns'
import { ja } from 'date-fns/locale/ja'

interface Comment {
  id: string
  content: string
  author: {
    name: string
  }
  createdAt: Date
}

export default function CommentList({ comments }: { comments: Comment[] }) {
  if (comments.length === 0) {
    return (
      <div className="text-center text-gray-500 py-8">
        まだコメントがありません。最初のコメントをしてみましょう！
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {comments.map((comment) => (
        <div key={comment.id} className="border-b border-gray-200 pb-4">
          <div className="flex items-center space-x-2 mb-2">
            <span className="font-semibold text-gray-900">
              {comment.author.name}
            </span>
            <span className="text-sm text-gray-500">
              {format(new Date(comment.createdAt), 'yyyy年MM月dd日 HH:mm', {
                locale: ja,
              })}
            </span>
          </div>
          <p className="text-gray-700 whitespace-pre-wrap">{comment.content}</p>
        </div>
      ))}
    </div>
  )
}
