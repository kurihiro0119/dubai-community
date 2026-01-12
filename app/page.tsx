import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import { format } from 'date-fns'
import { ja } from 'date-fns/locale/ja'

const categories = [
  { id: 'general', name: '一般', color: 'bg-gray-500' },
  { id: 'housing', name: '住居・不動産', color: 'bg-blue-500' },
  { id: 'job', name: '求人・仕事', color: 'bg-green-500' },
  { id: 'food', name: 'グルメ・レストラン', color: 'bg-orange-500' },
  { id: 'event', name: 'イベント', color: 'bg-purple-500' },
  { id: 'help', name: '質問・相談', color: 'bg-red-500' },
]

export default async function Home() {
  const posts = await prisma.post.findMany({
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
    take: 20,
  })

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          ドバイ日本人コミュニティ掲示板
        </h1>
        <p className="text-gray-600">
          ドバイ在住の日本人同士で情報交換・交流をしましょう
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="md:col-span-1">
          <div className="bg-white rounded-lg shadow p-4">
            <h2 className="text-lg font-semibold mb-4">カテゴリ</h2>
            <ul className="space-y-2">
              {categories.map((category) => (
                <li key={category.id}>
                  <Link
                    href={`/category/${category.id}`}
                    className="flex items-center space-x-2 text-gray-700 hover:text-primary-600"
                  >
                    <span
                      className={`w-3 h-3 rounded-full ${category.color}`}
                    />
                    <span>{category.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="md:col-span-3">
          <div className="bg-white rounded-lg shadow">
            <div className="p-4 border-b">
              <h2 className="text-xl font-semibold">最新の投稿</h2>
            </div>
            <div className="divide-y">
              {posts.length === 0 ? (
                <div className="p-8 text-center text-gray-500">
                  まだ投稿がありません。最初の投稿をしてみましょう！
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
                        <div className="flex items-center space-x-2 mb-2">
                          <span
                            className={`px-2 py-1 text-xs rounded ${
                              categories.find((c) => c.id === post.category)
                                ?.color || 'bg-gray-500'
                            } text-white`}
                          >
                            {
                              categories.find((c) => c.id === post.category)
                                ?.name
                            }
                          </span>
                          <h3 className="text-lg font-semibold text-gray-900">
                            {post.title}
                          </h3>
                        </div>
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
      </div>
    </div>
  )
}
