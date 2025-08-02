'use client';

import React, { useMemo } from "react";
import {
  ConnectionProvider,
  WalletProvider
} from "@solana/wallet-adapter-react";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import { clusterApiUrl } from "@solana/web3.js";
import "@solana/wallet-adapter-react-ui/styles.css";
import SolanHelperFunctions from "@/context/solana-helper-functions";
import { PhantomWalletAdapter, WalletConnectWalletAdapter } from '@solana/wallet-adapter-wallets'

const SolanaWallet = ({ children } : {
    children: React.ReactNode
}) => {
  
  const network = WalletAdapterNetwork.Devnet;

  // You can also provide a custom RPC endpoint
  const endpoint = useMemo(() => clusterApiUrl(network), [network]);
  const wallets = [
    new PhantomWalletAdapter(),
    new WalletConnectWalletAdapter({
      network: network,
      options: {
        relayUrl: '',
        projectId: '',
        metadata: {
          name: '',
          description: '',
          url: '',
          icons: ['']
        }
      }
    })
  ];
  
  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>
          <SolanHelperFunctions />
          {children}
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
}

export default SolanaWallet