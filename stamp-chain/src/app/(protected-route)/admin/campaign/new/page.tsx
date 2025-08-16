import { Button } from "@/components/ui/button"
import Link from "next/link"
import CampaignForm from "./components/campaign-form"
import TokenForm from "./components/token-form"
import ExpiryForm from "./components/expiry-form"
import SubmitButton from "./components/SubmitButton"
import CampaignPreview from "./components/campaign-preview"
import ConnectWallet from "@/components/connect-wallet"

const NewCampaign = () => {

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Create New Campaign</h1>
          <p className="text-gray-600">Set up your loyalty campaign with custom tokens and QR code distribution</p>
        </div>

        <form className="space-y-8">
         
          <CampaignForm />
          <TokenForm />
          <ExpiryForm />
          <CampaignPreview />

          <div className="flex justify-end gap-4">
            <Link href="/admin">
              <Button variant="outline">Cancel</Button>
            </Link>
            <ConnectWallet />
            <SubmitButton />
          </div>
        </form>
      </div>
    </div>
  )
}

export default NewCampaign;