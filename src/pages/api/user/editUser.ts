import type { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";
import { prisma } from '../../../lib/prisma'

// API Inputs.
export interface EditUserRequestType {
    firstName: string;
    lastName: string;
}

// API Outputs.
export interface EditUserResponseType {
    error: string;
}

export default async function handler (
    req: NextApiRequest,
    res: NextApiResponse<EditUserResponseType>
) {
    const token = await getToken({req});

    if(!token)
        return res.status(400).json({error:"Not signed in"});

    const { firstName, lastName } = req.body;

    // Error: Not all fields are filled out.
    if(!firstName || !lastName)
        return res.status(400).json({error: "Please fill out all fields."});

    // If all checks are passed.
    const user = await prisma.user.update({
        where: {
            id: token.id,
        },
        data: {
            name: firstName,
            lastName,
        }
    })
    if(user)
        return res.status(200).json({error: ""});
    else
        return res.status(200).json({error: "Could not update information"})
}
