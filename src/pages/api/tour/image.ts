import type { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";
import multer from "multer";
import { Page, Tour } from "@prisma/client";
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

    const destination = "./websites/" + tourId + "/images/";

    // Upload page multer instance.
    const uploadImage = multer({
      storage: multer.diskStorage({
        destination,
        filename: (req, file, cb) => cb(null, file.originalname),
      }),
    });

    // Creates page.
    /// @ts-ignore-start
    uploadImage.any()(req, res, () => {});
    // @ts-ignore-end

    return res.status(200).json({ error: "" });
  }

  // Gets file.
  if (req.method === "GET") {
    const { tourId } = req.query;

    if (typeof tourId != "string")
      return res.status(400).json({ error: "Tour ID cannot be blank." });

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
