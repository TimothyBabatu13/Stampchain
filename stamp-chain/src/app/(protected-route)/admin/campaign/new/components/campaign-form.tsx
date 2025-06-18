'use client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useFormStore } from "@/stores/formStore";
import { Target } from "lucide-react"

const CampaignForm = () => {

  const name = useFormStore(s => s.form.name);
  const description = useFormStore(s => s.form.description);
  const tokenSymbol = useFormStore(s => s.form.tokenSymbol);
  const setForm = useFormStore(s => s.setForm);

  return (
    <Card className="border-0 shadow-lg">
        <CardHeader>
            <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                  <Target className="w-4 h-4 text-white" />
                </div>
                <div>
                  <CardTitle>Campaign Details</CardTitle>
                  <CardDescription>Basic information about your loyalty campaign</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Campaign Name *</Label>
                  <Input
                    id="name"
                    placeholder="e.g., Coffee Shop Loyalty Program"
                    value={name}
                    onChange={(e) => setForm({name: e.target.value})}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="tokenSymbol">Token Symbol *</Label>
                  <Input
                    id="tokenSymbol"
                    placeholder="e.g., COFFEE"
                    value={tokenSymbol}
                    onChange={(e) => setForm({tokenSymbol: e.target.value.toUpperCase()})}
                    maxLength={10}
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Describe your loyalty program and what tokens can be used for..."
                  value={description}
                  onChange={(e) => setForm({description: e.target.value})}
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>
  )
}

export default CampaignForm