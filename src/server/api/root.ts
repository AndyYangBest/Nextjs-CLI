import { createTRPCRouter } from "@/server/api/trpc";
import { employeeRouter } from "@/server/api/routers/employee";
import { chartRouter } from "@/server/api/routers/chart";
import { visitorsRevenueRouter } from "@/server/api/routers/visitors-revenue";

export const appRouter = createTRPCRouter({
  employee: employeeRouter,
  chart: chartRouter,
  visitorsRevenue: visitorsRevenueRouter,
});

export type AppRouter = typeof appRouter;
