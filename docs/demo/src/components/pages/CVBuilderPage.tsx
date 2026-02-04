import React, { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { Separator } from "../ui/separator";
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Plus, 
  Trash2, 
  Download, 
  Eye,
  Save,
  Upload,
  Calendar,
  Building2,
  GraduationCap,
  Award,
  Code,
  Languages,
  Star
} from "lucide-react";

interface CVBuilderPageProps {
  navigate: (page: string, id?: string) => void;
}

export default function CVBuilderPage({ navigate }: CVBuilderPageProps) {
  const [activeSection, setActiveSection] = useState("personal");
  const [cvData, setCvData] = useState({
    personal: {
      fullName: "",
      email: "",
      phone: "",
      address: "",
      linkedin: "",
      website: "",
      summary: ""
    },
    experience: [
      {
        id: 1,
        title: "",
        company: "",
        location: "",
        startDate: "",
        endDate: "",
        current: false,
        description: ""
      }
    ],
    education: [
      {
        id: 1,
        degree: "",
        school: "",
        location: "",
        startDate: "",
        endDate: "",
        current: false,
        gpa: ""
      }
    ],
    skills: [],
    languages: [
      {
        id: 1,
        language: "",
        level: ""
      }
    ],
    certifications: [
      {
        id: 1,
        name: "",
        issuer: "",
        date: "",
        url: ""
      }
    ]
  });

  const sections = [
    { id: "personal", label: "Thông tin cá nhân", icon: User },
    { id: "experience", label: "Kinh nghiệm", icon: Building2 },
    { id: "education", label: "Học vấn", icon: GraduationCap },
    { id: "skills", label: "Kỹ năng", icon: Code },
    { id: "languages", label: "Ngôn ngữ", icon: Languages },
    { id: "certifications", label: "Chứng chỉ", icon: Award }
  ];

  const updatePersonalInfo = (field: string, value: string) => {
    setCvData(prev => ({
      ...prev,
      personal: {
        ...prev.personal,
        [field]: value
      }
    }));
  };

  const addExperience = () => {
    setCvData(prev => ({
      ...prev,
      experience: [
        ...prev.experience,
        {
          id: Date.now(),
          title: "",
          company: "",
          location: "",
          startDate: "",
          endDate: "",
          current: false,
          description: ""
        }
      ]
    }));
  };

  const removeExperience = (id: number) => {
    setCvData(prev => ({
      ...prev,
      experience: prev.experience.filter(exp => exp.id !== id)
    }));
  };

  const updateExperience = (id: number, field: string, value: any) => {
    setCvData(prev => ({
      ...prev,
      experience: prev.experience.map(exp => 
        exp.id === id ? { ...exp, [field]: value } : exp
      )
    }));
  };

  const addSkill = (skill: string) => {
    if (skill.trim() && !cvData.skills.includes(skill.trim())) {
      setCvData(prev => ({
        ...prev,
        skills: [...prev.skills, skill.trim()]
      }));
    }
  };

  const removeSkill = (skill: string) => {
    setCvData(prev => ({
      ...prev,
      skills: prev.skills.filter(s => s !== skill)
    }));
  };

  const PersonalSection = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-2">Họ và tên *</label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Nguyễn Văn A"
              value={cvData.personal.fullName}
              onChange={(e) => updatePersonalInfo("fullName", e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Email *</label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              type="email"
              placeholder="email@example.com"
              value={cvData.personal.email}
              onChange={(e) => updatePersonalInfo("email", e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Số điện thoại *</label>
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="0901234567"
              value={cvData.personal.phone}
              onChange={(e) => updatePersonalInfo("phone", e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Địa chỉ</label>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="TP. Hồ Chí Minh"
              value={cvData.personal.address}
              onChange={(e) => updatePersonalInfo("address", e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
      </div>
      
      <div>
        <label className="block text-sm font-medium mb-2">Mục tiêu nghề nghiệp</label>
        <Textarea
          placeholder="Mô tả ngắn gọn về mục tiêu nghề nghiệp của bạn..."
          value={cvData.personal.summary}
          onChange={(e) => updatePersonalInfo("summary", e.target.value)}
          rows={4}
        />
      </div>
    </div>
  );

  const ExperienceSection = () => (
    <div className="space-y-6">
      {cvData.experience.map((exp, index) => (
        <Card key={exp.id} className="border-2 border-gray-200">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Kinh nghiệm {index + 1}</CardTitle>
              {cvData.experience.length > 1 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeExperience(exp.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              )}
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Chức danh *</label>
                <Input
                  placeholder="Senior Frontend Developer"
                  value={exp.title}
                  onChange={(e) => updateExperience(exp.id, "title", e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Công ty *</label>
                <Input
                  placeholder="TechCorp Vietnam"
                  value={exp.company}
                  onChange={(e) => updateExperience(exp.id, "company", e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Ngày bắt đầu *</label>
                <Input
                  type="month"
                  value={exp.startDate}
                  onChange={(e) => updateExperience(exp.id, "startDate", e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Ngày kết thúc</label>
                <div className="space-y-2">
                  <Input
                    type="month"
                    value={exp.endDate}
                    onChange={(e) => updateExperience(exp.id, "endDate", e.target.value)}
                    disabled={exp.current}
                  />
                  <label className="flex items-center space-x-2 text-sm">
                    <input
                      type="checkbox"
                      checked={exp.current}
                      onChange={(e) => updateExperience(exp.id, "current", e.target.checked)}
                      className="rounded"
                    />
                    <span>Hiện tại</span>
                  </label>
                </div>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Mô tả công việc</label>
              <Textarea
                placeholder="Mô tả chi tiết về công việc, trách nhiệm và thành tích..."
                value={exp.description}
                onChange={(e) => updateExperience(exp.id, "description", e.target.value)}
                rows={4}
              />
            </div>
          </CardContent>
        </Card>
      ))}
      
      <Button onClick={addExperience} variant="outline" className="w-full">
        <Plus className="h-4 w-4 mr-2" />
        Thêm kinh nghiệm
      </Button>
    </div>
  );

  const SkillsSection = () => {
    const [newSkill, setNewSkill] = useState("");

    return (
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-2">Thêm kỹ năng</label>
          <div className="flex gap-2">
            <Input
              placeholder="Nhập kỹ năng (VD: React, TypeScript, Node.js)"
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  addSkill(newSkill);
                  setNewSkill("");
                }
              }}
            />
            <Button 
              onClick={() => {
                addSkill(newSkill);
                setNewSkill("");
              }}
              className="bg-orange-primary hover:bg-orange-600"
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-4">Kỹ năng của bạn</label>
          <div className="flex flex-wrap gap-2">
            {cvData.skills.map((skill, index) => (
              <Badge 
                key={index} 
                variant="secondary" 
                className="flex items-center gap-2 px-3 py-1"
              >
                {skill}
                <button
                  onClick={() => removeSkill(skill)}
                  className="text-gray-500 hover:text-red-500"
                >
                  <Trash2 className="h-3 w-3" />
                </button>
              </Badge>
            ))}
          </div>
          {cvData.skills.length === 0 && (
            <p className="text-gray-500 text-sm">Chưa có kỹ năng nào. Hãy thêm kỹ năng của bạn.</p>
          )}
        </div>
      </div>
    );
  };

  const CVPreview = () => (
    <div className="bg-white p-8 rounded-lg shadow-lg">
      <div className="space-y-6">
        {/* Header */}
        <div className="text-center border-b pb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {cvData.personal.fullName || "Họ và Tên"}
          </h1>
          <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600">
            {cvData.personal.email && (
              <span className="flex items-center">
                <Mail className="h-4 w-4 mr-1" />
                {cvData.personal.email}
              </span>
            )}
            {cvData.personal.phone && (
              <span className="flex items-center">
                <Phone className="h-4 w-4 mr-1" />
                {cvData.personal.phone}
              </span>
            )}
            {cvData.personal.address && (
              <span className="flex items-center">
                <MapPin className="h-4 w-4 mr-1" />
                {cvData.personal.address}
              </span>
            )}
          </div>
        </div>

        {/* Summary */}
        {cvData.personal.summary && (
          <div>
            <h2 className="text-lg font-bold text-gray-900 mb-2">Mục tiêu nghề nghiệp</h2>
            <p className="text-gray-700 leading-relaxed">{cvData.personal.summary}</p>
          </div>
        )}

        {/* Experience */}
        {cvData.experience.some(exp => exp.title) && (
          <div>
            <h2 className="text-lg font-bold text-gray-900 mb-4">Kinh nghiệm làm việc</h2>
            <div className="space-y-4">
              {cvData.experience.filter(exp => exp.title).map((exp) => (
                <div key={exp.id} className="border-l-2 border-orange-primary pl-4">
                  <h3 className="font-semibold text-gray-900">{exp.title}</h3>
                  <p className="text-orange-primary font-medium">{exp.company}</p>
                  <p className="text-sm text-gray-600 mb-2">
                    {exp.startDate} - {exp.current ? "Hiện tại" : exp.endDate}
                  </p>
                  {exp.description && (
                    <p className="text-gray-700 text-sm leading-relaxed">{exp.description}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Skills */}
        {cvData.skills.length > 0 && (
          <div>
            <h2 className="text-lg font-bold text-gray-900 mb-3">Kỹ năng</h2>
            <div className="flex flex-wrap gap-2">
              {cvData.skills.map((skill, index) => (
                <Badge key={index} className="bg-orange-primary text-white">
                  {skill}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );

  const renderSection = () => {
    switch (activeSection) {
      case "personal":
        return <PersonalSection />;
      case "experience":
        return <ExperienceSection />;
      case "skills":
        return <SkillsSection />;
      default:
        return <PersonalSection />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Tạo CV của bạn</h1>
          <p className="text-gray-600">Tạo CV chuyên nghiệp để ấn tượng với nhà tuyển dụng</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-6">
              <CardHeader>
                <CardTitle>Sections</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {sections.map((section) => {
                  const Icon = section.icon;
                  return (
                    <button
                      key={section.id}
                      onClick={() => setActiveSection(section.id)}
                      className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                        activeSection === section.id
                          ? "bg-orange-primary text-white"
                          : "text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      <Icon className="h-5 w-5" />
                      <span>{section.label}</span>
                    </button>
                  );
                })}
                
                <Separator className="my-4" />
                
                <div className="space-y-2">
                  <Button variant="outline" className="w-full justify-start">
                    <Save className="h-4 w-4 mr-2" />
                    Lưu CV
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Download className="h-4 w-4 mr-2" />
                    Tải xuống PDF
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Upload className="h-4 w-4 mr-2" />
                    Tải lên CV
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Form Section */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  {sections.find(s => s.id === activeSection) && (
                    <>
                      {React.createElement(sections.find(s => s.id === activeSection)!.icon, { className: "h-5 w-5" })}
                      <span>{sections.find(s => s.id === activeSection)!.label}</span>
                    </>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {renderSection()}
              </CardContent>
            </Card>

            {/* Preview */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Eye className="h-5 w-5" />
                  <span>Xem trước CV</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CVPreview />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}