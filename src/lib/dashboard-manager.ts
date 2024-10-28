// src/lib/dashboard-manager.ts
import { nanoid } from "nanoid";
import {
  VisitorsRevenue,
  CryptoChart,
  RadialChart,
  SmallCharts,
  CategoryBar,
  DomainRadarChart,
  ScatterOverview,
  Simple as RadialBarWidget,
} from "@/components/dashboard/DashboardWidgets";
import { generateRandomData } from "@/lib/data-generator";
import type {
  ChartRegistry,
  LayoutConfig,
  LayoutItem,
  SavedDashboard,
} from "@/types/dashboard";

// 图表注册表
export const CHARTS: ChartRegistry = {
  v: {
    component: VisitorsRevenue,
    title: "Visitors & Revenue",
    size: [6, 9],
  },
  m: {
    component: SmallCharts,
    title: "Key Metrics",
    size: [3, 4],
  },
  p: {
    component: CategoryBar,
    title: "Categories",
    size: [3, 7],
  },
  c: {
    component: CryptoChart,
    title: "Crypto Trends",
    size: [6, 8],
  },
  r: {
    component: RadialChart,
    title: "Distribution",
    size: [3, 6],
  },
  d: {
    component: DomainRadarChart,
    title: "Performance",
    size: [3, 7],
  },
  s: {
    component: ScatterOverview,
    title: "Scatter Analysis",
    size: [4, 7],
  },
  t: {
    component: RadialBarWidget,
    title: "Storage",
    size: [3, 6],
  },
};

// 预设模板
export const TEMPLATES = {
  basic: "v-m-p",
  data: "c-r-s",
  full: "v-c-r-m-p-t",
} as const;

export class DashboardManager {
  private readonly storageKey = "saved_dashboards";

  // 解析布局字符串
  private parseLayoutString(str: string): LayoutConfig | null {
    try {
      const [charts, layout] = str.split("/");
      const chartIds = charts.split("-").filter((id) => id in CHARTS);

      if (!chartIds.length) return null;

      if (!layout) {
        return {
          charts: chartIds,
          layout: this.generateDefaultLayout(chartIds),
        };
      }

      const positions = layout.split("_").map((pos) => {
        const [x, y, w, h] = pos.split(",").map(Number);
        return { x, y, w, h };
      });

      return {
        charts: chartIds,
        layout: positions.map((pos, i) => ({
          i: chartIds[i],
          ...pos,
        })),
      };
    } catch (e) {
      console.error("Failed to parse layout string:", e);
      return null;
    }
  }

  // 生成默认布局
  private generateDefaultLayout(chartIds: string[]): LayoutItem[] {
    let x = 0,
      y = 0;

    return chartIds.map((id) => {
      const chart = CHARTS[id];
      const [w, h] = chart.size;

      if (x + w > 12) {
        x = 0;
        y += Math.max(...chartIds.map((cid) => CHARTS[cid].size[1]));
      }

      const pos = { i: id, x, y, w, h };
      x += w;
      return pos;
    });
  }

  // 序列化布局为字符串
  private serializeLayout(config: LayoutConfig): string {
    const layoutStr = config.layout
      .map(({ x, y, w, h }) => [x, y, w, h].join(","))
      .join("_");

    return `${config.charts.join("-")}/${layoutStr}`;
  }

  // 生成随机布局
  generateRandom(count = 4): LayoutConfig {
    const chartIds = Object.keys(CHARTS);
    const selected = [];

    while (selected.length < count) {
      const id = chartIds[Math.floor(Math.random() * chartIds.length)];
      if (!selected.includes(id)) {
        selected.push(id);
      }
    }

    return {
      charts: selected,
      layout: this.generateDefaultLayout(selected),
    };
  }

  // 从标识符加载配置
  async load(identifier: string): Promise<LayoutConfig | null> {
    // Case 1: 短ID
    if (identifier.match(/^[a-zA-Z0-9]{8}$/)) {
      const saved = this.getSaved(identifier);
      if (saved) {
        return {
          charts: saved.charts,
          layout: saved.layout,
        };
      }
    }

    // Case 2: 模板
    if (identifier.startsWith("template/")) {
      const templateName = identifier.split("/")[1] as keyof typeof TEMPLATES;
      const template = TEMPLATES[templateName];
      return template ? this.parseLayoutString(template) : null;
    }

    // Case 3: 布局字符串
    if (identifier.includes("-")) {
      return this.parseLayoutString(identifier);
    }

    // Case 4: 随机生成
    return this.generateRandom();
  }

  // 保存配置
  save(config: LayoutConfig, title?: string): string {
    const id = nanoid(8);
    const savedConfig: SavedDashboard = {
      ...config,
      id,
      title,
      created: Date.now(),
    };

    const saved = this.getAllSaved();
    saved[id] = savedConfig;
    localStorage.setItem(this.storageKey, JSON.stringify(saved));

    return id;
  }

  // 获取保存的配置
  getSaved(id: string): SavedDashboard | null {
    const saved = this.getAllSaved();
    return saved[id] || null;
  }

  // 获取所有保存的配置
  getAllSaved(): Record<string, SavedDashboard> {
    try {
      const data = localStorage.getItem(this.storageKey);
      return data ? JSON.parse(data) : {};
    } catch {
      return {};
    }
  }

  // 删除保存的配置
  deleteSaved(id: string): void {
    const saved = this.getAllSaved();
    delete saved[id];
    localStorage.setItem(this.storageKey, JSON.stringify(saved));
  }

  // 生成分享URL
  generateShareUrl(config: LayoutConfig, type: "hash" | "id" = "hash"): string {
    if (type === "hash") {
      return `#${this.serializeLayout(config)}`;
    } else {
      const id = this.save(config);
      return `/dashboard/${id}`;
    }
  }
}

// 导出单例实例
export const dashboardManager = new DashboardManager();
