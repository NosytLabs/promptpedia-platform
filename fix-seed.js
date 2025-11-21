const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function fixData() {
  try {
    console.log('🔧 Fixing database schema...');
    
    // Get all prompts
    const prompts = await prisma.prompt.findMany();
    
    // Update each prompt's category to be an array if it's a string
    for (const prompt of prompts) {
      if (typeof prompt.category === 'string') {
        await prisma.prompt.update({
          where: { id: prompt.id },
          data: {
            category: [prompt.category],
          },
        });
      }
    }
    
    console.log(`✅ Fixed ${prompts.length} prompts - converted category to arrays`);
    await prisma.$disconnect();
    process.exit(0);
  } catch (error) {
    console.error('❌ Fix failed:', error);
    await prisma.$disconnect();
    process.exit(1);
  }
}

fixData();
