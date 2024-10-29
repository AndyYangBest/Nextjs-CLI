import {
  ResponsiveContainer,
  BarChart,
  Bar,
  AreaChart,
  Area,
  LineChart,
  Line,
  RadialBarChart,
  RadialBar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PolarRadiusAxis,
} from "recharts";
import { TrendingUp, TrendingDown } from "lucide-react";
import { Card } from "@/components/ui/card";
import { generateRandomData } from "@/lib/data-generator";
import { CustomTooltip } from "@tailus-ui/visualizations";
import { Text, Title, Caption } from "@tailus-ui/typography";
import Badge from "@tailus-ui/Badge";
import { area } from "@tailus/themer";
import { RadialBarWidget as RadialBarWidget } from "@tailus-ui/RadialBarWidget";
import { CategoryBar as CategoryPieWidget } from "@tailus-ui/CategoryPieWidget";
import { CategoryBar2 as HorizontalBarWidget } from "@tailus-ui/CategoryBar2";
import { DomainRadarChart as RadarWidget } from "@tailus-ui/RadarWidget";
import { ScatterOverview as ScatterWidget } from "@tailus-ui/ScatterWidget";
import AreaChartWidget from "@tailus-ui/AreaChartWidget";
import BarChartWidget from "@tailus-ui/BarChartWidget";

// Visitors & Revenue Chart
export const VisitorsRevenue = () => {
  const data = generateRandomData("visitors-revenue");

  return (
    <Card className="w-full p-6">
      <div className="mb-6">
        <h2 className="mb-1 text-xl font-medium">Visitors and Revenue</h2>
        <p className="text-sm text-muted-foreground">
          New users by First user primary channel group
        </p>
      </div>

      <div className="my-6 grid grid-cols-1 gap-6 sm:grid-cols-3">
        <StatCard
          title="Visitors"
          value={data.stats.visitors.count.toLocaleString()}
          change={data.stats.visitors.change}
        />
        <StatCard
          title="Revenue"
          value={`$${data.stats.revenue.count.toLocaleString()}`}
          change={data.stats.revenue.change}
        />
        <StatCard
          title="Savings"
          value={`$${data.stats.savings.count.toLocaleString()}`}
          change={data.stats.savings.change}
        />
      </div>

      <div className="h-72 w-full">
        <ResponsiveContainer>
          <BarChart data={data.chartData}>
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="var(--border)"
            />
            <XAxis
              dataKey="name"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis fontSize={12} tickLine={false} axisLine={false} />
            <Tooltip />
            <Bar
              dataKey="Primary"
              fill="var(--dv-primary)"
              radius={[4, 4, 0, 0]}
            />
            <Bar
              dataKey="Accent"
              fill="var(--dv-accent)"
              radius={[4, 4, 0, 0]}
            />
            <Bar
              dataKey="Neutral"
              fill="var(--dv-neutral)"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};

// Crypto Line Chart Component
export const CryptoChart = () => {
  const data = generateRandomData("crypto-chart");

  return (
    <Card className="p-6">
      <Title as="h2" size="lg" weight="medium" className="mb-1">
        Overview
      </Title>
      <Text className="mb-0 mt-1" size="sm">
        Bitcoin Price History (6 months)
      </Text>

      <Title
        className="mt-2 flex items-center gap-3"
        as="span"
        weight="medium"
        size="xl"
      >
        185,267,931.00{" "}
        <span className="text-caption -ml-2 mb-1 mt-auto h-fit text-xs">
          CDF
        </span>
        <Badge
          intent="success"
          size="xs"
          className="flex h-fit items-center gap-1.5"
        >
          <TrendingUp className="size-3.5" />
          36%
        </Badge>
      </Title>

      <div className="mt-8 h-56 w-full sm:h-72" data-shade="900">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid vertical={false} stroke="var(--ui-border-color)" />
            <XAxis
              dataKey="date"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis width={42} fontSize={11} tickLine={false} axisLine={false} />
            <Tooltip
              content={<CustomTooltip payload={[]} mixed label={""} />}
            />
            <Line
              type="monotone"
              dataKey="price"
              stroke="var(--dv-primary)"
              strokeWidth={1.5}
              dot={false}
              activeDot={{
                r: 4,
                stroke: "var(--ui-bg)",
                strokeWidth: 2,
              }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};

// Small Area Charts
export const SmallCharts = () => {
  const data = generateRandomData("small-charts");

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      <SmallChart
        title="New Orders"
        value={data.orders.count}
        change={data.orders.change}
        data={data.orders.data}
        intent="primary"
        dataKey="Primary"
      />
      <SmallChart
        title="New Customers"
        value={data.customers.count}
        change={data.customers.change}
        data={data.customers.data}
        intent="accent"
        dataKey="Accent"
      />
    </div>
  );
};

// Helper Components
const StatCard = ({ title, value, change }) => (
  <div className="rounded-lg bg-muted/50 p-4">
    <span className="text-sm text-muted-foreground">{title}</span>
    <div className="mt-2 flex items-center gap-3">
      <span className="text-xl font-medium">{value}</span>
      <span
        className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs ${
          change >= 0
            ? "bg-success/20 text-success"
            : "bg-destructive/20 text-destructive"
        }`}
      >
        {change >= 0 ? (
          <TrendingUp className="h-3 w-3" />
        ) : (
          <TrendingDown className="h-3 w-3" />
        )}
        {Math.abs(change)}%
      </span>
    </div>
  </div>
);

const SmallChart = ({ title, value, change, data, intent, dataKey }) => (
  <Card className="p-4">
    <span className="text-sm text-muted-foreground">{title}</span>
    <div className="mt-2 flex items-center gap-3">
      <span className="text-xl font-medium">{value.toLocaleString()}</span>
      <span
        className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs ${
          change >= 0
            ? "bg-success/20 text-success"
            : "bg-destructive/20 text-destructive"
        }`}
      >
        {change >= 0 ? (
          <TrendingUp className="h-3 w-3" />
        ) : (
          <TrendingDown className="h-3 w-3" />
        )}
        {Math.abs(change)}%
      </span>
    </div>
    <div className="mt-4 h-24">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data}>
          <defs>
            <linearGradient
              id={`colorGradient-${title}`}
              x1="0"
              y1="0"
              x2="0"
              y2="1"
            >
              <stop
                offset="5%"
                stopColor={`var(--dv-${intent})`}
                stopOpacity={0.8}
              />
              <stop
                offset="95%"
                stopColor={`var(--dv-${intent})`}
                stopOpacity={0}
              />
            </linearGradient>
          </defs>
          <Area
            type="monotone"
            dataKey={dataKey}
            stroke={`var(--dv-${intent})`}
            fill={`url(#colorGradient-${title})`}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  </Card>
);

// Export default widgets config
export const defaultWidgets = [
  {
    id: "small-charts",
    title: "Key Metrics",
    component: <SmallCharts />,
    defaultSize: { w: 3, h: 4 },
  },
  {
    id: "visitors-revenue",
    title: "Visitors & Revenue",
    component: <VisitorsRevenue />,
    defaultSize: { w: 6, h: 9 },
  },
  {
    id: "crypto-chart",
    title: "Crypto Trends",
    component: <CryptoChart />,
    defaultSize: { w: 6, h: 8 },
  },

  {
    id: "radial-bar-chart",
    title: "Storage Distribution",
    component: <RadialBarWidget />,
    defaultSize: { w: 3, h: 6 },
  },
  {
    id: "category-pie-chart",
    title: "Activity Distribution",
    component: <CategoryPieWidget />,
    defaultSize: { w: 3, h: 7 },
  },
  {
    id: "horizontal-bar-chart",
    title: "Data Usage",
    component: <HorizontalBarWidget />,
    defaultSize: { w: 4, h: 4 },
  },
  {
    id: "radar-chart",
    title: "Performance Analysis",
    component: <RadarWidget />,
    defaultSize: { w: 3, h: 7 },
  },
  {
    id: "scatter-chart",
    title: "School Comparison",
    component: <ScatterWidget />,
    defaultSize: { w: 4, h: 7 },
  },
  {
    id: "area-chart",
    title: "Visitors & Revenue Overview",
    component: <AreaChartWidget />,
    defaultSize: { w: 3, h: 10 },
  },
  {
    id: "bar-chart",
    title: "Revenue Distribution",
    component: <BarChartWidget />,
    defaultSize: { w: 3, h: 7 },
  },
];
