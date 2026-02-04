import { createRouter, createWebHistory } from "vue-router";
import { adminRoutes } from "./routerAdmin";
import { publicRoutes } from "./routerGuest";
import { useAdminStore } from "@/stores/admin";
import { useUserStore } from "@/stores/user";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [...adminRoutes, ...publicRoutes],
  scrollBehavior(to, from, savedPosition) {
    return savedPosition || { left: 0, top: 0 };
  },
});

router.beforeEach((to, from, next) => {
  const adminStore = useAdminStore();
  const userStore = useUserStore();

  if (to.path.startsWith('/admin/') && to.path !== '/admin/auth/signin' && !adminStore.admin.isAuthenticated) {
    next('/admin/auth/signin');
    return;
  }

  if (to.meta.requiresAuth && !userStore.user.isAuthenticated) {
    next('/login');
    return;
  }

  next();
});

export default router;