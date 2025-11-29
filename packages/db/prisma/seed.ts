import { PrismaClient } from "@prisma/client";

const db=new PrismaClient()

async function main() {
    const alice=await db.user.upsert({
        where:{number:"999999999"},
        update:{},
        create:{
            number:"99999999999",
            password:"alice",
            name:'alice',
            OnRampTransaction:{
                create:{
                    startTime:new Date(),
                    status:"Success",
                    amount:20000,
                    token:"122",
                    provider:"HDFC Bank"
                }
            }
        }
    })
    const bob=await db.user.upsert({
        where:{number:'999999999'},
        update:{},
        create:{
            number:"9999999999",
            password:'bob',
            name:"bob",
            OnRampTransaction:{
                create:{
                    startTime:new Date(),
                    status:"Failure",
                    amount:20000,
                    token:"123",
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