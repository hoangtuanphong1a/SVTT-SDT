<script setup>
import { ref, reactive } from 'vue'
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'

const currentStep = ref(1)
const isPreviewMode = ref(false)

const cvData = reactive({
  // Personal Info
  fullName: '',
  email: '',
  phone: '',
  address: '',
  birthday: '',
  website: '',
  linkedin: '',
  
  // Summary
  summary: '',
  
  // Work Experience
  experiences: [
    {
      company: '',
      position: '',
      startDate: '',
      endDate: '',
      description: '',
      isCurrent: false
    }
  ],
  
  // Education
  educations: [
    {
      school: '',
      degree: '',
      field: '',
      startDate: '',
      endDate: '',
      description: ''
    }
  ],
  
  // Skills
  skills: [],
  newSkill: '',
  
  // Languages
  languages: [
    { name: 'Tiếng Việt', level: 'Bản ngữ' }
  ],
  
  // Certificates
  certificates: [
    {
      name: '',
      issuer: '',
      date: ''
    }
  ],
  
  // Projects
  projects: [
    {
      name: '',
      description: '',
      link: ''
    }
  ]
})

const addExperience = () => {
  cvData.experiences.push({
    company: '',
    position: '',
    startDate: '',
    endDate: '',
    description: '',
    isCurrent: false
  })
}

const removeExperience = (index) => {
  cvData.experiences.splice(index, 1)
}

const addEducation = () => {
  cvData.educations.push({
    school: '',
    degree: '',
    field: '',
    startDate: '',
    endDate: '',
    description: ''
  })
}

const removeEducation = (index) => {
  cvData.educations.splice(index, 1)
}

const addSkill = () => {
  if (cvData.newSkill.trim()) {
    cvData.skills.push(cvData.newSkill.trim())
    cvData.newSkill = ''
  }
}

const removeSkill = (index) => {
  cvData.skills.splice(index, 1)
}

const addLanguage = () => {
  cvData.languages.push({ name: '', level: '' })
}

const removeLanguage = (index) => {
  cvData.languages.splice(index, 1)
}

const addCertificate = () => {
  cvData.certificates.push({ name: '', issuer: '', date: '' })
}

const removeCertificate = (index) => {
  cvData.certificates.splice(index, 1)
}

const addProject = () => {
  cvData.projects.push({ name: '', description: '', link: '' })
}

const removeProject = (index) => {
  cvData.projects.splice(index, 1)
}

const nextStep = () => {
  if (currentStep.value < 5) {
    currentStep.value++
  }
}

const prevStep = () => {
  if (currentStep.value > 1) {
    currentStep.value--
  }
}

const downloadCV = () => {
  alert('Tính năng đang được phát triển!')
}
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <Header />
    
    <!-- Editor Header -->
    <div class="bg-white border-b border-gray-200 sticky top-16 z-40">
      <div class="container mx-auto px-4 py-3">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-4">
            <router-link to="/cv-builder" class="text-gray-600 hover:text-[#f26b38]">
              <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
              </svg>
            </router-link>
            <h1 class="text-lg font-semibold">Tạo CV của bạn</h1>
          </div>
          
          <!-- Steps Indicator -->
          <div class="hidden md:flex items-center gap-2">
            <div v-for="step in 5" :key="step" class="flex items-center">
              <div 
                class="w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors"
                :class="currentStep >= step ? 'bg-[#f26b38] text-white' : 'bg-gray-200 text-gray-600'"
              >
                {{ step }}
              </div>
              <div v-if="step < 5" class="w-8 h-0.5" :class="currentStep > step ? 'bg-[#f26b38]' : 'bg-gray-200'"></div>
            </div>
          </div>
          
          <div class="flex items-center gap-2">
            <button 
              @click="isPreviewMode = !isPreviewMode"
              class="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium"
            >
              {{ isPreviewMode ? 'Chỉnh sửa' : 'Xem trước' }}
            </button>
            <button 
              @click="downloadCV"
              class="px-4 py-2 bg-[#f26b38] hover:bg-[#e05a27] text-white rounded-lg transition-colors text-sm font-medium"
            >
              Tải PDF
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div class="container mx-auto px-4 py-8">
      <div class="grid lg:grid-cols-3 gap-8">
        <!-- Form Section -->
        <div class="lg:col-span-2">
          <!-- Step 1: Personal Info -->
          <div v-show="currentStep === 1" class="bg-white rounded-xl border border-gray-200 p-6">
            <h2 class="text-xl font-bold mb-6">Thông tin cá nhân</h2>
            
            <div class="grid md:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Họ và tên *</label>
                <input 
                  v-model="cvData.fullName"
                  type="text" 
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#f26b38] focus:border-transparent"
                  placeholder="Nguyễn Văn A"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Ngày sinh</label>
                <input 
                  v-model="cvData.birthday"
                  type="date" 
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#f26b38] focus:border-transparent"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                <input 
                  v-model="cvData.email"
                  type="email" 
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#f26b38] focus:border-transparent"
                  placeholder="email@example.com"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Số điện thoại *</label>
                <input 
                  v-model="cvData.phone"
                  type="tel" 
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#f26b38] focus:border-transparent"
                  placeholder="0912 345 678"
                />
              </div>
              <div class="md:col-span-2">
                <label class="block text-sm font-medium text-gray-700 mb-1">Địa chỉ</label>
                <input 
                  v-model="cvData.address"
                  type="text" 
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#f26b38] focus:border-transparent"
                  placeholder="Hà Nội, Việt Nam"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Website cá nhân</label>
                <input 
                  v-model="cvData.website"
                  type="url" 
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#f26b38] focus:border-transparent"
                  placeholder="https://yourwebsite.com"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">LinkedIn</label>
                <input 
                  v-model="cvData.linkedin"
                  type="url" 
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#f26b38] focus:border-transparent"
                  placeholder="https://linkedin.com/in/yourprofile"
                />
              </div>
            </div>
            
            <div class="mt-6">
              <label class="block text-sm font-medium text-gray-700 mb-1">Tóm tắt về bản thân</label>
              <textarea 
                v-model="cvData.summary"
                rows="4"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#f26b38] focus:border-transparent"
                placeholder="Giới thiệu ngắn gọn về bản thân, mục tiêu nghề nghiệp..."
              ></textarea>
            </div>
          </div>
          
          <!-- Step 2: Work Experience -->
          <div v-show="currentStep === 2" class="bg-white rounded-xl border border-gray-200 p-6">
            <div class="flex items-center justify-between mb-6">
              <h2 class="text-xl font-bold">Kinh nghiệm làm việc</h2>
              <button @click="addExperience" class="text-[#f26b38] hover:text-[#e05a27] font-medium text-sm">
                + Thêm kinh nghiệm
              </button>
            </div>
            
            <div v-for="(exp, index) in cvData.experiences" :key="index" class="mb-6 pb-6 border-b border-gray-200 last:border-0">
              <div class="flex justify-between items-start mb-4">
                <h3 class="font-medium">Kinh nghiệm {{ index + 1 }}</h3>
                <button v-if="cvData.experiences.length > 1" @click="removeExperience(index)" class="text-red-500 hover:text-red-700 text-sm">
                  Xóa
                </button>
              </div>
              
              <div class="grid md:grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Tên công ty</label>
                  <input 
                    v-model="exp.company"
                    type="text" 
                    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#f26b38] focus:border-transparent"
                    placeholder="Công ty ABC"
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Vị trí công việc</label>
                  <input 
                    v-model="exp.position"
                    type="text" 
                    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#f26b38] focus:border-transparent"
                    placeholder="Senior Developer"
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Từ ngày</label>
                  <input 
                    v-model="exp.startDate"
                    type="month" 
                    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#f26b38] focus:border-transparent"
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Đến ngày</label>
                  <input 
                    v-model="exp.endDate"
                    type="month" 
                    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#f26b38] focus:border-transparent"
                    :disabled="exp.isCurrent"
                  />
                  <label class="flex items-center gap-2 mt-2">
                    <input v-model="exp.isCurrent" type="checkbox" class="rounded text-[#f26b38]">
                    <span class="text-sm text-gray-600">Hiện tại</span>
                  </label>
                </div>
                <div class="md:col-span-2">
                  <label class="block text-sm font-medium text-gray-700 mb-1">Mô tả công việc</label>
                  <textarea 
                    v-model="exp.description"
                    rows="3"
                    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#f26b38] focus:border-transparent"
                    placeholder="Mô tả các công việc và thành tích..."
                  ></textarea>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Step 3: Education -->
          <div v-show="currentStep === 3" class="bg-white rounded-xl border border-gray-200 p-6">
            <div class="flex items-center justify-between mb-6">
              <h2 class="text-xl font-bold">Học vấn</h2>
              <button @click="addEducation" class="text-[#f26b38] hover:text-[#e05a27] font-medium text-sm">
                + Thêm học vấn
              </button>
            </div>
            
            <div v-for="(edu, index) in cvData.educations" :key="index" class="mb-6 pb-6 border-b border-gray-200 last:border-0">
              <div class="flex justify-between items-start mb-4">
                <h3 class="font-medium">Học vấn {{ index + 1 }}</h3>
                <button v-if="cvData.educations.length > 1" @click="removeEducation(index)" class="text-red-500 hover:text-red-700 text-sm">
                  Xóa
                </button>
              </div>
              
              <div class="grid md:grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Trường học</label>
                  <input 
                    v-model="edu.school"
                    type="text" 
                    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#f26b38] focus:border-transparent"
                    placeholder="Đại học Bách Khoa Hà Nội"
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Bằng cấp</label>
                  <input 
                    v-model="edu.degree"
                    type="text" 
                    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#f26b38] focus:border-transparent"
                    placeholder="Cử nhân / Kỹ sư"
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Chuyên ngành</label>
                  <input 
                    v-model="edu.field"
                    type="text" 
                    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#f26b38] focus:border-transparent"
                    placeholder="Công nghệ thông tin"
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Thời gian</label>
                  <div class="flex gap-2">
                    <input 
                      v-model="edu.startDate"
                      type="month" 
                      class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#f26b38] focus:border-transparent"
                    />
                    <input 
                      v-model="edu.endDate"
                      type="month" 
                      class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#f26b38] focus:border-transparent"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Step 4: Skills -->
          <div v-show="currentStep === 4" class="bg-white rounded-xl border border-gray-200 p-6">
            <h2 class="text-xl font-bold mb-6">Kỹ năng & Ngôn ngữ</h2>
            
            <!-- Skills -->
            <div class="mb-6">
              <label class="block text-sm font-medium text-gray-700 mb-2">Kỹ năng</label>
              <div class="flex gap-2 mb-3">
                <input 
                  v-model="cvData.newSkill"
                  type="text" 
                  class="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#f26b38] focus:border-transparent"
                  placeholder="Nhập kỹ năng..."
                  @keyup.enter="addSkill"
                />
                <button 
                  @click="addSkill"
                  class="px-4 py-2 bg-[#f26b38] text-white rounded-lg hover:bg-[#e05a27]"
                >
                  Thêm
                </button>
              </div>
              <div class="flex flex-wrap gap-2">
                <span 
                  v-for="(skill, index) in cvData.skills" 
                  :key="index"
                  class="px-3 py-1 bg-orange-100 text-[#f26b38] rounded-full text-sm flex items-center gap-2"
                >
                  {{ skill }}
                  <button @click="removeSkill(index)" class="hover:text-red-500">×</button>
                </span>
              </div>
            </div>
            
            <!-- Languages -->
            <div>
              <div class="flex items-center justify-between mb-4">
                <label class="block text-sm font-medium text-gray-700">Ngoại ngữ</label>
                <button @click="addLanguage" class="text-[#f26b38] hover:text-[#e05a27] font-medium text-sm">
                  + Thêm ngôn ngữ
                </button>
              </div>
              <div v-for="(lang, index) in cvData.languages" :key="index" class="flex gap-2 mb-2">
                <input 
                  v-model="lang.name"
                  type="text" 
                  class="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#f26b38] focus:border-transparent"
                  placeholder="Tên ngôn ngữ"
                />
                <input 
                  v-model="lang.level"
                  type="text" 
                  class="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#f26b38] focus:border-transparent"
                  placeholder="Trình độ (VD: Bản ngữ, TOEIC 800...)"
                />
                <button v-if="cvData.languages.length > 1" @click="removeLanguage(index)" class="text-red-500 hover:text-red-700">
                  ×
                </button>
              </div>
            </div>
          </div>
          
          <!-- Step 5: Certificates & Projects -->
          <div v-show="currentStep === 5" class="bg-white rounded-xl border border-gray-200 p-6">
            <h2 class="text-xl font-bold mb-6">Chứng chỉ & Dự án</h2>
            
            <!-- Certificates -->
            <div class="mb-6">
              <div class="flex items-center justify-between mb-4">
                <h3 class="font-medium">Chứng chỉ</h3>
                <button @click="addCertificate" class="text-[#f26b38] hover:text-[#e05a27] font-medium text-sm">
                  + Thêm chứng chỉ
                </button>
              </div>
              <div v-for="(cert, index) in cvData.certificates" :key="index" class="mb-4 p-4 bg-gray-50 rounded-lg">
                <div class="flex justify-end mb-2">
                  <button v-if="cvData.certificates.length > 1" @click="removeCertificate(index)" class="text-red-500 hover:text-red-700 text-sm">
                    Xóa
                  </button>
                </div>
                <div class="grid md:grid-cols-3 gap-4">
                  <input 
                    v-model="cert.name"
                    type="text" 
                    class="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#f26b38] focus:border-transparent"
                    placeholder="Tên chứng chỉ"
                  />
                  <input 
                    v-model="cert.issuer"
                    type="text" 
                    class="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#f26b38] focus:border-transparent"
                    placeholder="Nơi cấp"
                  />
                  <input 
                    v-model="cert.date"
                    type="month" 
                    class="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#f26b38] focus:border-transparent"
                  />
                </div>
              </div>
            </div>
            
            <!-- Projects -->
            <div>
              <div class="flex items-center justify-between mb-4">
                <h3 class="font-medium">Dự án</h3>
                <button @click="addProject" class="text-[#f26b38] hover:text-[#e05a27] font-medium text-sm">
                  + Thêm dự án
                </button>
              </div>
              <div v-for="(project, index) in cvData.projects" :key="index" class="mb-4 p-4 bg-gray-50 rounded-lg">
                <div class="flex justify-end mb-2">
                  <button v-if="cvData.projects.length > 1" @click="removeProject(index)" class="text-red-500 hover:text-red-700 text-sm">
                    Xóa
                  </button>
                </div>
                <div class="space-y-3">
                  <input 
                    v-model="project.name"
                    type="text" 
                    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#f26b38] focus:border-transparent"
                    placeholder="Tên dự án"
                  />
                  <textarea 
                    v-model="project.description"
                    rows="2"
                    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#f26b38] focus:border-transparent"
                    placeholder="Mô tả dự án"
                  ></textarea>
                  <input 
                    v-model="project.link"
                    type="url" 
                    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#f26b38] focus:border-transparent"
                    placeholder="Link dự án (GitHub, Demo...)"
                  />
                </div>
              </div>
            </div>
          </div>
          
          <!-- Navigation Buttons -->
          <div class="flex justify-between mt-6">
            <button 
              v-if="currentStep > 1"
              @click="prevStep"
              class="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium"
            >
              Quay lại
            </button>
            <div v-else></div>
            
            <button 
              v-if="currentStep < 5"
              @click="nextStep"
              class="px-6 py-2 bg-[#f26b38] hover:bg-[#e05a27] text-white rounded-lg transition-colors font-medium"
            >
              Tiếp theo
            </button>
            <button 
              v-else
              @click="downloadCV"
              class="px-6 py-2 bg-[#f26b38] hover:bg-[#e05a27] text-white rounded-lg transition-colors font-medium"
            >
              Hoàn thành & Tải PDF
            </button>
          </div>
        </div>
        
        <!-- Preview Section -->
        <div class="lg:col-span-1">
          <div class="bg-white rounded-xl border border-gray-200 p-6 sticky top-32">
            <h3 class="text-lg font-bold mb-4">Xem trước CV</h3>
            <div class="aspect-[3/4] bg-gray-100 rounded-lg flex items-center justify-center">
              <div class="text-center p-8">
                <div class="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span class="text-3xl">📄</span>
                </div>
                <p class="text-gray-500 text-sm">Nhấn "Xem trước" để xem CV của bạn</p>
              </div>
            </div>
            
            <div class="mt-4 space-y-2">
              <div class="text-sm text-gray-600">
                <span class="font-medium">Bước {{ currentStep }}/5:</span>
                <span v-if="currentStep === 1"> Thông tin cá nhân</span>
                <span v-else-if="currentStep === 2"> Kinh nghiệm làm việc</span>
                <span v-else-if="currentStep === 3"> Học vấn</span>
                <span v-else-if="currentStep === 4"> Kỹ năng</span>
                <span v-else> Chứng chỉ & Dự án</span>
              </div>
              
              <div class="w-full bg-gray-200 rounded-full h-2">
                <div 
                  class="bg-[#f26b38] h-2 rounded-full transition-all"
                  :style="{ width: `${(currentStep / 5) * 100}%` }"
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <Footer />
  </div>
</template>
