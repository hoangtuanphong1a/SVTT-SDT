import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/HomeView.vue'),
    meta: { title: 'Hệ thống đào tạo' }
  },
  {
    path: '/java-core',
    name: 'java-core',
    component: () => import('../views/JavaCoreView.vue'),
    meta: { title: 'Đào tạo Java Core' }
  },
  {
    path: '/spring-boot',
    name: 'spring-boot',
    component: () => import('../views/SpringBootView.vue'),
    meta: { title: 'Đào tạo Spring Boot' }
  },
  {
    path: '/vuejs',
    name: 'vuejs',
    component: () => import('../views/VueJSView.vue'),
    meta: { title: 'Đào tạo VueJS' }
  },
  {
    path: '/java-core/:topic',
    name: 'java-core-topic',
    component: () => import('../views/JavaCoreTopicView.vue'),
    meta: { title: 'Chi tiết Java Core' }
  },
  {
    path: '/spring-boot/:topic',
    name: 'spring-boot-topic',
    component: () => import('../views/SpringBootTopicView.vue'),
    meta: { title: 'Chi tiết Spring Boot' }
  },
  {
    path: '/vuejs/:topic',
    name: 'vuejs-topic',
    component: () => import('../views/VueJSTopicView.vue'),
    meta: { title: 'Chi tiết VueJS' }
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

// Set page title
router.beforeEach((to, from, next) => {
  document.title = to.meta.title || 'Hệ thống đào tạo'
  next()
})

export default router