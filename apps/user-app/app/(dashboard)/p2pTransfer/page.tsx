import { getServerSession } from "next-auth";
import { OnRampTransaction } from "../../../components/OnRampTransaction";
import { SendMoneyCard } from "../../../components/SendMoneyCard";
import { AuthOptions } from "../../lib/auth";
import { PrismaClient } from "@repo/db/client";

async function p2pTransaction(){
    const session=await getServerSession(AuthOptions)
    const db= new PrismaClient()
    if(!session.user.id || isNaN(session.user.id)){
        return []
    }
    const p2pTrans=await db.p2pTransaction.findMany({
        where:{
            fromId:Number(session.user.id)
        }
    })
    return p2pTrans.map((t)=>({
        time:t.timeStamp,
        amount:t.amount,
        status:"",
        provider:""
        }))
    

}

export default async function(){
    const transaction=await p2pTransaction()
    return (
        <div className=" w-full flex flex-col justify-center pt-4">
        <div className="w-full grid grid-cols-1 gap-4 md:grid-cols-2 p-4">
            <div><SendMoneyCard/></div>
            <div><OnRampTransaction transactions={transaction} state="Send"/></div>
        </div>
        </div>
    )
}