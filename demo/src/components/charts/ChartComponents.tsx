import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area
} from "recharts";

// Color palette
export const chartColors = {
  primary: "#f26b38",
  secondary: "#fef7f2", 
  accent: "#10b981",
  blue: "#3b82f6",
  purple: "#8b5cf6",
  amber: "#f59e0b",
  red: "#ef4444",
  cyan: "#06b6d4",
  lime: "#84cc16",
  orange: "#f97316"
};

export const colorPalette = Object.values(chartColors);

// Utility functions
export const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
    maximumFractionDigits: 0
  }).format(value);
};

export const formatNumber = (value: number) => {
  return new Intl.NumberFormat('vi-VN').format(value);
};

export const formatPercentage = (value: number) => {
  return `${value.toFixed(1)}%`;
};

// Reusable Chart Components
interface ChartProps {
  data: any[];
  height?: number;
  width?: string;
}

export const SimpleBarChart: React.FC<ChartProps & {
  xKey: string;
  yKey: string;
  color?: string;
  formatter?: (value: any) => string;
}> = ({ 
  data, 
  height = 300, 
  width = "100%", 
  xKey, 
  yKey, 
  color = chartColors.primary,
  formatter 
}) => (
  <ResponsiveContainer width={width} height={height}>
    <BarChart data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey={xKey} />
      <YAxis tickFormatter={formatter} />
      <Tooltip formatter={formatter ? (value: any) => [formatter(value), yKey] : undefined} />
      <Bar dataKey={yKey} fill={color} />
    </BarChart>
  </ResponsiveContainer>
);

export const SimpleLineChart: React.FC<ChartProps & {
  xKey: string;
  lines: Array<{
    key: string;
    name: string;
    color?: string;
  }>;
  formatter?: (value: any) => string;
}> = ({ 
  data, 
  height = 300, 
  width = "100%", 
  xKey, 
  lines,
  formatter 
}) => (
  <ResponsiveContainer width={width} height={height}>
    <LineChart data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey={xKey} />
      <YAxis tickFormatter={formatter} />
      <Tooltip formatter={formatter ? (value: any) => [formatter(value)] : undefined} />
      {lines.map((line, index) => (
        <Line 
          key={line.key}
          type="monotone" 
          dataKey={line.key} 
          stroke={line.color || colorPalette[index % colorPalette.length]}
          name={line.name}
        />
      ))}
    </LineChart>
  </ResponsiveContainer>
);

export const SimplePieChart: React.FC<ChartProps & {
  dataKey: string;
  nameKey: string;
  showLabels?: boolean;
}> = ({ 
  data, 
  height = 300, 
  width = "100%", 
  dataKey, 
  nameKey,
  showLabels = true 
}) => (
  <ResponsiveContainer width={width} height={height}>
    <PieChart>
      <Pie
        data={data}
        cx="50%"
        cy="50%"
        labelLine={false}
        label={showLabels ? ({ [nameKey]: name, [dataKey]: value }) => `${name}: ${value}` : false}
        outerRadius={80}
        fill="#8884d8"
        dataKey={dataKey}
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={colorPalette[index % colorPalette.length]} />
        ))}
      </Pie>
      <Tooltip />
    </PieChart>
  </ResponsiveContainer>
);

export const SimpleAreaChart: React.FC<ChartProps & {
  xKey: string;
  yKey: string;
  color?: string;
  formatter?: (value: any) => string;
}> = ({ 
  data, 
  height = 300, 
  width = "100%", 
  xKey, 
  yKey, 
  color = chartColors.primary,
  formatter 
}) => (
  <ResponsiveContainer width={width} height={height}>
    <AreaChart data={data}>
      <defs>
        <linearGradient id={`color-${yKey}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="5%" stopColor={color} stopOpacity={0.8}/>
          <stop offset="95%" stopColor={color} stopOpacity={0}/>
        </linearGradient>
      </defs>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey={xKey} />
      <YAxis tickFormatter={formatter} />
      <Tooltip formatter={formatter ? (value: any) => [formatter(value), yKey] : undefined} />
      <Area
        type="monotone"
        dataKey={yKey}
        stroke={color}
        fillOpacity={1}
        fill={`url(#color-${yKey})`}
      />
    </AreaChart>
  </ResponsiveContainer>
);

// Progress Bar Component
export const ProgressBar: React.FC<{
  label: string;
  value: number;
  maxValue: number;
  color?: string;
  showValue?: boolean;
  formatter?: (value: number) => string;
}> = ({ 
  label, 
  value, 
  maxValue, 
  color = chartColors.primary,
  showValue = true,
  formatter = (v) => v.toString()
}) => {
  const percentage = (value / maxValue) * 100;
  
  return (
    <div className="mb-4">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-gray-700">{label}</span>
        {showValue && (
          <span className="text-sm text-gray-600">{formatter(value)}</span>
        )}
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className="h-2 rounded-full transition-all duration-300"
          style={{ 
            width: `${Math.min(percentage, 100)}%`,
            backgroundColor: color
          }}
        />
      </div>
    </div>
  );
};

// Metric Card Component
export const MetricCard: React.FC<{
  title: string;
  value: string | number;
  change?: string;
  trend?: "up" | "down" | "neutral";
  icon?: React.ComponentType<{ className?: string }>;
  formatter?: (value: any) => string;
}> = ({ 
  title, 
  value, 
  change, 
  trend = "neutral", 
  icon: Icon,
  formatter = (v) => v.toString()
}) => {
  const getTrendColor = () => {
    switch (trend) {
      case "up": return "text-green-500";
      case "down": return "text-red-500";
      default: return "text-gray-500";
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg border">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-600 mb-1">{title}</p>
          <p className="text-2xl font-bold text-gray-900">
            {formatter(value)}
          </p>
          {change && (
            <p className={`text-sm font-medium mt-1 ${getTrendColor()}`}>
              {change}
            </p>
          )}
        </div>
        {Icon && (
          <div className="w-12 h-12 bg-orange-light rounded-lg flex items-center justify-center">
            <Icon className="h-6 w-6 text-orange-primary" />
          </div>
        )}
      </div>
    </div>
  );
};

// Chart Legend Component
export const ChartLegend: React.FC<{
  items: Array<{
    name: string;
    color: string;
    value?: string | number;
  }>;
}> = ({ items }) => (
  <div className="flex flex-wrap gap-4 mt-4">
    {items.map((item, index) => (
      <div key={index} className="flex items-center space-x-2">
        <div 
          className="w-3 h-3 rounded-full"
          style={{ backgroundColor: item.color }}
        />
        <span className="text-sm text-gray-600">
          {item.name}
          {item.value && ` (${item.value})`}
        </span>
      </div>
    ))}
  </div>
);

export default {
  SimpleBarChart,
  SimpleLineChart,
  SimplePieChart,
  SimpleAreaChart,
  ProgressBar,
  MetricCard,
  ChartLegend,
  chartColors,
  colorPalette,
  formatCurrency,
  formatNumber,
  formatPercentage
};