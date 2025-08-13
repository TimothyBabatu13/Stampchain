'use client';

import { Button } from "@/components/ui/button";
import { useFormStore } from "@/stores/formStore";
import { useLoadingStore } from "@/stores/loadingStore";
import { useWalletStore } from "@/stores/walletStore";
import { useWallet } from "@solana/wallet-adapter-react";
import { Transaction } from "@solana/web3.js";
import { useRouter } from "next/navigation";
import { toast } from "sonner";


const SubmitButton = () => {

  const router = useRouter()
  const { loading, setIsLoading } = useLoadingStore()
  const form = useFormStore(e => e.form);
  const { walletAddress, wallet } = useWalletStore()
  const { signTransaction } = useWallet();
  // const { setCampaign, setSelectedCampaign } = useQrGeneratorStore()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true);

    if (!walletAddress || !wallet) {
      return
    }

    try {
      const sendCampaignData = await fetch("/api/create-campaign", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          walletAddress: walletAddress,
        }),
      });

      const resultOfSendCampaignData = await sendCampaignData.json();

      if (!resultOfSendCampaignData.success && !resultOfSendCampaignData.validationError) {
        toast.error(resultOfSendCampaignData.error)
        return
      }
      if (!resultOfSendCampaignData.success && resultOfSendCampaignData.validationError) {
        console.log(resultOfSendCampaignData.error)
        return
      }
      const { unsignedTx, mintPublicKey } = resultOfSendCampaignData;

      const tx = Transaction.from(Buffer.from(unsignedTx, "base64"));

      const signedTx = await signTransaction!(tx);
      console.log(signedTx)
      const completeCampaignDataTransactiom = await fetch("/api/create-campaign/continue", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          signedTx: signedTx.serialize().toString("base64"),
          mintPublicKey
        }),
      });

      const result = await completeCampaignDataTransactiom.json();
      console.log(result);
      if (result.success) {
        router.push(result.url)
      }
    } catch (error) {
      const err = error as Error
      toast.error(`An error occured ${err.message}`)
      console.error(err);
    } finally {
      setIsLoading(false)
    }






    // const createForm = {
    //   id: crypto.randomUUID(),
    //   name: form.name,
    //   tokenSymbol: form.tokenSymbol
    // }

    // setCampaign(createForm);
    // setSelectedCampaign(createForm.id);

    // console.log(walletAddress)
    // const api = await fetch('/api/create-campaign', {
    //   method: 'POST',
    //   body: JSON.stringify(form)
    // });
    // const response = await api.json();
    // console.log(response)

  }

  return (
    <Button
      type="submit"
      onClick={handleSubmit}
      variant={'outline'}
      disabled={!form.name || !form.tokenSymbol || !form.totalSupply || !form.tokensPerClaim || loading || !form.maxClaimsPerWallet || !wallet || !walletAddress}
    >
      {
        loading ? (
          <div className="flex items-center gap-2">
            <div
              className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"
            />
            <span>Creating...</span>
          </div>
        ) : (
          <>Create Campaign</>
        )
      }

    </Button>
  )
}

export default SubmitButton