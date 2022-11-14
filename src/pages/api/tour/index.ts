import { Prisma, Role, Tour } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";
import { prisma } from "../../../lib/prisma";
import fs from "fs";
import { TourExtend } from "../../../lib/types/tour-extend";
import { formatUpdatedAt, formatCreatedAt } from "../../../lib/formatDate";
import { returnTour } from "../../../lib/returnTour";

// Get API Inputs.
export interface GetTourRequestType {
  firstName: string;
  lastName: string;
  email: string;
}

// Get API Outputs.
export interface GetTourResponseType {
  tours: Tour[] | TourExtend[];
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
  // context
) {
  // Checks JWT token.
  const token = await getToken({ req });
  if (!token) return res.status(401).json({ error: "User is not logged in." });

  // Used for querying tours.
  if (req.method === "GET") {
    const { query, userid, sortQuery, asc } = req.query;

    let orderBy = {};

    // If a sort query is sent, tours are sent back sorted by the specifc value.
    // The user wants to sort by date.
    if (sortQuery == "Date Updated") orderBy = { tourUpdatedAt: asc };
    else if (sortQuery == "Date Created") orderBy = { tourCreatedAt: asc };
    // The user wants to sort by title.
    else if (sortQuery == "Title")
      // Sorts the tours by title.
      orderBy = { tourTitle: asc };

    // Searches database for tour titles or descriptions that contain the search value.
    const tours: any = await prisma.tour.findMany({
      where: {
        AND: [
          {
            tourAuthorId: typeof userid === "string" ? userid : token.id,
          },
          {
            OR: [
              {
                tourTitle: {
                  contains: typeof query === "string" ? query : undefined,
                },
              },
              {
                tourDescription: {
                  contains: typeof query === "string" ? query : undefined,
                },
              },
            ],
          },
        ],
      },
      orderBy,
    });

    for (const tour of tours) {
      tour.tourCreatedAt = formatCreatedAt((tour as Tour).tourCreatedAt);
      tour.tourUpdatedAt = formatUpdatedAt((tour as Tour).tourUpdatedAt);
    }

    // Returns the found tours.
    res.status(200).json({ tours });
  }

  // Creates a Tour.
  else if (req.method === "POST") {
    // Creates Tour.
    const createTour = await prisma.tour.create({
      data: {
        tourTitle: "Untitled",
        tourAuthorId: token.id,
      },
    });

    if (createTour) return res.status(200).json({ tourId: createTour.id });
    else return res.status(400).json({ error: "Tour could not be created." });
  }

  // Updates a Tour's Title and Description.
  else if (req.method === "PUT") {
    const { tourId, tourTitle, tourDescription, published } = req.body;

    // Error: TourID was not sent.
    if (!tourId) return res.status(400).json({ error: "Tour ID cannot be blank." });

    if (published && token.role === Role.ADMIN) {
      // Updates pages with the published status.
      const updatePages = await prisma.page.updateMany({
        where: {
          tourId,
          authorId: token.id,
        },
        data: {
          published,
        },
      });

      if (!updatePages) return res.status(400).json({ error: "Page published status could not be updated." });
    }

    // If all checks are passed.
    // Update the Tour Title and Published Status.
    await prisma.tour.updateMany({
      where: {
        id: tourId,
        tourAuthorId: token.id,
      },
      data: {
        tourTitle,
        tourDescription,
        published,
        tourUpdatedAt: new Date(),
      },
    });

    const tour = await returnTour(tourId, token.id);

    if (tour) return res.status(200).json({ tour });
    else return res.status(400).json({ error: "Could not update tour." });
  }

  // Deletes a Tour.
  else if (req.method === "DELETE") {
    const { tourId } = req.body;

    // Error: TourID was not sent.
    if (!tourId) return res.status(400).json({ error: "Tour ID cannot be blank." });

    // If all checks are passed.
    // Delete Tour.
    const tour = await prisma.tour.deleteMany({
      where: {
        id: tourId,
        tourAuthorId: token.id,
      },
    });

    if (tour) {
      // Deletes the tour from filesystem.
      fs.rm("./websites/" + tourId, { recursive: true, force: true }, (err) => {
        if (err) {
          throw err;
        }

        console.log(`${tourId} is deleted!`);
      });

      return res.status(200).json({});
    } else return res.status(400).json({ error: "Tour could not be deleted." });
  }
}
