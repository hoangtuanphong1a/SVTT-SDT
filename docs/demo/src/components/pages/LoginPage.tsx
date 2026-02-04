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
  ArrowRight,
  Briefcase,
  Building2,
  User
} from "lucide-react";

interface LoginPageProps {
  navigate: (page: string, id?: string) => void;
}

export default function LoginPage({ navigate }: LoginPageProps) {
  const [userType, setUserType] = useState<"job-seeker" | "employer">("job-seeker");
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false
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
    setIsLoading(true);
    
    // Simulate login process
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Navigate to appropriate dashboard
    if (userType === "job-seeker") {
      navigate("job-seeker-dashboard");
    } else {
      navigate("employer-dashboard");
    }
    
    setIsLoading(false);
  };

  const handleGoogleLogin = () => {
    // Simulate Google login
    console.log("Google login for:", userType);
    if (userType === "job-seeker") {
      navigate("job-seeker-dashboard");
    } else {
      navigate("employer-dashboard");
    }
  };

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
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Đăng nhập</h1>
          <p className="text-gray-600">Chào mừng bạn quay trở lại!</p>
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

        {/* Login Form */}
        <Card className="border-2 border-gray-200 shadow-xl">
          <CardHeader className="space-y-1 pb-4">
            <CardTitle className="text-center">
              Đăng nhập {userType === "job-seeker" ? "Người tìm việc" : "Nhà tuyển dụng"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
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

              {/* Password */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Mật khẩu
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Nhập mật khẩu"
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
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={formData.rememberMe}
                    onChange={(e) => handleInputChange("rememberMe", e.target.checked)}
                    className="rounded border-gray-300 text-orange-primary focus:ring-orange-primary"
                  />
                  <span className="text-sm text-gray-700">Ghi nhớ đăng nhập</span>
                </label>
                <button
                  type="button"
                  className="text-sm text-orange-primary hover:text-orange-600 transition-colors"
                >
                  Quên mật khẩu?
                </button>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full h-12 bg-orange-primary hover:bg-orange-600 text-white font-semibold"
              >
                {isLoading ? (
                  <div className="flex items-center">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    Đang đăng nhập...
                  </div>
                ) : (
                  <div className="flex items-center">
                    Đăng nhập
                    <ArrowRight className="h-5 w-5 ml-2" />
                  </div>
                )}
              </Button>
            </form>

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <Separator />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-white px-2 text-gray-500">Hoặc đăng nhập với</span>
                </div>
              </div>

              {/* Google Login */}
              <Button
                type="button"
                variant="outline"
                onClick={handleGoogleLogin}
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
                Đăng nhập với Google
              </Button>
            </div>

            {/* Sign Up Link */}
            <div className="text-center mt-6">
              <p className="text-sm text-gray-600">
                Chưa có tài khoản?{" "}
                <button
                  onClick={() => navigate("register")}
                  className="text-orange-primary hover:text-orange-600 font-medium transition-colors"
                >
                  Đăng ký ngay
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