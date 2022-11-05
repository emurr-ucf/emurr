import type { NextApiRequest, NextApiResponse } from "next";
import { getToken } from 'next-auth/jwt';
import { prisma } from '../../lib/prisma';
import { Page, Tour } from "@prisma/client";
import fs from 'fs';
const archiver = require('archiver');

// Post API Inputs.
export interface PostDownloadRequestType {
    tourId: string
    file: File
}

// Post API Output.
export interface PostDownloadResponseType {
    error?: string;
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

    // Copies a Tour.
    if (req.method === "POST") {
        const { tourId, userId } = req.body;

        // Error: UserID and TourID were not recieved.
        if (!tourId && typeof tourId !== "string" && !userId && typeof userId !== "string")
            return res.status(400).json({ error: "Please send a valid userID and tourID." });

        const tour = await prisma.tour.findFirst({
            where: {
                tourAuthorId: userId,
                id: tourId
            },
        });

        if (tour) {
            // Creates a copy of the tour in the database.
            const newTour = await prisma.tour.create({
                data: {
                    tourTitle: tour.tourTitle + " - Copy",
                    tourAuthorId: token.id,
                }
            })

            if (newTour) {
                // Gets all the pages of the original tour in the database.
                const pages = await prisma.page.findMany({
                    where: {
                        tourId: tour.id,
                    }
                })

                if (pages) {
                    // Creates a directory with the tour copy's ID.
                    fs.mkdirSync("./websites" + "/" + newTour.id);

                    // Creates a copy of each page found in the original tour.
                    for (let i = 0; i < pages.length; i++) {
                        // Creates a copy of each page found in the database.
                        const pageCopy = await prisma.page.create ({
                            data: {
                                title: pages[i].title + "- Copy",
                                authorId: token.id,
                                tourId: newTour.id,
                            }
                        });

                        if (pageCopy) {
                            // Creates a copy of the original page and puts it into the new directory.
                            fs.copyFile("./websites/" + tour.id + "/" + pages[i].id + ".html", "./websites/" + newTour.id + "/" + pageCopy.id + ".html", (err) => {
                                if (err) {
                                  console.log("Error Found:", err);
                                }
                                else {
                                  console.log("\nFile Copied");
                                }
                            })
                            
                        }
                        else 
                            return res.status(400).json({ error: "Page could not be created." });                         
                    }
                    
                    return res.status(200).json({}); 
                }
                else
                    return res.status(400).json({ error: "Pages could not be found." });
            }
            else
                return res.status(400).json({ error: "Tour could not be created." }); 
        }
        else
            return res.status(400).json({ error: "Tour could not be found." });
    }

    // Lets You Get the Pages of Other Persons Tour.
    if (req.method === "GET") {
        const { tourId, pageId } = req.query;

        if (!pageId && typeof tourId === "string") {
            const pages = await prisma.page.findMany({
                where: {
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
