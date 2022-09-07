import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from '../../../lib/prisma'

// API Inputs.
export interface RegisterRequestType {
    emailToken: string;
}

// API Outputs.
export interface RegisterResponseType {
    error: string;
}

export default async function handler (
    req: NextApiRequest,
    res: NextApiResponse<RegisterResponseType>
) {
    const { emailToken } = req.body;

    // Error: Token was not sent.
    if(!emailToken) {
        res.status(400);

        throw new Error("No token was sent.");
    }

    // If all checks are passed.

    const user = await prisma.user.updateMany({
        where: {
            emailToken,
            emailVerified:false,
        },
        data: {
            emailToken: '',
            emailVerified:true,
        }
    })
    if(user)
        return res.status(200).json({error: ""});
    else
        return res.status(200).json({error: "Could not verify email."})
}
