'use client';

import { useWalletSettings } from "@/stores/wallet-settings";
import { clusterApiUrl, Connection, LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";
import { useEffect } from "react";


 const getWalletBalance = async (walletAddress: string): Promise<number> => {
  try {    
    const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
    const publicKey = new PublicKey(walletAddress);
    
    const balanceLamports = await connection.getBalance(publicKey);
    const balance = Number((balanceLamports/LAMPORTS_PER_SOL).toPrecision(3))
    
    return balance;
  } catch (err) {
    console.error("Error getting balance:", err);
    throw err;
  }
}

export const WalletBalanceCard = ({ wallet }: {
    wallet: 'solana' | 'base'
}) => {
    // const [isLoading, setIsLoading] = useState<boolean>(false);
    const { solBalance, baseBalance, setSolBalance, setBaseBalance } = useWalletSettings();

    // const fetchBalances = async () => {
    //     const [] = await Promise.allSettled([]);
    // }

    useEffect(()=>{
        const fetchWalletAddress = async () => {
            if(typeof solBalance === 'number'){
                return;
            }
            const api = await fetch('/api/get-wallet');
            const response = await api.json()
            if(!response.success){
                return
            }
            const server_wallet = response.data.server_wallet;
       
            const balance = await getWalletBalance(server_wallet);
            setSolBalance(balance);
        }
        fetchWalletAddress();
    }, [])
    
    useEffect(()=>{
        if(wallet === 'base'){
            setBaseBalance(4.62)
        } 
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