"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Coins, QrCode, BarChart3, ArrowRight, Sparkles } from "lucide-react"
import Link from "next/link"

export default function CampaignSuccess() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
            Campaign Created Successfully!
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Your loyalty campaign is now live and ready to distribute tokens to your community.
          </p>
        </div>

        {/* Campaign Summary */}
        <Card className="border-0 shadow-lg mb-8 bg-gradient-to-br from-blue-50 to-purple-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Coins className="w-6 h-6" />
              Campaign Summary
            </CardTitle>
            <CardDescription>Your newly created loyalty campaign details</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                <div className="text-2xl font-bold text-blue-600 mb-1">10,000 COFFEE</div>
                <div className="text-sm text-gray-600">Total Supply</div>
              </div>
              <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                <div className="text-2xl font-bold text-purple-600 mb-1">10 per claim</div>
                <div className="text-sm text-gray-600">Tokens per Claim</div>
              </div>
              <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                <div className="text-2xl font-bold text-green-600 mb-1">Active</div>
                <div className="text-sm text-gray-600">Campaign Status</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Next Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <CardHeader>
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center mb-4">
                <QrCode className="w-6 h-6 text-white" />
              </div>
              <CardTitle>Generate QR Codes</CardTitle>
              <CardDescription>
                Create unique QR codes for your campaign that users can scan to claim tokens
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/qr-generator">
                <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                  Generate QR Codes
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <CardHeader>
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center mb-4">
                <BarChart3 className="w-6 h-6 text-white" />
              </div>
              <CardTitle>View Analytics</CardTitle>
              <CardDescription>Monitor your campaign performance and track token distribution</CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/admin">
                <Button variant="outline" className="w-full">
                  Go to Dashboard
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        {/* Additional Actions */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle>What&apos;s Next?</CardTitle>
            <CardDescription>Here are some recommended next steps to maximize your campaign&apos;s success</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg">
                <Badge className="bg-blue-600 text-white">1</Badge>
                <div>
                  <h4 className="font-medium">Generate and Distribute QR Codes</h4>
                  <p className="text-sm text-gray-600 mt-1">
                    Create QR codes and place them on receipts, social media, or at events
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 bg-purple-50 rounded-lg">
                <Badge className="bg-purple-600 text-white">2</Badge>
                <div>
                  <h4 className="font-medium">Share Claim Instructions</h4>
                  <p className="text-sm text-gray-600 mt-1">
                    Tell your community how to scan QR codes and claim their tokens
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 bg-green-50 rounded-lg">
                <Badge className="bg-green-600 text-white">3</Badge>
                <div>
                  <h4 className="font-medium">Monitor and Optimize</h4>
                  <p className="text-sm text-gray-600 mt-1">
                    Track claim rates and adjust your strategy for maximum engagement
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Final CTA */}
        <div className="text-center mt-8">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/qr-generator">
              <Button
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              >
                <QrCode className="w-5 h-5 mr-2" />
                Generate QR Codes
              </Button>
            </Link>
            <Link href="/admin">
              <Button size="lg" variant="outline">
                <BarChart3 className="w-5 h-5 mr-2" />
                View Dashboard
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
