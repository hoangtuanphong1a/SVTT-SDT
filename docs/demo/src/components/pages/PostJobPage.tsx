import React, { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { 
  Briefcase, 
  MapPin, 
  DollarSign, 
  Clock, 
  Building2,
  Eye,
  Save,
  Send,
  Plus,
  X
} from "lucide-react";

interface PostJobPageProps {
  navigate: (page: string, id?: string) => void;
}

export default function PostJobPage({ navigate }: PostJobPageProps) {
  const [formData, setFormData] = useState({
    title: "",
    company: "TechCorp Vietnam", // Would come from user profile
    department: "",
    location: "",
    locationType: "office",
    jobType: "full-time", 
    experience: "",
    salary: {
      min: "",
      max: "",
      currency: "VND",
      period: "monthly"
    },
    description: "",
    requirements: "",
    benefits: "",
    skills: [] as string[],
    deadline: "",
    urgent: false
  });

  const [newSkill, setNewSkill] = useState("");
  const [currentStep, setCurrentStep] = useState(1);
  const [isPreview, setIsPreview] = useState(false);

  const updateFormData = (field: string, value: any) => {
    if (field.includes('.')) {
      const [parent, child] = field.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...(prev as any)[parent],
          [child]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [field]: value
      }));
    }
  };

  const addSkill = () => {
    if (newSkill.trim() && !formData.skills.includes(newSkill.trim())) {
      setFormData(prev => ({
        ...prev,
        skills: [...prev.skills, newSkill.trim()]
      }));
      setNewSkill("");
    }
  };

  const removeSkill = (skill: string) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.filter(s => s !== skill)
    }));
  };

  const handleSubmit = () => {
    // Handle job posting
    console.log("Job posted:", formData);
    navigate("employer-dashboard");
  };

  const BasicInfoStep = () => (
    <div className="space-y-6">
      {/* Job Title */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Tiêu đề công việc *
        </label>
        <Input
          placeholder="VD: Senior Frontend Developer"
          value={formData.title}
          onChange={(e) => updateFormData("title", e.target.value)}
          className="h-12"
        />
      </div>

      {/* Department */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Phòng ban
        </label>
        <Input
          placeholder="VD: Engineering, Marketing, Sales"
          value={formData.department}
          onChange={(e) => updateFormData("department", e.target.value)}
          className="h-12"
        />
      </div>

      {/* Location */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Địa điểm làm việc *
          </label>
          <select
            value={formData.location}
            onChange={(e) => updateFormData("location", e.target.value)}
            className="w-full h-12 px-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-primary focus:border-orange-primary outline-none bg-white"
          >
            <option value="">Chọn địa điểm</option>
            <option value="ho-chi-minh">TP. Hồ Chí Minh</option>
            <option value="ha-noi">Hà Nội</option>
            <option value="da-nang">Đà Nẵng</option>
            <option value="can-tho">Cần Thơ</option>
            <option value="remote">Làm từ xa</option>
            <option value="hybrid">Hybrid</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Hình thức làm việc *
          </label>
          <select
            value={formData.locationType}
            onChange={(e) => updateFormData("locationType", e.target.value)}
            className="w-full h-12 px-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-primary focus:border-orange-primary outline-none bg-white"
          >
            <option value="office">Tại văn phòng</option>
            <option value="remote">Làm từ xa</option>
            <option value="hybrid">Hybrid</option>
          </select>
        </div>
      </div>

      {/* Job Type & Experience */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Loại hình công việc *
          </label>
          <select
            value={formData.jobType}
            onChange={(e) => updateFormData("jobType", e.target.value)}
            className="w-full h-12 px-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-primary focus:border-orange-primary outline-none bg-white"
          >
            <option value="full-time">Toàn thời gian</option>
            <option value="part-time">Bán thời gian</option>
            <option value="contract">Hợp đồng</option>
            <option value="internship">Thực tập</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Kinh nghiệm yêu cầu
          </label>
          <select
            value={formData.experience}
            onChange={(e) => updateFormData("experience", e.target.value)}
            className="w-full h-12 px-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-primary focus:border-orange-primary outline-none bg-white"
          >
            <option value="">Chọn mức kinh nghiệm</option>
            <option value="fresh">Sinh viên/Thực tập</option>
            <option value="junior">Dưới 1 năm</option>
            <option value="mid">1-3 năm</option>
            <option value="senior">3-5 năm</option>
            <option value="lead">Trên 5 năm</option>
          </select>
        </div>
      </div>

      {/* Salary */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Mức lương
        </label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Input
            type="number"
            placeholder="Từ"
            value={formData.salary.min}
            onChange={(e) => updateFormData("salary.min", e.target.value)}
            className="h-12"
          />
          <Input
            type="number"
            placeholder="Đến"
            value={formData.salary.max}
            onChange={(e) => updateFormData("salary.max", e.target.value)}
            className="h-12"
          />
          <select
            value={formData.salary.currency}
            onChange={(e) => updateFormData("salary.currency", e.target.value)}
            className="h-12 px-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-primary focus:border-orange-primary outline-none bg-white"
          >
            <option value="VND">VND</option>
            <option value="USD">USD</option>
          </select>
          <select
            value={formData.salary.period}
            onChange={(e) => updateFormData("salary.period", e.target.value)}
            className="h-12 px-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-primary focus:border-orange-primary outline-none bg-white"
          >
            <option value="monthly">Tháng</option>
            <option value="yearly">Năm</option>
          </select>
        </div>
      </div>

      {/* Deadline */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Hạn ứng tuyển
          </label>
          <Input
            type="date"
            value={formData.deadline}
            onChange={(e) => updateFormData("deadline", e.target.value)}
            className="h-12"
          />
        </div>
        <div className="flex items-end">
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={formData.urgent}
              onChange={(e) => updateFormData("urgent", e.target.checked)}
              className="rounded border-gray-300 text-orange-primary focus:ring-orange-primary"
            />
            <span className="text-sm text-gray-700">Việc làm cấp bách</span>
          </label>
        </div>
      </div>
    </div>
  );

  const DetailsStep = () => (
    <div className="space-y-6">
      {/* Job Description */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Mô tả công việc *
        </label>
        <Textarea
          placeholder="Mô tả chi tiết về công việc, trách nhiệm và yêu cầu..."
          value={formData.description}
          onChange={(e) => updateFormData("description", e.target.value)}
          rows={6}
        />
      </div>

      {/* Requirements */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Yêu cầu công việc
        </label>
        <Textarea
          placeholder="Danh sách các yêu cầu về kinh nghiệm, kỹ năng, bằng cấp..."
          value={formData.requirements}
          onChange={(e) => updateFormData("requirements", e.target.value)}
          rows={4}
        />
      </div>

      {/* Benefits */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Quyền lợi
        </label>
        <Textarea
          placeholder="Các quyền lợi và phúc lợi dành cho nhân viên..."
          value={formData.benefits}
          onChange={(e) => updateFormData("benefits", e.target.value)}
          rows={4}
        />
      </div>

      {/* Skills */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Kỹ năng yêu cầu
        </label>
        <div className="flex gap-2 mb-3">
          <Input
            placeholder="VD: React, Node.js, Python..."
            value={newSkill}
            onChange={(e) => setNewSkill(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                addSkill();
              }
            }}
            className="h-10"
          />
          <Button 
            type="button"
            onClick={addSkill}
            className="bg-orange-primary hover:bg-orange-600 px-4"
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex flex-wrap gap-2">
          {formData.skills.map((skill, index) => (
            <Badge key={index} variant="secondary" className="flex items-center gap-2">
              {skill}
              <button
                onClick={() => removeSkill(skill)}
                className="text-gray-500 hover:text-red-500"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );

  const PreviewJob = () => (
    <div className="bg-white rounded-lg border p-6">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">{formData.title || "Tiêu đề công việc"}</h1>
            <p className="text-lg text-gray-700 flex items-center">
              <Building2 className="h-4 w-4 mr-2" />
              {formData.company}
            </p>
          </div>
          <div className="flex gap-2">
            {formData.urgent && (
              <Badge variant="destructive">URGENT</Badge>
            )}
          </div>
        </div>

        {/* Details */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="flex items-center text-sm text-gray-600">
            <MapPin className="h-4 w-4 mr-2 text-gray-400" />
            {formData.location || "Chưa chọn địa điểm"}
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <DollarSign className="h-4 w-4 mr-2 text-gray-400" />
            {formData.salary.min && formData.salary.max 
              ? `${formData.salary.min}-${formData.salary.max} ${formData.salary.currency}`
              : "Thỏa thuận"
            }
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <Clock className="h-4 w-4 mr-2 text-gray-400" />
            {formData.jobType || "Toàn thời gian"}
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <Briefcase className="h-4 w-4 mr-2 text-gray-400" />
            {formData.experience || "Tất cả cấp độ"}
          </div>
        </div>

        {/* Skills */}
        {formData.skills.length > 0 && (
          <div>
            <h3 className="font-medium text-gray-900 mb-2">Kỹ năng yêu cầu:</h3>
            <div className="flex flex-wrap gap-2">
              {formData.skills.map((skill, index) => (
                <Badge key={index} variant="secondary">{skill}</Badge>
              ))}
            </div>
          </div>
        )}

        {/* Description */}
        {formData.description && (
          <div>
            <h3 className="font-medium text-gray-900 mb-2">Mô tả công việc:</h3>
            <div className="text-gray-700 whitespace-pre-line">{formData.description}</div>
          </div>
        )}

        {/* Requirements */}
        {formData.requirements && (
          <div>
            <h3 className="font-medium text-gray-900 mb-2">Yêu cầu:</h3>
            <div className="text-gray-700 whitespace-pre-line">{formData.requirements}</div>
          </div>
        )}

        {/* Benefits */}
        {formData.benefits && (
          <div>
            <h3 className="font-medium text-gray-900 mb-2">Quyền lợi:</h3>
            <div className="text-gray-700 whitespace-pre-line">{formData.benefits}</div>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Đăng tin tuyển dụng</h1>
          <p className="text-gray-600">Tìm kiếm những ứng viên tài năng cho công ty của bạn</p>
        </div>

        {/* Steps */}
        <div className="flex items-center justify-center space-x-4 mb-8">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
            currentStep >= 1 ? "bg-orange-primary text-white" : "bg-gray-200 text-gray-500"
          }`}>1</div>
          <div className={`h-1 w-16 ${currentStep > 1 ? "bg-orange-primary" : "bg-gray-200"}`}></div>
          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
            currentStep >= 2 ? "bg-orange-primary text-white" : "bg-gray-200 text-gray-500"
          }`}>2</div>
          <div className={`h-1 w-16 ${isPreview ? "bg-orange-primary" : "bg-gray-200"}`}></div>
          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
            isPreview ? "bg-orange-primary text-white" : "bg-gray-200 text-gray-500"
          }`}>
            <Eye className="h-4 w-4" />
          </div>
        </div>

        {!isPreview ? (
          <Card>
            <CardHeader>
              <CardTitle>
                {currentStep === 1 ? "Thông tin cơ bản" : "Chi tiết công việc"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {currentStep === 1 ? <BasicInfoStep /> : <DetailsStep />}
              
              <div className="flex justify-between pt-6 mt-6 border-t">
                {currentStep > 1 && (
                  <Button 
                    variant="outline"
                    onClick={() => setCurrentStep(currentStep - 1)}
                  >
                    Quay lại
                  </Button>
                )}
                
                <div className="flex gap-3 ml-auto">
                  <Button variant="outline">
                    <Save className="h-4 w-4 mr-2" />
                    Lưu nháp
                  </Button>
                  
                  {currentStep < 2 ? (
                    <Button 
                      onClick={() => setCurrentStep(currentStep + 1)}
                      className="bg-orange-primary hover:bg-orange-600"
                    >
                      Tiếp tục
                    </Button>
                  ) : (
                    <Button 
                      onClick={() => setIsPreview(true)}
                      className="bg-orange-primary hover:bg-orange-600"
                    >
                      <Eye className="h-4 w-4 mr-2" />
                      Xem trước
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Eye className="h-5 w-5 mr-2" />
                  Xem trước tin đăng
                </CardTitle>
              </CardHeader>
              <CardContent>
                <PreviewJob />
              </CardContent>
            </Card>

            <div className="flex justify-between">
              <Button 
                variant="outline"
                onClick={() => setIsPreview(false)}
              >
                Chỉnh sửa
              </Button>
              
              <div className="flex gap-3">
                <Button variant="outline">
                  <Save className="h-4 w-4 mr-2" />
                  Lưu nháp
                </Button>
                <Button 
                  onClick={handleSubmit}
                  className="bg-orange-primary hover:bg-orange-600"
                >
                  <Send className="h-4 w-4 mr-2" />
                  Đăng tin
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}