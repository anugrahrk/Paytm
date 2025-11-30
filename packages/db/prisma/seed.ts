import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt"
const db=new PrismaClient()

async function main() {
    const alice=await db.user.upsert({
        where:{number:"987654321"},
        update:{},
        create:{
            number:"987654321",
            password:await bcrypt.hash("alice",10),
            name:'alice',
             Balance:{
                create:{
                    amount:20000,
                    locked:0
                }
            },
            OnRampTransaction:{
                create:{
                    startTime:new Date(),
                    status:"Success",
                    amount:20000,
                    token:"0000",
                    provider:"HDFC Bank"
                }
            }
        }
    })
    const bob=await db.user.upsert({
        where:{number:'123456789'},
        update:{},
        create:{
            number:"123456789",
            password:await bcrypt.hash("bob",10),
            name:"bob",
            Balance:{
                create:{
                    amount:20000,
                    locked:0
                }
            },
            OnRampTransaction:{
                create:{
                    startTime:new Date(),
                    status:"Failure",
                    amount:20000,
                    token:"5678",
                    provider:"HDFC Bank"
                }
            }
        }
    })
    console.log({alice,bob})
}
main().then(async()=>{
    await db.$disconnect()
})
.catch(async(e)=>{
    console.error(e)
    await db.$disconnect()
    process.exit(1)
})