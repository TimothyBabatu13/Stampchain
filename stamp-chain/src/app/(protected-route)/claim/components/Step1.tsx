
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useClaimStore } from "@/stores/claimStore"
import { AlertCircle, ArrowRight, Camera, Loader2, QrCode } from "lucide-react"
import { useState } from "react"


const mockCampaignData = {
    name: "Coffee Shop Loyalty Program",
    tokenSymbol: "COFFEE",
    tokensPerClaim: 10,
    description: "Earn loyalty tokens for every purchase at our coffee shop!",
  }

const Step1 = () => {
    const setStep = useClaimStore(e => e.setStep)
    const [error, setError] = useState("")
    const [claimToken, setClaimToken] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const setClaimData = useClaimStore(s => s.setClaimData)   
    
    const handleTokenSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!claimToken.trim()) return
    
        setIsLoading(true)
        setError("")
    
        // Simulate API call to validate token
        setTimeout(() => {
          if (claimToken.toLowerCase().includes("invalid")) {
            setError("Invalid or expired claim token. Please check your QR code.")
            setIsLoading(false)
            return
          }
    
          setClaimData(mockCampaignData)
          setStep(2)
          setIsLoading(false)
        }, 1000)
      }

  return (
    <Card className="border-0 shadow-lg">
        <CardHeader className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                <QrCode className="w-8 h-8 text-white" />
              </div>
              <CardTitle>Claim Your Rewards</CardTitle>
              <CardDescription>Enter the claim token from your QR code to get started</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleTokenSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="claimToken">Claim Token</Label>
                  <Input
                    id="claimToken"
                    placeholder="Enter your claim token here..."
                    value={claimToken}
                    onChange={(e) => setClaimToken(e.target.value)}
                    required
                  />
                </div>

                {error && (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Validating...
                    </>
                  ) : (
                    <>
                      Validate Token
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </>
                  )}
                </Button>
              </form>

              <div className="mt-6 text-center">
                <div className="flex items-center gap-2 text-sm text-gray-600 justify-center">
                  <Camera className="w-4 h-4" />
                  <span>Scan QR code with your camera app to get the token</span>
                </div>
              </div>
            </CardContent>
          </Card>
  )
}

export default Step1