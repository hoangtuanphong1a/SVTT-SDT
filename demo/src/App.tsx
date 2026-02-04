import React, { useState } from "react";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { Toaster } from "./components/ui/sonner";

// Import all page components
import Homepage from "./components/pages/Homepage";
import JobsPage from "./components/JobsPage";
import JobDetailPage from "./components/pages/JobDetailPage";
import CompaniesPage from "./components/pages/CompaniesPage";
import CompanyDetailPage from "./components/pages/CompanyDetailPage";
import CVBuilderPage from "./components/pages/CVBuilderPage";
import PostJobPage from "./components/pages/PostJobPage";
import BlogPage from "./components/pages/BlogPage";
import BlogDetailPage from "./components/pages/BlogDetailPage";
import LoginPage from "./components/pages/LoginPage";
import RegisterPage from "./components/pages/RegisterPage";
import JobSeekerDashboard from "./components/pages/JobSeekerDashboard";
import EmployerDashboard from "./components/pages/EmployerDashboard";
import AboutPage from "./components/pages/AboutPage";
import ContactPage from "./components/pages/ContactPage";
import AnalyticsPage from "./components/pages/AnalyticsPage";

// Import new feature pages
import JobAlertsPage from "./components/pages/JobAlertsPage";
import SalaryCalculatorPage from "./components/pages/SalaryCalculatorPage";
import InterviewPrepPage from "./components/pages/InterviewPrepPage";
import CompanyReviewsPage from "./components/pages/CompanyReviewsPage";
import CVTemplatePage from "./components/pages/CVTemplatePage";
import CVEditorPage from "./components/pages/CVEditorPage";

export default function App() {
  // Simple routing state - in real app would use React Router
  const [currentPage, setCurrentPage] = useState("home");
  const [selectedJobId, setSelectedJobId] = useState<string | null>(null);
  const [selectedCompanyId, setSelectedCompanyId] = useState<string | null>(null);
  const [selectedBlogId, setSelectedBlogId] = useState<string | null>(null);
  const [selectedTemplateId, setSelectedTemplateId] = useState<string | null>(null);

  // Navigation function
  const navigate = (page: string, id?: string) => {
    setCurrentPage(page);
    if (page === "job-detail") setSelectedJobId(id || null);
    if (page === "company-detail") setSelectedCompanyId(id || null);
    if (page === "blog-detail") setSelectedBlogId(id || null);
    if (page === "cv-editor") setSelectedTemplateId(id || null);
  };

  // Render current page
  const renderCurrentPage = () => {
    switch (currentPage) {
      case "home":
        return <Homepage navigate={navigate} />;
      case "jobs":
        return <JobsPage navigate={navigate} />;
      case "job-detail":
        return <JobDetailPage jobId={selectedJobId} navigate={navigate} />;
      case "companies":
        return <CompaniesPage navigate={navigate} />;
      case "company-detail":
        return <CompanyDetailPage companyId={selectedCompanyId} navigate={navigate} />;
      case "cv-builder":
        return <CVBuilderPage navigate={navigate} />;
      case "post-job":
        return <PostJobPage navigate={navigate} />;
      case "blog":
        return <BlogPage navigate={navigate} />;
      case "blog-detail":
        return <BlogDetailPage blogId={selectedBlogId} navigate={navigate} />;
      case "login":
        return <LoginPage navigate={navigate} />;
      case "register":
        return <RegisterPage navigate={navigate} />;
      case "job-seeker-dashboard":
        return <JobSeekerDashboard navigate={navigate} />;
      case "employer-dashboard":
        return <EmployerDashboard navigate={navigate} />;
      case "about":
        return <AboutPage navigate={navigate} />;
      case "contact":
        return <ContactPage navigate={navigate} />;
      case "analytics":
        return <AnalyticsPage navigate={navigate} />;
      case "job-alerts":
        return <JobAlertsPage navigate={navigate} />;
      case "salary-calculator":
        return <SalaryCalculatorPage navigate={navigate} />;
      case "interview-prep":
        return <InterviewPrepPage navigate={navigate} />;
      case "company-reviews":
        return <CompanyReviewsPage navigate={navigate} />;
      case "cv-template":
        return <CVTemplatePage navigate={navigate} />;
      case "cv-editor":
        return <CVEditorPage navigate={navigate} templateId={selectedTemplateId} />;
      default:
        return <Homepage navigate={navigate} />;
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Header navigate={navigate} currentPage={currentPage} />
      <main>
        {renderCurrentPage()}
      </main>
      <Footer navigate={navigate} />
      <Toaster />
    </div>
  );
}