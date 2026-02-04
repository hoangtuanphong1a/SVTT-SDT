"use client";
import React, { useState } from "react";
import {
  Search,
  Grid,
  List,
  Eye,
  Download,
  Palette,
  Type,
  Layout,
  Edit3,
  Star,
  ChevronLeft,
  ChevronRight,
  X,
  Check,
  ArrowLeft,
  Zap,
  Users,
  Briefcase,
  Lightbulb,
  Filter,
  Menu,
  SlidersHorizontal,
} from "lucide-react";
import BreadcrumbTabActive from "../ui/common/breadcrumb/BreadcrumbTabActive";

interface CVTemplate {
  id: string;
  name: string;
  description: string;
  style: string;
  industries: string[];
  difficulty: "Dễ" | "Trung bình" | "Nâng cao";
  preview: string;
  rating: number;
  downloads: number;
  isPremium: boolean;
  colors: string[];
  fonts: string[];
  layout: "Single Column" | "Two Column" | "Three Column" | "Creative";
  tags: string[];
}

interface CVTemplatePageProps {
  navigate?: (page: string, id?: string) => void;
}

export default function CVTemplatePage({ navigate }: CVTemplatePageProps) {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedTemplate, setSelectedTemplate] = useState<CVTemplate | null>(null);
  const [showCustomizer, setShowCustomizer] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [filters, setFilters] = useState({
    keyword: "",
    style: "",
    industry: "",
    difficulty: "",
    layout: "",
    isPremium: ""
  });

  // Customization states
  const [selectedColor, setSelectedColor] = useState("#f26b38");
  const [selectedFont, setSelectedFont] = useState("Inter");
  const [selectedLayout, setSelectedLayout] = useState("Two Column");

  // Fixed 3 rows layout - always show 12 templates (3 rows x 4 cols max on XL)
  const templatesPerPage = 12;

  // Mock CV Templates data
  const templates: CVTemplate[] = [
    {
      id: "1",
      name: "Modern Professional",
      description: "Thiết kế hiện đại, chuyên nghiệp phù hợp với các vị trí corporate",
      style: "Hiện đại",
      industries: ["Công nghệ thông tin", "Tài chính", "Marketing"],
      difficulty: "Dễ",
      preview: "https://images.unsplash.com/photo-1587287720754-94bac45f0bff?w=400&h=600&fit=crop",
      rating: 4.8,
      downloads: 1250,
      isPremium: false,
      colors: ["#f26b38", "#2563eb", "#059669", "#dc2626"],
      fonts: ["Inter", "Roboto", "Open Sans"],
      layout: "Two Column",
      tags: ["Professional", "Clean", "ATS-Friendly"]
    },
    {
      id: "2", 
      name: "Creative Designer",
      description: "Mẫu sáng tạo dành cho các nghề thiết kế và nghệ thuật",
      style: "Sáng tạo",
      industries: ["Thiết kế", "Marketing", "Media"],
      difficulty: "Nâng cao",
      preview: "https://images.unsplash.com/photo-1522542550221-31fd19575a2d?w=400&h=600&fit=crop",
      rating: 4.9,
      downloads: 980,
      isPremium: true,
      colors: ["#8b5cf6", "#f59e0b", "#ef4444", "#10b981"],
      fonts: ["Poppins", "Montserrat", "Lato"],
      layout: "Creative",
      tags: ["Creative", "Colorful", "Portfolio"]
    },
    {
      id: "3",
      name: "Minimalist Classic",
      description: "Phong cách tối giản, thanh lịch cho mọi ngành nghề",
      style: "Tối giản",
      industries: ["Tài chính", "Luật", "Y tế", "Giáo dục"],
      difficulty: "Dễ",
      preview: "https://images.unsplash.com/photo-1693045181254-08462917f681?w=400&h=600&fit=crop",
      rating: 4.6,
      downloads: 2100,
      isPremium: false,
      colors: ["#1f2937", "#374151", "#6b7280", "#f26b38"],
      fonts: ["Times New Roman", "Georgia", "Inter"],
      layout: "Single Column",
      tags: ["Minimalist", "Classic", "Elegant"]
    },
    {
      id: "4",
      name: "Tech Innovator", 
      description: "Thiết kế năng động cho các vị trí công nghệ và startup",
      style: "Hiện đại",
      industries: ["Công nghệ thông tin", "Startup", "AI/ML"],
      difficulty: "Trung bình",
      preview: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600&fit=crop",
      rating: 4.7,
      downloads: 1680,
      isPremium: true,
      colors: ["#3b82f6", "#1d4ed8", "#f26b38", "#059669"],
      fonts: ["JetBrains Mono", "Source Code Pro", "Inter"],
      layout: "Three Column",
      tags: ["Tech", "Modern", "Dynamic"]
    },
    {
      id: "5",
      name: "Executive Leadership",
      description: "Mẫu sang trọng dành cho các vị trí lãnh đạo cao cấp",
      style: "Truyền thống",
      industries: ["Tài chính", "Consulting", "Banking"],
      difficulty: "Trung bình",
      preview: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=600&fit=crop",
      rating: 4.5,
      downloads: 890,
      isPremium: true,
      colors: ["#1e40af", "#1f2937", "#7c2d12", "#f26b38"],
      fonts: ["Playfair Display", "Merriweather", "Georgia"],
      layout: "Two Column",
      tags: ["Executive", "Premium", "Leadership"]
    },
    ...Array.from({ length: 15 }, (_, i) => ({
      id: (i + 6).toString(),
      name: [
        "Fresh Graduate",
        "Sales Expert", 
        "Healthcare Professional",
        "Academic Researcher",
        "Marketing Specialist",
        "Data Scientist",
        "Project Manager",
        "Freelancer Portfolio",
        "Customer Service",
        "HR Professional",
        "Operations Manager",
        "Content Creator",
        "Business Analyst",
        "Software Engineer",
        "Creative Writer"
      ][i],
      description: `Mẫu CV chuyên nghiệp cho ${[
        "sinh viên mới ra trường",
        "chuyên viên kinh doanh",
        "ngành y tế",
        "nghiên cứu học thuật", 
        "marketing chuyên nghiệp",
        "khoa học dữ liệu",
        "quản lý dự án",
        "freelancer đa năng",
        "chăm sóc khách hàng",
        "nhân sự",
        "vận hành",
        "sáng tạo nội dung",
        "phân tích kinh doanh",
        "lập trình viên",
        "biên tập viên"
      ][i]}`,
      style: ["Hiện đại", "Tối giản", "Sáng tạo", "Truyền thống"][i % 4],
      industries: [
        ["Mọi ngành"],
        ["Kinh doanh", "Sales"],
        ["Y tế", "Chăm sóc sức khỏe"],
        ["Giáo dục", "Nghiên cứu"],
        ["Marketing", "Truyền thông"],
        ["Công nghệ thông tin", "AI/ML"],
        ["Quản lý", "Consulting"],
        ["Thiết kế", "Sáng tạo"],
        ["Dịch vụ", "Hospitality"],
        ["Nhân sự", "HR"],
        ["Vận hành", "Logistics"],
        ["Media", "Content"],
        ["Tài chính", "Business"],
        ["Công nghệ thông tin"],
        ["Media", "Publishing"]
      ][i],
      difficulty: ["Dễ", "Trung bình", "Nâng cao"][i % 3] as "Dễ" | "Trung bình" | "Nâng cao",
      preview: `https://images.unsplash.com/photo-${1580000000 + i * 1000}?w=400&h=600&fit=crop`,
      rating: 4.0 + (i % 10) * 0.1,
      downloads: 100 + i * 50,
      isPremium: i % 3 === 0,
      colors: [
        ["#f26b38", "#2563eb", "#059669"],
        ["#8b5cf6", "#f59e0b", "#ef4444"],
        ["#1f2937", "#6b7280", "#f26b38"],
        ["#3b82f6", "#1d4ed8", "#059669"]
      ][i % 4],
      fonts: [
        ["Inter", "Roboto"],
        ["Poppins", "Montserrat"],
        ["Times New Roman", "Georgia"],
        ["Open Sans", "Lato"]
      ][i % 4],
      layout: ["Single Column", "Two Column", "Three Column", "Creative"][i % 4] as "Single Column" | "Two Column" | "Three Column" | "Creative",
      tags: [
        ["Entry Level", "Fresh"],
        ["Sales", "Business"],
        ["Healthcare", "Professional"],
        ["Academic", "Research"],
        ["Marketing", "Creative"]
      ][i % 5]
    }))
  ];

  // Filter templates
  const filteredTemplates = templates.filter((template) => {
    const keywordMatch = filters.keyword === "" || 
      template.name.toLowerCase().includes(filters.keyword.toLowerCase()) ||
      template.description.toLowerCase().includes(filters.keyword.toLowerCase()) ||
      template.tags.some(tag => tag.toLowerCase().includes(filters.keyword.toLowerCase()));

    const styleMatch = filters.style === "" || template.style === filters.style;
    
    const industryMatch = filters.industry === "" || 
      template.industries.includes(filters.industry) ||
      template.industries.includes("Mọi ngành");
    
    const difficultyMatch = filters.difficulty === "" || template.difficulty === filters.difficulty;
    
    const layoutMatch = filters.layout === "" || template.layout === filters.layout;
    
    const premiumMatch = filters.isPremium === "" || 
      (filters.isPremium === "free" && !template.isPremium) ||
      (filters.isPremium === "premium" && template.isPremium);

    return keywordMatch && styleMatch && industryMatch && difficultyMatch && layoutMatch && premiumMatch;
  });

  const totalPages = Math.ceil(filteredTemplates.length / templatesPerPage);
  const startIndex = (currentPage - 1) * templatesPerPage;
  const currentTemplates = filteredTemplates.slice(startIndex, startIndex + templatesPerPage);

  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxPagesToShow = 5;
    const half = Math.floor(maxPagesToShow / 2);

    let start = Math.max(1, currentPage - half);
    let end = Math.min(totalPages, currentPage + half);

    if (currentPage <= half) {
      end = Math.min(totalPages, maxPagesToShow);
      start = 1;
    } else if (currentPage + half >= totalPages) {
      start = Math.max(1, totalPages - maxPagesToShow + 1);
      end = totalPages;
    }

    for (let i = start; i <= end; i++) {
      pageNumbers.push(i);
    }
    return pageNumbers;
  };

  const handleTemplateClick = (template: CVTemplate) => {
    setSelectedTemplate(template);
  };

  const handleUseTemplate = (template: CVTemplate) => {
    // Navigate to CV Editor with template ID
    console.log("Using template:", template.name);
    if (navigate) {
      navigate("cv-editor", template.id);
    }
  };

  const clearAllFilters = () => {
    setFilters({
      keyword: "",
      style: "",
      industry: "",
      difficulty: "",
      layout: "",
      isPremium: ""
    });
    setCurrentPage(1);
  };

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const target = e.target as HTMLImageElement;
    target.src = `data:image/svg+xml;base64,${btoa(`
      <svg width="400" height="600" viewBox="0 0 400 600" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="400" height="600" fill="#f3f4f6"/>
        <rect x="50" y="50" width="300" height="500" fill="white" stroke="#e5e7eb" stroke-width="2"/>
        <rect x="80" y="80" width="240" height="40" fill="#f26b38"/>
        <rect x="80" y="140" width="180" height="20" fill="#e5e7eb"/>
        <rect x="80" y="180" width="200" height="20" fill="#e5e7eb"/>
        <rect x="80" y="220" width="160" height="20" fill="#e5e7eb"/>
        <text x="200" y="320" text-anchor="middle" fill="#9ca3af" font-family="Inter, sans-serif" font-size="14">CV Template</text>
      </svg>
    `)}`;
  };

  const TemplateCard = ({ template, mode }: { template: CVTemplate; mode: "grid" | "list" }) => (
    <div
      className={`group bg-white rounded-lg border border-gray-200 hover:shadow-lg transition-all duration-300 cursor-pointer relative ${
        mode === "grid" ? "flex flex-col h-full" : "flex items-center"
      } ${template.isPremium ? "ring-2 ring-yellow-200" : ""}`}
      onClick={() => handleTemplateClick(template)}
    >
      {template.isPremium && (
        <div className="absolute -top-2 -right-2 bg-yellow-500 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1 z-10">
          <Star className="h-3 w-3 fill-current" />
          PREMIUM
        </div>
      )}

      {mode === "list" ? (
        <div className="p-6 w-full flex items-center min-h-[120px]">
          <div className="flex items-center gap-4 flex-shrink-0 w-80">
            <div className="flex-shrink-0">
              <img
                src={template.preview}
                alt={template.name}
                className="w-16 h-24 rounded object-cover border border-gray-200"
                onError={handleImageError}
              />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-semibold text-gray-900 group-hover:text-[#f26b38] transition-colors text-base line-clamp-1">
                  {template.name}
                </h3>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  template.difficulty === "Dễ" ? "bg-green-100 text-green-700" :
                  template.difficulty === "Trung bình" ? "bg-yellow-100 text-yellow-700" :
                  "bg-red-100 text-red-700"
                }`}>
                  {template.difficulty}
                </span>
              </div>

              <div className="flex items-center gap-2 text-xs text-gray-500">
                <span>⭐ {template.rating}</span>
                <span>•</span>
                <span>{template.downloads} downloads</span>
              </div>
            </div>
          </div>

          <div className="flex-1 px-6 hidden lg:block">
            <div className="space-y-2">
              <div className="text-sm text-gray-600">
                <span className="font-medium">Phong cách:</span> {template.style}
              </div>
              <div className="text-sm text-gray-600">
                <span className="font-medium">Layout:</span> {template.layout}
              </div>
              <div className="flex flex-wrap gap-1">
                {template.tags.slice(0, 3).map((tag) => (
                  <span key={tag} className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 flex-shrink-0">
            <button 
              onClick={(e) => {
                e.stopPropagation();
                setSelectedTemplate(template);
              }}
              className="text-gray-400 hover:text-[#f26b38] transition-colors p-2"
            >
              <Eye className="h-5 w-5" />
            </button>
            <button 
              onClick={(e) => {
                e.stopPropagation();
                handleUseTemplate(template);
              }}
              className="bg-[#f26b38] hover:bg-[#e55a2b] text-white px-4 py-2 rounded-lg text-sm transition-colors"
            >
              Chọn mẫu
            </button>
          </div>
        </div>
      ) : (
        <div className="p-4 flex flex-col h-full">
          <div className="relative mb-3 flex-shrink-0">
            <img
              src={template.preview}
              alt={template.name}
              className="w-full h-40 object-cover rounded-lg border border-gray-200"
              onError={handleImageError}
            />
            <div className="absolute top-2 left-2">
              <span className={`text-xs px-2 py-1 rounded-full ${
                template.difficulty === "Dễ" ? "bg-green-100 text-green-700" :
                template.difficulty === "Trung bình" ? "bg-yellow-100 text-yellow-700" :
                "bg-red-100 text-red-700"
              }`}>
                {template.difficulty}
              </span>
            </div>
            <div className="absolute top-2 right-2">
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedTemplate(template);
                }}
                className="bg-white/90 hover:bg-white text-gray-700 p-2 rounded-lg transition-colors"
              >
                <Eye className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div className="flex-1 flex flex-col">
            <div className="mb-3">
              <h3 className="font-semibold text-gray-900 group-hover:text-[#f26b38] transition-colors mb-1 line-clamp-1">
                {template.name}
              </h3>
              <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
                <span>⭐ {template.rating}</span>
                <span>{template.downloads} lượt tải</span>
              </div>
              <div className="flex flex-wrap gap-1">
                {template.tags.slice(0, 2).map((tag) => (
                  <span key={tag} className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <button 
              onClick={(e) => {
                e.stopPropagation();
                handleUseTemplate(template);
              }}
              className="w-full bg-[#f26b38] hover:bg-[#e55a2b] text-white py-2 px-4 rounded-lg text-sm transition-colors mt-auto"
            >
              Chọn mẫu
            </button>
          </div>
        </div>
      )}
    </div>
  );

  // Template Detail Modal
  const TemplateDetailModal = () => {
    if (!selectedTemplate) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg max-w-6xl w-full max-h-[90vh] overflow-hidden flex">
          {/* Left side - Preview */}
          <div className="flex-1 p-6 bg-gray-50 flex items-center justify-center">
            <div className="max-w-md w-full">
              <img
                src={selectedTemplate.preview}
                alt={selectedTemplate.name}
                className="w-full h-auto rounded-lg shadow-lg border border-gray-200"
                onError={handleImageError}
              />
            </div>
          </div>

          {/* Right side - Details and Customization */}
          <div className="w-96 p-6 overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-semibold text-gray-900">{selectedTemplate.name}</h2>
              <button 
                onClick={() => setSelectedTemplate(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            {/* Template Info */}
            <div className="space-y-4 mb-6">
              <div>
                <span className="text-sm text-gray-500">Mô tả</span>
                <p className="text-gray-700">{selectedTemplate.description}</p>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-sm text-gray-500">Phong cách</span>
                  <p className="font-medium">{selectedTemplate.style}</p>
                </div>
                <div>
                  <span className="text-sm text-gray-500">Độ khó</span>
                  <p className="font-medium">{selectedTemplate.difficulty}</p>
                </div>
              </div>

              <div>
                <span className="text-sm text-gray-500">Ngành nghề phù hợp</span>
                <div className="flex flex-wrap gap-1 mt-1">
                  {selectedTemplate.industries.map((industry) => (
                    <span key={industry} className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded">
                      {industry}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <span className="text-sm text-gray-500">Tags</span>
                <div className="flex flex-wrap gap-1 mt-1">
                  {selectedTemplate.tags.map((tag) => (
                    <span key={tag} className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-gray-200">
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <span>⭐ {selectedTemplate.rating}</span>
                  <span>{selectedTemplate.downloads} downloads</span>
                </div>
                {selectedTemplate.isPremium && (
                  <span className="bg-yellow-100 text-yellow-700 text-xs px-2 py-1 rounded">
                    Premium
                  </span>
                )}
              </div>
            </div>

            {/* Quick Customization */}
            <div className="space-y-4 mb-6 p-4 bg-gray-50 rounded-lg">
              <h3 className="font-medium text-gray-900 flex items-center gap-2">
                <Palette className="h-4 w-4" />
                Tùy chỉnh nhanh
              </h3>

              {/* Color Selection */}
              <div>
                <span className="text-sm text-gray-700 block mb-2">Màu chủ đạo</span>
                <div className="flex gap-2">
                  {selectedTemplate.colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`w-8 h-8 rounded-full border-2 transition-all ${
                        selectedColor === color ? "border-gray-400 scale-110" : "border-gray-200"
                      }`}
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </div>

              {/* Font Selection */}
              <div>
                <span className="text-sm text-gray-700 block mb-2">Font chữ</span>
                <select 
                  value={selectedFont}
                  onChange={(e) => setSelectedFont(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded text-sm"
                >
                  {selectedTemplate.fonts.map((font) => (
                    <option key={font} value={font}>{font}</option>
                  ))}
                </select>
              </div>

              <div className="text-xs text-gray-500">
                * Bản xem trước sẽ cập nhật khi bạn áp dụng mẫu
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <button 
                onClick={() => handleUseTemplate(selectedTemplate)}
                className="w-full bg-[#f26b38] hover:bg-[#e55a2b] text-white py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                <Check className="h-4 w-4" />
                Sử dụng mẫu này
              </button>
              <button 
                onClick={() => {
                  handleUseTemplate(selectedTemplate);
                }}
                className="w-full border border-gray-300 hover:border-[#f26b38] hover:text-[#f26b38] py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                <Edit3 className="h-4 w-4" />
                Chỉnh sửa mẫu
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Filter Sidebar Component
  const FilterSidebar = () => (
    <div className="w-80 bg-white rounded-lg shadow-sm border h-fit sticky top-8">
      {/* Sidebar Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h3 className="flex items-center gap-2">
            <SlidersHorizontal className="h-5 w-5 text-[#f26b38]" />
            Bộ lọc mẫu CV
          </h3>
          <button
            onClick={clearAllFilters}
            className="text-sm text-gray-500 hover:text-[#f26b38] transition-colors"
          >
            Xóa tất cả
          </button>
        </div>
      </div>

      {/* Filter Content */}
      <div className="p-6 space-y-6">
        {/* Search */}
        <div>
          <label className="block text-sm mb-2 text-gray-700">Tìm kiếm</label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="text"
              placeholder="Tên mẫu, từ khóa..."
              className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#f26b38] focus:border-[#f26b38] outline-none text-sm"
              value={filters.keyword}
              onChange={(e) => {
                setFilters({ ...filters, keyword: e.target.value });
                setCurrentPage(1);
              }}
            />
          </div>
        </div>

        {/* Style Filter */}
        <div>
          <label className="block text-sm mb-2 text-gray-700">Phong cách</label>
          <div className="space-y-2">
            {["Hiện đại", "Tối giản", "Sáng tạo", "Truyền thống"].map((style) => (
              <label key={style} className="flex items-center">
                <input
                  type="radio"
                  name="style"
                  value={style}
                  checked={filters.style === style}
                  onChange={(e) => {
                    setFilters({ ...filters, style: e.target.value });
                    setCurrentPage(1);
                  }}
                  className="mr-3 text-[#f26b38] focus:ring-[#f26b38]"
                />
                <span className="text-sm text-gray-700">{style}</span>
              </label>
            ))}
            <label className="flex items-center">
              <input
                type="radio"
                name="style"
                value=""
                checked={filters.style === ""}
                onChange={(e) => {
                  setFilters({ ...filters, style: "" });
                  setCurrentPage(1);
                }}
                className="mr-3 text-[#f26b38] focus:ring-[#f26b38]"
              />
              <span className="text-sm text-gray-700">Tất cả</span>
            </label>
          </div>
        </div>

        {/* Industry Filter */}
        <div>
          <label className="block text-sm mb-2 text-gray-700">Ngành nghề</label>
          <select
            className="w-full py-2.5 px-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#f26b38] focus:border-[#f26b38] outline-none custom-select appearance-none bg-white text-sm"
            value={filters.industry}
            onChange={(e) => {
              setFilters({ ...filters, industry: e.target.value });
              setCurrentPage(1);
            }}
          >
            <option value="">Tất cả ngành nghề</option>
            <option value="Công nghệ thông tin">Công nghệ thông tin</option>
            <option value="Marketing">Marketing</option>
            <option value="Tài chính">Tài chính</option>
            <option value="Thiết kế">Thiết kế</option>
            <option value="Y tế">Y tế</option>
            <option value="Giáo dục">Giáo dục</option>
            <option value="Kinh doanh">Kinh doanh</option>
            <option value="Sales">Sales</option>
            <option value="Nhân sự">Nhân sự</option>
          </select>
        </div>

        {/* Difficulty Filter */}
        <div>
          <label className="block text-sm mb-2 text-gray-700">Độ khó</label>
          <div className="space-y-2">
            {[
              { value: "Dễ", color: "bg-green-100 text-green-700" },
              { value: "Trung bình", color: "bg-yellow-100 text-yellow-700" },
              { value: "Nâng cao", color: "bg-red-100 text-red-700" }
            ].map((difficulty) => (
              <label key={difficulty.value} className="flex items-center">
                <input
                  type="radio"
                  name="difficulty"
                  value={difficulty.value}
                  checked={filters.difficulty === difficulty.value}
                  onChange={(e) => {
                    setFilters({ ...filters, difficulty: e.target.value });
                    setCurrentPage(1);
                  }}
                  className="mr-3 text-[#f26b38] focus:ring-[#f26b38]"
                />
                <span className={`text-xs px-2 py-1 rounded-full ${difficulty.color}`}>
                  {difficulty.value}
                </span>
              </label>
            ))}
            <label className="flex items-center">
              <input
                type="radio"
                name="difficulty"
                value=""
                checked={filters.difficulty === ""}
                onChange={(e) => {
                  setFilters({ ...filters, difficulty: "" });
                  setCurrentPage(1);
                }}
                className="mr-3 text-[#f26b38] focus:ring-[#f26b38]"
              />
              <span className="text-sm text-gray-700">Tất cả</span>
            </label>
          </div>
        </div>

        {/* Layout Filter */}
        <div>
          <label className="block text-sm mb-2 text-gray-700">Layout</label>
          <div className="grid grid-cols-2 gap-2">
            {[
              { value: "Single Column", label: "1 cột" },
              { value: "Two Column", label: "2 cột" },
              { value: "Three Column", label: "3 cột" },
              { value: "Creative", label: "Sáng tạo" }
            ].map((layout) => (
              <label key={layout.value} className="flex items-center">
                <input
                  type="checkbox"
                  checked={filters.layout === layout.value}
                  onChange={(e) => {
                    setFilters({ ...filters, layout: e.target.checked ? layout.value : "" });
                    setCurrentPage(1);
                  }}
                  className="mr-2 text-[#f26b38] focus:ring-[#f26b38] rounded"
                />
                <span className="text-sm text-gray-700">{layout.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Premium Filter */}
        <div>
          <label className="block text-sm mb-2 text-gray-700">Loại mẫu</label>
          <div className="space-y-2">
            <label className="flex items-center">
              <input
                type="radio"
                name="premium"
                value="free"
                checked={filters.isPremium === "free"}
                onChange={(e) => {
                  setFilters({ ...filters, isPremium: e.target.value });
                  setCurrentPage(1);
                }}
                className="mr-3 text-[#f26b38] focus:ring-[#f26b38]"
              />
              <span className="text-sm text-gray-700 flex items-center">
                Miễn phí
                <span className="ml-2 bg-green-100 text-green-700 text-xs px-2 py-0.5 rounded-full">
                  Free
                </span>
              </span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="premium"
                value="premium"
                checked={filters.isPremium === "premium"}
                onChange={(e) => {
                  setFilters({ ...filters, isPremium: e.target.value });
                  setCurrentPage(1);
                }}
                className="mr-3 text-[#f26b38] focus:ring-[#f26b38]"
              />
              <span className="text-sm text-gray-700 flex items-center">
                Premium
                <Star className="ml-2 h-3 w-3 text-yellow-500 fill-current" />
              </span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="premium"
                value=""
                checked={filters.isPremium === ""}
                onChange={(e) => {
                  setFilters({ ...filters, isPremium: "" });
                  setCurrentPage(1);
                }}
                className="mr-3 text-[#f26b38] focus:ring-[#f26b38]"
              />
              <span className="text-sm text-gray-700">Tất cả</span>
            </label>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="pt-4 border-t border-gray-200">
          <div className="text-sm text-gray-600 space-y-1">
            <div className="flex justify-between">
              <span>Tổng mẫu:</span>
              <span className="font-medium">{templates.length}</span>
            </div>
            <div className="flex justify-between">
              <span>Kết quả:</span>
              <span className="font-medium text-[#f26b38]">{filteredTemplates.length}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Filter Overlay */}
      {isSidebarOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden">
          <div className="fixed left-0 top-0 bottom-0 w-80 bg-white overflow-y-auto">
            <div className="p-4 border-b border-gray-200 flex items-center justify-between">
              <h3 className="font-medium">Bộ lọc mẫu CV</h3>
              <button
                onClick={() => setIsSidebarOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <FilterSidebar />
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <BreadcrumbTabActive items={[{ name: "Mẫu CV" }]} />
        </div>

        <div className="flex gap-8">
          {/* Desktop Sidebar */}
          <div className="hidden lg:block flex-shrink-0">
            <FilterSidebar />
          </div>

          {/* Main Content */}
          <div className="flex-1 min-w-0">
            {/* Mobile Filter Button + Search */}
            <div className="bg-white rounded-lg shadow-sm border p-4 mb-6 lg:hidden">
              <div className="flex gap-3">
                <button
                  onClick={() => setIsSidebarOpen(true)}
                  className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  <Filter className="h-4 w-4" />
                  Bộ lọc
                </button>
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <input
                    type="text"
                    placeholder="Tìm mẫu CV..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#f26b38] focus:border-[#f26b38] outline-none text-sm"
                    value={filters.keyword}
                    onChange={(e) => {
                      setFilters({ ...filters, keyword: e.target.value });
                      setCurrentPage(1);
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Stats and Controls */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
              <div>
                <h2 className="font-bold text-gray-900 mb-1">
                  Mẫu CV Chuyên Nghiệp
                  <span className="bg-orange-100 text-[#f26b38] text-sm px-2 py-1 rounded-full ml-3">
                    {filteredTemplates.length} mẫu
                  </span>
                </h2>
                <p className="text-gray-600 text-sm">
                  Chọn mẫu CV phù hợp với ngành nghề của bạn
                </p>
              </div>
              
              <div className="flex items-center gap-4">
                <select className="py-2 px-3 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#f26b38] focus:border-[#f26b38] outline-none custom-select appearance-none bg-white min-w-[140px]">
                  <option value="popular">Phổ biến nhất</option>
                  <option value="rating">Đánh giá cao</option>
                  <option value="downloads">Tải nhiều nhất</option>
                  <option value="newest">Mới nhất</option>
                </select>
                
                <div className="flex border rounded-lg">
                  <button
                    className={`p-2 ${
                      viewMode === "grid"
                        ? "bg-[#f26b38] text-white"
                        : "text-gray-600 hover:bg-gray-100"
                    } rounded-l-lg transition-colors`}
                    onClick={() => setViewMode("grid")}
                  >
                    <Grid className="h-4 w-4" />
                  </button>
                  <button
                    className={`p-2 ${
                      viewMode === "list"
                        ? "bg-[#f26b38] text-white"
                        : "text-gray-600 hover:bg-gray-100"
                    } rounded-r-lg transition-colors`}
                    onClick={() => setViewMode("list")}
                  >
                    <List className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Templates Grid - Fixed 3 Rows Layout */}
            {/* 
              Responsive Grid: 
              - Mobile (1 col): 3 rows x 1 = 3 visible items per page (adjust templatesPerPage if needed)
              - SM (2 cols): 3 rows x 2 = 6 visible items 
              - LG (3 cols): 3 rows x 3 = 9 visible items
              - XL (4 cols): 3 rows x 4 = 12 visible items (current templatesPerPage)
            */}
            <div
              className={
                viewMode === "grid"
                  ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                  : "space-y-4"
              }
            >
              {currentTemplates.map((template) => (
                <TemplateCard key={template.id} template={template} mode={viewMode} />
              ))}
            </div>

            {/* Empty State */}
            {filteredTemplates.length === 0 && (
              <div className="text-center py-12">
                <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                  <Search className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="font-medium text-gray-900 mb-2">Không tìm thấy mẫu CV</h3>
                <p className="text-gray-600 mb-4">Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm</p>
                <button
                  onClick={clearAllFilters}
                  className="text-[#f26b38] hover:text-[#e55a2b] transition-colors"
                >
                  Xóa tất cả bộ lọc
                </button>
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex flex-col sm:flex-row items-center justify-between mt-8 gap-4">
                <div className="text-sm text-gray-600">
                  Hiển thị {startIndex + 1}-
                  {Math.min(startIndex + templatesPerPage, filteredTemplates.length)} của{" "}
                  {filteredTemplates.length} mẫu
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    className="flex items-center px-3 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    onClick={() =>
                      setCurrentPage((prev) => Math.max(prev - 1, 1))
                    }
                    disabled={currentPage === 1}
                  >
                    <ChevronLeft className="h-4 w-4 mr-1" />
                    Trước
                  </button>
                  {getPageNumbers().map((page) => (
                    <button
                      key={page}
                      className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                        page === currentPage
                          ? "bg-[#f26b38] text-white"
                          : "text-gray-700 hover:bg-gray-100 border border-gray-300"
                      }`}
                      onClick={() => setCurrentPage(page)}
                    >
                      {page}
                    </button>
                  ))}
                  <button
                    className="flex items-center px-3 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    onClick={() =>
                      setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                    }
                    disabled={currentPage === totalPages}
                  >
                    Sau
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Template Detail Modal */}
      {selectedTemplate && <TemplateDetailModal />}
    </div>
  );
}