import type { NextApiRequest, NextApiResponse } from "next";
import { getToken } from 'next-auth/jwt';
import { prisma } from '../../lib/prisma';
import { returnTour } from '../../lib/returnTour';
import multer from 'multer';
import fs from 'fs'
import { Tour } from "@prisma/client";

// Post API Inputs.
export interface PostFileRequestType {
    tourId: string
    file: File
}

// Post API Output.
export interface PostFileResponseType {
    error?: string;
    pages?: Tour;
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
    // Checks JWT token.
    const token = await getToken({req});
    if (!token)
        return res.status(401).json({ error: "User is not logged in." });

    // Posting new page.
    if (req.method === "POST") {
        const { tourId } = req.query;

        if (typeof tourId != "string") return res.status(400).json({ error: "Please send a tour ID." });
        
        // Creates a new page instance in the database.
        const pageData = {title: "Untitled", authorId: token.id, tourId};
        const savedPage = await prisma.page.create({data: pageData});
        const tour = await returnTour(tourId, token.id);

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
            createPage.any() (req, res, () => {});

            return res.status(200).json({ tour });
        }
        else
            return res.status(400).json({ error: "Page could not be created." });
    } 
    
    // Updates a page.
    if (req.method === "PUT") {
        const { tourId, pageId } = req.query;

        if (typeof tourId != "string" || typeof pageId != "string") 
            return res.status(400).json({ error: "Page ID and Tour ID cannot be blank." });

        const destination = "./websites/" + tourId; 

        // Updates existing page multer instance.
        const updatedPage = multer({
            storage: multer.diskStorage({
                destination,
                filename: (req, file, cb) => cb(null, pageId + /\.[0-9a-z]+$/i.exec(file.originalname)),
                }),
            });

        // Replaces page in new position.
        updatedPage.any() (req, res, () => {});

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
        const { tourId, pageId } = req.query;

        if (!pageId && typeof tourId === "string") {
            const pages = await prisma.page.findMany({
                where: {
                    authorId: token.id,
                    tourId,
                },
                select: {
                    id: true,
                    title: true,
                    published: true,
                    comments: true,
                }
            });

            res.status(200).json({ tours: pages })

        } else if (typeof tourId != "string" || typeof pageId != "string") {
            return res.status(400).json({ error: "Page ID and Tour ID cannot be blank." });
        }
        
        // Returns file.
        const path = "./websites/" + tourId + "/" + pageId + ".html";
        const file = fs.createReadStream(path)
        res.setHeader('Content-Disposition', 'attachement; filename="' + pageId + '.html"')
        file.pipe(res);
        
    }
}

export const config = {
    api: {
      bodyParser: false, // Disallow body parsing, consume as stream
    },
};

