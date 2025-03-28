import { NextApiRequest, NextApiResponse } from "next";
import  prisma  from "@/lib/prisma";


export default async function Representative(req: NextApiRequest, res: NextApiResponse){
  const id = req.query.id;
  const method = req.method;
  const { firstName, lastName, Adress, phone, cI } = req.body
  switch (method){
    case "GET":
      try {
        const representative = await prisma.representative.findUnique({
          where : {
            id : String(id)
          },
          include : {
            review : true,
          }
        })
        representative ? res.status(200).json({ message : representative })
        : res.status(400).json({ message : "There is not any user with that id"})
      } catch (error) {
        res.status(500).json({message : (error as Error).message});
      }
    break;
    case "PATCH":
      console.log(req.body)
      try {
        if (!id || !Adress || !phone || !firstName || !lastName) {
          return res.status(400).json({ message: "Missing required fields" });
        }

        const updatedUser = await prisma.representative.update({
          where: {
            id: String(id),
          },
          data: {
            phone: Number(phone),
            Adress: Adress,
            CI : cI, 
            user: {
              update: {
                firstName: firstName,
                lastName: lastName,
              },
            },
          },
          include: {
            user: true,
          },
        });

        updatedUser
          ? res.status(200).json({ message: "User updated" })
          : res.status(400).json({ message: "No user found with that ID" });
      } catch (error) {
        console.log(error);
        res.status(500).json({ message: (error as Error).message });
      }
      break;
    case "DELETE":
      try {
        const dancerSr = await prisma.dancerR.findMany({
          where : {
            representativeId : String(id)
          }
        })
        if (dancerSr.length > 0) {
          for (const dancerR of dancerSr) {
            const payments = await prisma.payment.findMany({
              where: {
                dancerRId: dancerR.id,
              },
            });
        
            if (payments.length > 0) {
              await prisma.payment.deleteMany({
                where: {
                  dancerRId: dancerR.id,
                },
              });
            }
          }
        
          await prisma.dancerR.deleteMany({
            where: {
              representativeId: String(id),
            },
          });
        }
        const reviewExists = await prisma.review.findUnique({
          where: { representativeId: String(id) },
        });

        if (reviewExists) {
          await prisma.review.delete({
            where: { representativeId: String(id) },
          });
        }
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