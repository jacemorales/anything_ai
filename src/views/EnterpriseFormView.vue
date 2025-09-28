<template>
  <div class="enterprise-form-container">
    <div class="form-card">
      <header class="form-header">
        <h1 class="title">🏆 Enterprise Plan Application</h1>
        <p class="subtitle">Please provide your details below. Our team will get back to you shortly.</p>
      </header>
      <form @submit.prevent="submitForm" class="form-body">
        <div class="form-group">
          <label for="orgName">Company / Organization Name</label>
          <input type="text" id="orgName" v-model="formData.orgName" required />
        </div>
        <div class="form-group">
          <label for="contactPerson">Contact Person</label>
          <input type="text" id="contactPerson" v-model="formData.contactPerson" required />
        </div>
        <div class="form-group">
          <label for="contactEmail">Contact Email</label>
          <input type="email" id="contactEmail" v-model="formData.contactEmail" required />
        </div>
        <div class="form-group">
          <label for="usageType">Expected Usage</label>
          <select id="usageType" v-model="formData.usageType" required>
            <option disabled value="">Please select one</option>
            <option>Research</option>
            <option>Customer Service</option>
            <option>Business Automation</option>
            <option>Content Creation</option>
            <option>Other</option>
          </select>
        </div>
        <div class="form-group">
          <label for="requirements">Special Requirements</label>
          <textarea id="requirements" v-model="formData.requirements" rows="4"></textarea>
        </div>

        <div class="pricing-info">
          <p class="price">Price: <strong>$50</strong> for 4 months</p>
          <p class="discount">Renew for another 4 months and get <strong>10% off</strong> your next cycle ($45 instead of $50).</p>
        </div>

        <button type="submit" class="submit-btn">Submit Request</button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useUserStore } from '../stores/user';
import { useRouter } from 'vue-router';

const userStore = useUserStore();
const router = useRouter();

const formData = ref({
  orgName: '',
  contactPerson: '',
  contactEmail: '',
  usageType: '',
  requirements: '',
});

const submitForm = () => {
  userStore.submitEnterpriseRequest(formData.value);
  router.push('/enterprise-confirmation');
};
</script>

<style scoped>
.enterprise-form-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f0f2f5;
  padding: 40px 20px;
}

.form-card {
  background-color: #ffffff;
  border-radius: 12px;
  padding: 40px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 600px;
}

.form-header {
  text-align: center;
  margin-bottom: 30px;
}

.title {
  font-size: 2rem;
  font-weight: 700;
  color: #1a1a1a;
}

.subtitle {
  font-size: 1rem;
  color: #666;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  font-weight: 600;
  color: #333;
}

.form-group input,
.form-group select,
.form-group textarea {
  width: 100%;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 1rem;
}

.pricing-info {
  background-color: #f9f9f9;
  border-radius: 8px;
  padding: 15px;
  margin: 30px 0;
  text-align: center;
}

.price {
  font-size: 1.1rem;
  color: #333;
  margin: 0 0 10px 0;
}

.discount {
  font-size: 0.9rem;
  color: #666;
  margin: 0;
}

.submit-btn {
  background-color: #6c5ce7;
  color: #ffffff;
  font-size: 1.1rem;
  font-weight: 600;
  border: none;
  border-radius: 8px;
  padding: 15px;
  cursor: pointer;
  width: 100%;
  transition: background-color 0.2s;
}

.submit-btn:hover {
  background-color: #5a4cdb;
}
</style>