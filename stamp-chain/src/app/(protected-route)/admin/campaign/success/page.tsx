import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Coins, BarChart3 } from "lucide-react"
import Link from "next/link"
import { AdditionalActionsCard, RedirectCards } from "./components/Cards"
import CapaignSummary from "./components/campaign-summary"
import { redirect } from "next/navigation"
import GenerateQR from "./components/GenerateQR"

const CampaignSuccess = async ({ searchParams }: { searchParams: Promise<{ id?: string }> }) => {
  
  const id = (await searchParams).id;

  if(!id){
    redirect('/admin')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-black rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold mb-4 bg-black bg-clip-text text-transparent">
            Campaign Created Successfully!
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Your loyalty campaign is now live and ready to distribute tokens to your community.
          </p>
        </div>

        
        <Card className="border-0 shadow-lg mb-8 ">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Coins className="w-6 h-6" />
              Campaign Summary
            </CardTitle>
            <CardDescription>Your newly created loyalty campaign details</CardDescription>
          </CardHeader>
          <CapaignSummary id={id} />
        </Card>

        
        <RedirectCards />
        
        <AdditionalActionsCard />

        <div className="text-center mt-8">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <GenerateQR id={id}/>
            <Link href="/admin">
              <Button size="lg" variant="outline">
                <BarChart3 className="w-5 h-5 mr-2" />
                View Dashboard
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CampaignSuccess;