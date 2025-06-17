"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Coins, QrCode, Shield, Calendar, Users, Target, Sparkles } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function NewCampaign() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    tokenSymbol: "",
    totalSupply: "",
    tokensPerClaim: "",
    maxClaimsPerWallet: "",
    expirationDate: "",
    enableExpiration: false,
    blockchain: "ethereum",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log("Campaign created:", formData)
    router.push("/admin/campaign/success")
  }

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Create New Campaign</h1>
          <p className="text-gray-600">Set up your loyalty campaign with custom tokens and QR code distribution</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Information */}
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
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="tokenSymbol">Token Symbol *</Label>
                  <Input
                    id="tokenSymbol"
                    placeholder="e.g., COFFEE"
                    value={formData.tokenSymbol}
                    onChange={(e) => handleInputChange("tokenSymbol", e.target.value.toUpperCase())}
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
                  value={formData.description}
                  onChange={(e) => handleInputChange("description", e.target.value)}
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>

          {/* Token Configuration */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <Coins className="w-4 h-4 text-white" />
                </div>
                <div>
                  <CardTitle>Token Configuration</CardTitle>
                  <CardDescription>Define your token economics and distribution rules</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="totalSupply">Total Token Supply *</Label>
                  <Input
                    id="totalSupply"
                    type="number"
                    placeholder="10000"
                    value={formData.totalSupply}
                    onChange={(e) => handleInputChange("totalSupply", e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="tokensPerClaim">Tokens per Claim *</Label>
                  <Input
                    id="tokensPerClaim"
                    type="number"
                    placeholder="10"
                    value={formData.tokensPerClaim}
                    onChange={(e) => handleInputChange("tokensPerClaim", e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="maxClaimsPerWallet">Max Claims per Wallet</Label>
                  <Input
                    id="maxClaimsPerWallet"
                    type="number"
                    placeholder="5"
                    value={formData.maxClaimsPerWallet}
                    onChange={(e) => handleInputChange("maxClaimsPerWallet", e.target.value)}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="blockchain">Blockchain Network *</Label>
                <Select value={formData.blockchain} onValueChange={(value) => handleInputChange("blockchain", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select blockchain" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ethereum">Ethereum (ERC-20)</SelectItem>
                    <SelectItem value="polygon">Polygon (ERC-20)</SelectItem>
                    <SelectItem value="solana">Solana (SPL)</SelectItem>
                    <SelectItem value="base">Base (ERC-20)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Security & Limits */}
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
                  checked={formData.enableExpiration}
                  onCheckedChange={(checked) => handleInputChange("enableExpiration", checked)}
                />
              </div>
              {formData.enableExpiration && (
                <div className="space-y-2">
                  <Label htmlFor="expirationDate">Expiration Date</Label>
                  <Input
                    id="expirationDate"
                    type="date"
                    value={formData.expirationDate}
                    onChange={(e) => handleInputChange("expirationDate", e.target.value)}
                  />
                </div>
              )}
            </CardContent>
          </Card>

          {/* Campaign Preview */}
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
                  <Coins className="w-8 h-8 mx-auto mb-2 text-blue-600" />
                  <div className="text-lg font-bold">
                    {formData.totalSupply || "0"} {formData.tokenSymbol || "TOKENS"}
                  </div>
                  <div className="text-sm text-gray-600">Total Supply</div>
                </div>
                <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                  <Users className="w-8 h-8 mx-auto mb-2 text-purple-600" />
                  <div className="text-lg font-bold">{formData.tokensPerClaim || "0"} per claim</div>
                  <div className="text-sm text-gray-600">Tokens per Claim</div>
                </div>
                <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                  <Calendar className="w-8 h-8 mx-auto mb-2 text-green-600" />
                  <div className="text-lg font-bold">{formData.enableExpiration ? "Limited Time" : "No Expiry"}</div>
                  <div className="text-sm text-gray-600">Campaign Duration</div>
                </div>
              </div>
              {formData.name && (
                <div className="mt-4 p-4 bg-white rounded-lg shadow-sm">
                  <h3 className="font-bold text-lg mb-2">{formData.name}</h3>
                  {formData.description && <p className="text-gray-600 text-sm">{formData.description}</p>}
                  <div className="flex items-center gap-2 mt-2">
                    <Badge variant="secondary">{formData.tokenSymbol || "TOKEN"}</Badge>
                    <Badge variant="outline" className="capitalize">
                      {formData.blockchain}
                    </Badge>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Submit Button */}
          <div className="flex justify-end gap-4">
            <Link href="/admin">
              <Button variant="outline">Cancel</Button>
            </Link>
            <Button
              type="submit"
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              disabled={!formData.name || !formData.tokenSymbol || !formData.totalSupply || !formData.tokensPerClaim}
            >
              Create Campaign
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
