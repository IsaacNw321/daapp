import { NextApiRequest, NextApiResponse } from "next";
import  prisma  from "../../../lib/prisma";

export default async function Payments(req : NextApiRequest, res : NextApiResponse){
  const {
    numberRef,
    typePayment,
    cash,
    representativeId,
    dancerId,
    dancerRId,
  } = req.body
  const method = req.method
  switch(method){
    case  "POST" :
    try {
      const newPayment = await prisma.payment.create({
        data : {
          type : typePayment,
          cash : cash,
          numberRef,
          representativeId,
          dancerId,
          dancerRId
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