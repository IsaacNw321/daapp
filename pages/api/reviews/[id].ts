import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../lib/prisma";

export default async function Reviews(req: NextApiRequest, res: NextApiResponse){
  const id = req.query.id;
  const method = req.method;
  const { content, representative, dancer } = req.body;
  switch (method){
    case "GET":
      try {
        const review = await prisma.review.findUnique({
          where : {
            id : String(id)
          },
        })
        review ? res.status(200).json({ message : review })
        : res.status(400).json({ message : "There is not any user with that id"})
      } catch (error) {
        res.status(500).json({message : (error as Error).message});
      }
    break;
    case "PUT":
      try {
        const updatedReview = await prisma.review.update({
          where : {
            id : String(id)
          },
          data: {
            content : content,
          }
        })
        updatedReview ? res.status(200).json({message : "user updated"})
        : res.status(400).json({message : "there is not users with that id"})
      } catch (error) {
        res.status(500).json({message : (error as Error).message});
      }
    break;
    case "DELETE":
      try {
        const deletedReview = await prisma.review.delete({
          where : {
            id : String(id)
          }
        })
        deletedReview ? res.status(200).json({message : "User deleted"})
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