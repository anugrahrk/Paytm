import express from "express"
import { PrismaClient } from "@repo/db/client"
const app=express()
const db=new PrismaClient()

app.post('/hdfcBank',async(req,res)=>{
 const PaymentInformation:{
    token:string
    userId:string
    amount:string
 }={
    token:req.body.token,
    userId:req.body.userId,
    amount:req.body.amout
 }
 try{
    await db.$transaction([
        db.balance.updateMany({
            where:{
                userId:Number(PaymentInformation.userId)
            },
            data:{
                amount:{
                    increment: Number(PaymentInformation.amount)
                }
            }
        })
    ])
    res.json({
        message:"captured"
    })
 }
 catch(e){
    console.error(e)
    res.status(411).json({
        message:"Error while processing webhook"
    })
 }
})

app.listen(3003)