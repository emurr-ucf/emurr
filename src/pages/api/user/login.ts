import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from '../../../lib/prisma';
import { User } from '@prisma/client';
import comparePass from '../../../lib/comparePassword';

// API Inputs.
export interface LoginRequestType {
<<<<<<< HEAD
    firstName: string;
    lastName: string;
=======
>>>>>>> sign-in-connect
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
<<<<<<< HEAD
    res: NextApiResponse<LoginResponseType>
=======
    res: NextApiResponse
>>>>>>> sign-in-connect
) {
    const { email, password } = req.body;

    // Error: Not all fields are filled out.
<<<<<<< HEAD
    if(!email || !password) {
        res.status(400);

        throw new Error("Please add all fields.");
    }

    // Error: Not a valid email.
    if((typeof email !== 'string') || (!email.includes('@')) || (!email.includes('.'))) {
        res.status(400);

        throw new Error("Please input a valid email.");
=======
    if (!email || !password) {
        res.status(400).json({ error: "Please fill out all fields." });
        return;
    }

    // Error: Not a valid email.
    if ((typeof email !== 'string') || (!email.includes('@')) || (!email.includes('.'))) {
        res.status(400).json({ error: "Please input a valid email." });
        return;
>>>>>>> sign-in-connect
    }

    // If all checks are passed.
    // Query the database.
    const user = await prisma.user.findFirst({
        where: {
            email,
        },
    })

<<<<<<< HEAD
    if(user){
        // If inputted password and hasshed password are the same, return user.
        if(comparePass(password, user.password))
            return res.status(200).json({error:"", user});
        else 
            return res.status(200).json({error: "Incorrect password."}); 
    }
    else
        return res.status(200).json({error: "User doesn't exist."})
=======
    if (user) {
        // If inputted password and hasshed password are the same, return user.
        if(comparePass(password, user.password))
            return res.status(200).send({ error:"", user });
        else 
            return res.status(400).send({ error: "Incorrect password." }); 
    } else
        return res.status(400).send({ error: "User doesn't exist." })
>>>>>>> sign-in-connect
}
