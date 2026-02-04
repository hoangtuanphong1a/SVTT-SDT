import { reactive } from 'vue'

export const store = reactive({
  // User state
  user: null,
  isAuthenticated: false,
  
  // Job state
  jobs: [],
  companies: [],
  
  // UI state
  isLoading: false,
  notifications: [],
  
  // Actions
  setUser(user) {
    this.user = user
    this.isAuthenticated = !!user
  },
  
  logout() {
    this.user = null
    this.isAuthenticated = false
    localStorage.removeItem('token')
    localStorage.removeItem('role')
  },
  
  setLoading(loading) {
    this.isLoading = loading
  },
  
  addNotification(notification) {
    this.notifications.push({
      ...notification,
      id: Date.now()
    })
  },
  
  removeNotification(id) {
    this.notifications = this.notifications.filter(n => n.id !== id)
  }
})