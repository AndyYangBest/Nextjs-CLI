import {
  CustomTooltip,
  LinearGradient,
  barData,
} from "@tailus-ui/visualizations";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  Tooltip,
  YAxis,
  XAxis,
  CartesianGrid,
} from "recharts";
import { Caption, Link, Text, Title } from "@tailus-ui/typography";
import Badge from "@tailus-ui/Badge";
import { Lightbulb, TrendingDown, TrendingUp } from "lucide-react";
import Banner from "@tailus-ui/Banner";
import { Card } from "@/components/ui/card";

export const AreaChartWidget = () => {
  return (
    <Card className="p-6">
      <Title as="h2" size="lg" weight="medium" className="mb-1">
        Visitors and Revenue
      </Title>
      <Text className="mb-0 mt-1" size="sm">
        New users by First user primary channel group (Default Channel Group)
      </Text>

      <div className="my-6 grid max-w-2xl grid-cols-3 gap-6 divide-y border-y py-6 sm:divide-x sm:divide-y-0">
        <div>
          <Caption as="span">Visitors</Caption>
          <Title
            className="mt-2 flex items-center gap-3"
            as="span"
            weight="medium"
            size="lg"
          >
            56493
            <Badge
              intent="success"
              size="xs"
              className="flex h-fit items-center gap-1.5"
            >
              <TrendingUp className="size-3.5" />
              36%
            </Badge>
          </Title>
        </div>

        <div className="px-6">
          <Caption as="span">Revenue</Caption>
          <Title
            className="mt-2 flex items-center gap-3"
            as="span"
            weight="medium"
            size="lg"
          >
            $4300
            <Badge
              intent="danger"
              size="xs"
              className="flex h-fit items-center gap-1.5"
            >
              <TrendingDown className="size-3.5" />
              36%
            </Badge>
          </Title>
        </div>

        <div className="pl-6">
          <Caption as="span">Savings</Caption>
          <Title
            className="mt-2 flex items-center gap-3"
            as="span"
            weight="medium"
            size="lg"
          >
            $1300
            <Badge
              intent="success"
              size="xs"
              className="flex h-fit items-center gap-1.5"
            >
              <TrendingUp className="size-3.5" />
              6%
            </Badge>
          </Title>
        </div>
      </div>
      <div className="h-56 w-full sm:h-72 sm:max-w-xl">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={barData}>
            <defs>
              <LinearGradient id="Primary" intent={"primary" as const} />
              <LinearGradient id="Accent" intent={"accent" as const} />
            </defs>
            <YAxis
              className="text-caption"
              width={40}
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <XAxis
              className="text-caption"
              dataKey="name"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <Tooltip
              cursor={{
                stroke: "var(--ui-border-color)",
                strokeWidth: 1,
              }}
              content={
                <CustomTooltip payload={[]} mixed active={false} label={""} />
              }
            />

            <CartesianGrid
              horizontal={false}
              stroke="var(--ui-border-color)"
              strokeDasharray={3}
            />

            <Area
              type="natural"
              fill="url(#Accent)"
              stroke="var(--dv-accent)"
              dataKey="Neutral"
              activeDot={{
                color: "var(--dv-accent)",
                r: 4,
                stroke: "var(--ui-bg)",
                strokeWidth: 2,
              }}
            />

            <Area
              type="natural"
              fill="url(#Primary)"
              stroke="var(--dv-primary)"
              dataKey="Primary"
              activeDot={{
                color: "var(--dv-primary)",
                r: 4,
                stroke: "var(--ui-bg)",
                strokeWidth: 2,
              }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-6">
        <Banner.Root intent="gray">
          <Lightbulb className="size-6 -mt-px text-[--body-text-color]" />
          <Banner.Content>
            <p className="my-0 text-sm font-normal text-[--body-text-color]">
              On August 12 you had 987 Sessions where we anticipated 1,242,
              which is 20% less than expected.{" "}
              <a
                href="#"
                className="text-sm font-normal text-[--body-text-color] underline decoration-gray-600/50 transition hover:text-gray-950 dark:decoration-gray-400/50 dark:hover:text-white"
              >
                View Anomaly
              </a>
            </p>
          </Banner.Content>
        </Banner.Root>
      </div>
    </Card>
  );
};

export default AreaChartWidget;
