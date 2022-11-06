import type { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";
import { prisma } from "../../../lib/prisma";
import multer from "multer";
import { urlPath } from "../../../lib/urlPath";

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
    const destination = "./profileImages/";

    // Updates existing page multer instance.
    const updatedImage = multer({
      storage: multer.diskStorage({
        destination,
        filename: (req, file, cb) =>
          cb(null, token.id + /\.[0-9a-z]+$/i.exec(file.originalname)),
      }),
    });

    // Replaces page in new position.
    /// @ts-ignore-start
    updatedImage.any()(req, res, async () => {
      // @ts-ignore-end
      // Updates the last modified date.
      const user = await prisma.user.update({
        where: {
          id: token.id,
        },
        data: {
          /// @ts-ignore-start
          image: `https://chdr.cs.ucf.edu/emurr/profileImages/${req.files[0].filename}`,
          // @ts-ignore-end
        },
      });

      if (user) {
        return res
          .status(200)
          .json({ error: "Image updated.", image: user.image });
      } else
        return res.status(200).json({ error: "Image could not be updated." });
    });
  }
}

export const config = {
  api: {
    bodyParser: false, // Disallow body parsing, consume as stream
  },
};
