import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { 
  FileText, 
  PlusCircle, 
  MessageCircle,
  ArrowRight,
  CheckCircle
} from "lucide-react";

export function CTASection() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Bắt đầu hành trình sự nghiệp của bạn
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Chỉ với vài bước đơn giản, bạn có thể bắt đầu tìm kiếm cơ hội việc làm lý tưởng
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {/* Tạo CV */}
          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardContent className="p-8">
              <div className="w-16 h-16 bg-[#fef7f2] rounded-full flex items-center justify-center mx-auto mb-6">
                <FileText className="w-8 h-8 text-[#f26b38]" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Tạo CV chuyên nghiệp
              </h3>
              <p className="text-gray-600 mb-6">
                Sử dụng công cụ tạo CV thông minh với nhiều mẫu thiết kế đẹp mắt, 
                phù hợp với từng ngành nghề.
              </p>
              <div className="space-y-2 mb-6">
                <div className="flex items-center text-sm text-gray-600">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  Miễn phí 100%
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  Nhiều mẫu CV đẹp
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  Tải PDF dễ dàng
                </div>
              </div>
              <Button className="w-full bg-[#f26b38] hover:bg-[#e55a2b] text-white">
                Tạo CV ngay
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </CardContent>
          </Card>

          {/* Đăng việc làm */}
          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardContent className="p-8">
              <div className="w-16 h-16 bg-[#fef7f2] rounded-full flex items-center justify-center mx-auto mb-6">
                <PlusCircle className="w-8 h-8 text-[#f26b38]" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Đăng tin tuyển dụng
              </h3>
              <p className="text-gray-600 mb-6">
                Nhà tuyển dụng có thể đăng tin miễn phí và tiếp cận với 
                hàng nghìn ứng viên chất lượng.
              </p>
              <div className="space-y-2 mb-6">
                <div className="flex items-center text-sm text-gray-600">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  Đăng tin miễn phí
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  Tiếp cận ứng viên nhanh
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  Quản lý dễ dàng
                </div>
              </div>
              <Button 
                variant="outline" 
                className="w-full border-[#f26b38] text-[#f26b38] hover:bg-[#f26b38] hover:text-white"
              >
                Đăng việc làm miễn phí
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </CardContent>
          </Card>

          {/* Tư vấn nghề nghiệp */}
          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardContent className="p-8">
              <div className="w-16 h-16 bg-[#fef7f2] rounded-full flex items-center justify-center mx-auto mb-6">
                <MessageCircle className="w-8 h-8 text-[#f26b38]" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Nhận tư vấn nghề nghiệp
              </h3>
              <p className="text-gray-600 mb-6">
                Đội ngũ chuyên gia sẵn sàng hỗ trợ bạn định hướng nghề nghiệp 
                và phát triển kỹ năng.
              </p>
              <div className="space-y-2 mb-6">
                <div className="flex items-center text-sm text-gray-600">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  Tư vấn 1-1
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  Chuyên gia giàu kinh nghiệm
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  Lộ trình rõ ràng
                </div>
              </div>
              <Button 
                variant="outline" 
                className="w-full border-[#f26b38] text-[#f26b38] hover:bg-[#f26b38] hover:text-white"
              >
                Nhận tư vấn miễn phí
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Newsletter Signup */}
        <div className="bg-gradient-to-r from-[#f26b38] to-[#e55a2b] rounded-2xl p-8 text-center text-white">
          <h3 className="text-2xl font-bold mb-4">
            Đăng ký nhận thông tin việc làm mới
          </h3>
          <p className="text-lg mb-6 opacity-90">
            Nhận thông báo về những cơ hội việc làm phù hợp nhất với bạn
          </p>
          <div className="max-w-md mx-auto flex gap-4">
            <input
              type="email"
              placeholder="Nhập email của bạn"
              className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-white"
            />
            <Button className="bg-white text-[#f26b38] hover:bg-gray-100 px-6">
              Đăng ký
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}