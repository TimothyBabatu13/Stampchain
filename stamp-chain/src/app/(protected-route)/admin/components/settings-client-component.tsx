'use client';

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useWalletSettings } from "@/stores/wallet-settings";
import { clusterApiUrl, Connection, LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";
import { CheckCircle, Copy, ExternalLink } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";


const getWalletBalance = async (walletAddress: string): Promise<number> => {
    try {
        const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
        const publicKey = new PublicKey(walletAddress);

        const balanceLamports = await connection.getBalance(publicKey);
        const balance = Number((balanceLamports / LAMPORTS_PER_SOL).toPrecision(3))

        return balance;
    } catch (err) {
        console.error("Error getting balance:", err);
        throw err;
    }
}

export const WalletBalanceCard = ({ wallet }: {
    wallet: 'solana' | 'base'
}) => {
    const { solBalance, baseBalance, setSolBalance, setBaseBalance, setSolWalletAddress } = useWalletSettings();

    useEffect(() => {
        const fetchWalletAddress = async () => {
            if (typeof solBalance === 'number') {
                return;
            }
            const api = await fetch('/api/get-wallet');
            const response = await api.json()
            if (!response.success) {
                return
            }
            const server_wallet = response.data.server_wallet as string;
            setSolWalletAddress(server_wallet);
            const balance = await getWalletBalance(server_wallet);
            setSolBalance(balance);
        }
        fetchWalletAddress();
    }, [])

    useEffect(() => {
        if (wallet === 'base') {
            setBaseBalance(4.62)
        }
    }, [])

    if (wallet === 'base') {
        return <span className="text-sm font-medium">{baseBalance}BASE</span>
    }

    if(typeof solBalance !== 'number') {
        return (
        <div className="flex items-center gap-1">
            <Skeleton className="h-2 w-8 bg-black" />
            <span>SOL</span>
        </div>
        )
    }
    return <span className="text-sm font-medium">{solBalance}SOL</span>

}


export const CopyToClipboardButton = () => {
    const { solWalletAddress } = useWalletSettings();
    const [copiedAddress, setCopiedAddress] = useState("")
    
    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text)
        setCopiedAddress(text);
        setTimeout(() => setCopiedAddress(""), 2000)
    }

    return (
        <Button
            size="sm"
            variant="outline"
            onClick={() => copyToClipboard(solWalletAddress as string)}
        >
            {copiedAddress === solWalletAddress ? (
                <CheckCircle className="w-3 h-3" />
            ) : (
              <Copy className="w-3 h-3" />
              )}
            </Button>
    )
}

export const WalletAddressCard = () => {
    const { solWalletAddress } = useWalletSettings();
    if(typeof solWalletAddress !== 'string') {
        return <Skeleton className="h-2 w-12 bg-black" />
    }
    return(
        <code className="text-xs bg-gray-100 px-2 py-1 rounded font-mono">
            {solWalletAddress.slice(0, 6)}...{solWalletAddress.slice(-4)}
        </code>
    )
}

export const ViewOnExplorer = () => {

    return(
        <Link 
            prefetch={false} 
            href={'https://www.example.com'}
            target="_blank" 
            className="flex flex-1 items-center justify-center w-full border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50 h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5"
        >
          <ExternalLink 
            className="w-3 h-3 mr-1" 
            />
          View on Explorer
        </Link>
    )
}