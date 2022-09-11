import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from '../../../lib/prisma';
import { User } from '@prisma/client';
import comparePass from '../../../lib/comparePassword';

// API Inputs.
export interface LoginRequestType {
    firstName: string;
    lastName: string;
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
    res: NextApiResponse<LoginResponseType>
) {
    const { email, password } = req.body;

    // Error: Not all fields are filled out.
    if(!email || !password) {
        res.status(400);

        throw new Error("Please add all fields.");
    }

    // Error: Not a valid email.
    if((typeof email !== 'string') || (!email.includes('@')) || (!email.includes('.'))) {
        res.status(400);

        throw new Error("Please input a valid email.");
    }

    // If All Checks are Passed.
    // Query the Database.
    const user = await prisma.user.findFirst({
        where: {
            email,
        },
    })

    if(user){
        // If inputted password and hashed password are the same, continue to next step.
        if(comparePass(password, user.password)) {
            // If Email is Verified Return User.
            if(user.emailVerified === true)
                return res.status(200).json({error:"", user});
            
            //Error: Email not verified.
            else
                return res.status(200).json({error: "Email not verified, please check email."}); 
        }
        // Error: Incorrect password.
        else 
            return res.status(200).json({error: "Incorrect password."}); 
    }
    else
        return res.status(200).json({error: "User doesn't exist."})
}
