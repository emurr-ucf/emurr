import type { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";
import { prisma } from "../../../lib/prisma";
import multer from "multer";
import fs from "fs";

// Put API Inputs.
export interface PutProfileImageRequestType {
  file: File;
}

// Put API Outputs.
export interface PutProfileImageResponseType {
  image?: string;
  error?: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Checks JWT token.
  const token = await getToken({ req });
  if (!token) return res.status(401).json({ error: "User is not logged in." });

  if (!(process.env.NODE_ENV === "production"))
    return res
      .status(400)
      .json({ error: "Cannot change image on development build." });

  // Updates a page.
  if (req.method === "PUT") {
    const destination = "../public_html/pi/";

    // Updates existing page multer instance.
    const updatedImage = multer({
      storage: multer.diskStorage({
        destination,
        filename: (req, file, cb) =>
          cb(null, token.id + /\.[0-9a-z]+$/i.exec(file.originalname)),
      }),
      fileFilter: (req, file, callback) => {
        const filetypes = ["image/jpg", "image/jpeg", "image/png"];
        if (!filetypes.includes(file.mimetype)) {
          return callback(new Error("Incorrect file type sent."));
        }
        callback(null, true);
      },
      limits: {
        fileSize: 4000000,
      },
    });

    // Replaces page in new position.
    /// @ts-ignore-start
    updatedImage.any()(req, res, async (err) => {
      // @ts-ignore-end
      if (err instanceof multer.MulterError)
        return res.status(409).json({ error: "Error uploading file." });
      else if (err) return res.status(409).json({ error: err.message });

      // Updates the last modified date.
      /// @ts-ignore-start
      const newUrl = `https://chdr.cs.ucf.edu/~emurr/pi/${req.files[0].filename}`
      /// @ts-ignore-end
      const user = await prisma.user.update({
        where: {
          id: token.id,
        },
        data: {
          image: newUrl,
        },
      });

      if (user) {
        return res.status(200).json({ image: newUrl });
      } else
        return res.status(409).json({ error: "Image could not be updated." });
    });
  } else if (req.method === "DELETE") {
    const user = await prisma.user.findFirst({
      where: {
        id: token.id,
      },
    });

    if (user?.image) {
      fs.unlink("../public_html/pi/" + user.image, async (err) => {
        if (err)
          return res
            .status(409)
            .json({ error: "Profile image could not be deleted." });

        console.log("Profile image has been deleted.");

        const image = await prisma.user.update({
          where: {
            id: token.id,
          },
          data: {
            image: "",
          },
        });

        if (image) return res.status(200).json({});
        else
          return res
            .status(409)
            .json({ error: "Profile image could not be deleted." });
      });
    }
  }
}

export const config = {
  api: {
    bodyParser: false, // Disallow body parsing, consume as stream
  },
};
