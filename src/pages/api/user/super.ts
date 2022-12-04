import type { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";
import { prisma } from "../../../lib/prisma";

// Post API Inputs.
export interface PostSuperUserRequestType {
  userID: string;
}

// Post API Output.
export interface PostSuperUserResponseType {
  error?: string;
}

// Put API Inputs.
export interface PutSuperUserRequestType {
  userID: string;
}

// Put API Outputs.
export interface PutSuperUserResponseType {
  error?: string;
}

// Delete API Inputs.
export interface DeleteSuperUserRequestType {
  tourID?: string;
  userID?: string;
}

// Delete API Outputs.
export interface DeleteSuperUserResponseType {
  error?: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Checks JWT token.
  const token = await getToken({ req });
  if (!token) return res.status(401).json({ error: "User is not logged in." });

  // Updates Role to Admin.
  if (req.method === "POST") {
    const { userID } = JSON.parse(req.body); // TODO idk why parsing this is required. check out what's the deal here. -omar

    // Error: UserID is not valid.
    if (!userID || typeof userID !== "string")
      return res.status(400).json({ error: "UserID is not valid." });

    if (token.role === "ADMIN") {
      // If role is admin, update users role to admin.
      const updateUserRole = await prisma.user.update({
        where: {
          id: userID,
        },
        data: {
          role: "ADMIN",
        },
      });

      if (updateUserRole) return res.status(200).json({});
      else return res.status(409).json({ error: "Role was not updated." });
    } else return res.status(401).json({ error: "User is not an admin." });
  }

  // Updates Role to User.
  if (req.method === "PUT") {
    const { userID } = JSON.parse(req.body); // TODO idk why parsing this is required. check out what's the deal here. -omar

    // Error: UserID is not valid.
    if (!userID || typeof userID !== "string")
      return res.status(400).json({ error: "UserID is not valid." });

    if (token.role === "ADMIN") {
      // If role is admin, update users role to user.
      const updateUserRole = await prisma.user.update({
        where: {
          id: userID,
        },
        data: {
          role: "USER",
        },
      });

      if (updateUserRole) return res.status(200).json({});
      else return res.status(409).json({ error: "Role was not updated." });
    } else return res.status(401).json({ error: "User is not an admin." });
  }

  // Deletes either a tour or user.
  if (req.method === "DELETE") {
    const { tourID, userID } = req.body;

    if (token.role === "ADMIN") {
      // If a tour id is sent, the tour is deleted.
      if (tourID) {
        // Error: TourID is not a string.
        if (typeof tourID !== "string")
          return res.status(400).json({ error: "TourID is not a string." });

        // Deletes a tour.
        const deleteTour = await prisma.tour.delete({
          where: {
            id: tourID,
          },
        });

        if (deleteTour) return res.status(200).json({});
        else return res.status(409).json({ error: "Tour was not deleted." });
      }

      // If a user id is sent, the user is deleted.
      if (userID) {
        // Error: UserID is not valid.
        if (typeof userID !== "string")
          return res.status(400).json({ error: "UserID is not a string." });

        // Deletes a user.
        const deleteUser = await prisma.user.delete({
          where: {
            id: userID,
          },
        });

        if (deleteUser) return res.status(200).json({});
        else return res.status(409).json({ error: "User was not deleted." });
      }

      // Error: TourID or UserID were sent.
      return res.status(400).json({ error: "TourID or UserID were not sent." });
    } else return res.status(401).json({ error: "User is not an admin." });
  }
}
