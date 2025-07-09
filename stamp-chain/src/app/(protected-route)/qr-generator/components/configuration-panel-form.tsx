'use client';

import { Button } from "@/components/ui/button";
import { CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { downloadAllQRCodes } from "@/helper/client-functions";
import { campaingsType, useQrGeneratorStore } from "@/stores/qrGeneratorStore";
import { Download, LoaderIcon, QrCode } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface getAllCampaigns {
    success: boolean,
    error: boolean | string,
    data: Array<campaingsType>
}

interface qrcodeType {
    unique_code: string,
    claim_url: string
}

interface createGRCodesResult {
    success: boolean,
    error: boolean | string,
    data: null | []
}
const ConfigurationPanelForm = () => {
    
    const { campaign: campaigns, selectedCampaign, setSelectedCampaign, qrCount, setQrCount, qrCodes, setQrCodes,setCampaign } = useQrGeneratorStore()
    const [isGenerating, setIsGenerating] = useState(false)
    const [isLoading, setIsLoading] = useState(false);
    const select = campaigns.filter(it => it.id === selectedCampaign)[0]?.id;
    const getArrayofIdsOfQrCodes = () => {
        const ids = qrCodes.map(i => `qr-code--${i.id}`);
        return ids
    }
    const generateQRCodes = async () => {
        setIsGenerating(true)
        try {
            if(!selectedCampaign || !qrCount) return;
            const campaign = campaigns.filter((item) => item.id === selectedCampaign)[0].id;

            const data = {
                qrCount,
                campaign
            }
            const api = await fetch('/api/create-qr-codes', {
                method: "POST",
                body: JSON.stringify(data)
            });

            const res = await api.json() as createGRCodesResult;

            if(!res.success && typeof res.error === 'string') {
                const parse = JSON.parse(res.error) as Array<{ message: string }>;
                const errMessages = parse.map(i => i.message)
                const errorHTMLCode = errMessages.map(i => (
                    <div key={crypto.randomUUID()}>
                        {i}
                    </div>
                ))
                toast.error(<>{errorHTMLCode}</>);
                return;
            }

            const { data: qrCode } = res;
            const dataValue = qrCode as unknown as qrcodeType[] 
            const mapp = dataValue.map(i => ({
                id: i.unique_code,
                url: i.claim_url,
                token: i.unique_code
            }))
            setQrCodes(mapp)
            setIsGenerating(false)

        } catch (error) {
            const err = error as Error;
            toast.error(err.message);
            setIsGenerating(false)
        }
        finally{
            setIsGenerating(false)
        }
    }
    

    useEffect(()=>{
        const fetchData = async () => {
            try {
                const api = await fetch('api/get-all-campaigns');
                const res = await api.json() as getAllCampaigns;
                if(!res.success && typeof res.error === 'string'){
                    toast.error(res.error);
                    return;
                }
                setCampaign(res.data)
            } catch (error) {
                const err = error as Error;
                toast.error(err.message)
            }
        }
        fetchData();
    }, [])

  return (
    <CardContent className="space-y-4">
        <div className="space-y-2">
            <Label htmlFor="campaign">Select Campaign *</Label>
            <Select value={select || selectedCampaign} onValueChange={setSelectedCampaign}>
                <SelectTrigger>
                    <SelectValue placeholder="Choose a campaign" />
                </SelectTrigger>
                <SelectContent>
                    {campaigns.length > 0 && campaigns.map((campaign) => (
                        <SelectItem className="cursor-pointer" key={campaign.id} value={campaign.id}>
                          {campaign.name} ({campaign.tokenSymbol})
                        </SelectItem>
                    ))}
                    {
                        campaigns.length < 1 && <span>You have no campaign</span>
                    }
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
                  <Button onClick={()=>downloadAllQRCodes(getArrayofIdsOfQrCodes(), setIsLoading)} variant="outline" className="w-full">
                    {
                        isLoading ? <LoaderIcon className="w-4 h-4 mr-2"/> : <Download className="w-4 h-4 mr-2" />
                    }
                    {
                        isLoading ? 'Downloading...' : `Download All (${qrCodes.length})`
                    }
                  </Button>
                )}
              </CardContent>
  )
}

export default ConfigurationPanelForm