import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from '../../../lib/prisma'

// API Inputs.
export interface RegisterRequestType {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

// API Outputs.
export interface RegisterResponseType {
    error: string;
}

export default async function handler (
    req: NextApiRequest,
    res: NextApiResponse<RegisterResponseType>
) {
    const { firstName, lastName, email, password } = req.body;

    // Error: Email already exists.
    const user = await prisma.user.findFirst({
        where: {
            email,
        },
    })
    
    if(user) {
        res.status(400);
        
        throw new Error("User already exists.")
    }

    // Error: Not all fields are filled out.
    if(!firstName || !lastName || !email || !password) {
        res.status(400);

        throw new Error("Please add all fields.");
    }

    // Error: Name values are not strings.
    if((typeof firstName !== 'string') || (typeof lastName !== 'string')) {
        res.status(400);

        throw new Error("Please input a proper name.");
    }

    // Error: Not a valid email.
    if((!email.includes('@')) || (!email.includes('.'))) {
        res.status(400);

        throw new Error("Please input a valid email.");
    }

    // If all checks are passed.
    
    // Hash Password.
    
    // Save New User.
    //const userData = req.body;
    const userData = {firstName, lastName, email, password:password};
    const savedUser = await prisma.user.create({data:userData});
    return res.status(200).json({error: ""});
}
