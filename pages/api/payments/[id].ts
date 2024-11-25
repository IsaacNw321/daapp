import { NextApiRequest, NextApiResponse } from "next";
import  prisma  from "../../../lib/prisma";

export default async function Payments(req : NextApiRequest, res : NextApiResponse){
  const {
    confirm
  } = req.body
  const {id} = req.query
  const method = req.method
  switch(method){
    case  "PUT" :
    try {
      const newPayment = await prisma.payment.update({
        where : {
          id : String(id)
        },
        data : {
          confirm
        }
      })
      newPayment 
        ? res.status(200).json(newPayment)
        : res.status(400).json({message : "Could not create payment"})  
    } catch (error) {
      res.status(500).json({message : (error as Error).message});
    }
    break;
    case  "GET" :
    try {
      const newPayment = await prisma.payment.findUnique({
        where : {
          id : String(id)
        }
      })
      newPayment 
        ? res.status(200).json(newPayment)
        : res.status(400).json({message : "Could not create payment"})  
    } catch (error) {
      res.status(500).json({message : (error as Error).message});
    }
    break;
  }
}