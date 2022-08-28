// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

export interface RegisterRequestType {
    email: string,
    password: string,
    firstName: string,
    lastName: string,
}

export interface RegisterResponseType {
  error: string,
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Response>
) {
  const { email, password, firstName, lastName } = req.body;

  if (!email || !password || !firstName || !lastName) {
    res.status(400);

    // Maybe go?
    throw new Error("Please add all fields");
  }

  //! Check if email already exists

  //! Hash password

  //! Return token

}