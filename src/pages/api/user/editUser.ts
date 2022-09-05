import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from '../../../lib/prisma'

// API Inputs.
export interface RegisterRequestType {
    firstName: string;
    lastName: string;
    email: string;
}

// API Outputs.
export interface RegisterResponseType {
    error: string;
}

export default async function handler (
    req: NextApiRequest,
    res: NextApiResponse<RegisterResponseType>
) {
    const { firstName, lastName, email } = req.body;

    // Error: Email was not received.
    if(!email) {
        res.status(400);

        throw new Error("Email was not received.");
    }

    // Error: Not all fields are filled out.
    if(!firstName || !lastName) {
        res.status(400);

        throw new Error("Please fill out all fields.");
    }

    // Error: Name values are not strings.
    if((typeof firstName !== 'string') || (typeof lastName !== 'string')) {
        res.status(400);

        throw new Error("Please input a proper name.");
    }

    // If all checks are passed.

    const user = await prisma.user.update({
        where: {
            email,
        },
        data: {
            firstName,
            lastName,
        }
    })
    if(user)
        return res.status(200).json({error: ""});
    else
        return res.status(200).json({error: "Could not update information"})
}
