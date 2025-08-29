import { Skeleton } from "@/components/ui/skeleton"

const ViewCampaignSkeleton = () => {
  return (
    <div>
        <div className="bg-card rounded-xl border p-6 shadow-sm grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <Skeleton className="h-[100px] bg-[#003]"/>
            <Skeleton className="h-[100px] bg-[#003]"/>
            <Skeleton className="h-[100px] bg-[#003]"/>
            <Skeleton className="h-[100px] bg-[#003]"/>
        </div>
    </div>
  )
}

export default ViewCampaignSkeleton