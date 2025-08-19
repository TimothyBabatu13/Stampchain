'use client';

import { useWalletSettings } from "@/stores/wallet-settings";
import { useEffect } from "react";

export const WalletBalanceCard = ({ wallet }: {
    wallet: 'solana' | 'base'
}) => {
    // const [isLoading, setIsLoading] = useState<boolean>(false);
    const { solBalance, baseBalance, setSolBalance, setBaseBalance } = useWalletSettings();

    // const fetchBalances = async () => {
    //     const [] = await Promise.allSettled([]);
    // }
    
    useEffect(()=>{
        if(wallet === 'base'){
            setBaseBalance(4.62)
        } 
        setSolBalance(3.65)
    }, [])

    if(wallet === 'base') {
        return <span className="text-sm font-medium">{baseBalance}BASE</span>
    }
    
    return <span className="text-sm font-medium">{solBalance}SOL</span> 
    
}


export const CopyToClipboardButton = () => {
    // const [copiedAddress, setCopiedAddress] = useState("")
    // const { walletAddress, setWalletAddress } = useWalletSettings();
    
    // const copyToClipboard = (text: string) => {
    //     navigator.clipboard.writeText(text)
    //     // setCopiedAddress(type)
    //     setTimeout(() => setCopiedAddress(""), 2000)
    // }
  
    return(
        null
        // <Button
        //       size="sm"
        //       variant="outline"
        //       onClick={() => copyToClipboard(walletAddress as string!)}
        //     >
        //       {copiedAddress === `address-${wallet.id}` ? (
        //         <CheckCircle className="w-3 h-3" />
        //       ) : (
        //       <Copy className="w-3 h-3" />
        //       )}
        //     </Button>
    )
}