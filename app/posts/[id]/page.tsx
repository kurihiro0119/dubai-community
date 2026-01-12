import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'
import { format } from 'date-fns'
import { ja } from 'date-fns/locale/ja'
import CommentForm from '@/components/CommentForm'
import CommentList from '@/components/CommentList'

const categories = [
  { id: 'general', name: '一般', color: 'bg-gray-500' },
  { id: 'housing', name: '住居・不動産', color: 'bg-blue-500' },
  { id: 'job', name: '求人・仕事', color: 'bg-green-500' },
  { id: 'food', name: 'グルメ・レストラン', color: 'bg-orange-500' },
  { id: 'event', name: 'イベント', color: 'bg-purple-500' },
  { id: 'help', name: '質問・相談', color: 'bg-red-500' },
]

export default async function PostPage({
  params,
}: {
  params: { id: string }
}) {
  const post = await prisma.post.findUnique({
    where: { id: params.id },
    include: {
      author: {
        select: {
          name: true,
        },
      },
      comments: {
        include: {
          author: {
            select: {
              name: true,
            },
          },
        },
        orderBy: {
          createdAt: 'asc',
        },
      },
    },
  })

  if (!post) {
    notFound()
  }

  const category = categories.find((c) => c.id === post.category)

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <article className="bg-white rounded-lg shadow mb-6">
        <div className="p-6">
          <div className="flex items-center space-x-2 mb-4">
            <span
              className={`px-3 py-1 text-sm rounded ${
                category?.color || 'bg-gray-500'
              } text-white`}
            >
              {category?.name}
            </span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            {post.title}
          </h1>
          <div className="flex items-center space-x-4 text-sm text-gray-500 mb-6">
            <span>{post.author.name}</span>
            <span>
              {format(new Date(post.createdAt), 'yyyy年MM月dd日 HH:mm', {
                locale: ja,
              })}
            </span>
          </div>
          <div className="prose max-w-none">
            <p className="text-gray-700 whitespace-pre-wrap">{post.content}</p>
          </div>
        </div>
      </article>

      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">
          コメント ({post.comments.length})
        </h2>
        <CommentForm postId={post.id} />
        <CommentList comments={post.comments} />
      </div>
    </div>
  )
}
