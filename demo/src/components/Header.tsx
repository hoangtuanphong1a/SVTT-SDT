import React, { useState } from "react";
import { Button } from "./ui/button";
import { 
  Menu, 
  X, 
  ChevronDown,
  Bell,
  Calculator,
  Video,
  Star,
  BarChart3,
  PlusCircle,
  Search,
  User,
  Settings,
  LogOut,
  Briefcase
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "./ui/dropdown-menu";

interface HeaderProps {
  navigate: (page: string) => void;
  currentPage: string;
}

export function Header({ navigate, currentPage }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { 
      name: "Việc làm", 
      page: "jobs", 
      hasDropdown: false 
    },
    { 
      name: "Công ty", 
      page: "companies", 
      hasDropdown: false 
    },
    { 
      name: "Mẫu CV", 
      page: "cv-template", 
      hasDropdown: false 
    },
    {
      name: "Công cụ",
      hasDropdown: true,
      dropdownItems: [
        { name: "Thông báo việc làm", page: "job-alerts", icon: Bell },
        { name: "Tính lương", page: "salary-calculator", icon: Calculator },
        { name: "Chuẩn bị phỏng vấn", page: "interview-prep", icon: Video },
        { name: "Đánh giá công ty", page: "company-reviews", icon: Star },
        { name: "Phân tích thị trường", page: "analytics", icon: BarChart3 }
      ]
    },
    { 
      name: "Blog", 
      page: "blog", 
      hasDropdown: false 
    }
  ];

  const NavItem = ({ item }: { item: any }) => {
    if (item.hasDropdown) {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center space-x-1 text-gray-700 hover:text-orange-primary transition-colors">
              <span>{item.name}</span>
              <ChevronDown className="h-4 w-4" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-56">
            {item.dropdownItems.map((dropdownItem: any, index: number) => (
              <DropdownMenuItem
                key={index}
                onClick={() => navigate(dropdownItem.page)}
                className="flex items-center space-x-3 cursor-pointer"
              >
                <dropdownItem.icon className="h-4 w-4 text-gray-500" />
                <span>{dropdownItem.name}</span>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      );
    }

    return (
      <button
        onClick={() => navigate(item.page)}
        className={`text-gray-700 hover:text-orange-primary transition-colors ${
          currentPage === item.page ? "text-orange-primary font-medium" : ""
        }`}
      >
        {item.name}
      </button>
    );
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <button
              onClick={() => navigate("home")}
              className="flex items-center space-x-2"
            >
              <div className="w-10 h-10 bg-gradient-to-r from-orange-primary to-orange-600 rounded-lg flex items-center justify-center">
                <Briefcase className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">CV King</span>
            </button>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item, index) => (
              <NavItem key={index} item={item} />
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <Button
              variant="outline"
              onClick={() => navigate("cv-builder")}
              className="flex items-center space-x-2"
            >
              <PlusCircle className="h-4 w-4" />
              <span>Tạo CV</span>
            </Button>

            <Button
              onClick={() => navigate("post-job")}
              className="bg-orange-primary hover:bg-orange-600 flex items-center space-x-2"
            >
              <PlusCircle className="h-4 w-4" />
              <span>Đăng tuyển</span>
            </Button>

            {/* User Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm">
                  <User className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem onClick={() => navigate("job-seeker-dashboard")}>
                  <User className="h-4 w-4 mr-2" />
                  Dashboard ứng viên
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate("employer-dashboard")}>
                  <Briefcase className="h-4 w-4 mr-2" />
                  Dashboard nhà tuyển dụng
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => navigate("job-alerts")}>
                  <Bell className="h-4 w-4 mr-2" />
                  Thông báo việc làm
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="h-4 w-4 mr-2" />
                  Cài đặt
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => navigate("login")}>
                  <LogOut className="h-4 w-4 mr-2" />
                  Đăng nhập
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden"
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6 text-gray-600" />
            ) : (
              <Menu className="h-6 w-6 text-gray-600" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4">
            <nav className="space-y-4">
              {navItems.map((item, index) => (
                <div key={index}>
                  {item.hasDropdown ? (
                    <div>
                      <p className="font-medium text-gray-900 mb-2">{item.name}</p>
                      <div className="space-y-2 pl-4">
                        {item.dropdownItems.map((dropdownItem: any, subIndex: number) => (
                          <button
                            key={subIndex}
                            onClick={() => {
                              navigate(dropdownItem.page);
                              setIsMobileMenuOpen(false);
                            }}
                            className="flex items-center space-x-3 text-gray-600 hover:text-orange-primary transition-colors w-full text-left"
                          >
                            <dropdownItem.icon className="h-4 w-4" />
                            <span>{dropdownItem.name}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <button
                      onClick={() => {
                        navigate(item.page);
                        setIsMobileMenuOpen(false);
                      }}
                      className={`block text-gray-700 hover:text-orange-primary transition-colors ${
                        currentPage === item.page ? "text-orange-primary font-medium" : ""
                      }`}
                    >
                      {item.name}
                    </button>
                  )}
                </div>
              ))}
              
              <div className="pt-4 border-t border-gray-200 space-y-3">
                <Button
                  variant="outline"
                  onClick={() => {
                    navigate("cv-builder");
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full justify-center"
                >
                  <PlusCircle className="h-4 w-4 mr-2" />
                  Tạo CV
                </Button>
                <Button
                  onClick={() => {
                    navigate("post-job");
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full bg-orange-primary hover:bg-orange-600 justify-center"
                >
                  <PlusCircle className="h-4 w-4 mr-2" />
                  Đăng tuyển
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}