import React, { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import { 
  Search, 
  Calendar, 
  Clock, 
  Eye, 
  User, 
  ChevronRight,
  BookOpen,
  TrendingUp,
  Star
} from "lucide-react";

interface BlogPageProps {
  navigate: (page: string, id?: string) => void;
}

export default function BlogPage({ navigate }: BlogPageProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const articles = [
    {
      id: "1",
      title: "10 Cách tạo CV ấn tượng để thu hút nhà tuyển dụng",
      excerpt: "Hướng dẫn chi tiết cách tạo một bản CV chuyên nghiệp và nổi bật trong mắt nhà tuyển dụng.",
      content: "Trong thị trường việc làm cạnh tranh ngày nay, việc có một bản CV ấn tượng là điều cực kỳ quan trọng...",
      image: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=250&fit=crop",
      category: "CV",
      author: "Nguyễn Minh Anh",
      publishDate: "2024-12-10",
      readTime: "5 phút đọc",
      views: 1245,
      featured: true,
      tags: ["CV", "Tuyển dụng", "Nghề nghiệp"]
    },
    {
      id: "2", 
      title: "Cách trả lời phỏng vấn thông minh và tự tin",
      excerpt: "Những câu hỏi phỏng vấn phổ biến và cách trả lời một cách thông minh, tự tin.",
      content: "Phỏng vấn việc làm luôn là bước quan trọng nhất trong quá trình tuyển dụng...",
      image: "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=400&h=250&fit=crop",
      category: "Phỏng vấn",
      author: "Trần Văn Hòa",
      publishDate: "2024-12-08",
      readTime: "7 phút đọc", 
      views: 892,
      featured: false,
      tags: ["Phỏng vấn", "Kỹ năng", "Tự tin"]
    },
    {
      id: "3",
      title: "Xu hướng nghề nghiệp IT 2025: Những ngành hot nhất",
      excerpt: "Phân tích chi tiết về xu hướng phát triển của ngành IT và những nghề nghiệp được săn đón nhất.",
      content: "Ngành công nghệ thông tin đang phát triển với tốc độ chóng mặt, mở ra nhiều cơ hội nghề nghiệp mới...",
      image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400&h=250&fit=crop",
      category: "Xu hướng",
      author: "Lê Thị Mai",
      publishDate: "2024-12-05",
      readTime: "10 phút đọc",
      views: 2156,
      featured: true,
      tags: ["IT", "Xu hướng", "Công nghệ", "2025"]
    },
    {
      id: "4",
      title: "Kỹ năng mềm quan trọng nhất trong công việc",
      excerpt: "Những kỹ năng mềm thiết yếu mà mọi người lao động cần có để thành công trong công việc.",
      content: "Trong môi trường làm việc hiện đại, kỹ năng mềm đóng vai trò không kém phần quan trọng so với kỹ năng chuyên môn...",
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=250&fit=crop",
      category: "Kỹ năng",
      author: "Phạm Minh Tuấn",
      publishDate: "2024-12-03",
      readTime: "6 phút đọc",
      views: 687,
      featured: false,
      tags: ["Kỹ năng mềm", "Phát triển", "Nghề nghiệp"]
    },
    {
      id: "5",
      title: "Làm thế nào để đàm phán lương hiệu quả",
      excerpt: "Hướng dẫn chi tiết các bước và chiến lược đàm phán lương thành công với nhà tuyển dụng.",
      content: "Đàm phán lương là một kỹ năng quan trọng mà nhiều người lao động thường ngại thực hiện...",
      image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&h=250&fit=crop",
      category: "Lương thưởng",
      author: "Võ Thành Đạt",
      publishDate: "2024-12-01",
      readTime: "8 phút đọc",
      views: 1524,
      featured: true,
      tags: ["Lương", "Đàm phán", "Nghề nghiệp"]
    },
    {
      id: "6",
      title: "Work-life balance: Bí quyết cân bằng công việc và cuộc sống",
      excerpt: "Những phương pháp hiệu quả để duy trì sự cân bằng giữa công việc và cuộc sống cá nhân.",
      content: "Trong nhịp sống hiện đại, việc duy trì sự cân bằng giữa công việc và cuộc sống trở nên ngày càng khó khăn...",
      image: "https://images.unsplash.com/photo-1544717297-fa95b6ee9643?w=400&h=250&fit=crop",
      category: "Cuộc sống",
      author: "Nguyễn Thị Hương",
      publishDate: "2024-11-28",
      readTime: "9 phút đọc",
      views: 945,
      featured: false,
      tags: ["Work-life balance", "Sức khỏe", "Hạnh phúc"]
    }
  ];

  const categories = [
    "Tất cả",
    "CV", 
    "Phỏng vấn",
    "Xu hướng",
    "Kỹ năng",
    "Lương thưởng",
    "Cuộc sống"
  ];

  const featuredArticles = articles.filter(article => article.featured);
  const filteredArticles = articles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         article.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "" || selectedCategory === "Tất cả" || article.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: 'long', 
      day: 'numeric'
    });
  };

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const target = e.target as HTMLImageElement;
    target.src = `data:image/svg+xml;base64,${btoa(`
      <svg width="400" height="250" viewBox="0 0 400 250" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="400" height="250" fill="#f3f4f6"/>
        <rect x="150" y="100" width="100" height="50" rx="8" fill="#f26b38"/>
        <rect x="175" y="115" width="50" height="20" rx="4" fill="white"/>
      </svg>
    `)}`;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Blog nghề nghiệp
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Chia sẻ kinh nghiệm, kiến thức và xu hướng nghề nghiệp mới nhất
            </p>
          </div>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                type="text"
                placeholder="Tìm kiếm bài viết..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-12 text-base"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Featured Articles */}
        {!searchQuery && !selectedCategory && (
          <section className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900 flex items-center">
                <Star className="h-6 w-6 text-orange-primary mr-2 fill-current" />
                Bài viết nổi bật
              </h2>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {featuredArticles.map((article) => (
                <Card 
                  key={article.id}
                  className="group hover:shadow-xl transition-all duration-300 cursor-pointer border-2 hover:border-orange-200 overflow-hidden"
                  onClick={() => navigate("blog-detail", article.id)}
                >
                  <div className="relative">
                    <img 
                      src={article.image}
                      alt={article.title}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      onError={handleImageError}
                    />
                    <div className="absolute top-3 left-3">
                      <Badge className="bg-orange-primary text-white">
                        <Star className="h-3 w-3 mr-1 fill-current" />
                        Nổi bật
                      </Badge>
                    </div>
                    <div className="absolute top-3 right-3">
                      <Badge variant="secondary">
                        {article.category}
                      </Badge>
                    </div>
                  </div>
                  
                  <CardContent className="p-6">
                    <h3 className="font-bold text-lg text-gray-900 group-hover:text-orange-primary transition-colors mb-2 line-clamp-2">
                      {article.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                      {article.excerpt}
                    </p>
                    
                    <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                      <div className="flex items-center space-x-4">
                        <span className="flex items-center">
                          <User className="h-4 w-4 mr-1" />
                          {article.author}
                        </span>
                        <span className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1" />
                          {formatDate(article.publishDate)}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3 text-sm text-gray-500">
                        <span className="flex items-center">
                          <Clock className="h-4 w-4 mr-1" />
                          {article.readTime}
                        </span>
                        <span className="flex items-center">
                          <Eye className="h-4 w-4 mr-1" />
                          {article.views}
                        </span>
                      </div>
                      <Button 
                        size="sm" 
                        className="bg-orange-primary hover:bg-orange-600 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate("blog-detail", article.id);
                        }}
                      >
                        Đọc thêm
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        )}

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-1/4">
            <div className="sticky top-6 space-y-6">
              {/* Categories */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-bold text-lg mb-4">Danh mục</h3>
                  <div className="space-y-2">
                    {categories.map((category) => (
                      <button
                        key={category}
                        onClick={() => setSelectedCategory(category === "Tất cả" ? "" : category)}
                        className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                          (selectedCategory === category) || (selectedCategory === "" && category === "Tất cả")
                            ? "bg-orange-primary text-white"
                            : "text-gray-700 hover:bg-gray-100"
                        }`}
                      >
                        {category}
                        <span className="float-right text-xs opacity-75">
                          {category === "Tất cả" 
                            ? articles.length 
                            : articles.filter(a => a.category === category).length}
                        </span>
                      </button>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Top Articles */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-bold text-lg mb-4 flex items-center">
                    <TrendingUp className="h-5 w-5 mr-2 text-orange-primary" />
                    Bài viết được đọc nhiều
                  </h3>
                  <div className="space-y-4">
                    {articles
                      .sort((a, b) => b.views - a.views)
                      .slice(0, 5)
                      .map((article, index) => (
                        <div 
                          key={article.id}
                          className="flex items-start space-x-3 cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-colors"
                          onClick={() => navigate("blog-detail", article.id)}
                        >
                          <span className="flex-shrink-0 w-6 h-6 bg-orange-primary text-white rounded-full flex items-center justify-center text-xs font-bold">
                            {index + 1}
                          </span>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900 line-clamp-2">
                              {article.title}
                            </p>
                            <p className="text-xs text-gray-500 mt-1 flex items-center">
                              <Eye className="h-3 w-3 mr-1" />
                              {article.views} lượt xem
                            </p>
                          </div>
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:w-3/4">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">
                {selectedCategory ? `${selectedCategory} (${filteredArticles.length})` : `Tất cả bài viết (${filteredArticles.length})`}
              </h2>
            </div>

            {/* Articles List */}
            <div className="space-y-6">
              {filteredArticles.map((article) => (
                <Card 
                  key={article.id}
                  className="group hover:shadow-lg transition-all duration-300 cursor-pointer border hover:border-orange-200"
                  onClick={() => navigate("blog-detail", article.id)}
                >
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row gap-6">
                      <div className="md:w-1/3">
                        <img 
                          src={article.image}
                          alt={article.title}
                          className="w-full h-48 md:h-32 object-cover rounded-lg group-hover:scale-105 transition-transform duration-300"
                          onError={handleImageError}
                        />
                      </div>
                      
                      <div className="md:w-2/3 space-y-3">
                        <div className="flex items-center gap-2">
                          <Badge variant="outline">
                            {article.category}
                          </Badge>
                          {article.featured && (
                            <Badge className="bg-orange-primary text-white text-xs">
                              <Star className="h-3 w-3 mr-1 fill-current" />
                              Nổi bật
                            </Badge>
                          )}
                        </div>
                        
                        <h3 className="font-bold text-xl text-gray-900 group-hover:text-orange-primary transition-colors line-clamp-2">
                          {article.title}
                        </h3>
                        
                        <p className="text-gray-600 line-clamp-3">
                          {article.excerpt}
                        </p>
                        
                        <div className="flex flex-wrap items-center gap-1 mb-2">
                          {article.tags.map((tag, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                        
                        <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                          <div className="flex items-center space-x-4 text-sm text-gray-500">
                            <span className="flex items-center">
                              <User className="h-4 w-4 mr-1" />
                              {article.author}
                            </span>
                            <span className="flex items-center">
                              <Calendar className="h-4 w-4 mr-1" />
                              {formatDate(article.publishDate)}
                            </span>
                            <span className="flex items-center">
                              <Clock className="h-4 w-4 mr-1" />
                              {article.readTime}
                            </span>
                            <span className="flex items-center">
                              <Eye className="h-4 w-4 mr-1" />
                              {article.views}
                            </span>
                          </div>
                          
                          <Button 
                            size="sm"
                            variant="ghost" 
                            className="text-orange-primary hover:text-orange-600 opacity-0 group-hover:opacity-100 transition-opacity"
                            onClick={(e) => {
                              e.stopPropagation();
                              navigate("blog-detail", article.id);
                            }}
                          >
                            Đọc tiếp
                            <ChevronRight className="h-4 w-4 ml-1" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Empty State */}
            {filteredArticles.length === 0 && (
              <div className="text-center py-12">
                <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Không tìm thấy bài viết nào
                </h3>
                <p className="text-gray-600 mb-4">
                  Thử thay đổi từ khóa tìm kiếm hoặc danh mục
                </p>
                <Button 
                  variant="outline"
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedCategory("");
                  }}
                >
                  Xem tất cả bài viết
                </Button>
              </div>
            )}

            {/* Load More */}
            {filteredArticles.length > 0 && (
              <div className="text-center mt-12">
                <Button variant="outline" size="lg">
                  Xem thêm bài viết
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}