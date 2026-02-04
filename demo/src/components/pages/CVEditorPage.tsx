"use client";
import React, { useState } from "react";
import {
  ArrowLeft,
  Save,
  Download,
  Share2,
  Eye,
  Upload,
  User,
  Briefcase,
  GraduationCap,
  Code,
  Phone,
  Mail,
  MapPin,
  Globe,
  Linkedin,
  Plus,
  Edit3,
  Trash2,
  Calendar,
  Star,
  CheckCircle,
  Layout
} from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Label } from "../ui/label";
import { Badge } from "../ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Slider } from "../ui/slider";
import BreadcrumbTabActive from "../ui/common/breadcrumb/BreadcrumbTabActive";
import { toast } from "sonner";

interface CVEditorPageProps {
  navigate: (page: string, id?: string) => void;
  templateId?: string;
}

interface Experience {
  id: string;
  position: string;
  company: string;
  duration: string;
  location: string;
  description: string;
}

interface Education {
  id: string;
  degree: string;
  school: string;
  duration: string;
  gpa: string;
}

interface Skill {
  id: string;
  name: string;
  level: number;
}

interface CVData {
  personal: {
    fullName: string;
    email: string;
    phone: string;
    address: string;
    website: string;
    linkedin: string;
    github: string;
    avatar: string;
  };
  summary: string;
  experiences: Experience[];
  education: Education[];
  skills: Skill[];
}

export default function CVEditorPage({
  navigate,
  templateId,
}: CVEditorPageProps) {
  const [activeTab, setActiveTab] = useState("personal");
  const [cvData, setCvData] = useState<CVData>({
    personal: {
      fullName: "Hoàng Tuấn Phong",
      email: "tuanphong@email.com",
      phone: "+84 123 456 789",
      address: "Hà Nội, Việt Nam",
      website: "https://tuanphong.dev",
      linkedin: "https://linkedin.com/in/tuanphong",
      github: "",
      avatar: "",
    },
    summary:
      "Software Tester với 2+ năm kinh nghiệm trong việc đảm bảo chất lượng phần mềm. Có kinh nghiệm chuyên sâu trong testing automation, performance testing và API testing.",
    experiences: [
      {
        id: "exp1",
        position: "Software Tester",
        company: "Tech Company ABC",
        duration: "01/2022 - Hiện tại",
        location: "Hà Nội",
        description:
          "Thực hiện testing cho các dự án web và mobile application. Thiết kế và thực thi test cases, báo cáo bugs và làm việc với development team để đảm bảo chất lượng sản phẩm.",
      },
    ],
    education: [
      {
        id: "edu1",
        degree: "Cử nhân Công nghệ thông tin",
        school: "Đại học Bách Khoa Hà Nội",
        duration: "2018 - 2022",
        gpa: "3.5/4.0",
      },
    ],
    skills: [
      { id: "skill1", name: "Manual Testing", level: 90 },
      { id: "skill2", name: "Automation Testing", level: 80 },
      { id: "skill3", name: "API Testing", level: 85 },
      { id: "skill4", name: "Performance Testing", level: 75 },
    ],
  });

  const [designSettings, setDesignSettings] = useState({
    template: templateId || "modern-1",
    fontFamily: "Inter",
    fontSize: 14,
    primaryColor: "#f26b38",
    secondaryColor: "#2563eb",
    layout: "two-column",
  });

  // Template info
  const templateInfo = {
    name: "Modern Professional",
    description:
      "Thiết kế hiện đại, chuyên nghiệp phù hợp với các vị trí corporate",
    rating: 4.8,
    downloads: 1250,
  };

  // Helper functions
  const updatePersonalInfo = (field: string, value: string) => {
    setCvData((prev) => ({
      ...prev,
      personal: {
        ...prev.personal,
        [field]: value,
      },
    }));
  };

  const updateSummary = (value: string) => {
    setCvData((prev) => ({
      ...prev,
      summary: value,
    }));
  };

  const addExperience = () => {
    const newExperience: Experience = {
      id: `exp${Date.now()}`,
      position: "",
      company: "",
      duration: "",
      location: "",
      description: "",
    };
    setCvData((prev) => ({
      ...prev,
      experiences: [...prev.experiences, newExperience],
    }));
  };

  const updateExperience = (id: string, field: string, value: string) => {
    setCvData((prev) => ({
      ...prev,
      experiences: prev.experiences.map((exp) =>
        exp.id === id ? { ...exp, [field]: value } : exp
      ),
    }));
  };

  const deleteExperience = (id: string) => {
    setCvData((prev) => ({
      ...prev,
      experiences: prev.experiences.filter((exp) => exp.id !== id),
    }));
  };

  const addEducation = () => {
    const newEducation: Education = {
      id: `edu${Date.now()}`,
      degree: "",
      school: "",
      duration: "",
      gpa: "",
    };
    setCvData((prev) => ({
      ...prev,
      education: [...prev.education, newEducation],
    }));
  };

  const updateEducation = (id: string, field: string, value: string) => {
    setCvData((prev) => ({
      ...prev,
      education: prev.education.map((edu) =>
        edu.id === id ? { ...edu, [field]: value } : edu
      ),
    }));
  };

  const deleteEducation = (id: string) => {
    setCvData((prev) => ({
      ...prev,
      education: prev.education.filter((edu) => edu.id !== id),
    }));
  };

  const addSkill = () => {
    const newSkill: Skill = {
      id: `skill${Date.now()}`,
      name: "",
      level: 50,
    };
    setCvData((prev) => ({
      ...prev,
      skills: [...prev.skills, newSkill],
    }));
  };

  const updateSkill = (id: string, field: string, value: string | number) => {
    setCvData((prev) => ({
      ...prev,
      skills: prev.skills.map((skill) =>
        skill.id === id ? { ...skill, [field]: value } : skill
      ),
    }));
  };

  const deleteSkill = (id: string) => {
    setCvData((prev) => ({
      ...prev,
      skills: prev.skills.filter((skill) => skill.id !== id),
    }));
  };

  const saveCV = () => {
    toast.success("CV đã được lưu thành công!");
  };

  const exportCV = () => {
    toast.success("CV đã được xuất thành PDF!");
  };

  const shareCV = () => {
    toast.success("Link chia sẻ đã được sao chép!");
  };

  const handleChangeTemplate = () => {
    navigate?.("cv-template");
  };

  // Progress calculation
  const calculateProgress = () => {
    let progress = 0;
    
    // Personal info (30%)
    const personalFields = Object.values(cvData.personal).filter(
      (val) => val.trim() !== ""
    );
    progress += (personalFields.length / 8) * 30;
    
    // Summary (20%)
    if (cvData.summary.trim()) progress += 20;
    
    // Experience (25%)
    if (cvData.experiences.length > 0 && cvData.experiences[0].position)
      progress += 25;
    
    // Education (15%)
    if (cvData.education.length > 0 && cvData.education[0].degree)
      progress += 15;
    
    // Skills (10%)
    if (cvData.skills.length > 0 && cvData.skills[0].name) progress += 10;
    
    return Math.round(progress);
  };

  const progress = calculateProgress();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <div className="mb-8">
          <BreadcrumbTabActive
            items={[
              { name: "Trang chủ", onClick: () => navigate?.("home") },
              { name: "Mẫu CV", onClick: () => navigate?.("cv-template") },
              { name: "Chỉnh sửa CV" },
            ]}
          />
        </div>

        {/* Back Button */}
        <div className="flex items-center mb-6">
          <button
            onClick={() => navigate?.("cv-template")}
            className="flex items-center text-gray-600 hover:text-[#f26b38] transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Quay lại mẫu CV
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content - CV Preview */}
          <div className="lg:col-span-2 space-y-6">
            {/* CV Header Card */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-start gap-4 flex-1">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
                      <Edit3 className="h-8 w-8 text-gray-400" />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2 flex-wrap">
                      <h1 className="text-2xl font-bold text-gray-900">
                        Chỉnh sửa CV
                      </h1>
                      <Badge className="bg-[#f26b38] text-white">
                        {templateInfo.name}
                      </Badge>
                    </div>
                    <p className="text-gray-700 mb-2">
                      {templateInfo.description}
                    </p>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <span className="flex items-center">
                        <Star className="h-4 w-4 mr-1 fill-[#f26b38] text-[#f26b38]" />
                        {templateInfo.rating}
                      </span>
                      <span className="flex items-center">
                        <Download className="h-4 w-4 mr-1" />
                        {templateInfo.downloads} lượt tải
                      </span>
                      <span className="flex items-center">
                        <CheckCircle className="h-4 w-4 mr-1 text-green-500" />
                        {progress}% hoàn thành
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <button
                    onClick={shareCV}
                    className="p-2 rounded-lg border border-gray-300 text-gray-400 hover:text-[#f26b38] hover:border-[#f26b38] transition-colors"
                  >
                    <Share2 className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => {}}
                    className="p-2 rounded-lg border border-gray-300 text-gray-400 hover:text-[#f26b38] hover:border-[#f26b38] transition-colors"
                  >
                    <Eye className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600">
                    Tiến độ hoàn thành CV
                  </span>
                  <span className="text-sm font-medium text-[#f26b38]">
                    {progress}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-[#f26b38] h-2 rounded-full transition-all duration-300"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <Button onClick={saveCV} className="flex-1 sm:flex-none">
                  <Save className="h-4 w-4 mr-2" />
                  Lưu CV
                </Button>
                <Button
                  onClick={exportCV}
                  variant="outline"
                  className="flex-1 sm:flex-none"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Tải PDF
                </Button>
              </div>
            </div>

            {/* CV Preview */}
            <div className="bg-white rounded-lg shadow-sm border p-8">
              <div
                className="max-w-[210mm] mx-auto bg-white shadow-lg min-h-[297mm] p-8"
                style={{
                  fontFamily: designSettings.fontFamily,
                  fontSize: `${designSettings.fontSize}px`,
                }}
              >
                {/* Header */}
                <div className="mb-8">
                  <div className="flex items-start gap-6">
                    <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center flex-shrink-0">
                      <User className="h-10 w-10 text-gray-400" />
                    </div>
                    <div className="flex-1">
                      <h1 className="text-3xl font-bold text-gray-900 mb-2">
                        {cvData.personal.fullName}
                      </h1>
                      <h2 className="text-lg text-[#f26b38] mb-4">
                        Software Tester
                      </h2>
                      <div className="grid grid-cols-2 gap-x-8 gap-y-2 text-sm text-gray-600">
                        <div className="flex items-center gap-2">
                          <Mail className="h-4 w-4" />
                          {cvData.personal.email}
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4" />
                          {cvData.personal.address}
                        </div>
                        <div className="flex items-center gap-2">
                          <Phone className="h-4 w-4" />
                          {cvData.personal.phone}
                        </div>
                        {cvData.personal.website && (
                          <div className="flex items-center gap-2">
                            <Globe className="h-4 w-4" />
                            Website
                          </div>
                        )}
                        {cvData.personal.linkedin && (
                          <div className="flex items-center gap-2">
                            <Linkedin className="h-4 w-4" />
                            LinkedIn
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Summary */}
                {cvData.summary && (
                  <div className="mb-8">
                    <h3 className="text-lg font-semibold text-[#f26b38] mb-3 border-b border-gray-200 pb-2">
                      MỤC TIÊU NGHỀ NGHIỆP
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      {cvData.summary}
                    </p>
                  </div>
                )}

                {/* Experience */}
                {cvData.experiences.length > 0 && (
                  <div className="mb-8">
                    <h3 className="text-lg font-semibold text-[#f26b38] mb-3 border-b border-gray-200 pb-2">
                      KINH NGHIỆM LÀM VIỆC
                    </h3>
                    <div className="space-y-6">
                      {cvData.experiences.map((exp) => (
                        <div key={exp.id}>
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <h4 className="font-semibold text-gray-900">
                                {exp.position}
                              </h4>
                              <p className="text-[#f26b38] font-medium">
                                {exp.company}
                              </p>
                            </div>
                            <div className="text-right text-sm text-gray-600">
                              <div className="flex items-center gap-1">
                                <Calendar className="h-3 w-3" />
                                {exp.duration}
                              </div>
                              {exp.location && (
                                <div className="flex items-center gap-1 mt-1">
                                  <MapPin className="h-3 w-3" />
                                  {exp.location}
                                </div>
                              )}
                            </div>
                          </div>
                          {exp.description && (
                            <p className="text-gray-700 text-sm leading-relaxed">
                              {exp.description}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Education */}
                {cvData.education.length > 0 && (
                  <div className="mb-8">
                    <h3 className="text-lg font-semibold text-[#f26b38] mb-3 border-b border-gray-200 pb-2">
                      HỌC VẤN
                    </h3>
                    <div className="space-y-4">
                      {cvData.education.map((edu) => (
                        <div key={edu.id}>
                          <div className="flex justify-between items-start">
                            <div>
                              <h4 className="font-semibold text-gray-900">
                                {edu.degree}
                              </h4>
                              <p className="text-[#f26b38] font-medium">
                                {edu.school}
                              </p>
                            </div>
                            <div className="text-right text-sm text-gray-600">
                              <div className="flex items-center gap-1">
                                <Calendar className="h-3 w-3" />
                                {edu.duration}
                              </div>
                              {edu.gpa && (
                                <div className="mt-1">GPA: {edu.gpa}</div>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Skills */}
                {cvData.skills.length > 0 && (
                  <div className="mb-8">
                    <h3 className="text-lg font-semibold text-[#f26b38] mb-3 border-b border-gray-200 pb-2">
                      KỸ NĂNG
                    </h3>
                    <div className="space-y-3">
                      {cvData.skills.map((skill) => (
                        <div key={skill.id}>
                          <div className="flex justify-between items-center mb-1">
                            <span className="font-medium text-gray-900">
                              {skill.name}
                            </span>
                            <span className="text-sm text-gray-600">
                              {skill.level}%
                            </span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-[#f26b38] h-2 rounded-full"
                              style={{ width: `${skill.level}%` }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar - Editor Tools */}
          <div className="space-y-6">
            {/* Editor Tabs */}
            <div className="bg-white rounded-lg shadow-sm border sticky top-8">
              <div className="p-6 border-b border-gray-200">
                <h3 className="font-semibold text-gray-900">
                  Chỉnh sửa thông tin
                </h3>
                <p className="text-sm text-gray-600 mt-1">
                  Điền thông tin để tạo CV hoàn hảo
                </p>
              </div>

              <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full">
                <TabsList className="grid w-full grid-cols-2 p-1 m-6 mb-0">
                  <TabsTrigger value="personal" className="text-sm flex items-center gap-2">
                    <User className="h-4 w-4" />
                    Cá nhân
                  </TabsTrigger>
                  <TabsTrigger value="content" className="text-sm flex items-center gap-2">
                    <Edit3 className="h-4 w-4" />
                    Nội dung
                  </TabsTrigger>
                </TabsList>

                <div className="p-6 max-h-[calc(100vh-300px)] overflow-y-auto custom-scrollbar">
                  <TabsContent value="personal" className="mt-0">
                    <div className="space-y-4">
                      <div className="text-center mb-6">
                        <div className="w-20 h-20 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                          <User className="h-10 w-10 text-gray-400" />
                        </div>
                        <Button variant="outline" size="sm">
                          <Upload className="h-4 w-4 mr-2" />
                          Tải ảnh
                        </Button>
                      </div>

                      <div>
                        <Label className="text-sm font-medium">
                          Họ và tên *
                        </Label>
                        <Input
                          value={cvData.personal.fullName}
                          onChange={(e) =>
                            updatePersonalInfo("fullName", e.target.value)
                          }
                          className="mt-1"
                          placeholder="Nhập họ và tên"
                        />
                      </div>

                      <div>
                        <Label className="text-sm font-medium">Email *</Label>
                        <Input
                          type="email"
                          value={cvData.personal.email}
                          onChange={(e) =>
                            updatePersonalInfo("email", e.target.value)
                          }
                          className="mt-1"
                          placeholder="example@email.com"
                        />
                      </div>

                      <div>
                        <Label className="text-sm font-medium">
                          Số điện thoại *
                        </Label>
                        <Input
                          value={cvData.personal.phone}
                          onChange={(e) =>
                            updatePersonalInfo("phone", e.target.value)
                          }
                          className="mt-1"
                          placeholder="+84 123 456 789"
                        />
                      </div>

                      <div>
                        <Label className="text-sm font-medium">Địa chỉ</Label>
                        <Input
                          value={cvData.personal.address}
                          onChange={(e) =>
                            updatePersonalInfo("address", e.target.value)
                          }
                          className="mt-1"
                          placeholder="Hà Nội, Việt Nam"
                        />
                      </div>

                      <div>
                        <Label className="text-sm font-medium">Website</Label>
                        <Input
                          value={cvData.personal.website}
                          onChange={(e) =>
                            updatePersonalInfo("website", e.target.value)
                          }
                          className="mt-1"
                          placeholder="https://website.com"
                        />
                      </div>

                      <div>
                        <Label className="text-sm font-medium">
                          LinkedIn
                        </Label>
                        <Input
                          value={cvData.personal.linkedin}
                          onChange={(e) =>
                            updatePersonalInfo("linkedin", e.target.value)
                          }
                          className="mt-1"
                          placeholder="linkedin.com/in/username"
                        />
                      </div>

                      <div>
                        <Label className="text-sm font-medium">
                          Mục tiêu nghề nghiệp
                        </Label>
                        <Textarea
                          value={cvData.summary}
                          onChange={(e) => updateSummary(e.target.value)}
                          placeholder="Mô tả mục tiêu và định hướng nghề nghiệp của bạn..."
                          className="min-h-[80px] mt-1"
                        />
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="content" className="mt-0">
                    <div className="space-y-6">
                      {/* Experience Section */}
                      <div>
                        <div className="flex items-center justify-between mb-4">
                          <h4 className="flex items-center gap-2 font-medium">
                            <Briefcase className="h-4 w-4 text-[#f26b38]" />
                            Kinh nghiệm làm việc
                          </h4>
                          <Button
                            onClick={addExperience}
                            size="sm"
                            variant="outline"
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>

                        {cvData.experiences.map((exp, index) => (
                          <div
                            key={exp.id}
                            className="border rounded-lg p-4 mb-4 space-y-3"
                          >
                            <div className="flex items-center justify-between">
                              <span className="text-sm font-medium text-gray-700">
                                Kinh nghiệm {index + 1}
                              </span>
                              <Button
                                onClick={() => deleteExperience(exp.id)}
                                size="sm"
                                variant="ghost"
                                className="text-red-500 hover:text-red-700"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>

                            <div className="space-y-3">
                              <Input
                                value={exp.position}
                                onChange={(e) =>
                                  updateExperience(
                                    exp.id,
                                    "position",
                                    e.target.value
                                  )
                                }
                                placeholder="Vị trí công việc"
                              />
                              <Input
                                value={exp.company}
                                onChange={(e) =>
                                  updateExperience(
                                    exp.id,
                                    "company",
                                    e.target.value
                                  )
                                }
                                placeholder="Tên công ty"
                              />
                              <div className="grid grid-cols-2 gap-2">
                                <Input
                                  value={exp.duration}
                                  onChange={(e) =>
                                    updateExperience(
                                      exp.id,
                                      "duration",
                                      e.target.value
                                    )
                                  }
                                  placeholder="01/2022 - Hiện tại"
                                />
                                <Input
                                  value={exp.location}
                                  onChange={(e) =>
                                    updateExperience(
                                      exp.id,
                                      "location",
                                      e.target.value
                                    )
                                  }
                                  placeholder="Hà Nội"
                                />
                              </div>
                              <Textarea
                                value={exp.description}
                                onChange={(e) =>
                                  updateExperience(
                                    exp.id,
                                    "description",
                                    e.target.value
                                  )
                                }
                                placeholder="Mô tả công việc và thành tích..."
                                rows={3}
                              />
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Education Section */}
                      <div>
                        <div className="flex items-center justify-between mb-4">
                          <h4 className="flex items-center gap-2 font-medium">
                            <GraduationCap className="h-4 w-4 text-[#f26b38]" />
                            Học vấn
                          </h4>
                          <Button
                            onClick={addEducation}
                            size="sm"
                            variant="outline"
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>

                        {cvData.education.map((edu, index) => (
                          <div
                            key={edu.id}
                            className="border rounded-lg p-4 mb-4 space-y-3"
                          >
                            <div className="flex items-center justify-between">
                              <span className="text-sm font-medium text-gray-700">
                                Học vấn {index + 1}
                              </span>
                              <Button
                                onClick={() => deleteEducation(edu.id)}
                                size="sm"
                                variant="ghost"
                                className="text-red-500 hover:text-red-700"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>

                            <div className="space-y-3">
                              <Input
                                value={edu.degree}
                                onChange={(e) =>
                                  updateEducation(
                                    edu.id,
                                    "degree",
                                    e.target.value
                                  )
                                }
                                placeholder="Bằng cấp (Cử nhân, Thạc sĩ...)"
                              />
                              <Input
                                value={edu.school}
                                onChange={(e) =>
                                  updateEducation(
                                    edu.id,
                                    "school",
                                    e.target.value
                                  )
                                }
                                placeholder="Tên trường"
                              />
                              <div className="grid grid-cols-2 gap-2">
                                <Input
                                  value={edu.duration}
                                  onChange={(e) =>
                                    updateEducation(
                                      edu.id,
                                      "duration",
                                      e.target.value
                                    )
                                  }
                                  placeholder="2018 - 2022"
                                />
                                <Input
                                  value={edu.gpa}
                                  onChange={(e) =>
                                    updateEducation(
                                      edu.id,
                                      "gpa",
                                      e.target.value
                                    )
                                  }
                                  placeholder="3.5/4.0"
                                />
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Skills Section */}
                      <div>
                        <div className="flex items-center justify-between mb-4">
                          <h4 className="flex items-center gap-2 font-medium">
                            <Code className="h-4 w-4 text-[#f26b38]" />
                            Kỹ năng
                          </h4>
                          <Button
                            onClick={addSkill}
                            size="sm"
                            variant="outline"
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>

                        {cvData.skills.map((skill, index) => (
                          <div
                            key={skill.id}
                            className="border rounded-lg p-4 mb-4 space-y-3"
                          >
                            <div className="flex items-center justify-between">
                              <span className="text-sm font-medium text-gray-700">
                                Kỹ năng {index + 1}
                              </span>
                              <Button
                                onClick={() => deleteSkill(skill.id)}
                                size="sm"
                                variant="ghost"
                                className="text-red-500 hover:text-red-700"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>

                            <div className="space-y-3">
                              <Input
                                value={skill.name}
                                onChange={(e) =>
                                  updateSkill(
                                    skill.id,
                                    "name",
                                    e.target.value
                                  )
                                }
                                placeholder="Tên kỹ năng"
                              />
                              <div>
                                <div className="flex justify-between items-center mb-2">
                                  <Label className="text-sm">Trình độ</Label>
                                  <span className="text-sm text-gray-600">
                                    {skill.level}%
                                  </span>
                                </div>
                                <Slider
                                  value={[skill.level]}
                                  onValueChange={(value) =>
                                    updateSkill(skill.id, "level", value[0])
                                  }
                                  max={100}
                                  step={5}
                                />
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </TabsContent>
                </div>
              </Tabs>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h3 className="font-semibold text-gray-900 mb-4">
                Thao tác nhanh
              </h3>
              <div className="space-y-3">
                <Button
                  onClick={handleChangeTemplate}
                  variant="outline"
                  className="w-full justify-start"
                >
                  <Layout className="h-4 w-4 mr-2" />
                  Đổi mẫu CV khác
                </Button>
                <Button
                  onClick={shareCV}
                  variant="outline"
                  className="w-full justify-start"
                >
                  <Share2 className="h-4 w-4 mr-2" />
                  Chia sẻ CV
                </Button>
                <Button
                  onClick={exportCV}
                  variant="outline"
                  className="w-full justify-start"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Tải xuống PDF
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}