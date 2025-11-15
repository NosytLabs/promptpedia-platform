"use client"

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { MessageSquare, Plus, TrendingUp, User, ArrowRight } from "lucide-react"

interface ForumPost {
  id: string
  title: string
  content: string
  category: string
  viewCount: number
  replyCount: number
  likeCount: number
  createdAt: string
  user: {
    name: string
    image?: string
  }
}

export default function ForumPage() {
  const { data: session } = useSession()
  const [posts, setPosts] = useState<ForumPost[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")

  const categories = [
    { id: "all", name: "All Topics" },
    { id: "techniques", name: "Techniques" },
    { id: "prompts", name: "Prompts" },
    { id: "ai-models", name: "AI Models" },
    { id: "showcases", name: "Showcases" },
    { id: "help", name: "Help & Support" },
  ]

  useEffect(() => {
    fetchPosts()
  }, [selectedCategory, searchQuery])

  const fetchPosts = async () => {
    try {
      setLoading(true)
      const params = new URLSearchParams()
      if (selectedCategory !== "all") params.append("category", selectedCategory)
      if (searchQuery) params.append("search", searchQuery)

      const response = await fetch(`/api/forum/posts?${params.toString()}`)
      if (response.ok) {
        const data = await response.json()
        setPosts(data)
      }
    } catch (error) {
      console.error("Failed to fetch posts:", error)
    } finally {
      setLoading(false)
    }
  }

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900">Community Forum</h1>
            <p className="text-gray-600 mt-2">
              Share ideas, ask questions, and learn from the community
            </p>
          </div>
          {session && (
            <Link href="/forum/create">
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                New Discussion
              </Button>
            </Link>
          )}
        </div>

        {/* Search and Filter */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="space-y-4">
            <Input
              type="text"
              placeholder="Search discussions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full"
            />
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    selectedCategory === category.id
                      ? "bg-blue-600 text-white"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Hot Discussions */}
        <div className="mb-12">
          <div className="flex items-center mb-6">
            <TrendingUp className="w-5 h-5 text-orange-600 mr-2" />
            <h2 className="text-2xl font-bold text-gray-900">Trending Now</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
                <div className="flex items-start justify-between mb-4">
                  <div className="bg-blue-100 text-blue-800 text-xs font-semibold px-3 py-1 rounded-full">
                    Popular
                  </div>
                  <MessageSquare className="w-5 h-5 text-gray-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Best practices for prompt chaining in production
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  Discussing effective strategies for implementing prompt chaining...
                </p>
                <div className="flex items-center justify-between pt-4 border-t">
                  <div className="flex items-center space-x-4 text-xs text-gray-500">
                    <span>42 replies</span>
                    <span>1.2k views</span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-blue-600" />
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Forum Posts List */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Latest Discussions</h2>
          {loading ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
          ) : posts.length === 0 ? (
            <Card className="p-12 text-center">
              <MessageSquare className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No discussions found
              </h3>
              <p className="text-gray-600 mb-6">
                Be the first to start a discussion in this category!
              </p>
              {session && (
                <Link href="/forum/create">
                  <Button>Start Discussion</Button>
                </Link>
              )}
            </Card>
          ) : (
            <div className="space-y-4">
              {posts.map((post) => (
                <Link key={post.id} href={`/forum/${post.id}`}>
                  <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
                    <div className="flex items-start space-x-4">
                      {post.user.image && (
                        <img
                          src={post.user.image}
                          alt={post.user.name}
                          className="w-10 h-10 rounded-full"
                        />
                      )}
                      {!post.user.image && (
                        <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center">
                          <User className="w-6 h-6 text-gray-600" />
                        </div>
                      )}

                      <div className="flex-grow min-w-0">
                        <div className="flex items-center space-x-2 mb-2">
                          <h3 className="text-lg font-semibold text-gray-900 truncate">
                            {post.title}
                          </h3>
                          <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2 py-1 rounded whitespace-nowrap">
                            {post.category}
                          </span>
                        </div>
                        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                          {post.content}
                        </p>
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <span>{post.user.name}</span>
                          <span>•</span>
                          <span>{formatDate(post.createdAt)}</span>
                          <span>•</span>
                          <span>{post.viewCount} views</span>
                          <span>•</span>
                          <span>{post.replyCount} replies</span>
                        </div>
                      </div>

                      <div className="flex-shrink-0">
                        <ArrowRight className="w-5 h-5 text-gray-400" />
                      </div>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
