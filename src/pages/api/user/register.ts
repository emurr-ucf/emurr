import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from '../../../lib/prisma';
import hashPass from '../../../lib/hashPassword';

// API Inputs.
export interface RegisterRequestType {
    firstName: string;
    lastName: string;
    email: string;
    password: string;

    // Not passed in, created by this endpoint.
    emailVerified: number;
    emailToken: number;
    resPassword: number;
    resPassToken: number;
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
    const hashedPass = hashPass(password);

    // Save New User.
    const userData = {firstName, lastName, email, password:hashedPass, emailVerified:0, emailToken:0, resPassword:0, resPassToken:0};
    const savedUser = await prisma.user.create({data:userData});
    return res.status(200).json({error: ""});
}
