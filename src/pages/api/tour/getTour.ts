import { Tour } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";
import { prisma } from '../../../lib/prisma'

// API Inputs.
export interface GetTourRequestType {
  firstName: string;
  lastName: string;
  email: string;
}

// API Outputs.
export interface GetTourResponseType {
  error?: string;
  tours?: Tour[];
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<GetTourResponseType>
) {
  const token = await getToken({req});
  console.log(token);

  if(!token)
      return res.status(401).json({ error:"Not signed in" });
  else 
      return res.status(200).json({ error: JSON.stringify(token) })
  
  console.log("Poop3");
  // Error: Email was not received.
  if (query) {
    const tours = await prisma.tour.findMany({
      where: {
        tourAuthorId: token.id,
      }
    })

    res.status(200).json({ tours });
  } else {
    const tours = await prisma.tour.findMany({
      where: {
        tourAuthorId: token.id,
      }
    })

    res.status(200).json({ tours });
  }


}
