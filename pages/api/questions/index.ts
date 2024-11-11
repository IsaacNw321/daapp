import { NextApiRequest, NextApiResponse } from "next";
import  prisma  from "../../../lib/prisma";

export default async function  Questions(req: NextApiRequest, res: NextApiResponse){
  const method = req.method;
  switch(method){
    case "GET" :
    try {
      const questions = await prisma.question.findMany({
       
      })
      if(questions.length < 0){
        res.status(400).json({message: 'There are not users yet!'});
      }
      if(questions.length > 0 ){
        res.status(200).json(questions);
      }
    } catch (error) {
      res.status(500).json({message : (error as Error).message});
    }
  break;
  default:
    res.status(503).json({error: 'Bad request, invalid method'})
  break;
  }
}
