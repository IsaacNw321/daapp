import { NextApiRequest, NextApiResponse } from "next";
import  prisma  from "../../../lib/prisma";

export default async function Questions(req : NextApiRequest, res : NextApiResponse){
  const method = req.method
  const id = req.query.id
  const {
    question,
    answer
  } = req.body
  switch(method){
    case "GET" : 
    try {
      const getQuestion = await prisma.question.findUnique({
        where : {
          id : String(id)
        }
      })
      getQuestion
        ? res.status(200).json(getQuestion)
        : res.status(404).json('Not found question')
    } catch (error) {
      res.status(500).json({message :  (error as Error).message})
    }
    break;
    case "PUT" :
      try {
        const updatedQuestion = await prisma.question.update({
          where : {
            id : String(id)
          },
          data : {
            question,
            answer
          }
        })
        updatedQuestion
          ? res.status(200).json('Question Updated')
          : res.status(404).json('Not found question')
      } catch (error) {
        res.status(500).json({message :  (error as Error).message})
      }
    break;
    case "DELETE" : 
    try {
      const deletedQuestion = await prisma.question.delete({
        where : {
          id : String(id)
        }
      })
      deletedQuestion
        ? res.status(200).json('Question deleted')
        : res.status(404).json('Not found question')
    } catch (error) {
      res.status(500).json({message :  (error as Error).message})
    }
  }
}