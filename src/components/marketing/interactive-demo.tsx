import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card } from '@/components/ui/card'
import { Icons } from '@/components/icons'
import { trackFeatureUsage } from '@/lib/analytics'

interface DemoStep {
  title: string
  description: string
  component: React.ReactNode
}

export function InteractiveDemo() {
  const [currentStep, setCurrentStep] = useState(0)
  const [prompt, setPrompt] = useState('')
  const [response, setResponse] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const demoSteps: DemoStep[] = [
    {
      title: 'Create a Prompt',
      description: 'Start by writing your prompt or selecting a template',
      component: (
        <div className="space-y-4">
          <Textarea
            placeholder="Write your prompt here..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="min-h-[100px]"
          />
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => {
                setPrompt('Write a blog post about AI prompt engineering best practices')
                trackFeatureUsage('demo_template_used')
              }}
            >
              <Icons.template className="mr-2 h-4 w-4" />
              Use Template
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                setPrompt('')
                trackFeatureUsage('demo_clear_prompt')
              }}
            >
              <Icons.trash className="mr-2 h-4 w-4" />
              Clear
            </Button>
          </div>
        </div>
      ),
    },
    {
      title: 'Optimize',
      description: 'Our AI will help you improve your prompt',
      component: (
        <div className="space-y-4">
          <Card className="p-4 bg-muted/50">
            <p className="text-sm font-mono">{prompt}</p>
          </Card>
          <Button
            onClick={async () => {
              setIsLoading(true)
              trackFeatureUsage('demo_optimize_prompt')
              // Simulate optimization
              await new Promise(resolve => setTimeout(resolve, 1500))
              setResponse('Here's your optimized prompt:\n\nCreate a comprehensive guide on AI prompt engineering best practices, including:\n- Key principles of effective prompts\n- Common pitfalls to avoid\n- Examples of successful prompts\n- Tips for different AI models\n- Best practices for testing and iteration')
              setIsLoading(false)
            }}
            disabled={!prompt || isLoading}
          >
            {isLoading ? (
              <>
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                Optimizing...
              </>
            ) : (
              <>
                <Icons.wand className="mr-2 h-4 w-4" />
                Optimize Prompt
              </>
            )}
          </Button>
          {response && (
            <Card className="p-4 bg-primary/10">
              <p className="text-sm whitespace-pre-wrap">{response}</p>
            </Card>
          )}
        </div>
      ),
    },
    {
      title: 'Save & Share',
      description: 'Save your prompt to your library and share with your team',
      component: (
        <div className="space-y-4">
          <Input
            placeholder="Give your prompt a name..."
            className="mb-4"
          />
          <div className="flex gap-2">
            <Button
              onClick={() => trackFeatureUsage('demo_save_prompt')}
            >
              <Icons.save className="mr-2 h-4 w-4" />
              Save to Library
            </Button>
            <Button
              variant="outline"
              onClick={() => trackFeatureUsage('demo_share_prompt')}
            >
              <Icons.share className="mr-2 h-4 w-4" />
              Share
            </Button>
          </div>
        </div>
      ),
    },
  ]

  return (
    <div className="rounded-xl border bg-background p-6 shadow-sm">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h3 className="text-lg font-semibold mb-1">
            {demoSteps[currentStep].title}
          </h3>
          <p className="text-sm text-muted-foreground">
            {demoSteps[currentStep].description}
          </p>
        </div>
        <div className="flex items-center gap-2">
          {demoSteps.map((_, index) => (
            <Button
              key={index}
              variant={currentStep === index ? 'default' : 'outline'}
              size="sm"
              onClick={() => {
                setCurrentStep(index)
                trackFeatureUsage(`demo_step_${index + 1}`)
              }}
            >
              {index + 1}
            </Button>
          ))}
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
        >
          {demoSteps[currentStep].component}
        </motion.div>
      </AnimatePresence>

      <div className="flex justify-between mt-8">
        <Button
          variant="outline"
          onClick={() => {
            setCurrentStep(Math.max(0, currentStep - 1))
            trackFeatureUsage('demo_previous_step')
          }}
          disabled={currentStep === 0}
        >
          <Icons.arrowLeft className="mr-2 h-4 w-4" />
          Previous
        </Button>
        <Button
          onClick={() => {
            setCurrentStep(Math.min(demoSteps.length - 1, currentStep + 1))
            trackFeatureUsage('demo_next_step')
          }}
          disabled={currentStep === demoSteps.length - 1}
        >
          Next
          <Icons.arrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}