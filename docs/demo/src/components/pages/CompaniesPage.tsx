import React, { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import { 
  Search, 
  MapPin, 
  Users, 
  Star, 
  ChevronRight,
  Filter,
  Building2,
  Globe,
  Briefcase,
  Heart
} from "lucide-react";

interface CompaniesPageProps {
  navigate: (page: string, id?: string) => void;
}

export default function CompaniesPage({ navigate }: CompaniesPageProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedIndustry, setSelectedIndustry] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");

  const companies = [
    {
      id: "1",
      name: "TechCorp Vietnam",
      logo: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=80&h=80&fit=crop&crop=face",
      industry: "Công nghệ thông tin",
      size: "100-500 nhân viên",
      location: "TP. Hồ Chí Minh",
      rating: 4.5,
      reviews: 128,
      openJobs: 15,
      featured: true,
      description: "Công ty công nghệ hàng đầu chuyên phát triển các giải pháp phần mềm cho doanh nghiệp.",
      website: "techcorp.vn",
      benefits: ["Lương cao", "Bảo hiểm", "Remote", "Du lịch"],
      tags: ["React", "Node.js", "AWS", "Agile"]
    },
    {
      id: "2",
      name: "StartupVN",
      logo: "https://images.unsplash.com/photo-1572021335469-31706a17aaef?w=80&h=80&fit=crop&crop=face",
      industry: "Fintech",
      size: "50-100 nhân viên",
      location: "Hà Nội",
      rating: 4.2,
      reviews: 89,
      openJobs: 8,
      featured: false,
      description: "Startup fintech tiên phong trong lĩnh vực thanh toán điện tử tại Việt Nam.",
      website: "startupvn.com",
      benefits: ["Equity", "Flexible", "Learning", "Innovation"],
      tags: ["Blockchain", "Mobile", "API", "Scrum"]
    },
    {
      id: "3",
      name: "Design Studio",
      logo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face",
      industry: "Design & Creative",
      size: "20-50 nhân viên", 
      location: "Đà Nẵng",
      rating: 4.7,
      reviews: 45,
      openJobs: 5,
      featured: true,
      description: "Studio thiết kế chuyên nghiệp với đội ngũ sáng tạo trẻ trung và năng động.",
      website: "designstudio.vn",
      benefits: ["Creative", "Flexible", "Projects", "Growth"],
      tags: ["Figma", "Adobe", "UI/UX", "Branding"]
    },
    {
      id: "4",
      name: "Digital Agency",
      logo: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=80&h=80&fit=crop&crop=face",
      industry: "Marketing Digital",
      size: "50-100 nhân viên",
      location: "TP. Hồ Chí Minh", 
      rating: 4.1,
      reviews: 67,
      openJobs: 12,
      featured: false,
      description: "Agency marketing digital hàng đầu với nhiều năm kinh nghiệm phục vụ khách hàng lớn.",
      website: "digitalagency.vn",
      benefits: ["Bonus", "Training", "Travel", "Health"],
      tags: ["SEO", "SEM", "Social", "Analytics"]
    },
    {
      id: "5",
      name: "AI Solutions",
      logo: "https://images.unsplash.com/photo-1572021335469-31706a17aaef?w=80&h=80&fit=crop&crop=face",
      industry: "Trí tuệ nhân tạo",
      size: "100-200 nhân viên",
      location: "TP. Hồ Chí Minh",
      rating: 4.6,
      reviews: 92,
      openJobs: 18,
      featured: true,
      description: "Công ty tiên phong trong nghiên cứu và phát triển các giải pháp AI.",
      website: "aisolutions.vn",
      benefits: ["Research", "Innovation", "Remote", "Equipment"],
      tags: ["Python", "ML", "Deep Learning", "Computer Vision"]
    },
    {
      id: "6",
      name: "Growth Co",
      logo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face",
      industry: "E-commerce",
      size: "200-500 nhân viên",
      location: "Hà Nội",
      rating: 4.3,
      reviews: 156,
      openJobs: 22,
      featured: false,
      description: "Nền tảng thương mại điện tử hàng đầu với hệ sinh thái sản phẩm đa dạng.",
      website: "growthco.vn", 
      benefits: ["Stock Options", "Health", "Gym", "Lunch"],
      tags: ["React", "Microservices", "Kubernetes", "DevOps"]
    }
  ];

  const industries = [
    "Tất cả ngành",
    "Công nghệ thông tin",
    "Fintech", 
    "Design & Creative",
    "Marketing Digital",
    "Trí tuệ nhân tạo",
    "E-commerce"
  ];

  const companySizes = [
    "Tất cả quy mô",
    "1-20 nhân viên",
    "20-50 nhân viên", 
    "50-100 nhân viên",
    "100-500 nhân viên",
    "500+ nhân viên"
  ];

  const locations = [
    "Tất cả địa điểm",
    "TP. Hồ Chí Minh",
    "Hà Nội",
    "Đà Nẵng",
    "Cần Thơ"
  ];

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const target = e.target as HTMLImageElement;
    target.src = `data:image/svg+xml;base64,${btoa(`
      <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="80" height="80" rx="12" fill="#f26b38"/>
        <path d="M40 20C46.6274 20 52 25.3726 52 32V48C52 54.6274 46.6274 60 40 60C33.3726 60 28 54.6274 28 48V32C28 25.3726 33.3726 20 40 20ZM40 26C36.6863 26 34 28.6863 34 32V48C34 51.3137 36.6863 54 40 54C43.3137 54 46 51.3137 46 48V32C46 28.6863 43.3137 26 40 26Z" fill="white"/>
      </svg>
    `)}`;
  };

  const filteredCompanies = companies.filter(company => {
    const matchesSearch = company.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         company.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesIndustry = selectedIndustry === "" || selectedIndustry === "Tất cả ngành" || company.industry === selectedIndustry;
    const matchesSize = selectedSize === "" || selectedSize === "Tất cả quy mô" || company.size === selectedSize;
    const matchesLocation = selectedLocation === "" || selectedLocation === "Tất cả địa điểm" || company.location === selectedLocation;
    
    return matchesSearch && matchesIndustry && matchesSize && matchesLocation;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Khám phá các công ty hàng đầu
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Tìm hiểu về các công ty tuyển dụng và môi trường làm việc lý tưởng
            </p>
          </div>

          {/* Search and Filters */}
          <div className="max-w-4xl mx-auto space-y-4">
            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                type="text"
                placeholder="Tìm kiếm công ty, ngành nghề..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-12 text-base"
              />
            </div>

            {/* Filters */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <select
                value={selectedIndustry}
                onChange={(e) => setSelectedIndustry(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-primary focus:border-orange-primary outline-none bg-white"
              >
                {industries.map((industry) => (
                  <option key={industry} value={industry}>
                    {industry}
                  </option>
                ))}
              </select>

              <select
                value={selectedSize}
                onChange={(e) => setSelectedSize(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-primary focus:border-orange-primary outline-none bg-white"
              >
                {companySizes.map((size) => (
                  <option key={size} value={size}>
                    {size}
                  </option>
                ))}
              </select>

              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-primary focus:border-orange-primary outline-none bg-white"
              >
                {locations.map((location) => (
                  <option key={location} value={location}>
                    {location}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">
            {filteredCompanies.length} công ty được tìm thấy
          </h2>
        </div>

        {/* Companies Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCompanies.map((company) => (
            <Card 
              key={company.id}
              className="group hover:shadow-xl transition-all duration-300 cursor-pointer border-2 hover:border-orange-200 relative overflow-hidden"
              onClick={() => navigate("company-detail", company.id)}
            >
              {/* Featured Badge */}
              {company.featured && (
                <div className="absolute -top-2 -right-2 bg-gradient-to-r from-orange-primary to-orange-600 text-white text-xs px-3 py-1 rounded-full flex items-center gap-1 z-10 shadow-lg">
                  <Star className="h-3 w-3 fill-current" />
                  NỔI BẬT
                </div>
              )}

              <CardContent className="p-6">
                {/* Company Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    <img 
                      src={company.logo}
                      alt={company.name}
                      className="w-16 h-16 rounded-lg object-cover ring-2 ring-gray-100"
                      onError={handleImageError}
                    />
                    <div>
                      <h3 className="font-bold text-lg text-gray-900 group-hover:text-orange-primary transition-colors">
                        {company.name}
                      </h3>
                      <p className="text-sm text-gray-600">{company.industry}</p>
                      <div className="flex items-center space-x-2 text-sm text-gray-500 mt-1">
                        <div className="flex items-center space-x-1">
                          <Star className="h-3 w-3 fill-orange-primary text-orange-primary" />
                          <span className="font-medium">{company.rating}</span>
                          <span>({company.reviews})</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    className="text-gray-400 hover:text-orange-primary"
                    onClick={(e) => {
                      e.stopPropagation();
                      // Handle follow company
                    }}
                  >
                    <Heart className="h-4 w-4" />
                  </Button>
                </div>

                {/* Company Info */}
                <div className="space-y-3 mb-4">
                  <div className="flex items-center text-sm text-gray-600">
                    <MapPin className="h-4 w-4 mr-2 text-gray-400" />
                    {company.location}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Users className="h-4 w-4 mr-2 text-gray-400" />
                    {company.size}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Briefcase className="h-4 w-4 mr-2 text-gray-400" />
                    {company.openJobs} vị trí tuyển dụng
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Globe className="h-4 w-4 mr-2 text-gray-400" />
                    {company.website}
                  </div>
                </div>

                {/* Description */}
                <p className="text-sm text-gray-700 mb-4 line-clamp-3">
                  {company.description}
                </p>

                {/* Benefits */}
                <div className="mb-4">
                  <p className="text-xs text-gray-500 mb-2">Quyền lợi:</p>
                  <div className="flex flex-wrap gap-1">
                    {company.benefits.slice(0, 3).map((benefit, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {benefit}
                      </Badge>
                    ))}
                    {company.benefits.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{company.benefits.length - 3}
                      </Badge>
                    )}
                  </div>
                </div>

                {/* Tech Tags */}
                <div className="mb-4">
                  <p className="text-xs text-gray-500 mb-2">Công nghệ:</p>
                  <div className="flex flex-wrap gap-1">
                    {company.tags.slice(0, 3).map((tag, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                    {company.tags.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{company.tags.length - 3}
                      </Badge>
                    )}
                  </div>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-orange-primary">
                    {company.openJobs} việc làm đang tuyển
                  </span>
                  <Button 
                    size="sm" 
                    className="bg-orange-primary hover:bg-orange-600 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate("company-detail", company.id);
                    }}
                  >
                    Xem chi tiết
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {filteredCompanies.length === 0 && (
          <div className="text-center py-12">
            <Building2 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Không tìm thấy công ty nào
            </h3>
            <p className="text-gray-600 mb-4">
              Thử điều chỉnh bộ lọc hoặc từ khóa tìm kiếm
            </p>
            <Button 
              variant="outline"
              onClick={() => {
                setSearchQuery("");
                setSelectedIndustry("");
                setSelectedSize("");
                setSelectedLocation("");
              }}
            >
              Xóa bộ lọc
            </Button>
          </div>
        )}

        {/* Load More */}
        {filteredCompanies.length > 0 && (
          <div className="text-center mt-12">
            <Button variant="outline" size="lg">
              Xem thêm công ty
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}