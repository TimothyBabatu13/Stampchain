'use client';

import { Button } from "@/components/ui/button";
import { useFormStore } from "@/stores/formStore";
import { useRouter } from "next/navigation";

const SubmitButton = () => {
    const router = useRouter()

    const form = useFormStore(e => e.form);
      // console.log(setFormData)

      const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        // Handle form submission
        console.log(form)
        router.push("/admin/campaign/success")
      }
  return (
    <Button
        type="submit"
        onClick={handleSubmit}
        className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
        // disabled={!formData.name || !formData.tokenSymbol || !formData.totalSupply || !formData.tokensPerClaim}
        disabled={false}
    >
        Create Campaign
    </Button>
  )
}

export default SubmitButton