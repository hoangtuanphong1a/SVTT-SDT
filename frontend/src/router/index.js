import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import Login from '@/views/auth/Login.vue'
import Register from '@/views/auth/Register.vue'
import JobList from '@/views/JobList.vue'
import JobDetail from '@/views/JobDetail.vue'
import CompanyList from '@/views/CompanyList.vue'
import CompanyDetail from '@/views/CompanyDetail.vue'
import Blog from '@/views/Blog.vue'
import BlogDetail from '@/views/BlogDetail.vue'
import CVBuilder from '@/views/CVBuilder.vue'
import CVEditor from '@/views/CVEditor.vue'
import CVTemplate from '@/views/CVTemplate.vue'
import InterviewPrep from '@/views/InterviewPrep.vue'
import JobAlerts from '@/views/JobAlerts.vue'
import Contact from '@/views/Contact.vue'
import About from '@/views/About.vue'
import Analytics from '@/views/admin/Analytics.vue'
import Dashboard from '@/views/admin/Dashboard.vue'
import Users from '@/views/admin/Users.vue'
import Jobs from '@/views/admin/Jobs.vue'
import Companies from '@/views/admin/Companies.vue'
import BlogAdmin from '@/views/admin/Blog.vue'
import EmployerDashboard from '@/views/employer/Dashboard.vue'
import EmployerProfile from '@/views/employer/Profile.vue'
import EmployerJobs from '@/views/employer/Jobs.vue'
import EmployerJobCreate from '@/views/employer/JobCreate.vue'
import EmployerJobEdit from '@/views/employer/JobEdit.vue'
import EmployerCandidates from '@/views/employer/Candidates.vue'
import EmployerCVSearch from '@/views/employer/CVSearch.vue'
import EmployerSubscription from '@/views/employer/Subscription.vue'
import JobseekerDashboard from '@/views/jobseeker/Dashboard.vue'
import JobseekerProfile from '@/views/jobseeker/Profile.vue'
import JobseekerApplications from '@/views/jobseeker/Applications.vue'
import JobseekerSavedJobs from '@/views/jobseeker/SavedJobs.vue'
import JobseekerMessages from '@/views/jobseeker/Messages.vue'
import JobseekerCVList from '@/views/jobseeker/CVList.vue'
import JobseekerCVCreate from '@/views/jobseeker/CVCreate.vue'
import JobseekerCVEdit from '@/views/jobseeker/CVEdit.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/jobs',
    name: 'JobList',
    component: JobList
  },
  {
    path: '/jobs/:id',
    name: 'JobDetail',
    component: JobDetail
  },
  {
    path: '/companies',
    name: 'CompanyList',
    component: CompanyList
  },
  {
    path: '/companies/:id',
    name: 'CompanyDetail',
    component: CompanyDetail
  },
  {
    path: '/blog',
    name: 'Blog',
    component: Blog
  },
  {
    path: '/blog/:id',
    name: 'BlogDetail',
    component: BlogDetail
  },
  {
    path: '/cv-builder',
    name: 'CVBuilder',
    component: CVBuilder
  },
  {
    path: '/cv-editor',
    name: 'CVEditor',
    component: CVEditor
  },
  {
    path: '/cv-templates',
    name: 'CVTemplate',
    component: CVTemplate
  },
  {
    path: '/interview-prep',
    name: 'InterviewPrep',
    component: InterviewPrep
  },
  {
    path: '/job-alerts',
    name: 'JobAlerts',
    component: JobAlerts
  },
  {
    path: '/contact',
    name: 'Contact',
    component: Contact
  },
  {
    path: '/about',
    name: 'About',
    component: About
  },
  {
    path: '/admin/dashboard',
    name: 'AdminDashboard',
    component: Dashboard,
    meta: { requiresAuth: true, requiresRole: 'ADMIN' }
  },
  {
    path: '/admin/analytics',
    name: 'AdminAnalytics',
    component: Analytics,
    meta: { requiresAuth: true, requiresRole: 'ADMIN' }
  },
  {
    path: '/admin/users',
    name: 'AdminUsers',
    component: Users,
    meta: { requiresAuth: true, requiresRole: 'ADMIN' }
  },
  {
    path: '/admin/jobs',
    name: 'AdminJobs',
    component: Jobs,
    meta: { requiresAuth: true, requiresRole: 'ADMIN' }
  },
  {
    path: '/admin/companies',
    name: 'AdminCompanies',
    component: Companies,
    meta: { requiresAuth: true, requiresRole: 'ADMIN' }
  },
  {
    path: '/admin/blog',
    name: 'AdminBlog',
    component: BlogAdmin,
    meta: { requiresAuth: true, requiresRole: 'ADMIN' }
  },
  {
    path: '/employer/dashboard',
    name: 'EmployerDashboard',
    component: EmployerDashboard,
    meta: { requiresAuth: true, requiresRole: 'EMPLOYER' }
  },
  {
    path: '/employer/profile',
    name: 'EmployerProfile',
    component: EmployerProfile,
    meta: { requiresAuth: true, requiresRole: 'EMPLOYER' }
  },
  {
    path: '/employer/jobs',
    name: 'EmployerJobs',
    component: EmployerJobs,
    meta: { requiresAuth: true, requiresRole: 'EMPLOYER' }
  },
  {
    path: '/employer/jobs/create',
    name: 'EmployerJobCreate',
    component: EmployerJobCreate,
    meta: { requiresAuth: true, requiresRole: 'EMPLOYER' }
  },
  {
    path: '/employer/jobs/:id/edit',
    name: 'EmployerJobEdit',
    component: EmployerJobEdit,
    meta: { requiresAuth: true, requiresRole: 'EMPLOYER' }
  },
  {
    path: '/employer/candidates',
    name: 'EmployerCandidates',
    component: EmployerCandidates,
    meta: { requiresAuth: true, requiresRole: 'EMPLOYER' }
  },
  {
    path: '/employer/cv-search',
    name: 'EmployerCVSearch',
    component: EmployerCVSearch,
    meta: { requiresAuth: true, requiresRole: 'EMPLOYER' }
  },
  {
    path: '/employer/subscription',
    name: 'EmployerSubscription',
    component: EmployerSubscription,
    meta: { requiresAuth: true, requiresRole: 'EMPLOYER' }
  },
  {
    path: '/jobseeker/dashboard',
    name: 'JobseekerDashboard',
    component: JobseekerDashboard,
    meta: { requiresAuth: true, requiresRole: 'JOBSEEKER' }
  },
  {
    path: '/jobseeker/profile',
    name: 'JobseekerProfile',
    component: JobseekerProfile,
    meta: { requiresAuth: true, requiresRole: 'JOBSEEKER' }
  },
  {
    path: '/jobseeker/applications',
    name: 'JobseekerApplications',
    component: JobseekerApplications,
    meta: { requiresAuth: true, requiresRole: 'JOBSEEKER' }
  },
  {
    path: '/jobseeker/saved-jobs',
    name: 'JobseekerSavedJobs',
    component: JobseekerSavedJobs,
    meta: { requiresAuth: true, requiresRole: 'JOBSEEKER' }
  },
  {
    path: '/jobseeker/messages',
    name: 'JobseekerMessages',
    component: JobseekerMessages,
    meta: { requiresAuth: true, requiresRole: 'JOBSEEKER' }
  },
  {
    path: '/jobseeker/cv-list',
    name: 'JobseekerCVList',
    component: JobseekerCVList,
    meta: { requiresAuth: true, requiresRole: 'JOBSEEKER' }
  },
  {
    path: '/jobseeker/cv/create',
    name: 'JobseekerCVCreate',
    component: JobseekerCVCreate,
    meta: { requiresAuth: true, requiresRole: 'JOBSEEKER' }
  },
  {
    path: '/jobseeker/cv/:id/edit',
    name: 'JobseekerCVEdit',
    component: JobseekerCVEdit,
    meta: { requiresAuth: true, requiresRole: 'JOBSEEKER' }
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('@/views/NotFound.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const requiresAuth = to.meta.requiresAuth
  const requiresRole = to.meta.requiresRole

  if (requiresAuth) {
    const user = JSON.parse(localStorage.getItem('user'))
    if (!user) {
      next('/login')
    } else if (requiresRole && user.role !== requiresRole) {
      next('/unauthorized')
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router