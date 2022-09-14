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
    console.log("Testing1");

    // Error: Not all fields are filled out.
    if (!email || !password)
        return res.status(400).json({ error: "Please fill out all fields." });

    // Error: Not a valid email.
    if ((typeof email !== 'string') || (!email.includes('@')) || (!email.includes('.')))
        return res.status(400).json({ error: "Please input a valid email." });

    // If all checks are passed.

    // Query the Database.
    const user = await prisma.user.findFirst({
        where: {
            email,
        },
    })

    if(user) {
        // If inputted password and hashed password are the same, continue to next step.
        if(user.password && comparePass(password, user.password)) {
            // If Email is Verified Return User.
            if(user.verifyEmail === true){
                console.log("Testing2");
                return res.status(200).json({error:"", user});
            }
            //Error: Email not verified.
            else
                return res.status(200).json({error: "Email not verified, please check email."}); 
        }
        // Error: Incorrect password.
        else
            return res.status(400).send({ error: "Incorrect password." });
    } else
        return res.status(400).send({ error: "User doesn't exist." })
}
