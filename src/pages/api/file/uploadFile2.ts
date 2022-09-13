import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from '../../../lib/prisma';
import multer from 'multer';

const destination = "./websites/dump"

// API Inputs.
export interface uploadFileType {
   email: String,
}

// API Outputs.
export interface LoginResponseType {
    error: string;
}

export default async function handler (
    req: NextApiRequest, 
    res: NextApiResponse
) {
    const upload = multer({dest: destination}); 

    const { email } = req.body;


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

    if(user) {

    }
    else
        return res.status(200).json({error: "User doesn't exist."})
}
