// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type Request = {
    email: string,
    password: string,
    firstName: string,
    lastName: string,
}

type Respnse = {

}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Response>
) {
  const { email, password, firstName, lastName } = req.body;

  

}