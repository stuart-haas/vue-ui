import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/layouts/LayoutDefault.vue'),
      children: [
        {
          path: '',
          name: 'dashboard',
          component: () => import('@/pages/Dashboard.vue'),
        },
      ],
    },
  ],
});

export default router;
