import { NextApiRequest, NextApiResponse } from "next";
import  prisma  from "../../../lib/prisma";


export default async function  Representative(req: NextApiRequest, res: NextApiResponse){
  const method = req.method;
  const {
   userId,
   Adress,
   phone
  } = req.body;
  switch(method){
    case "GET" :
    try {
      const reviews = await prisma.representative.findMany({
        include : {
          review : {
            include : {
              dancer : true
            }
          }
        }
      })
      if(reviews.length < 0){
        res.status(400).json({message: 'There are not reviews yet!'});
      }
      if(reviews.length > 0 ){
        res.status(200).json(reviews);
      }
    } catch (error) {
      res.status(500).json({message : (error as Error).message});
    }
  break;
  case "POST":
  try {
    const newRepresentative = await prisma.representative.create({
      data: {
        userId: userId,
        Adress,
        phone,
        Payment: req.body.Payment,
      }
    });
    newRepresentative
      ? res.status(200).json({ message: 'Representative created' })
      : res.status(400).json({ message: 'Could not create representative' });
  } catch (error) {
    res.status(500).json({message : (error as Error).message});
  }
  break;
  default:
    res.status(503).json({error: 'Bad request, invalid method'})
  break;
  }
}

