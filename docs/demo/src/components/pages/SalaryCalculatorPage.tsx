import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell
} from "recharts";
import {
  DollarSign,
  TrendingUp,
  TrendingDown,
  MapPin,
  Briefcase,
  GraduationCap,
  Calculator,
  Target,
  Award,
  Users,
  Building2,
  ArrowRight,
  Info
} from "lucide-react";

interface SalaryCalculatorPageProps {
  navigate: (page: string, id?: string) => void;
}

export default function SalaryCalculatorPage({ navigate }: SalaryCalculatorPageProps) {
  const [formData, setFormData] = useState({
    position: "",
    experience: "",
    location: "",
    education: "",
    skills: "",
    industry: "",
    companySize: ""
  });

  const [calculatedSalary, setCalculatedSalary] = useState<{
    min: number;
    max: number;
    average: number;
    marketPosition: string;
  } | null>(null);

  // Mock salary data for different positions
  const salaryData = {
    "frontend-developer": {
      "0-1": { min: 12000000, max: 18000000, average: 15000000 },
      "1-3": { min: 18000000, max: 28000000, average: 23000000 },
      "3-5": { min: 25000000, max: 40000000, average: 32500000 },
      "5+": { min: 35000000, max: 60000000, average: 47500000 }
    },
    "backend-developer": {
      "0-1": { min: 13000000, max: 20000000, average: 16500000 },
      "1-3": { min: 20000000, max: 30000000, average: 25000000 },
      "3-5": { min: 28000000, max: 45000000, average: 36500000 },
      "5+": { min: 40000000, max: 70000000, average: 55000000 }
    },
    "fullstack-developer": {
      "0-1": { min: 15000000, max: 22000000, average: 18500000 },
      "1-3": { min: 22000000, max: 35000000, average: 28500000 },
      "3-5": { min: 30000000, max: 50000000, average: 40000000 },
      "5+": { min: 45000000, max: 80000000, average: 62500000 }
    },
    "product-manager": {
      "0-1": { min: 18000000, max: 25000000, average: 21500000 },
      "1-3": { min: 25000000, max: 40000000, average: 32500000 },
      "3-5": { min: 35000000, max: 60000000, average: 47500000 },
      "5+": { min: 50000000, max: 100000000, average: 75000000 }
    }
  };

  // Market insights data
  const industryComparison = [
    { industry: "Công nghệ", average: 32500000, growth: 15.2 },
    { industry: "Tài chính", average: 35800000, growth: 12.8 },
    { industry: "Y tế", average: 28900000, growth: 18.5 },
    { industry: "Giáo dục", average: 21200000, growth: 8.3 },
    { industry: "Bán lẻ", average: 18700000, growth: 6.7 }
  ];

  const locationComparison = [
    { location: "TP.HCM", average: 34200000, percentage: 45.2 },
    { location: "Hà Nội", average: 31800000, percentage: 33.6 },
    { location: "Đà Nẵng", average: 24500000, percentage: 12.1 },
    { location: "Khác", average: 22100000, percentage: 9.1 }
  ];

  const experienceTrend = [
    { years: "0-1 năm", salary: 16500000 },
    { years: "1-3 năm", salary: 25200000 },
    { years: "3-5 năm", salary: 36800000 },
    { years: "5-8 năm", salary: 52300000 },
    { years: "8+ năm", salary: 68900000 }
  ];

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
      maximumFractionDigits: 0
    }).format(value);
  };

  const calculateSalary = () => {
    const position = formData.position as keyof typeof salaryData;
    const experience = formData.experience;
    
    if (!position || !experience || !salaryData[position]) {
      return;
    }

    let baseSalary = salaryData[position][experience as keyof typeof salaryData[typeof position]];
    
    if (!baseSalary) {
      baseSalary = salaryData[position]["1-3"];
    }

    // Apply location modifier
    let locationMultiplier = 1;
    if (formData.location === "TP. Hồ Chí Minh") locationMultiplier = 1.15;
    else if (formData.location === "Hà Nội") locationMultiplier = 1.10;
    else if (formData.location === "Đà Nẵng") locationMultiplier = 0.95;
    else locationMultiplier = 0.85;

    // Apply education modifier
    let educationMultiplier = 1;
    if (formData.education === "master") educationMultiplier = 1.15;
    else if (formData.education === "bachelor") educationMultiplier = 1.05;

    // Apply company size modifier
    let companySizeMultiplier = 1;
    if (formData.companySize === "large") companySizeMultiplier = 1.20;
    else if (formData.companySize === "medium") companySizeMultiplier = 1.10;

    const adjustedMin = Math.round(baseSalary.min * locationMultiplier * educationMultiplier * companySizeMultiplier);
    const adjustedMax = Math.round(baseSalary.max * locationMultiplier * educationMultiplier * companySizeMultiplier);
    const adjustedAverage = Math.round(baseSalary.average * locationMultiplier * educationMultiplier * companySizeMultiplier);

    // Determine market position
    let marketPosition = "Trung bình";
    if (adjustedAverage > baseSalary.average * 1.2) marketPosition = "Cao hơn thị trường";
    else if (adjustedAverage < baseSalary.average * 0.9) marketPosition = "Thấp hơn thị trường";

    setCalculatedSalary({
      min: adjustedMin,
      max: adjustedMax,
      average: adjustedAverage,
      marketPosition
    });
  };

  const colors = ['#f26b38', '#10b981', '#3b82f6', '#8b5cf6', '#f59e0b'];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-primary rounded-full mb-4">
            <Calculator className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Công cụ tính lương
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Khám phá mức lương thị trường cho vị trí của bạn với dữ liệu cập nhật từ hàng nghìn công ty
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Calculator Form */}
          <div className="lg:col-span-1">
            <Card className="sticky top-8">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Target className="h-5 w-5 mr-2 text-orange-primary" />
                  Thông tin của bạn
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="position">Vị trí công việc</Label>
                  <Select
                    value={formData.position}
                    onValueChange={(value) => setFormData({...formData, position: value})}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn vị trí" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="frontend-developer">Frontend Developer</SelectItem>
                      <SelectItem value="backend-developer">Backend Developer</SelectItem>
                      <SelectItem value="fullstack-developer">Fullstack Developer</SelectItem>
                      <SelectItem value="product-manager">Product Manager</SelectItem>
                      <SelectItem value="data-scientist">Data Scientist</SelectItem>
                      <SelectItem value="devops-engineer">DevOps Engineer</SelectItem>
                      <SelectItem value="ui-ux-designer">UI/UX Designer</SelectItem>
                      <SelectItem value="mobile-developer">Mobile Developer</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="experience">Kinh nghiệm</Label>
                  <Select
                    value={formData.experience}
                    onValueChange={(value) => setFormData({...formData, experience: value})}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn kinh nghiệm" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0-1">0-1 năm</SelectItem>
                      <SelectItem value="1-3">1-3 năm</SelectItem>
                      <SelectItem value="3-5">3-5 năm</SelectItem>
                      <SelectItem value="5+">5+ năm</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location">Địa điểm</Label>
                  <Select
                    value={formData.location}
                    onValueChange={(value) => setFormData({...formData, location: value})}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn thành phố" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="TP. Hồ Chí Minh">TP. Hồ Chí Minh</SelectItem>
                      <SelectItem value="Hà Nội">Hà Nội</SelectItem>
                      <SelectItem value="Đà Nẵng">Đà Nẵng</SelectItem>
                      <SelectItem value="Cần Thơ">Cần Thơ</SelectItem>
                      <SelectItem value="Làm từ xa">Làm từ xa</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="education">Trình độ học vấn</Label>
                  <Select
                    value={formData.education}
                    onValueChange={(value) => setFormData({...formData, education: value})}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn trình độ" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="highschool">Phổ thông</SelectItem>
                      <SelectItem value="college">Cao đẳng</SelectItem>
                      <SelectItem value="bachelor">Đại học</SelectItem>
                      <SelectItem value="master">Thạc sĩ</SelectItem>
                      <SelectItem value="phd">Tiến sĩ</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="industry">Ngành nghề</Label>
                  <Select
                    value={formData.industry}
                    onValueChange={(value) => setFormData({...formData, industry: value})}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn ngành" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="technology">Công nghệ thông tin</SelectItem>
                      <SelectItem value="finance">Tài chính - Ngân hàng</SelectItem>
                      <SelectItem value="healthcare">Y tế</SelectItem>
                      <SelectItem value="education">Giáo dục</SelectItem>
                      <SelectItem value="ecommerce">Thương mại điện tử</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="companySize">Quy mô công ty</Label>
                  <Select
                    value={formData.companySize}
                    onValueChange={(value) => setFormData({...formData, companySize: value})}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn quy mô" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="startup">Startup (1-50 người)</SelectItem>
                      <SelectItem value="medium">Trung bình (51-500 người)</SelectItem>
                      <SelectItem value="large">Lớn (500+ người)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button
                  onClick={calculateSalary}
                  className="w-full bg-orange-primary hover:bg-orange-600"
                  disabled={!formData.position || !formData.experience}
                >
                  <Calculator className="h-4 w-4 mr-2" />
                  Tính lương
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Results and Charts */}
          <div className="lg:col-span-2 space-y-8">
            {/* Salary Results */}
            {calculatedSalary && (
              <Card className="border-orange-200 bg-gradient-to-br from-orange-50 to-orange-100">
                <CardHeader>
                  <CardTitle className="flex items-center text-orange-primary">
                    <Award className="h-5 w-5 mr-2" />
                    Kết quả ước tính
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="text-center">
                      <p className="text-sm text-gray-600 mb-1">Mức tối thiểu</p>
                      <p className="text-2xl font-bold text-gray-900">
                        {formatCurrency(calculatedSalary.min)}
                      </p>
                    </div>
                    <div className="text-center border-x border-orange-200">
                      <p className="text-sm text-gray-600 mb-1">Mức trung bình</p>
                      <p className="text-3xl font-bold text-orange-primary">
                        {formatCurrency(calculatedSalary.average)}
                      </p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-gray-600 mb-1">Mức tối đa</p>
                      <p className="text-2xl font-bold text-gray-900">
                        {formatCurrency(calculatedSalary.max)}
                      </p>
                    </div>
                  </div>
                  <div className="mt-6 text-center">
                    <Badge className={`${
                      calculatedSalary.marketPosition === "Cao hơn thị trường" 
                        ? "bg-green-100 text-green-700"
                        : calculatedSalary.marketPosition === "Thấp hơn thị trường"
                        ? "bg-red-100 text-red-700"
                        : "bg-blue-100 text-blue-700"
                    }`}>
                      {calculatedSalary.marketPosition}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Industry Comparison */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Briefcase className="h-5 w-5 mr-2 text-orange-primary" />
                  So sánh theo ngành nghề
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={industryComparison}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="industry" />
                    <YAxis tickFormatter={(value) => `${(value / 1000000).toFixed(0)}M`} />
                    <Tooltip 
                      formatter={(value: any) => [formatCurrency(value), "Lương trung bình"]}
                    />
                    <Bar dataKey="average" fill="#f26b38" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Location and Experience Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <MapPin className="h-5 w-5 mr-2 text-orange-primary" />
                    Theo địa điểm
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={250}>
                    <PieChart>
                      <Pie
                        data={locationComparison}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="percentage"
                        label={({ location, percentage }) => `${location}: ${percentage}%`}
                      >
                        {locationComparison.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <GraduationCap className="h-5 w-5 mr-2 text-orange-primary" />
                    Xu hướng theo kinh nghiệm
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={250}>
                    <LineChart data={experienceTrend}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="years" />
                      <YAxis tickFormatter={(value) => `${(value / 1000000).toFixed(0)}M`} />
                      <Tooltip 
                        formatter={(value: any) => [formatCurrency(value), "Lương trung bình"]}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="salary" 
                        stroke="#f26b38" 
                        strokeWidth={3}
                        dot={{ fill: '#f26b38', strokeWidth: 2, r: 6 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            {/* Market Insights */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <TrendingUp className="h-5 w-5 mr-2 text-orange-primary" />
                  Thông tin thị trường
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <Users className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                    <p className="text-sm text-gray-600">Tổng ứng viên</p>
                    <p className="text-2xl font-bold text-gray-900">142,847</p>
                    <p className="text-xs text-green-600 flex items-center justify-center mt-1">
                      <TrendingUp className="h-3 w-3 mr-1" />
                      +12.5% so với tháng trước
                    </p>
                  </div>
                  
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <Building2 className="h-8 w-8 text-green-600 mx-auto mb-2" />
                    <p className="text-sm text-gray-600">Công ty tuyển dụng</p>
                    <p className="text-2xl font-bold text-gray-900">8,947</p>
                    <p className="text-xs text-green-600 flex items-center justify-center mt-1">
                      <TrendingUp className="h-3 w-3 mr-1" />
                      +8.2% so với tháng trước
                    </p>
                  </div>
                  
                  <div className="text-center p-4 bg-orange-50 rounded-lg">
                    <DollarSign className="h-8 w-8 text-orange-600 mx-auto mb-2" />
                    <p className="text-sm text-gray-600">Mức lương TB toàn thị trường</p>
                    <p className="text-2xl font-bold text-gray-900">28.5M</p>
                    <p className="text-xs text-green-600 flex items-center justify-center mt-1">
                      <TrendingUp className="h-3 w-3 mr-1" />
                      +15.8% so với năm ngoái
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Tips and Recommendations */}
            <Card className="bg-gradient-to-r from-blue-50 to-cyan-50">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Info className="h-5 w-5 mr-2 text-blue-600" />
                  Gợi ý tăng lương
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs font-bold text-blue-600">1</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Nâng cao kỹ năng</h4>
                      <p className="text-gray-600 text-sm">Học thêm các công nghệ mới như React, Node.js, hoặc Python để tăng giá trị trên thị trường.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs font-bold text-blue-600">2</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Chứng chỉ chuyên môn</h4>
                      <p className="text-gray-600 text-sm">Có chứng chỉ AWS, Google Cloud, hoặc các chứng chỉ ngành có thể tăng lương 10-20%.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs font-bold text-blue-600">3</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Kinh nghiệm quản lý</h4>
                      <p className="text-gray-600 text-sm">Phát triển kỹ năng leadership và quản lý team để chuyển sang vị trí cao hơn.</p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 pt-4 border-t border-blue-200">
                  <Button 
                    onClick={() => navigate('jobs')}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    Tìm việc mức lương cao
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}