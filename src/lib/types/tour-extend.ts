import { Page, Tour } from "@prisma/client";

export interface TourExtend
  extends Omit<Tour, "tourCreatedAt" | "tourUpdatedAt"> {
  tourPages: Page[];
  tourUpdatedAt: string;
  tourCreatedAt: string;
}
