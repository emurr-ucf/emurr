import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from '../../lib/prisma'
import generateRandString from '../../lib/generateRandString';
import hashPass from '../../lib/hashPassword';
import sendEmail from "../../lib/sendEmail";

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
        
        // Sends the verification email.
        const emailSend = sendEmail('None', email, passwordTok, 'Forgot');
        
        // const nodemailer = require('nodemailer')

        // var transporter = nodemailer.createTransport({
        //     service: 'gmail',
            
        //     auth: {
        //         user: 'donotreply.emurr@gmail.com',
        //         pass: process.env.NODEMAILER_KEY
        //     },
        // });
        // var mailOptions = {
        //     from: 'donotreply.emurr@gmail.com',
        //     to: 'gian.alvarez2000@gmail.com',
        //     subject: 'Reset Password',
        //     text: 'Hi, we recently got a reset password request. To do so, please follow the following link.\n\nlocalhost:3000/forgotPasswordReset?resPassToken=' + passwordTok +'\n\nThank you.',
        // };

        // transporter.sendMail(mailOptions, function(error:any, info:any){
        //     if (error) {
        //         console.log(error);
        //     } else {
        //         console.log('Email sent: ' + info.response);
        //     }
        // });
        
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
