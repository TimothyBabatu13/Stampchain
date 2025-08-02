import Link from "next/link"
import { Button } from "../ui/button"
import { Zap } from "lucide-react"
import { userIsActive } from "@/util/server";

export const CreateCampaignLink = async () => {

    const isActive = await userIsActive();
    
  return (
    <Link href={isActive ? '/admin/campaign/new' : '/login'}>
        <Button
            size="lg"
            className="bg-gradient-to-r text-black border hover:bg-transparent"
        >
            <Zap className="w-5 h-5 mr-2" />
            Create Campaign
        </Button>
    </Link>
  )
}
