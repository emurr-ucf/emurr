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
    user?: { id: string; }[];
    error: string;
}

export default async function handler (
    req: NextApiRequest,
    res: NextApiResponse<GetUserResponseType>
) {

    // Find user information.
    const user = await prisma.user.findMany({
        select: {
            id: true,
        }
    })

    if(user){
        return res.status(200).json({error:"", user})}
    else
        return res.status(200).json({error: "User doesn't exist"})
}
