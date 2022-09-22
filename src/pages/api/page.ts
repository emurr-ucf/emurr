import type { NextApiRequest, NextApiResponse } from "next";
import { getToken } from 'next-auth/jwt';
import { prisma } from '../../lib/prisma';
import multer from 'multer';
import fs from 'fs'

// Post API Inputs.
export interface PostFileRequestType {
    tourId: string
    file: File
}

// Post API Output.
export interface PostFileResponseType {
    error?: string;
}

// Put API Inputs.
export interface PutFileRequestType {
    tourId: string,
    pageId: string,
    file: File
}

// Put API Outputs.
export interface PutFileResponseType {
    error?: string;
}

// Get API Inputs.
export interface GetFileRequestType {
    tourId: string,
    pageId: string,
}

// Get API Outputs.
export interface GetFileResponseType {
    error?: string;
}

export default async function handler (
    req: NextApiRequest,
    res: NextApiResponse
) {
    // Posting new page.
    if (req.method === "POST") {
        // Checks JWT token.
        const token = await getToken({req});
        if (!token)
            return res.status(401).json({ error: "User is not logged in." });

        const { tourId } = req.query;
        
        // Creates a new page instance in the database.
        const pageData = {title: '', authorId: token.id, tourId};
        const savedPage = await prisma.page.create({data: pageData});

        if(savedPage) {
            const destination = "./websites/" + tourId; 

            // Upload page multer instance.
            const createPage = multer({
            storage: multer.diskStorage({
                destination,
                filename: (req, file, cb) => cb(null, savedPage.id + /\.[0-9a-z]+$/i.exec(file.originalname)),
                }),
            });

            // Creates page.
            createPage.any() (req, res, () => {
            });

            return res.status(200).json({ error: "Page created." });
        }
        else
            return res.status(200).json({ error: "Page could not be created." });
    } 
    
    // Updates a page.
    if (req.method === "PUT") {
        // Checks JWT token.
        const token = await getToken({req});
        if (!token)
            return res.status(401).json({ error: "User is not logged in." });

        const { tourId, pageId } = req.query;

        const destination = "./websites/" + tourId; 

        // Updates existing page multer instance.
        const updatedPage = multer({
            storage: multer.diskStorage({
                destination,
                filename: (req, file, cb) => cb(null, file.originalname),
                }),
            });

        // Replaces page in new position.
        updatedPage.any() (req, res, () => {
        });

        // Updates the last modified date.
        const updatePage = await prisma.page.update({
            where: {
                id: pageId,
            },
            data: {
                pageUpdatedAt: new Date(),
            },
        });

        if (updatePage)
            return res.status(200).json({ error: "Page updated." });
        else
            return res.status(200).json({ error: "Page could not be updated." });
    }

    // Gets file.
    if (req.method === "GET") {
        // Checks JWT token.
        const token = await getToken({req});
        if (!token)
            return res.status(401).json({ error: "User is not logged in." });

        const { tourId, pageId } = req.query;

        // Returns file.
        const path = "./websites/" + tourId + "/" + pageId + ".txt";
        const file = fs.createReadStream(path)
        res.setHeader('Content-Disposition', 'attachement; filename="' + pageId + '.txt"')
        file.pipe(res)
    }
}

export const config = {
    api: {
      bodyParser: false, // Disallow body parsing, consume as stream
    },
};

