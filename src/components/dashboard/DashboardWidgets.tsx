import { Overview } from "@/components/dashboard/overview";
import { RecentSales } from "@/components/dashboard/recent-sales";
import { type DashboardItem } from "@/types/dashboard";
import { PerformanceChart } from "@/components/dashboard/performance-chart";
import { MetricsRadar } from "@/components/dashboard/metrics-radar";
import { EngagementMetrics } from "@/components/dashboard/engagement-metrics";

export const defaultWidgets: DashboardItem[] = [
  {
    id: "overview",
    title: "Revenue Overview",
    component: <Overview />,
    defaultSize: { w: 8, h: 4 },
  },
  {
    id: "recent-sales",
    title: "Recent Sales",
    component: <RecentSales />,
    defaultSize: { w: 4, h: 4 },
  },
  {
    id: "performance",
    title: "Performance Metrics",
    component: <PerformanceChart />,
    defaultSize: { w: 6, h: 4 },
  },
  {
    id: "metrics-radar",
    title: "Department Metrics",
    component: <MetricsRadar />,
    defaultSize: { w: 6, h: 4 },
  },
  {
    id: "engagement",
    title: "Engagement Analytics",
    component: <EngagementMetrics />,
    defaultSize: { w: 12, h: 4 },
  },
];
