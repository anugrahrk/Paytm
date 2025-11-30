"use client"
import { Button } from "@repo/ui/button"
import { Card } from "@repo/ui/card"
import { TextInput } from "@repo/ui/textinput"
import { useState } from "react"
import { sendMoney } from "../app/lib/action/sendMoney"

export function SendMoneyCard(){
    const[number,setNumber]=useState("")
    const[amount,setAmount]=useState("")
    return(
        <div>
            <Card title="Send">
                <div className="py-4">
                <TextInput label="Number" placeholder="123456789" onChange={(val)=>setNumber(val)}/>
                </div>
                <div className="pb-4">
                <TextInput label="Amount" placeholder="999" onChange={(val)=>setAmount(val)}/>
                    </div>
                <div className="flex justify-center"><Button onClick={async()=>await sendMoney(number,Number(amount)*100)} >Send</Button></div>
                </Card></div>
    )
}
