"use client"
import React, { useState } from 'react'
import {Card} from "@repo/ui/card"
import {TextInput} from "@repo/ui/textinput"
import {Select} from "@repo/ui/select"
import {Button} from "@repo/ui/button"

const SUPPORTED_BANKS=[{
    name:"HDFC Bank",
    redirectUrl:"https://netbanking.hdfc.com"
},{
    name:"Axis Bank",
    redirectUrl:"https://www.axisbank.com"
}]

export const  AddMoney= () => {
    const [redirectURl,setredirectUrl]=useState(SUPPORTED_BANKS[0]?.redirectUrl)
  return (
    <Card title="Add Money">
        <div className='w-full pt-4'>
            <TextInput label={"Amount"} placeholder={"Amount"} onChange={()=>{}}/>
            <div className='py-4 text-left text-lg'>Bank</div>
            <Select onSelect={(value)=>{
                setredirectUrl(SUPPORTED_BANKS.find(x=>x.name===value)?.redirectUrl||"")
            }} options={SUPPORTED_BANKS.map(x=>({
                key:x.name,
                value:x.name
            }))}/>
            <div className='flex justify-center pt-4'>
                <Button onClick={()=>{
                    window.location.href=redirectURl||""
                }}>Add Money</Button>
            </div>
        </div>
    </Card>
  )
}
