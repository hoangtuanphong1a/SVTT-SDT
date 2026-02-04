import React, { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Separator } from "../ui/separator";
import { 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  User as UserIcon, 
  Phone,
  ArrowRight,
  Briefcase,
  Building2,
  User,
  Check
} from "lucide-react";

interface RegisterPageProps {
  navigate: (page: string, id?: string) => void;
}

export default function RegisterPage({ navigate }: RegisterPageProps) {
  const [userType, setUserType] = useState<"job-seeker" | "employer">("job-seeker");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Personal Info
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    
    // Job Seeker Specific
    experience: "",
    skills: "",
    
    // Employer Specific  
    companyName: "",
    companySize: "",
    industry: "",
    
    // Common
    agreeTerms: false,
    subscribeNewsletter: true
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (currentStep < 2) {
      setCurrentStep(2);
      return;
    }
    
    setIsLoading(true);
    
    // Simulate registration process
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Navigate to appropriate dashboard
    if (userType === "job-seeker") {
      navigate("job-seeker-dashboard");
    } else {
      navigate("employer-dashboard");
    }
    
    setIsLoading(false);
  };

  const handleGoogleSignup = () => {
    // Simulate Google signup
    console.log("Google signup for:", userType);
    if (userType === "job-seeker") {
      navigate("job-seeker-dashboard");
    } else {
      navigate("employer-dashboard");
    }
  };

  const validateStep1 = () => {
    return formData.fullName && formData.email && formData.phone && 
           formData.password && formData.confirmPassword &&
           formData.password === formData.confirmPassword &&
           formData.agreeTerms;
  };

  const Step1PersonalInfo = () => (
    <div className="space-y-4">
      {/* Full Name */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Họ và tên *
        </label>
        <div className="relative">
          <UserIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <Input
            type="text"
            placeholder="Nguyễn Văn A"
            value={formData.fullName}
            onChange={(e) => handleInputChange("fullName", e.target.value)}
            className="pl-10 h-12"
            required
          />
        </div>
      </div>

      {/* Email */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Email *
        </label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <Input
            type="email"
            placeholder="email@example.com"
            value={formData.email}
            onChange={(e) => handleInputChange("email", e.target.value)}
            className="pl-10 h-12"
            required
          />
        </div>
      </div>

      {/* Phone */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Số điện thoại *
        </label>
        <div className="relative">
          <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <Input
            type="tel"
            placeholder="0901234567"
            value={formData.phone}
            onChange={(e) => handleInputChange("phone", e.target.value)}
            className="pl-10 h-12"
            required
          />
        </div>
      </div>

      {/* Password */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Mật khẩu *
        </label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <Input
            type={showPassword ? "text" : "password"}
            placeholder="Tối thiểu 8 ký tự"
            value={formData.password}
            onChange={(e) => handleInputChange("password", e.target.value)}
            className="pl-10 pr-10 h-12"
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Confirm Password */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Xác nhận mật khẩu *
        </label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <Input
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Nhập lại mật khẩu"
            value={formData.confirmPassword}
            onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
            className="pl-10 pr-10 h-12"
            required
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
          </button>
        </div>
        {formData.password && formData.confirmPassword && formData.password !== formData.confirmPassword && (
          <p className="text-red-500 text-sm mt-1">Mật khẩu không khớp</p>
        )}
      </div>

      {/* Terms */}
      <div className="space-y-3">
        <label className="flex items-start space-x-3">
          <input
            type="checkbox"
            checked={formData.agreeTerms}
            onChange={(e) => handleInputChange("agreeTerms", e.target.checked)}
            className="rounded border-gray-300 text-orange-primary focus:ring-orange-primary mt-1"
            required
          />
          <span className="text-sm text-gray-700">
            Tôi đồng ý với{" "}
            <a href="#" className="text-orange-primary hover:text-orange-600">
              Điều khoản sử dụng
            </a>{" "}
            và{" "}
            <a href="#" className="text-orange-primary hover:text-orange-600">
              Chính sách bảo mật
            </a>
          </span>
        </label>
        
        <label className="flex items-start space-x-3">
          <input
            type="checkbox"
            checked={formData.subscribeNewsletter}
            onChange={(e) => handleInputChange("subscribeNewsletter", e.target.checked)}
            className="rounded border-gray-300 text-orange-primary focus:ring-orange-primary mt-1"
          />
          <span className="text-sm text-gray-700">
            Nhận thông báo về việc làm mới và xu hướng nghề nghiệp
          </span>
        </label>
      </div>
    </div>
  );

  const Step2AdditionalInfo = () => (
    <div className="space-y-4">
      {userType === "job-seeker" ? (
        <>
          {/* Experience Level */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Kinh nghiệm làm việc
            </label>
            <select
              value={formData.experience}
              onChange={(e) => handleInputChange("experience", e.target.value)}
              className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-primary focus:border-orange-primary outline-none bg-white"
            >
              <option value="">Chọn mức độ kinh nghiệm</option>
              <option value="fresh">Sinh viên/Thực tập sinh</option>
              <option value="junior">Dưới 1 năm</option>
              <option value="mid">1-3 năm</option>
              <option value="senior">3-5 năm</option>
              <option value="lead">Trên 5 năm</option>
            </select>
          </div>

          {/* Skills */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Kỹ năng chính
            </label>
            <Input
              type="text"
              placeholder="VD: React, Node.js, Python..."
              value={formData.skills}
              onChange={(e) => handleInputChange("skills", e.target.value)}
              className="h-12"
            />
            <p className="text-xs text-gray-500 mt-1">Phân cách bằng dấu phẩy</p>
          </div>
        </>
      ) : (
        <>
          {/* Company Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tên công ty *
            </label>
            <div className="relative">
              <Building2 className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                type="text"
                placeholder="Công ty ABC"
                value={formData.companyName}
                onChange={(e) => handleInputChange("companyName", e.target.value)}
                className="pl-10 h-12"
                required
              />
            </div>
          </div>

          {/* Company Size */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Quy mô công ty
            </label>
            <select
              value={formData.companySize}
              onChange={(e) => handleInputChange("companySize", e.target.value)}
              className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-primary focus:border-orange-primary outline-none bg-white"
            >
              <option value="">Chọn quy mô công ty</option>
              <option value="1-10">1-10 nhân viên</option>
              <option value="11-50">11-50 nhân viên</option>
              <option value="51-200">51-200 nhân viên</option>
              <option value="201-1000">201-1000 nhân viên</option>
              <option value="1000+">Trên 1000 nhân viên</option>
            </select>
          </div>

          {/* Industry */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Ngành nghề
            </label>
            <select
              value={formData.industry}
              onChange={(e) => handleInputChange("industry", e.target.value)}
              className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-primary focus:border-orange-primary outline-none bg-white"
            >
              <option value="">Chọn ngành nghề</option>
              <option value="it">Công nghệ thông tin</option>
              <option value="finance">Tài chính - Ngân hàng</option>
              <option value="marketing">Marketing - PR</option>
              <option value="education">Giáo dục</option>
              <option value="healthcare">Y tế - Sức khỏe</option>
              <option value="retail">Bán lẻ</option>
              <option value="manufacturing">Sản xuất</option>
              <option value="other">Khác</option>
            </select>
          </div>
        </>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-orange-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div 
            className="inline-flex items-center space-x-2 cursor-pointer mb-4"
            onClick={() => navigate("home")}
          >
            <div className="w-10 h-10 bg-orange-primary rounded-lg flex items-center justify-center">
              <Briefcase className="h-6 w-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-gray-900">JobPortal</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Tạo tài khoản</h1>
          <p className="text-gray-600">Bắt đầu hành trình nghề nghiệp của bạn</p>
        </div>

        {/* User Type Selection */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <button
            onClick={() => setUserType("job-seeker")}
            className={`p-4 rounded-lg border-2 transition-all ${
              userType === "job-seeker"
                ? "border-orange-primary bg-orange-light text-orange-primary"
                : "border-gray-200 bg-white text-gray-700 hover:border-orange-200"
            }`}
          >
            <User className="h-6 w-6 mx-auto mb-2" />
            <div className="text-sm font-medium">Người tìm việc</div>
          </button>
          <button
            onClick={() => setUserType("employer")}
            className={`p-4 rounded-lg border-2 transition-all ${
              userType === "employer"
                ? "border-orange-primary bg-orange-light text-orange-primary"
                : "border-gray-200 bg-white text-gray-700 hover:border-orange-200"
            }`}
          >
            <Building2 className="h-6 w-6 mx-auto mb-2" />
            <div className="text-sm font-medium">Nhà tuyển dụng</div>
          </button>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center justify-center space-x-4 mb-6">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
            currentStep >= 1 ? "bg-orange-primary text-white" : "bg-gray-200 text-gray-500"
          }`}>
            {currentStep > 1 ? <Check className="h-4 w-4" /> : "1"}
          </div>
          <div className={`h-1 w-8 ${currentStep > 1 ? "bg-orange-primary" : "bg-gray-200"}`}></div>
          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
            currentStep >= 2 ? "bg-orange-primary text-white" : "bg-gray-200 text-gray-500"
          }`}>
            2
          </div>
        </div>

        {/* Registration Form */}
        <Card className="border-2 border-gray-200 shadow-xl">
          <CardHeader className="space-y-1 pb-4">
            <CardTitle className="text-center">
              {currentStep === 1 ? "Thông tin cá nhân" : "Thông tin bổ sung"}
            </CardTitle>
            <p className="text-center text-sm text-gray-600">
              {currentStep === 1 
                ? `Bước ${currentStep}/2: Nhập thông tin cơ bản`
                : `Bước ${currentStep}/2: Hoàn thiện hồ sơ`
              }
            </p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              {currentStep === 1 ? <Step1PersonalInfo /> : <Step2AdditionalInfo />}

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={currentStep === 1 ? !validateStep1() : isLoading}
                className="w-full h-12 bg-orange-primary hover:bg-orange-600 text-white font-semibold mt-6"
              >
                {isLoading ? (
                  <div className="flex items-center">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    Đang tạo tài khoản...
                  </div>
                ) : (
                  <div className="flex items-center">
                    {currentStep === 1 ? "Tiếp tục" : "Tạo tài khoản"}
                    <ArrowRight className="h-5 w-5 ml-2" />
                  </div>
                )}
              </Button>

              {/* Back Button */}
              {currentStep === 2 && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setCurrentStep(1)}
                  className="w-full h-12 mt-3"
                >
                  Quay lại
                </Button>
              )}
            </form>

            {currentStep === 1 && (
              <>
                <div className="mt-6">
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <Separator />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                      <span className="bg-white px-2 text-gray-500">Hoặc đăng ký với</span>
                    </div>
                  </div>

                  {/* Google Signup */}
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleGoogleSignup}
                    className="w-full mt-4 h-12 border-gray-300 hover:border-gray-400"
                  >
                    <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
                      <path
                        fill="#4285F4"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      />
                      <path
                        fill="#34A853"
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      />
                      <path
                        fill="#FBBC05"
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      />
                      <path
                        fill="#EA4335"
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      />
                    </svg>
                    Đăng ký với Google
                  </Button>
                </div>
              </>
            )}

            {/* Sign In Link */}
            <div className="text-center mt-6">
              <p className="text-sm text-gray-600">
                Đã có tài khoản?{" "}
                <button
                  onClick={() => navigate("login")}
                  className="text-orange-primary hover:text-orange-600 font-medium transition-colors"
                >
                  Đăng nhập
                </button>
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Back to Home */}
        <div className="text-center mt-6">
          <button
            onClick={() => navigate("home")}
            className="text-sm text-gray-600 hover:text-orange-primary transition-colors"
          >
            ← Quay về trang chủ
          </button>
        </div>
      </div>
    </div>
  );
}