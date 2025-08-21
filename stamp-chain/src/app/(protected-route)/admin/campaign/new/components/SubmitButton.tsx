'use client';

import { Button } from "@/components/ui/button";
import { useFormStore } from "@/stores/formStore";
import { useLoadingStore } from "@/stores/loadingStore";
import { useWalletStore } from "@/stores/walletStore";
import { useRouter } from "next/navigation";
import { toast } from "sonner";


const SubmitButton = () => {

  const router = useRouter()
  const { loading, setIsLoading } = useLoadingStore()
  const form = useFormStore(e => e.form);
  const { wallet } = useWalletStore()
  // const { setCampaign, setSelectedCampaign } = useQrGeneratorStore()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true);

    if (!wallet) {
      setIsLoading(false)
      return
    }

    const formData = new FormData();
    
    if (form.file) {
      formData.append("file", form.file);
    }
    
    formData.append("data", JSON.stringify({
      name: form.name,
      description: form.description,
      tokenSymbol: form.tokenSymbol,
      totalSupply: form.totalSupply,
      tokensPerClaim: form.tokensPerClaim,
      maxClaimsPerWallet: form.maxClaimsPerWallet,
      expirationDate: form.expirationDate,
      enableExpiration: form.enableExpiration,
      blockchain: form.blockchain,
      wallet,
    }));
    
    try {
      const sendCampaignData = await fetch("/api/create-campaign", {
        method: "POST",
        body: formData
        
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

      setIsLoading(false)
      toast.success('Campaign created.')
      router.push(resultOfSendCampaignData.url);
      
    } catch (error) {
      const err = error as Error
      toast.error(`An error occured ${err.message}`)
      console.error(err);
      setIsLoading(false)
    } 
  }

  return (
    <Button
      type="submit"
      onClick={handleSubmit}
      variant={'outline'}
      disabled={!form.name || !form.tokenSymbol || !form.totalSupply || !form.tokensPerClaim || loading || !form.maxClaimsPerWallet || !wallet || !form.file}
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