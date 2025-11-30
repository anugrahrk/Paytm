"use client"
import React, { useState } from 'react'
import {Card} from "@repo/ui/card"
import {TextInput} from "@repo/ui/textinput"
import {Select} from "@repo/ui/select"
import {Button} from "@repo/ui/button"
import { addOnRampTransaction } from '../app/lib/action/addOnRampTransaction'

const SUPPORTED_BANKS=[{
    name:"HDFC Bank",
    redirectUrl:"https://netbanking.hdfcbank.com/netbanking/"
},{
    name:"Axis Bank",
    redirectUrl:"https://www.axisbank.com"
}]

export const  AddMoney= () => {
    const [redirectURl,setredirectUrl]=useState(SUPPORTED_BANKS[0]?.redirectUrl)
    const [provider,setProvider]=useState(SUPPORTED_BANKS[0]?.name ||"")
    const [value,setValue]=useState(0)
  return (
    <Card title="Add Money">
        <div className='w-full pt-4'>
            <TextInput label={"Amount"} placeholder={"Amount"} onChange={(val)=>{setValue(Number(val))}}/>
            <div className='py-4 text-left text-lg'>Bank</div>
            <Select onSelect={(value)=>{
                setredirectUrl(SUPPORTED_BANKS.find(x=>x.name===value)?.redirectUrl||"")
                setProvider(SUPPORTED_BANKS.find(x=>x.name===value)?.name||"")
            }} options={SUPPORTED_BANKS.map(x=>({
                key:x.name,
                value:x.name
            }))}/>
            <div className='flex justify-center pt-4'>
                <Button onClick={async()=>{
                    await addOnRampTransaction(provider,value)
                    window.location.href=redirectURl||""
                }}>Add Money</Button>
            </div>
        </div>
    </Card>
  )
}
