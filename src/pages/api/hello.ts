// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

interface HelloRequest {
  name: string;
}

interface HelloResponse {
  name: string;
  error?: string;
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<HelloResponse>
) {
  const vars: HelloRequest = req.body;

  res.status(200).json({ name: 'John Doe' })
}
