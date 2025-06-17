"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { QrCode, Download, Copy, ArrowLeft, Settings, CheckCircle } from "lucide-react"
import Link from "next/link"

export default function QRGenerator() {
  const [selectedCampaign, setSelectedCampaign] = useState("")
  const [qrCount, setQrCount] = useState("10")
  const [qrCodes, setQrCodes] = useState<Array<{ id: string; url: string; token: string }>>([])
  const [isGenerating, setIsGenerating] = useState(false)
  const [copiedToken, setCopiedToken] = useState("")

  const campaigns = [
    { id: "1", name: "Coffee Shop Loyalty", tokenSymbol: "COFFEE" },
    { id: "2", name: "YouTube Subscriber Rewards", tokenSymbol: "YT" },
    { id: "3", name: "Conference Attendance", tokenSymbol: "CONF" },
  ]

  const generateQRCodes = async () => {
    if (!selectedCampaign || !qrCount) return

    setIsGenerating(true)

    // Simulate QR code generation
    setTimeout(() => {
      const newQRCodes = Array.from({ length: Number.parseInt(qrCount) }, (_, i) => ({
        id: `qr-${Date.now()}-${i}`,
        url: `https://example.com/claim?token=abc123def456-${i}`,
        token: `abc123def456-${i}`,
      }))

      setQrCodes(newQRCodes)
      setIsGenerating(false)
    }, 2000)
  }

  const copyToken = (token: string) => {
    navigator.clipboard.writeText(token)
    setCopiedToken(token)
    setTimeout(() => setCopiedToken(""), 2000)
  }

  const downloadQRCode = (qrCode: any) => {
    // In a real app, this would generate and download the actual QR code image
    console.log("Downloading QR code:", qrCode)
  }

  const downloadAllQRCodes = () => {
    // In a real app, this would generate a ZIP file with all QR codes
    console.log("Downloading all QR codes")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/admin" className="flex items-center gap-2 text-gray-600 hover:text-gray-900">
              <ArrowLeft className="w-5 h-5" />
              Back to Dashboard
            </Link>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <QrCode className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              QR Generator
            </span>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Generate QR Codes</h1>
          <p className="text-gray-600">
            Create unique QR codes for your loyalty campaign that users can scan to claim tokens
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Configuration Panel */}
          <div className="lg:col-span-1">
            <Card className="border-0 shadow-lg sticky top-24">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center">
                    <Settings className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <CardTitle>QR Configuration</CardTitle>
                    <CardDescription>Set up your QR code generation</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="campaign">Select Campaign *</Label>
                  <Select value={selectedCampaign} onValueChange={setSelectedCampaign}>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose a campaign" />
                    </SelectTrigger>
                    <SelectContent>
                      {campaigns.map((campaign) => (
                        <SelectItem key={campaign.id} value={campaign.id}>
                          {campaign.name} ({campaign.tokenSymbol})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="qrCount">Number of QR Codes *</Label>
                  <Select value={qrCount} onValueChange={setQrCount}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="5">5 QR Codes</SelectItem>
                      <SelectItem value="10">10 QR Codes</SelectItem>
                      <SelectItem value="25">25 QR Codes</SelectItem>
                      <SelectItem value="50">50 QR Codes</SelectItem>
                      <SelectItem value="100">100 QR Codes</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button
                  onClick={generateQRCodes}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                  disabled={!selectedCampaign || isGenerating}
                >
                  {isGenerating ? (
                    <>
                      <div className="w-4 h-4 mr-2 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <QrCode className="w-4 h-4 mr-2" />
                      Generate QR Codes
                    </>
                  )}
                </Button>

                {qrCodes.length > 0 && (
                  <Button onClick={downloadAllQRCodes} variant="outline" className="w-full">
                    <Download className="w-4 h-4 mr-2" />
                    Download All ({qrCodes.length})
                  </Button>
                )}
              </CardContent>
            </Card>
          </div>

          {/* QR Codes Display */}
          <div className="lg:col-span-2">
            {qrCodes.length === 0 ? (
              <Card className="border-0 shadow-lg h-96">
                <CardContent className="h-full flex items-center justify-center">
                  <div className="text-center text-gray-500">
                    <QrCode className="w-16 h-16 mx-auto mb-4 opacity-50" />
                    <h3 className="text-lg font-medium mb-2">No QR Codes Generated</h3>
                    <p className="text-sm">Select a campaign and click "Generate QR Codes" to get started</p>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold">Generated QR Codes</h2>
                  <Badge variant="secondary" className="bg-green-100 text-green-800">
                    {qrCodes.length} codes generated
                  </Badge>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {qrCodes.map((qrCode, index) => (
                    <Card key={qrCode.id} className="border-0 shadow-lg">
                      <CardHeader className="pb-3">
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-sm">QR Code #{index + 1}</CardTitle>
                          <Badge variant="outline" className="text-xs">
                            One-time use
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        {/* QR Code Placeholder */}
                        <div className="aspect-square bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300">
                          <div className="text-center">
                            <QrCode className="w-12 h-12 mx-auto mb-2 text-gray-400" />
                            <p className="text-xs text-gray-500">QR Code Image</p>
                          </div>
                        </div>

                        {/* Token Display */}
                        <div className="space-y-2">
                          <Label className="text-xs text-gray-600">Claim Token:</Label>
                          <div className="flex items-center gap-2">
                            <Input value={qrCode.token} readOnly className="text-xs font-mono" />
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => copyToken(qrCode.token)}
                              className="shrink-0"
                            >
                              {copiedToken === qrCode.token ? (
                                <CheckCircle className="w-3 h-3" />
                              ) : (
                                <Copy className="w-3 h-3" />
                              )}
                            </Button>
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline" onClick={() => downloadQRCode(qrCode)} className="flex-1">
                            <Download className="w-3 h-3 mr-1" />
                            Download
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => window.open(qrCode.url, "_blank")}
                            className="flex-1"
                          >
                            Test Claim
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
