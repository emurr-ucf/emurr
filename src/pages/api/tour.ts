import { Prisma, Tour } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";
import { prisma } from '../../lib/prisma'

// API Inputs.
export interface GetTourRequestType {
  firstName: string;
  lastName: string;
  email: string;
}

// API Outputs.
export interface GetTourResponseType {
  tours: Tour[];
}

export interface CreateTourRequestType {
  userId: string;
}

export interface CreateTourResponseType {
  tourId?: string;
  error?: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<GetTourResponseType | CreateTourResponseType>
) {
  const token = await getToken({ req });
  if (!token) return res.status(405).json({ error: "Not authorized." });

  if (req.method === "GET") {
    const { query } = req.query;
  
    // Error: Email was not received.
    if (query) {
      const tours = await prisma.tour.findMany({
        where: {}
      })
  
      res.status(200).json({ tours });
    } else {
      const tours = await prisma.tour.findMany({
        where: {}
      })
  
      res.status(200).json({ tours });
    }
  } else if (req.method === "POST") {
    const { userId } = req.body;

    const createTour = await prisma.tour.create({
      data: {
        tourTitle: "Untitled",
        tourAuthorId: userId,
      }
    });

    if (createTour)
      return res.status(204).json({ tourId: createTour.id });
    else
      return res.status(400).json({ error: "Tour could not be created." });
  }


}
