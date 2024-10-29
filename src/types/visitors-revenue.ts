// src/types/visitors-revenue.ts

export interface VisitorsRevenueStats {
  visitors: {
    count: number;
    change: number;
  };
  revenue: {
    count: number;
    change: number;
  };
  savings: {
    count: number;
    change: number;
  };
}

export interface ChartDataPoint {
  month: string;
  Primary: number;
  Accent: number;
  Neutral: number;
}

export interface VisitorsRevenueData {
  stats: VisitorsRevenueStats;
  chartData: ChartDataPoint[];
}
