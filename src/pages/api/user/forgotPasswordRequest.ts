import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from '../../../lib/prisma'
import generateRandString from '../../../lib/generateRandString';

// API Inputs.
export interface RegisterRequestType {
    email: string;
}

// API Outputs.
export interface RegisterResponseType {
    error: string;
}

export default async function handler (
    req: NextApiRequest,
    res: NextApiResponse<RegisterResponseType>
) {
    const { email } = req.body;

    // Error: Email was not recieved.
    if(!email) {
        res.status(400);

        throw new Error("Email was not recieved.");
    }

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
    if(user)
        return res.status(200).json({error: ""});
    else
        return res.status(200).json({error: "Could not send forgot password request."})
}
