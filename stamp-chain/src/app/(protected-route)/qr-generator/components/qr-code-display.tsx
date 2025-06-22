'use client'
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { copyToClipboard, downloadQRCode } from "@/helper/client-functions"
import { useQrGeneratorStore } from "@/stores/qrGeneratorStore"
import { CheckCircle, Copy, Download, QrCode } from "lucide-react"
import { useState } from "react"

const QRCodeDisplay = () => {

    const qrCodes = useQrGeneratorStore(s => s.qrCodes)
    const [copiedToken, setCopiedToken] = useState("")

    const copyToken = (token: string) => {
        copyToClipboard({
            token,
            callback: () =>{
                setCopiedToken(token)
                setTimeout(() => setCopiedToken(""), 2000)       
            }
        })
    }

    


  return (
    <div className="lg:col-span-2">
            {qrCodes.length === 0 ? (
              <Card className="border-0 shadow-lg h-96">
                <CardContent className="h-full flex items-center justify-center">
                  <div className="text-center text-gray-500">
                    <QrCode className="w-16 h-16 mx-auto mb-4 opacity-50" />
                    <h3 className="text-lg font-medium mb-2">No QR Codes Generated</h3>
                    <p className="text-sm">Select a campaign and click &quot;Generate QR Codes&quot; to get started</p>
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
  )
}

export default QRCodeDisplay