import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Campaign from "./components/view-campaign"
import ViewAnalytics from "./components/view-analytics"
import ViewSettings from "./components/view-settings"
import Stats from "./components/stats"
import { Suspense } from "react"
import { Skeleton } from "@/components/ui/skeleton"
import ViewCampaignSkeleton from "./components/view-campaign-skeleton"


const StatsLoading =  () => {
  return (
    <div className="flex flex-col gap-3 mb-8">
      <Skeleton className="h-[148px] w-full bg-black" />
      <Skeleton className="h-[148px] w-full bg-black" />
    </div>
  )
}

const AdminDashboard =  () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">

      <div className="container mx-auto px-4 py-8">
        <Suspense fallback={<StatsLoading />}>
          <Stats />
        </Suspense>

        <Tabs defaultValue="campaigns" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="campaigns">Campaigns</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="campaigns" className="space-y-6">
            <Suspense fallback={<ViewCampaignSkeleton />}>
              <Campaign />
            </Suspense>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <ViewAnalytics />
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <ViewSettings />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
export default AdminDashboard