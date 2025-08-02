'use client';

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useFormStore } from "@/stores/formStore";
import { Calendar, Coins, QrCode, Users } from "lucide-react";

const CampaignPreview = () => {

  const form = useFormStore(s => s.form);
    
  return (
    <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-purple-50">
        <CardHeader>
            <CardTitle className="flex items-center gap-2">
                <QrCode className="w-5 h-5" />
                Campaign Preview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                  <Coins className="w-8 h-8 mx-auto mb-2 text-black" />
                  <div className="text-lg font-bold">
                    {form.totalSupply || "0"} {form.tokenSymbol || "TOKENS"}
                  </div>
                  <div className="text-sm text-gray-600">Total Supply</div>
                </div>
                <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                  <Users className="w-8 h-8 mx-auto mb-2 text-black" />
                  <div className="text-lg font-bold">{form.tokensPerClaim || "0"} per claim</div>
                  <div className="text-sm text-gray-600">Tokens per Claim</div>
                </div>
                <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                  <Calendar className="w-8 h-8 mx-auto mb-2 text-black" />
                  <div className="text-lg font-bold">{form.enableExpiration ? "Limited Time" : "No Expiry"}</div>
                  <div className="text-sm text-gray-600">Campaign Duration</div>
                </div>
              </div>
              {form.name && (
                <div className="mt-4 p-4 bg-white rounded-lg shadow-sm">
                  <h3 className="font-bold text-lg mb-2">{form.name}</h3>
                  {form.description && <p className="text-gray-600 text-sm">{form.description}</p>}
                  <div className="flex items-center gap-2 mt-2">
                    <Badge variant="secondary">{form.tokenSymbol || "TOKEN"}</Badge>
                    <Badge variant="outline" className="capitalize">
                      {form.blockchain}
                    </Badge>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
  )
}

export default CampaignPreview