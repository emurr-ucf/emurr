import { NextApiRequest, NextApiResponse } from 'next';
import multer from 'multer'
import nextConnect from 'next-connect'

const upload = multer({ 
    storage: multer.diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => cb(null, file.originalname)
    })
});

const apiRoute = nextConnect<NextApiRequest, NextApiResponse>({
    onError: (error, req, res) => {
        res.status(501).json({ error: `Internal server error ${error.message}` })
    },
    onNoMatch: (req, res) => {
        res.status(405).json({ error: `Method '${req.method}' not allowed` })
    },
});

apiRoute.use(upload.array('file'));

apiRoute.post((req, res) => {
    console.log("Test")
    res.status(200).json({ data: 'success' })
});

export default apiRoute;

export const config = {
    api: {
        bodyParser: false,
    }
}
