import { useWalletStore } from "@/stores/walletStore"
// import { WalletName } from "@solana/wallet-adapter-base"
import { useWallet, } from "@solana/wallet-adapter-react"
import {  useEffect } from "react"

const SolanHelperFunctions = () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const {  wallet: _useWalletWallet } = useWalletStore()
    const { wallet, connected, wallets,} = useWallet()
    // const walletss:Wallet[] = wallets
   
    useEffect(()=>{
        // console.log(connected)
        // console.log(useWalletWallet)
    }, [connected, wallet, wallets])

    // const selectWallet = useCallback((name: WalletName<string>)=>{
    //     // const run = async () => {
    //     //     select(name);
    //     //     await connect().catch(e=>console.log(e))
    //     // }
    //     // run()
    // }, [wallet, wallets, select])

    // const disconnectB = async () => {
    //     await disconnect().catch(e => console.log(e));

    // }
    // useEffect(() => {        
    //     if(connected) {
    //         setWallet('solana');
    //         setConnectedWallets('solana');
    //         setWalletAddress(publicKey?.toString()!)
    //     };
    // }, [wallet, connected])

    // const showWallets = useCallback(() => {
    //     return walletss;
    // }, [wallets])

  return null
  
//   <div>
//     <Button>
//         Connect wallet
//     </Button>
//     {/* <Button onClick={selectWallet}>
//         Select Button
//     </Button> */}
//     <Button onClick={disconnectB}>
//         Dis
//     </Button>
//     {
//         showWallets().map(item => (
//             <Button onClick={()=>{
//                 selectWallet(item.adapter.name)
//                 }} key={item.adapter.name}>
//                 {
//                     item.adapter.name
//                 }
//             </Button>
//         ))
//     }
//   </div>
}

export default SolanHelperFunctions