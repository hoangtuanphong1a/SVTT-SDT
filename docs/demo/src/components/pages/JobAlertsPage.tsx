import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Switch } from "../ui/switch";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import {
  Bell,
  Plus,
  Edit,
  Trash2,
  Mail,
  Smartphone,
  MapPin,
  DollarSign,
  Briefcase,
  Filter,
  Save,
  AlertCircle,
  CheckCircle,
  Clock
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

interface JobAlert {
  id: string;
  name: string;
  keywords: string;
  location: string;
  industry: string;
  salaryMin: string;
  salaryMax: string;
  experience: string;
  jobType: string;
  frequency: "instant" | "daily" | "weekly";
  emailEnabled: boolean;
  smsEnabled: boolean;
  isActive: boolean;
  createdAt: string;
  lastTriggered: string;
  matchingJobs: number;
}

interface JobAlertsPageProps {
  navigate: (page: string, id?: string) => void;
}

export default function JobAlertsPage({ navigate }: JobAlertsPageProps) {
  const [alerts, setAlerts] = useState<JobAlert[]>([
    {
      id: "1",
      name: "Frontend Developer Jobs",
      keywords: "React, JavaScript, Frontend",
      location: "TP. Hồ Chí Minh",
      industry: "Công nghệ thông tin",
      salaryMin: "20000000",
      salaryMax: "35000000",
      experience: "2-4 năm",
      jobType: "Toàn thời gian",
      frequency: "daily",
      emailEnabled: true,
      smsEnabled: false,
      isActive: true,
      createdAt: "2024-01-15",
      lastTriggered: "2024-01-20",
      matchingJobs: 45
    },
    {
      id: "2",
      name: "Marketing Manager Remote",
      keywords: "Marketing, Manager, Digital Marketing",
      location: "Làm từ xa",
      industry: "Marketing & PR",
      salaryMin: "18000000",
      salaryMax: "28000000",
      experience: "3-5 năm",
      jobType: "Toàn thời gian",
      frequency: "weekly",
      emailEnabled: true,
      smsEnabled: true,
      isActive: true,
      createdAt: "2024-01-10",
      lastTriggered: "2024-01-18",
      matchingJobs: 23
    },
    {
      id: "3",
      name: "Data Science Opportunities",
      keywords: "Python, Machine Learning, Data Science",
      location: "Hà Nội",
      industry: "Công nghệ thông tin",
      salaryMin: "25000000",
      salaryMax: "40000000",
      experience: "3-5 năm",
      jobType: "Toàn thời gian",
      frequency: "instant",
      emailEnabled: true,
      smsEnabled: false,
      isActive: false,
      createdAt: "2024-01-05",
      lastTriggered: "2024-01-12",
      matchingJobs: 12
    }
  ]);

  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [editingAlert, setEditingAlert] = useState<JobAlert | null>(null);

  const [newAlert, setNewAlert] = useState({
    name: "",
    keywords: "",
    location: "",
    industry: "",
    salaryMin: "",
    salaryMax: "",
    experience: "",
    jobType: "",
    frequency: "daily" as "instant" | "daily" | "weekly",
    emailEnabled: true,
    smsEnabled: false
  });

  const formatCurrency = (value: string) => {
    if (!value) return "";
    const num = parseInt(value);
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
      maximumFractionDigits: 0
    }).format(num);
  };

  const handleCreateAlert = () => {
    const alert: JobAlert = {
      id: Date.now().toString(),
      ...newAlert,
      isActive: true,
      createdAt: new Date().toISOString().split('T')[0],
      lastTriggered: "",
      matchingJobs: Math.floor(Math.random() * 50) + 1
    };

    setAlerts([...alerts, alert]);
    setNewAlert({
      name: "",
      keywords: "",
      location: "",
      industry: "",
      salaryMin: "",
      salaryMax: "",
      experience: "",
      jobType: "",
      frequency: "daily",
      emailEnabled: true,
      smsEnabled: false
    });
    setIsCreateDialogOpen(false);
  };

  const handleDeleteAlert = (id: string) => {
    setAlerts(alerts.filter(alert => alert.id !== id));
  };

  const handleToggleAlert = (id: string) => {
    setAlerts(alerts.map(alert => 
      alert.id === id ? { ...alert, isActive: !alert.isActive } : alert
    ));
  };

  const getFrequencyBadge = (frequency: string) => {
    const colors = {
      instant: "bg-red-100 text-red-700",
      daily: "bg-blue-100 text-blue-700",
      weekly: "bg-green-100 text-green-700"
    };
    
    const labels = {
      instant: "Ngay lập tức",
      daily: "Hàng ngày",
      weekly: "Hàng tuần"
    };

    return (
      <Badge className={colors[frequency as keyof typeof colors]}>
        {labels[frequency as keyof typeof labels]}
      </Badge>
    );
  };

  const AlertCard = ({ alert }: { alert: JobAlert }) => (
    <Card className={`${alert.isActive ? 'border-orange-200 bg-orange-50/30' : 'border-gray-200 bg-gray-50'} transition-all hover:shadow-md`}>
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className={`p-2 rounded-lg ${alert.isActive ? 'bg-orange-primary text-white' : 'bg-gray-400 text-white'}`}>
              <Bell className="h-4 w-4" />
            </div>
            <div>
              <CardTitle className="text-lg">{alert.name}</CardTitle>
              <p className="text-sm text-gray-600 mt-1">
                Tạo ngày {new Date(alert.createdAt).toLocaleDateString('vi-VN')}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            {getFrequencyBadge(alert.frequency)}
            <Switch
              checked={alert.isActive}
              onCheckedChange={() => handleToggleAlert(alert.id)}
            />
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="flex items-center text-sm text-gray-600">
              <Filter className="h-4 w-4 mr-2" />
              <span className="font-medium">Từ khóa:</span>
              <span className="ml-1">{alert.keywords || "Tất cả"}</span>
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <MapPin className="h-4 w-4 mr-2" />
              <span className="font-medium">Địa điểm:</span>
              <span className="ml-1">{alert.location || "Tất cả"}</span>
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <Briefcase className="h-4 w-4 mr-2" />
              <span className="font-medium">Ngành:</span>
              <span className="ml-1">{alert.industry || "Tất cả"}</span>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center text-sm text-gray-600">
              <DollarSign className="h-4 w-4 mr-2" />
              <span className="font-medium">Lương:</span>
              <span className="ml-1">
                {alert.salaryMin && alert.salaryMax 
                  ? `${formatCurrency(alert.salaryMin)} - ${formatCurrency(alert.salaryMax)}`
                  : "Thỏa thuận"
                }
              </span>
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <Clock className="h-4 w-4 mr-2" />
              <span className="font-medium">Kinh nghiệm:</span>
              <span className="ml-1">{alert.experience || "Không yêu cầu"}</span>
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <CheckCircle className="h-4 w-4 mr-2" />
              <span className="font-medium">Loại:</span>
              <span className="ml-1">{alert.jobType || "Tất cả"}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between pt-4 border-t">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              {alert.emailEnabled && (
                <div className="flex items-center space-x-1 text-green-600">
                  <Mail className="h-4 w-4" />
                  <span className="text-xs">Email</span>
                </div>
              )}
              {alert.smsEnabled && (
                <div className="flex items-center space-x-1 text-blue-600">
                  <Smartphone className="h-4 w-4" />
                  <span className="text-xs">SMS</span>
                </div>
              )}
            </div>
            <div className="text-sm text-gray-600">
              <span className="font-medium text-orange-primary">{alert.matchingJobs}</span> việc phù hợp
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setEditingAlert(alert);
                setIsCreateDialogOpen(true);
              }}
            >
              <Edit className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleDeleteAlert(alert.id)}
              className="text-red-600 hover:text-red-800"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {alert.lastTriggered && (
          <div className="text-xs text-gray-500 flex items-center pt-2">
            <AlertCircle className="h-3 w-3 mr-1" />
            Lần cuối kích hoạt: {new Date(alert.lastTriggered).toLocaleDateString('vi-VN')}
          </div>
        )}
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Thông báo việc làm</h1>
            <p className="text-gray-600 mt-2">
              Thiết lập thông báo để không bỏ lỡ cơ hội việc làm phù hợp
            </p>
          </div>
          
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-orange-primary hover:bg-orange-600">
                <Plus className="h-4 w-4 mr-2" />
                Tạo thông báo mới
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>
                  {editingAlert ? "Chỉnh sửa thông báo" : "Tạo thông báo mới"}
                </DialogTitle>
                <DialogDescription>
                  Thiết lập tiêu chí để nhận thông báo khi có việc làm phù hợp
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-6 py-4">
                <div className="space-y-2">
                  <Label htmlFor="alertName">Tên thông báo</Label>
                  <Input
                    id="alertName"
                    placeholder="VD: Frontend Developer Jobs"
                    value={newAlert.name}
                    onChange={(e) => setNewAlert({...newAlert, name: e.target.value})}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="keywords">Từ khóa</Label>
                    <Input
                      id="keywords"
                      placeholder="React, JavaScript, Frontend"
                      value={newAlert.keywords}
                      onChange={(e) => setNewAlert({...newAlert, keywords: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="location">Địa điểm</Label>
                    <Select
                      value={newAlert.location}
                      onValueChange={(value) => setNewAlert({...newAlert, location: value})}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Chọn địa điểm" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">Tất cả địa điểm</SelectItem>
                        <SelectItem value="TP. Hồ Chí Minh">TP. Hồ Chí Minh</SelectItem>
                        <SelectItem value="Hà Nội">Hà Nội</SelectItem>
                        <SelectItem value="Đà Nẵng">Đà Nẵng</SelectItem>
                        <SelectItem value="Làm từ xa">Làm từ xa</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Mức lương tối thiểu (VND)</Label>
                    <Input
                      type="number"
                      placeholder="15000000"
                      value={newAlert.salaryMin}
                      onChange={(e) => setNewAlert({...newAlert, salaryMin: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Mức lương tối đa (VND)</Label>
                    <Input
                      type="number"
                      placeholder="30000000"
                      value={newAlert.salaryMax}
                      onChange={(e) => setNewAlert({...newAlert, salaryMax: e.target.value})}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Kinh nghiệm</Label>
                    <Select
                      value={newAlert.experience}
                      onValueChange={(value) => setNewAlert({...newAlert, experience: value})}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Chọn kinh nghiệm" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">Tất cả</SelectItem>
                        <SelectItem value="Không yêu cầu">Không yêu cầu</SelectItem>
                        <SelectItem value="1-2 năm">1-2 năm</SelectItem>
                        <SelectItem value="2-4 năm">2-4 năm</SelectItem>
                        <SelectItem value="3-5 năm">3-5 năm</SelectItem>
                        <SelectItem value="5+ năm">5+ năm</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Loại công việc</Label>
                    <Select
                      value={newAlert.jobType}
                      onValueChange={(value) => setNewAlert({...newAlert, jobType: value})}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Chọn loại" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">Tất cả</SelectItem>
                        <SelectItem value="Toàn thời gian">Toàn thời gian</SelectItem>
                        <SelectItem value="Bán thời gian">Bán thời gian</SelectItem>
                        <SelectItem value="Hợp đồng">Hợp đồng</SelectItem>
                        <SelectItem value="Freelance">Freelance</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Tần suất thông báo</Label>
                  <Select
                    value={newAlert.frequency}
                    onValueChange={(value: "instant" | "daily" | "weekly") => 
                      setNewAlert({...newAlert, frequency: value})
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="instant">Ngay lập tức</SelectItem>
                      <SelectItem value="daily">Hàng ngày</SelectItem>
                      <SelectItem value="weekly">Hàng tuần</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-4">
                  <Label>Phương thức thông báo</Label>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <Switch
                        checked={newAlert.emailEnabled}
                        onCheckedChange={(checked) => 
                          setNewAlert({...newAlert, emailEnabled: checked})
                        }
                      />
                      <div className="flex items-center space-x-2">
                        <Mail className="h-4 w-4 text-gray-600" />
                        <span>Gửi email thông báo</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Switch
                        checked={newAlert.smsEnabled}
                        onCheckedChange={(checked) => 
                          setNewAlert({...newAlert, smsEnabled: checked})
                        }
                      />
                      <div className="flex items-center space-x-2">
                        <Smartphone className="h-4 w-4 text-gray-600" />
                        <span>Gửi SMS thông báo</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-end space-x-3 pt-4">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setIsCreateDialogOpen(false);
                      setEditingAlert(null);
                    }}
                  >
                    Hủy
                  </Button>
                  <Button
                    onClick={handleCreateAlert}
                    className="bg-orange-primary hover:bg-orange-600"
                    disabled={!newAlert.name}
                  >
                    <Save className="h-4 w-4 mr-2" />
                    {editingAlert ? "Cập nhật" : "Tạo thông báo"}
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-orange-light rounded-lg">
                  <Bell className="h-6 w-6 text-orange-primary" />
                </div>
                <div className="ml-4">
                  <p className="text-sm text-gray-600">Tổng thông báo</p>
                  <p className="text-2xl font-bold text-gray-900">{alerts.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-green-100 rounded-lg">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm text-gray-600">Đang hoạt động</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {alerts.filter(a => a.isActive).length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Briefcase className="h-6 w-6 text-blue-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm text-gray-600">Việc phù hợp</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {alerts.reduce((sum, alert) => sum + alert.matchingJobs, 0)}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Mail className="h-6 w-6 text-purple-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm text-gray-600">Thông báo tuần này</p>
                  <p className="text-2xl font-bold text-gray-900">127</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Alerts List */}
        <div className="space-y-6">
          {alerts.length === 0 ? (
            <Card>
              <CardContent className="p-12 text-center">
                <Bell className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Chưa có thông báo nào
                </h3>
                <p className="text-gray-600 mb-6">
                  Tạo thông báo đầu tiên để không bỏ lỡ cơ hội việc làm phù hợp
                </p>
                <Button
                  onClick={() => setIsCreateDialogOpen(true)}
                  className="bg-orange-primary hover:bg-orange-600"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Tạo thông báo đầu tiên
                </Button>
              </CardContent>
            </Card>
          ) : (
            alerts.map(alert => (
              <AlertCard key={alert.id} alert={alert} />
            ))
          )}
        </div>
      </div>
    </div>
  );
}