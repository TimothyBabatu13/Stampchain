import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight, BarChart3, QrCode } from "lucide-react"
import Link from "next/link"

interface RedirectCardType {
    cardTitle: string,
    cardDescription: string,
    iconText: string,
    upperIcon: React.ReactNode,
    lowerIcon: React.ReactNode,
    analytic?: boolean
}
const upperIconStyles = "w-6 h-6 text-white" as const
const lowerIconStyles = "w-4 h-4 ml-2" as const;

const RedirectCard = ({ 
    cardTitle, 
    cardDescription, 
    upperIcon, 
    lowerIcon , 
    iconText, 
    analytic = false
} : RedirectCardType) => {
    return(
        <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <CardHeader>
              <div className={`w-12 h-12 bg-gradient-to-br rounded-lg flex items-center justify-center mb-4 bg-black`}>
                {upperIcon}
              </div>
              <CardTitle>{cardTitle}</CardTitle>
              <CardDescription>
                {cardDescription}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link href={analytic ? "/qr-generator" : "/admin"}>
                <Button variant={'outline'} className={`w-full`}>
                  {iconText}
                  {lowerIcon}
                </Button>
              </Link>
            </CardContent>
          </Card>
    )
}

const RedirectCardsData : Array<RedirectCardType> = [
    {
        cardTitle: "Generate QR Codes",
        cardDescription: "Create unique QR codes for your campaign that users can scan to claim tokens",
        iconText: "Generate QR Codes",
        lowerIcon: <ArrowRight className={lowerIconStyles}/>,
        upperIcon: <QrCode className={upperIconStyles}/>,
    },
    {
        cardTitle: "View Analytics",
        cardDescription: "Monitor your campaign performance and track token distribution",
        iconText: "Go to Dashboard",
        lowerIcon: <ArrowRight className={lowerIconStyles}/>,
        upperIcon: <BarChart3 className={upperIconStyles}/>, 
    },
] as const

export const RedirectCards = () => {


    return(
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          
          {
            RedirectCardsData.map(({ cardTitle, cardDescription, iconText, lowerIcon, upperIcon}, index) => (
                <RedirectCard
                    key={crypto.randomUUID()} 
                    cardDescription={cardDescription}
                    cardTitle={cardTitle}
                    iconText={iconText}
                    lowerIcon={lowerIcon}
                    upperIcon={upperIcon}
                    analytic={index === 0}
                />
            ))
          }
        </div>
    )
}

export const AdditionalActionsCard = () => {
    return(
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle>What&apos;s Next?</CardTitle>
            <CardDescription>Here are some recommended next steps to maximize your campaign&apos;s success</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg">
                <Badge className="bg-black text-white">1</Badge>
                <div>
                  <h4 className="font-medium">Generate and Distribute QR Codes</h4>
                  <p className="text-sm text-gray-600 mt-1">
                    Create QR codes and place them on receipts, social media, or at events
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 bg-purple-50 rounded-lg">
                <Badge className="bg-black text-white">2</Badge>
                <div>
                  <h4 className="font-medium">Share Claim Instructions</h4>
                  <p className="text-sm text-gray-600 mt-1">
                    Tell your community how to scan QR codes and claim their tokens
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 bg-green-50 rounded-lg">
                <Badge className="bg-black text-white">3</Badge>
                <div>
                  <h4 className="font-medium">Monitor and Optimize</h4>
                  <p className="text-sm text-gray-600 mt-1">
                    Track claim rates and adjust your strategy for maximum engagement
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
    )
}