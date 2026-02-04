import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
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
  Cell,
  AreaChart,
  Area
} from "recharts";
import { 
  TrendingUp, 
  TrendingDown,
  Users,
  Briefcase,
  DollarSign,
  MapPin,
  Calendar,
  Filter,
  Download,
  RefreshCw
} from "lucide-react";

// Import mock data
import {
  salaryTrendData,
  industryDistribution,
  locationJobData,
  skillsDemandData,
  experienceLevelData,
  jobTypeDistribution,
  companySizeData,
  applicationSuccessData,
  topEmployersData,
  workLocationPreferences,
  industryGrowthData,
  dashboardMetrics
} from "../../data/chartData";

interface AnalyticsPageProps {
  navigate: (page: string, id?: string) => void;
}

export default function AnalyticsPage({ navigate }: AnalyticsPageProps) {
  const [selectedTimeRange, setSelectedTimeRange] = useState("6months");
  const [selectedMetric, setSelectedMetric] = useState("all");

  // Color palette for charts
  const colors = [
    "#f26b38", // Orange primary
    "#fef7f2", // Orange light  
    "#10b981", // Green accent
    "#3b82f6", // Blue
    "#8b5cf6", // Purple
    "#f59e0b", // Amber
    "#ef4444", // Red
    "#06b6d4", // Cyan
    "#84cc16", // Lime
    "#f97316"  // Orange
  ];

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
      maximumFractionDigits: 0
    }).format(value);
  };

  const formatNumber = (value: number) => {
    return new Intl.NumberFormat('vi-VN').format(value);
  };

  const StatCard = ({ icon: Icon, title, value, change, trend }: any) => (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600 mb-1">{title}</p>
            <p className="text-2xl font-bold text-gray-900">{value}</p>
            <div className="flex items-center mt-2">
              {trend === "up" ? (
                <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
              ) : (
                <TrendingDown className="h-4 w-4 text-red-500 mr-1" />
              )}
              <span className={`text-sm font-medium ${
                trend === "up" ? "text-green-500" : "text-red-500"
              }`}>
                {change}
              </span>
            </div>
          </div>
          <div className="w-12 h-12 bg-orange-light rounded-lg flex items-center justify-center">
            <Icon className="h-6 w-6 text-orange-primary" />
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Phân tích thị trường việc làm</h1>
            <p className="text-gray-600 mt-2">Thống kê và xu hướng tuyển dụng tại Việt Nam</p>
          </div>
          <div className="flex items-center space-x-3">
            <select
              value={selectedTimeRange}
              onChange={(e) => setSelectedTimeRange(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-primary focus:border-orange-primary outline-none bg-white"
            >
              <option value="1month">1 tháng</option>
              <option value="3months">3 tháng</option>
              <option value="6months">6 tháng</option>
              <option value="1year">1 năm</option>
            </select>
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              Lọc
            </Button>
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Xuất báo cáo
            </Button>
            <Button variant="outline">
              <RefreshCw className="h-4 w-4 mr-2" />
              Làm mới
            </Button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            icon={Briefcase}
            title="Tổng việc làm"
            value="9,235"
            change="+12.5%"
            trend="up"
          />
          <StatCard
            icon={Users}
            title="Ứng viên đăng ký"
            value="50,247"
            change="+8.2%"
            trend="up"
          />
          <StatCard
            icon={DollarSign}
            title="Lương trung bình"
            value="20.0M"
            change="+5.8%"
            trend="up"
          />
          <StatCard
            icon={TrendingUp}
            title="Tỷ lệ thành công"
            value="95.2%"
            change="+2.1%"
            trend="up"
          />
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Salary Trend Chart */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Xu hướng lương theo thời gian</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={salaryTrendData}>
                  <defs>
                    <linearGradient id="colorSalary" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#f26b38" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#f26b38" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis tickFormatter={(value) => `${(value / 1000000).toFixed(1)}M`} />
                  <Tooltip
                    formatter={(value: any) => [formatCurrency(value), "Lương trung bình"]}
                    labelFormatter={(label) => `Tháng: ${label}`}
                  />
                  <Area
                    type="monotone"
                    dataKey="averageSalary"
                    stroke="#f26b38"
                    fillOpacity={1}
                    fill="url(#colorSalary)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Industry Distribution */}
          <Card>
            <CardHeader>
              <CardTitle>Phân bố theo ngành nghề</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={industryDistribution}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ industry, percentage }) => `${industry}: ${percentage}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="jobCount"
                  >
                    {industryDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Location Distribution */}
          <Card>
            <CardHeader>
              <CardTitle>Việc làm theo địa điểm</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={locationJobData} layout="horizontal">
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis dataKey="location" type="category" width={100} />
                  <Tooltip
                    formatter={(value: any) => [formatNumber(value), "Số việc làm"]}
                  />
                  <Bar dataKey="jobCount" fill="#f26b38" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Skills Demand */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Top 10 kỹ năng được yêu cầu nhiều nhất</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={skillsDemandData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="skill" />
                  <YAxis />
                  <Tooltip
                    formatter={(value: any, name: string) => {
                      if (name === "demand") return [formatNumber(value), "Nhu cầu"];
                      if (name === "growth") return [`${value}%`, "Tăng trưởng"];
                      return [formatCurrency(value), "Lương trung bình"];
                    }}
                  />
                  <Bar dataKey="demand" fill="#f26b38" />
                  <Bar dataKey="growth" fill="#10b981" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Experience Level */}
          <Card>
            <CardHeader>
              <CardTitle>Phân bố theo kinh nghiệm</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {experienceLevelData.map((item, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-medium text-gray-900">{item.level}</span>
                        <span className="text-sm text-gray-500">{item.percentage}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-orange-primary h-2 rounded-full"
                          style={{ width: `${item.percentage}%` }}
                        ></div>
                      </div>
                    </div>
                    <div className="ml-4 text-right">
                      <div className="text-sm font-medium text-gray-900">
                        {formatNumber(item.jobCount)}
                      </div>
                      <div className="text-xs text-gray-500">
                        {formatCurrency(item.averageSalary)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Application Success Rate */}
          <Card>
            <CardHeader>
              <CardTitle>Tỷ lệ thành công ứng tuyển</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={applicationSuccessData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line 
                    type="monotone" 
                    dataKey="totalApplications" 
                    stroke="#3b82f6" 
                    name="Tổng đơn ứng tuyển"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="interviews" 
                    stroke="#f59e0b" 
                    name="Phỏng vấn"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="offers" 
                    stroke="#10b981" 
                    name="Nhận offer"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="hires" 
                    stroke="#f26b38" 
                    name="Được tuyển"
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Top Employers */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Top nhà tuyển dụng</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topEmployersData.map((employer, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                    <div className="flex items-center space-x-4">
                      <div className="w-8 h-8 bg-orange-primary text-white rounded-full flex items-center justify-center text-sm font-bold">
                        {index + 1}
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">{employer.company}</h4>
                        <p className="text-sm text-gray-600">{employer.employees}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center space-x-4">
                        <div className="text-center">
                          <div className="text-sm font-medium text-gray-900">{employer.jobsPosted}</div>
                          <div className="text-xs text-gray-500">Tin đăng</div>
                        </div>
                        <div className="text-center">
                          <div className="text-sm font-medium text-gray-900">{formatNumber(employer.applications)}</div>
                          <div className="text-xs text-gray-500">Ứng tuyển</div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Industry Growth */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Các ngành có tốc độ tăng trưởng cao</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {industryGrowthData.map((industry, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-medium text-gray-900">{industry.industry}</span>
                        <Badge className="bg-green-100 text-green-800">
                          +{industry.growth}%
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between text-sm text-gray-600">
                        <span>{formatNumber(industry.jobs)} việc làm</span>
                        <div className="w-32 bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-green-500 h-2 rounded-full"
                            style={{ width: `${Math.min(industry.growth, 50) * 2}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Insights */}
        <div className="mt-8">
          <Card>
            <CardHeader>
              <CardTitle>Thông tin chi tiết</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-orange-light rounded-full flex items-center justify-center mx-auto mb-4">
                    <TrendingUp className="h-8 w-8 text-orange-primary" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Tăng trưởng mạnh</h3>
                  <p className="text-gray-600 text-sm">
                    Thị trường việc làm IT tăng trưởng 28.4% so với cùng kỳ năm trước
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-orange-light rounded-full flex items-center justify-center mx-auto mb-4">
                    <MapPin className="h-8 w-8 text-orange-primary" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Tập trung địa lý</h3>
                  <p className="text-gray-600 text-sm">
                    79.1% việc làm tập trung tại TP.HCM và Hà Nội
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-orange-light rounded-full flex items-center justify-center mx-auto mb-4">
                    <DollarSign className="h-8 w-8 text-orange-primary" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Lương cạnh tranh</h3>
                  <p className="text-gray-600 text-sm">
                    Mức lương trung bình tăng 15.8% trong năm 2024
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}