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
    if(!emailToken)
        res.status(400).json({ error: "No token was sent." });

    // If all Checks are passed.

    // Count Email as Verified.
    const user = await prisma.user.updateMany({
        where: {
            emailToken,
            verifyEmail:false,
        },
        data: {
            emailToken: '',
            verifyEmail:true,
        }
    })
    if(user)
        return res.status(200).json({error: ""});
    else
        return res.status(200).json({error: "Could not verify email."})
}
