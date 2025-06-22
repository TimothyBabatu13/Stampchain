'use client';

import { Button } from "@/components/ui/button";
import { useFormStore } from "@/stores/formStore";
import { useLoadingStore } from "@/stores/loadingStore";
import { useQrGeneratorStore } from "@/stores/qrGeneratorStore";
import { useRouter } from "next/navigation";

const SubmitButton = () => {
  
  const router = useRouter()
  const { loading, setIsLoading } = useLoadingStore()
  const form = useFormStore(e => e.form);
  const { setCampaign, setSelectedCampaign } = useQrGeneratorStore()
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true);
    try {
      
      const createForm = {
        id: crypto.randomUUID(),
        name: form.name,
        tokenSymbol: form.tokenSymbol
      }

      setCampaign(createForm);
      setSelectedCampaign(createForm.id);

      const api = await fetch('/api/create-campaign', {
        method: 'POST',
        body: JSON.stringify(form)
      });
      const response = await api.json();
      console.log(response)
      router.push("/admin/campaign/success")
    } catch (error) {
      console.log(error);
      setIsLoading(false)
    }
    finally {
      setIsLoading(false)
    }
  }

  return (
    <Button
      type="submit"
      onClick={handleSubmit}
      className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
      disabled={!form.name || !form.tokenSymbol || !form.totalSupply || !form.tokensPerClaim || loading}
    >
      {
        loading ? (
            <div 
              className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" 
            />
        ) : (
          <>Create Campaign</>
        )
      }
      
    </Button>
  )
}

export default SubmitButton