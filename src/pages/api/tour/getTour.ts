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
  tours: Tour[];
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<GetTourResponseType>
) {

  const session = await getToken({ req });

  const { query } = req.query;

  // Error: Email was not received.
  if (query) {
    const tours = await prisma.tour.findMany({
      where: {}
    })

    res.status(200).json({ tours });
  } else {
    const tours = await prisma.tour.findMany({
      where: {}
    })

    res.status(200).json({ tours });
  }


}
