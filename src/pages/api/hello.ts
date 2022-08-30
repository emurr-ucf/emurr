// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../lib/prisma'

interface HelloRequest {
  name: string;
}

interface HelloResponse {
  name: string;
  error?: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<HelloResponse>
) {
  const query = await prisma.post.findMany()

  const vars: HelloRequest = req.body;

  res.status(200).json({ name: 'John Doe' })
}
