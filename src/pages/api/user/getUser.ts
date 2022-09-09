import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from '../../../lib/prisma';
import { User } from '@prisma/client';

const secret = process.env.NEXTAUTH_SECRET

// API Inputs.
<<<<<<< HEAD
export interface LoginRequestType {
=======
export interface GetUserRequestType {
>>>>>>> sign-in-connect
    email: string;
}

// API Outputs.
<<<<<<< HEAD
export interface LoginResponseType {
=======
export interface GetUserResponseType {
>>>>>>> sign-in-connect
    user?: User;
    error: string;
}

export default async function handler (
    req: NextApiRequest,
<<<<<<< HEAD
    res: NextApiResponse<LoginResponseType>
=======
    res: NextApiResponse<GetUserResponseType>
>>>>>>> sign-in-connect
) {
    const { email } = req.body;

    // Error: Email was not received.
    if(!email) {
        res.status(400);

        throw new Error("Email was not received.");
    }

    // Find user information.
    const user = await prisma.user.findFirst({
        where: {
            email,
        },
    })

    if(user)
        return res.status(200).json({error:"", user})
    else
        return res.status(200).json({error: "User doesn't exist"})
}
