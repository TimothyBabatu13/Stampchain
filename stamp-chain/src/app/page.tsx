import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Zap, Shield, Users, QrCode, Coins, BarChart3, Sparkles } from "lucide-react"
import Link from "next/link"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="text-center max-w-4xl mx-auto">
          <Badge className="mb-4 bg-blue-100 text-blue-800 hover:bg-blue-200">🧠 Loyalty-as-a-Service</Badge>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Tokenized Loyalty Programs Made Simple
          </h1>
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            Launch token-based loyalty campaigns in minutes. No smart contracts, no complexity. Just scan, claim, and
            reward your community with blockchain-powered loyalty tokens.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/admin/campaign/new">
              <Button
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              >
                <Zap className="w-5 h-5 mr-2" />
                Create Campaign
              </Button>
            </Link>
            <Link href="/claim">
              <Button size="lg" variant="outline">
                <QrCode className="w-5 h-5 mr-2" />
                Claim Rewards
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="container mx-auto px-4 py-16 bg-white/50 backdrop-blur-sm">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Everything You Need for Digital Loyalty</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            From QR code generation to wallet integration, we&apos;ve built all the tools you need to launch successful
            loyalty campaigns.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <CardHeader>
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center mb-4">
                <Coins className="w-6 h-6 text-white" />
              </div>
              <CardTitle>Custom Tokens</CardTitle>
              <CardDescription>
                Create your own ERC-20 loyalty tokens with built-in supply caps and security features.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <CardHeader>
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center mb-4">
                <QrCode className="w-6 h-6 text-white" />
              </div>
              <CardTitle>QR Code Generation</CardTitle>
              <CardDescription>
                Generate unique, secure QR codes for campaigns with one-time use protection and expiration dates.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <CardHeader>
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <CardTitle>Fraud Prevention</CardTitle>
              <CardDescription>
                Built-in protection against double claims, wallet limits, and QR code abuse.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <CardHeader>
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-600 rounded-lg flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-white" />
              </div>
              <CardTitle>Multi-Wallet Support</CardTitle>
              <CardDescription>
                Connect with MetaMask, Phantom, WalletConnect, and other popular wallet providers.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <CardHeader>
              <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-500 rounded-lg flex items-center justify-center mb-4">
                <BarChart3 className="w-6 h-6 text-white" />
              </div>
              <CardTitle>Analytics Dashboard</CardTitle>
              <CardDescription>
                Track claims, monitor campaign performance, and analyze user engagement in real-time.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <CardHeader>
              <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-blue-500 rounded-lg flex items-center justify-center mb-4">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <CardTitle>Instant Deployment</CardTitle>
              <CardDescription>
                Launch your loyalty program in minutes, not weeks. No coding or blockchain knowledge required.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>

      {/* Use Cases Section */}
      <section id="use-cases" className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Perfect for Every Business</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            From local coffee shops to global brands, LaaS adapts to your unique loyalty needs.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <Card className="p-6 border-0 shadow-lg">
              <CardHeader className="p-0 mb-4">
                <CardTitle className="text-lg">☕ Local Businesses</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <p className="text-gray-600">
                  Replace punch cards with digital rewards. Customers scan QR codes on receipts to earn loyalty tokens.
                </p>
              </CardContent>
            </Card>

            <Card className="p-6 border-0 shadow-lg">
              <CardHeader className="p-0 mb-4">
                <CardTitle className="text-lg">🎥 Content Creators</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <p className="text-gray-600">
                  Reward your most engaged fans with exclusive tokens for likes, shares, and event attendance.
                </p>
              </CardContent>
            </Card>

            <Card className="p-6 border-0 shadow-lg">
              <CardHeader className="p-0 mb-4">
                <CardTitle className="text-lg">🏛️ DAOs & Communities</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <p className="text-gray-600">
                  Distribute governance tokens and POAP-style rewards for community participation and events.
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="p-6 border-0 shadow-lg">
              <CardHeader className="p-0 mb-4">
                <CardTitle className="text-lg">🛍️ E-commerce Brands</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <p className="text-gray-600">
                  Integrate with Shopify to automatically reward customers with tokens after purchases.
                </p>
              </CardContent>
            </Card>

            <Card className="p-6 border-0 shadow-lg">
              <CardHeader className="p-0 mb-4">
                <CardTitle className="text-lg">🎪 Event Organizers</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <p className="text-gray-600">
                  Create memorable experiences with claimable tokens for attendees at conferences and meetups.
                </p>
              </CardContent>
            </Card>

            <Card className="p-6 border-0 shadow-lg">
              <CardHeader className="p-0 mb-4">
                <CardTitle className="text-lg">💻 Developers & Agencies</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <p className="text-gray-600">
                  Offer branded loyalty solutions as a service to your clients with our white-label platform.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Launch Your Loyalty Program?</h2>
          <p className="text-xl text-gray-600 mb-8">
            Join the future of customer loyalty with blockchain-powered rewards that your customers actually own.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/admin/campaign/new">
              <Button
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              >
                Create Your First Campaign
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <Link href="/admin">
              <Button size="lg" variant="outline">
                View Dashboard
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
