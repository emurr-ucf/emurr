import type { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";
import multer from "multer";
import { Page, Tour } from "@prisma/client";
import { prisma } from "../../../lib/prisma";
import { returnTour } from "../../../lib/returnTour";
const archiver = require("archiver");

// Post API Inputs.
export interface PostFileRequestType {
  tourId: string;
  file: File;
}

// Post API Output.
export interface PostFileResponseType {
  error?: string;
  newPage?: Page;
  tour?: Tour;
}

// Get API Inputs.
export interface GetFileRequestType {
  tourId: string;
  pageId: string;
}

// Get API Outputs.
export interface GetFileResponseType {
  error?: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Checks JWT token.
  const token = await getToken({ req });
  if (!token) return res.status(401).json({ error: "User is not logged in." });

  // Posting new page.
  if (req.method === "POST") {
    const { tourId } = req.query;

    if (typeof tourId != "string")
      return res.status(400).json({ error: "Please send a tour ID." });

    const currentTour = await prisma.tour.findFirst({
      where: {
        id: tourId,
        tourAuthorId:token.id,
      }
    }) 
    
    if(!currentTour)
      return res.status(404).json({ error: "Error uploading file." });

    const destination = "./websites/" + tourId + "/images/";

    // Upload page multer instance.
    const uploadImage = multer({
      storage: multer.diskStorage({
        destination,
        filename: (req, file, cb) => cb(null, file.originalname),
      }),
      fileFilter: (req, file, callback) => {
        const filetypes = ["image/jpg", "image/jpeg", "image/png", "video/mp4"];
        if(!filetypes.includes(file.mimetype)) {
          return callback(new Error('Incorrect file type sent.'));
        }
        callback(null, true);
      },
      limits: {
        fileSize: 500000000
      },
    });
    
    // Creates page.
    /// @ts-ignore-start
    uploadImage.any()(req, res, async(err) => {
      if(multer.MulterError)
        return res.status(409).json({ error: "Error uploading file." });

      else if (err)
        return res.status(409).json({ error: err.message });

      // @ts-ignore-end
      if (!req.files[0])
        return res.status(400).json({ error: "Failed to upload image." });
      // @ts-ignore-end
      const size = req.files[0].size;

      await prisma.tour.update({
        where: {
          id: tourId,
        },
        data: {
          mediaSize: {
            increment: parseFloat((size / 1000000).toFixed(4)),
          },
        },
      });

      const tour = await returnTour(tourId, token.id);

      console.log(tour);

      return res.status(200).json({ tour });
    });
  }

  // Gets file.
  if (req.method === "GET") {
    const { tourId } = req.query;

    if (typeof tourId != "string") return res.status(400).json({ error: "" });

    // Returns file.
    const path = "./websites/" + tourId + "/images/";

    // Sets what kind of folder we want the files to be downloaded as.
    var archive = archiver("zip");

    // Checks if archiver fails.
    archive.on("error", function (err: any) {
      throw err;
    });

    archive.pipe(res);
    // Append files from a sub-directory, putting its contents at the root of archive
    archive.directory(path, false);
    // Closes the archiver session.
    archive.finalize();
  }
}

export const config = {
  api: {
    responseLimit: false,
    bodyParser: false, // Disallow body parsing, consume as stream
  },
};
