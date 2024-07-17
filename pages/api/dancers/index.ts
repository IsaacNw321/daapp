import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../lib/prisma";

export default async function Dancers(req: NextApiRequest, res: NextApiResponse) {
  const method = req.method;
  const {
    userId,
    representativeId,
  } = req.body;
  switch (method) {
    case "POST":
      try {
        const newDancer = await prisma.dancer.create({
          data: {
            userId,
            representativeId,
            Payment : 0
          }
        });
        newDancer
          ? res.status(200).json({ message: 'Dancer created' })
          : res.status(400).json({ message: 'Could not create dancer' });
      } catch (error) {
        res.status(500).json({ message: error });
      }
      break;
    case "GET":
      try {
        const dancersWithUserData = await prisma.dancer.findMany({
          include: {
            user: true
          }
        });
        dancersWithUserData
        ? res.status(200).json({ message: dancersWithUserData })
        : res.status(400).json({ message: 'not data found' });
      } catch (error) {
        res.status(500).json({ message: error });
      }  
    default:
      res.status(503).json({ error: 'Bad request, invalid method' });
      break;
  }
}