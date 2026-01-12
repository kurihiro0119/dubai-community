import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import { format } from 'date-fns'
import { ja } from 'date-fns/locale/ja'

export const dynamic = 'force-dynamic'

const categories = [
  { id: 'general', name: '一般', color: 'bg-gray-500' },
  { id: 'housing', name: '住居・不動産', color: 'bg-blue-500' },
  { id: 'job', name: '求人・仕事', color: 'bg-green-500' },
  { id: 'food', name: 'グルメ・レストラン', color: 'bg-orange-500' },
  { id: 'event', name: 'イベント', color: 'bg-purple-500' },
  { id: 'help', name: '質問・相談', color: 'bg-red-500' },
]

export default async function CategoryPage({
  params,
}: {
  params: { category: string }
}) {
  const category = categories.find((c) => c.id === params.category)

  if (!category) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center text-gray-500">カテゴリが見つかりません</div>
      </div>
    )
  }

  const posts = await prisma.post.findMany({
    where: {
      category: params.category,
    },
    include: {
      author: {
        select: {
          name: true,
        },
      },
      comments: {
        select: {
          id: true,
        },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  })

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <div className="flex items-center space-x-2 mb-2">
          <span
            className={`px-3 py-1 text-sm rounded ${category.color} text-white`}
          >
            {category.name}
          </span>
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          {category.name}の投稿
        </h1>
        <p className="text-gray-600">
          {posts.length}件の投稿があります
        </p>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="p-4 border-b">
          <h2 className="text-xl font-semibold">投稿一覧</h2>
        </div>
        <div className="divide-y">
          {posts.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              このカテゴリにはまだ投稿がありません。
            </div>
          ) : (
            posts.map((post) => (
              <Link
                key={post.id}
                href={`/posts/${post.id}`}
                className="block p-4 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {post.title}
                    </h3>
                    <p className="text-gray-600 text-sm line-clamp-2 mb-2">
                      {post.content}
                    </p>
                    <div className="flex items-center space-x-4 text-xs text-gray-500">
                      <span>{post.author.name}</span>
                      <span>
                        {format(new Date(post.createdAt), 'yyyy年MM月dd日', {
                          locale: ja,
                        })}
                      </span>
                      <span>💬 {post.comments.length}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
