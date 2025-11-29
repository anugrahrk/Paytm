import { create } from "zustand"

interface BalanceState{
    balance:number,
    setBalance:(value:number)=>void
}

export const useBalanceStore=create<BalanceState>((set)=>({
balance:0,
setBalance:(value)=>set({balance:value})
}))