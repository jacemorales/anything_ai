import { defineStore } from 'pinia';

type Plan = 'daily' | 'monthly' | 'enterprise' | null;

const USAGE_LIMITS = {
  daily: {
    prompts: 10,
    characters: 1000,
    voiceMinutes: 15,
  },
  monthly: {
    prompts: 500,
    characters: 5000,
    voiceMinutes: 300,
  },
  enterprise: {
    prompts: Infinity,
    characters: Infinity,
    voiceMinutes: Infinity,
  },
};

interface UserState {
  plan: Plan;
  promptsUsed: number;
  charactersUsed: number;
  voiceSecondsUsed: number;
}

export const useUserStore = defineStore('user', {
  state: (): UserState => ({
    plan: null,
    promptsUsed: 0,
    charactersUsed: 0,
    voiceSecondsUsed: 0,
  }),
  getters: {
    isSubscribed: (state) => state.plan !== null,
    getPlan: (state) => state.plan,

    // Quota Checkers
    hasPromptQuota: (state) => {
      if (!state.plan) return false;
      return state.promptsUsed < USAGE_LIMITS[state.plan].prompts;
    },
    hasCharacterQuota: (state) => (characters: number) => {
        if (!state.plan) return false;
        return (state.charactersUsed + characters) <= USAGE_LIMITS[state.plan].characters;
    },
    hasVoiceQuota: (state) => {
      if (!state.plan) return false;
      return (state.voiceSecondsUsed / 60) < USAGE_LIMITS[state.plan].voiceMinutes;
    },
  },
  actions: {
    selectPlan(plan: 'daily' | 'monthly' | 'enterprise') {
      this.plan = plan;
      this.resetUsage();
    },
    incrementUsage(prompt: string) {
      this.promptsUsed++;
      this.charactersUsed += prompt.length;
    },
    incrementVoiceUsage(seconds: number) {
      this.voiceSecondsUsed += seconds;
    },
    resetUsage() {
      this.promptsUsed = 0;
      this.charactersUsed = 0;
      this.voiceSecondsUsed = 0;
    },
    submitEnterpriseRequest(details: any) {
        console.log("Enterprise request submitted:", details);
        // Here you would typically send the details to a backend server.
        // For this mock, we'll just log it.
    }
  },
});