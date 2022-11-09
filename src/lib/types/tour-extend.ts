import { Tour } from "@prisma/client";

export interface TourExtend
  extends Omit<Tour, "tourCreatedAt" | "tourUpdatedAt"> {
  tourUpdatedAt: string;
  tourCreatedAt: string;
}
