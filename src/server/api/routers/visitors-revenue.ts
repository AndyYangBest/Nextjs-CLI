// src/server/api/routers/visitors-revenue.ts

import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { type VisitorsRevenueData } from "@/types/visitors-revenue";
import { TRPCError } from "@trpc/server";

const DEFAULT_DATA: VisitorsRevenueData = {
  stats: {
    visitors: { count: 145670, change: 12 },
    revenue: { count: 456789, change: -5 },
    savings: { count: 234567, change: 8 },
  },
  chartData: Array.from({ length: 6 }, (_, i) => ({
    month: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"][i],
    Primary: Math.floor(Math.random() * 3000) + 2000,
    Accent: Math.floor(Math.random() * 2000) + 1500,
    Neutral: Math.floor(Math.random() * 1000) + 500,
  })),
};

export const visitorsRevenueRouter = createTRPCRouter({
  getData: publicProcedure
    .input(
      z.object({
        timeframe: z
          .enum(["day", "week", "month", "year"])
          .optional()
          .default("month"),
      })
    )
    .query(async ({ input }) => {
      if (!process.env.OPENAI_API_KEY) {
        console.error("OPENAI_API_KEY is not set");
        return DEFAULT_DATA;
      }

      try {
        const response = await fetch(
          "https://api.openai.com/v1/chat/completions",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
            },
            body: JSON.stringify({
              model: "gpt-3.5-turbo",
              messages: [
                {
                  role: "user",
                  content: `Generate a JSON string containing dashboard data with the following structure exactly: {"stats":{"visitors":{"count":number,"change":number},"revenue":{"count":number,"change":number},"savings":{"count":number,"change":number}},"chartData":[{"month":string,"Primary":number,"Accent":number,"Neutral":number}]} for a ${input.timeframe} period. Use realistic numbers.`,
                },
              ],
            }),
          }
        );

        if (!response.ok) {
          throw new Error(
            `OpenAI API responded with status ${response.status}`
          );
        }

        const result = await response.json();

        if (!result.choices?.[0]?.message?.content) {
          throw new Error("Invalid response format from OpenAI");
        }

        console.log(
          "Raw OpenAI response content:",
          result.choices[0].message.content
        );

        try {
          const parsedData = JSON.parse(
            result.choices[0].message.content
          ) as VisitorsRevenueData;
          // 验证数据结构
          if (!parsedData.stats || !parsedData.chartData) {
            throw new Error("Invalid data structure");
          }
          return parsedData;
        } catch (parseError) {
          console.error("Failed to parse OpenAI response:", parseError);
          return DEFAULT_DATA;
        }
      } catch (error) {
        console.error("Error in visitorsRevenue.getData:", error);
        return DEFAULT_DATA;
      }
    }),
});
