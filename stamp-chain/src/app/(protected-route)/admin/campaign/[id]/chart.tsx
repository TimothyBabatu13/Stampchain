'use client';
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useState } from "react"
import Overview from "./components/overview";


export const CampaignDetailPage = ({ params }: { params: { id: string } }) => {
  const [activeTab, setActiveTab] = useState("overview")
  
  return (
    <div className="min-h-screen">
      <div className="">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-1 lg:w-[500px]">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            {/* <TabsTrigger value="settings">Settings</TabsTrigger> */}
          </TabsList>

          <Overview id={params.id}/>
          {/* <Settings id={params.id} /> */}
        </Tabs>
      </div>
    </div>
  )
}
