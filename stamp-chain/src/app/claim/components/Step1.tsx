import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useClaimStore } from "@/stores/claimStore"
import { ArrowRight, Camera, Loader2, QrCode } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"

interface apiResponseType {
  success: boolean,
  data: null,
  error: string | boolean
}

const Step1 = () => {
  const setStep = useClaimStore(e => e.setStep)
  const [claimToken, setClaimToken] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleTokenSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!claimToken.trim()) return
    setIsLoading(true)
    try {
      const api = await fetch('/api/claim', {
        method: "POST",
        body: JSON.stringify({token: claimToken})
      })
      const result = await api.json() as apiResponseType;
      console.log(result)
      // if(!result.success && typeof result.error === 'string'){
      //   toast.error(result.error)
      //   return
      // }
      setStep(2);
      setIsLoading(false)
    } catch (error) {
      const err = error as Error;
      toast.error(err.message)
    }
    finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="border-0 shadow-lg">
      <CardHeader className="text-center">
        <div className="w-16 h-16 bg-black rounded-lg flex items-center justify-center mx-auto mb-4">
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


          <Button
            type="submit"
            className="w-full "
            variant={'default'}
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