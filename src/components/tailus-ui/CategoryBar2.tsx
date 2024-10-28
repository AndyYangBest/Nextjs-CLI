import {
  ResponsiveContainer,
  BarChart,
  Bar,
  YAxis,
  XAxis,
  Legend,
} from "recharts";
import { useState } from "react";
import { legendText } from "@tailus-ui/visualizations";
import { Title, Text } from "@tailus-ui/typography";
import { Card } from "@/components/ui/card";

const useOpacity = () => {
  const [opacity, setOpacity] = useState({
    Running: 1,
    Swimming: 1,
    Cycling: 1,
    Weightlifting: 1,
    Yoga: 1,
    Pilates: 1,
    Boxing: 1,
  });

  const handleMouseEnter = (o) => {
    const { dataKey } = o;
    setOpacity((op) => {
      const newOpacity = { ...op };
      Object.keys(newOpacity).forEach((key) => {
        newOpacity[key] = key === dataKey ? 1 : 0.25;
      });
      return newOpacity;
    });
  };

  const handleMouseLeave = () => {
    setOpacity({
      Running: 1,
      Swimming: 1,
      Cycling: 1,
      Weightlifting: 1,
      Yoga: 1,
      Pilates: 1,
      Boxing: 1,
    });
  };

  return { opacity, handleMouseEnter, handleMouseLeave };
};

const barData = [
  {
    name: "Running",
    uv: 31.47,
    pv: 2400,
    fill: "var(--dv-primary-900)",
  },
  {
    name: "Swimming",
    uv: 26.69,
    pv: 4567,
    fill: "var(--dv-primary-600)",
  },
  {
    name: "Weightlifting",
    uv: 8.22,
    pv: 9800,
    fill: "var(--dv-primary-300)",
  },
];

export const categoryBarData = [
  {
    name: "consumption",
    Running: 2400,
    Swimming: 4567,
    Cycling: 1398,
    Weightlifting: 9800,
    Yoga: 3908,
    Pilates: 4800,
    Boxing: 4800,
  },
];

export const CategoryBar2 = () => {
  const { opacity, handleMouseEnter, handleMouseLeave } = useOpacity();

  return (
    <Card className="p-6">
      <div>
        <Title as="div" size="lg" weight="medium">
          Data usage
        </Title>
        <Text size="sm" className="mb-0 mt-1">
          New users by First user primary channel group
        </Text>
      </div>
      <div className="-ml-1 h-20">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart layout="vertical" data={categoryBarData}>
            <YAxis
              hide
              fontSize={12}
              axisLine={false}
              type="category"
              scale="band"
              dataKey="name"
            />
            <XAxis
              hide
              fontSize={12}
              tickLine={false}
              axisLine={false}
              type="number"
            />
            <Legend
              formatter={legendText}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              align="left"
              iconType="circle"
              iconSize={8}
            />
            {barData.map((entry, index) => (
              <Bar
                key={`bar-${index}`}
                className="transition-all delay-75"
                radius={
                  index === 0
                    ? [4, 0, 0, 4]
                    : index === barData.length - 1
                    ? [0, 4, 4, 0]
                    : 0
                }
                fill={entry.fill}
                dataKey={entry.name}
                opacity={opacity[entry.name]}
                barSize={16}
                stackId="category"
              />
            ))}
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};

export default CategoryBar2;
