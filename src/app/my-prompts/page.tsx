"use client"

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  BookOpen,
  Plus,
  Edit2,
  Trash2,
  Eye,
  Heart,
  Search,
} from "lucide-react"

interface UserPrompt {
  id: string
  title: string
  description?: string
  category: string
  techniques: string[]
  status: string
  viewCount: number
  likeCount: number
  createdAt: string
}

export default function MyPromptsPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [prompts, setPrompts] = useState<UserPrompt[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [filteredPrompts, setFilteredPrompts] = useState<UserPrompt[]>([])

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/signin")
    } else if (status === "authenticated") {
      fetchPrompts()
    }
  }, [status, router])

  useEffect(() => {
    const filtered = prompts.filter((prompt) =>
      prompt.title.toLowerCase().includes(searchQuery.toLowerCase())
    )
    setFilteredPrompts(filtered)
  }, [searchQuery, prompts])

  const fetchPrompts = async () => {
    try {
      setLoading(true)
      const response = await fetch("/api/my-prompts")
      if (response.ok) {
        const data = await response.json()
        setPrompts(data.data?.items || [])
      }
    } catch (error) {
      setPrompts([])
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (promptId: string) => {
    if (!confirm("Are you sure you want to delete this prompt?")) return

    try {
      const response = await fetch(`/api/prompts/${promptId}`, {
        method: "DELETE",
      })

      if (response.ok) {
        setPrompts(prompts.filter((p) => p.id !== promptId))
      }
    } catch (error) {
      // Silently fail - error message shown via toast
    }
  }

  if (status === "loading" || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (!session) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900">My Prompts</h1>
            <p className="text-gray-600 mt-2">
              Manage and organize your custom prompts
            </p>
          </div>
          <Link href="/prompts/create">
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Create Prompt
            </Button>
          </Link>
        </div>

        {/* Search */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-8">
          <div className="flex items-center">
            <Search className="w-5 h-5 text-gray-400 mr-3" />
            <Input
              type="text"
              placeholder="Search your prompts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full border-0 focus:ring-0"
            />
          </div>
        </div>

        {/* Prompts List */}
        {loading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : filteredPrompts.length === 0 ? (
          <Card className="p-12 text-center">
            <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No prompts yet
            </h3>
            <p className="text-gray-600 mb-6">
              Create your first prompt to get started!
            </p>
            <Link href="/prompts/create">
              <Button>Create Prompt</Button>
            </Link>
          </Card>
        ) : (
          <div className="space-y-4">
            {filteredPrompts.map((prompt) => (
              <Card key={prompt.id} className="p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-start justify-between">
                  <div className="flex-grow">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {prompt.title}
                      </h3>
                      <span
                        className={`text-xs font-semibold px-3 py-1 rounded-full ${
                          prompt.status === "PUBLISHED"
                            ? "bg-green-100 text-green-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {prompt.status}
                      </span>
                    </div>
                    {prompt.description && (
                      <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                        {prompt.description}
                      </p>
                    )}
                    <div className="flex items-center space-x-4 text-xs text-gray-500">
                      <span className="bg-gray-200 text-gray-800 px-2 py-1 rounded">
                        {prompt.category}
                      </span>
                      {prompt.techniques.length > 0 && (
                        <span>
                          {prompt.techniques.slice(0, 2).join(", ")}
                          {prompt.techniques.length > 2 && `+${prompt.techniques.length - 2}`}
                        </span>
                      )}
                      <div className="flex items-center space-x-3">
                        <span className="flex items-center">
                          <Eye className="w-4 h-4 mr-1" />
                          {prompt.viewCount}
                        </span>
                        <span className="flex items-center">
                          <Heart className="w-4 h-4 mr-1" />
                          {prompt.likeCount}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 ml-4">
                    <Link href={`/prompts/${prompt.id}/edit`}>
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-blue-600 hover:text-blue-700"
                      >
                        <Edit2 className="w-4 h-4" />
                      </Button>
                    </Link>
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-red-600 hover:text-red-700"
                      onClick={() => handleDelete(prompt.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
