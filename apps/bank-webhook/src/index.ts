import express from "express"
import { PrismaClient } from "@repo/db/client"
const app=express()
const db=new PrismaClient()
app.use(express.json())

app.post('/hdfcBank',async(req,res)=>{
 const PaymentInformation:{
    token:string
    userId:string
    amount:string
 }={
    token:req.body.token,
    userId:req.body.userId,
    amount:req.body.amount
 }
 try{
    await db.$transaction([
        db.balance.updateMany({
            where:{
                userId:Number(PaymentInformation.userId)
            },
            data:{
                amount:{
                    increment: Number(PaymentInformation.amount)*100
                }
            }
        }),
        db.onRampTransaction.updateMany({
            where:{
                token:PaymentInformation.token
            },
            data:{
                status:"Success"
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

app.listen(3003,()=>{console.log("server running")})