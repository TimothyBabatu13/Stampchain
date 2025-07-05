import { useWalletStore } from "@/stores/walletStore"
import { useWallet, } from "@solana/wallet-adapter-react"
import {  useEffect } from "react"

const SolanHelperFunctions = () => {
   
    const { setWalletAddress, setWallet } = useWalletStore()
    const { wallet, connected, wallets, publicKey, } = useWallet()
    
    useEffect(()=>{
      if(publicKey){
        setWalletAddress(publicKey.toBase58());
      }
    }, [connected, wallet, wallets])

    useEffect(()=>{
      if(connected){
        setWallet('solana');
      }
    }, [connected])
    
  return null
}

export default SolanHelperFunctions