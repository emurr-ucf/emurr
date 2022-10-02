import type { NextApiRequest, NextApiResponse } from "next";
import { getToken } from 'next-auth/jwt';
import { prisma } from '../../lib/prisma';
import { returnTour } from '../../lib/returnTour';
import { Tour } from "@prisma/client";

export interface UpdatePageRequestType {
  pageId: string;
  name: string;
}

export interface UpdatePageResponseType {
  error?: string;
  tour?: Tour;
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
    
    const { pageId, name } = req.body;

    if (!pageId || !name) return res.status(400).json({ error: "Page ID and name fields cannot be blank." });

    const page = await prisma.page.update({
      where: {
        id: pageId,
      },
      data: {
        title: name,
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