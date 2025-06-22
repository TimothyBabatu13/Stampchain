'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useFormStore } from "@/stores/formStore";
import { Shield } from "lucide-react";

const ExpiryForm = () => {

    const { expirationDate, enableExpiration } = useFormStore(e => e.form);
    const setForm = useFormStore(e => e.setForm);

  return (
    <Card className="border-0 shadow-lg">
            <CardHeader>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <Shield className="w-4 h-4 text-white" />
                </div>
                <div>
                  <CardTitle>Security & Limits</CardTitle>
                  <CardDescription>Configure fraud prevention and campaign limits</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="enableExpiration">Campaign Expiration</Label>
                  <p className="text-sm text-gray-600">Set an expiration date for your campaign</p>
                </div>
                <Switch
                  id="enableExpiration"
                  checked={enableExpiration}
                  onCheckedChange={(checked) => setForm({enableExpiration: checked})}
                />
              </div>
              {enableExpiration && (
                <div className="space-y-2">
                  <Label htmlFor="expirationDate">Expiration Date</Label>
                  <Input
                    id="expirationDate"
                    type="date"
                    value={expirationDate}
                    onChange={(e) => setForm({expirationDate: e.target.value})}
                  />
                </div>
              )}
            </CardContent>
          </Card>
  )
}

export default ExpiryForm