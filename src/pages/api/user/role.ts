import type { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";
import { prisma } from "../../../lib/prisma";

// Get API Outputs.
export interface GetUserRoleResponseType {
  role?: string;
  error?: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  
  // Retrieves a User's Information.
  if (req.method === "GET") {
    // Checks JWT token.
    const token = await getToken({ req });
    if (!token)
      return res.status(401).json({ error: "User is not logged in." });
    
    const { userID } = req.query;

    // Gets User.
    const user = await prisma.user.findFirst({
      where: {
        id: typeof userID === "string" ? userID : undefined,
      },
    });

    if (user)
      return res.status(200).json({
        name: user.name,
        lastName: user.lastName,
        role: user.role,
      });
    else return res.status(404).json({ error: "User not found." });
  }
}
