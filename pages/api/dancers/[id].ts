import { NextApiRequest, NextApiResponse } from "next";
import  prisma  from "../../../lib/prisma";

export default async function Dancers(req: NextApiRequest, res: NextApiResponse) {
  const id = req.query.id;
  const method = req.method;
  const {
    allergies,
    age,
    phone,
    cI,
    dateBirth
  } = req.body;
  switch (method) {
    case "PUT":
      try {
        const updateDancer = await prisma.dancer.update({
          where : {
            id : String(id)
          },
          data: {
            allergies,
            age : Number(age),
            phone : Number(phone),
            CI : Number(cI),
            dateBirth,
          }
        });
        updateDancer
          ? res.status(200).json({ message: 'Dancer updated' })
          : res.status(400).json({ message: 'Could not update dancer' });
      } catch (error) {
        res.status(500).json({message : (error as Error).message});
      }
      break;
    case "GET":
      try {
        const dancersWithUserData = await prisma.dancer.findMany({
          where : {
            id : String(id)
          },
          include: {
            user: true
          }
        });
        dancersWithUserData
        ? res.status(200).json({ message: dancersWithUserData })
        : res.status(400).json({ message: 'not data found' });
      } catch (error) {
        res.status(500).json({message : (error as Error).message});
      }  
    default:
      res.status(503).json({ error: 'Bad request, invalid method' });
      break;
  }
}
