import React, { useState } from "react";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { 
  User, 
  Briefcase, 
  FileText, 
  Heart, 
  Eye,
  Bell,
  Settings,
  BarChart3,
  Calendar,
  MapPin,
  DollarSign,
  Building2,
  Plus,
  ChevronRight
} from "lucide-react";

interface JobSeekerDashboardProps {
  navigate: (page: string, id?: string) => void;
}

export default function JobSeekerDashboard({ navigate }: JobSeekerDashboardProps) {
  const [activeTab, setActiveTab] = useState("overview");

  // Mock data
  const user = {
    name: "Nguyễn Văn A",
    email: "nguyenvana@email.com",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=64&h=64&fit=crop&crop=face",
    title: "Frontend Developer",
    experience: "3 năm kinh nghiệm",
    location: "TP. Hồ Chí Minh"
  };

  const stats = [
    { icon: Eye, label: "Lượt xem CV", value: "127", trend: "+12%" },
    { icon: Briefcase, label: "Đơn ứng tuyển", value: "8", trend: "+2" },
    { icon: Heart, label: "Việc đã lưu", value: "15", trend: "+5" },
    { icon: Bell, label: "Thông báo mới", value: "3", trend: "new" }
  ];

  const applications = [
    {
      id: "1",
      job: "Senior Frontend Developer",
      company: "TechCorp Vietnam",
      appliedDate: "2024-12-10",
      status: "interviewing",
      salary: "25-35 triệu",
      logo: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=40&h=40&fit=crop"
    },
    {
      id: "2",
      job: "React Developer", 
      company: "StartupVN",
      appliedDate: "2024-12-08",
      status: "applied",
      salary: "20-28 triệu",
      logo: "https://images.unsplash.com/photo-1572021335469-31706a17aaef?w=40&h=40&fit=crop"
    },
    {
      id: "3",
      job: "Full Stack Developer",
      company: "Digital Agency", 
      appliedDate: "2024-12-05",
      status: "rejected",
      salary: "22-30 triệu",
      logo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop"
    }
  ];

  const savedJobs = [
    {
      id: "1",
      title: "Product Manager",
      company: "Growth Co",
      salary: "30-45 triệu",
      location: "Hà Nội",
      posted: "1 ngày trước",
      urgent: false
    },
    {
      id: "2",
      title: "UX Designer",
      company: "Design Studio",
      salary: "18-28 triệu", 
      location: "Đà Nẵng",
      posted: "2 ngày trước",
      urgent: true
    }
  ];

  const recommendations = [
    {
      id: "1",
      title: "Senior React Developer",
      company: "Tech Solutions",
      match: 95,
      salary: "28-40 triệu",
      location: "TP. Hồ Chí Minh"
    },
    {
      id: "2", 
      title: "Frontend Team Lead",
      company: "Innovation Hub",
      match: 88,
      salary: "35-50 triệu",
      location: "Hà Nội"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "applied": return "bg-blue-100 text-blue-800";
      case "interviewing": return "bg-orange-100 text-orange-800";
      case "accepted": return "bg-green-100 text-green-800";
      case "rejected": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "applied": return "Đã ứng tuyển";
      case "interviewing": return "Phỏng vấn";
      case "accepted": return "Được nhận";
      case "rejected": return "Từ chối";
      default: return "Chưa xác định";
    }
  };

  const sidebarItems = [
    { id: "overview", label: "Tổng quan", icon: BarChart3 },
    { id: "applications", label: "Đơn ứng tuyển", icon: Briefcase },
    { id: "saved-jobs", label: "Việc đã lưu", icon: Heart },
    { id: "cv", label: "Quản lý CV", icon: FileText },
    { id: "profile", label: "Hồ sơ cá nhân", icon: User },
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

      {/* Recent Applications */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Đơn ứng tuyển gần đây</CardTitle>
            <Button variant="ghost" onClick={() => setActiveTab("applications")}>
              Xem tất cả <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {applications.slice(0, 3).map((app) => (
              <div key={app.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                <div className="flex items-center space-x-4">
                  <img 
                    src={app.logo} 
                    alt={app.company}
                    className="w-10 h-10 rounded-lg object-cover"
                  />
                  <div>
                    <h4 className="font-medium text-gray-900">{app.job}</h4>
                    <p className="text-sm text-gray-600">{app.company}</p>
                    <p className="text-xs text-gray-500">Ứng tuyển: {app.appliedDate}</p>
                  </div>
                </div>
                <div className="text-right">
                  <Badge className={`${getStatusColor(app.status)} border-0`}>
                    {getStatusText(app.status)}
                  </Badge>
                  <p className="text-sm text-gray-600 mt-1">{app.salary}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Job Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle>Việc làm phù hợp</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recommendations.map((job) => (
              <div 
                key={job.id} 
                className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 cursor-pointer"
                onClick={() => navigate("job-detail", job.id)}
              >
                <div>
                  <h4 className="font-medium text-gray-900">{job.title}</h4>
                  <p className="text-sm text-gray-600">{job.company}</p>
                  <div className="flex items-center space-x-4 text-xs text-gray-500 mt-1">
                    <span className="flex items-center">
                      <MapPin className="h-3 w-3 mr-1" />
                      {job.location}
                    </span>
                    <span className="flex items-center">
                      <DollarSign className="h-3 w-3 mr-1" />
                      {job.salary}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center">
                    <div className="w-16 h-2 bg-gray-200 rounded-full mr-2">
                      <div 
                        className="h-2 bg-green-500 rounded-full"
                        style={{ width: `${job.match}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-medium text-green-600">{job.match}%</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Phù hợp</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const ApplicationsTab = () => (
    <Card>
      <CardHeader>
        <CardTitle>Đơn ứng tuyển của bạn</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {applications.map((app) => (
            <div key={app.id} className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center space-x-4">
                <img 
                  src={app.logo} 
                  alt={app.company}
                  className="w-12 h-12 rounded-lg object-cover"
                />
                <div>
                  <h4 className="font-medium text-gray-900">{app.job}</h4>
                  <p className="text-sm text-gray-600 flex items-center">
                    <Building2 className="h-4 w-4 mr-1" />
                    {app.company}
                  </p>
                  <p className="text-sm text-gray-500 flex items-center mt-1">
                    <Calendar className="h-4 w-4 mr-1" />
                    Ứng tuyển: {app.appliedDate}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <Badge className={`${getStatusColor(app.status)} border-0 mb-2`}>
                  {getStatusText(app.status)}
                </Badge>
                <p className="text-sm text-gray-600">{app.salary}</p>
                <Button 
                  variant="ghost" 
                  size="sm"
                  className="mt-2"
                  onClick={() => navigate("job-detail", app.id)}
                >
                  Xem chi tiết
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );

  const SavedJobsTab = () => (
    <Card>
      <CardHeader>
        <CardTitle>Việc làm đã lưu</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {savedJobs.map((job) => (
            <div 
              key={job.id} 
              className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 cursor-pointer"
              onClick={() => navigate("job-detail", job.id)}
            >
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="font-medium text-gray-900">{job.title}</h4>
                  {job.urgent && <Badge variant="destructive" className="text-xs">URGENT</Badge>}
                </div>
                <p className="text-sm text-gray-600">{job.company}</p>
                <div className="flex items-center space-x-4 text-xs text-gray-500 mt-1">
                  <span className="flex items-center">
                    <MapPin className="h-3 w-3 mr-1" />
                    {job.location}
                  </span>
                  <span className="flex items-center">
                    <DollarSign className="h-3 w-3 mr-1" />
                    {job.salary}
                  </span>
                  <span>{job.posted}</span>
                </div>
              </div>
              <div className="flex gap-2">
                <Button size="sm" className="bg-orange-primary hover:bg-orange-600">
                  Ứng tuyển
                </Button>
                <Button variant="outline" size="sm">
                  <Heart className="h-4 w-4 fill-current text-red-500" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );

  const CVTab = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Quản lý CV</CardTitle>
            <Button 
              onClick={() => navigate("cv-builder")}
              className="bg-orange-primary hover:bg-orange-600"
            >
              <Plus className="h-4 w-4 mr-2" />
              Tạo CV mới
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12">
            <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Chưa có CV nào
            </h3>
            <p className="text-gray-600 mb-4">
              Tạo CV chuyên nghiệp để tăng cơ hội được tuyển dụng
            </p>
            <Button 
              onClick={() => navigate("cv-builder")}
              className="bg-orange-primary hover:bg-orange-600"
            >
              Tạo CV ngay
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case "overview":
        return <OverviewTab />;
      case "applications":
        return <ApplicationsTab />;
      case "saved-jobs":
        return <SavedJobsTab />;
      case "cv":
        return <CVTab />;
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
              {/* User Profile Card */}
              <Card className="mb-6">
                <CardContent className="p-6 text-center">
                  <img 
                    src={user.avatar}
                    alt={user.name}
                    className="w-20 h-20 rounded-full mx-auto mb-4 object-cover"
                  />
                  <h3 className="font-semibold text-gray-900 mb-1">{user.name}</h3>
                  <p className="text-sm text-gray-600 mb-1">{user.title}</p>
                  <p className="text-xs text-gray-500 mb-3">{user.experience}</p>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setActiveTab("profile")}
                  >
                    Chỉnh sửa hồ sơ
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
                Chào mừng trở lại, {user.name}!
              </h1>
              <p className="text-gray-600">
                Quản lý việc làm và theo dõi tiến trình ứng tuyển của bạn
              </p>
            </div>
            
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
}