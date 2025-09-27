import { useUserStore } from '../stores/user';

interface ChatMessage {
  text: string;
  sender: 'user' | 'ai';
  isQuotaExceeded?: boolean;
}

// This is a simplified mock of the Gemini API call
const mockGeminiAPI = (prompt: string, plan: 'daily' | 'monthly' | 'enterprise') => {
  console.log(`Making API call for plan: ${plan}`);

  let responseText = "I'm sorry, I can't process that right now.";

  if (prompt.toLowerCase().includes('hello')) {
    responseText = 'Hello there! How can I assist you today?';
  } else if (prompt.toLowerCase().includes('features')) {
    responseText = 'We have subscription plans, a new UI, and voice-to-text!';
  } else {
    switch (plan) {
      case 'daily':
        responseText = `As a Daily user, I can give you a brief answer to your question about "${prompt.substring(0, 20)}...".`;
        break;
      case 'monthly':
        responseText = `With your Monthly plan, I can provide more detail on "${prompt}". Here's a thorough response...`;
        break;
      case 'enterprise':
        responseText = `As an Enterprise user, you have my full attention. Regarding your question, "${prompt}", let's dive deep into the analysis.`;
        break;
    }
  }

  return new Promise<string>((resolve) => {
    setTimeout(() => {
      resolve(responseText);
    }, 1000); // Simulate network delay
  });
};


export const GeminiService = {
  async generateContent(prompt: string): Promise<ChatMessage> {
    const userStore = useUserStore();
    const currentPlan = userStore.getPlan;

    if (!currentPlan) {
      return {
        text: "Please select a subscription plan to start chatting.",
        sender: 'ai',
      };
    }

    // Check usage quotas before making the API call
    if (!userStore.hasPromptQuota) {
      return {
        text: "You've used all your prompts for this period. Please upgrade for more.",
        sender: 'ai',
        isQuotaExceeded: true,
      };
    }

    if (!userStore.hasCharacterQuota(prompt.length)) {
      return {
        text: "Your message exceeds the character limit for your plan. Please shorten it or upgrade.",
        sender: 'ai',
        isQuotaExceeded: true,
      };
    }

    // If quotas are fine, increment usage and proceed
    userStore.incrementUsage(prompt);

    const responseText = await mockGeminiAPI(prompt, currentPlan);

    return {
      text: responseText,
      sender: 'ai',
    };
  },
};