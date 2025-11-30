"use server"
import { PrismaClient } from "@repo/db/client"
import { getServerSession } from "next-auth"
import { AuthOptions } from "../auth"


export  const addOnRampTransaction=async(provider:string,amount:number)=>{
    const db=new PrismaClient()
    const session=await getServerSession(AuthOptions)
    if(!session?.user || !session?.user?.id){
        return {
            message:"Unauthorized request"
        }
    }
    const token=(Math.random()).toString().split(".")[1]

    await db.onRampTransaction.create({
       data:{
            provider,
            status:"Processing",
            startTime:new Date(),
            amount:amount*100,
            token:token || "",
            userId:Number(session?.user?.id)
       }
    })
    return {
        message:"Done"
    }
    
}