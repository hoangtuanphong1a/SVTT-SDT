import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Progress } from "../ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import {
  Star,
  Search,
  Filter,
  TrendingUp,
  TrendingDown,
  Users,
  Building2,
  ThumbsUp,
  ThumbsDown,
  MessageSquare,
  Award,
  AlertCircle,
  CheckCircle,
  Clock,
  MapPin,
  DollarSign
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";

interface CompanyReview {
  id: string;
  companyName: string;
  companyLogo: string;
  position: string;
  department: string;
  reviewDate: string;
  overallRating: number;
  workLifeBalance: number;
  salary: number;
  culture: number;
  management: number;
  careerGrowth: number;
  title: string;
  pros: string;
  cons: string;
  advice: string;
  employmentStatus: "current" | "former";
  workLocation: "office" | "remote" | "hybrid";
  yearsAtCompany: string;
  helpful: number;
  notHelpful: number;
  isAnonymous: boolean;
  isVerified: boolean;
}

interface CompanyReviewsPageProps {
  navigate: (page: string, id?: string) => void;
}

export default function CompanyReviewsPage({ navigate }: CompanyReviewsPageProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSort, setSelectedSort] = useState("newest");
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [isReviewDialogOpen, setIsReviewDialogOpen] = useState(false);

  const [newReview, setNewReview] = useState({
    companyName: "",
    position: "",
    department: "",
    overallRating: 0,
    workLifeBalance: 0,
    salary: 0,
    culture: 0,
    management: 0,
    careerGrowth: 0,
    title: "",
    pros: "",
    cons: "",
    advice: "",
    employmentStatus: "current" as "current" | "former",
    workLocation: "office" as "office" | "remote" | "hybrid",
    yearsAtCompany: "",
    isAnonymous: true
  });

  const companyReviews: CompanyReview[] = [
    {
      id: "1",
      companyName: "TechCorp Vietnam",
      companyLogo: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=64&h=64&fit=crop&crop=face",
      position: "Senior Frontend Developer",
      department: "Engineering",
      reviewDate: "2024-01-15",
      overallRating: 4.2,
      workLifeBalance: 4.0,
      salary: 4.5,
      culture: 4.0,
      management: 3.8,
      careerGrowth: 4.2,
      title: "Môi trường làm việc tuyệt vời cho developer",
      pros: "Lương thưởng cạnh tranh, đồng nghiệp hỗ trợ nhiệt tình, công nghệ hiện đại, work-life balance tốt. Có nhiều cơ hội học hỏi và phát triển kỹ năng mới.",
      cons: "Đôi khi pressure cao khi gần deadline. Quy trình approval hơi chậm. Office ở xa trung tâm một chút.",
      advice: "Nên chuẩn bị tốt kỹ năng React và TypeScript. Company rất coi trọng clean code và best practices.",
      employmentStatus: "current",
      workLocation: "hybrid",
      yearsAtCompany: "2 năm",
      helpful: 28,
      notHelpful: 3,
      isAnonymous: true,
      isVerified: true
    },
    {
      id: "2",
      companyName: "StartupVN",
      companyLogo: "https://images.unsplash.com/photo-1572021335469-31706a17aaef?w=64&h=64&fit=crop&crop=face",
      position: "Product Manager",
      department: "Product",
      reviewDate: "2024-01-12",
      overallRating: 3.8,
      workLifeBalance: 3.5,
      salary: 4.0,
      culture: 4.5,
      management: 3.5,
      careerGrowth: 4.0,
      title: "Startup năng động nhưng cần cải thiện work-life balance",
      pros: "Team trẻ, năng động, tốc độ phát triển nhanh. Có autonomy cao trong công việc. Culture cởi mở, sáng tạo.",
      cons: "Workload khá nặng, thường xuyên OT. Benefits chưa nhiều. Quy trình còn chưa rõ ràng do startup.",
      advice: "Phù hợp với người thích thử thách và môi trường startup. Cần mindset linh hoạt và chịu được pressure.",
      employmentStatus: "former",
      workLocation: "office",
      yearsAtCompany: "1.5 năm",
      helpful: 19,
      notHelpful: 5,
      isAnonymous: false,
      isVerified: true
    },
    {
      id: "3",
      companyName: "Design Studio",
      companyLogo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=64&h=64&fit=crop&crop=face",
      position: "Senior UI/UX Designer",
      department: "Design",
      reviewDate: "2024-01-10",
      overallRating: 4.5,
      workLifeBalance: 4.2,
      salary: 3.8,
      culture: 4.8,
      management: 4.3,
      careerGrowth: 4.1,
      title: "Nơi tuyệt vời để phát triển sự nghiệp design",
      pros: "Culture design thinking mạnh, có mentor tốt, client đa dạng. Work-life balance tuyệt vời. Office đẹp, sáng tạo.",
      cons: "Lương không cao bằng các công ty tech. Dự án đôi khi scope thay đổi nhiều.",
      advice: "Rất phù hợp để build portfolio mạnh. Nên có portfolio đa dạng và thể hiện được design process.",
      employmentStatus: "current",
      workLocation: "hybrid",
      yearsAtCompany: "3 năm",
      helpful: 35,
      notHelpful: 2,
      isAnonymous: true,
      isVerified: true
    }
  ];

  const topCompanies = [
    { name: "Google Vietnam", rating: 4.6, reviews: 847, logo: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=48&h=48&fit=crop&crop=face" },
    { name: "Microsoft Vietnam", rating: 4.5, reviews: 623, logo: "https://images.unsplash.com/photo-1572021335469-31706a17aaef?w=48&h=48&fit=crop&crop=face" },
    { name: "FPT Software", rating: 4.2, reviews: 1205, logo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=48&h=48&fit=crop&crop=face" },
    { name: "VNG Corporation", rating: 4.3, reviews: 892, logo: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=48&h=48&fit=crop&crop=face" },
    { name: "Tiki", rating: 4.1, reviews: 567, logo: "https://images.unsplash.com/photo-1572021335469-31706a17aaef?w=48&h=48&fit=crop&crop=face" }
  ];

  const renderStars = (rating: number, size: "sm" | "md" | "lg" = "md") => {
    const sizeClasses = {
      sm: "h-3 w-3",
      md: "h-4 w-4", 
      lg: "h-5 w-5"
    };

    return (
      <div className="flex items-center">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`${sizeClasses[size]} ${
              star <= rating
                ? "text-yellow-400 fill-current"
                : "text-gray-300"
            }`}
          />
        ))}
      </div>
    );
  };

  const RatingBar = ({ label, rating, maxRating = 5 }: { label: string; rating: number; maxRating?: number }) => (
    <div className="flex items-center space-x-3">
      <span className="text-sm text-gray-600 w-24 flex-shrink-0">{label}</span>
      <div className="flex-1">
        <Progress value={(rating / maxRating) * 100} className="h-2" />
      </div>
      <span className="text-sm font-medium text-gray-900 w-8">{rating.toFixed(1)}</span>
    </div>
  );

  const ReviewCard = ({ review }: { review: CompanyReview }) => (
    <Card className="mb-6">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-4">
            <img
              src={review.companyLogo}
              alt={review.companyName}
              className="w-12 h-12 rounded-lg object-cover"
            />
            <div>
              <h3 className="font-semibold text-lg">{review.companyName}</h3>
              <div className="flex items-center space-x-2 mt-1">
                {renderStars(review.overallRating)}
                <span className="text-sm text-gray-600">
                  {review.overallRating.toFixed(1)}
                </span>
                {review.isVerified && (
                  <Badge className="bg-green-100 text-green-700">
                    <CheckCircle className="h-3 w-3 mr-1" />
                    Đã xác thực
                  </Badge>
                )}
              </div>
            </div>
          </div>
          <div className="text-right text-sm text-gray-500">
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-1" />
              {new Date(review.reviewDate).toLocaleDateString('vi-VN')}
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        <div>
          <h4 className="font-semibold text-gray-900 mb-2">{review.title}</h4>
          <div className="flex items-center space-x-4 text-sm text-gray-600 mb-4">
            <span>{review.position}</span>
            <span>•</span>
            <span>{review.department}</span>
            <span>•</span>
            <span>
              {review.employmentStatus === "current" ? "Đang làm việc" : "Đã nghỉ việc"}
            </span>
            <span>•</span>
            <span>{review.yearsAtCompany}</span>
            <span>•</span>
            <Badge variant="outline">
              {review.workLocation === "office" 
                ? "Tại văn phòng" 
                : review.workLocation === "remote"
                ? "Làm từ xa"
                : "Hybrid"
              }
            </Badge>
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
          <RatingBar label="Work-life balance" rating={review.workLifeBalance} />
          <RatingBar label="Lương thưởng" rating={review.salary} />
          <RatingBar label="Văn hóa" rating={review.culture} />
          <RatingBar label="Quản lý" rating={review.management} />
          <RatingBar label="Phát triển" rating={review.careerGrowth} />
        </div>

        <div className="space-y-4">
          <div>
            <h5 className="font-semibold text-green-700 mb-2 flex items-center">
              <ThumbsUp className="h-4 w-4 mr-2" />
              Điểm tích cực
            </h5>
            <p className="text-gray-700 text-sm leading-relaxed">{review.pros}</p>
          </div>

          <div>
            <h5 className="font-semibold text-red-700 mb-2 flex items-center">
              <ThumbsDown className="h-4 w-4 mr-2" />
              Điểm cần cải thiện
            </h5>
            <p className="text-gray-700 text-sm leading-relaxed">{review.cons}</p>
          </div>

          {review.advice && (
            <div>
              <h5 className="font-semibold text-blue-700 mb-2 flex items-center">
                <MessageSquare className="h-4 w-4 mr-2" />
                Lời khuyên cho ứng viên
              </h5>
              <p className="text-gray-700 text-sm leading-relaxed">{review.advice}</p>
            </div>
          )}
        </div>

        <div className="flex items-center justify-between pt-4 border-t">
          <div className="flex items-center space-x-4">
            <button className="flex items-center space-x-1 text-sm text-gray-600 hover:text-green-600">
              <ThumbsUp className="h-4 w-4" />
              <span>Hữu ích ({review.helpful})</span>
            </button>
            <button className="flex items-center space-x-1 text-sm text-gray-600 hover:text-red-600">
              <ThumbsDown className="h-4 w-4" />
              <span>Không hữu ích ({review.notHelpful})</span>
            </button>
          </div>
          <div className="text-xs text-gray-500">
            {review.isAnonymous ? "Đánh giá ẩn danh" : "Đánh giá công khai"}
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-primary rounded-full mb-4">
            <Building2 className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Đánh giá công ty
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Tìm hiểu văn hóa, môi trường làm việc thực tế từ những người trong cuộc
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Building2 className="h-6 w-6 text-blue-600" />
              </div>
              <p className="text-2xl font-bold text-gray-900">2,847</p>
              <p className="text-sm text-gray-600">Công ty được đánh giá</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <MessageSquare className="h-6 w-6 text-green-600" />
              </div>
              <p className="text-2xl font-bold text-gray-900">45,692</p>
              <p className="text-sm text-gray-600">Đánh giá từ nhân viên</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Star className="h-6 w-6 text-yellow-600" />
              </div>
              <p className="text-2xl font-bold text-gray-900">4.2</p>
              <p className="text-sm text-gray-600">Điểm đánh giá trung bình</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <CheckCircle className="h-6 w-6 text-purple-600" />
              </div>
              <p className="text-2xl font-bold text-gray-900">89%</p>
              <p className="text-sm text-gray-600">Đánh giá đã xác thực</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="space-y-6">
              {/* Search */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Tìm kiếm công ty</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="relative mb-4">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      placeholder="Tên công ty..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-gray-700 mb-2 block">
                        Sắp xếp theo
                      </label>
                      <Select value={selectedSort} onValueChange={setSelectedSort}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="newest">Mới nhất</SelectItem>
                          <SelectItem value="oldest">Cũ nhất</SelectItem>
                          <SelectItem value="highest-rated">Điểm cao nhất</SelectItem>
                          <SelectItem value="most-helpful">Hữu ích nhất</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <label className="text-sm font-medium text-gray-700 mb-2 block">
                        Lọc theo trạng thái
                      </label>
                      <Select value={selectedFilter} onValueChange={setSelectedFilter}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">Tất cả</SelectItem>
                          <SelectItem value="current">Đang làm việc</SelectItem>
                          <SelectItem value="former">Đã nghỉ việc</SelectItem>
                          <SelectItem value="verified">Đã xác thực</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Top Companies */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center">
                    <Award className="h-5 w-5 mr-2 text-orange-primary" />
                    Top công ty
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {topCompanies.map((company, index) => (
                      <div key={index} className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-orange-primary text-white rounded-full flex items-center justify-center text-xs font-bold">
                          {index + 1}
                        </div>
                        <img
                          src={company.logo}
                          alt={company.name}
                          className="w-8 h-8 rounded object-cover"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate">
                            {company.name}
                          </p>
                          <div className="flex items-center space-x-1">
                            {renderStars(company.rating, "sm")}
                            <span className="text-xs text-gray-600">
                              ({company.reviews})
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Write Review CTA */}
              <Card className="bg-gradient-to-br from-orange-50 to-orange-100">
                <CardContent className="p-6 text-center">
                  <MessageSquare className="h-8 w-8 text-orange-primary mx-auto mb-3" />
                  <h3 className="font-semibold text-gray-900 mb-2">
                    Chia sẻ trải nghiệm
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Giúp cộng đồng bằng cách đánh giá công ty bạn đã/đang làm việc
                  </p>
                  
                  <Dialog open={isReviewDialogOpen} onOpenChange={setIsReviewDialogOpen}>
                    <DialogTrigger asChild>
                      <Button className="w-full bg-orange-primary hover:bg-orange-600">
                        Viết đánh giá
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle>Đánh giá công ty</DialogTitle>
                        <DialogDescription>
                          Chia sẻ trải nghiệm làm việc của bạn để giúp cộng đồng
                        </DialogDescription>
                      </DialogHeader>
                      
                      <div className="space-y-6 py-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="text-sm font-medium text-gray-700 mb-2 block">
                              Tên công ty
                            </label>
                            <Input
                              placeholder="VD: Google Vietnam"
                              value={newReview.companyName}
                              onChange={(e) => setNewReview({...newReview, companyName: e.target.value})}
                            />
                          </div>
                          <div>
                            <label className="text-sm font-medium text-gray-700 mb-2 block">
                              Vị trí công việc
                            </label>
                            <Input
                              placeholder="VD: Senior Developer"
                              value={newReview.position}
                              onChange={(e) => setNewReview({...newReview, position: e.target.value})}
                            />
                          </div>
                        </div>

                        {/* Rating sections would continue here */}
                        <div className="text-center pt-4">
                          <Button 
                            className="bg-orange-primary hover:bg-orange-600"
                            disabled={!newReview.companyName || !newReview.position}
                          >
                            Gửi đánh giá
                          </Button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="mb-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900">
                  {companyReviews.length} đánh giá
                </h2>
                <div className="flex items-center space-x-2">
                  <Filter className="h-4 w-4 text-gray-400" />
                  <span className="text-sm text-gray-600">Đã lọc: {selectedFilter}</span>
                </div>
              </div>
            </div>

            <div>
              {companyReviews.map(review => (
                <ReviewCard key={review.id} review={review} />
              ))}
            </div>

            {/* Load More */}
            <div className="text-center mt-8">
              <Button variant="outline" className="px-8">
                Xem thêm đánh giá
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}