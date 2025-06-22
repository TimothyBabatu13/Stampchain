import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useClaimStore } from "@/stores/claimStore"
import { CheckCircle } from "lucide-react"
import Link from "next/link"

const Step3 = () => {
    const { setStep, claimData: campaignData } = useClaimStore();  
  return (
    <Card className="border-0 shadow-lg">
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-blue-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-green-600">Tokens Claimed Successfully!</CardTitle>
              <CardDescription>Your loyalty tokens have been sent to your wallet</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center p-6 bg-gradient-to-br from-green-50 to-blue-50 rounded-lg">
                <div className="text-4xl font-bold text-green-600 mb-2">
                  +{campaignData?.tokensPerClaim} {campaignData?.tokenSymbol}
                </div>
                <div className="text-sm text-gray-600">Added to your wallet</div>
              </div>

              <Alert>
                <CheckCircle className="h-4 w-4" />
                <AlertDescription>
                  Transaction completed! You can now use your tokens for rewards and benefits.
                </AlertDescription>
              </Alert>

              <div className="space-y-3">
                <Button
                  onClick={() => {
                    setStep(1)
                  }}
                  variant="outline"
                  className="w-full"
                >
                  Claim More Tokens
                </Button>
                <Link href="/">
                  <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                    Back to Home
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
  )
}

export default Step3