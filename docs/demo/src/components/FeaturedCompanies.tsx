import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { MapPin, Users, Star } from "lucide-react";

const featuredCompanies = [
  {
    id: 1,
    name: "TechViet Solutions",
    logo: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=200&h=200&fit=crop&crop=center",
    location: "Hà Nội",
    employees: "200-500",
    rating: 4.8,
    jobs: 12,
    industry: "Công nghệ thông tin",
    featured: true
  },
  {
    id: 2,
    name: "Creative Agency",
    logo: "https://images.unsplash.com/photo-1549924231-f129b911e442?w=200&h=200&fit=crop&crop=center",
    location: "TP. Hồ Chí Minh",
    employees: "50-100",
    rating: 4.6,
    jobs: 8,
    industry: "Thiết kế & Marketing",
    featured: false
  },
  {
    id: 3,
    name: "StartupXYZ",
    logo: "https://images.unsplash.com/photo-1572021335469-31706a17aaef?w=200&h=200&fit=crop&crop=center",
    location: "Remote",
    employees: "10-50",
    rating: 4.9,
    jobs: 5,
    industry: "Fintech",
    featured: true
  },
  {
    id: 4,
    name: "Big Corp",
    logo: "https://images.unsplash.com/photo-1560472355-536de3962603?w=200&h=200&fit=crop&crop=center",
    location: "Đà Nẵng",
    employees: "1000+",
    rating: 4.5,
    jobs: 25,
    industry: "Tài chính",
    featured: false
  },
  {
    id: 5,
    name: "Cloud Systems",
    logo: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=200&h=200&fit=crop&crop=center",
    location: "Hà Nội",
    employees: "100-200",
    rating: 4.7,
    jobs: 15,
    industry: "Cloud Computing",
    featured: true
  },
  {
    id: 6,
    name: "Digital Marketing Co",
    logo: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=200&h=200&fit=crop&crop=center",
    location: "TP. Hồ Chí Minh",
    employees: "20-50",
    rating: 4.4,
    jobs: 7,
    industry: "Digital Marketing",
    featured: false
  }
];

export function FeaturedCompanies() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Công ty nổi bật
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Khám phá các công ty hàng đầu đang tìm kiếm nhân tài như bạn
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {featuredCompanies.map((company) => (
            <Card key={company.id} className="hover:shadow-lg transition-shadow cursor-pointer relative">
              {company.featured && (
                <div className="absolute top-4 right-4 z-10">
                  <Badge className="bg-[#f26b38] text-white">
                    <Star className="w-3 h-3 mr-1" />
                    Nổi bật
                  </Badge>
                </div>
              )}
              
              <CardContent className="p-6">
                <div className="text-center mb-6">
                  <div className="w-20 h-20 mx-auto mb-4 rounded-xl overflow-hidden bg-gray-200">
                    <ImageWithFallback
                      src={company.logo}
                      alt={company.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="font-semibold text-lg text-gray-900 mb-2">
                    {company.name}
                  </h3>
                  <Badge variant="secondary" className="text-xs mb-4">
                    {company.industry}
                  </Badge>
                </div>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center text-gray-600">
                      <MapPin className="h-4 w-4 mr-2" />
                      {company.location}
                    </div>
                    <div className="flex items-center text-yellow-500">
                      <Star className="h-4 w-4 mr-1 fill-current" />
                      {company.rating}
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center text-gray-600">
                      <Users className="h-4 w-4 mr-2" />
                      {company.employees} nhân viên
                    </div>
                    <div className="text-[#f26b38] font-medium">
                      {company.jobs} việc làm
                    </div>
                  </div>
                </div>

                <Button 
                  variant="outline" 
                  className="w-full border-[#f26b38] text-[#f26b38] hover:bg-[#f26b38] hover:text-white"
                >
                  Xem công ty
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button variant="outline" className="border-[#f26b38] text-[#f26b38] hover:bg-[#f26b38] hover:text-white">
            Xem tất cả công ty
          </Button>
        </div>
      </div>
    </section>
  );
}