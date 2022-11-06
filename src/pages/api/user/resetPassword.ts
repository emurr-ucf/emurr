import type { NextApiRequest, NextApiResponse } from "next";
import { getToken } from 'next-auth/jwt';
import { prisma } from '../../../lib/prisma';
import comparePass from "../../../lib/comparePassword";
import hashPass from '../../../lib/hashPassword';

// Put API Inputs.
export interface PutResetPasswordRequestType {
    currentPassword: string;
    confirmPassword: string;
    newPassword: string;
}

// Put API Outputs.
export interface PutResetPasswordResponseType {
    error?: string;
}

export default async function handler (
    req: NextApiRequest,
    res: NextApiResponse
) {
    // Checks JWT token.
    const token = await getToken({req});
    if (!token)
        return res.status(401).json({error: "User is not logged in."});

    // Resets a Password.
    if (req.method === "PUT") {
        const { currentPassword, confirmPassword, newPassword } = req.body;

        // Error: Not all fields are filled out.
        if (!currentPassword || !confirmPassword || !newPassword)
            return res.status(400).json({error: "Please add all fields."});

        // Error: Password values are not strings.
        if ((typeof currentPassword !== 'string') || (typeof confirmPassword !== 'string') || (typeof newPassword !== 'string'))
            return res.status(400).json({error: "Please input proper password values."});

        // Error: New password and confirmation password don't match.
        if (newPassword !== confirmPassword)
            return res.status(400).json({error: "New password and confirmation password don't match."});
        
        // Queries database for the current user. 
        const user = await prisma.user.findFirst({
                where: {
                    id:token.id
                },
            });

        if (user) {
            // If the current password is correct, password is updated.
            if (user.password && comparePass(currentPassword, user.password)) {
                // Error: New password already being used.
                if (user.password && comparePass(newPassword, user.password))
                    return res.status(409).json({error: "New password already in use."});
                
                // Hashes new password.
                const newHashedPassword = hashPass(newPassword);
                const updatePassword = await prisma.user.update({
                    where: {
                        id: token.id,
                    },
                    data: {
                        password: newHashedPassword,
                    },
                })

                if (updatePassword)
                    return res.status(200).json({});
                else
                    return res.status(409).json({error: "Password was not updated."});
            }
            else
                return res.status(401).json({error: "Incorrect password."});
        }
        else
            return res.status(404).json({error: "User not in database."});      
    }
}
