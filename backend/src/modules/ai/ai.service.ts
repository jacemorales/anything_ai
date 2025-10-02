import prisma from '../../config/db';

const USAGE_LIMITS = {
  daily: { prompts: 10, characters: 1000 },
  monthly: { prompts: 500, characters: 5000 },
  enterprise: { prompts: Infinity, characters: Infinity },
};

// A simple helper to get the start of the current day
const getStartOfToday = () => {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), now.getDate());
};

export const AIService = {
  async generateResponse(userId: number, prompt: string) {
    // In a real app, you would fetch the user's active subscription.
    // For this demo, we'll assume every user has a 'daily' plan.
    const userPlan = 'daily';

    const today = getStartOfToday();

    // 1. Get current usage for today
    let usage = await prisma.usageTracking.findUnique({
      where: {
        userId_date: {
          userId,
          date: today,
        },
      },
    });

    // If no usage record for today, create one
    if (!usage) {
      usage = await prisma.usageTracking.create({
        data: { userId, date: today },
      });
    }

    // 2. Check quotas
    if (usage.promptCount >= USAGE_LIMITS[userPlan].prompts) {
      throw new Error('Prompt quota exceeded');
    }
    if (usage.characterCount + prompt.length > USAGE_LIMITS[userPlan].characters) {
      throw new Error('Character quota exceeded');
    }

    // 3. Update usage
    await prisma.usageTracking.update({
      where: {
        id: usage.id,
      },
      data: {
        promptCount: { increment: 1 },
        characterCount: { increment: prompt.length },
      },
    });

    // 4. Return mock AI response
    return `This is a mock response to your prompt: "${prompt}"`;
  },
};