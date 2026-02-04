<script setup>
import { onMounted, ref } from 'vue'
import { store } from '../../store'
import api from '../../services/api'

const subscriptions = ref([])
const currentPlan = ref(null)
const isLoading = ref(false)
const error = ref('')

const loadSubscriptions = async () => {
  isLoading.value = true
  error.value = ''
  try {
    const response = await api.get('/employer/subscriptions')
    subscriptions.value = response.data.plans
    currentPlan.value = response.data.currentPlan
  } catch (err) {
    console.error('Error loading subscriptions:', err)
    error.value = 'Tải thông tin gói dịch vụ thất bại. Vui lòng thử lại.'
  } finally {
    isLoading.value = false
  }
}

const subscribeToPlan = async (planId) => {
  if (!confirm('Bạn có chắc chắn muốn đăng ký gói dịch vụ này không?')) {
    return
  }

  try {
    await api.post(`/employer/subscriptions/${planId}`)
    store.addNotification({
      type: 'success',
      message: 'Đăng ký gói dịch vụ thành công!'
    })
    loadSubscriptions()
  } catch (err) {
    console.error('Error subscribing to plan:', err)
    store.addNotification({
      type: 'error',
      message: 'Đăng ký gói dịch vụ thất bại. Vui lòng thử lại.'
    })
  }
}

onMounted(() => {
  loadSubscriptions()
})
</script>

<template>
  <div class="subscription">
    <div class="container">
      <div class="subscription-header">
        <h1>Gói dịch vụ</h1>
        <p>Quản lý gói dịch vụ và các tính năng dành cho nhà tuyển dụng</p>
      </div>

      <div v-if="isLoading" class="loading">Đang tải...</div>
      <div v-else-if="error" class="error-message">{{ error }}</div>
      <div v-else class="subscription-content">
        <!-- Current Plan -->
        <div v-if="currentPlan" class="current-plan">
          <h2>Gói hiện tại</h2>
          <div class="plan-card current">
            <div class="plan-header">
              <h3>{{ currentPlan.name }}</h3>
              <span class="plan-price">{{ currentPlan.price }}đ/tháng</span>
            </div>
            <div class="plan-features">
              <div class="feature-item">
                <span class="feature-icon">✓</span>
                <span>Đăng {{ currentPlan.maxJobs }} việc làm</span>
              </div>
              <div class="feature-item">
                <span class="feature-icon">✓</span>
                <span>Xem {{ currentPlan.maxCandidates }} hồ sơ</span>
              </div>
              <div class="feature-item">
                <span class="feature-icon">✓</span>
                <span>{{ currentPlan.prioritySupport ? 'Hỗ trợ ưu tiên' : 'Hỗ trợ cơ bản' }}</span>
              </div>
              <div class="feature-item">
                <span class="feature-icon">✓</span>
                <span>{{ currentPlan.highlightedJobs ? 'Việc làm nổi bật' : 'Việc làm thường' }}</span>
              </div>
            </div>
            <div class="plan-actions">
              <span class="plan-status">Đang sử dụng</span>
            </div>
          </div>
        </div>

        <!-- Available Plans -->
        <div class="available-plans">
          <h2>Các gói dịch vụ</h2>
          <div class="plans-grid">
            <div v-for="plan in subscriptions" :key="plan.id" class="plan-card">
              <div class="plan-header">
                <h3>{{ plan.name }}</h3>
                <span class="plan-price">{{ plan.price }}đ/tháng</span>
              </div>
              <div class="plan-features">
                <div class="feature-item">
                  <span class="feature-icon">✓</span>
                  <span>Đăng {{ plan.maxJobs }} việc làm</span>
                </div>
                <div class="feature-item">
                  <span class="feature-icon">✓</span>
                  <span>Xem {{ plan.maxCandidates }} hồ sơ</span>
                </div>
                <div class="feature-item">
                  <span class="feature-icon">✓</span>
                  <span>{{ plan.prioritySupport ? 'Hỗ trợ ưu tiên' : 'Hỗ trợ cơ bản' }}</span>
                </div>
                <div class="feature-item">
                  <span class="feature-icon">✓</span>
                  <span>{{ plan.highlightedJobs ? 'Việc làm nổi bật' : 'Việc làm thường' }}</span>
                </div>
              </div>
              <div class="plan-actions">
                <button 
                  v-if="currentPlan && currentPlan.id === plan.id" 
                  class="btn btn-current"
                  disabled
                >
                  Đang sử dụng
                </button>
                <button 
                  v-else 
                  @click="subscribeToPlan(plan.id)" 
                  class="btn btn-primary"
                >
                  Đăng ký
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Benefits -->
        <div class="benefits">
          <h2>Lợi ích khi sử dụng gói dịch vụ</h2>
          <div class="benefits-grid">
            <div class="benefit-item">
              <div class="benefit-icon">💼</div>
              <h4>Tăng độ phủ sóng</h4>
              <p>Việc làm của bạn sẽ được hiển thị nổi bật, thu hút nhiều ứng viên chất lượng hơn</p>
            </div>
            <div class="benefit-item">
              <div class="benefit-icon">👥</div>
              <h4>Truy cập hồ sơ</h4>
              <p>Truy cập không giới hạn hồ sơ ứng viên phù hợp với yêu cầu của công ty</p>
            </div>
            <div class="benefit-item">
              <div class="benefit-icon">⚡</div>
              <h4>Hỗ trợ ưu tiên</h4>
              <p>Được hỗ trợ nhanh chóng từ đội ngũ chăm sóc khách hàng chuyên nghiệp</p>
            </div>
            <div class="benefit-item">
              <div class="benefit-icon">📊</div>
              <h4>Thống kê chi tiết</h4>
              <p>Theo dõi hiệu quả tuyển dụng với các báo cáo thống kê chi tiết</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.subscription {
  padding: 2rem 0;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

.subscription-header {
  margin-bottom: 3rem;
}

.subscription-header h1 {
  margin: 0 0 0.5rem 0;
  font-size: 2.5rem;
  color: #1f2937;
}

.subscription-header p {
  margin: 0;
  color: #6b7280;
  font-size: 1.1rem;
}

.loading,
.error-message {
  text-align: center;
  padding: 4rem;
  color: #6b7280;
}

.error-message {
  background: #fee2e2;
  color: #dc2626;
  padding: 2rem;
  border-radius: 0.5rem;
  border: 1px solid #fecaca;
}

.subscription-content {
  display: flex;
  flex-direction: column;
  gap: 3rem;
}

.current-plan h2,
.available-plans h2,
.benefits h2 {
  margin: 0 0 2rem 0;
  color: #1f2937;
  font-size: 1.5rem;
}

.plan-card {
  background: white;
  padding: 2rem;
  border-radius: 0.5rem;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  border: 1px solid #e5e7eb;
  transition: transform 0.2s;
}

.plan-card:hover {
  transform: translateY(-2px);
  border-color: #d1d5db;
}

.plan-card.current {
  border-color: #667eea;
  box-shadow: 0 4px 20px rgba(102, 126, 234, 0.2);
}

.plan-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  border-bottom: 1px solid #e5e7eb;
  padding-bottom: 1rem;
}

.plan-header h3 {
  margin: 0;
  color: #1f2937;
  font-size: 1.25rem;
}

.plan-price {
  font-size: 1.5rem;
  font-weight: 700;
  color: #667eea;
}

.plan-features {
  margin-bottom: 2rem;
}

.feature-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.75rem 0;
  border-bottom: 1px solid #f3f4f6;
}

.feature-item:last-child {
  border-bottom: none;
}

.feature-icon {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: #e3f2fd;
  color: #1976d2;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 0.875rem;
}

.plan-actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.plan-status {
  background: #dcfce7;
  color: #166534;
  padding: 0.5rem 1rem;
  border-radius: 9999px;
  font-weight: 600;
  font-size: 0.875rem;
}

.plans-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.benefits-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
}

.benefit-item {
  background: white;
  padding: 2rem;
  border-radius: 0.5rem;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  border: 1px solid #e5e7eb;
  transition: transform 0.2s;
}

.benefit-item:hover {
  transform: translateY(-2px);
  border-color: #d1d5db;
}

.benefit-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.benefit-item h4 {
  margin: 0 0 1rem 0;
  color: #1f2937;
}

.benefit-item p {
  margin: 0;
  color: #6b7280;
  line-height: 1.6;
}

.btn {
  padding: 0.75rem 1.5rem;
  border-radius: 0.375rem;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.2s;
  border: none;
  cursor: pointer;
}

.btn-primary {
  background-color: #667eea;
  color: white;
}

.btn-primary:hover {
  background-color: #5a67d8;
}

.btn-current {
  background-color: #9ca3af;
  color: white;
  cursor: not-allowed;
}

@media (max-width: 768px) {
  .plan-header {
    flex-direction: column;
    gap: 1rem;
    align-items: flex-start;
  }
  
  .plan-actions {
    justify-content: flex-start;
  }
}
</style>