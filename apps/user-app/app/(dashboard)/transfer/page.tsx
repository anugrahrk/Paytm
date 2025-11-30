import { getServerSession } from "next-auth";
import { AddMoney } from "../../../components/AddMoneyCard";
import { BalanceCard } from "../../../components/BalanceCard";
import { OnRampTransaction } from "../../../components/OnRampTransaction";
import { AuthOptions } from "../../lib/auth";
import { PrismaClient } from "@repo/db/client";
const db=new PrismaClient()

async function getBalance(){
    const session=await getServerSession(AuthOptions)
    if(!session?.user?.id){
        return{
            amount:0,
            locked:0
        }
    }
    const balance=await db.balance.findFirst({
        where:{
            userId:Number(session?.user?.id)
        }
    })
    return{
        amount:balance?.amount||0,
        locked:balance?.locked||0
    }
}
async function getOnRampTransactions(){
    const session=await getServerSession(AuthOptions)
    if(!session?.user?.id || isNaN(session?.user?.id)){
        return []
    }
    const txns=await db.onRampTransaction.findMany({
        where:{
            userId:Number(session?.user?.id)
        }
    })
    return txns.map(t=>({
        time:t.startTime,
        amount:t.amount,
        status:t.status,
        provider:t.provider
    }))
}
export default async function() {
    const balance=await getBalance()
    const transactions=await getOnRampTransactions()

    return <div className="w-screen">
        <div className="text-4xl text-violet-600 pt-8 mb-8 font-bold">Transfer</div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 p-4">
            <div><AddMoney/></div>
            <div>
                <BalanceCard amount={balance.amount} locked={balance.locked} />
                <div className="pt-4">
                <OnRampTransaction transactions={transactions} state="Received"/>
                </div>
            </div>
        </div>
    </div>
}