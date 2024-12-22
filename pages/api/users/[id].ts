import { NextApiRequest, NextApiResponse } from "next";
import  prisma  from "@/lib/prisma";


export default async function Users(req: NextApiRequest, res: NextApiResponse){
  const id = decodeURIComponent(req.query.id as string);
  const method = req.method;
  const { firstName, lastName, email, photo, active, userRole } = req.body;

  switch (method) {
    case "GET":
      try {
        console.log(id); 

        const user = await prisma.user.findUnique({
          where: {
            id: String(id)
          },
          include: {
            representative: {
              include: {
                dancers: {
                  include: {
                    Payment: true
                  }
                },
                review: {
                  select: {
                    id: true,
                    content: true
                  }
                },
                Payment: true
              },
            },
            dancer: {
              include: {
                review: {
                  select: {
                    id: true,
                    content: true
                  }
                },
                Payment: true
              }
            }
          }
        });

        user ? res.status(200).json(user)
          : res.status(400).json({ message: "There is not any user with that id" });

      } catch (error) {
        res.status(500).json({ message: (error as Error).message });
      }
      break;
    case "PATCH":
      try {
        const updatedUser = await prisma.user.update({
          where : {
            id : String(id)
          },
          data: {
            firstName: firstName,
            lastName: lastName,
            email: email,
            photo: photo,
            active : active,
            userRole
          }
        })
        updatedUser ? res.status(200).json({message : "user updated"})
        : res.status(400).json({message : "there is not users with that id"})
      } catch (error) {
        res.status(500).json({message : (error as Error).message});
      }
    break;
    case "DELETE":
      try {
        const deletedUser = await prisma.user.delete({
          where : {
            id : String(id)
          }
        })
        deletedUser ? res.status(200).json({message : "User deleted"})
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


