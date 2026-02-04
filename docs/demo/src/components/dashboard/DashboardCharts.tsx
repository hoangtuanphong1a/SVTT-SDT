import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import {
  SimpleBarChart,
  SimpleLineChart,
  SimplePieChart,
  SimpleAreaChart,
  ProgressBar,
  MetricCard,
  formatCurrency,
  formatNumber,
  chartColors
} from "../charts/ChartComponents";

// Sample usage of chart components for dashboards

export const JobSeekerCharts = () => {
  // Sample data for job seeker dashboard
  const applicationData = [
    { month: "Jan", applications: 3, interviews: 1, offers: 0 },
    { month: "Feb", applications: 5, interviews: 2, offers: 1 },
    { month: "Mar", applications: 4, interviews: 2, offers: 1 },
    { month: "Apr", applications: 6, interviews: 3, offers: 2 },
    { month: "May", applications: 8, interviews: 4, offers: 1 },
    { month: "Jun", applications: 7, interviews: 3, offers: 2 }
  ];

  const skillsData = [
    { skill: "React", proficiency: 85 },
    { skill: "JavaScript", proficiency: 90 },
    { skill: "TypeScript", proficiency: 75 },
    { skill: "Node.js", proficiency: 70 },
    { skill: "Python", proficiency: 60 }
  ];

  const profileViews = [
    { week: "Week 1", views: 45 },
    { week: "Week 2", views: 62 },
    { week: "Week 3", views: 58 },
    { week: "Week 4", views: 73 }
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Application Tracking */}
      <Card>
        <CardHeader>
          <CardTitle>Theo dõi ứng tuyển</CardTitle>
        </CardHeader>
        <CardContent>
          <SimpleLineChart
            data={applicationData}
            xKey="month"
            lines={[
              { key: "applications", name: "Đơn ứng tuyển", color: chartColors.primary },
              { key: "interviews", name: "Phỏng vấn", color: chartColors.blue },
              { key: "offers", name: "Offers", color: chartColors.accent }
            ]}
            height={250}
          />
        </CardContent>
      </Card>

      {/* Profile Views */}
      <Card>
        <CardHeader>
          <CardTitle>Lượt xem hồ sơ</CardTitle>
        </CardHeader>
        <CardContent>
          <SimpleAreaChart
            data={profileViews}
            xKey="week"
            yKey="views"
            color={chartColors.primary}
            height={250}
          />
        </CardContent>
      </Card>

      {/* Skills Proficiency */}
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle>Mức độ thành thạo kỹ năng</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {skillsData.map((skill, index) => (
              <ProgressBar
                key={index}
                label={skill.skill}
                value={skill.proficiency}
                maxValue={100}
                color={chartColors.primary}
                formatter={(v) => `${v}%`}
              />
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export const EmployerCharts = () => {
  // Sample data for employer dashboard
  const jobPerformanceData = [
    { job: "Frontend Dev", applications: 45, views: 320 },
    { job: "Backend Dev", applications: 38, views: 285 },
    { job: "Designer", applications: 29, views: 210 },
    { job: "PM", applications: 22, views: 165 },
    { job: "QA", applications: 18, views: 142 }
  ];

  const hiringFunnelData = [
    { stage: "Đơn ứng tuyển", count: 167 },
    { stage: "Sàng lọc", count: 89 },
    { stage: "Phỏng vấn", count: 34 },
    { stage: "Offer", count: 15 },
    { stage: "Tuyển dụng", count: 8 }
  ];

  const monthlyHiringData = [
    { month: "Jan", hired: 5, budget: 150000000 },
    { month: "Feb", hired: 3, budget: 120000000 },
    { month: "Mar", hired: 8, budget: 200000000 },
    { month: "Apr", hired: 6, budget: 180000000 },
    { month: "May", hired: 4, budget: 160000000 },
    { month: "Jun", hired: 7, budget: 210000000 }
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Job Performance */}
      <Card>
        <CardHeader>
          <CardTitle>Hiệu quả tin tuyển dụng</CardTitle>
        </CardHeader>
        <CardContent>
          <SimpleBarChart
            data={jobPerformanceData}
            xKey="job"
            yKey="applications"
            color={chartColors.primary}
            height={250}
          />
        </CardContent>
      </Card>

      {/* Hiring Funnel */}
      <Card>
        <CardHeader>
          <CardTitle>Phễu tuyển dụng</CardTitle>
        </CardHeader>
        <CardContent>
          <SimplePieChart
            data={hiringFunnelData}
            dataKey="count"
            nameKey="stage"
            height={250}
          />
        </CardContent>
      </Card>

      {/* Monthly Hiring Trends */}
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle>Xu hướng tuyển dụng theo tháng</CardTitle>
        </CardHeader>
        <CardContent>
          <SimpleLineChart
            data={monthlyHiringData}
            xKey="month"
            lines={[
              { key: "hired", name: "Số người tuyển", color: chartColors.primary },
              { key: "budget", name: "Ngân sách (triệu VND)", color: chartColors.blue }
            ]}
            height={300}
            formatter={(value, dataKey) => {
              if (dataKey === "budget") return formatCurrency(value);
              return formatNumber(value);
            }}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export const MarketInsightCharts = () => {
  // Sample market data
  const salaryBenchmarkData = [
    { position: "Junior Dev", market: 15000000, company: 16500000 },
    { position: "Mid Dev", market: 22000000, company: 24000000 },
    { position: "Senior Dev", market: 35000000, company: 38000000 },
    { position: "Tech Lead", market: 50000000, company: 52000000 }
  ];

  const competitorData = [
    { company: "Your Company", jobsPosted: 45, marketShare: 8.2 },
    { company: "Competitor A", jobsPosted: 78, marketShare: 14.1 },
    { company: "Competitor B", jobsPosted: 56, marketShare: 10.3 },
    { company: "Competitor C", jobsPosted: 34, marketShare: 6.2 },
    { company: "Others", jobsPosted: 287, marketShare: 61.2 }
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Salary Benchmark */}
      <Card>
        <CardHeader>
          <CardTitle>So sánh mức lương thị trường</CardTitle>
        </CardHeader>
        <CardContent>
          <SimpleBarChart
            data={salaryBenchmarkData}
            xKey="position"
            yKey="market"
            color={chartColors.blue}
            height={250}
            formatter={(value) => `${(value / 1000000).toFixed(0)}M`}
          />
        </CardContent>
      </Card>

      {/* Market Competition */}
      <Card>
        <CardHeader>
          <CardTitle>Thị phần tuyển dụng</CardTitle>
        </CardHeader>
        <CardContent>
          <SimplePieChart
            data={competitorData}
            dataKey="marketShare"
            nameKey="company"
            height={250}
          />
        </CardContent>
      </Card>
    </div>
  );
};

// Metric Cards for Quick Stats
export const QuickMetrics = ({ userType }: { userType: "job-seeker" | "employer" }) => {
  if (userType === "job-seeker") {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <MetricCard
          title="Hồ sơ được xem"
          value={1247}
          change="+12.5%"
          trend="up"
          formatter={formatNumber}
        />
        <MetricCard
          title="Đơn ứng tuyển"
          value={23}
          change="+3"
          trend="up"
          formatter={formatNumber}
        />
        <MetricCard
          title="Phỏng vấn"
          value={5}
          change="+2"
          trend="up"
          formatter={formatNumber}
        />
        <MetricCard
          title="Mức lương mong muốn"
          value={25000000}
          formatter={formatCurrency}
        />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <MetricCard
        title="Tin đăng tuyển"
        value={12}
        change="+3"
        trend="up"
        formatter={formatNumber}
      />
      <MetricCard
        title="Lượt xem"
        value={3450}
        change="+15.2%"
        trend="up"
        formatter={formatNumber}
      />
      <MetricCard
        title="Ứng viên"
        value={167}
        change="+28"
        trend="up"
        formatter={formatNumber}
      />
      <MetricCard
        title="Tuyển thành công"
        value={8}
        change="+2"
        trend="up"
        formatter={formatNumber}
      />
    </div>
  );
};

export default {
  JobSeekerCharts,
  EmployerCharts,
  MarketInsightCharts,
  QuickMetrics
};