import React from "react";
import { HeroSection } from "../HeroSection";
import { FeaturedJobs } from "../FeaturedJobs";
import { FeaturedCompanies } from "../FeaturedCompanies";
import { BlogPreview } from "../BlogPreview";
import { CTASection } from "../CTASection";

interface HomepageProps {
  navigate: (page: string, id?: string) => void;
}

export default function Homepage({ navigate }: HomepageProps) {
  return (
    <div className="min-h-screen">
      <HeroSection navigate={navigate} />
      <FeaturedJobs navigate={navigate} />
      <FeaturedCompanies navigate={navigate} />
      <BlogPreview navigate={navigate} />
      <CTASection navigate={navigate} />
    </div>
  );
}