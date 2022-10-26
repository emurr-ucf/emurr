import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from '../../../lib/prisma';
import { User } from '@prisma/client';

const secret = process.env.NEXTAUTH_SECRET

// API Inputs.
export interface GetUserRequestType {
    id: string;
}

// API Outputs.
export interface GetUserResponseType {
    user?: User;
    error: string;
}

export default async function handler (
    req: NextApiRequest,
    res: NextApiResponse<GetUserResponseType>
) {
    const { id } = req.body;

    // Error: ID was not received.
    if(!id) {
        res.status(400);

        throw new Error("ID was not received.");
    }

    // Find user information.
    const user = await prisma.user.findFirst({
        where: {
            id,
        },
    })

    if(user)
        return res.status(200).json({error:"", user})
    else
        return res.status(200).json({error: "User doesn't exist"})
}