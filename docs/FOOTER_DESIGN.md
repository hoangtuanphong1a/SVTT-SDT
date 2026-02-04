# 🦶 Footer - Thiết Kế Chuyên Nghiệp

## 📋 Cấu Trúc Footer

### **Footer được chia thành 2 phần chính:**

#### **1. Footer Main Content (60px padding top/bottom)**

```
┌─────────────────────────────────────────────────┐
│  FOOTER GRID (5 sections)                       │
├─────────────────────────────────────────────────┤
│                                                 │
│  [Brand]    [For Job Seekers]  [For Employers] │
│  [Social]   [Links]            [Links]         │
│            [For Company]       [Contact]       │
│                                                 │
└─────────────────────────────────────────────────┘
```

#### **2. Footer Bottom (Dark overlay)**

```
┌─────────────────────────────────────────────────┐
│  Copyright © 2024 | Privacy | Terms | Cookies  │
└─────────────────────────────────────────────────┘
```

---

## 🎨 Các Sections Chính

### **1. Brand Section**

- Logo: 💼 JobVista
- Tagline: "Nền tảng tuyển dụng hàng đầu Việt Nam"
- Description: Mô tả ngắn về JobVista
- **Social Links** (4 icons):
  - Facebook (f)
  - Twitter (𝕏)
  - LinkedIn (in)
  - Instagram (📷)

### **2. For Job Seekers Section**

- Tìm Việc Làm → /jobs
- Công Ty → /companies
- Blog & Tips → /blog
- Tính Lương → /salary-calculator

### **3. For Employers Section**

- Đăng Tuyển Dụng
- Tìm Nhân Tài
- Gói Dịch Vụ
- Tài Liệu & Hướng Dẫn

### **4. About Company Section**

- Về Chúng Tôi → /about
- Liên Hệ → /contact
- Chính Sách Bảo Mật
- Điều Khoản Sử Dụng

### **5. Contact Info Section**

- 📍 TP. Hồ Chí Minh, Việt Nam
- 📧 info@jobvista.vn (clickable)
- 📞 +84 (28) 3456 789 (clickable)

---

## 🎨 Styling Details

### **Colors**

- Background: Dark gradient (#1f2937 → #111827)
- Text: Light gray (#d1d5db, #9ca3af)
- Accent: Orange (#ff8c42)
- Hover: Orange (#ff8c42)

### **Typography**

- Section Title: 1.1rem, uppercase, white, bold
- Links: 0.95rem, gray, hover → orange + translateX
- Description: 0.95rem, light gray
- Contact: 0.95rem with icons

### **Hover Effects**

- Links: Color changes to orange + move right (4px)
- Social icons: Lift up + background turns orange
- Contact links: Turn orange + underline

### **Layout**

- Grid: Auto-fit, minmax(250px, 1fr)
- Gap: 40px between sections
- Responsive: Single column on mobile

---

## 📱 Responsive Design

### **Desktop (1200px+)**

- 5 columns grid
- Full spacing
- All content visible

### **Tablet (768px - 1199px)**

- Responsive grid columns
- Adjusted spacing
- Footer bottom: flex-wrap

### **Mobile (480px - 767px)**

- Single column layout
- Reduced spacing
- Centered footer-bottom
- Icons smaller (36px → 40px)
- Separators hidden

---

## 🔗 Links & Routes

### **Dynamic Links** (Vue Router)

```
- /jobs          → Tìm Việc Làm
- /companies     → Công Ty
- /blog          → Blog
- /about         → Về Chúng Tôi
- /contact       → Liên Hệ
```

### **Static Links** (Hash links)

```
- #post-job      → Đăng Tuyển Dụng
- #talent        → Tìm Nhân Tài
- #pricing       → Gói Dịch Vụ
- #resources     → Tài Liệu & Hướng Dẫn
- #privacy       → Chính Sách Bảo Mật
- #terms         → Điều Khoản Sử Dụng
- #cookies       → Chính Sách Cookie
```

---

## 🎯 Key Features

✅ **Professional Design**

- Dark gradient background
- Well-organized sections
- Clear typography hierarchy

✅ **Interactive Elements**

- Hover animations on links
- Social icon hover effects
- Smooth transitions (0.3s)

✅ **Full Responsive**

- Desktop: 5-column grid
- Tablet: Flexible grid
- Mobile: Single column

✅ **SEO Friendly**

- Semantic HTML structure
- Internal links to all major pages
- Contact information visible

✅ **Accessibility**

- High contrast (white on dark)
- Clear link text
- Icon + text labels
- Proper heading hierarchy

✅ **Mobile Optimized**

- Touch-friendly links
- Readable font size
- Proper spacing
- No horizontal scroll

---

## 💻 CSS Classes

```css
.footer {
}
.footer-content {
}
.footer-grid {
}
.footer-section {
}
.footer-logo {
}
.footer-tagline {
}
.footer-description {
}
.footer-title {
}
.footer-links {
}
.footer-links li a {
}
.social-links {
}
.social-link {
}
.contact-info {
}
.contact-item {
}
.contact-icon {
}
.contact-item a {
}
.footer-bottom {
}
.footer-bottom-content {
}
.copyright {
}
.footer-bottom-links {
}
.footer-bottom-links a {
}
.separator {
}
```

---

## 🎬 Footer Structure (HTML)

```vue
<footer class="footer">
  <div class="footer-content">
    <div class="container">
      <div class="footer-grid">
        <!-- 5 Sections -->
        <div class="footer-section">
          <!-- Brand, Logo, Description, Social Links -->
        </div>
        <div class="footer-section">
          <!-- For Job Seekers Links -->
        </div>
        <div class="footer-section">
          <!-- For Employers Links -->
        </div>
        <div class="footer-section">
          <!-- Company Links -->
        </div>
        <div class="footer-section">
          <!-- Contact Info -->
        </div>
      </div>

      <!-- Footer Bottom -->
      <div class="footer-bottom">
        <div class="footer-bottom-content">
          <p class="copyright">...</p>
          <div class="footer-bottom-links">
            <a href="#privacy">...</a>
            <span class="separator">•</span>
            <a href="#terms">...</a>
            <span class="separator">•</span>
            <a href="#cookies">...</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</footer>
```

---

## ✨ Visual Highlights

- **Dark gradient background**: Professional & modern
- **Orange accent color**: Matches theme
- **Social icons**: Circular, hover effect
- **Contact icons**: Emoji for quick recognition
- **Link animations**: Smooth transitions
- **Border accents**: Subtle orange borders

---

## 📊 Footer Metrics

- **Total Height**: ~400px (desktop) + 60px (bottom)
- **Section Width**: 250px - auto
- **Gap**: 40px horizontal, 16px vertical
- **Padding**: 60px top/bottom (main), 24px (bottom section)
- **Border**: 1px solid rgba(255, 140, 66, 0.1)

---

**🦶 Footer đã hoàn thiện theo design chuyên nghiệp!**

Khi chạy ứng dụng, footer sẽ hiển thị ở dưới cùng mỗi trang với đầy đủ links, social media, và contact info.
