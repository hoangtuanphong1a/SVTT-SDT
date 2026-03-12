<script setup>
import { onMounted, ref } from 'vue'
import { store } from '../../store'
import axios from 'axios'

const profile = ref({
  id: '',
  fullName: '',
  email: '',
  phone: '',
  position: '',
  department: '',
  permissions: [],
  avatar: ''
})
const isLoading = ref(false)
const error = ref('')
const success = ref(false)
const isEditing = ref(false)
const avatarFile = ref(null)
const avatarPreview = ref('')

const loadProfile = async () => {
  isLoading.value = true
  error.value = ''
  try {
    const token = localStorage.getItem('token')
    const response = await axios.get('http://localhost:8080/api/admin/users/profile', {
      headers: { Authorization: `Bearer ${token}` }
    })
    
    if (response.data && response.data.data) {
      profile.value = response.data.data
    }
  } catch (err) {
    console.error('Error loading profile:', err)
    error.value = 'Tải thông tin cá nhân thất bại. Vui lòng thử lại.'
  } finally {
    isLoading.value = false
  }
}

const updateProfile = async () => {
  isLoading.value = true
  error.value = ''
  success.value = false
  
  try {
    const token = localStorage.getItem('token')
    await axios.put('http://localhost:8080/api/admin/profile', profile.value, {
      headers: { Authorization: `Bearer ${token}` }
    })
    success.value = true
    isEditing.value = false
    store.setUser(profile.value)
    store.addNotification({
      type: 'success',
      message: 'Cập nhật hồ sơ thành công!'
    })
  } catch (err) {
    console.error('Error updating profile:', err)
    error.value = err.response?.data?.message || 'Cập nhật thất bại. Vui lòng thử lại.'
  } finally {
    isLoading.value = false
  }
}

const handleAvatarChange = (event) => {
  const file = event.target.files[0]
  if (file) {
    avatarFile.value = file
    const reader = new FileReader()
    reader.onload = (e) => {
      avatarPreview.value = e.target.result
    }
    reader.readAsDataURL(file)
  }
}

const uploadAvatar = async () => {
  if (!avatarFile.value) return
  
  isLoading.value = true
  error.value = ''
  
  try {
    const token = localStorage.getItem('token')
    const formData = new FormData()
    formData.append('avatar', avatarFile.value)
    
    const response = await axios.post('http://localhost:8080/api/admin/profile/avatar', formData, {
      headers: { 
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data'
      }
    })
    
    if (response.data && response.data.data) {
      profile.value.avatar = response.data.data.avatar
      avatarPreview.value = ''
      avatarFile.value = null
      store.setUser(profile.value)
      store.addNotification({
        type: 'success',
        message: 'Thay đổi ảnh đại diện thành công!'
      })
    }
  } catch (err) {
    console.error('Error uploading avatar:', err)
    error.value = err.response?.data?.message || 'Tải lên ảnh đại diện thất bại. Vui lòng thử lại.'
  } finally {
    isLoading.value = false
  }
}

const addSkill = () => {
  if (profile.value.skills.length < 10) {
    profile.value.skills.push('')
  }
}

const removeSkill = (index) => {
  profile.value.skills.splice(index, 1)
}

onMounted(() => {
  loadProfile()
})
</script>

<template>
  <div class="admin-profile">
    <div class="container mx-auto px-4 py-8">
      <div class="profile-header text-center mb-12">
        <h1 class="text-4xl lg:text-5xl font-bold mb-4">Hồ sơ cá nhân</h1>
        <p class="text-lg text-gray-600">Quản lý thông tin cá nhân và cài đặt tài khoản của bạn</p>
      </div>

      <div v-if="isLoading" class="loading text-center py-12">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-[#f26b38] mx-auto"></div>
        <p class="mt-4 text-gray-600">Đang tải...</p>
      </div>
      
      <div v-else class="profile-content max-w-6xl mx-auto">
        <!-- Profile Card -->
        <div class="bg-white rounded-2xl shadow-xl border border-gray-200 p-8 mb-8">
          <div class="grid lg:grid-cols-3 gap-8">
            <!-- Avatar Section -->
            <div class="lg:col-span-1 text-center">
              <div class="relative inline-block">
                <div class="w-32 h-32 bg-gradient-to-br from-[#f26b38] to-[#e05a27] rounded-full flex items-center justify-center text-white text-4xl font-bold mx-auto mb-4 shadow-lg overflow-hidden">
                  <img v-if="avatarPreview || profile.avatar" :src="avatarPreview || profile.avatar" alt="Avatar" class="w-full h-full object-cover" />
                  <span v-else>{{ store.user?.fullName?.charAt(0) || 'U' }}</span>
                </div>
                <div class="absolute -bottom-2 -right-2 bg-white rounded-full p-2 shadow-lg border-2 border-white">
                  <label class="cursor-pointer text-gray-400 hover:text-[#f26b38] transition-colors">
                    <input type="file" @change="handleAvatarChange" accept="image/*" class="hidden" />
                    <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"/>
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"/>
                    </svg>
                  </label>
                </div>
              </div>
              <p class="text-sm text-gray-500 mt-2">Thay đổi ảnh đại diện</p>
              <div v-if="avatarFile" class="mt-4">
                <button @click="uploadAvatar" :disabled="isLoading" class="px-4 py-2 bg-[#f26b38] hover:bg-[#e05a27] text-white rounded-lg font-medium transition-colors">
                  {{ isLoading ? 'Đang tải lên...' : 'Tải lên ảnh' }}
                </button>
              </div>
            </div>

            <!-- Info Section -->
            <div class="lg:col-span-2">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div class="space-y-2">
                  <label class="text-sm font-medium text-gray-700">Họ và tên</label>
                  <div v-if="!isEditing" class="bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-gray-900">
                    {{ profile.fullName }}
                  </div>
                  <input v-else v-model="profile.fullName" type="text" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#f26b38] focus:border-transparent transition-all" />
                </div>

                <div class="space-y-2">
                  <label class="text-sm font-medium text-gray-700">Email</label>
                  <div v-if="!isEditing" class="bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-gray-900">
                    {{ profile.email }}
                  </div>
                  <input v-else v-model="profile.email" type="email" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#f26b38] focus:border-transparent transition-all" />
                </div>

                <div class="space-y-2">
                  <label class="text-sm font-medium text-gray-700">Số điện thoại</label>
                  <div v-if="!isEditing" class="bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-gray-900">
                    {{ profile.phone }}
                  </div>
                  <input v-else v-model="profile.phone" type="tel" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#f26b38] focus:border-transparent transition-all" />
                </div>

                <div class="space-y-2">
                  <label class="text-sm font-medium text-gray-700">Chức vụ</label>
                  <div v-if="!isEditing" class="bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-gray-900">
                    {{ profile.position }}
                  </div>
                  <input v-else v-model="profile.position" type="text" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#f26b38] focus:border-transparent transition-all" />
                </div>

                <div class="space-y-2">
                  <label class="text-sm font-medium text-gray-700">Phòng ban</label>
                  <div v-if="!isEditing" class="bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-gray-900">
                    {{ profile.department }}
                  </div>
                  <input v-else v-model="profile.department" type="text" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#f26b38] focus:border-transparent transition-all" />
                </div>

                <div class="space-y-2 md:col-span-2">
                  <label class="text-sm font-medium text-gray-700">Quyền truy cập</label>
                  <div v-if="!isEditing" class="bg-gray-50 border border-gray-200 rounded-lg px-4 py-3">
                    <div class="flex flex-wrap gap-2">
                      <span v-for="permission in profile.permissions" :key="permission" class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-[#f26b38]/10 text-[#f26b38]">
                        {{ permission }}
                      </span>
                    </div>
                  </div>
                  <div v-else class="bg-gray-50 border border-gray-200 rounded-lg p-4">
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <label class="flex items-center space-x-3 p-3 bg-white rounded-lg border border-gray-200 hover:bg-orange-50 transition-colors">
                        <input type="checkbox" id="manage_users" class="h-4 w-4 text-[#f26b38] focus:ring-[#f26b38]" />
                        <span class="text-sm font-medium text-gray-700">Quản lý người dùng</span>
                      </label>
                      <label class="flex items-center space-x-3 p-3 bg-white rounded-lg border border-gray-200 hover:bg-orange-50 transition-colors">
                        <input type="checkbox" id="manage_jobs" class="h-4 w-4 text-[#f26b38] focus:ring-[#f26b38]" />
                        <span class="text-sm font-medium text-gray-700">Quản lý việc làm</span>
                      </label>
                      <label class="flex items-center space-x-3 p-3 bg-white rounded-lg border border-gray-200 hover:bg-orange-50 transition-colors">
                        <input type="checkbox" id="manage_companies" class="h-4 w-4 text-[#f26b38] focus:ring-[#f26b38]" />
                        <span class="text-sm font-medium text-gray-700">Quản lý công ty</span>
                      </label>
                      <label class="flex items-center space-x-3 p-3 bg-white rounded-lg border border-gray-200 hover:bg-orange-50 transition-colors">
                        <input type="checkbox" id="manage_blog" class="h-4 w-4 text-[#f26b38] focus:ring-[#f26b38]" />
                        <span class="text-sm font-medium text-gray-700">Quản lý blog</span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Messages -->
              <div v-if="error" class="mt-4 bg-red-50 border border-red-200 rounded-lg p-4">
                <p class="text-red-600 text-sm">{{ error }}</p>
              </div>

              <div v-if="success" class="mt-4 bg-green-50 border border-green-200 rounded-lg p-4">
                <p class="text-green-600 text-sm">Cập nhật hồ sơ thành công!</p>
              </div>

              <!-- Actions -->
              <div class="mt-8 flex items-center justify-between">
                <div v-if="!isEditing" class="flex gap-4">
                  <button @click="isEditing = true" class="px-6 py-3 bg-[#f26b38] hover:bg-[#e05a27] text-white rounded-lg font-medium transform hover:scale-105 transition-all shadow-lg">
                    Chỉnh sửa hồ sơ
                  </button>
                  <router-link to="/change-password" class="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-orange-50 hover:border-gray-400 font-medium transition-all">
                    Đổi mật khẩu
                  </router-link>
                </div>
                
                <div v-else class="flex gap-4">
                  <button @click="updateProfile" :disabled="isLoading" class="px-6 py-3 bg-[#f26b38] hover:bg-[#e05a27] text-white rounded-lg font-medium transform hover:scale-105 transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed">
                    {{ isLoading ? 'Đang cập nhật...' : 'Lưu thay đổi' }}
                  </button>
                  <button @click="isEditing = false" class="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-orange-50 hover:border-gray-400 font-medium transition-all">
                    Hủy
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Account Settings -->
        <div class="bg-white rounded-2xl shadow-xl border border-gray-200 p-8">
          <h2 class="text-2xl font-bold mb-6 text-gray-900">Cài đặt tài khoản</h2>
          <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div class="group cursor-pointer">
              <div class="bg-gradient-to-br from-orange-50 to-red-50 rounded-xl p-6 border border-gray-200 hover:border-[#f26b38] hover:shadow-xl transition-all transform hover:scale-105">
                <div class="flex items-center gap-3 mb-4">
                  <div class="w-12 h-12 bg-gradient-to-br from-[#f26b38] to-[#e05a27] rounded-full flex items-center justify-center text-white">
                    <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                    </svg>
                  </div>
                  <div>
                    <h3 class="font-semibold text-gray-900">Đổi mật khẩu</h3>
                    <p class="text-sm text-gray-600">Thay đổi mật khẩu tài khoản</p>
                  </div>
                </div>
                <router-link to="/change-password" class="inline-flex items-center text-[#f26b38] font-medium hover:text-[#e05a27] transition-colors">
                  Thiết lập ngay
                  <svg class="h-4 w-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                  </svg>
                </router-link>
              </div>
            </div>

            <div class="group cursor-pointer">
              <div class="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-gray-200 hover:border-[#f26b38] hover:shadow-xl transition-all transform hover:scale-105">
                <div class="flex items-center gap-3 mb-4">
                  <div class="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white">
                    <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/>
                    </svg>
                  </div>
                  <div>
                    <h3 class="font-semibold text-gray-900">Thông báo</h3>
                    <p class="text-sm text-gray-600">Quản lý cài đặt thông báo</p>
                  </div>
                </div>
                <button class="inline-flex items-center text-blue-600 font-medium hover:text-blue-700 transition-colors">
                  Cài đặt
                  <svg class="h-4 w-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                  </svg>
                </button>
              </div>
            </div>

            <div class="group cursor-pointer">
              <div class="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border border-gray-200 hover:border-[#f26b38] hover:shadow-xl transition-all transform hover:scale-105">
                <div class="flex items-center gap-3 mb-4">
                  <div class="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center text-white">
                    <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
                    </svg>
                  </div>
                  <div>
                    <h3 class="font-semibold text-gray-900">Bảo mật</h3>
                    <p class="text-sm text-gray-600">Quản lý cài đặt bảo mật</p>
                  </div>
                </div>
                <button class="inline-flex items-center text-green-600 font-medium hover:text-green-700 transition-colors">
                  Bảo mật
                  <svg class="h-4 w-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                  </svg>
                </button>
              </div>
            </div>

            <div class="group cursor-pointer">
              <div class="bg-gradient-to-br from-red-50 to-pink-50 rounded-xl p-6 border border-gray-200 hover:border-[#f26b38] hover:shadow-xl transition-all transform hover:scale-105">
                <div class="flex items-center gap-3 mb-4">
                  <div class="w-12 h-12 bg-gradient-to-br from-red-500 to-pink-600 rounded-full flex items-center justify-center text-white">
                    <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                    </svg>
                  </div>
                  <div>
                    <h3 class="font-semibold text-gray-900">Xóa tài khoản</h3>
                    <p class="text-sm text-gray-600">Xóa vĩnh viễn tài khoản</p>
                  </div>
                </div>
                <button class="inline-flex items-center text-red-600 font-medium hover:text-red-700 transition-colors">
                  Xóa tài khoản
                  <svg class="h-4 w-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.admin-profile {
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
}

.loading {
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  border: 1px solid #e5e7eb;
}

.profile-header h1 {
  background: linear-gradient(135deg, #f26b38 0%, #e05a27 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.profile-header h1:hover {
  transform: translateY(-2px);
  transition: transform 0.3s ease;
}

/* Custom scrollbar for better UX */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: #a8a8a8;
}
</style>
