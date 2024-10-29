// src/server/api/routers/chart.ts
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";
import {
  overviewDataSchema,
  cryptoDataSchema,
} from "@/lib/validators/chart-schemas";

export const chartRouter = createTRPCRouter({
  // Overview Chart Data
  getOverviewData: publicProcedure
    .input(
      z
        .object({
          startDate: z.date().optional(),
          endDate: z.date().optional(),
        })
        .optional()
    )
    .query(async ({ ctx, input }) => {
      // 这里替换为实际的数据库查询
      // 示例: 从数据库获取月度收入数据
      // const data = await ctx.prisma.monthlyRevenue.findMany({
      //   where: {
      //     date: {
      //       gte: input?.startDate,
      //       lte: input?.endDate,
      //     },
      //   },
      //   orderBy: { date: 'asc' },
      // });

      // 临时使用模拟数据
      const data = Array.from({ length: 12 }, (_, i) => ({
        name: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ][i],
        total: Math.floor(Math.random() * 5000) + 1000,
      }));

      return overviewDataSchema.parse(data);
    }),

  // Crypto Chart Data
  getCryptoData: publicProcedure
    .input(
      z.object({
        days: z.number().min(1).max(365).optional().default(180),
      })
    )
    .query(async ({ ctx, input }) => {
      // 这里替换为实际的API调用或数据库查询
      // 示例: 从加密货币API获取数据
      // const response = await fetch(`https://api.example.com/crypto/btc/history?days=${input.days}`);
      // const data = await response.json();

      // 临时使用模拟数据
      const data = Array.from({ length: input.days }, (_, i) => {
        const date = new Date();
        date.setDate(date.getDate() - (input.days - i));
        return {
          date: date.toISOString().slice(0, 10),
          price: Math.random() * 5000 + 45000,
        };
      });

      return cryptoDataSchema.parse(data);
    }),
});
