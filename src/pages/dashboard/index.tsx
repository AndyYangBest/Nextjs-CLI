import React from "react";
import { useRouter } from "next/router";
import Dashboard from "@/components/dashboard/Dashboard";
import { useDashboard } from "@/components/dashboard/DashboardContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { defaultWidgets } from "@/components/dashboard/DashboardWidgets";
import { Heading } from "@/components/common/heading";
import { PlusCircle } from "lucide-react";
import { type Layout } from "@/types/dashboard";

export default function DashboardPage() {
  const router = useRouter();
  const {
    currentDashboard,
    saveDashboard,
    updateCurrentLayout,
    generateNewDashboard,
  } = useDashboard();
  const [newDashboardName, setNewDashboardName] = React.useState("");
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);

  // Generate new dashboard on initial load
  React.useEffect(() => {
    generateNewDashboard();
  }, []);

  const handleLayoutChange = (newLayout: Layout) => {
    updateCurrentLayout(newLayout);
  };

  const handleSaveDashboard = () => {
    if (!newDashboardName) return;
    saveDashboard(newDashboardName);
    setNewDashboardName("");
    setIsDialogOpen(false);
    void router.push("/dashboard/saved");
  };

  return (
    <div className="p-6">
      <div className="mb-6 flex items-center justify-between">
        <Heading
          title={currentDashboard?.name ?? "New Dashboard"}
          description="Drag widgets to reorganize your dashboard"
        />

        <div className="flex gap-4">
          <Button
            variant="outline"
            onClick={() => void router.push("/dashboard/saved")}
          >
            Saved Dashboards
          </Button>

          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <PlusCircle className="mr-2 h-4 w-4" />
                Save Layout
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Save Dashboard</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <Input
                  placeholder="Dashboard name"
                  value={newDashboardName}
                  onChange={(e) => setNewDashboardName(e.target.value)}
                />
                <Button onClick={handleSaveDashboard}>Save</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Dashboard
        items={currentDashboard?.items ?? defaultWidgets}
        layout={
          currentDashboard?.layout ??
          defaultWidgets.map((widget, i) => ({
            i: widget.id,
            x: (i * 4) % 12,
            y: Math.floor(i / 3) * 4,
            w: widget.defaultSize?.w ?? 4,
            h: widget.defaultSize?.h ?? 4,
          }))
        }
        onLayoutChange={handleLayoutChange}
      />
    </div>
  );
}
