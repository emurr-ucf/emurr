import type { NextApiRequest, NextApiResponse } from "next";
import { getToken } from 'next-auth/jwt';
import { prisma } from '../../lib/prisma';
import generateRandString from '../../lib/generateRandString';
import hashPass from '../../lib/hashPassword';

// Post API Inputs.
export interface PostUserRequestType {
    firstName: string;
    lastName: string;
    email: string;
    password: string;

    // Not passed in, created by this endpoint.
    verifyEmail: number;
    emailToken: string;
    resPassword: number;
    resPassToken: string;
}

// Post API Output.
export interface PostUserResponseType {
    error?: string;
}

// Put API Inputs.
export interface PutUserRequestType {
    firstName: string;
    lastName: string;
    email: string;
}

// Put API Outputs.
export interface PutUserResponseType {
    error?: string;
}

// Delete API Inputs.
export interface DeleteSuperUserRequestType {
    userID: string;
}

// Delete API Outputs.
export interface DeleteSuperUserResponseType {
    error?: string;
}

export default async function handler (
    req: NextApiRequest,
    res: NextApiResponse
) {
    // Registers a User.
    if (req.method === "POST") {
        const { firstName, lastName, email, password } = req.body;

        // Error: Not a valid email.
        if(!email || (typeof email != 'string') || (!email.includes('@')) || (!email.includes('.')))
            return res.status(400).json({ error: "Please input a valid email." });

        // Error: Email already exists.
        const user = await prisma.user.findFirst({
            where: {
                email,
            },
        })
        if(user)
            return res.status(400).json({ error: "User already exists." });

        // Error: Not all fields are filled out.
        if(!firstName || !lastName || !password)
            return res.status(400).json({ error: "Please add all fields." });

        // Error: Name values are not strings.
        if((typeof firstName !== 'string') || (typeof lastName !== 'string'))
            return res.status(400).json({ error: "Please input a proper name." });

        // If all checks are passed.
        
        // Send Verification Email.
        // Creates a random string.
        const emailTok = generateRandString();

        // Sends the verification email. 
        const sgMail = require('@sendgrid/mail')
            sgMail.setApiKey(process.env.SENDGRID_API_KEY)
            const msg = {
                // Decides sender and recipient of outgoing email and which template from sendgrid is being used.
                to: email,
                from: 'cop43318@gmail.com',
                template_id: 'd-32c150b4de8043edba973cd21ace99f5',
                // Information being sent in the email.
                dynamic_template_data: {
                    firstName: firstName,
                    ahjst: emailTok
                }
            }
            sgMail
                .send(msg)
                .then(() => {
                    console.log('Email sent')
                })
                .catch((error: string) => {
                    console.error(error)
                })

        // Hash Password.
        const hashedPass = hashPass(password);

        // Save New User.
        const userData = {name: firstName, lastName, email, password:hashedPass, verifyEmail:false, emailToken: emailTok, resPassword:0, resPassToken:''};
        const savedUser = await prisma.user.create({data:userData});
        return res.status(200).json({error: ""});
    } 
    
    // Updates user information.
    if (req.method === "PUT") {
        // Checks JWT token.
        // const token = await getToken({req});
        // if (!token)
        //     return res.status(401).json({ error: "User is not logged in." });

        const { firstName, lastName, email } = req.body;

        // Error: Email was not received.
        if(!email) 
            return res.status(400).json({ error: "Email was not recieved." });

        // Error: Not all fields are filled out.
        if(!firstName || !lastName)
            return res.status(400).json({ error: "Please fill out all fields." });

        // Error: Name values are not strings.
        if((typeof firstName !== 'string') || (typeof lastName !== 'string'))
            return res.status(400).json({ error: "Please input a proper name." });

        // If all checks are passed.

        const user = await prisma.user.update({
            where: {
                email,
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

    // Deletes a user.
    if (req.method === "DELETE") {
        // Checks JWT token.
        // const token = await getToken({req});
        // if (!token)
        //     return res.status(401).json({ error: "User is not logged in." });
        
        const { userID } = req.body;

        // Error: UserID is not valid.
        if (!userID || typeof userID != "string")
            return res.status(401).json({ error: "UserID is not a string." });

        // Deletes a user.
        const deleteUser = await prisma.user.delete({
            where: {
                id: userID,
            },
        });

        if (deleteUser)
            return res.status(200).json({ error: "User deleted." });
        else
            return res.status(200).json({ error: "User was not deleted." });
    }
}
