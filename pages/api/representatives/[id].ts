import { NextApiRequest, NextApiResponse } from "next";
import  prisma  from "@/lib/prisma";


export default async function Representative(req: NextApiRequest, res: NextApiResponse){
  const id = req.query.id;
  const method = req.method;
  const { firstName, lastName, Adress, phone } = req.body
  switch (method){
    case "GET":
      try {
        const representative = await prisma.representative.findUnique({
          where : {
            id : String(id)
          },
          include : {
            review : true
          }
        })
        representative ? res.status(200).json({ message : representative })
        : res.status(400).json({ message : "There is not any user with that id"})
      } catch (error) {
        res.status(500).json({message : (error as Error).message});
      }
    break;
    case "PATCH":
      try {
        console.log(id, Adress, phone, firstName, lastName)
        const updatedUser = await prisma.representative.update({
          where : {
            id : String(id)
          },
          data: {
            phone : phone,
            Adress : Adress,
            user: {
              update : {
                firstName : firstName,
                lastName : lastName
              }
            },
          },
          include : {
            user : true
          }
        })
        updatedUser ? res.status(200).json({message : "user updated"})
        : res.status(400).json({message : "there is not users with that id"})
      } catch (error) {
        console.log(error)
        res.status(500).json({message : (error as Error).message});
      }
    break;
    case "DELETE":
      try {
        const dancerSr = await prisma.dancerR.findMany({
          where : {
            representativeId : String(id)
          }
        })
        for (const dancerR of dancerSr){
          await prisma.payment.deleteMany({
            where : {
              dancerRId : dancerR.id
            }
          })
        }
        await prisma.dancerR.deleteMany({
          where : {
            representativeId : String(id)
          }
        })
        await prisma.review.delete({
          where : {
            representativeId : String(id)
          }
        })
        const deleteRepresentative = await prisma.representative.delete({
          where : {
            id : String(id)
          }
        })
        deleteRepresentative ? res.status(200).json({message : "User deleted"})
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