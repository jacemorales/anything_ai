import { createRouter, createWebHistory } from 'vue-router';
import SubscriptionView from '../views/SubscriptionView.vue';
import ChatView from '../views/ChatView.vue';
import EnterpriseFormView from '../views/EnterpriseFormView.vue';
import EnterpriseConfirmationView from '../views/EnterpriseConfirmationView.vue';

const routes = [
  {
    path: '/',
    name: 'Subscription',
    component: SubscriptionView,
  },
  {
    path: '/chat',
    name: 'Chat',
    component: ChatView,
  },
  {
    path: '/enterprise-form',
    name: 'EnterpriseForm',
    component: EnterpriseFormView,
  },
  {
    path: '/enterprise-confirmation',
    name: 'EnterpriseConfirmation',
    component: EnterpriseConfirmationView,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;