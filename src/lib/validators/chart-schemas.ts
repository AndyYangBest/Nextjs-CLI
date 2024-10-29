import { z } from "zod";

// Overview Chart Schema
export const overviewDataSchema = z.array(
  z.object({
    name: z.string(),
    total: z.number(),
  })
);

export type OverviewData = z.infer<typeof overviewDataSchema>;

// Crypto Chart Schema
export const cryptoDataSchema = z.array(
  z.object({
    date: z.string(),
    price: z.number(),
  })
);

export type CryptoData = z.infer<typeof cryptoDataSchema>;
