// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

export interface LoginRequestType {
  name: string,
}

export interface LoginResponseType {
  error?: string,
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<LoginResponseType>
) {
  

  res.status(200).json({ error: 'John Doe' })
}