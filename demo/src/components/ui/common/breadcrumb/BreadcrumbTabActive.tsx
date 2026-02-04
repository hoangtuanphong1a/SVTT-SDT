import React from 'react';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbItem {
  name: string;
  href?: string;
}

interface BreadcrumbTabActiveProps {
  items: BreadcrumbItem[];
}

const BreadcrumbTabActive: React.FC<BreadcrumbTabActiveProps> = ({ items }) => {
  return (
    <nav className="flex items-center space-x-2 text-sm text-gray-500 mb-4">
      <a href="/" className="flex items-center hover:text-[#f26b38] transition-colors">
        <Home className="h-4 w-4" />
      </a>
      
      {items.map((item, index) => (
        <React.Fragment key={index}>
          <ChevronRight className="h-4 w-4 text-gray-400" />
          {item.href ? (
            <a 
              href={item.href}
              className="hover:text-[#f26b38] transition-colors"
            >
              {item.name}
            </a>
          ) : (
            <span className="text-[#f26b38] font-medium">
              {item.name}
            </span>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
};

export default BreadcrumbTabActive;