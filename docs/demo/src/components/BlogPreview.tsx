import { Card, CardContent, CardHeader } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Calendar, Clock, ArrowRight } from "lucide-react";

const blogPosts = [
  {
    id: 1,
    title: "10 Mẹo Viết CV Ấn Tượng Thu Hút Nhà Tuyển Dụng",
    excerpt: "Khám phá những bí quyết giúp CV của bạn nổi bật trong hàng nghìn hồ sơ ứng tuyển và tăng cơ hội được mời phỏng vấn.",
    image: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=400&h=250&fit=crop&crop=center",
    category: "CV",
    publishDate: "15 Nov 2024",
    readTime: "5 phút đọc",
    featured: true
  },
  {
    id: 2,
    title: "Cách Chuẩn Bị Cho Cuộc Phỏng Vấn Trực Tuyến",
    excerpt: "Hướng dẫn chi tiết từ A-Z để bạn tự tin và thành công trong các cuộc phỏng vấn online, từ chuẩn bị kỹ thuật đến giao tiếp.",
    image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=400&h=250&fit=crop&crop=center",
    category: "Phỏng vấn",
    publishDate: "12 Nov 2024",
    readTime: "7 phút đọc",
    featured: false
  },
  {
    id: 3,
    title: "Top 15 Kỹ Năng Mềm Quan Trọng Nhất 2024",
    excerpt: "Danh sách những kỹ năng mềm được nhà tuyển dụng đánh giá cao nhất và cách phát triển chúng trong công việc.",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=250&fit=crop&crop=center",
    category: "Kỹ năng",
    publishDate: "10 Nov 2024",
    readTime: "6 phút đọc",
    featured: true
  }
];

export function BlogPreview() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Tư vấn nghề nghiệp
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Cập nhật những kiến thức và kỹ năng mới nhất để phát triển sự nghiệp
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {blogPosts.map((post) => (
            <Card key={post.id} className="hover:shadow-lg transition-shadow cursor-pointer overflow-hidden">
              <div className="relative">
                <div className="aspect-[4/3] overflow-hidden">
                  <ImageWithFallback
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                {post.featured && (
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-[#f26b38] text-white">
                      Nổi bật
                    </Badge>
                  </div>
                )}
                <div className="absolute top-4 right-4">
                  <Badge variant="secondary" className="bg-white/90 text-gray-700">
                    {post.category}
                  </Badge>
                </div>
              </div>

              <CardHeader className="pb-3">
                <h3 className="font-semibold text-lg text-gray-900 line-clamp-2 leading-tight">
                  {post.title}
                </h3>
              </CardHeader>

              <CardContent className="pt-0">
                <p className="text-gray-600 text-sm line-clamp-3 mb-4">
                  {post.excerpt}
                </p>
                
                <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                  <div className="flex items-center">
                    <Calendar className="w-3 h-3 mr-1" />
                    {post.publishDate}
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-3 h-3 mr-1" />
                    {post.readTime}
                  </div>
                </div>

                <Button 
                  variant="ghost" 
                  className="w-full text-[#f26b38] hover:bg-[#f26b38] hover:text-white p-0 h-auto justify-between"
                >
                  <span>Đọc thêm</span>
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button variant="outline" className="border-[#f26b38] text-[#f26b38] hover:bg-[#f26b38] hover:text-white">
            Xem tất cả bài viết
          </Button>
        </div>
      </div>
    </section>
  );
}