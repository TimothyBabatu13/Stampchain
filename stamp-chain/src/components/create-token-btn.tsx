'use client';

import { useFormStore } from "@/stores/formStore";
import { Button } from "./ui/button";
import { FormEvent } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { Transaction } from "@solana/web3.js";
import { showDetailedValidationErrors, showValidationErrors } from "@/lib/error-handler";
import { useWalletStore } from "@/stores/walletStore";
const object = {
  "issues": [
      {
          "code": "too_small",
          "minimum": 1,
          "type": "string",
          "inclusive": true,
          "exact": false,
          "message": "Token name cannot be empty",
          "path": [
              "name"
          ]
      },
      {
          "code": "too_small",
          "minimum": 1,
          "type": "string",
          "inclusive": true,
          "exact": false,
          "message": "Token symbol cannot be empty",
          "path": [
              "tokenSymbol"
          ]
      },
      {
          "code": "too_small",
          "minimum": 1,
          "type": "string",
          "inclusive": true,
          "exact": false,
          "message": "Token per claim cannot be empty",
          "path": [
              "tokensPerClaim"
          ]
      },
      {
          "code": "too_small",
          "minimum": 1,
          "type": "string",
          "inclusive": true,
          "exact": false,
          "message": "Total supply must not be empty",
          "path": [
              "totalSupply"
          ]
      }
  ],
  "name": "ZodError"
}

const CreateTokenButton = () => {

    const { publicKey, signTransaction, disconnect } = useWallet()
    const { form } = useFormStore();
    const { setWallet } = useWalletStore()
    const handleCreateToken = async (e: FormEvent) => {
        e.preventDefault();
        console.log(publicKey?.toString())
        const data = {
            ...form,
            walletAddress: publicKey?.toString()
        }
        console.log(data)
        try {
            // Step 1: Send form to create unsigned tx
            const res1 = await fetch("/api/create-campaign", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                ...form,
                walletAddress: publicKey!.toBase58(),
              }),
            });
      
            const reee = await res1.json();
            console.log(reee)
            if(!reee.success){
              showDetailedValidationErrors(reee.error)
              return
            }
            const { unsignedTx } = reee;
      
            console.log(unsignedTx)
            // Step 2: Convert base64 tx to Transaction object
            const tx = Transaction.from(Buffer.from(unsignedTx, "base64"));
      
            // Step 3: Sign transaction with wallet
            const signedTx = await signTransaction!(tx);
      
            // Step 4: Send signed tx to backend
            const res2 = await fetch("/api/create-campaign/continue", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                signedTx: signedTx.serialize().toString("base64"),
              }),
            });
      
            const result = await res2.json();
            console.log("✅ Transaction sent:", result);
          } catch (error) {
            console.error("❌ Error during token creation:", error);
          }
        };
    

        const handleSonner = (e: FormEvent) => {
          e.preventDefault();
          showValidationErrors(object)
        }

        const handleDisconnect = async (e: FormEvent) => {
          e.preventDefault()
          await disconnect()
          setWallet(null)
        }
    
  return (
    <div>

    <Button
        onClick={handleCreateToken}
    >
        Create TOken
    </Button>

<Button
  onClick={handleDisconnect}
>
  Diconnect
</Button>
    <Button onClick={handleSonner}>
      Sonner
    </Button>

    </div>
  )
}

export default CreateTokenButton


// {
//     "unsignedTx": "AgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABOblFkbtEP4CYvJOTZ3mkYjNGPs8LYGwr2y67ucSViZOMyd8IIqBcBpsrzQ9tRrXZJ3Tu2JofImc+rjwunCf4MAgAEB3Xdl2tJBl+emmE6QfhdsM/wsEFgSzw6NZaKzwsxYle8tT5KlNXSYkBFtYfQq++TX9VLdrQu/qS/ugshwjxxMRaIbI80AA7nPQQ1Nk9uobB26CH7Tcu/kbaDaslfIAinGwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAjJclj04kifG7PRApFI4NgwtaE5na/xCEBI572Nvp+FkGp9UXGSxcUSGMyUw9SvF/WNruCJuh/UTj29mKAAAAAAbd9uHXZaGT2cvhRs7reawctIXtX1s3kTqM9YV+/wCpidsTuvhQTwHhnrrGV8QvcEP82azlwgrNPjYISrs0VXQEAwIAATQAAAAAYE0WAAAAAABSAAAAAAAAAAbd9uHXZaGT2cvhRs7reawctIXtX1s3kTqM9YV+/wCpBgIBBSMACXXdl2tJBl+emmE6QfhdsM/wsEFgSzw6NZaKzwsxYle8AAQGAAIAAQMGAAYDAQIACQfoAwAAAAAAAA==",
//     "mintPublicKey": "DCVtGzsozG3HAdH7pv5tvmLG4W9sYwqFMdsW5nCwUVsT",
//     "data": null
// }



