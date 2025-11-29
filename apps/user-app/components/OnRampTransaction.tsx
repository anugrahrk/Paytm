import { Card } from '@repo/ui/card'
import React from 'react'

export const OnRampTransaction = ({transactions}:{
    transactions:{
        time:Date,
        amount:number,
        status:string,
        provider:string
    }[]
}) => {
    if(!transactions.length){
        return <Card title='Recent Transactions'>
            <div className='text-center pt-4 pb-2'>No Recent transactions</div>
        </Card>
    }
  return (
    <Card title='Recent Transactions'>
        <div className='pt-2 '>
            {transactions.map(t=>
                <div className='flex justify-between '>
                    <div>
                        <div className='text-sm'>Received INR</div>
                        <div className='text-xs text-slate-600'>{t.time.toISOString()}</div>
                    </div>
                    <div className='flex flex-col justify-center'>+ Rs {t.amount/100}</div>
                </div>
            )}
        </div>
    </Card>
  )
}
