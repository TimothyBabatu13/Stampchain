import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Campaign from "./components/view-campaign"
import ViewAnalytics from "./components/view-analytics"
import ViewSettings from "./components/view-settings"
import Stats from "./components/stats"
import { Suspense } from "react"
import ViewCampaignSkeleton from "./components/view-campaign-skeleton"

const AdminDashboard =  () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">

      <div className="container mx-auto px-4 py-8">
        <Suspense fallback={<h1>Loading...</h1>}>
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