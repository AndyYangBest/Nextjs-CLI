import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { CustomTooltip } from "@tailus-ui/visualizations";
import { Card } from "@/components/ui/card";

// Sample radar data
const radarData = [
  {
    subject: "Math",
    A: 120,
    B: 110,
    fullMark: 150,
  },
  {
    subject: "Chinese",
    A: 98,
    B: 130,
    fullMark: 150,
  },
  {
    subject: "English",
    A: 86,
    B: 130,
    fullMark: 150,
  },
  {
    subject: "Geography",
    A: 99,
    B: 100,
    fullMark: 150,
  },
  {
    subject: "Physics",
    A: 85,
    B: 90,
    fullMark: 150,
  },
  {
    subject: "History",
    A: 65,
    B: 85,
    fullMark: 150,
  },
];

export const DomainRadarChart = () => {
  return (
    <Card className="p-6">
      <h2 className="mb-4 text-xl font-medium">Performance Analysis</h2>
      <div
        className="h-72 w-full max-w-xl text-[--ui-border-color]"
        data-shade="900"
      >
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
            <Tooltip content={<CustomTooltip active payload={[]} label="" />} />
            <PolarGrid stroke="currentColor" />
            <PolarAngleAxis
              fontSize={12}
              dataKey="subject"
              className="text-[--caption-text-color]"
            />
            <PolarRadiusAxis
              fontSize={12}
              tickLine={false}
              domain={[0, 150]}
              stroke="var(--caption-text-color)"
            />
            <Radar
              fill="var(--dv-accent)"
              stroke="var(--dv-accent)"
              fillOpacity={0.05}
              name="Lily"
              dataKey="B"
            />
            <Radar
              fill="var(--dv-primary)"
              stroke="var(--dv-primary)"
              fillOpacity={0.1}
              name="Mike"
              dataKey="A"
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};

export default DomainRadarChart;
