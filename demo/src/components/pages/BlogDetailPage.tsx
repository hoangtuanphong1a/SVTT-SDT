import React from "react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Card, CardContent } from "../ui/card";
import { 
  ArrowLeft, 
  Calendar, 
  Clock, 
  Eye, 
  User, 
  Share2,
  BookOpen,
  ChevronRight,
  Heart,
  MessageCircle
} from "lucide-react";

interface BlogDetailPageProps {
  blogId: string | null;
  navigate: (page: string, id?: string) => void;
}

export default function BlogDetailPage({ blogId, navigate }: BlogDetailPageProps) {
  // Mock blog data - in real app would fetch based on blogId
  const article = {
    id: blogId || "1",
    title: "10 Cách tạo CV ấn tượng để thu hút nhà tuyển dụng",
    content: `
# Tạo CV ấn tượng - Chìa khóa mở cửa thành công

Trong thị trường việc làm cạnh tranh ngày nay, việc có một bản CV ấn tượng là điều cực kỳ quan trọng. CV là cửa ngõ đầu tiên để bạn tiếp cận với nhà tuyển dụng và tạo ấn tượng đầu tiên tốt đẹp.

## 1. Thiết kế CV chuyên nghiệp và gọn gàng

Một bản CV đẹp mắt, bố cục hợp lý sẽ tạo ấn tượng tốt ngay từ cái nhìn đầu tiên. Hãy chọn font chữ dễ đọc, màu sắc phù hợp và bố cục cân đối.

**Lưu ý quan trọng:**
- Sử dụng font chữ chuyên nghiệp như Arial, Calibri hay Times New Roman
- Giữ màu sắc đơn giản, không quá nhiều màu
- Đảm bảo CV có thể đọc được khi in đen trắng

## 2. Thông tin cá nhân đầy đủ và chính xác

Phần thông tin cá nhân cần bao gồm:
- Họ và tên đầy đủ
- Số điện thoại liên lạc
- Email chuyên nghiệp
- Địa chỉ (có thể chỉ ghi tỉnh/thành phố)
- Link LinkedIn hoặc portfolio (nếu có)

## 3. Mục tiêu nghề nghiệp rõ ràng

Phần này nên ngắn gọn, súc tích và thể hiện được:
- Vị trí bạn mong muốn
- Giá trị bạn có thể mang lại cho công ty
- Định hướng phát triển trong tương lai

*Ví dụ:* "Tìm kiếm vị trí Frontend Developer tại công ty công nghệ, với mong muốn áp dụng kinh nghiệm 3 năm làm việc với React và TypeScript để xây dựng những sản phẩm web chất lượng cao."

## 4. Kinh nghiệm làm việc theo thứ tự thời gian

Sắp xếp kinh nghiệm từ mới nhất đến cũ nhất, mỗi công việc cần có:
- Tên công ty và vị trí công việc
- Thời gian làm việc
- Mô tả công việc và thành tích cụ thể
- Sử dụng số liệu định lượng khi có thể

## 5. Kỹ năng phù hợp với vị trí ứng tuyển

Chia kỹ năng thành các nhóm:
- **Kỹ năng chuyên môn:** Ngôn ngữ lập trình, công cụ, framework
- **Kỹ năng mềm:** Teamwork, communication, leadership
- **Ngôn ngữ:** Tiếng Anh, tiếng Nhật, v.v.

## 6. Học vấn và chứng chỉ

Gồm:
- Bằng cấp cao nhất
- Các khóa học, chứng chỉ liên quan
- Thành tích học tập nổi bật (nếu có)

## 7. Tối ưu hóa từ khóa cho ATS

Nhiều công ty sử dụng hệ thống ATS (Applicant Tracking System) để lọc CV. Hãy:
- Đọc kỹ job description
- Sử dụng từ khóa phù hợp
- Tránh sử dụng hình ảnh, bảng phức tạp

## 8. Kiểm tra và hiệu chỉnh

Trước khi gửi CV:
- Kiểm tra chính tả, ngữ pháp
- Đảm bảo thông tin chính xác
- Nhờ bạn bè, đồng nghiệp review
- Test thử trên nhiều thiết bị

## 9. Tùy chỉnh CV cho từng vị trí

Không nên sử dụng một CV cho tất cả vị trí. Hãy:
- Điều chỉnh mục tiêu nghề nghiệp
- Làm nổi bật kinh nghiệm liên quan
- Sử dụng từ khóa của job description

## 10. Cập nhật CV thường xuyên

CV cần được cập nhật định kỳ với:
- Kinh nghiệm làm việc mới
- Kỹ năng mới học được
- Chứng chỉ, khóa học mới
- Thành tích, dự án nổi bật

## Kết luận

Một bản CV ấn tượng không chỉ là việc liệt kê thông tin mà là cách bạn "bán" bản thân mình cho nhà tuyển dụng. Hãy dành thời gian đầu tư cho CV, vì đó chính là chìa khóa mở cửa cho cơ hội nghề nghiệp của bạn.

Chúc bạn thành công trong việc tạo ra một bản CV ấn tượng và tìm được công việc mơ ước!
    `,
    image: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=800&h=400&fit=crop",
    category: "CV",
    author: "Nguyễn Minh Anh",
    publishDate: "2024-12-10",
    readTime: "5 phút đọc",
    views: 1245,
    likes: 89,
    comments: 23,
    tags: ["CV", "Tuyển dụng", "Nghề nghiệp", "Tips"]
  };

  const relatedArticles = [
    {
      id: "2",
      title: "Cách trả lời phỏng vấn thông minh và tự tin",
      category: "Phỏng vấn",
      readTime: "7 phút đọc",
      views: 892
    },
    {
      id: "3", 
      title: "Xu hướng nghề nghiệp IT 2025: Những ngành hot nhất",
      category: "Xu hướng",
      readTime: "10 phút đọc",
      views: 2156
    },
    {
      id: "4",
      title: "Kỹ năng mềm quan trọng nhất trong công việc",
      category: "Kỹ năng",
      readTime: "6 phút đọc", 
      views: 687
    }
  ];

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
      <svg width="800" height="400" viewBox="0 0 800 400" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="800" height="400" fill="#f3f4f6"/>
        <rect x="350" y="175" width="100" height="50" rx="8" fill="#f26b38"/>
        <rect x="375" y="190" width="50" height="20" rx="4" fill="white"/>
      </svg>
    `)}`;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Button 
            variant="ghost" 
            onClick={() => navigate("blog")}
            className="mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Quay lại Blog
          </Button>

          {/* Article Meta */}
          <div className="mb-6">
            <Badge variant="secondary" className="mb-3">
              {article.category}
            </Badge>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">
              {article.title}
            </h1>
            
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-6">
              <div className="flex items-center">
                <User className="h-4 w-4 mr-2" />
                {article.author}
              </div>
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-2" />
                {formatDate(article.publishDate)}
              </div>
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-2" />
                {article.readTime}
              </div>
              <div className="flex items-center">
                <Eye className="h-4 w-4 mr-2" />
                {article.views} lượt xem
              </div>
            </div>

            {/* Social Actions */}
            <div className="flex items-center space-x-3">
              <Button variant="outline" size="sm">
                <Heart className="h-4 w-4 mr-2" />
                {article.likes} Thích
              </Button>
              <Button variant="outline" size="sm">
                <MessageCircle className="h-4 w-4 mr-2" />
                {article.comments} Bình luận
              </Button>
              <Button variant="outline" size="sm">
                <Share2 className="h-4 w-4 mr-2" />
                Chia sẻ
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            <article className="bg-white rounded-lg shadow-sm overflow-hidden">
              {/* Featured Image */}
              <img 
                src={article.image}
                alt={article.title}
                className="w-full h-64 md:h-80 object-cover"
                onError={handleImageError}
              />

              {/* Content */}
              <div className="p-8">
                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {article.tags.map((tag, index) => (
                    <Badge key={index} variant="outline">
                      {tag}
                    </Badge>
                  ))}
                </div>

                {/* Article Content */}
                <div className="prose prose-gray max-w-none prose-headings:text-gray-900 prose-h1:text-2xl prose-h2:text-xl prose-h2:font-semibold prose-h2:mb-4 prose-h2:mt-8 prose-p:text-gray-700 prose-p:leading-relaxed prose-strong:text-gray-900 prose-ul:text-gray-700 prose-li:text-gray-700">
                  {article.content.split('\n').map((paragraph, index) => {
                    if (paragraph.startsWith('# ')) {
                      return <h1 key={index} className="text-2xl font-bold text-gray-900 mb-4 mt-8">{paragraph.replace('# ', '')}</h1>;
                    } else if (paragraph.startsWith('## ')) {
                      return <h2 key={index} className="text-xl font-semibold text-gray-900 mb-4 mt-8">{paragraph.replace('## ', '')}</h2>;
                    } else if (paragraph.startsWith('**') && paragraph.endsWith('**')) {
                      return <p key={index} className="font-semibold text-gray-900 mb-4">{paragraph.replace(/\*\*/g, '')}</p>;
                    } else if (paragraph.startsWith('*') && paragraph.endsWith('*')) {
                      return <p key={index} className="italic text-gray-600 mb-4">{paragraph.replace(/\*/g, '')}</p>;
                    } else if (paragraph.startsWith('- ')) {
                      return <li key={index} className="text-gray-700 mb-2">{paragraph.replace('- ', '')}</li>;
                    } else if (paragraph.trim() !== '') {
                      return <p key={index} className="text-gray-700 leading-relaxed mb-4">{paragraph}</p>;
                    }
                    return null;
                  })}
                </div>

                {/* Author Bio */}
                <div className="mt-12 pt-8 border-t border-gray-200">
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-orange-primary rounded-full flex items-center justify-center">
                      <User className="h-8 w-8 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{article.author}</h3>
                      <p className="text-gray-600">Career Consultant & Content Writer</p>
                      <p className="text-sm text-gray-500 mt-1">
                        Chuyên gia tư vấn nghề nghiệp với 5+ năm kinh nghiệm trong lĩnh vực tuyển dụng và phát triển sự nghiệp.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Social Share */}
                <div className="mt-8 pt-6 border-t border-gray-200">
                  <p className="text-sm text-gray-600 mb-4">Chia sẻ bài viết này:</p>
                  <div className="flex space-x-3">
                    <Button variant="outline" size="sm">
                      Facebook
                    </Button>
                    <Button variant="outline" size="sm">
                      Twitter
                    </Button>
                    <Button variant="outline" size="sm">
                      LinkedIn
                    </Button>
                    <Button variant="outline" size="sm">
                      Copy Link
                    </Button>
                  </div>
                </div>
              </div>
            </article>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-6 space-y-6">
              {/* Table of Contents */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold text-gray-900 mb-4">Nội dung chính</h3>
                  <ul className="space-y-2 text-sm">
                    <li><a href="#" className="text-gray-600 hover:text-orange-primary">1. Thiết kế CV chuyên nghiệp</a></li>
                    <li><a href="#" className="text-gray-600 hover:text-orange-primary">2. Thông tin cá nhân</a></li>
                    <li><a href="#" className="text-gray-600 hover:text-orange-primary">3. Mục tiêu nghề nghiệp</a></li>
                    <li><a href="#" className="text-gray-600 hover:text-orange-primary">4. Kinh nghiệm làm việc</a></li>
                    <li><a href="#" className="text-gray-600 hover:text-orange-primary">5. Kỹ năng chuyên môn</a></li>
                    <li><a href="#" className="text-gray-600 hover:text-orange-primary">6. Học vấn và chứng chỉ</a></li>
                    <li><a href="#" className="text-gray-600 hover:text-orange-primary">7. Tối ưu hóa ATS</a></li>
                    <li><a href="#" className="text-gray-600 hover:text-orange-primary">8. Kiểm tra và hiệu chỉnh</a></li>
                  </ul>
                </CardContent>
              </Card>

              {/* Related Articles */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
                    <BookOpen className="h-5 w-5 mr-2" />
                    Bài viết liên quan
                  </h3>
                  <div className="space-y-4">
                    {relatedArticles.map((related) => (
                      <div 
                        key={related.id}
                        className="cursor-pointer hover:bg-gray-50 p-3 rounded-lg -mx-3 transition-colors"
                        onClick={() => navigate("blog-detail", related.id)}
                      >
                        <h4 className="font-medium text-gray-900 text-sm mb-2 line-clamp-2">
                          {related.title}
                        </h4>
                        <div className="flex items-center justify-between text-xs text-gray-500">
                          <Badge variant="outline" className="text-xs">
                            {related.category}
                          </Badge>
                          <div className="flex items-center space-x-2">
                            <span>{related.readTime}</span>
                            <span>•</span>
                            <span>{related.views} views</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <Button 
                    variant="outline" 
                    className="w-full mt-4"
                    onClick={() => navigate("blog")}
                  >
                    Xem thêm bài viết
                    <ChevronRight className="h-4 w-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>

              {/* Newsletter */}
              <Card>
                <CardContent className="p-6 text-center">
                  <h3 className="font-semibold text-gray-900 mb-3">
                    Nhận tips nghề nghiệp
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Đăng ký để nhận những bài viết hữu ích về nghề nghiệp và tuyển dụng
                  </p>
                  <Button className="w-full bg-orange-primary hover:bg-orange-600">
                    Đăng ký ngay
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}