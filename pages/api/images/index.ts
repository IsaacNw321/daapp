import { NextApiRequest, NextApiResponse } from 'next';
import multer from 'multer'
import { ImgurClient } from 'imgur';


const upload = multer({ storage: multer.memoryStorage() });

export const config = {
  api: {
    bodyParser: false, 
  },
};


const uploadMiddleware = upload.single('imageFile');

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  uploadMiddleware(req, res, async (err) => {
    if (err) {
      return res.status(500).json({ success: false, message: 'File upload error', error: err });
    }

    if (req.method === 'POST') {
      try {
        const imageFile = req.file;
        console.log("Aqui deberia verse", imageFile)
        if (!imageFile) {
          return res.status(400).json({ success: false, message: 'No file uploaded' });
        }

        const client = new ImgurClient({
          clientId: process.env.NEXT_PUBLIC_CLIENT_ID,
          clientSecret: process.env.NEXT_PUBLIC_CLIENT_SECRET,
          refreshToken: process.env.NEXT_PUBLIC_REFRESH_TOKEN,
        });

        const response = await client.upload({
          image: imageFile.buffer,
          type: 'stream',
        });

        if (response.success) {
          res.status(200).json({ success: true, imageUrl: response.data.link });
        } else {
          res.status(500).json({ success: false, message: 'Image upload failed' });
        }
      } catch (error) {
        res.status(500).json({ success: false, message: 'Server error', error });
      }
    } else {
      res.setHeader('Allow', ['POST']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  });
}