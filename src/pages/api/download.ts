import type { NextApiRequest, NextApiResponse } from "next";
import { getToken } from 'next-auth/jwt';
import { prisma } from '../../lib/prisma';
import { Page, Tour } from "@prisma/client";
const archiver = require('archiver');

// Post API Inputs.
export interface PostDownloadRequestType {
    tourId: string
    file: File
}

// Post API Output.
export interface PostDownloadResponseType {
    error?: string;
    newPage?: Page;
    tour?: Tour;
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
        const { tourId } = req.body;

        // Error: TourID was not recieved.
        if (!tourId && typeof tourId !== "string")
            return res.status(400).json({ error: "Please fill out a valid Tour ID." });

        const tour = await prisma.tour.findMany({
            where: {
                tourAuthorId: token.id,
                id:tourId
            },
        });

        if (tour) {
            // Sets what kind of folder we want the files to be downloaded as.
            var archive = archiver('zip');
            
            // Checks if archiver fails.
            archive.on('error', function(err: any){
                throw err;
            });

            archive.pipe(res);
            // Append files from a sub-directory, putting its contents at the root of archive
            archive.directory("./websites/" + tourId, false);
            // Closes the archiver session.
            archive.finalize();
        }
        else
            return res.status(400).json({ error: "Tour was not sent back." });   
    }
}
