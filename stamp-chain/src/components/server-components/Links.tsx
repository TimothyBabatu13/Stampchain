import Link from "next/link"
import { Button } from "../ui/button"
import { QrCode, Zap } from "lucide-react"
import { userIsActive } from "@/util/server";

export const CreateCampaignLink = async () => {

    const isActive = await userIsActive();
    
  return (
    <Link href={isActive ? '/admin/campaign/new' : '/login'}>
        <Button
            size="lg"
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
        >
            <Zap className="w-5 h-5 mr-2" />
            Create Campaign
        </Button>
    </Link>
  )
}

export const ClaimLink = async () => {

    const isActive = await userIsActive();

    return (
        <Link href={isActive ? "/claim" : "/login"}>
            <Button size="lg" variant="outline">
                <QrCode className="w-5 h-5 mr-2" />
                Claim Rewards
            </Button>
        </Link>
    )
}