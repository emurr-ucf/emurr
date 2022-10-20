import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from '../../../lib/prisma';
import { User } from '@prisma/client';

const secret = process.env.NEXTAUTH_SECRET

// API Inputs.
export interface GetUserRequestType {
    email: string;
}

// API Outputs.
export interface GetUserResponseType {
    user?: User;
    id?: {id: string}; // this feels very silly but i cant get it to work as pure string
    error: string;
}

export default async function handler (
    req: NextApiRequest,
    res: NextApiResponse<GetUserResponseType>
) {
    const { email } = req.body;

    // Error: Email was not received.
    if(!email) {
        res.status(400);

        throw new Error("Email was not received.");
    }

    // Find user information.
    const id = await prisma.user.findFirst({
        where: {
            email,
        },
        select: {
            id: true,
        },
    })

    if(id){
        return res.status(200).json({error:"", id})}
    else
        return res.status(200).json({error: "User doesn't exist"})
}
