<template>
  <div class="auth-container">
    <div class="auth-card">
      <h1 class="title">{{ isLogin ? 'Login' : 'Sign Up' }}</h1>
      <form @submit.prevent="handleSubmit">
        <div class="form-group">
          <label for="email">Email</label>
          <input type="email" id="email" v-model="formData.email" required />
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input type="password" id="password" v-model="formData.password" required />
        </div>
        <p v-if="error" class="error-message">{{ error }}</p>
        <button type="submit" class="submit-btn">{{ isLogin ? 'Login' : 'Sign Up' }}</button>
      </form>
      <p class="toggle-text">
        {{ isLogin ? "Don't have an account?" : 'Already have an account?' }}
        <button @click="toggleForm" class="toggle-btn">{{ isLogin ? 'Sign Up' : 'Login' }}</button>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const isLogin = ref(true);
const formData = ref({ email: '', password: '' });
const error = ref<string | null>(null);
const router = useRouter();

const toggleForm = () => {
  isLogin.value = !isLogin.value;
  error.value = null;
};

const handleSubmit = async () => {
  error.value = null;
  const endpoint = isLogin.value ? '/api/auth/login' : '/api/auth/signup';

  try {
    const response = await fetch(`http://localhost:3000${endpoint}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData.value),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('API Error Response:', data);
      throw new Error(data.message || data.error || 'Something went wrong');
    }

    if (isLogin.value) {
      // Assuming the token is returned on login
      localStorage.setItem('authToken', data.token);
      await router.push('/'); // Redirect to subscription page after login
    } else {
      // Automatically switch to login form after successful signup
      isLogin.value = true;
      alert('Signup successful! Please log in.');
    }

  } catch (err: any) {
    console.error('Caught an error during form submission:', err);
    error.value = err.message;
  }
};
</script>

<style scoped>
.auth-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f0f2f5;
}
.auth-card {
  background-color: #ffffff;
  padding: 40px;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  width: 100%;
  max-width: 400px;
}
.title {
  text-align: center;
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 30px;
}
.form-group {
  margin-bottom: 20px;
}
label {
  display: block;
  margin-bottom: 8px;
  font-weight: 600;
}
input {
  width: 100%;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 8px;
}
.error-message {
  color: #d93025;
  text-align: center;
  margin-bottom: 15px;
}
.submit-btn {
  width: 100%;
  padding: 15px;
  border: none;
  border-radius: 8px;
  background-color: #6c5ce7;
  color: #fff;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s;
}
.submit-btn:hover {
  background-color: #5a4cdb;
}
.toggle-text {
  text-align: center;
  margin-top: 20px;
  color: #666;
}
.toggle-btn {
  background: none;
  border: none;
  color: #6c5ce7;
  font-weight: 600;
  cursor: pointer;
}
</style>