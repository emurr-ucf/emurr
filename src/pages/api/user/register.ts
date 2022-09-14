import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from '../../../lib/prisma';
import generateRandString from '../../../lib/generateRandString';
import hashPass from '../../../lib/hashPassword';

// API Inputs.
export interface RegisterRequestType {
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

// API Outputs.
export interface RegisterResponseType {
    error: string;
}

export default async function handler (
    req: NextApiRequest,
    res: NextApiResponse<RegisterResponseType>
) {
    const { firstName, lastName, email, password } = req.body;

    // Error: Email already exists.
    const user = await prisma.user.findFirst({
        where: {
            email,
        },
    })
    if(user)
        return res.status(400).json({ error: "User already exists." });

    // Error: Not all fields are filled out.
    if(!firstName || !lastName || !email || !password)
        return res.status(400).json({ error: "Please add all fields." });

    // Error: Name values are not strings.
    if((typeof firstName !== 'string') || (typeof lastName !== 'string'))
        return res.status(400).json({ error: "Please input a proper name." });

    // Error: Not a valid email.
    if((!email.includes('@')) || (!email.includes('.')))
        return res.status(400).json({ error: "Please input a valid email." });

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