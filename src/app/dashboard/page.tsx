"use client"

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { 
  BarChart, 
  BookOpen, 
  Plus, 
  Settings, 
  Star, 
  TrendingUp,
  MessageSquare,
  Heart,
  Eye
} from "lucide-react"

interface UserStats {
  promptsCreated: number
  promptsPublished: number
  totalViews: number
  totalLikes: number
  forumPostsCount: number
}

interface Membership {
  tier: string
  customPromptsLimit: number
  analyticsAccess: boolean
  apiAccess: boolean
}

export default function DashboardPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [stats, setStats] = useState<UserStats | null>(null)
  const [membership, setMembership] = useState<Membership | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/signin")
    } else if (status === "authenticated") {
      fetchDashboardData()
    }
  }, [status, router])

  const fetchDashboardData = async () => {
    try {
      const [statsRes, membershipRes] = await Promise.all([
        fetch("/api/user/stats"),
        fetch("/api/user/membership"),
      ])

      if (statsRes.ok) {
        const statsData = await statsRes.json()
        setStats(statsData)
      }

      if (membershipRes.ok) {
        const membershipData = await membershipRes.json()
        setMembership(membershipData)
      }
    } catch (error) {
      console.error("Failed to fetch dashboard data:", error)
    } finally {
      setLoading(false)
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
        <div className="flex justify-between items-start mb-12">
          <div>
            <h1 className="text-4xl font-bold text-gray-900">
              Welcome back, {session.user?.name?.split(" ")[0]}!
            </h1>
            <p className="text-gray-600 mt-2">
              {membership && (
                <>
                  Current Plan: <span className="font-semibold text-blue-600">{membership.tier}</span>
                </>
              )}
            </p>
          </div>
          <Link href="/settings/profile">
            <Button variant="outline" size="sm">
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </Button>
          </Link>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-12">
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Total Prompts</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">
                  {stats?.promptsCreated || 0}
                </p>
              </div>
              <BookOpen className="w-12 h-12 text-blue-100" />
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Published</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">
                  {stats?.promptsPublished || 0}
                </p>
              </div>
              <TrendingUp className="w-12 h-12 text-green-100" />
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Total Views</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">
                  {stats?.totalViews || 0}
                </p>
              </div>
              <Eye className="w-12 h-12 text-purple-100" />
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Total Likes</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">
                  {stats?.totalLikes || 0}
                </p>
              </div>
              <Heart className="w-12 h-12 text-red-100" />
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Forum Posts</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">
                  {stats?.forumPostsCount || 0}
                </p>
              </div>
              <MessageSquare className="w-12 h-12 text-orange-100" />
            </div>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link href="/prompts/create">
              <Button className="w-full justify-center" size="lg">
                <Plus className="w-5 h-5 mr-2" />
                Create Prompt
              </Button>
            </Link>
            <Link href="/my-prompts">
              <Button variant="outline" className="w-full justify-center" size="lg">
                <BookOpen className="w-5 h-5 mr-2" />
                My Prompts
              </Button>
            </Link>
            <Link href="/forum">
              <Button variant="outline" className="w-full justify-center" size="lg">
                <MessageSquare className="w-5 h-5 mr-2" />
                Forum
              </Button>
            </Link>
          </div>
        </div>

        {/* Membership Info */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-gray-900">Current Plan</h3>
              <Star className="w-6 h-6 text-blue-600" />
            </div>
            {membership && (
              <div className="space-y-2">
                <p className="text-gray-700">
                  <span className="font-semibold">{membership.tier}</span> Plan
                </p>
                <p className="text-sm text-gray-600">
                  Custom Prompts: <span className="font-semibold">{membership.customPromptsLimit}</span>
                </p>
                <p className="text-sm text-gray-600">
                  Analytics: {membership.analyticsAccess ? "✓ Included" : "✗ Not included"}
                </p>
                <p className="text-sm text-gray-600">
                  API Access: {membership.apiAccess ? "✓ Included" : "✗ Not included"}
                </p>
                <Link href="/pricing">
                  <Button className="mt-4 w-full" variant="outline">
                    Upgrade Plan
                  </Button>
                </Link>
              </div>
            )}
          </Card>

          <Card className="p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Recent Activity</h3>
            <div className="space-y-3">
              <div className="flex items-center text-sm text-gray-600">
                <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                No recent activity yet
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
