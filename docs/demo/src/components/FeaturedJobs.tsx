import React from "react";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { 
  MapPin, 
  DollarSign, 
  Clock, 
  Bookmark, 
  ArrowRight,
  Star,
  Building2
} from "lucide-react";

interface FeaturedJobsProps {
  navigate: (page: string, id?: string) => void;
}

export function FeaturedJobs({ navigate }: FeaturedJobsProps) {
  const jobs = [
    {
      id: "1",
      title: "Senior Frontend Developer",
      company: "TechCorp Vietnam",
      logo: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=64&h=64&fit=crop&crop=face",
      location: "TP. Hồ Chí Minh",
      salary: "25 - 35 triệu",
      type: "Toàn thời gian",
      posted: "2 ngày trước",
      featured: true,
      urgent: false,
      tags: ["React", "TypeScript", "Remote"]
    },
    {
      id: "2", 
      title: "Product Manager",
      company: "StartupVN",
      logo: "https://images.unsplash.com/photo-1572021335469-31706a17aaef?w=64&h=64&fit=crop&crop=face",
      location: "Hà Nội",
      salary: "30 - 45 triệu",
      type: "Toàn thời gian",
      posted: "1 ngày trước",
      featured: false,
      urgent: true,
      tags: ["Strategy", "Analytics", "Agile"]
    },
    {
      id: "3",
      title: "UX/UI Designer",
      company: "Design Studio",
      logo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=64&h=64&fit=crop&crop=face",
      location: "Đà Nẵng",
      salary: "18 - 28 triệu",
      type: "Bán thời gian",
      posted: "3 ngày trước",
      featured: true,
      urgent: false,
      tags: ["Figma", "Design System", "Prototype"]
    },
    {
      id: "4",
      title: "Full Stack Developer",
      company: "Digital Agency",
      logo: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=64&h=64&fit=crop&crop=face",
      location: "Làm từ xa",
      salary: "20 - 30 triệu",
      type: "Hợp đồng",
      posted: "1 ngày trước",
      featured: false,
      urgent: false,
      tags: ["Node.js", "Vue.js", "MongoDB"]
    },
    {
      id: "5",
      title: "Data Scientist",
      company: "AI Solutions",
      logo: "https://images.unsplash.com/photo-1572021335469-31706a17aaef?w=64&h=64&fit=crop&crop=face",
      location: "TP. Hồ Chí Minh",
      salary: "35 - 50 triệu",
      type: "Toàn thời gian",
      posted: "4 ngày trước",
      featured: true,
      urgent: false,
      tags: ["Python", "Machine Learning", "SQL"]
    },
    {
      id: "6",
      title: "Marketing Manager",
      company: "Growth Co",
      logo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=64&h=64&fit=crop&crop=face",
      location: "Hà Nội",
      salary: "22 - 32 triệu",
      type: "Toàn thời gian",
      posted: "2 ngày trước",
      featured: false,
      urgent: true,
      tags: ["Digital Marketing", "SEO", "Analytics"]
    }
  ];

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const target = e.target as HTMLImageElement;
    target.src = `data:image/svg+xml;base64,${btoa(`
      <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="64" height="64" rx="8" fill="#f26b38"/>
        <path d="M32 16C36.4183 16 40 19.5817 40 24V40C40 44.4183 36.4183 48 32 48C27.5817 48 24 44.4183 24 40V24C24 19.5817 27.5817 16 32 16ZM32 20C29.7909 20 28 21.7909 28 24V40C28 42.2091 29.7909 44 32 44C34.2091 44 36 42.2091 36 40V24C36 21.7909 34.2091 20 32 20Z" fill="white"/>
      </svg>
    `)}`;
  };

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Việc làm nổi bật
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Khám phá những cơ hội việc làm hấp dẫn từ các công ty hàng đầu
          </p>
        </div>

        {/* Jobs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {jobs.map((job) => (
            <Card 
              key={job.id} 
              className="group hover:shadow-xl transition-all duration-300 cursor-pointer border-2 hover:border-orange-200 relative overflow-hidden"
              onClick={() => navigate("job-detail", job.id)}
            >
              {/* Featured Badge */}
              {job.featured && (
                <div className="absolute -top-2 -right-2 bg-gradient-to-r from-orange-primary to-orange-600 text-white text-xs px-3 py-1 rounded-full flex items-center gap-1 z-10 shadow-lg">
                  <Star className="h-3 w-3 fill-current" />
                  NỔI BẬT
                </div>
              )}

              {/* Urgent Badge */}
              {job.urgent && (
                <div className="absolute top-3 left-3 bg-red-500 text-white text-xs px-2 py-1 rounded-full z-10">
                  URGENT
                </div>
              )}

              <CardContent className="p-6">
                {/* Company Logo & Info */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <img 
                      src={job.logo}
                      alt={job.company}
                      className="w-12 h-12 rounded-lg object-cover ring-2 ring-gray-100"
                      onError={handleImageError}
                    />
                    <div>
                      <h3 className="font-semibold text-gray-900 group-hover:text-orange-primary transition-colors">
                        {job.title}
                      </h3>
                      <p className="text-sm text-gray-600 flex items-center">
                        <Building2 className="h-3 w-3 mr-1" />
                        {job.company}
                      </p>
                    </div>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    className="text-gray-400 hover:text-orange-primary"
                    onClick={(e) => {
                      e.stopPropagation();
                      // Handle bookmark
                    }}
                  >
                    <Bookmark className="h-4 w-4" />
                  </Button>
                </div>

                {/* Job Details */}
                <div className="space-y-3 mb-4">
                  <div className="flex items-center text-sm text-gray-600">
                    <MapPin className="h-4 w-4 mr-2 text-gray-400" />
                    {job.location}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <DollarSign className="h-4 w-4 mr-2 text-gray-400" />
                    {job.salary}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Clock className="h-4 w-4 mr-2 text-gray-400" />
                    {job.posted}
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {job.tags.slice(0, 2).map((tag, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                  {job.tags.length > 2 && (
                    <Badge variant="outline" className="text-xs">
                      +{job.tags.length - 2}
                    </Badge>
                  )}
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between">
                  <Badge 
                    variant={job.type === "Toàn thời gian" ? "default" : "outline"}
                    className="text-xs"
                  >
                    {job.type}
                  </Badge>
                  <Button 
                    size="sm" 
                    className="bg-orange-primary hover:bg-orange-600 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate("job-detail", job.id);
                    }}
                  >
                    Xem chi tiết
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center">
          <Button 
            size="lg"
            variant="outline"
            onClick={() => navigate("jobs")}
            className="border-orange-primary text-orange-primary hover:bg-orange-primary hover:text-white"
          >
            Xem tất cả việc làm
            <ArrowRight className="h-5 w-5 ml-2" />
          </Button>
        </div>
      </div>
    </section>
  );
}