import { NextApiRequest, NextApiResponse } from "next";
import  prisma  from "@/lib/prisma";

export default async function DancersR(req: NextApiRequest, res: NextApiResponse) {
  const method = req.method;
  const {
    firstName,
    lastName,
    allergies,
    cI,
    age,
    dateBirth,
    representativeId,
  } = req.body;
  switch (method) {
    case "POST":
      try {
        const newDancer = await prisma.dancerR.create({
          data: {
            firstName,
            lastName,
            allergies,
            cI,
            age,
            dateBirth,
            representative : {
              connect : {
                id : representativeId
              }
            }
          },
        });
        newDancer
          ? res.status(200).json({ message: 'Dancer created' })
          : res.status(400).json({ message: 'Could not create dancer' });
      } catch (error) {
        res.status(500).json({message : (error as Error).message});
      }
      break;
    case "GET":
      try {
        const dancersWithUserData = await prisma.dancerR.findMany({
        });
        dancersWithUserData
        ? res.status(200).json({ message: dancersWithUserData })
        : res.status(400).json({ message: 'not data found' });
      } catch (error) {
        res.status(500).json({message : (error as Error).message});
      } 
    break;   
    default:
      res.status(503).json({ error: 'Bad request, invalid method' });
      break;
  }
}
