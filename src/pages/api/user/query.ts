import { User } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";
import { prisma } from "../../../lib/prisma";

// Get API Outputs.
export interface GetUserResponseType {
  users?: User[];
  error?: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<GetUserResponseType>
  // context
) {
  // Checks JWT token.
  const token = await getToken({ req });
  if (!token) return res.status(401).json({ error: "User is not logged in." });

  // Used for querying users.
  if (req.method === "GET") {
    const { query, sortQuery, asc } = req.query;

    let orderBy = {};

    // If a sort query is sent, users are sent back sorted by the specifc value.
    // The user wants to sort by date.
    if (sortQuery == "Account Created") orderBy = { registeredAt: asc };
    // The user wants to sort by title.
    else if (sortQuery == "Name")
      // Sorts the users by name.
      orderBy = [{ name: asc }, { lastName: asc }];

    // Searches database for user names or email addresses that contain the search value.
    const users: any = await prisma.user.findMany({
      where: {
        OR: [
          {
          name: {
            contains: typeof query === "string" ? query : undefined,
          },
          },
          {
          lastName: {
            contains: typeof query === "string" ? query : undefined,
          },
          },
          {
          email: {
            contains: typeof query === "string" ? query : undefined,
          },
          },
        ],
      },
      orderBy,
    });

    // Returns the found users.
    res.status(200).json({ users: users });
  }
}
