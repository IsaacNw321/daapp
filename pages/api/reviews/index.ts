import { NextApiRequest, NextApiResponse } from "next";
import  prisma  from "@/lib/prisma";


export default async function  Reviews(req: NextApiRequest, res: NextApiResponse){
  const method = req.method;
  const {
    content,
    representativeId,
    dancerId
  } = req.body;
  switch(method){
    case "GET" :
    try {
      const reviews = await prisma.review.findMany({
        include : {
          representative : {
            include : {
              user : {
                select : {
                  userRole : true,
                  firstName : true,
                  lastName : true,
                  photo : true
                }
              }
            },
          },
          dancer : {
            include : {
              user :{
                select : {
                  userRole : true,
                  firstName : true,
                  lastName : true, 
                  photo : true
                }
              }
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
    try{
      if (!representativeId && !dancerId) {
        res.status(400).json({ message: 'Either representativeId or dancerId must be provided' });
        return;
      }

    const newReview =  await prisma.review.create({
      data : {
        content,
        representativeId,
        dancerId
        }
      })
      newReview
        ? res.status(200).json({ message: 'created' })
        : res.status(400).json({ message: 'could not create review' })
    }catch (error) {
      res.status(500).json({message : (error as Error).message});
    }
  break;
  default:
    res.status(503).json({error: 'Bad request, invalid method'})
  break;
  }
}

