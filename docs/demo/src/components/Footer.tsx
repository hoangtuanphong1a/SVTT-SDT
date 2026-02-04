import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import { 
  Briefcase, 
  Facebook, 
  Twitter, 
  Linkedin, 
  Youtube,
  Mail,
  Phone,
  MapPin
} from "lucide-react";

interface FooterProps {
  navigate?: (page: string) => void;
}

export function Footer({ navigate }: FooterProps) {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="flex items-center mb-4">
              <div className="w-8 h-8 bg-[#f26b38] rounded-lg flex items-center justify-center mr-3">
                <Briefcase className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold">CV King</span>
            </div>
            <p className="text-gray-400 mb-6">
              Nền tảng tìm kiếm việc làm hàng đầu Việt Nam, kết nối ứng viên 
              với các cơ hội nghề nghiệp lý tưởng.
            </p>
            <div className="flex space-x-4">
              <Button variant="ghost" size="sm" className="p-2 hover:bg-gray-800">
                <Facebook className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="sm" className="p-2 hover:bg-gray-800">
                <Twitter className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="sm" className="p-2 hover:bg-gray-800">
                <Linkedin className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="sm" className="p-2 hover:bg-gray-800">
                <Youtube className="w-5 h-5" />
              </Button>
            </div>
          </div>

          {/* For Job Seekers */}
          <div>
            <h4 className="font-semibold mb-4">Dành cho ứng viên</h4>
            <ul className="space-y-3 text-gray-400">
              <li><button onClick={() => navigate?.("jobs")} className="hover:text-[#f26b38] transition-colors text-left">Tìm việc làm</button></li>
              <li><button onClick={() => navigate?.("cv-template")} className="hover:text-[#f26b38] transition-colors text-left">Mẫu CV chuyên nghiệp</button></li>
              <li><button onClick={() => navigate?.("cv-builder")} className="hover:text-[#f26b38] transition-colors text-left">Tạo CV online</button></li>
              <li><button onClick={() => navigate?.("companies")} className="hover:text-[#f26b38] transition-colors text-left">Danh sách công ty</button></li>
              <li><button onClick={() => navigate?.("company-reviews")} className="hover:text-[#f26b38] transition-colors text-left">Đánh giá công ty</button></li>
              <li><button onClick={() => navigate?.("blog")} className="hover:text-[#f26b38] transition-colors text-left">Cẩm nang nghề nghiệp</button></li>
              <li><button onClick={() => navigate?.("salary-calculator")} className="hover:text-[#f26b38] transition-colors text-left">Tính lương Gross-Net</button></li>
            </ul>
          </div>

          {/* For Employers */}
          <div>
            <h4 className="font-semibold mb-4">Dành cho nhà tuyển dụng</h4>
            <ul className="space-y-3 text-gray-400">
              <li><button onClick={() => navigate?.("post-job")} className="hover:text-[#f26b38] transition-colors text-left">Đăng tin tuyển dụng</button></li>
              <li><button onClick={() => navigate?.("employer-dashboard")} className="hover:text-[#f26b38] transition-colors text-left">Tìm kiếm ứng viên</button></li>
              <li><button onClick={() => navigate?.("analytics")} className="hover:text-[#f26b38] transition-colors text-left">Báo cáo thị trường</button></li>
              <li><a href="#" className="hover:text-[#f26b38] transition-colors">Dịch vụ cao cấp</a></li>
              <li><a href="#" className="hover:text-[#f26b38] transition-colors">Hỗ trợ tuyển dụng</a></li>
              <li><a href="#" className="hover:text-[#f26b38] transition-colors">API tích hợp</a></li>
            </ul>
          </div>

          {/* Contact & Support */}
          <div>
            <h4 className="font-semibold mb-4">Liên hệ & Hỗ trợ</h4>
            <div className="space-y-3 text-gray-400">
              <div className="flex items-center">
                <Mail className="w-4 h-4 mr-3" />
                <span>support@cvking.vn</span>
              </div>
              <div className="flex items-center">
                <Phone className="w-4 h-4 mr-3" />
                <span>1900 1234</span>
              </div>
              <div className="flex items-start">
                <MapPin className="w-4 h-4 mr-3 mt-1" />
                <div>
                  <p>Tầng 8, Tòa nhà ABC</p>
                  <p>123 Đường XYZ, Quận 1</p>
                  <p>TP. Hồ Chí Minh</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Separator className="bg-gray-800 mb-8" />

        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex flex-wrap gap-6 text-sm text-gray-400 mb-4 md:mb-0">
            <button onClick={() => navigate?.("about")} className="hover:text-[#f26b38] transition-colors">Giới thiệu</button>
            <a href="#" className="hover:text-[#f26b38] transition-colors">Điều khoản sử dụng</a>
            <a href="#" className="hover:text-[#f26b38] transition-colors">Chính sách bảo mật</a>
            <a href="#" className="hover:text-[#f26b38] transition-colors">Quy chế hoạt động</a>
            <button onClick={() => navigate?.("contact")} className="hover:text-[#f26b38] transition-colors">Liên hệ</button>
          </div>
          <div className="text-sm text-gray-400">
            © 2024 CV King. Tất cả quyền được bảo lưu.
          </div>
        </div>

        {/* Download App Section */}
        <div className="mt-8 pt-8 border-t border-gray-800 text-center">
          <h4 className="font-semibold mb-4">Tải ứng dụng CV King</h4>
          <div className="flex justify-center space-x-4">
            <Button variant="outline" className="border-gray-600 text-gray-400 hover:bg-gray-800">
              <img 
                src="https://images.unsplash.com/photo-1611162618071-b39a2ec055fb?w=24&h=24&fit=crop&crop=center" 
                alt="App Store" 
                className="w-6 h-6 mr-2"
              />
              App Store
            </Button>
            <Button variant="outline" className="border-gray-600 text-gray-400 hover:bg-gray-800">
              <img 
                src="https://images.unsplash.com/photo-1606557808342-7d146b1bbcdb?w=24&h=24&fit=crop&crop=center" 
                alt="Google Play" 
                className="w-6 h-6 mr-2"
              />
              Google Play
            </Button>
          </div>
        </div>
      </div>
    </footer>
  );
}