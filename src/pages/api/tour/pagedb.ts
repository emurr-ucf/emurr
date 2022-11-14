import { Page, Tour } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";
import { prisma } from "../../../lib/prisma";
import { returnTour } from "../../../lib/returnTour";
import fs from 'fs';

export interface UpdatePageRequestType {
  pageId: string;
  title?: string;
  customURL?: string;
}

export interface UpdatePageResponseType {
  error?: string;
  tour?: Tour;
  page?: Page;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<UpdatePageResponseType>
) {
  // Checks JWT token.
  const token = await getToken({ req });
  if (!token) return res.status(401).json({ error: "User is not logged in." });

  if (req.method == "PUT") {
    const { tourId, pageId, title, customURL } = req.body;

    if (!pageId || !tourId)
      return res
        .status(400)
        .json({ error: "Page ID and Tour ID fields cannot be blank." });

    if (customURL) {
      const pages = await prisma.page.findMany({
        where: {
          tourId,
          authorId: token.id,
        },
      });

      for (const page of pages) {
        if (
          page.id !== pageId &&
          page.customURL != "" &&
          page.customURL === customURL
        ) {
          return res
            .status(400)
            .json({ error: "Already a page with that custom URL" });
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
      },
    });

    if (!page || !page.tourId)
      return res
        .status(400)
        .json({ error: `Page: ${pageId} could not be updated` });

    const tour = await returnTour(page.tourId, token.id);

    if (tour) res.status(200).json({ tour, page });
    else
      res.status(400).json({ error: `Page: ${pageId} could not be updated` });
  }

  if (req.method === "DELETE") {
    const { pageId, tourId } = req.body;

    // Error: TourID was not sent.
    if (!tourId || typeof(tourId) !== 'string')
      return res.status(400).json({ error: "Must send a valid TourID." });

    // Error: PageID was not sent.
    if (!pageId || typeof(pageId) !== 'string')
      return res.status(400).json({ error: "Must send a valid PageID." });

    const page = await prisma.page.findFirst({
      where: {
        authorId: token.id,
        id: pageId
      }
    });

    if (page) {
      fs.unlink("./websites/" + tourId + "/" + pageId + ".html", async (err) => {
        if (err)
          return res.status(409).json({ error: "Page could not be removed." });

        console.log(pageId + "has been deleted.");

        const deletePage = await prisma.page.deleteMany({
          where: {
            id: pageId,
            authorId: token.id,
          },
        });

        const tour = await returnTour(tourId, token.id);

        if (deletePage)
          return res.status(200).json({tour});
        else
          return res.status(409).json({error: "Page could not be deleted." });
      });
    } else return res.status(404).json({ error: "Page was not found." });
  }
}
