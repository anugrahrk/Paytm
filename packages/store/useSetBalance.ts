import { useBalanceStore } from "./balance"

export const useSetBalance=()=>{
    useBalanceStore((state)=>state.setBalance)
}