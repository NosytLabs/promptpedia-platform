"use client"

import { useState } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { ArrowLeft } from "lucide-react"

const categories = [
  "Text Generation",
  "Code Generation",
  "Data Analysis",
  "Creative Writing",
  "Image Generation",
  "Video Generation",
  "Chatbot",
  "Summarization",
  "Translation",
  "Business",
  "Education",
  "Research",
]

const techniques = [
  "One-shot learning",
  "Few-shot learning",
  "Chain-of-thought",
  "Zero-shot prompting",
  "Prompt chaining",
  "Self-consistency",
  "Role-based prompting",
  "Structured debates",
  "Iterative refinement",
  "Constraint-based",
  "Socratic method",
  "JSON output formatting",
]

const aiSystems = [
  "GPT-4",
  "GPT-3.5",
  "Claude 3",
  "Claude 2",
  "Gemini",
  "Llama 2",
  "Mistral",
  "Midjourney",
  "Veo 3",
]

export default function CreatePromptPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    promptText: "",
    category: categories[0],
    techniques: [] as string[],
    aiSystems: [] as string[],
    tags: "",
    examples: "",
  })

  if (status === "unauthenticated") {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Please sign in to create a prompt
          </h1>
          <Link href="/auth/signin">
            <Button>Sign In</Button>
          </Link>
        </div>
      </div>
    )
  }

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleMultiSelect = (
    name: "techniques" | "aiSystems",
    value: string
  ) => {
    setFormData((prev) => ({
      ...prev,
      [name]: prev[name].includes(value)
        ? prev[name].filter((item) => item !== value)
        : [...prev[name], value],
    }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    if (!formData.title.trim() || !formData.promptText.trim()) {
      setError("Title and prompt text are required")
      setIsLoading(false)
      return
    }

    try {
      const response = await fetch("/api/prompts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          tags: formData.tags.split(",").map((t) => t.trim()).filter(Boolean),
        }),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.message || "Failed to create prompt")
      }

      const data = await response.json()
      router.push(`/prompts/${data.id}`)
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link href="/my-prompts" className="flex items-center text-blue-600 hover:text-blue-700 mb-8">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to My Prompts
        </Link>

        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Create a New Prompt</h1>
          <p className="text-gray-600 mb-8">
            Share your prompt engineering skills with the community
          </p>

          {error && (
            <Alert variant="destructive" className="mb-6">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title */}
            <div>
              <Label htmlFor="title">Title *</Label>
              <Input
                id="title"
                name="title"
                type="text"
                placeholder="Give your prompt a clear, descriptive title"
                value={formData.title}
                onChange={handleInputChange}
                disabled={isLoading}
                required
              />
            </div>

            {/* Description */}
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                placeholder="Describe what this prompt does and when to use it"
                value={formData.description}
                onChange={handleInputChange}
                disabled={isLoading}
                rows={3}
              />
            </div>

            {/* Prompt Text */}
            <div>
              <Label htmlFor="promptText">Prompt Text *</Label>
              <Textarea
                id="promptText"
                name="promptText"
                placeholder="Paste your prompt here..."
                value={formData.promptText}
                onChange={handleInputChange}
                disabled={isLoading}
                rows={8}
                required
              />
            </div>

            {/* Category */}
            <div>
              <Label htmlFor="category">Category</Label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                disabled={isLoading}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            {/* Techniques */}
            <div>
              <Label>Techniques</Label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-2">
                {techniques.map((technique) => (
                  <label key={technique} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={formData.techniques.includes(technique)}
                      onChange={() => handleMultiSelect("techniques", technique)}
                      disabled={isLoading}
                      className="w-4 h-4 text-blue-600 rounded"
                    />
                    <span className="ml-2 text-sm text-gray-700">{technique}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* AI Systems */}
            <div>
              <Label>Compatible AI Systems</Label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-2">
                {aiSystems.map((system) => (
                  <label key={system} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={formData.aiSystems.includes(system)}
                      onChange={() => handleMultiSelect("aiSystems", system)}
                      disabled={isLoading}
                      className="w-4 h-4 text-blue-600 rounded"
                    />
                    <span className="ml-2 text-sm text-gray-700">{system}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Tags */}
            <div>
              <Label htmlFor="tags">Tags</Label>
              <Input
                id="tags"
                name="tags"
                type="text"
                placeholder="Separate tags with commas"
                value={formData.tags}
                onChange={handleInputChange}
                disabled={isLoading}
              />
            </div>

            {/* Examples */}
            <div>
              <Label htmlFor="examples">Examples</Label>
              <Textarea
                id="examples"
                name="examples"
                placeholder="Provide example inputs and outputs to show how this prompt works"
                value={formData.examples}
                onChange={handleInputChange}
                disabled={isLoading}
                rows={5}
              />
            </div>

            {/* Buttons */}
            <div className="flex gap-4 pt-6 border-t">
              <Button type="submit" disabled={isLoading} size="lg">
                {isLoading ? "Creating..." : "Create Prompt"}
              </Button>
              <Link href="/my-prompts">
                <Button type="button" variant="outline" size="lg">
                  Cancel
                </Button>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
