import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from '../../../lib/prisma';
import { User } from '@prisma/client';
import comparePass from '../../../lib/comparePassword';

// API Inputs.
export interface LoginRequestType {
    email: string;
    password: string;
}

// API Outputs.
export interface LoginResponseType {
    user?: User;
    error: string;
}

export default async function handler (
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { email, password } = req.body;

    // Error: Not all fields are filled out.
    if (!email || !password) {
        res.status(400).json({ error: "Please fill out all fields." });
        return;
    }

    // Error: Not a valid email.
    if ((typeof email !== 'string') || (!email.includes('@')) || (!email.includes('.'))) {
        res.status(400).json({ error: "Please input a valid email." });
        return;
    }

    // If all checks are passed.
    // Query the database.
    const user = await prisma.user.findFirst({
        where: {
            email,
        },
    })

    if (user) {
        // If inputted password and hasshed password are the same, return user.
        if(comparePass(password, user.password))
            return res.status(200).send({ error:"", user });
        else 
            return res.status(400).send({ error: "Incorrect password." }); 
    } else
        return res.status(400).send({ error: "User doesn't exist." })
}
