<template>
  <footer class="bg-gray-900 text-gray-300">
    <div class="container mx-auto px-4 py-12">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
        <div class="lg:col-span-2">
          <div class="flex items-center gap-2 mb-4">
            <div class="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-orange-500 to-orange-600">
              <svg class="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <rect width="20" height="14" x="2" y="7" rx="2" ry="2"/>
                <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
              </svg>
            </div>
            <span class="text-xl text-white font-bold">CVKing</span>
          </div>
          <p class="text-sm text-gray-400 mb-6 max-w-sm">
            Nền tảng tuyển dụng hàng đầu Việt Nam, kết nối hàng nghìn ứng viên với các công ty uy tín.
          </p>
          <div class="space-y-3">
            <p class="text-sm">Đăng ký nhận tin tức việc làm mới nhất</p>
            <div class="flex gap-2">
              <input type="email" placeholder="Email của bạn" class="flex-1 px-4 py-2 bg-gray-800 border border-gray-700 text-white placeholder:text-gray-500 rounded-lg focus:outline-none focus:border-orange-500" />
              <button class="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors">Đăng ký</button>
            </div>
          </div>
        </div>

        <div>
          <h3 class="text-white mb-4 font-semibold">Dành cho ứng viên</h3>
          <ul class="space-y-3 text-sm">
            <li><router-link to="/jobs" class="hover:text-orange-400 transition-colors">Tìm việc làm</router-link></li>
            <li><router-link to="/cv-builder" class="hover:text-orange-400 transition-colors">Tạo CV miễn phí</router-link></li>
            <li><router-link to="/cv-templates" class="hover:text-orange-400 transition-colors">Mẫu CV</router-link></li>
            <li><router-link to="/blog" class="hover:text-orange-400 transition-colors">Cẩm nang nghề nghiệp</router-link></li>
          </ul>
        </div>

        <div>
          <h3 class="text-white mb-4 font-semibold">Dành cho nhà tuyển dụng</h3>
          <ul class="space-y-3 text-sm">
            <li><router-link to="/register" class="hover:text-orange-400 transition-colors">Đăng tin tuyển dụng</router-link></li>
            <li><router-link to="/employer/cv-search" class="hover:text-orange-400 transition-colors">Tìm ứng viên</router-link></li>
            <li><router-link to="/employer/subscription" class="hover:text-orange-400 transition-colors">Bảng giá dịch vụ</router-link></li>
            <li><router-link to="/contact" class="hover:text-orange-400 transition-colors">Liên hệ</router-link></li>
          </ul>
        </div>

        <div>
          <h3 class="text-white mb-4 font-semibold">Về CVKing</h3>
          <ul class="space-y-3 text-sm">
            <li><router-link to="/about" class="hover:text-orange-400 transition-colors">Về chúng tôi</router-link></li>
            <li><router-link to="/contact" class="hover:text-orange-400 transition-colors">Liên hệ</router-link></li>
            <li><a href="#" class="hover:text-orange-400 transition-colors">Điều khoản dịch vụ</a></li>
            <li><a href="#" class="hover:text-orange-400 transition-colors">Chính sách bảo mật</a></li>
          </ul>
        </div>
      </div>

      <div class="grid md:grid-cols-3 gap-4 mt-12 pt-8 border-t border-gray-800">
        <div class="flex items-center gap-3 text-sm">
          <div class="h-10 w-10 rounded-lg bg-gray-800 flex items-center justify-center">
            <svg class="h-5 w-5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
            </svg>
          </div>
          <div>
            <div class="text-gray-500">Email</div>
            <div class="text-white">contact@cvking.vn</div>
          </div>
        </div>
        <div class="flex items-center gap-3 text-sm">
          <div class="h-10 w-10 rounded-lg bg-gray-800 flex items-center justify-center">
            <svg class="h-5 w-5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
            </svg>
          </div>
          <div>
            <div class="text-gray-500">Hotline</div>
            <div class="text-white">1900 xxxx</div>
          </div>
        </div>
        <div class="flex items-center gap-3 text-sm">
          <div class="h-10 w-10 rounded-lg bg-gray-800 flex items-center justify-center">
            <svg class="h-5 w-5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
            </svg>
          </div>
          <div>
            <div class="text-gray-500">Địa chỉ</div>
            <div class="text-white">Hà Nội, Việt Nam</div>
          </div>
        </div>
      </div>

      <div class="border-t border-gray-800 mt-8 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <p class="text-sm text-gray-500">© {{ new Date().getFullYear() }} CVKing. All rights reserved.</p>
        <div class="flex gap-4">
          <a href="#" class="h-9 w-9 rounded-lg bg-gray-800 hover:bg-orange-500 transition-colors flex items-center justify-center" aria-label="Facebook">
            <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
          </a>
          <a href="#" class="h-9 w-9 rounded-lg bg-gray-800 hover:bg-orange-500 transition-colors flex items-center justify-center" aria-label="LinkedIn">
            <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
          </a>
          <a href="#" class="h-9 w-9 rounded-lg bg-gray-800 hover:bg-orange-500 transition-colors flex items-center justify-center" aria-label="YouTube">
            <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
          </a>
        </div>
      </div>
    </div>
  </footer>
</template>