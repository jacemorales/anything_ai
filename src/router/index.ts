import { createRouter, createWebHistory } from 'vue-router';
import SubscriptionView from '../views/SubscriptionView.vue';
import ChatView from '../views/ChatView.vue';
import EnterpriseFormView from '../views/EnterpriseFormView.vue';
import EnterpriseConfirmationView from '../views/EnterpriseConfirmationView.vue';
import AuthView from '../views/AuthView.vue';

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: AuthView,
  },
  {
    path: '/',
    name: 'Subscription',
    component: SubscriptionView,
    meta: { requiresAuth: true },
  },
  {
    path: '/chat',
    name: 'Chat',
    component: ChatView,
    meta: { requiresAuth: true },
  },
  {
    path: '/enterprise-form',
    name: 'EnterpriseForm',
    component: EnterpriseFormView,
    meta: { requiresAuth: true },
  },
  {
    path: '/enterprise-confirmation',
    name: 'EnterpriseConfirmation',
    component: EnterpriseConfirmationView,
    meta: { requiresAuth: true },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Navigation Guard
router.beforeEach((to, from, next) => {
  const isAuthenticated = !!localStorage.getItem('authToken');
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

  if (requiresAuth && !isAuthenticated) {
    // Redirect unauthenticated users to the login page
    next({ name: 'Login' });
  } else if (to.name === 'Login' && isAuthenticated) {
    // Redirect authenticated users away from the login page
    next({ name: 'Subscription' });
  } else {
    // Allow navigation
    next();
  }
});

export default router;