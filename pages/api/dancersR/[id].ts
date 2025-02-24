import { NextApiRequest, NextApiResponse } from "next";
import  prisma  from "@/lib/prisma";


export default async function Dancer(req: NextApiRequest, res: NextApiResponse){
  const id = req.query.id;
  const method = req.method;
  const { allergies, cI, age, dateBirth, firstName, lastName } = req.body
  switch (method){
    case "GET":
      try {
        const dancerR = await prisma.dancerR.findUnique({
          where : {
            id : String(id)
          },
        })
        dancerR ? res.status(200).json({ message : dancerR })
        : res.status(400).json({ message : "There is not any user with that id"})
      } catch (error) {
        res.status(500).json({message : (error as Error).message});
      }
    break;
    case "PATCH":
      try {
        const updatedDancerR = await prisma.dancerR.update({
          where : {
            id : String(id)
          },
          data: {
            firstName,
            lastName,
            allergies, 
            cI, 
            age, 
            dateBirth, 
          }
        })
        updatedDancerR ? res.status(200).json({message : "user updated"})
        : res.status(400).json({message : "there is not users with that id"})
      } catch (error) {
        res.status(500).json({message : (error as Error).message});
      }
    break;
    case "DELETE":
      try {
        await prisma.payment.deleteMany({
          where : {
            dancerRId : String(id)
          }
        })
        const deleteDancerR = await prisma.dancerR.delete({
          where : {
            id : String(id)
          }
        })
        deleteDancerR ? res.status(200).json({message : "User deleted"})
        : res.status(400).json({message : "There is no users with that id"})
      } catch (error) {
        res.status(500).json({message : (error as Error).message});
      }
    break;
    default:
      res.status(503).json({error: 'Bad request, invalid method'})
    break;  
  }
}