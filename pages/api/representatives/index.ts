import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../lib/prisma";


export default async function  Representative(req: NextApiRequest, res: NextApiResponse){
  const method = req.method;
  const {
    id,
    content,
    representative,
    representativeId,
    dancer,
    dancerId
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
      res.status(500).json({message : error});
    }
  break;
  case "POST":
  try {
    const newRepresentative = await prisma.representative.create({
      data: {
        id: req.body.id,
        userId: req.body.userId,
        Payment: req.body.Payment,
        review: req.body.review
      }
    });
    newRepresentative
      ? res.status(200).json({ message: 'Representative created' })
      : res.status(400).json({ message: 'Could not create representative' });
  } catch (error) {
    res.status(500).json({ message: error });
  }
  break;
  default:
    res.status(503).json({error: 'Bad request, invalid method'})
  break;
  }
}

