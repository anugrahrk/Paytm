import { useBalanceStore } from "./balance"

export const useBalance=()=>{
    return useBalanceStore((state)=>state.balance)
}