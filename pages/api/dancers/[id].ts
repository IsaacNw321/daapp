import { NextApiRequest, NextApiResponse } from "next";
import  prisma  from "@/lib/prisma";

export default async function Dancers(req: NextApiRequest, res: NextApiResponse) {
  const id = req.query.id;
  const method = req.method;
  const {
    firstName,
    lastName,
    allergies,
    age,
    phone,
    cI,
    dateBirth,
    Adress,
    imageUrl
  } = req.body;
  switch (method) {
    case "DELETE" :
      try {
        const payments = await prisma.payment.findMany({
          where : {
            dancerId : String(id)
          }
        })
        if(payments.length > 0){
          await prisma.payment.deleteMany({
            where : {
              dancerId : String(id)
            }
          })
        }
        const existReview = await prisma.review.findUnique({
          where : {
            dancerId : String(id)
          }
        })
        if(existReview){
          await prisma.review.delete({
            where : {
              dancerId : String(id)
            }
          })
        }
        const deletedDancer = await prisma.dancer.delete({
          where : {
            id : String(id)
          }
        })
        deletedDancer
          ? res.status(200).json({message : 'Deleted dancer'})
          : res.status(404).json({message : "Not exist user with that id"})
      } catch (error) {
        res.status(500).json({message : (error as Error).message});
      }
    break;
    case "PATCH":
      try {
        const updateDancer = await prisma.dancer.update({
          where : {
            id : String(id)
          },
          data: {
            allergies,
            age : Number(age),
            phone: Number(phone),
            CI : Number(cI),
            dateBirth: new Date(dateBirth),
            Adress,
            user : {
              update : {
                firstName,
                lastName,
                photo: imageUrl
              }
            }
          },
          include : {
            user : true
          }
        });
        updateDancer
          ? res.status(200).json({ message:"Dancer updated" })
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
    break;   
    default:
      res.status(503).json({ error: 'Bad request, invalid method' });
      break;
  }
}
