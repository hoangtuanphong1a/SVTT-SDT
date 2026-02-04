import React, { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Search, MapPin, Briefcase, TrendingUp, Users, Building2 } from "lucide-react";

interface HeroSectionProps {
  navigate: (page: string, id?: string) => void;
}

export function HeroSection({ navigate }: HeroSectionProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [location, setLocation] = useState("");

  const handleSearch = () => {
    navigate("jobs");
  };

  const popularSearches = [
    "Frontend Developer",
    "Marketing Manager", 
    "Data Analyst",
    "UX Designer",
    "Product Manager"
  ];

  const stats = [
    { icon: Briefcase, value: "10,000+", label: "Việc làm" },
    { icon: Building2, value: "2,500+", label: "Công ty" },
    { icon: Users, value: "50,000+", label: "Ứng viên" },
    { icon: TrendingUp, value: "95%", label: "Thành công" }
  ];

  return (
    <section className="relative bg-gradient-to-br from-orange-50 to-orange-100 py-20 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-20 h-20 bg-orange-primary rounded-full"></div>
        <div className="absolute top-40 right-20 w-16 h-16 bg-orange-primary rounded-full"></div>
        <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-orange-primary rounded-full"></div>
        <div className="absolute bottom-40 right-1/3 w-24 h-24 bg-orange-primary rounded-full"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-12">
          {/* Main Heading */}
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Tìm kiếm việc làm
            <span className="text-orange-primary block">mơ ước của bạn</span>
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Kết nối với hàng nghìn cơ hội nghề nghiệp từ các công ty hàng đầu. 
            Tạo CV chuyên nghiệp và ứng tuyển ngay hôm nay.
          </p>

          {/* Search Box */}
          <div className="max-w-4xl mx-auto mb-8">
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Job Title/Keyword */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <Input
                    type="text"
                    placeholder="Vị trí, kỹ năng, công ty..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 h-12 text-base border-gray-200 focus:border-orange-primary"
                  />
                </div>

                {/* Location */}
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <select 
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full pl-10 h-12 text-base border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-primary focus:border-orange-primary outline-none bg-white"
                  >
                    <option value="">Tất cả địa điểm</option>
                    <option value="ho-chi-minh">TP. Hồ Chí Minh</option>
                    <option value="ha-noi">Hà Nội</option>
                    <option value="da-nang">Đà Nẵng</option>
                    <option value="can-tho">Cần Thơ</option>
                    <option value="remote">Làm từ xa</option>
                  </select>
                </div>

                {/* Search Button */}
                <Button 
                  onClick={handleSearch}
                  className="h-12 bg-orange-primary hover:bg-orange-600 text-white font-semibold text-base"
                >
                  <Search className="h-5 w-5 mr-2" />
                  Tìm kiếm
                </Button>
              </div>
            </div>
          </div>

          {/* Popular Searches */}
          <div className="mb-12">
            <p className="text-gray-600 mb-4">Tìm kiếm phổ biến:</p>
            <div className="flex flex-wrap justify-center gap-3">
              {popularSearches.map((search, index) => (
                <button
                  key={index}
                  onClick={() => navigate("jobs")}
                  className="px-4 py-2 bg-white text-gray-700 rounded-full border border-gray-200 hover:border-orange-primary hover:text-orange-primary transition-colors text-sm"
                >
                  {search}
                </button>
              ))}
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-orange-primary rounded-full mb-3">
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
                  <div className="text-gray-600">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}