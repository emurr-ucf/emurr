import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from '../../lib/prisma'

// API Inputs.
export interface GetVeryifyEmailRequestType {
    emailToken: string;
}

// API Outputs.
export interface GetVerifyEmailResponseType {
    error?: string;
}

export default async function handler (
    req: NextApiRequest,
    res: NextApiResponse,
) {
    const { emailToken } = req.body;

    // Error: Token was not sent.
    if(!emailToken)
        return res.status(400).json({ error: "No token was sent." });

    // If All Checks are Passed.

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
        return res.status(200).json({});
    else
        return res.status(409).json({error: "Could not verify email."})
}
