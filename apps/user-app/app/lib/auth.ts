import { PrismaClient,Prisma} from '@repo/db/client'
import CredentailsProvider from "next-auth/providers/credentials"
import bcrypt from "bcrypt"
const db=new PrismaClient()


export const AuthOptions={
    providers:[
        CredentailsProvider({
            name:'Credentials',
            credentials:{
                phone:{label:"Phone number",type:"text",placeholder:"0000000000"},
                password:{label:"Password",type:"password"}
            },
            async authorize(credentials:any){
                const hashedPassword=await bcrypt.hash(credentials.password,10)
                const existingUser=await db.user.findFirst({
                    where:{
                        number:credentials.phone
                    }
                })
                if(existingUser){
                    const passwordValidation=await bcrypt.compare(credentials.password,existingUser.password)
                    if(passwordValidation){
                        return{
                            id:existingUser.id.toString(),
                            name:existingUser.name,
                            email:existingUser.number
                        }
                    }
                    return null
                }
                try{
                    const newUserPayload: Prisma.UserCreateInput = {
                        number: credentials.phone,
                        password: hashedPassword,
                    };
                    const user = await db.user.create({
                        data: newUserPayload
                    })
                    const newUserBalance: Prisma.BalanceCreateInput = {
                        amount:0,
                        locked:0,
                        user:{
                            connect:{
                                id:user.id
                            }
                        }
                    };
                    
                    const balance=await db.balance.create({
                        data:newUserBalance

                    })
                    return{
                        id:user.id.toString(),
                        name:user.name,
                        password:user.password
                    }
                }
                catch(e){
                    console.log(e)
                }
                return null
            }
        })
    ],
    secret:process.env.JWT_SECRET || "secret",
    callbacks:{
        async session({token,session}:any){
            session.user.id=token.sub
            return session
        }
    },
    
}
