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

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<GetTourResponseType | CreateTourResponseType>
) {

  // Checks JWT token.
  const token = await getToken({req});
  if (!token)
      return res.status(401).json({ error: "User is not logged in." });

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
  } 
  else if (req.method === "POST") {
    const createTour = await prisma.tour.create({
      data: {
        tourTitle: "Untitled",
        tourAuthorId: token.id,
      }
    });

    if (createTour) {
      const pageData = {title: "", authorId: token.id, tourId: createTour.id, deletable: false};
      const savedPage = await prisma.page.create({data: pageData});

      const destination = "./websites/" + createTour.id;

      // Upload page multer instance.
      const createPage = multer({
      storage: multer.diskStorage({
          destination,
          filename: (req, file, cb) => cb(null, savedPage.id + /\.[0-9a-z]+$/i.exec(file.originalname)),
          }),
      });

      // Creates page.
      createPage.any() (req, res, () => {});

      return res.status(200).json({ tourId: createTour.id });
    }
    else
      return res.status(400).json({ error: "Tour could not be created." });
  } 
  else if (req.method === "PUT") {
    const { tourId, pageId,  } = req.body;
  }
}

export const config = {
  api: {
    bodyParser: false, // Disallow body parsing, consume as stream
  },
};
