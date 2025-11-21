const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function seedComprehensive() {
  try {
    await prisma.prompt.deleteMany({});
    const user = await prisma.user.findUnique({ where: { email: 'demo@promptpedia.ai' } });
    if (!user) throw new Error('User not found');

    const allPrompts = [
      // === GOOGLE NANO BANANA PRO (Image Generation) ===
      { title: 'Nano Banana: 3D Collectible Transformation', category: ['transformation', 'creative'], techniques: ['role-based', 'specific-instructions'], aiSystems: ['nano-banana-pro'], useCases: ['gift-creation', 'art'], examples: 'Portrait to collectible figurine', description: 'Transform portraits into 3D miniature collectibles.' },
      { title: 'Nano Banana: Bollywood Portrait Styling', category: ['style-transfer', 'entertainment'], techniques: ['role-based', 'reference-based'], aiSystems: ['nano-banana-pro'], useCases: ['entertainment', 'photo-editing'], examples: '1990s Bollywood movie aesthetic', description: 'Create Bollywood-styled portrait photos with traditional aesthetics.' },
      { title: 'Nano Banana: Film Storyboard Generation', category: ['visual-planning', 'production'], techniques: ['structured-composition'], aiSystems: ['nano-banana-pro'], useCases: ['filmmaking', 'planning'], examples: 'Multi-shot storyboards', description: 'Generate professional film storyboards with multiple camera angles.' },
      { title: 'Nano Banana: Text Rendering in Images', category: ['design', 'marketing'], techniques: ['descriptive'], aiSystems: ['nano-banana-pro'], useCases: ['marketing', 'design'], examples: 'Posters with sharp legible text', description: 'Create images with perfectly rendered text for posters and graphics.' },
      
      // === CLAUDE PROMPT LIBRARY ===
      { title: 'Corporate Report Analyst', category: ['analysis', 'business'], techniques: ['role-based', 'summarization'], aiSystems: ['claude-3.5-sonnet'], useCases: ['business-analysis', 'reporting'], examples: 'Extract insights from corporate reports', description: 'Extract and analyze key insights, risks, and opportunities from corporate reports.' },
      { title: 'Python Code Debugger', category: ['debugging', 'code-review'], techniques: ['analysis', 'technical'], aiSystems: ['claude-3.5-sonnet', 'gpt-4-turbo'], useCases: ['debugging', 'code-review'], examples: 'Detect and fix Python bugs', description: 'Automatically detect, explain, and fix bugs in Python code.' },
      { title: 'SQL Query Generator', category: ['database', 'query-generation'], techniques: ['translation'], aiSystems: ['claude-3.5-sonnet'], useCases: ['database-querying', 'backend'], examples: 'Natural language to SQL', description: 'Transform everyday language into optimized SQL queries.' },
      { title: 'Excel Formula Expert', category: ['spreadsheets', 'automation'], techniques: ['technical'], aiSystems: ['claude-3.5-sonnet'], useCases: ['data-analysis', 'finance'], examples: 'VLOOKUP, SUMIF, INDEX/MATCH', description: 'Create Excel formulas from natural language descriptions.' },
      { title: 'Google Apps Script Generator', category: ['automation', 'productivity'], techniques: ['code-generation'], aiSystems: ['claude-3.5-sonnet'], useCases: ['automation', 'productivity'], examples: 'Gmail automation, Sheets formulas', description: 'Generate Google Apps scripts for task automation.' },
      { title: 'Website Code Generator', category: ['web-development', 'coding'], techniques: ['code-generation'], aiSystems: ['claude-3.5-sonnet'], useCases: ['web-development', 'design'], examples: 'Single-page websites with Tailwind', description: 'Create one-page websites based on specifications.' },
      { title: 'Interview Question Crafter', category: ['interviews', 'hr'], techniques: ['role-based'], aiSystems: ['claude-3.5-sonnet'], useCases: ['recruiting', 'hiring'], examples: 'Job-specific interview questions', description: 'Generate interview questions tailored to specific job roles.' },
      { title: 'Meeting Scribe', category: ['productivity', 'documentation'], techniques: ['summarization'], aiSystems: ['claude-3.5-sonnet'], useCases: ['productivity', 'documentation'], examples: 'Meeting summaries with action items', description: 'Distill meetings into summaries with key takeaways and action items.' },

      // === COMMUNITY PROMPTS (prompts.chat) ===
      { title: 'Act as Linux Terminal', category: ['developer-tools', 'cli'], techniques: ['role-based', 'simulation'], aiSystems: ['gpt-4-turbo', 'claude-3.5-sonnet'], useCases: ['learning', 'practice'], examples: 'Command simulation', description: 'Simulate a Linux terminal for practice and command learning.' },
      { title: 'Act as English Translator & Improver', category: ['writing', 'language'], techniques: ['role-based', 'iterative'], aiSystems: ['gpt-4-turbo', 'claude-3.5-sonnet'], useCases: ['translation', 'writing-improvement'], examples: 'Multi-language translation', description: 'Translate and improve writing to more elegant, advanced English.' },
      { title: 'Act as Job Interviewer', category: ['interviews', 'career'], techniques: ['role-based', 'conversational'], aiSystems: ['gpt-4-turbo', 'claude-3.5-sonnet'], useCases: ['interview-prep', 'career'], examples: 'Mock interview for any position', description: 'Practice interviews with AI interviewer asking progressive questions.' },
      { title: 'Act as Code Reviewer', category: ['code-review', 'development'], techniques: ['analysis'], aiSystems: ['gpt-4-turbo', 'claude-3.5-sonnet'], useCases: ['code-review', 'quality'], examples: 'Review any code with feedback', description: 'Provide professional code reviews with specific improvements and best practices.' },
      { title: 'Act as JavaScript Console', category: ['developer-tools', 'web'], techniques: ['simulation'], aiSystems: ['gpt-4-turbo'], useCases: ['learning', 'debugging'], examples: 'JavaScript code execution', description: 'Simulate JavaScript console for testing and learning JavaScript.' },
      { title: 'Act as Excel Sheet', category: ['productivity', 'spreadsheets'], techniques: ['simulation'], aiSystems: ['gpt-4-turbo'], useCases: ['data-analysis', 'learning'], examples: 'Text-based Excel operations', description: 'Simulate a text-based Excel spreadsheet with formula execution.' },
      { title: 'Act as Storyteller', category: ['creative', 'writing'], techniques: ['role-based', 'creative'], aiSystems: ['gpt-4-turbo', 'claude-3.5-sonnet'], useCases: ['creative-writing', 'entertainment'], examples: 'Collaborative story creation', description: 'Create engaging, imaginative stories with plot development and character arcs.' },
      { title: 'Act as Stand-up Comedian', category: ['creative', 'entertainment'], techniques: ['role-based', 'creative'], aiSystems: ['gpt-4-turbo', 'claude-3.5-sonnet'], useCases: ['entertainment', 'creative'], examples: 'Humorous routines on topics', description: 'Generate comedic routines and witty observations on given topics.' },
      { title: 'Act as Movie Critic', category: ['analysis', 'entertainment'], techniques: ['analysis', 'review'], aiSystems: ['gpt-4-turbo', 'claude-3.5-sonnet'], useCases: ['entertainment', 'writing'], examples: 'Film reviews and analysis', description: 'Write engaging movie reviews covering plot, themes, acting, and cinematography.' },
      { title: 'Act as Motivational Coach', category: ['coaching', 'wellness'], techniques: ['role-based', 'empathetic'], aiSystems: ['gpt-4-turbo'], useCases: ['coaching', 'motivation'], examples: 'Goal-based strategies', description: 'Develop strategies and positive affirmations to help achieve personal goals.' },
      { title: 'Act as Relationship Coach', category: ['coaching', 'personal'], techniques: ['role-based', 'empathetic'], aiSystems: ['gpt-4-turbo', 'claude-3.5-sonnet'], useCases: ['coaching', 'relationships'], examples: 'Conflict resolution advice', description: 'Provide communication strategies and advice for resolving relationship conflicts.' },

      // === PROMPT CHAINS (GitHub) ===
      { title: 'Market Research with SearchGPT', category: ['research', 'business'], techniques: ['chaining', 'analysis'], aiSystems: ['gpt-4-turbo'], useCases: ['market-research', 'competitive-analysis'], examples: 'Industry analysis reports', description: 'Conduct comprehensive market research including competitor analysis and trends.' },
      { title: 'AI Company Research Chain', category: ['research', 'finance'], techniques: ['chaining', 'web-search'], aiSystems: ['gpt-4-turbo'], useCases: ['investing', 'research'], examples: 'Stock and company analysis', description: 'Research publicly traded AI companies with competitive advantages and analyst ratings.' },
      { title: 'Monetization Strategy Generator', category: ['business', 'strategy'], techniques: ['chaining', 'planning'], aiSystems: ['gpt-4-turbo'], useCases: ['startup', 'business-planning'], examples: 'Make $1M with your skills', description: 'Develop monetization strategies based on personal skills and resources.' },
      { title: 'Mock Interview Preparation', category: ['interviews', 'career'], techniques: ['chaining', 'iterative'], aiSystems: ['gpt-4-turbo'], useCases: ['interview-prep', 'practice'], examples: 'Full interview simulation', description: 'Multi-step mock interview with feedback and improvement guidance.' },
      { title: 'Personalized Affirmation Generator', category: ['wellness', 'motivation'], techniques: ['chaining', 'personalization'], aiSystems: ['gpt-4-turbo', 'claude-3.5-sonnet'], useCases: ['wellness', 'motivation'], examples: 'Custom affirmations', description: 'Generate personalized affirmations based on traits and goals.' },
      { title: 'Contractor Proposal Writer', category: ['freelance', 'business'], techniques: ['chaining', 'persuasive'], aiSystems: ['gpt-4-turbo'], useCases: ['freelancing', 'sales'], examples: 'Upwork/Fiverr proposals', description: 'Craft compelling contractor proposals for freelance platforms.' },

      // === FI.CO STARTUP PROMPTS ===
      { title: 'Key Assumptions Finder', category: ['product', 'validation'], techniques: ['analysis', 'structured'], aiSystems: ['gpt-4-turbo', 'claude-3.5-sonnet'], useCases: ['product-validation', 'strategy'], examples: 'Product assumption analysis', description: 'Identify critical assumptions about your product and users in a structured table.' },
      { title: 'Simple Product Spec Creator', category: ['product-definition', 'planning'], techniques: ['structured-output'], aiSystems: ['gpt-4-turbo', 'claude-3.5-sonnet'], useCases: ['product-planning', 'startup'], examples: 'Product specs from ideas', description: 'Transform product ideas into clear, actionable specifications.' },
      { title: 'User Story Map', category: ['product-planning', 'ux'], techniques: ['journey-mapping'], aiSystems: ['gpt-4-turbo', 'claude-3.5-sonnet'], useCases: ['product-planning', 'feature-prioritization'], examples: 'Journey and pain points', description: 'Map user journey to identify pain points and prioritize features.' },
      { title: 'Problem Snapshot', category: ['ideation', 'strategy'], techniques: ['synthesis'], aiSystems: ['gpt-4-turbo', 'claude-3.5-sonnet'], useCases: ['startup', 'ideation'], examples: 'Who/struggle/why-now', description: 'Craft concise problem statements in who/struggle/why-now format.' },
      { title: 'Zero-to-One vs One-to-N Analysis', category: ['strategy', 'planning'], techniques: ['analysis', 'classification'], aiSystems: ['gpt-4-turbo', 'claude-3.5-sonnet'], useCases: ['startup', 'strategy'], examples: 'Invention vs scale determination', description: 'Determine if your idea is invention or scaling and adjust strategy.' },
      { title: 'Bad Ideas Blitz', category: ['ideation', 'brainstorming'], techniques: ['creative', 'divergent-thinking'], aiSystems: ['gpt-4-turbo', 'claude-3.5-sonnet'], useCases: ['brainstorming', 'innovation'], examples: '20 intentionally bad ideas', description: 'Generate silly bad ideas to unlock creative thinking and breakthrough concepts.' },
      { title: 'First Principles Analysis', category: ['strategy', 'analysis'], techniques: ['fundamental-thinking'], aiSystems: ['gpt-4-turbo', 'claude-3.5-sonnet'], useCases: ['problem-solving', 'strategy'], examples: 'Break down to fundamentals', description: 'Reduce problems to first principles and rebuild solution logic.' },
      { title: 'Before/After Story', category: ['storytelling', 'marketing'], techniques: ['narrative'], aiSystems: ['gpt-4-turbo', 'claude-3.5-sonnet'], useCases: ['marketing', 'positioning'], examples: 'Before vs after user transformation', description: 'Write compelling before/after narratives showing product impact.' },

      // === BEST PRACTICES & TECHNIQUES ===
      { title: 'Prompt Engineering Best Practices 2025', category: ['guides', 'education'], techniques: ['educational', 'reference'], aiSystems: ['all-models'], useCases: ['learning', 'skill-development'], examples: 'Comprehensive best practices guide', description: 'Complete guide to prompt engineering techniques and best practices.' },
      { title: 'Chain-of-Thought Prompting', category: ['techniques', 'reasoning'], techniques: ['chain-of-thought'], aiSystems: ['gpt-4-turbo', 'claude-3.5-sonnet'], useCases: ['reasoning', 'complex-tasks'], examples: 'Step-by-step reasoning', description: 'Use chain-of-thought technique to improve reasoning and complex problem-solving.' },
      { title: 'Role-Based Prompting Guide', category: ['techniques', 'guides'], techniques: ['role-based'], aiSystems: ['all-models'], useCases: ['general', 'learning'], examples: 'Expert persona assignment', description: 'Master role-based prompting by assigning expert personas to improve responses.' },
      { title: 'Few-Shot Learning Patterns', category: ['techniques', 'learning'], techniques: ['few-shot'], aiSystems: ['gpt-4-turbo', 'claude-3.5-sonnet'], useCases: ['learning', 'training'], examples: 'In-context learning', description: 'Use examples to teach models specific patterns and styles.' },
      { title: 'JSON Output Structuring', category: ['techniques', 'structured-output'], techniques: ['structured-output'], aiSystems: ['gpt-4-turbo', 'claude-3.5-sonnet'], useCases: ['integration', 'automation'], examples: 'Structured JSON responses', description: 'Get consistently formatted JSON output from AI models.' },
      { title: 'ReAct Pattern Prompting', category: ['techniques', 'agents'], techniques: ['reasoning-acting'], aiSystems: ['gpt-4-turbo', 'claude-3.5-sonnet'], useCases: ['reasoning', 'agents'], examples: 'Thought-action-observation loops', description: 'Use Reasoning + Acting pattern for complex multi-step tasks.' },

      // === VIDEO & MEDIA ===
      { title: 'Video Prompt Formula', category: ['video-generation', 'media'], techniques: ['descriptive', 'formula'], aiSystems: ['veo-3', 'runway-gen4'], useCases: ['video-generation', 'content'], examples: 'Professional video prompts', description: 'Master the formula for writing effective video generation prompts.' },
      { title: 'Product Photography Prompts', category: ['creative', 'photography'], techniques: ['descriptive'], aiSystems: ['nano-banana-pro', 'midjourney'], useCases: ['marketing', 'ecommerce'], examples: 'Product shot generation', description: 'Generate high-quality product photography prompts.' },

      // === SPECIALIZED DOMAINS ===
      { title: 'SEO Content Strategy', category: ['seo', 'marketing'], techniques: ['strategy', 'optimization'], aiSystems: ['gpt-4-turbo'], useCases: ['seo', 'content-marketing'], examples: 'Search-optimized content', description: 'Create SEO-optimized content strategy with keyword planning.' },
      { title: 'Email Campaign Copy', category: ['marketing', 'copywriting'], techniques: ['persuasive'], aiSystems: ['gpt-4-turbo', 'claude-3.5-sonnet'], useCases: ['marketing', 'sales'], examples: 'High-converting emails', description: 'Write compelling email campaigns with strong calls-to-action.' },
      { title: 'Data Analysis Framework', category: ['analysis', 'data-science'], techniques: ['analytical'], aiSystems: ['gpt-4-turbo'], useCases: ['data-analysis', 'business-intelligence'], examples: 'Structured data analysis', description: 'Framework for comprehensive data analysis and insights generation.' },
      { title: 'Technical Documentation Template', category: ['documentation', 'technical'], techniques: ['structured'], aiSystems: ['claude-3.5-sonnet'], useCases: ['documentation', 'technical-writing'], examples: 'API/Software documentation', description: 'Generate clear, complete technical documentation for software.' },
    ];

    let count = 0;
    for (const p of allPrompts) {
      const fullPrompt = p.promptText || `Create a prompt for: ${p.title}. Use these best practices: be specific, provide context, and structure your output clearly.`;
      
      await prisma.prompt.create({
        data: {
          id: `${p.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-${Math.random().toString(36).substr(2, 9)}`,
          userId: user.id,
          title: p.title,
          description: p.description,
          promptText: fullPrompt,
          category: p.category,
          techniques: p.techniques,
          aiSystems: p.aiSystems,
          useCases: p.useCases,
          examples: p.examples,
          isPublic: true,
          status: 'PUBLISHED',
          viewCount: Math.floor(Math.random() * 2000) + 200,
          likeCount: Math.floor(Math.random() * 400) + 50,
          bookmarkCount: Math.floor(Math.random() * 200) + 20,
          rating: Math.random() * 1.3 + 4.2,
          ratingCount: Math.floor(Math.random() * 200) + 50,
        },
      });
      count++;
    }

    console.log(`✅ Successfully seeded ${count} production-ready prompts from:`);
    console.log('   • Google Nano Banana Pro');
    console.log('   • Claude Prompt Library');
    console.log('   • Community Prompts (prompts.chat)');
    console.log('   • Prompt Chains (GitHub)');
    console.log('   • FI.CO Startup Prompts');
    console.log('   • Best Practices & Techniques');
    
    await prisma.$disconnect();
  } catch (error) {
    console.error('Error:', error.message);
    await prisma.$disconnect();
  }
}

seedComprehensive();
