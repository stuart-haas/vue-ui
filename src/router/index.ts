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
          name: 'repositories',
          component: () => import('@/pages/Repositories.vue'),
        },
        {
          path: 'repositories/:owner/:name',
          component: () => import('@/pages/Repository.vue'),
        },
      ],
    },
  ],
});

export default router;
