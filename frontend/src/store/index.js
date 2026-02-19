import { createStore } from 'vuex'
import api from '@/services/api'

const store = createStore({
  state: {
    user: null,
    token: localStorage.getItem('token') || null,
    loading: false,
    error: null
  },
  mutations: {
    SET_USER(state, user) {
      state.user = user
      localStorage.setItem('user', JSON.stringify(user))
    },
    SET_TOKEN(state, token) {
      state.token = token
      localStorage.setItem('token', token)
    },
    REMOVE_USER(state) {
      state.user = null
      localStorage.removeItem('user')
    },
    REMOVE_TOKEN(state) {
      state.token = null
      localStorage.removeItem('token')
    },
    SET_LOADING(state, loading) {
      state.loading = loading
    },
    SET_ERROR(state, error) {
      state.error = error
    }
  },
  actions: {
    async login({ commit }, credentials) {
      try {
        commit('SET_LOADING', true)
        const response = await api.post('/auth/login', credentials)
        const { token, user } = response.data
        commit('SET_TOKEN', token)
        commit('SET_USER', user)
        return user
      } catch (error) {
        commit('SET_ERROR', error.response?.data || 'Login failed')
        throw error
      } finally {
        commit('SET_LOADING', false)
      }
    },
    async register({ commit }, userData) {
      try {
        commit('SET_LOADING', true)
        const response = await api.post('/auth/register', userData)
        const { token, user } = response.data
        commit('SET_TOKEN', token)
        commit('SET_USER', user)
        return user
      } catch (error) {
        commit('SET_ERROR', error.response?.data || 'Registration failed')
        throw error
      } finally {
        commit('SET_LOADING', false)
      }
    },
    logout({ commit }) {
      commit('REMOVE_TOKEN')
      commit('REMOVE_USER')
    },
    async getCurrentUser({ commit }) {
      try {
        commit('SET_LOADING', true)
        const response = await api.get('/auth/profile')
        commit('SET_USER', response.data)
        return response.data
      } catch (error) {
        commit('SET_ERROR', error.response?.data || 'Failed to fetch user')
        throw error
      } finally {
        commit('SET_LOADING', false)
      }
    },
    async updateProfile({ commit }, profileData) {
      try {
        commit('SET_LOADING', true)
        const response = await api.put('/auth/profile', profileData)
        commit('SET_USER', response.data)
        return response.data
      } catch (error) {
        commit('SET_ERROR', error.response?.data || 'Failed to update profile')
        throw error
      } finally {
        commit('SET_LOADING', false)
      }
    }
  },
  getters: {
    isAuthenticated: (state) => !!state.user,
    getUser: (state) => state.user,
    getToken: (state) => state.token,
    isLoading: (state) => state.loading,
    getError: (state) => state.error
  }
})

export default store
export { store }
