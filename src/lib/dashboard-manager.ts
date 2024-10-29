import { nanoid } from "nanoid";
import {
  VisitorsRevenue,
  CryptoChart,
  SmallCharts,
} from "@/components/dashboard/DashboardWidgets";
import { generateRandomData } from "@/lib/data-generator";
import { CategoryBar as CategoryPieWidget } from "@tailus-ui/CategoryPieWidget";
import { CategoryBar2 as HorizontalBarWidget } from "@tailus-ui/CategoryBar2";
import { DomainRadarChart as RadarWidget } from "@tailus-ui/RadarWidget";
import { ScatterOverview as ScatterWidget } from "@tailus-ui/ScatterWidget";
import AreaChartWidget from "@tailus-ui/AreaChartWidget";
import BarChartWidget from "@tailus-ui/BarChartWidget";
import { RadialBarWidget } from "@tailus-ui/RadialBarWidget";
import type {
  ChartRegistry,
  LayoutConfig,
  LayoutItem,
  SavedDashboard,
} from "@/types/dashboard";

export const CHARTS: ChartRegistry = {
  v: {
    component: VisitorsRevenue,
    title: "Visitors & Revenue",
    dataKey: "visitors-revenue",
  },
  m: {
    component: SmallCharts,
    title: "Key Metrics",
    dataKey: "small-charts",
  },
  c: {
    component: CryptoChart,
    title: "Crypto Trends",
    dataKey: "crypto-chart",
  },
  r: {
    component: RadialBarWidget,
    title: "Storage Distribution",
    dataKey: "radial-chart",
  },
  a: {
    component: AreaChartWidget,
    title: "Visitors & Revenue Overview",
    dataKey: "visitors-revenue",
  },
  b: {
    component: BarChartWidget,
    title: "Revenue Distribution",
    dataKey: "visitors-revenue",
  },
  p: {
    component: CategoryPieWidget,
    title: "Activity Distribution",
    dataKey: "category-chart",
  },
  h: {
    component: HorizontalBarWidget,
    title: "Data Usage",
    dataKey: "category-chart",
  },
  d: {
    component: RadarWidget,
    title: "Performance Analysis",
    dataKey: "radar-chart",
  },
  s: {
    component: ScatterWidget,
    title: "School Comparison",
    dataKey: "scatter-chart",
  },
};

export const TEMPLATES = {
  basic: "v-m-p",
  data: "c-r-s",
  full: "v-c-r-m-p-a-b-h-d-s",
} as const;

export class DashboardManager {
  private readonly storageKey = "saved_dashboards";

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

  private generateDefaultLayout(chartIds: string[]): LayoutItem[] {
    let x = 0,
      y = 0;

    return chartIds.map((id) => {
      const w = 6,
        h = 8;

      if (x + w > 12) {
        x = 0;
        y += h;
      }

      const pos = { i: id, x, y, w, h };
      x += w;
      return pos;
    });
  }

  private serializeLayout(config: LayoutConfig): string {
    const layoutStr = config.layout
      .map(({ x, y, w, h }) => [x, y, w, h].join(","))
      .join("_");

    return `${config.charts.join("-")}/${layoutStr}`;
  }

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

  async load(identifier: string): Promise<LayoutConfig | null> {
    if (identifier.match(/^[a-zA-Z0-9]{8}$/)) {
      const saved = this.getSaved(identifier);
      if (saved) {
        return {
          charts: saved.charts,
          layout: saved.layout,
        };
      }
    }

    if (identifier.startsWith("template/")) {
      const templateName = identifier.split("/")[1] as keyof typeof TEMPLATES;
      const template = TEMPLATES[templateName];
      return template ? this.parseLayoutString(template) : null;
    }

    if (identifier.includes("-")) {
      return this.parseLayoutString(identifier);
    }

    return this.generateRandom();
  }

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

  getSaved(id: string): SavedDashboard | null {
    const saved = this.getAllSaved();
    return saved[id] || null;
  }

  getAllSaved(): Record<string, SavedDashboard> {
    try {
      const data = localStorage.getItem(this.storageKey);
      return data ? JSON.parse(data) : {};
    } catch {
      return {};
    }
  }

  deleteSaved(id: string): void {
    const saved = this.getAllSaved();
    delete saved[id];
    localStorage.setItem(this.storageKey, JSON.stringify(saved));
  }

  generateShareUrl(config: LayoutConfig, type: "hash" | "id" = "hash"): string {
    if (type === "hash") {
      return `#${this.serializeLayout(config)}`;
    } else {
      const id = this.save(config);
      return `/dashboard/${id}`;
    }
  }
}

export const dashboardManager = new DashboardManager();
