import { getServerSession } from "next-auth"
import { AuthOptions } from "../../lib/auth"
import { NextResponse } from "next/server"

export const GET=async()=>{
    const session=await getServerSession(AuthOptions)
    if(session?.user){
        return NextResponse.json({
            user:session.user
        })
    }
    return NextResponse.json({
        message:"you are not logged in."
    },{
        status:403
    })
}