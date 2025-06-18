import { BarChart3, Coins, QrCode, Shield, Users, Zap } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"

interface FeaturesCardType {
    cardTitle: string,
    cardDescription: string,
    icon: React.ReactNode,
    iconBackgroundGradient: string
}

const iconStyles = "w-6 h-6 text-white" as const

const FeaturesCard = ({ cardTitle, cardDescription, icon, iconBackgroundGradient } : FeaturesCardType) => {
    return(
        <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <CardHeader>
              <div className={`w-12 h-12 bg-gradient-to-br rounded-lg flex items-center justify-center mb-4 ${iconBackgroundGradient}`}>
                {icon}
                <Coins className="w-6 h-6 text-white" />
              </div>
              <CardTitle>{cardTitle}</CardTitle>
              <CardDescription>
                {cardDescription}
              </CardDescription>
            </CardHeader>
          </Card>
    )
}

const FeaturesCardData : Array<FeaturesCardType> = [
    {
        cardTitle: 'Custom Tokens',
        cardDescription: 'Create your own ERC-20 loyalty tokens with built-in supply caps and security features.',
        icon: <Coins className={iconStyles} />,
        iconBackgroundGradient: 'from-blue-500 to-blue-600'
    },
    {
        cardTitle: 'QR Code Generation',
        cardDescription: 'Generate unique, secure QR codes for campaigns with one-time use protection and expiration dates.',
        icon: <QrCode className={iconStyles} />,
        iconBackgroundGradient: 'from-purple-500 to-purple-600'
    },
    {
        cardTitle: 'Fraud Prevention',
        cardDescription: 'Built-in protection against double claims, wallet limits, and QR code abuse.',
        icon: <Shield className={iconStyles} />,
        iconBackgroundGradient: 'from-blue-500 to-purple-600'
    },
    {
        cardTitle: 'Multi-Wallet Support',
        cardDescription: 'Connect with MetaMask, Phantom, WalletConnect, and other popular wallet providers.',
        icon: <Users className={iconStyles} />,
        iconBackgroundGradient: 'from-purple-500 to-blue-600'
    },
    {
        cardTitle: 'Analytics Dashboard',
        cardDescription: 'Track claims, monitor campaign performance, and analyze user engagement in real-time.',
        icon: <BarChart3 className={iconStyles} />,
        iconBackgroundGradient: 'from-blue-600 to-purple-500'
    },
    {
        cardTitle: 'Instant Deployment',
        cardDescription: 'Launch your loyalty program in minutes, not weeks. No coding or blockchain knowledge required.',
        icon: <Zap className={iconStyles} />,
        iconBackgroundGradient: 'from-purple-600 to-blue-500'
    },
] as const

export const Features = () => {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {
            FeaturesCardData.map(({ cardTitle, icon, cardDescription, iconBackgroundGradient }) => (
                <FeaturesCard 
                    key={crypto.randomUUID()}
                    cardTitle={cardTitle}
                    cardDescription={cardDescription}
                    icon={icon}
                    iconBackgroundGradient={iconBackgroundGradient}
                />
            ))
        }
    </div>
  )
}

interface BusinessCardType {
    cardTitle: string,
    cardContent: string,
}

const BusinessCard = ({ cardTitle, cardContent } : BusinessCardType) => {
    return(
        <Card className="p-6 border-0 shadow-lg">
            <CardHeader className="p-0 mb-4">
                <CardTitle className="text-lg">{cardTitle}</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
                <p className="text-gray-600">
                  {cardContent}
                </p>
            </CardContent>
        </Card>
    )
}

const BusinessCardData : Array<BusinessCardType> = [
    {
        cardTitle: '☕ Local Businesses',
        cardContent: 'Replace punch cards with digital rewards. Customers scan QR codes on receipts to earn loyalty tokens.'
    },
    {
        cardTitle: '🎥 Content Creators',
        cardContent: 'Reward your most engaged fans with exclusive tokens for likes, shares, and event attendance.'
    },
    {
        cardTitle: '🏛️ DAOs & Communities',
        cardContent: 'Distribute governance tokens and POAP-style rewards for community participation and events.'
    },
    {
        cardTitle: '🛍️ E-commerce Brands',
        cardContent: 'Integrate with Shopify to automatically reward customers with tokens after purchases.'
    },
    {
        cardTitle: '🎪 Event Organizers',
        cardContent: 'Create memorable experiences with claimable tokens for attendees at conferences and meetups.'
    },
    {
        cardTitle: '💻 Developers & Agencies',
        cardContent: 'Offer branded loyalty solutions as a service to your clients with our white-label platform.'
    },
]

const Wrapper = ({ children } : {
    children: React.ReactNode
} ) => (
    <div className="space-y-6">
        {children}
    </div>
)

export const Business = () => {
    return(
        <div className="grid md:grid-cols-2 gap-8">
          <Wrapper>
            {
                BusinessCardData.filter((_, index) => index < 3).map(({ cardContent, cardTitle }) => (
                    <BusinessCard 
                        key={crypto.randomUUID()}
                        cardContent={cardContent}
                        cardTitle={cardTitle}
                    />
                ))
            }
          </Wrapper>

          <Wrapper>
            {
                BusinessCardData.filter((_, index) => index > 2).map(({ cardContent, cardTitle }) => (
                    <BusinessCard 
                        key={crypto.randomUUID()}
                        cardContent={cardContent}
                        cardTitle={cardTitle}
                    />
                ))
            }
          </Wrapper>
        </div>
    )
}
