"use server"
import { getServerSession } from "next-auth"
import { AuthOptions } from "../auth"
import { PrismaClient } from "@repo/db/client"

export const sendMoney=async(number:string,amount:number)=>{
    const session=await getServerSession(AuthOptions)
    const db=new PrismaClient()
    if(!session.user.id){
        return{
            message:"Unauthorized"
        }
    }
    const peeruser=await db.user.findFirst({
            where:{
                number:number
            }
        })
    if(!peeruser){
        return {
            message:"User Not Found"
        }
    }
    await db.$transaction(async(txn)=>{
        await txn.$queryRaw`SELECT * FROM "Balance" WHERE "userId"=${Number(session.user.id)} FOR UPDATE`
        const balance=await txn.balance.findUnique({
            where:{
                userId:Number(session.user.id)
            }
        })
        if(!balance || balance.amount<amount){
                throw new Error("Insufficent Balance")
        }
        await txn.balance.update({
            where:{
                userId:Number(session.user.id)
            },
            data:{
                amount:{
                    decrement:amount
                }
            }
        }),
        await txn.balance.update({
            where:{
                userId:peeruser?.id
            },
            data:{
                amount:{
                    increment:amount
                }
            }
        })
        await txn.p2pTransaction.create({
            data:{
                amount,
                timeStamp:new Date,
                fromId:Number(session.user.id),
                toId:peeruser.id
            }
        })

})
    return{
        message:"success"
    }

}