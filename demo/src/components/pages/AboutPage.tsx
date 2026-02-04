import React from "react";
import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import { 
  Target, 
  Users, 
  Award, 
  TrendingUp,
  Heart,
  Globe,
  Shield,
  Zap
} from "lucide-react";

interface AboutPageProps {
  navigate: (page: string, id?: string) => void;
}

export default function AboutPage({ navigate }: AboutPageProps) {
  const stats = [
    { icon: Users, value: "50,000+", label: "Ứng viên đăng ký" },
    { icon: Target, value: "10,000+", label: "Việc làm đăng tải" },
    { icon: Award, value: "2,500+", label: "Công ty đối tác" },
    { icon: TrendingUp, value: "95%", label: "Tỷ lệ thành công" }
  ];

  const values = [
    {
      icon: Heart,
      title: "Tận tâm với người dùng",
      description: "Chúng tôi luôn đặt lợi ích của người tìm việc và nhà tuyển dụng lên hàng đầu."
    },
    {
      icon: Shield,
      title: "Minh bạch và tin cậy",
      description: "Thông tin rõ ràng, quy trình minh bạch, bảo mật thông tin tuyệt đối."
    },
    {
      icon: Zap,
      title: "Đổi mới không ngừng",
      description: "Luôn cập nhật công nghệ mới để mang đến trải nghiệm tốt nhất."
    },
    {
      icon: Globe,
      title: "Kết nối toàn cầu",
      description: "Mở rộng cơ hội việc làm không chỉ trong nước mà còn quốc tế."
    }
  ];

  const team = [
    {
      name: "Nguyễn Văn Anh",
      position: "CEO & Founder",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      description: "15+ năm kinh nghiệm trong lĩnh vực HR và công nghệ."
    },
    {
      name: "Trần Thị Mai",
      position: "CTO",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b593?w=150&h=150&fit=crop&crop=face",
      description: "Chuyên gia công nghệ với kinh nghiệm phát triển sản phẩm."
    },
    {
      name: "Lê Minh Tuấn",
      position: "Head of Product",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      description: "Đam mê tạo ra những sản phẩm có giá trị cho người dùng."
    },
    {
      name: "Phạm Thị Hương",
      position: "Head of Marketing",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      description: "Chuyên gia marketing với nhiều năm kinh nghiệm."
    }
  ];

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const target = e.target as HTMLImageElement;
    target.src = `data:image/svg+xml;base64,${btoa(`
      <svg width="150" height="150" viewBox="0 0 150 150" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="75" cy="75" r="75" fill="#f26b38"/>
        <circle cx="75" cy="60" r="25" fill="white"/>
        <path d="M75 100C60 100 50 110 50 120V130C50 135 55 140 60 140H90C95 140 100 135 100 130V120C100 110 90 100 75 100Z" fill="white"/>
      </svg>
    `)}`;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-orange-50 to-orange-100 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Về <span className="text-orange-primary">JobPortal</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Chúng tôi là nền tảng kết nối việc làm hàng đầu Việt Nam, 
            cam kết mang đến những cơ hội nghề nghiệp tốt nhất cho người tìm việc 
            và tìm kiếm những ứng viên tài năng cho doanh nghiệp.
          </p>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index}>
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-light rounded-full mb-4">
                    <Icon className="h-8 w-8 text-orange-primary" />
                  </div>
                  <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                  <div className="text-gray-600">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Mission & Vision */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <Card>
              <CardContent className="p-8">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-orange-primary rounded-lg flex items-center justify-center mr-4">
                    <Target className="h-6 w-6 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">Sứ mệnh</h2>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  Tạo ra một hệ sinh thái tuyển dụng minh bạch, hiệu quả và đáng tin cậy, 
                  nơi mọi người đều có thể tìm thấy công việc phù hợp với năng lực và đam mê của mình. 
                  Chúng tôi cam kết xây dựng cầu nối vững chắc giữa tài năng và cơ hội.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-8">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-orange-primary rounded-lg flex items-center justify-center mr-4">
                    <TrendingUp className="h-6 w-6 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">Tầm nhìn</h2>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  Trở thành nền tảng tuyển dụng số 1 Việt Nam vào năm 2030, 
                  được biết đến với chất lượng dịch vụ vượt trội và công nghệ tiên tiến. 
                  Mở rộng ra khu vực Đông Nam Á và góp phần phát triển thị trường lao động bền vững.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Values */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Giá trị cốt lõi</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Những giá trị định hướng mọi hoạt động của chúng tôi
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-light rounded-full mb-4">
                      <Icon className="h-8 w-8 text-orange-primary" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">{value.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{value.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>

      {/* Our Story */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Câu chuyện của chúng tôi</h2>
            <p className="text-xl text-gray-600">
              Hành trình từ ý tưởng đến hiện thực
            </p>
          </div>

          <div className="space-y-8">
            <Card>
              <CardContent className="p-8">
                <div className="flex items-center mb-4">
                  <Badge className="bg-orange-primary text-white mr-3">2020</Badge>
                  <h3 className="text-xl font-semibold text-gray-900">Khởi đầu</h3>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  JobPortal được thành lập bởi một nhóm chuyên gia HR và công nghệ với mong muốn 
                  cải thiện trải nghiệm tuyển dụng tại Việt Nam. Chúng tôi nhận thấy sự cần thiết 
                  của một nền tảng hiện đại, tiện lợi và đáng tin cậy.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-8">
                <div className="flex items-center mb-4">
                  <Badge className="bg-orange-primary text-white mr-3">2022</Badge>
                  <h3 className="text-xl font-semibold text-gray-900">Phát triển mạnh mẽ</h3>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  Với hơn 10,000 công ty và 50,000 ứng viên tin tưởng, JobPortal đã trở thành 
                  một trong những nền tảng tuyển dụng uy tín nhất. Chúng tôi ra mắt nhiều tính năng 
                  mới như AI matching, video interview và career coaching.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-8">
                <div className="flex items-center mb-4">
                  <Badge className="bg-orange-primary text-white mr-3">2024</Badge>
                  <h3 className="text-xl font-semibold text-gray-900">Tương lai</h3>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  Tiếp tục đổi mới và phát triển, JobPortal hướng tới việc mở rộng ra thị trường 
                  quốc tế và ứng dụng những công nghệ tiên tiến nhất như AI, Machine Learning 
                  để mang đến trải nghiệm tuyển dụng tốt nhất.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Team */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Đội ngũ lãnh đạo</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Những người đam mê và tận tụy đang xây dựng tương lai của tuyển dụng
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <img 
                    src={member.avatar}
                    alt={member.name}
                    className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                    onError={handleImageError}
                  />
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">{member.name}</h3>
                  <p className="text-orange-primary font-medium mb-3">{member.position}</p>
                  <p className="text-gray-600 text-sm leading-relaxed">{member.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-16 bg-gradient-to-r from-orange-500 to-orange-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Sẵn sàng bắt đầu hành trình mới?
          </h2>
          <p className="text-xl text-orange-100 mb-8">
            Hãy gia nhập cộng đồng JobPortal ngay hôm nay
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => navigate("register")}
              className="bg-white text-orange-primary px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
            >
              Đăng ký ngay
            </button>
            <button 
              onClick={() => navigate("jobs")}
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-orange-primary transition-colors"
            >
              Tìm việc làm
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}