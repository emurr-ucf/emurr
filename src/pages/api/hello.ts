// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { User } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../lib/prisma'

interface HelloPostRequest {
  name: string;
  email: string;
}

interface HelloGetRequest {
  name: string;
}

interface HelloPostResponse {
  users: User[]
  error?: string;
}

interface HelloGetResponse {
  error?: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<HelloGetResponse | HelloPostResponse>
) {
  if (req.method == "GET") {

    const query = await prisma.user.findMany();
    res.status(200).json({ users: query });

  } else if (req.method == "POST") {

    const newUser: HelloPostRequest = req.body;

    if (newUser) {
      await prisma.user.create({ data: newUser });
      res.status(204).json({});
    } else {
      res.status(400).json({ error: "Could not create user." })
    }
  }
}
