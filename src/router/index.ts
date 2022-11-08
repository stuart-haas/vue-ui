import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '',
      name: 'application',
      component: () => import('@/layouts/default.vue'),
      children: [
        {
          path: '',
          name: 'index',
          component: () => import('@/pages/index.vue'),
        },
      ],
    },
  ],
});

export default router;
