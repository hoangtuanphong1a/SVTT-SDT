import React, { useState } from "react";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { 
  Building2, 
  Users, 
  Briefcase, 
  Eye,
  Plus,
  Search,
  Settings,
  BarChart3,
  Calendar,
  MapPin,
  Clock,
  UserCheck,
  AlertCircle,
  ChevronRight,
  Filter
} from "lucide-react";

interface EmployerDashboardProps {
  navigate: (page: string, id?: string) => void;
}

export default function EmployerDashboard({ navigate }: EmployerDashboardProps) {
  const [activeTab, setActiveTab] = useState("overview");

  // Mock data
  const company = {
    name: "TechCorp Vietnam",
    logo: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=64&h=64&fit=crop",
    industry: "Công nghệ thông tin",
    size: "100-500 nhân viên"
  };

  const stats = [
    { icon: Briefcase, label: "Tin đăng đang hoạt động", value: "12", trend: "+3" },
    { icon: Users, label: "Ứng viên mới", value: "47", trend: "+15" },
    { icon: Eye, label: "Lượt xem tin", value: "1,234", trend: "+12%" },
    { icon: UserCheck, label: "Phỏng vấn đã lên lịch", value: "8", trend: "+2" }
  ];

  const jobPosts = [
    {
      id: "1",
      title: "Senior Frontend Developer",
      department: "Engineering",
      posted: "2024-12-10",
      deadline: "2024-12-25",
      applicants: 23,
      status: "active",
      views: 156,
      location: "TP. Hồ Chí Minh",
      type: "Toàn thời gian"
    },
    {
      id: "2",
      title: "Product Manager",
      department: "Product",
      posted: "2024-12-08",
      deadline: "2024-12-20",
      applicants: 18,
      status: "active",
      views: 98,
      location: "Hà Nội",
      type: "Toàn thời gian"
    },
    {
      id: "3",
      title: "UX/UI Designer",
      department: "Design",
      posted: "2024-12-05",
      deadline: "2024-12-18",
      applicants: 31,
      status: "expired",
      views: 203,
      location: "Đà Nẵng",
      type: "Toàn thời gian"
    }
  ];

  const recentApplicants = [
    {
      id: "1",
      name: "Nguyễn Văn A",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop",
      position: "Senior Frontend Developer",
      appliedDate: "2024-12-10",
      experience: "3 năm",
      skills: ["React", "TypeScript", "Node.js"],
      status: "pending"
    },
    {
      id: "2",
      name: "Trần Thị B",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b593?w=40&h=40&fit=crop",
      position: "Product Manager",
      appliedDate: "2024-12-09",
      experience: "5 năm",
      skills: ["Strategy", "Analytics", "Agile"],
      status: "interviewing"
    },
    {
      id: "3",
      name: "Lê Văn C",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop",
      position: "UX/UI Designer",
      appliedDate: "2024-12-08",
      experience: "2 năm",
      skills: ["Figma", "Adobe XD", "Prototyping"],
      status: "rejected"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-green-100 text-green-800";
      case "expired": return "bg-red-100 text-red-800";
      case "draft": return "bg-gray-100 text-gray-800";
      case "pending": return "bg-yellow-100 text-yellow-800";
      case "interviewing": return "bg-blue-100 text-blue-800";
      case "rejected": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "active": return "Đang hoạt động";
      case "expired": return "Hết hạn";
      case "draft": return "Bản nháp";
      case "pending": return "Chờ xem xét";
      case "interviewing": return "Phỏng vấn";
      case "rejected": return "Từ chối";
      default: return "Không xác định";
    }
  };

  const sidebarItems = [
    { id: "overview", label: "Tổng quan", icon: BarChart3 },
    { id: "job-posts", label: "Tin tuyển dụng", icon: Briefcase },
    { id: "applicants", label: "Ứng viên", icon: Users },
    { id: "company", label: "Hồ sơ công ty", icon: Building2 },
    { id: "settings", label: "Cài đặt", icon: Settings }
  ];

  const OverviewTab = () => (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                    <p className="text-xs text-green-600 font-medium">{stat.trend}</p>
                  </div>
                  <div className="w-12 h-12 bg-orange-light rounded-lg flex items-center justify-center">
                    <Icon className="h-6 w-6 text-orange-primary" />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Hành động nhanh</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button 
              onClick={() => navigate("post-job")}
              className="h-20 bg-orange-primary hover:bg-orange-600 text-white flex flex-col"
            >
              <Plus className="h-6 w-6 mb-2" />
              Đăng tin tuyển dụng
            </Button>
            <Button 
              variant="outline"
              onClick={() => setActiveTab("applicants")}
              className="h-20 flex flex-col"
            >
              <Users className="h-6 w-6 mb-2" />
              Xem ứng viên
            </Button>
            <Button 
              variant="outline"
              onClick={() => setActiveTab("company")}
              className="h-20 flex flex-col"
            >
              <Building2 className="h-6 w-6 mb-2" />
              Cập nhật công ty
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Recent Job Posts */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Tin đăng gần đây</CardTitle>
            <Button variant="ghost" onClick={() => setActiveTab("job-posts")}>
              Xem tất cả <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {jobPosts.slice(0, 3).map((job) => (
              <div key={job.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-medium text-gray-900">{job.title}</h4>
                    <Badge className={`${getStatusColor(job.status)} border-0`}>
                      {getStatusText(job.status)}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600">{job.department}</p>
                  <div className="flex items-center space-x-4 text-xs text-gray-500 mt-1">
                    <span className="flex items-center">
                      <Calendar className="h-3 w-3 mr-1" />
                      Đăng: {job.posted}
                    </span>
                    <span className="flex items-center">
                      <Clock className="h-3 w-3 mr-1" />
                      Hạn: {job.deadline}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg font-semibold text-orange-primary">{job.applicants}</p>
                  <p className="text-xs text-gray-500">ứng viên</p>
                  <p className="text-xs text-gray-500">{job.views} lượt xem</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Applicants */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Ứng viên mới</CardTitle>
            <Button variant="ghost" onClick={() => setActiveTab("applicants")}>
              Xem tất cả <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentApplicants.map((applicant) => (
              <div key={applicant.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                <div className="flex items-center space-x-4">
                  <img 
                    src={applicant.avatar}
                    alt={applicant.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="font-medium text-gray-900">{applicant.name}</h4>
                    <p className="text-sm text-gray-600">{applicant.position}</p>
                    <div className="flex items-center space-x-2 mt-1">
                      {applicant.skills.slice(0, 2).map((skill, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                      {applicant.skills.length > 2 && (
                        <span className="text-xs text-gray-500">+{applicant.skills.length - 2}</span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <Badge className={`${getStatusColor(applicant.status)} border-0 mb-2`}>
                    {getStatusText(applicant.status)}
                  </Badge>
                  <p className="text-xs text-gray-500">{applicant.experience}</p>
                  <p className="text-xs text-gray-500">Ứng tuyển: {applicant.appliedDate}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const JobPostsTab = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Quản lý tin tuyển dụng</h2>
        <Button 
          onClick={() => navigate("post-job")}
          className="bg-orange-primary hover:bg-orange-600"
        >
          <Plus className="h-4 w-4 mr-2" />
          Đăng tin mới
        </Button>
      </div>

      <Card>
        <CardContent className="p-6">
          <div className="space-y-4">
            {jobPosts.map((job) => (
              <div key={job.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-semibold text-gray-900">{job.title}</h3>
                    <Badge className={`${getStatusColor(job.status)} border-0`}>
                      {getStatusText(job.status)}
                    </Badge>
                    {job.status === "expired" && (
                      <AlertCircle className="h-4 w-4 text-red-500" />
                    )}
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{job.department}</p>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600">
                    <span className="flex items-center">
                      <MapPin className="h-4 w-4 mr-1" />
                      {job.location}
                    </span>
                    <span className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      {job.type}
                    </span>
                    <span className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      Đăng: {job.posted}
                    </span>
                    <span className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      Hạn: {job.deadline}
                    </span>
                  </div>
                </div>
                <div className="text-right space-y-2">
                  <div className="flex items-center space-x-4">
                    <div className="text-center">
                      <p className="text-lg font-semibold text-orange-primary">{job.applicants}</p>
                      <p className="text-xs text-gray-500">ứng viên</p>
                    </div>
                    <div className="text-center">
                      <p className="text-lg font-semibold text-gray-700">{job.views}</p>
                      <p className="text-xs text-gray-500">lượt xem</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      Chỉnh sửa
                    </Button>
                    <Button variant="outline" size="sm">
                      Xem ứng viên
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const ApplicantsTab = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Quản lý ứng viên</h2>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Lọc
          </Button>
          <Button variant="outline" size="sm">
            <Search className="h-4 w-4 mr-2" />
            Tìm kiếm
          </Button>
        </div>
      </div>

      <Card>
        <CardContent className="p-6">
          <div className="space-y-4">
            {recentApplicants.map((applicant) => (
              <div key={applicant.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                <div className="flex items-center space-x-4">
                  <img 
                    src={applicant.avatar}
                    alt={applicant.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="font-semibold text-gray-900">{applicant.name}</h4>
                    <p className="text-sm text-gray-600">{applicant.position}</p>
                    <p className="text-sm text-gray-500">{applicant.experience} • Ứng tuyển: {applicant.appliedDate}</p>
                    <div className="flex items-center space-x-2 mt-2">
                      {applicant.skills.map((skill, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="text-right space-y-2">
                  <Badge className={`${getStatusColor(applicant.status)} border-0`}>
                    {getStatusText(applicant.status)}
                  </Badge>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">
                      Xem CV
                    </Button>
                    {applicant.status === "pending" && (
                      <>
                        <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white">
                          Phỏng vấn
                        </Button>
                        <Button size="sm" variant="outline">
                          Từ chối
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case "overview":
        return <OverviewTab />;
      case "job-posts":
        return <JobPostsTab />;
      case "applicants":
        return <ApplicantsTab />;
      default:
        return <OverviewTab />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-6">
              {/* Company Profile Card */}
              <Card className="mb-6">
                <CardContent className="p-6 text-center">
                  <img 
                    src={company.logo}
                    alt={company.name}
                    className="w-20 h-20 rounded-xl mx-auto mb-4 object-cover"
                  />
                  <h3 className="font-semibold text-gray-900 mb-1">{company.name}</h3>
                  <p className="text-sm text-gray-600 mb-1">{company.industry}</p>
                  <p className="text-xs text-gray-500 mb-3">{company.size}</p>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setActiveTab("company")}
                  >
                    Cập nhật hồ sơ
                  </Button>
                </CardContent>
              </Card>

              {/* Navigation */}
              <Card>
                <CardContent className="p-4">
                  <nav className="space-y-2">
                    {sidebarItems.map((item) => {
                      const Icon = item.icon;
                      return (
                        <button
                          key={item.id}
                          onClick={() => setActiveTab(item.id)}
                          className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                            activeTab === item.id
                              ? "bg-orange-primary text-white"
                              : "text-gray-700 hover:bg-gray-100"
                          }`}
                        >
                          <Icon className="h-5 w-5" />
                          <span>{item.label}</span>
                        </button>
                      );
                    })}
                  </nav>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                Dashboard Nhà tuyển dụng
              </h1>
              <p className="text-gray-600">
                Quản lý tin tuyển dụng và theo dõi ứng viên
              </p>
            </div>
            
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
}