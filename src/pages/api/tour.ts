import { Prisma, Tour } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";
import { prisma } from '../../lib/prisma';

// Get API Inputs.
export interface GetTourRequestType {
  firstName: string;
  lastName: string;
  email: string;
}

// Get API Outputs.
export interface GetTourResponseType {
  tours: Tour[];
}

// Post API Inputs.
export interface CreateTourRequestType {}

// Post API Outputs.
export interface CreateTourResponseType {
  tourId?: string;
  error?: string;
}

// Put API Inputs.
export interface UpdateTourRequestType {
  tourId: string;
  name: string;
}

// Put API Outputs.
export interface UpdateTourResponseType {
  tour?: Tour | Prisma.BatchPayload;
  error?: string;
}

// Delete API Inputs.
export interface DeleteTourRequestType {
  tourId: string;
}

// Delete API Outputs
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

  // Used for querying tours.
  if (req.method === "GET") {
    const { query, sortQuery } = req.query;

    // If a query is sent, tours that contain that query are searched.
    if (typeof query === "string" && typeof sortQuery === "string") {
      let orderBy = {  };

          // If a sort query is sent, tours are sent back sorted by the specifc value.
      // The user wants to sort by date.
      if (sortQuery == "Date")
        orderBy =  { tourCreatedAt: "asc" };
      // The user wants to sort by title.
      else if (sortQuery == "Title")
        // Sorts the tours by title.
        orderBy = { tourTitle: "asc" };

      // Searches database for tour titles or descriptions that contain the search value.
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
        },
        orderBy,
      });
      
      // Returns the found tours.
      res.status(200).json({ tours });
    }

    // If no query is called, the normal list of tours is sent back.
    else {
      const tours = await prisma.tour.findMany({
        where: {
          tourAuthorId: token.id,
        }
      });
  
      res.status(200).json({ tours });
    }
  } 

  // Creates a Tour.
  else if (req.method === "POST") {
    // Creates Tour.
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

  // Updates a Tour's Title.
  else if (req.method === "PUT") {
    const { tourId, name } = req.body;
    
    // Error: TourID was not sent. 
    if (!tourId)
      return res.status(400).json({ error: "Tour ID cannot be blank." })

    // If all checks are passed.
    // Update the Tour Title.
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

  // Deletes a Tour.
  else if (req.method === "DELETE") {
    const { tourId } = req.body;

    // Error: TourID was not sent. 
    if (!tourId)
      return res.status(400).json({ error: "Tour ID cannot be blank." });

    // If all checks are passed.
    // Delete Tour.
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