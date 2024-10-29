import * as React from "react";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import { Button } from "@/components/ui/button";
import { Heading } from "@/components/common/heading";
import { Input } from "@/components/ui/input";
import { RefreshCw, Save, Share2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { dashboardManager, TEMPLATES, CHARTS } from "@/lib/dashboard-manager";
import { generateRandomData } from "@/lib/data-generator";
import type { LayoutConfig, LayoutItem } from "@/types/dashboard";

const Dashboard = dynamic(() => import("@/components/dashboard/Dashboard"), {
  ssr: false,
});

const DashboardPage: React.FC = () => {
  const router = useRouter();
  const [ready, setReady] = React.useState(false);
  const [config, setConfig] = React.useState<LayoutConfig | null>(null);
  const [layout, setLayout] = React.useState<LayoutItem[]>([]);
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const [saveTitle, setSaveTitle] = React.useState("");
  const [shareType, setShareType] = React.useState<"hash" | "id">("hash");
  const [barOpacity, setBarOpacity] = React.useState({
    Running: 1,
    Swimming: 1,
    Cycling: 1,
    Weightlifting: 1,
    Yoga: 1,
    Pilates: 1,
    Boxing: 1,
  });

  const handleBarMouseEnter = (o) => {
    const { dataKey } = o;
    setBarOpacity((op) => {
      const newOpacity = { ...op };
      Object.keys(newOpacity).forEach((key) => {
        newOpacity[key] = key === dataKey ? 1 : 0.25;
      });
      return newOpacity;
    });
  };

  const handleBarMouseLeave = () => {
    setBarOpacity({
      Running: 1,
      Swimming: 1,
      Cycling: 1,
      Weightlifting: 1,
      Yoga: 1,
      Pilates: 1,
      Boxing: 1,
    });
  };

  React.useEffect(() => {
    const loadDashboard = async () => {
      const identifier =
        typeof window !== "undefined"
          ? window.location.hash.slice(1) ||
            (router.query.id as string) ||
            "random"
          : "random";

      const loadedConfig = await dashboardManager.load(identifier);
      if (loadedConfig) {
        setConfig(loadedConfig);
        setLayout(loadedConfig.layout);
      }
      setReady(true);
    };

    void loadDashboard();
  }, [router.query.id]);

  const handleLayoutChange = (newLayout: LayoutItem[]) => {
    setLayout(newLayout);
    if (config) {
      setConfig({
        ...config,
        layout: newLayout,
      });
    }
  };

  const handleRandomize = () => {
    const newConfig = dashboardManager.generateRandom();
    setConfig(newConfig);
    setLayout(newConfig.layout);
    if (typeof window !== "undefined") {
      window.location.hash = "";
    }
  };

  const handleTemplateChange = async (template: string) => {
    const newConfig = await dashboardManager.load(`template/${template}`);
    if (newConfig) {
      setConfig(newConfig);
      setLayout(newConfig.layout);
      if (typeof window !== "undefined") {
        window.location.hash = `template/${template}`;
      }
    }
  };

  const handleSave = () => {
    if (!config || !saveTitle) return;

    const id = dashboardManager.save(config, saveTitle);
    setSaveTitle("");
    setIsDialogOpen(false);

    void router.push(`/dashboard/${id}`);
  };

  const handleShare = () => {
    if (!config) return;

    const shareUrl = `${
      window.location.origin
    }/dashboard${dashboardManager.generateShareUrl(config, shareType)}`;

    if (typeof window !== "undefined") {
      void navigator.clipboard.writeText(shareUrl);
    }
  };

  if (!ready) {
    return null;
  }

  return (
    <div className="p-6">
      <div className="mb-6 flex items-center justify-between">
        <Heading
          title="Dynamic Dashboard"
          description="Create, customize and share your dashboard"
        />

        <div className="flex items-center space-x-4">
          <Select onValueChange={handleTemplateChange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select template" />
            </SelectTrigger>
            <SelectContent>
              {Object.entries(TEMPLATES).map(([key, _]) => (
                <SelectItem key={key} value={key}>
                  {key.charAt(0).toUpperCase() + key.slice(1)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select
            value={shareType}
            onValueChange={(v: "hash" | "id") => setShareType(v)}
          >
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Share type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="hash">Share as URL</SelectItem>
              <SelectItem value="id">Share as ID</SelectItem>
            </SelectContent>
          </Select>

          <Button onClick={handleRandomize}>
            <RefreshCw className="mr-2 h-4 w-4" />
            Randomize
          </Button>

          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Save className="mr-2 h-4 w-4" />
                Save
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Save Dashboard</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <Input
                  placeholder="Dashboard name"
                  value={saveTitle}
                  onChange={(e) => setSaveTitle(e.target.value)}
                />
                <Button onClick={handleSave} disabled={!saveTitle}>
                  Save
                </Button>
              </div>
            </DialogContent>
          </Dialog>

          <Button variant="outline" onClick={handleShare}>
            <Share2 className="mr-2 h-4 w-4" />
            Share
          </Button>
        </div>
      </div>

      {config && (
        <Dashboard
          items={config.charts.map((id) => ({
            id,
            title: CHARTS[id].title,
            component:
              typeof CHARTS[id].component === "function"
                ? CHARTS[id].component({
                    data: generateRandomData(CHARTS[id].dataKey),
                    opacity: barOpacity,
                    onMouseEnter: handleBarMouseEnter,
                    onMouseLeave: handleBarMouseLeave,
                  })
                : CHARTS[id].component,
          }))}
          layout={layout}
          onLayoutChange={handleLayoutChange}
        />
      )}

      <div className="mt-6 rounded-lg border p-4">
        <h3 className="mb-2 font-semibold">Available Chart Codes</h3>
        <div className="grid grid-cols-4 gap-4">
          {Object.entries(CHARTS).map(([code, config]) => (
            <div key={code} className="flex items-center gap-2">
              <code className="rounded bg-muted px-1.5 py-0.5 text-sm">
                {code}
              </code>
              <span className="text-sm text-muted-foreground">
                {config.title}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
