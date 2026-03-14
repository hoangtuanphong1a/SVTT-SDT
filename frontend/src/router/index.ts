import { createRouter, createWebHistory } from 'vue-router';

import { env } from '@/config/env';
import { AppRoute } from '@/constants';

const router = createRouter({
  history: createWebHistory(env.APP_BASE_PATH),
  routes: [
    {
      path: '/',
      component: () => import('@/layouts/master-layout/AppMasterLayout.vue'),
      children: [
        {
          path: '',
          name: 'Home',
          component: () => import('@/modules/home/HomePage.vue')
        },
        {
          path: 'blog',
          name: 'Blog',
          component: () => import('@/modules/blog/BlogPage.vue')
        },
        {
          path: 'blog/:id',
          name: 'BlogDetail',
          component: () => import('@/modules/blog/BlogDetailPage.vue')
        }
      ]
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: () => import('@/modules/exception/NotFound.vue')
    }
  ]
});

export default router;
