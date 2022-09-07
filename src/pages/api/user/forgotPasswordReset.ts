import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from '../../../lib/prisma'
import hashPass from '../../../lib/hashPassword';

// API Inputs.
export interface RegisterRequestType {
    newPassword: string;
    resPassToken: string;
}

// API Outputs.
export interface RegisterResponseType {
    error: string;
}

export default async function handler (
    req: NextApiRequest,
    res: NextApiResponse<RegisterResponseType>
) {
    const { newPassword, resPassToken } = req.body;

    // Error: Token was not sent.
    if(!resPassToken) {
        res.status(400);

        throw new Error("No token was sent.");
    }

    // Error: Password was not recieved.
    if(!newPassword) {
        res.status(400);

        throw new Error("No password was recieved.");
    }

    // If All Checks are Passed.
    // Hash Password.
    const hashedPass = hashPass(newPassword);

    // Update Database with New Password.
    const user = await prisma.user.updateMany({
        where: {
            resPassToken,
            resPassword:1,
        },
        data: {
            password:hashedPass,
            resPassToken: '',
            resPassword:0,
        }
    })
    
    if(user)
        return res.status(200).json({error: ""});
    else
        return res.status(200).json({error: "Could not change password."})
}
