import type { NextApiRequest, NextApiResponse } from "next";
import { getToken } from 'next-auth/jwt';
import { prisma } from '../../lib/prisma';
import { returnTour } from '../../lib/returnTour';

export interface UpdatePageRequestType {
  pageId: string;
  title?: string;
  customURL?: string;
}

export interface UpdatePageResponseType {
  error?: string;
  tour?: {
    tourPages: {
        id: string;
        title: string;
        published: boolean;
    }[];
    id: string;
    tourTitle: string;
    tourDescription: string | null;
  } | null;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<UpdatePageResponseType>
) {
  // Checks JWT token.
  const token = await getToken({req});
  if (!token)
      return res.status(401).json({ error: "User is not logged in." });


  if (req.method == "PUT") {
    
    const { tourId, pageId, title, customURL } = req.body;

    if (!pageId || !tourId) return res.status(400).json({ error: "Page ID and Tour ID fields cannot be blank." });

    if (customURL) {
      const pages = await prisma.page.findMany({
        where: {
          tourId,
        }
      });

      for (const page of pages) {
        if (page.customURL != "" && page.customURL === customURL) {
          return res.status(400).json({ error: "Already a page with that custom URL" });
        }
      }
    }

    const page = await prisma.page.update({
      where: {
        id: pageId,
      },
      data: {
        title,
        customURL,
      }
    });

    if (!page || !page.tourId) return res.status(400).json({ error: `Page: ${pageId} could not be updated` });

    const tour = await returnTour(page.tourId, token.id);

    if (tour)
      res.status(200).json({ tour });
    else
      res.status(400).json({ error: `Page: ${pageId} could not be updated` });
  }
}