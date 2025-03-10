import { NextApiRequest, NextApiResponse } from "next";
import  prisma  from "@/lib/prisma";


const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};
export default async function  Users(req: NextApiRequest, res: NextApiResponse){
  const method = req.method;
  const {
    id,
    firstName, 
    lastName, 
    email, 
    photo,
  } = req.body;

  switch(method){
    case "GET" :
    try {
      const users = await prisma.user.findMany()
      if(users.length < 1){
        res.status(400).json({message: 'There are not users yet!'});
      }
      if(users.length > 0 ){
        res.status(200).json(users)
      }
    } catch (error) {
      res.status(500).json({message : (error as Error).message});
    }
  break;
  case "POST":
    try{
      const newUser = await prisma.user.create({
        data: {
          id,
          firstName,
          lastName,
          email,
          photo,
          updatedAt: new Date(),
        }
      });
      newUser
        ? res.status(200).json(newUser)
        : res.status(400).json({ message: 'could not create user' })
    } catch (error) {
      res.status(500).json({message : (error as Error).message});
    }
  break;
  default:
    res.status(503).json({error: 'Bad request, invalid method'})
  break;
  }
}

