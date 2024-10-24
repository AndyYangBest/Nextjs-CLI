"use client";

import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Legend,
} from "recharts";

const data = [
  { subject: "Marketing", A: 120, B: 110, fullMark: 150 },
  { subject: "Sales", A: 98, B: 130, fullMark: 150 },
  { subject: "Development", A: 86, B: 130, fullMark: 150 },
  { subject: "Customer", A: 99, B: 100, fullMark: 150 },
  { subject: "Operations", A: 85, B: 90, fullMark: 150 },
];

export function MetricsRadar() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <RadarChart data={data}>
        <PolarGrid />
        <PolarAngleAxis dataKey="subject" />
        <PolarRadiusAxis />
        <Radar
          name="Target"
          dataKey="A"
          stroke="#8884d8"
          fill="#8884d8"
          fillOpacity={0.6}
        />
        <Radar
          name="Achieved"
          dataKey="B"
          stroke="#82ca9d"
          fill="#82ca9d"
          fillOpacity={0.6}
        />
        <Legend />
      </RadarChart>
    </ResponsiveContainer>
  );
}
