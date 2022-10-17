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
    if (req.method === "POST") {
        const { email } = req.body;

        // Error: Not a valid email.
        if(!email || (typeof email != 'string') || (!email.includes('@')) || (!email.includes('.')))
            return res.status(400).json({error: "Please input a valid email."});

        // If All Checks are Passed.
        
        // Send Verification Email.
        // Creates a random string.
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
        
        // Insert Token in Database.
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
            return res.status(400).json({error: "No token was sent."});
    
        // Error: Password is not valid.
        if (!newPassword || (typeof newPassword !== 'string'))
            return res.status(400).json({error: "Please input a valid password."});
        
        const resetPassRequest = await prisma.user.findFirst({
            where: {
                resPassToken,
            },
        });

        if (!resetPassRequest)
            return res.status(404).json({error: "No reset password request found."});

        // If All Checks are Passed.
        // Hash password.
        const hashedPass = hashPass(newPassword);
    
        // Put New Password in Database.
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
