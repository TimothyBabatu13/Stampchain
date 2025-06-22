'use client';

import { Button } from "@/components/ui/button";
import { CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useQrGeneratorStore } from "@/stores/qrGeneratorStore";
import { Download, QrCode } from "lucide-react";
import { useState } from "react";

const ConfigurationPanelForm = () => {
    
    const campaigns = useQrGeneratorStore(s => s.campaign)
    const selectedCampaign = useQrGeneratorStore(s => s.selectedCampaign)
    const setSelectedCampaign = useQrGeneratorStore(s => s.setSelectedCampaign)
    const qrCount = useQrGeneratorStore(s => s.qrCount);
    const setQrCount = useQrGeneratorStore(s => s.setQrCount)
    const qrCodes = useQrGeneratorStore(s => s.qrCodes);
    const setQrCodes = useQrGeneratorStore(s => s.setQrCodes);
    const [isGenerating, setIsGenerating] = useState(false)
    
    const generateQRCodes = async () => {
        setIsGenerating(true)
        try {
            if(!selectedCampaign || !qrCount) return;
            const campaign = campaigns.filter((item) => item.id === selectedCampaign)[0];

            const data = {
                qrCount,
                campaign
            }
            const api = await fetch('/api/create-qr-codes', {
                method: "POST",
                body: JSON.stringify(data)
            });
            const res = await api.json();
            setQrCodes(res.response)
            setIsGenerating(false)
        } catch (error) {
            const err = error as Error;
            console.log(err);
            setIsGenerating(false)
        }
        finally{
            setIsGenerating(false)
        }
    }
    
    const downloadAllQRCodes = () => {
        // In a real app, this would generate a ZIP file with all QR codes
        console.log("Downloading all QR codes")
    }

  return (
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
  )
}

export default ConfigurationPanelForm