import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from '../../lib/prisma'
import generateRandString from '../../lib/generateRandString';
import hashPass from '../../lib/hashPassword';

// API Post Inputs.
export interface PostForgotPasswordRequestType {
    email: string;
}

// API Post Outputs.
export interface PostForgotPasswordResponseType {
    error?: string;
}

// API Put Inputs.
export interface PutForgotPasswordRequestType {
    newPassword: string;
    resPassToken: string;
}

// API Put Outputs.
export interface PutForgotPasswordResponseType {
    error?: string;
}

export default async function handler (
    req: NextApiRequest,
    res: NextApiResponse
) {
    if ( req.method === "POST") {
        const { email } = req.body;

        // Error: Email was not recieved.
        if (!email)
            return res.status(400).json({error: "Email was not recieved."});

        // If All Checks are Passed.
        // Send Verification Email.
        // Creates a Random String.
        var passwordTok = generateRandString();
        
        // Sends the Verification Email.
        const sgMail = require('@sendgrid/mail')
            sgMail.setApiKey(process.env.SENDGRID_API_KEY)
            const msg = {
                // Decides sender and recipient of outgoing email and which template from sendgrid is being used.
                to: email,
                from: 'cop43318@gmail.com',
                template_id: 'd-32c150b4de8043edba973cd21ace99f5',
                // Information being sent in the email.
                dynamic_template_data: {
                    ahjst: passwordTok
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
        
        // Insert Token into the Database.
        const user = await prisma.user.update({
            where: {
                email,
            },
            data: {
                resPassword:1,
                resPassToken:passwordTok
            }
        })
        if (user)
            return res.status(200).json({});
        else
            return res.status(409).json({error: "Could not send forgot password request."});
    }

    if (req.method === "PUT") {
        const { newPassword, resPassToken } = req.body;

        // Error: Token was not sent.
        if (!resPassToken)
            res.status(400).json({error: "No token was sent."});
    
        // Error: Password was not recieved.
        if (!newPassword)
            res.status(400).json({error: "No password was recieved."});
    
        // If All Checks are Passed.
        // Hash Password.
        const hashedPass = hashPass(newPassword);
    
        // Update Database with New Password.
        const user = await prisma.user.updateMany({
            where: {
                resPassToken,
                resPassword:1,
            },
            data: {
                password:hashedPass,
                resPassToken: '',
                resPassword:0,
            }
        })
        
        if (user)
            return res.status(200).json({});
        else
            return res.status(409).json({error: "Could not change password."})
    }
}
