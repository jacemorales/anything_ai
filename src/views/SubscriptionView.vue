<template>
  <div class="subscription-container">
    <header class="header">
      <h1 class="title">Choose Your Plan</h1>
      <p class="subtitle">Unlock the full power of AI. Cancel anytime.</p>
    </header>

    <main class="plans-grid">
      <!-- Daily Pass -->
      <div class="plan-card">
        <div class="plan-header">
          <h2 class="plan-name">⚡ Daily Pass</h2>
          <p class="plan-price">$1 – $2 <span class="price-period">/ day</span></p>
        </div>
        <p class="plan-description">For people who just want to test AI or use it once in a while.</p>
        <ul class="features-list">
          <li><span class="icon">🔊</span> Voice-to-text: up to 15 minutes.</li>
          <li><span class="icon">💬</span> Basic AI responses (~1–2k tokens).</li>
          <li><span class="icon">📄</span> Simple tasks (summaries, Q&A).</li>
          <li><span class="icon">⚡</span> Standard response time.</li>
        </ul>
        <button @click="selectPlan('daily')" class="select-plan-btn">Choose Daily</button>
      </div>

      <!-- Monthly Pro -->
      <div class="plan-card featured">
        <div class="plan-header">
          <h2 class="plan-name">🌙 Monthly Pro</h2>
          <p class="plan-price">$10 – $20 <span class="price-period">/ month</span></p>
        </div>
        <p class="plan-description">For individuals who use AI frequently.</p>
        <ul class="features-list">
          <li><span class="icon">🔊</span> Voice-to-text: up to 300 minutes/month.</li>
          <li><span class="icon">💬</span> Longer response context (~8–16k tokens).</li>
          <li><span class="icon">📄</span> Advanced tasks (essays, reports, planning).</li>
          <li><span class="icon">🧠</span> Personalized usage (basic memory).</li>
          <li><span class="icon">⚡</span> Faster responses + higher priority.</li>
        </ul>
        <button @click="selectPlan('monthly')" class="select-plan-btn">Choose Pro</button>
      </div>

      <!-- Enterprise / Power User -->
      <div class="plan-card">
        <div class="plan-header">
          <h2 class="plan-name">🏆 Enterprise</h2>
          <p class="plan-price">$50 – $99 <span class="price-period">/ month</span></p>
        </div>
        <p class="plan-description">For heavy users who want unlimited AI access.</p>
        <ul class="features-list">
          <li><span class="icon">🔊</span> Unlimited voice-to-text.</li>
          <li><span class="icon">💬</span> Maximum context length.</li>
          <li><span class="icon">📄</span> No query caps — unlimited content creation.</li>
          <li><span class="icon">🔒</span> Secure data handling (privacy-first).</li>
          <li><span class="icon">🎧</span> Dedicated priority support.</li>
        </ul>
        <button @click="selectPlan('enterprise')" class="select-plan-btn">Choose Enterprise</button>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from '../stores/user';

const userStore = useUserStore();

const selectPlan = (plan: 'daily' | 'monthly' | 'enterprise') => {
  userStore.selectPlan(plan);
};
</script>

<style scoped>
.subscription-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px 20px;
  min-height: 100vh;
  background-color: #f0f2f5;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
}

.header {
  text-align: center;
  margin-bottom: 40px;
}

.title {
  font-size: 2.5rem;
  font-weight: 700;
  color: #1a1a1a;
}

.subtitle {
  font-size: 1.1rem;
  color: #666;
}

.plans-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 30px;
  width: 100%;
  max-width: 1100px;
}

@media (min-width: 768px) {
  .plans-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1024px) {
  .plans-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

.plan-card {
  background-color: #ffffff;
  border-radius: 12px;
  padding: 30px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  transition: transform 0.2s, box-shadow 0.2s;
}

.plan-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 12px rgba(0, 0, 0, 0.15);
}

.plan-card.featured {
  border: 2px solid #6c5ce7;
  transform: scale(1.05);
}

.plan-header {
  margin-bottom: 20px;
  text-align: center;
}

.plan-name {
  font-size: 1.5rem;
  font-weight: 600;
  color: #1a1a1a;
}

.plan-price {
  font-size: 2rem;
  font-weight: 700;
  color: #6c5ce7;
  margin: 10px 0;
}

.price-period {
  font-size: 1rem;
  font-weight: 400;
  color: #666;
}

.plan-description {
  font-size: 1rem;
  color: #666;
  margin-bottom: 30px;
  text-align: center;
  flex-grow: 1;
}

.features-list {
  list-style: none;
  padding: 0;
  margin-bottom: 30px;
}

.features-list li {
  display: flex;
  align-items: center;
  font-size: 1rem;
  color: #333;
  margin-bottom: 15px;
}

.features-list .icon {
  margin-right: 10px;
  font-size: 1.2rem;
}

.select-plan-btn {
  background-color: #6c5ce7;
  color: #ffffff;
  font-size: 1rem;
  font-weight: 600;
  border: none;
  border-radius: 8px;
  padding: 15px;
  cursor: pointer;
  width: 100%;
  margin-top: auto;
  transition: background-color 0.2s;
}

.select-plan-btn:hover {
  background-color: #5a4cdb;
}
</style>