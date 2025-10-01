<template>
  <div class="confirmation-container">
    <div class="confirmation-card">
      <div class="icon">✅</div>
      <h1 class="title">Thank You!</h1>
      <p class="message">Your application for the Enterprise Plan has been received. Our team will review your information and get back to you shortly.</p>
      <button @click="goToHome" class="home-btn">Back to Home</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter();

const goToHome = () => {
  router.push('/');
};
</script>

<style scoped>
.confirmation-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f0f2f5;
  padding: 40px 20px;
}

.confirmation-card {
  background-color: #ffffff;
  border-radius: 12px;
  padding: 50px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
  width: 100%;
  max-width: 500px;
}

.icon {
  font-size: 4rem;
  margin-bottom: 20px;
}

.title {
  font-size: 2.5rem;
  font-weight: 700;
  color: #1a1a1a;
  margin-bottom: 15px;
}

.message {
  font-size: 1.1rem;
  color: #666;
  line-height: 1.6;
  margin-bottom: 30px;
}

.home-btn {
  background-color: #6c5ce7;
  color: #ffffff;
  font-size: 1rem;
  font-weight: 600;
  border: none;
  border-radius: 8px;
  padding: 15px 30px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.home-btn:hover {
  background-color: #5a4cdb;
}
</style>