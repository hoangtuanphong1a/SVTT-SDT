import React, { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock,
  Send,
  MessageCircle,
  Users,
  Building2,
  HeadphonesIcon
} from "lucide-react";

interface ContactPageProps {
  navigate: (page: string, id?: string) => void;
}

export default function ContactPage({ navigate }: ContactPageProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    userType: "job-seeker"
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const updateFormData = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    alert("Cảm ơn bạn đã liên hệ! Chúng tôi sẽ ph��n hồi trong vòng 24 giờ.");
    setFormData({
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
      userType: "job-seeker"
    });
    setIsSubmitting(false);
  };

  const contactInfo = [
    {
      icon: Mail,
      title: "Email",
      value: "contact@jobportal.vn",
      description: "Phản hồi trong vòng 24 giờ"
    },
    {
      icon: Phone,
      title: "Điện thoại",
      value: "+84 (0) 123 456 789",
      description: "Thứ 2 - Thứ 6: 8:00 - 18:00"
    },
    {
      icon: MapPin,
      title: "Văn phòng",
      value: "123 Nguyễn Văn Linh, Q7, TP.HCM",
      description: "Tầng 15, Tòa nhà ABC Tower"
    },
    {
      icon: Clock,
      title: "Giờ làm việc",
      value: "Thứ 2 - Thứ 6",
      description: "8:00 AM - 6:00 PM (GMT+7)"
    }
  ];

  const supportCategories = [
    {
      icon: Users,
      title: "Hỗ trợ ứng viên",
      description: "Tạo CV, tìm kiếm việc làm, ứng tuyển"
    },
    {
      icon: Building2,
      title: "Hỗ trợ nhà tuyển dụng",
      description: "Đăng tin, quản lý ứng viên, gói dịch vụ"
    },
    {
      icon: MessageCircle,
      title: "Góp ý & Báo lỗi",
      description: "Phản hồi về sản phẩm, báo cáo lỗi kỹ thuật"
    },
    {
      icon: HeadphonesIcon,
      title: "Hỗ trợ kỹ thuật",
      description: "Sự cố đăng nhập, lỗi hệ thống"
    }
  ];

  const faqItems = [
    {
      question: "Làm thế nào để tạo tài khoản?",
      answer: "Bạn có thể đăng ký tài khoản miễn phí bằng cách click vào nút 'Đăng ký' và điền thông tin cần thiết."
    },
    {
      question: "Có mất phí khi sử dụng dịch vụ không?",
      answer: "Đối với ứng viên, tất cả dịch vụ cơ bản đều miễn phí. Nhà tuyển dụng có các gói dịch vụ phù hợp với nhu cầu."
    },
    {
      question: "Làm sao để đăng tin tuyển dụng?",
      answer: "Sau khi đăng ký tài khoản nhà tuyển dụng, bạn có thể đăng tin tuyển dụng thông qua trang 'Đăng tuyển'."
    },
    {
      question: "Tôi quên mật khẩu phải làm sao?",
      answer: "Sử dụng tính năng 'Quên mật khẩu' trên trang đăng nhập để reset mật khẩu qua email."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-br from-orange-50 to-orange-100 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Liên hệ với chúng tôi
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Có câu hỏi hoặc cần hỗ trợ? Đội ngũ JobPortal luôn sẵn sàng giúp đỡ bạn
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Gửi tin nhắn</CardTitle>
                <p className="text-gray-600">
                  Điền thông tin bên dưới và chúng tôi sẽ phản hồi sớm nhất có thể
                </p>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* User Type Selection */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Bạn là *
                    </label>
                    <div className="grid grid-cols-2 gap-4">
                      <button
                        type="button"
                        onClick={() => updateFormData("userType", "job-seeker")}
                        className={`p-4 rounded-lg border-2 transition-all ${
                          formData.userType === "job-seeker"
                            ? "border-orange-primary bg-orange-light text-orange-primary"
                            : "border-gray-200 bg-white text-gray-700 hover:border-orange-200"
                        }`}
                      >
                        <Users className="h-6 w-6 mx-auto mb-2" />
                        <div className="font-medium">Người tìm việc</div>
                      </button>
                      <button
                        type="button"
                        onClick={() => updateFormData("userType", "employer")}
                        className={`p-4 rounded-lg border-2 transition-all ${
                          formData.userType === "employer"
                            ? "border-orange-primary bg-orange-light text-orange-primary"
                            : "border-gray-200 bg-white text-gray-700 hover:border-orange-200"
                        }`}
                      >
                        <Building2 className="h-6 w-6 mx-auto mb-2" />
                        <div className="font-medium">Nhà tuyển dụng</div>
                      </button>
                    </div>
                  </div>

                  {/* Personal Information */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Họ và tên *
                      </label>
                      <Input
                        placeholder="Nhập họ và tên"
                        value={formData.name}
                        onChange={(e) => updateFormData("name", e.target.value)}
                        required
                        className="h-12"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email *
                      </label>
                      <Input
                        type="email"
                        placeholder="email@example.com"
                        value={formData.email}
                        onChange={(e) => updateFormData("email", e.target.value)}
                        required
                        className="h-12"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Số điện thoại
                      </label>
                      <Input
                        placeholder="0901234567"
                        value={formData.phone}
                        onChange={(e) => updateFormData("phone", e.target.value)}
                        className="h-12"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Chủ đề *
                      </label>
                      <select
                        value={formData.subject}
                        onChange={(e) => updateFormData("subject", e.target.value)}
                        required
                        className="w-full h-12 px-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-primary focus:border-orange-primary outline-none bg-white"
                      >
                        <option value="">Chọn chủ đề</option>
                        <option value="general">Câu hỏi chung</option>
                        <option value="support">Hỗ trợ kỹ thuật</option>
                        <option value="feedback">Góp ý sản phẩm</option>
                        <option value="partnership">Hợp tác kinh doanh</option>
                        <option value="other">Khác</option>
                      </select>
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Tin nhắn *
                    </label>
                    <Textarea
                      placeholder="Nhập tin nhắn của bạn..."
                      value={formData.message}
                      onChange={(e) => updateFormData("message", e.target.value)}
                      required
                      rows={6}
                    />
                  </div>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full h-12 bg-orange-primary hover:bg-orange-600 text-white font-semibold"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                        Đang gửi...
                      </div>
                    ) : (
                      <div className="flex items-center">
                        <Send className="h-5 w-5 mr-2" />
                        Gửi tin nhắn
                      </div>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-8">
            {/* Contact Information */}
            <Card>
              <CardHeader>
                <CardTitle>Thông tin liên hệ</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {contactInfo.map((contact, index) => {
                  const Icon = contact.icon;
                  return (
                    <div key={index} className="flex items-start space-x-3">
                      <div className="w-10 h-10 bg-orange-light rounded-lg flex items-center justify-center flex-shrink-0">
                        <Icon className="h-5 w-5 text-orange-primary" />
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900">{contact.title}</h3>
                        <p className="text-gray-700 font-medium">{contact.value}</p>
                        <p className="text-sm text-gray-500">{contact.description}</p>
                      </div>
                    </div>
                  );
                })}
              </CardContent>
            </Card>

            {/* Support Categories */}
            <Card>
              <CardHeader>
                <CardTitle>Danh mục hỗ trợ</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {supportCategories.map((category, index) => {
                  const Icon = category.icon;
                  return (
                    <div key={index} className="flex items-start space-x-3">
                      <Icon className="h-5 w-5 text-orange-primary mt-1 flex-shrink-0" />
                      <div>
                        <h4 className="font-medium text-gray-900">{category.title}</h4>
                        <p className="text-sm text-gray-600">{category.description}</p>
                      </div>
                    </div>
                  );
                })}
              </CardContent>
            </Card>

            {/* Quick Links */}
            <Card>
              <CardHeader>
                <CardTitle>Liên kết nhanh</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <button 
                  onClick={() => navigate("about")}
                  className="w-full text-left text-gray-700 hover:text-orange-primary transition-colors"
                >
                  Về chúng tôi
                </button>
                <button 
                  onClick={() => navigate("blog")}
                  className="w-full text-left text-gray-700 hover:text-orange-primary transition-colors"
                >
                  Blog nghề nghiệp
                </button>
                <button 
                  onClick={() => navigate("jobs")}
                  className="w-full text-left text-gray-700 hover:text-orange-primary transition-colors"
                >
                  Tìm việc làm
                </button>
                <button 
                  onClick={() => navigate("companies")}
                  className="w-full text-left text-gray-700 hover:text-orange-primary transition-colors"
                >
                  Danh sách công ty
                </button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-16">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl text-center">Câu hỏi thường gặp</CardTitle>
              <p className="text-center text-gray-600">
                Một số câu hỏi phổ biến mà chúng tôi thường nhận được
              </p>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {faqItems.map((faq, index) => (
                  <div key={index} className="space-y-3">
                    <h3 className="font-semibold text-gray-900">{faq.question}</h3>
                    <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Map Section (Placeholder) */}
        <div className="mt-16">
          <Card>
            <CardHeader>
              <CardTitle>Vị trí văn phòng</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-gray-200 rounded-lg h-64 flex items-center justify-center">
                <div className="text-center text-gray-500">
                  <MapPin className="h-12 w-12 mx-auto mb-4" />
                  <p className="font-medium">Bản đồ văn phòng</p>
                  <p className="text-sm">123 Nguyễn Văn Linh, Quận 7, TP.HCM</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}