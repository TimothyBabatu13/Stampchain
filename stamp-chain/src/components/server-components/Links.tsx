import Link from "next/link"
import { Button } from "../ui/button"
import { LucideIcon } from "lucide-react"
import { userIsActive } from "@/util/server";
import { cn } from "@/lib/utils";

export const CreateCampaignLink = async ({ link, icon, text, className } : {
  link: string,
  icon: LucideIcon,
  text: string,
  className?: string
}) => {

    const isActive = await userIsActive();
    const IconComponent = icon;
    const iconElement = <IconComponent className="w-5 h-5 mr-2" />;
  return (
    <Link href={isActive ? `${link}` : '/login'}>
        <Button
            size="lg"
            className={cn(`bg-gradient-to-r text-black border hover:bg-transparent ${className}`)}
        >
            {iconElement}
            {text}
        </Button>
    </Link>
  )
}
