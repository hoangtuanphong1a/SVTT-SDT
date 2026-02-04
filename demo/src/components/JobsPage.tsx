"use client";
import React, { useState } from "react";
import {
  Search,
  MapPin,
  Grid,
  List,
  Bookmark,
  DollarSign,
  Clock,
  ChevronLeft,
  ChevronRight,
  Star,
  ArrowUpDown,
} from "lucide-react";
import BreadcrumbTabActive from "./ui/common/breadcrumb/BreadcrumbTabActive";

interface Job {
  id: number;
  title: string;
  company: string;
  logo: string;
  location: string;
  salary: string;
  type: string;
  experience: string;
  posted: string;
  postedDate: Date;
  tags: string[];
  description: string;
  urgent: boolean;
  featured: boolean;
}

const JobsPage = () => {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState("newest");
  const [filters, setFilters] = useState({
    keyword: "",
    location: "",
    industry: "",
    salary: "",
    experience: "",
    company: "",
  });

  const [advancedFilters, setAdvancedFilters] = useState({
    experienceLevels: [] as string[],
    salaryRanges: [] as string[],
    jobTypes: [] as string[],
    industries: [] as string[],
  });
  const jobsPerPage = 9; // 3 hàng × 3 cột = 9 jobs mỗi trang

  // Fixed mock data với postedDate để sort
  const jobs: Job[] = [
    {
      id: 1,
      title: "Lập Trình Viên Frontend Senior",
      company: "TechCorp Vietnam",
      logo: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=64&h=64&fit=crop&crop=face",
      location: "TP. Hồ Chí Minh",
      salary: "20 - 30 triệu",
      type: "Toàn thời gian",
      experience: "3-5 năm",
      posted: "2 ngày trước",
      postedDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      tags: ["React", "TypeScript", "Remote"],
      description:
        "Chúng tôi đang tìm kiếm một Lập trình viên Frontend Senior để gia nhập đội ngũ năng động...",
      urgent: false,
      featured: true,
    },
    {
      id: 2,
      title: "Quản Lý Sản Phẩm",
      company: "StartupVN",
      logo: "https://images.unsplash.com/photo-1572021335469-31706a17aaef?w=64&h=64&fit=crop&crop=face",
      location: "Hà Nội",
      salary: "18 - 25 triệu",
      type: "Toàn thời gian",
      experience: "2-4 năm",
      posted: "1 ngày trước",
      postedDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      tags: ["Chiến lược", "Phân tích", "Agile"],
      description:
        "Tham gia đội ngũ sản phẩm để thúc đẩy sự đổi mới và tăng trưởng...",
      urgent: true,
      featured: false,
    },
    {
      id: 3,
      title: "Thiết Kế UX/UI",
      company: "Design Studio",
      logo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=64&h=64&fit=crop&crop=face",
      location: "Đà Nẵng",
      salary: "12 - 20 triệu",
      type: "Bán thời gian",
      experience: "1-3 năm",
      posted: "3 ngày trước",
      postedDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
      tags: ["Figma", "Design System", "Prototype"],
      description:
        "Tạo ra những trải nghiệm người dùng tuyệt vời cho các sản phẩm số...",
      urgent: false,
      featured: true,
    },
    ...Array.from({ length: 15 }, (_, i) => ({
      id: i + 4,
      title: `${
        [
          "Fullstack Developer",
          "Data Scientist",
          "DevOps Engineer",
          "Backend Developer",
          "Mobile Developer",
        ][i % 5]
      }`,
      company: `${
        [
          "TechViet Corp",
          "Innovation Hub",
          "Digital Solutions",
          "Smart Systems",
          "Future Tech",
        ][i % 5]
      }`,
      logo: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=64&h=64&fit=crop&crop=face",
      location: [
        "TP. Hồ Chí Minh",
        "Hà Nội",
        "Đà Nẵng",
        "Cần Thơ",
        "Làm từ xa",
      ][i % 5],
      salary: `${10 + (i % 5) * 3} - ${20 + (i % 5) * 4} triệu`,
      type: ["Toàn thời gian", "Bán thời gian", "Hợp đồng", "Freelance"][i % 4],
      experience: ["1-2 năm", "2-4 năm", "3-5 năm", "5+ năm"][i % 4],
      posted: `${(i % 7) + 1} ngày trước`,
      postedDate: new Date(Date.now() - ((i % 7) + 1) * 24 * 60 * 60 * 1000),
      tags: [
        ["React", "TypeScript", "Remote"],
        ["Node.js", "API", "GraphQL"],
        ["Python", "AI", "Machine Learning"],
        ["Java", "Spring", "Microservices"],
        ["Swift", "iOS", "Mobile"],
      ][i % 5],
      description: "Mô tả công việc chi tiết cho vị trí này...",
      urgent: i % 6 === 0,
      featured: i % 8 === 0,
    })),
  ];

  const filteredJobs = jobs.filter((job) => {
    // Keyword search (title, company, tags)
    const keywordMatch =
      filters.keyword === "" ||
      job.title.toLowerCase().includes(filters.keyword.toLowerCase()) ||
      job.company.toLowerCase().includes(filters.keyword.toLowerCase()) ||
      job.tags.some((tag) =>
        tag.toLowerCase().includes(filters.keyword.toLowerCase())
      );

    // Location filter - fix mapping between option values and job data
    const locationMatch =
      filters.location === "" ||
      (filters.location === "ho-chi-minh" &&
        job.location.toLowerCase().includes("hồ chí minh")) ||
      (filters.location === "hanoi" &&
        job.location.toLowerCase().includes("hà nội")) ||
      (filters.location === "da-nang" &&
        job.location.toLowerCase().includes("đà nẵng")) ||
      (filters.location === "can-tho" &&
        job.location.toLowerCase().includes("cần thơ")) ||
      (filters.location === "làm từ xa" &&
        job.location.toLowerCase().includes("làm từ xa"));

    // Industry filter - improved matching logic
    const industryMatch =
      filters.industry === "" ||
      (filters.industry === "it" &&
        (job.title.toLowerCase().includes("developer") ||
          job.title.toLowerCase().includes("lập trình") ||
          job.title.toLowerCase().includes("fullstack") ||
          job.title.toLowerCase().includes("frontend") ||
          job.title.toLowerCase().includes("backend") ||
          job.title.toLowerCase().includes("devops") ||
          job.title.toLowerCase().includes("data scientist") ||
          job.tags.some((tag) =>
            [
              "React",
              "TypeScript",
              "Node.js",
              "Python",
              "Java",
              "Swift",
              "API",
              "GraphQL",
              "AI",
              "Machine Learning",
              "Spring",
              "Microservices",
              "iOS",
              "Mobile",
            ].includes(tag)
          ))) ||
      (filters.industry === "design" &&
        (job.title.toLowerCase().includes("thiết kế") ||
          job.title.toLowerCase().includes("ux") ||
          job.title.toLowerCase().includes("ui") ||
          job.tags.some((tag) =>
            ["Figma", "Design System", "Prototype"].includes(tag)
          ))) ||
      (filters.industry === "marketing" &&
        (job.title.toLowerCase().includes("quản lý sản phẩm") ||
          job.title.toLowerCase().includes("marketing") ||
          job.tags.some((tag) =>
            ["Chiến lược", "Phân tích", "Agile"].includes(tag)
          ))) ||
      (filters.industry === "finance" &&
        (job.title.toLowerCase().includes("tài chính") ||
          job.title.toLowerCase().includes("kế toán"))) ||
      (filters.industry === "hr" &&
        (job.title.toLowerCase().includes("nhân sự") ||
          job.title.toLowerCase().includes("hr"))) ||
      (filters.industry === "sales" &&
        (job.title.toLowerCase().includes("kinh doanh") ||
          job.title.toLowerCase().includes("bán hàng"))) ||
      (filters.industry === "education" &&
        (job.title.toLowerCase().includes("giáo dục") ||
          job.title.toLowerCase().includes("giảng viên"))) ||
      (filters.industry === "healthcare" &&
        (job.title.toLowerCase().includes("y tế") ||
          job.title.toLowerCase().includes("chăm sóc sức khỏe"))) ||
      (filters.industry === "manufacturing" &&
        (job.title.toLowerCase().includes("sản xuất") ||
          job.title.toLowerCase().includes("chế tạo"))) ||
      (filters.industry === "logistics" &&
        (job.title.toLowerCase().includes("vận tải") ||
          job.title.toLowerCase().includes("logistics")));

    // Experience level filter - improved matching
    const experienceMatch =
      advancedFilters.experienceLevels.length === 0 ||
      advancedFilters.experienceLevels.some((level) => {
        if (level === "Không yêu cầu")
          return job.experience === "Không yêu cầu";
        if (level === "1-2 năm")
          return (
            job.experience.includes("1-2") || job.experience.includes("2-4")
          );
        if (level === "3-5 năm")
          return (
            job.experience.includes("3-5") || job.experience.includes("2-4")
          );
        if (level === "5+ năm") return job.experience.includes("5+");
        return false;
      });

    // Salary range filter
    const salaryMatch =
      advancedFilters.salaryRanges.length === 0 ||
      advancedFilters.salaryRanges.some((range) => {
        const salary = parseInt(job.salary.split("-")[0].trim());
        if (range === "5-10 triệu") return salary >= 5 && salary <= 10;
        if (range === "10-20 triệu") return salary >= 10 && salary <= 20;
        if (range === "20-30 triệu") return salary >= 20 && salary <= 30;
        if (range === "30+ triệu") return salary >= 30;
        return false;
      });

    // Job type filter
    const jobTypeMatch =
      advancedFilters.jobTypes.length === 0 ||
      advancedFilters.jobTypes.includes(job.type);

    return (
      keywordMatch &&
      locationMatch &&
      industryMatch &&
      experienceMatch &&
      salaryMatch &&
      jobTypeMatch
    );
  });

  // Sort function để sắp xếp jobs
  const sortedJobs = [...filteredJobs].sort((a, b) => {
    switch (sortBy) {
      case "newest":
        return b.postedDate.getTime() - a.postedDate.getTime();
      case "salary-high":
        const salaryA = parseInt(a.salary.split("-")[1]?.trim() || a.salary.split("-")[0].trim());
        const salaryB = parseInt(b.salary.split("-")[1]?.trim() || b.salary.split("-")[0].trim());
        return salaryB - salaryA;
      case "salary-low":
        const salaryALow = parseInt(a.salary.split("-")[0].trim());
        const salaryBLow = parseInt(b.salary.split("-")[0].trim());
        return salaryALow - salaryBLow;
      case "relevant":
        // Sort by featured first, then by keyword relevance, then by date
        if (a.featured && !b.featured) return -1;
        if (!a.featured && b.featured) return 1;
        
        if (filters.keyword) {
          const aRelevance = (a.title.toLowerCase().includes(filters.keyword.toLowerCase()) ? 2 : 0) +
                           (a.tags.some(tag => tag.toLowerCase().includes(filters.keyword.toLowerCase())) ? 1 : 0);
          const bRelevance = (b.title.toLowerCase().includes(filters.keyword.toLowerCase()) ? 2 : 0) +
                           (b.tags.some(tag => tag.toLowerCase().includes(filters.keyword.toLowerCase())) ? 1 : 0);
          if (aRelevance !== bRelevance) return bRelevance - aRelevance;
        }
        
        return b.postedDate.getTime() - a.postedDate.getTime();
      default:
        return 0;
    }
  });

  const totalPages = Math.ceil(sortedJobs.length / jobsPerPage);
  const startIndex = (currentPage - 1) * jobsPerPage;
  const currentJobs = sortedJobs.slice(startIndex, startIndex + jobsPerPage);

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

  const handleJobClick = (job: Job) => {
    console.log("Chuyển đến chi tiết công việc:", job);
  };

  // Filter handlers
  const toggleAdvancedFilter = (
    category: keyof typeof advancedFilters,
    value: string
  ) => {
    setAdvancedFilters((prev) => ({
      ...prev,
      [category]: prev[category].includes(value)
        ? prev[category].filter((item) => item !== value)
        : [...prev[category], value],
    }));
    setCurrentPage(1);
  };

  const clearAllFilters = () => {
    setFilters({
      keyword: "",
      location: "",
      industry: "",
      salary: "",
      experience: "",
      company: "",
    });
    setAdvancedFilters({
      experienceLevels: [],
      salaryRanges: [],
      jobTypes: [],
      industries: [],
    });
    setCurrentPage(1);
  };

  const handleSearch = () => {
    setCurrentPage(1);
    // Filter logic is automatically applied through filteredJobs
  };

  // Helper function to handle image error
  const handleImageError = (
    e: React.SyntheticEvent<HTMLImageElement, Event>
  ) => {
    const target = e.target as HTMLImageElement;
    target.src = `data:image/svg+xml;base64,${btoa(`
      <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="64" height="64" rx="8" fill="#f26b38"/>
        <path d="M32 16C36.4183 16 40 19.5817 40 24V40C40 44.4183 36.4183 48 32 48C27.5817 48 24 44.4183 24 40V24C24 19.5817 27.5817 16 32 16ZM32 20C29.7909 20 28 21.7909 28 24V40C28 42.2091 29.7909 44 32 44C34.2091 44 36 42.2091 36 40V24C36 21.7909 34.2091 20 32 20Z" fill="white"/>
      </svg>
    `)}`;
  };

  const JobCard = ({ job, mode }: { job: Job; mode: "grid" | "list" }) => (
    <div
      className={`group bg-white rounded-lg border border-gray-200 hover:shadow-lg transition-all duration-300 cursor-pointer relative ${
        mode === "grid" ? "flex flex-col h-full min-h-[320px]" : "flex items-center"
      } ${job.featured ? "ring-2 ring-orange-200" : ""}`}
      onClick={() => handleJobClick(job)}
    >
      {job.featured && (
        <div className="absolute -top-2 -right-2 bg-[#f26b38] text-white text-xs px-2 py-1 rounded-full flex items-center gap-1 z-10">
          <Star className="h-3 w-3" />
          NỔI BẬT
        </div>
      )}

      {mode === "list" ? (
        <div className="p-6 w-full flex items-center min-h-[120px]">
          {/* Left section - Logo, Title, Company */}
          <div className="flex items-center gap-4 flex-shrink-0 w-80">
            <div className="flex-shrink-0">
              <img
                src={job.logo}
                alt={job.company}
                className="w-16 h-16 rounded-lg object-cover"
                onError={handleImageError}
              />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-semibold text-gray-900 group-hover:text-[#f26b38] transition-colors text-base line-clamp-1">
                  {job.title}
                </h3>
                {job.urgent && (
                  <span className="bg-red-100 text-red-700 text-xs px-2 py-1 rounded-full font-medium whitespace-nowrap">
                    URGENT
                  </span>
                )}
              </div>
              <p className="text-sm text-gray-600 line-clamp-1">
                {job.company}
              </p>
            </div>
          </div>

          {/* Center section - Job Details */}
          <div className="flex-1 px-6 hidden lg:block">
            <div className="grid grid-cols-3 gap-4">
              <div className="flex items-center text-sm text-gray-600">
                <MapPin className="h-4 w-4 mr-2 text-gray-400 flex-shrink-0" />
                <span className="line-clamp-1">{job.location}</span>
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <DollarSign className="h-4 w-4 mr-2 text-gray-400 flex-shrink-0" />
                <span className="line-clamp-1">{job.salary}</span>
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <Clock className="h-4 w-4 mr-2 text-gray-400 flex-shrink-0" />
                <span className="line-clamp-1">{job.posted}</span>
              </div>
            </div>
            <div className="flex flex-wrap gap-2 mt-3">
              {job.tags.slice(0, 3).map((tag: string) => (
                <span
                  key={tag}
                  className="bg-orange-50 text-[#f26b38] text-xs px-2 py-1 rounded-full font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Right section - Actions */}
          <div className="flex items-center gap-4 flex-shrink-0">
            <button className="text-gray-400 hover:text-[#f26b38] transition-colors p-2">
              <Bookmark className="h-5 w-5" />
            </button>
            <button className="bg-[#f26b38] hover:bg-[#e55a2b] text-white px-6 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap">
              Ứng Tuyển
            </button>
          </div>
        </div>
      ) : (
        <div className="p-6 flex flex-col h-full">
          {/* Header Section */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3 flex-1 min-w-0">
              <div className="flex-shrink-0">
                <img
                  src={job.logo}
                  alt={job.company}
                  className="w-12 h-12 rounded-lg object-cover"
                  onError={handleImageError}
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-semibold text-gray-900 group-hover:text-[#f26b38] transition-colors text-base line-clamp-1">
                    {job.title}
                  </h3>
                  {job.urgent && (
                    <span className="bg-red-100 text-red-700 text-xs px-2 py-1 rounded-full font-medium">
                      URGENT
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-600 line-clamp-1">
                  {job.company}
                </p>
              </div>
            </div>
            <button className="text-gray-400 hover:text-[#f26b38] transition-colors flex-shrink-0 p-1">
              <Bookmark className="h-5 w-5" />
            </button>
          </div>

          {/* Content Section - Fixed height for alignment */}
          <div className="flex-1 flex flex-col justify-between">
            <div className="space-y-3 mb-4">
              <div className="flex items-center text-sm text-gray-600">
                <MapPin className="h-4 w-4 mr-2 text-gray-400 flex-shrink-0" />
                <span className="line-clamp-1">{job.location}</span>
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <DollarSign className="h-4 w-4 mr-2 text-gray-400 flex-shrink-0" />
                <span className="line-clamp-1">{job.salary}</span>
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <Clock className="h-4 w-4 mr-2 text-gray-400 flex-shrink-0" />
                <span className="line-clamp-1">{job.posted}</span>
              </div>
            </div>

            {/* Tags Section - Fixed height */}
            <div className="mb-4">
              <div className="flex flex-wrap gap-2 min-h-[32px] items-start">
                {job.tags.slice(0, 3).map((tag: string) => (
                  <span
                    key={tag}
                    className="bg-orange-50 text-[#f26b38] text-xs px-2 py-1 rounded-full font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Footer Section */}
            <div className="flex items-center justify-between mt-auto pt-4">
              <span
                className={`text-xs px-3 py-1 rounded-full font-medium ${
                  job.type === "Toàn thời gian"
                    ? "bg-green-50 text-green-700"
                    : job.type === "Bán thời gian"
                    ? "bg-blue-50 text-blue-700"
                    : job.type === "Hợp đồng"
                    ? "bg-purple-50 text-purple-700"
                    : "bg-gray-100 text-gray-700"
                }`}
              >
                {job.type}
              </span>
              <button className="bg-[#f26b38] hover:bg-[#e55a2b] text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                Ứng Tuyển
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <BreadcrumbTabActive items={[{ name: "Việc làm" }]} />
        </div>

        {/* Search Section */}
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-4">
            <div className="md:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder="Tên công việc, kỹ năng hoặc công ty"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#f26b38] focus:border-[#f26b38] outline-none"
                  value={filters.keyword}
                  onChange={(e) => {
                    setFilters({ ...filters, keyword: e.target.value });
                    setCurrentPage(1);
                  }}
                />
              </div>
            </div>
            <div className="relative">
              <select
                className="w-full py-3 px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#f26b38] focus:border-[#f26b38] outline-none custom-select appearance-none bg-white"
                value={filters.location}
                onChange={(e) => {
                  setFilters({ ...filters, location: e.target.value });
                  setCurrentPage(1);
                }}
              >
                <option value="">Tất cả địa điểm</option>
                <option value="ho-chi-minh">TP. Hồ Chí Minh</option>
                <option value="hanoi">Hà Nội</option>
                <option value="da-nang">Đà Nẵng</option>
                <option value="can-tho">Cần Thơ</option>
                <option value="làm từ xa">Làm từ xa</option>
              </select>
            </div>
            <div className="relative">
              <select
                className="w-full py-3 px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#f26b38] focus:border-[#f26b38] outline-none custom-select appearance-none bg-white"
                value={filters.industry}
                onChange={(e) => {
                  setFilters({ ...filters, industry: e.target.value });
                  setCurrentPage(1);
                }}
              >
                <option value="">Chọn ngành nghề</option>
                <option value="it">Công nghệ thông tin</option>
                <option value="marketing">Marketing & Truyền thông</option>
                <option value="finance">Tài chính & Kế toán</option>
                <option value="hr">Nhân sự</option>
                <option value="sales">Kinh doanh & Bán hàng</option>
                <option value="design">Thiết kế</option>
                <option value="education">Giáo dục</option>
                <option value="healthcare">Y tế & Chăm sóc sức khỏe</option>
                <option value="manufacturing">Sản xuất & Chế tạo</option>
                <option value="logistics">Vận tải & Logistics</option>
              </select>
            </div>
            <div>
              <button
                onClick={handleSearch}
                className="w-full bg-[#f26b38] hover:bg-[#e55a2b] text-white py-3 px-6 rounded-lg font-medium transition-colors flex items-center justify-center"
              >
                <Search className="h-5 w-5 mr-2" />
                Tìm Kiếm
              </button>
            </div>
          </div>
        </div>

        {/* Active Filters Summary */}
        {(filters.keyword ||
          filters.location ||
          filters.industry ||
          advancedFilters.experienceLevels.length > 0 ||
          advancedFilters.salaryRanges.length > 0 ||
          advancedFilters.jobTypes.length > 0 ||
          advancedFilters.industries.length > 0) && (
          <div className="bg-white rounded-lg shadow-sm border p-4 mb-8">
            <div className="flex items-center justify-between">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-sm font-medium text-gray-700 mr-2">
                  Bộ lọc đang áp dụng:
                </span>
                {filters.keyword && (
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    &quot;{filters.keyword}&quot;
                    <button
                      onClick={() => setFilters({ ...filters, keyword: "" })}
                      className="ml-1 hover:text-blue-600"
                    >
                      ×
                    </button>
                  </span>
                )}
                {filters.location && (
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    Địa điểm:{" "}
                    {filters.location.charAt(0).toUpperCase() +
                      filters.location.slice(1).replace(/-/g, " ")}
                    <button
                      onClick={() => setFilters({ ...filters, location: "" })}
                      className="ml-1 hover:text-green-600"
                    >
                      ×
                    </button>
                  </span>
                )}
                {filters.industry && (
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                    Ngành:{" "}
                    {filters.industry === "it"
                      ? "Công nghệ thông tin"
                      : filters.industry}
                    <button
                      onClick={() => setFilters({ ...filters, industry: "" })}
                      className="ml-1 hover:text-purple-600"
                    >
                      ×
                    </button>
                  </span>
                )}
                {advancedFilters.experienceLevels.map((level) => (
                  <span
                    key={level}
                    className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-800"
                  >
                    {level}
                    <button
                      onClick={() =>
                        toggleAdvancedFilter("experienceLevels", level)
                      }
                      className="ml-1 hover:text-orange-600"
                    >
                      ×
                    </button>
                  </span>
                ))}
                {advancedFilters.salaryRanges.map((range) => (
                  <span
                    key={range}
                    className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800"
                  >
                    {range}
                    <button
                      onClick={() =>
                        toggleAdvancedFilter("salaryRanges", range)
                      }
                      className="ml-1 hover:text-yellow-600"
                    >
                      ×
                    </button>
                  </span>
                ))}
                {advancedFilters.jobTypes.map((type) => (
                  <span
                    key={type}
                    className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800"
                  >
                    {type}
                    <button
                      onClick={() => toggleAdvancedFilter("jobTypes", type)}
                      className="ml-1 hover:text-indigo-600"
                    >
                      ×
                    </button>
                  </span>
                ))}
                {advancedFilters.industries.map((industry) => (
                  <span
                    key={industry}
                    className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-pink-100 text-pink-800"
                  >
                    {industry}
                    <button
                      onClick={() =>
                        toggleAdvancedFilter("industries", industry)
                      }
                      className="ml-1 hover:text-pink-600"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
              <button
                onClick={clearAllFilters}
                className="text-sm text-red-600 hover:text-red-800 font-medium"
              >
                Xóa tất cả
              </button>
            </div>
          </div>
        )}

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Filters */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border p-6 sticky top-24 max-h-[calc(100vh-8rem)] overflow-y-auto custom-scrollbar">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-semibold text-lg">Bộ Lọc</h3>
                {(advancedFilters.experienceLevels.length > 0 ||
                  advancedFilters.salaryRanges.length > 0 ||
                  advancedFilters.jobTypes.length > 0 ||
                  advancedFilters.industries.length > 0) && (
                  <span className="bg-[#f26b38] text-white text-xs px-2 py-1 rounded-full">
                    {advancedFilters.experienceLevels.length +
                      advancedFilters.salaryRanges.length +
                      advancedFilters.jobTypes.length +
                      advancedFilters.industries.length}
                  </span>
                )}
              </div>
              <div className="space-y-6">
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">
                    Kinh Nghiệm
                  </h4>
                  <div className="space-y-3">
                    {["Không yêu cầu", "1-2 năm", "3-5 năm", "5+ năm"].map(
                      (level) => (
                        <label
                          key={level}
                          className="flex items-center space-x-3 cursor-pointer hover:bg-gray-50 p-2 rounded-md transition-colors"
                        >
                          <input
                            type="checkbox"
                            checked={advancedFilters.experienceLevels.includes(
                              level
                            )}
                            onChange={() =>
                              toggleAdvancedFilter("experienceLevels", level)
                            }
                            className="rounded border-gray-300 text-[#f26b38] focus:ring-[#f26b38] focus:ring-offset-0"
                          />
                          <span className="text-sm text-gray-700">{level}</span>
                        </label>
                      )
                    )}
                  </div>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Mức Lương</h4>
                  <div className="space-y-3">
                    {[
                      "5-10 triệu",
                      "10-20 triệu",
                      "20-30 triệu",
                      "30+ triệu",
                    ].map((range) => (
                      <label
                        key={range}
                        className="flex items-center space-x-3 cursor-pointer hover:bg-gray-50 p-2 rounded-md transition-colors"
                      >
                        <input
                          type="checkbox"
                          checked={advancedFilters.salaryRanges.includes(range)}
                          onChange={() =>
                            toggleAdvancedFilter("salaryRanges", range)
                          }
                          className="rounded border-gray-300 text-[#f26b38] focus:ring-[#f26b38] focus:ring-offset-0"
                        />
                        <span className="text-sm text-gray-700">{range}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">
                    Loại Công Việc
                  </h4>
                  <div className="space-y-3">
                    {[
                      "Toàn thời gian",
                      "Bán thời gian",
                      "Hợp đồng",
                      "Freelance",
                    ].map((type) => (
                      <label
                        key={type}
                        className="flex items-center space-x-3 cursor-pointer hover:bg-gray-50 p-2 rounded-md transition-colors"
                      >
                        <input
                          type="checkbox"
                          checked={advancedFilters.jobTypes.includes(type)}
                          onChange={() =>
                            toggleAdvancedFilter("jobTypes", type)
                          }
                          className="rounded border-gray-300 text-[#f26b38] focus:ring-[#f26b38] focus:ring-offset-0"
                        />
                        <span className="text-sm text-gray-700">{type}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Ngành Nghề</h4>
                  <div className="space-y-3">
                    {[
                      "Công nghệ thông tin",
                      "Marketing & Truyền thông",
                      "Tài chính & Kế toán",
                      "Thiết kế",
                      "Kinh doanh & Bán hàng",
                    ].map((industry) => (
                      <label
                        key={industry}
                        className="flex items-center space-x-3 cursor-pointer hover:bg-gray-50 p-2 rounded-md transition-colors"
                      >
                        <input
                          type="checkbox"
                          checked={advancedFilters.industries.includes(
                            industry
                          )}
                          onChange={() =>
                            toggleAdvancedFilter("industries", industry)
                          }
                          className="rounded border-gray-300 text-[#f26b38] focus:ring-[#f26b38] focus:ring-offset-0"
                        />
                        <span className="text-sm text-gray-700">
                          {industry}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
                <button
                  onClick={clearAllFilters}
                  className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-4 rounded-lg font-medium transition-colors"
                >
                  Xóa Bộ Lọc
                </button>
              </div>
            </div>
          </div>

          {/* Jobs List */}
          <div className="lg:col-span-3">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-1">
                  Việc Làm
                  <span className="bg-orange-100 text-[#f26b38] text-sm font-medium px-2 py-1 rounded-full ml-3">
                    {sortBy === "newest" ? "Mới nhất" : 
                     sortBy === "salary-high" ? "Lương cao" :
                     sortBy === "salary-low" ? "Lương thấp" : "Liên quan"}
                  </span>
                </h2>
                <p className="text-gray-600">
                  Tìm thấy {sortedJobs.length} công việc phù hợp
                  <span className="text-sm text-gray-500 ml-2">(3 việc làm mỗi hàng)</span>
                </p>
              </div>
              <div className="flex items-center space-x-4">
                {/* Sort Dropdown với Icon */}
                <div className="flex items-center gap-2">
                  <ArrowUpDown className="h-4 w-4 text-gray-500" />
                  <span className="text-sm text-gray-700">Sắp xếp:</span>
                  <select 
                    className="py-2 px-3 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#f26b38] focus:border-[#f26b38] outline-none custom-select appearance-none bg-white min-w-[180px]"
                    value={sortBy}
                    onChange={(e) => {
                      setSortBy(e.target.value);
                      setCurrentPage(1);
                    }}
                  >
                    <option value="newest">Mới nhất</option>
                    <option value="salary-high">Lương: Cao đến thấp</option>
                    <option value="salary-low">Lương: Thấp đến cao</option>
                    <option value="relevant">Liên quan nhất</option>
                  </select>
                </div>
                
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

            {/* Jobs Grid/List - Layout 3 hàng */}
            <div
              className={
                viewMode === "grid"
                  ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr"
                  : "space-y-4"
              }
            >
              {currentJobs.map((job) => (
                <JobCard key={job.id} job={job} mode={viewMode} />
              ))}
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between mt-8">
              <div className="text-sm text-gray-600">
                Hiển thị {startIndex + 1}-
                {Math.min(startIndex + jobsPerPage, sortedJobs.length)} của{" "}
                {sortedJobs.length} công việc
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobsPage;