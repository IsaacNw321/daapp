import { handleAuth, handleCallback, getSession } from '@auth0/nextjs-auth0';
import { NextApiResponse, NextApiRequest } from 'next';

export default handleAuth({
  async callback(req: NextApiRequest, res: NextApiResponse) {
    try {
      await handleCallback(req, res);
      const session = await getSession(req, res);
    } catch (error: any) {
      res.status(error.status || 500).end(error.message);
    }
  }
});