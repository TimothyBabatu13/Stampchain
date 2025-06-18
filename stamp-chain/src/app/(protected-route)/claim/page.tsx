"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { QrCode, Wallet, CheckCircle, AlertCircle, Coins, ArrowRight, Camera, Loader2 } from "lucide-react"
import Link from "next/link"

export default function ClaimPage() {
  const [step, setStep] = useState(1) // 1: Enter token, 2: Connect wallet, 3: Claim success
  const [claimToken, setClaimToken] = useState("")
  const [walletConnected, setWalletConnected] = useState(false)
  const [walletAddress, setWalletAddress] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [campaignData, setCampaignData] = useState<null | typeof mockCampaignData>(null)

  // Mock campaign data - in real app this would come from API
  const mockCampaignData = {
    name: "Coffee Shop Loyalty Program",
    tokenSymbol: "COFFEE",
    tokensPerClaim: 10,
    description: "Earn loyalty tokens for every purchase at our coffee shop!",
  }

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

      setCampaignData(mockCampaignData)
      setStep(2)
      setIsLoading(false)
    }, 1000)
  }

  const handleWalletConnect = async () => {
    setIsLoading(true)
    setError("")

    // Simulate wallet connection
    setTimeout(() => {
      setWalletConnected(true)
      setWalletAddress("0x1234...5678")
      setIsLoading(false)
    }, 1500)
  }

  const handleClaim = async () => {
    setIsLoading(true)
    setError("")

    // Simulate claiming tokens
    setTimeout(() => {
      setStep(3)
      setIsLoading(false)
    }, 2000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">

      <div className="container mx-auto px-4 py-8 max-w-2xl">
        {/* Progress Indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-center space-x-4 mb-4">
            <div
              className={`flex items-center justify-center w-8 h-8 rounded-full ${
                step >= 1 ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-600"
              }`}
            >
              1
            </div>
            <div className={`h-1 w-16 ${step >= 2 ? "bg-blue-600" : "bg-gray-200"}`} />
            <div
              className={`flex items-center justify-center w-8 h-8 rounded-full ${
                step >= 2 ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-600"
              }`}
            >
              2
            </div>
            <div className={`h-1 w-16 ${step >= 3 ? "bg-blue-600" : "bg-gray-200"}`} />
            <div
              className={`flex items-center justify-center w-8 h-8 rounded-full ${
                step >= 3 ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-600"
              }`}
            >
              3
            </div>
          </div>
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-2">
              {step === 1 && "Enter Claim Token"}
              {step === 2 && "Connect Your Wallet"}
              {step === 3 && "Claim Successful!"}
            </h1>
            <p className="text-gray-600">
              {step === 1 && "Scan the QR code or enter your claim token to get started"}
              {step === 2 && "Connect your wallet to receive your loyalty tokens"}
              {step === 3 && "Your tokens have been successfully claimed!"}
            </p>
          </div>
        </div>

        {/* Step 1: Enter Token */}
        {step === 1 && (
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
        )}

        {/* Step 2: Connect Wallet */}
        {step === 2 && campaignData && (
          <div className="space-y-6">
            {/* Campaign Info */}
            <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-purple-50">
              <CardHeader className="text-center">
                <CardTitle className="flex items-center justify-center gap-2">
                  <Coins className="w-6 h-6" />
                  {campaignData.name}
                </CardTitle>
                <CardDescription>{campaignData.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-1">
                    {campaignData.tokensPerClaim} {campaignData.tokenSymbol}
                  </div>
                  <div className="text-sm text-gray-600">Available to claim</div>
                </div>
              </CardContent>
            </Card>

            {/* Wallet Connection */}
            <Card className="border-0 shadow-lg">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Wallet className="w-8 h-8 text-white" />
                </div>
                <CardTitle>Connect Your Wallet</CardTitle>
                <CardDescription>Connect your crypto wallet to receive your loyalty tokens</CardDescription>
              </CardHeader>
              <CardContent>
                {!walletConnected ? (
                  <div className="space-y-3">
                    <Button
                      onClick={handleWalletConnect}
                      className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Connecting...
                        </>
                      ) : (
                        <>
                          <Wallet className="w-4 h-4 mr-2" />
                          Connect MetaMask
                        </>
                      )}
                    </Button>
                    <Button variant="outline" className="w-full" disabled>
                      <Wallet className="w-4 h-4 mr-2" />
                      Connect Phantom (Coming Soon)
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <Alert>
                      <CheckCircle className="h-4 w-4" />
                      <AlertDescription>Wallet connected: {walletAddress}</AlertDescription>
                    </Alert>
                    <Button
                      onClick={handleClaim}
                      className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Claiming Tokens...
                        </>
                      ) : (
                        <>
                          Claim {campaignData.tokensPerClaim} {campaignData.tokenSymbol}
                          <Coins className="w-4 h-4 ml-2" />
                        </>
                      )}
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        )}

        {/* Step 3: Success */}
        {step === 3 && campaignData && (
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
                  +{campaignData.tokensPerClaim} {campaignData.tokenSymbol}
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
                    setClaimToken("")
                    setCampaignData(null)
                    setWalletConnected(false)
                    setWalletAddress("")
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
        )}
      </div>
    </div>
  )
}
