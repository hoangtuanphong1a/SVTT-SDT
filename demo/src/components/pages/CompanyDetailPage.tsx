import React, { useState } from "react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Card, CardContent } from "../ui/card";
import { 
  MapPin, 
  Users, 
  Globe, 
  Star, 
  Heart,
  Share2,
  Briefcase,
  Calendar,
  ChevronRight,
  ArrowLeft,
  Phone,
  Mail,
  ExternalLink,
  Eye,
  CheckCircle,
  Building2,
  DollarSign,
  Clock
} from "lucide-react";
import BreadcrumbTabActive from "../ui/common/breadcrumb/BreadcrumbTabActive";

interface CompanyDetailPageProps {
  companyId: string | null;
  navigate?: (page: string, id?: string) => void;
}

export default function CompanyDetailPage({ companyId, navigate }: CompanyDetailPageProps) {
  const [isFollowing, setIsFollowing] = useState(false);

  // Mock company data - in real app would fetch based on companyId
  const company = {
    id: companyId || "1",
    name: "TechCorp Vietnam",
    logo: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=120&h=120&fit=crop&crop=face",
    industry: "Công nghệ thông tin",
    size: "100-500 nhân viên",
    location: "TP. Hồ Chí Minh",
    website: "https://techcorp.vn",
    founded: "2015",
    rating: 4.5,
    reviews: 128,
    followers: 1250,
    description: "TechCorp Vietnam là một công ty công nghệ hàng đầu chuyên phát triển các giải pháp phần mềm cho doanh nghiệp. Chúng tôi tự hào là đối tác tin cậy của nhiều công ty lớn trong và ngoài nước.",
    mission: "Tạo ra những sản phẩm công nghệ có tác động tích cực đến xã hội và cuộc sống con người.",
    values: [
      "Đổi mới sáng tạo",
      "Chất lượng cao",
      "Làm việc nhóm",
      "Trách nhiệm xã hội"
    ],
    benefits: [
      "Lương cạnh tranh, thưởng hiệu suất",
      "Bảo hiểm sức khỏe toàn diện", 
      "Làm việc từ xa linh hoạt",
      "Cơ hội đào tạo và phát triển",
      "Môi trường làm việc hiện đại",
      "Team building và du lịch"
    ],
    culture: [
      "Môi trường năng động, sáng tạo",
      "Khuyến khích học hỏi và thử nghiệm",
      "Văn hóa phản hồi mở",
      "Work-life balance"
    ],
    openJobs: [
      {
        id: "1",
        title: "Senior Frontend Developer",
        department: "Engineering",
        type: "Toàn thời gian",
        salary: "25-35 triệu",
        posted: "2 ngày trước"
      },
      {
        id: "2", 
        title: "Product Manager",
        department: "Product",
        type: "Toàn thời gian", 
        salary: "30-45 triệu",
        posted: "1 tuần trước"
      },
      {
        id: "3",
        title: "UX/UI Designer",
        department: "Design",
        type: "Toàn thời gian",
        salary: "18-28 triệu", 
        posted: "3 ngày trước"
      }
    ]
  };

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const target = e.target as HTMLImageElement;
    target.src = `data:image/svg+xml;base64,${btoa(`
      <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="120" height="120" rx="16" fill="#f26b38"/>
        <path d="M60 30C69.9411 30 78 38.0589 78 48V72C78 81.9411 69.9411 90 60 90C50.0589 90 42 81.9411 42 72V48C42 38.0589 50.0589 30 60 30ZM60 39C55.0294 39 51 43.0294 51 48V72C51 76.9706 55.0294 81 60 81C64.9706 81 69 76.9706 69 72V48C69 43.0294 64.9706 39 60 39Z" fill="white"/>
      </svg>
    `)}`;
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `${company.name} - CV King`,
        text: `Tìm hiểu về công ty ${company.name}`,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <div className="mb-8">
          <BreadcrumbTabActive 
            items={[
              { name: "Trang chủ", onClick: () => navigate?.("home") },
              { name: "Công ty", onClick: () => navigate?.("companies") },
              { name: company.name }
            ]} 
          />
        </div>

        {/* Back Button */}
        <div className="flex items-center mb-6">
          <button 
            onClick={() => navigate?.("companies")}
            className="flex items-center text-gray-600 hover:text-[#f26b38] transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Quay lại danh sách công ty
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Company Header Card */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-start gap-4 flex-1">
                  <div className="flex-shrink-0">
                    <img 
                      src={company.logo}
                      alt={company.name}
                      className="w-20 h-20 rounded-lg object-cover"
                      onError={handleImageError}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">{company.name}</h1>
                    <p className="text-lg text-gray-700 mb-2 flex items-center">
                      <Building2 className="h-4 w-4 mr-2 text-gray-400" />
                      {company.industry}
                    </p>
                    <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                      <span className="flex items-center">
                        <Eye className="h-4 w-4 mr-1" />
                        {company.reviews} đánh giá
                      </span>
                      <span className="flex items-center">
                        <Users className="h-4 w-4 mr-1" />
                        {company.followers} người theo dõi
                      </span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 fill-[#f26b38] text-[#f26b38]" />
                      <span className="font-medium">{company.rating}</span>
                      <span className="text-gray-500">({company.reviews} đánh giá)</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <button
                    onClick={() => setIsFollowing(!isFollowing)}
                    className={`p-2 rounded-lg border transition-colors ${
                      isFollowing 
                        ? "text-[#f26b38] border-[#f26b38] bg-orange-50" 
                        : "text-gray-400 border-gray-300 hover:text-[#f26b38] hover:border-[#f26b38]"
                    }`}
                  >
                    <Heart className={`h-4 w-4 ${isFollowing ? "fill-current" : ""}`} />
                  </button>
                  <button
                    onClick={handleShare}
                    className="p-2 rounded-lg border border-gray-300 text-gray-400 hover:text-[#f26b38] hover:border-[#f26b38] transition-colors"
                  >
                    <Share2 className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Company Info Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <div className="flex items-center text-sm text-gray-600">
                  <MapPin className="h-4 w-4 mr-2 text-gray-400 flex-shrink-0" />
                  <span>{company.location}</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Users className="h-4 w-4 mr-2 text-gray-400 flex-shrink-0" />
                  <span>{company.size}</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Calendar className="h-4 w-4 mr-2 text-gray-400 flex-shrink-0" />
                  <span>Thành lập {company.founded}</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Globe className="h-4 w-4 mr-2 text-gray-400 flex-shrink-0" />
                  <a href={company.website} target="_blank" rel="noopener noreferrer" className="text-[#f26b38] hover:underline">
                    Website
                  </a>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <button 
                  onClick={() => setIsFollowing(!isFollowing)}
                  className={`flex-1 sm:flex-none px-6 py-3 rounded-lg transition-colors flex items-center justify-center gap-2 ${
                    isFollowing 
                      ? "border border-[#f26b38] text-[#f26b38] bg-orange-50" 
                      : "bg-[#f26b38] hover:bg-[#e55a2b] text-white"
                  }`}
                >
                  <Heart className={`h-4 w-4 ${isFollowing ? "fill-current" : ""}`} />
                  {isFollowing ? "Đang theo dõi" : "Theo dõi công ty"}
                </button>
                <button 
                  onClick={() => navigate?.("jobs")}
                  className="flex-1 sm:flex-none border border-gray-300 hover:border-[#f26b38] hover:text-[#f26b38] px-6 py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                  <Briefcase className="h-4 w-4" />
                  Xem việc làm
                </button>
              </div>
            </div>

            {/* About Company */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h2 className="font-semibold text-gray-900 mb-4">Giới thiệu công ty</h2>
              <div className="prose prose-gray max-w-none">
                <p className="text-gray-700 leading-relaxed mb-6">{company.description}</p>
                
                <div className="mb-6">
                  <h3 className="font-semibold text-gray-900 mb-3">Sứ mệnh</h3>
                  <p className="text-gray-700 leading-relaxed">{company.mission}</p>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Giá trị cốt lõi</h3>
                  <ul className="space-y-2">
                    {company.values.map((value, index) => (
                      <li key={index} className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{value}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Culture */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h2 className="font-semibold text-gray-900 mb-4">Văn hóa công ty</h2>
              <ul className="space-y-3">
                {company.culture.map((item, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Benefits */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h2 className="font-semibold text-gray-900 mb-4">Quyền lợi & Phúc lợi</h2>
              <ul className="space-y-3">
                {company.benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Company Info */}
            <div className="bg-white rounded-lg shadow-sm border p-6 sticky top-24">
              <h3 className="font-semibold text-gray-900 mb-4">Thông tin công ty</h3>
              <div className="space-y-4">
                <div>
                  <span className="text-sm text-gray-500">Tên công ty</span>
                  <p className="font-medium text-gray-900">{company.name}</p>
                </div>
                <div>
                  <span className="text-sm text-gray-500">Quy mô</span>
                  <p className="font-medium text-gray-900">{company.size}</p>
                </div>
                <div>
                  <span className="text-sm text-gray-500">Lĩnh vực</span>
                  <p className="font-medium text-gray-900">{company.industry}</p>
                </div>
                <div>
                  <span className="text-sm text-gray-500">Thành lập</span>
                  <p className="font-medium text-gray-900">{company.founded}</p>
                </div>
                
                {/* Contact Info */}
                <div className="pt-4 border-t border-gray-200">
                  <span className="text-sm text-gray-500 block mb-3">Thông tin liên hệ</span>
                  <div className="space-y-2">
                    <div className="flex items-center text-sm text-gray-600">
                      <Globe className="h-4 w-4 mr-2 text-gray-400" />
                      <a href={company.website} target="_blank" rel="noopener noreferrer" className="text-[#f26b38] hover:underline">
                        Website
                      </a>
                    </div>
                  </div>
                </div>
                
                <button 
                  onClick={() => navigate?.("companies")}
                  className="w-full border border-gray-300 hover:border-[#f26b38] hover:text-[#f26b38] px-4 py-2 rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                  <ExternalLink className="h-4 w-4" />
                  Xem công ty khác
                </button>
              </div>
            </div>

            {/* Open Jobs */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-900">Vị trí đang tuyển</h3>
                <Badge className="bg-[#f26b38] text-white">
                  {company.openJobs.length} vị trí
                </Badge>
              </div>
              <div className="space-y-4">
                {company.openJobs.map((job) => (
                  <div 
                    key={job.id}
                    className="border border-gray-200 rounded-lg p-4 hover:border-[#f26b38] cursor-pointer transition-colors group"
                    onClick={() => navigate?.("job-detail", job.id)}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-gray-900 group-hover:text-[#f26b38] transition-colors line-clamp-1">
                        {job.title}
                      </h4>
                      <ChevronRight className="h-4 w-4 text-gray-400 group-hover:text-[#f26b38] transition-colors" />
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{job.department}</p>
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span className="flex items-center">
                        <DollarSign className="h-3 w-3 mr-1" />
                        {job.salary}
                      </span>
                      <span>{job.type}</span>
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      Đăng {job.posted}
                    </div>
                  </div>
                ))}
              </div>
              <button 
                onClick={() => navigate?.("jobs")}
                className="w-full border border-gray-300 hover:border-[#f26b38] hover:text-[#f26b38] px-4 py-2 rounded-lg transition-colors mt-4"
              >
                Xem thêm việc làm
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}