import { Prisma, Tour } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";
import { prisma } from '../../lib/prisma'
import multer from 'multer';

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

export interface CreateTourRequestType {}

export interface CreateTourResponseType {
  tourId?: string;
  error?: string;
}

export interface UpdateTourRequestType {
  tourId: string;
  name: string;
}

export interface UpdateTourResponseType {
  tour?: Tour | Prisma.BatchPayload;
  error?: string;
}

export interface DeleteTourRequestType {
  tourId: string;
}

export interface DeleteTourResponseType {
  error: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<GetTourResponseType | CreateTourResponseType | UpdateTourResponseType | DeleteTourResponseType>
) {
  // Checks JWT token.
  const token = await getToken({req});
  if (!token)
      return res.status(401).json({ error: "User is not logged in." });

  if (req.method === "GET") {
    const { query } = req.query;

    // Error: Email was not received.
    if (typeof query === "string" && query != "") {
      const tours = await prisma.tour.findMany({
        where: {
          AND: [
            {
              tourAuthorId: token.id,
            },
            {
              OR: [
                {
                  tourTitle: {
                    contains: query,
                  }
                },
                { 
                  tourDescription: {
                    contains: query,
                  },
                },
              ],
            }
          ],
        }
      });
  
      res.status(200).json({ tours });
    } else {
      const tours = await prisma.tour.findMany({
        where: {
          tourAuthorId: token.id,
        }
      })
  
      res.status(200).json({ tours });
    }
  } 
  else if (req.method === "POST") {
    const createTour = await prisma.tour.create({
      data: {
        tourTitle: "Untitled",
        tourAuthorId: token.id,
      }
    });

    if (createTour)
      return res.status(200).json({ tourId: createTour.id });
    else
      return res.status(400).json({ error: "Tour could not be created." });
  } 
  else if (req.method === "PUT") {
    const { tourId, name } = req.body;

    if (!tourId)
      return res.status(400).json({ error: "Tour ID cannot be blank." })

    const tour = await prisma.tour.updateMany({
      where: {
        id: tourId,
        tourAuthorId: token.id,
      },
      data: {
        tourTitle: name,
      }
    });

    if (tour)
      return res.status(200).json({ tour });
    else
      return res.status(400).json({ error: "Could not update tour." });
  }
  else if (req.method === "DELETE") {
    const { tourId } = req.body;

    if (!tourId)
      return res.status(400).json({ error: "Tour ID cannot be blank." });

    const tour = await prisma.tour.deleteMany({
      where: {
        id: tourId,
        tourAuthorId: token.id,
      }
    })

    if (tour)
      return res.status(200).json({ error: "Tour has been deleted." });
    else
      return res.status(400).json({ error: "Tour could not be deleted." });
  }
}