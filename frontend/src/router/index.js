import { createRouter, createWebHistory } from 'vue-router'

// Public routes
const publicRoutes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue')
  },
  {
    path: '/jobs',
    name: 'JobList',
    component: () => import('../views/JobList.vue')
  },
  {
    path: '/jobs/:id',
    name: 'JobDetail',
    component: () => import('../views/JobDetail.vue')
  },
  {
    path: '/companies',
    name: 'CompanyList',
    component: () => import('../views/CompanyList.vue')
  },
  {
    path: '/companies/:id',
    name: 'CompanyDetail',
    component: () => import('../views/CompanyDetail.vue')
  },
  {
    path: '/blog',
    name: 'Blog',
    component: () => import('../views/Blog.vue')
  },
  {
    path: '/blog/:id',
    name: 'BlogDetail',
    component: () => import('../views/BlogDetail.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/auth/Login.vue')
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../views/auth/Register.vue')
  }
]

// Job Seeker routes
const jobSeekerRoutes = [
  {
    path: '/dashboard',
    name: 'JobSeekerDashboard',
    component: () => import('../views/jobseeker/Dashboard.vue'),
    meta: { requiresAuth: true, role: 'jobseeker' }
  },
  {
    path: '/profile',
    name: 'JobSeekerProfile',
    component: () => import('../views/jobseeker/Profile.vue'),
    meta: { requiresAuth: true, role: 'jobseeker' }
  },
  {
    path: '/cv',
    name: 'CVList',
    component: () => import('../views/jobseeker/CVList.vue'),
    meta: { requiresAuth: true, role: 'jobseeker' }
  },
  {
    path: '/cv/create',
    name: 'CVCreate',
    component: () => import('../views/jobseeker/CVCreate.vue'),
    meta: { requiresAuth: true, role: 'jobseeker' }
  },
  {
    path: '/cv/:id/edit',
    name: 'CVEdit',
    component: () => import('../views/jobseeker/CVEdit.vue'),
    meta: { requiresAuth: true, role: 'jobseeker' }
  },
  {
    path: '/applications',
    name: 'Applications',
    component: () => import('../views/jobseeker/Applications.vue'),
    meta: { requiresAuth: true, role: 'jobseeker' }
  },
  {
    path: '/saved-jobs',
    name: 'SavedJobs',
    component: () => import('../views/jobseeker/SavedJobs.vue'),
    meta: { requiresAuth: true, role: 'jobseeker' }
  },
  {
    path: '/messages',
    name: 'Messages',
    component: () => import('../views/jobseeker/Messages.vue'),
    meta: { requiresAuth: true, role: 'jobseeker' }
  }
]

// Employer routes
const employerRoutes = [
  {
    path: '/employer/dashboard',
    name: 'EmployerDashboard',
    component: () => import('../views/employer/Dashboard.vue'),
    meta: { requiresAuth: true, role: 'employer' }
  },
  {
    path: '/employer/company',
    name: 'EmployerCompany',
    component: () => import('../views/employer/Company.vue'),
    meta: { requiresAuth: true, role: 'employer' }
  },
  {
    path: '/employer/profile',
    name: 'EmployerProfile',
    component: () => import('../views/employer/Profile.vue'),
    meta: { requiresAuth: true, role: 'employer' }
  },
  {
    path: '/employer/jobs',
    name: 'EmployerJobs',
    component: () => import('../views/employer/Jobs.vue'),
    meta: { requiresAuth: true, role: 'employer' }
  },
  {
    path: '/employer/jobs/create',
    name: 'JobCreate',
    component: () => import('../views/employer/JobCreate.vue'),
    meta: { requiresAuth: true, role: 'employer' }
  },
  {
    path: '/employer/jobs/:id/edit',
    name: 'JobEdit',
    component: () => import('../views/employer/JobEdit.vue'),
    meta: { requiresAuth: true, role: 'employer' }
  },
  {
    path: '/employer/candidates',
    name: 'Candidates',
    component: () => import('../views/employer/Candidates.vue'),
    meta: { requiresAuth: true, role: 'employer' }
  },
  {
    path: '/employer/cv-search',
    name: 'CVSearch',
    component: () => import('../views/employer/CVSearch.vue'),
    meta: { requiresAuth: true, role: 'employer' }
  },
  {
    path: '/employer/subscription',
    name: 'Subscription',
    component: () => import('../views/employer/Subscription.vue'),
    meta: { requiresAuth: true, role: 'employer' }
  }
]

// Admin routes
const adminRoutes = [
  {
    path: '/admin',
    name: 'AdminDashboard',
    component: () => import('../views/admin/Dashboard.vue'),
    meta: { requiresAuth: true, role: 'admin' }
  },
  {
    path: '/admin/users',
    name: 'AdminUsers',
    component: () => import('../views/admin/Users.vue'),
    meta: { requiresAuth: true, role: 'admin' }
  },
  {
    path: '/admin/companies',
    name: 'AdminCompanies',
    component: () => import('../views/admin/Companies.vue'),
    meta: { requiresAuth: true, role: 'admin' }
  },
  {
    path: '/admin/jobs',
    name: 'AdminJobs',
    component: () => import('../views/admin/Jobs.vue'),
    meta: { requiresAuth: true, role: 'admin' }
  },
  {
    path: '/admin/blog',
    name: 'AdminBlog',
    component: () => import('../views/admin/Blog.vue'),
    meta: { requiresAuth: true, role: 'admin' }
  },
  {
    path: '/admin/analytics',
    name: 'AdminAnalytics',
    component: () => import('../views/admin/Analytics.vue'),
    meta: { requiresAuth: true, role: 'admin' }
  }
]

const routes = [
  ...publicRoutes,
  ...jobSeekerRoutes,
  ...employerRoutes,
  ...adminRoutes,
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('../views/NotFound.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// Navigation guards
router.beforeEach((to, from, next) => {
  const isAuthenticated = !!localStorage.getItem('token')
  const userRole = localStorage.getItem('role')

  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!isAuthenticated) {
      next({
        name: 'Login',
        query: { redirect: to.fullPath }
      })
    } else if (to.meta.role && to.meta.role !== userRole) {
      next({ name: 'Home' })
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router