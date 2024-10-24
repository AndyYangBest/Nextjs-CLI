"use client";

import {
  Bar,
  ComposedChart,
  Line,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";

const data = [
  {
    name: "Q1",
    performance: 4000,
    target: 2400,
    efficiency: 80,
  },
  // ... 添加更多季度数据
];

export function PerformanceChart() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <ComposedChart data={data}>
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="performance" fill="#8884d8" />
        <Bar dataKey="target" fill="#82ca9d" />
        <Line type="monotone" dataKey="efficiency" stroke="#ff7300" />
      </ComposedChart>
    </ResponsiveContainer>
  );
}
