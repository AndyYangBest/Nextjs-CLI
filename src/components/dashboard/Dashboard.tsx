import React from "react";
import { Responsive, WidthProvider } from "react-grid-layout";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { type DashboardItem, type Layout } from "@/types/dashboard";

import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";

const ResponsiveGridLayout = WidthProvider(Responsive);

interface DashboardProps {
  items: DashboardItem[];
  layout: Layout;
  onLayoutChange?: (layout: Layout) => void;
  className?: string;
}

const Dashboard: React.FC<DashboardProps> = ({
  items,
  layout,
  onLayoutChange,
  className,
}) => {
  return (
    <div className={cn("p-4", className)}>
      <ResponsiveGridLayout
        className="layout"
        layouts={{ lg: layout }}
        breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
        cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
        rowHeight={60}
        onLayoutChange={(_, allLayouts) => {
          if (allLayouts.lg) {
            onLayoutChange?.(allLayouts.lg);
          }
        }}
        // 启用紧凑布局
        compactType="vertical"
        // 防止布局溢出容器
        preventCollision={false}
        // 使用更小的margin来减少组件间距
        margin={[4, 4]}
        // 启用自动大小调整
        autoSize={true}
        // 允许组件重叠以实现更紧凑的布局
        allowOverlap={false}
        // 使用像素单位以获得更精确的控制
        useCSSTransforms={true}
        isDraggable
        isResizable
      >
        {items.map((item) => (
          <div key={item.id}>
            <Card className="h-full overflow-hidden">
              <div className="h-full p-4">
                <h3 className="mb-2 font-semibold">{item.title}</h3>
                <div className="h-[calc(100%-2rem)]">
                  {React.isValidElement(item.component) ? item.component : null}
                </div>
              </div>
            </Card>
          </div>
        ))}
      </ResponsiveGridLayout>
    </div>
  );
};

export default Dashboard;
