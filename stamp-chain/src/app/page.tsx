import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Zap, QrCode } from "lucide-react"
import Link from "next/link"
import { Business,  Features } from "@/components/Features"

export default function LandingPage () {
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

        <Features />
      </section>

      {/* Use Cases Section */}
      <section id="use-cases" className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Perfect for Every Business</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            From local coffee shops to global brands, LaaS adapts to your unique loyalty needs.
          </p>
        </div>

        <Business />
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
