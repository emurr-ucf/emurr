import { Prisma, Role, Tour } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";
import { prisma } from "../../../lib/prisma";
import fs from "fs";
import { TourExtend } from "../../../lib/types/tour-extend";
import { formatUpdatedAt, formatCreatedAt } from "../../../lib/formatDate";
import { returnTour } from "../../../lib/returnTour";

// GET user role
export interface GetRoleType {
  role?: string;
  error: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<GetRoleType>
  // context
) {
  // Checks JWT token.
  const token = await getToken({ req });
  if (!token)
    return res.status(401).json({ role: "", error: "User is not logged in." });
  // Updates a Tour's Title and Description.
  else if (req.method === "GET") {
    // if (published && token.role === Role.ADMIN) {
    //   // Updates pages with the published status.
    //   const updatePages = await prisma.page.updateMany({
    //     where: {
    //       tourId,
    //       authorId: token.id,
    //     },
    //     data: {
    //       published,
    //     },
    //   });

    //   if (!updatePages) return res.status(400).json({ error: "Page published status could not be updated." });
    // }

    res.status(200).json({ role: token.role!, error: "" });
  }
}

