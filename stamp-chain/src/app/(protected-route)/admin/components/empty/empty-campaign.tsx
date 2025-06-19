
"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { PlayCircle, Plus, Target } from "lucide-react"
import Link from "next/link"

// import { Button } from "@/components/ui/button"
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// import { Badge } from "@/components/ui/badge"
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// import {
//   Plus,
//   Sparkles,
//   Activity,
//   Target,
//   Users,
//   QrCode,
//   Coins,
//   TrendingUp,
//   ArrowRight,
//   PlayCircle,
//   BookOpen,
//   Zap,
// } from "lucide-react"
// import Link from "next/link"

// export default function EmptyAdminDashboard() {
//   const gettingStartedSteps = [
//     {
//       step: 1,
//       title: "Create Your First Campaign",
//       description: "Set up a loyalty program with custom tokens and rewards",
//       icon: Target,
//       action: "Create Campaign",
//       href: "/admin/campaign/new",
//       color: "blue",
//     },
//     {
//       step: 2,
//       title: "Generate QR Codes",
//       description: "Create unique QR codes for users to scan and claim tokens",
//       icon: QrCode,
//       action: "Generate QR Codes",
//       href: "/qr-generator",
//       color: "purple",
//     },
//     {
//       step: 3,
//       title: "Share & Distribute",
//       description: "Share your QR codes with customers and start building loyalty",
//       icon: Users,
//       action: "Learn How",
//       href: "#",
//       color: "green",
//     },
//   ]

//   const features = [
//     {
//       title: "Token-Based Rewards",
//       description: "Create custom ERC-20 tokens for your loyalty program",
//       icon: Coins,
//     },
//     {
//       title: "QR Code Distribution",
//       description: "Generate secure, one-time use QR codes for token claims",
//       icon: QrCode,
//     },
//     {
//       title: "Real-time Analytics",
//       description: "Track campaign performance and user engagement",
//       icon: TrendingUp,
//     },
//     {
//       title: "Fraud Prevention",
//       description: "Built-in security to prevent abuse and double claims",
//       icon: Activity,
//     },
//   ]

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
//       {/* Header */}
      
      

//         {/* Empty State Tabs */}
//         <Tabs defaultValue="overview" className="space-y-6">
//           <TabsList className="grid w-full grid-cols-3 lg:w-[400px]">
//             <TabsTrigger value="overview">Overview</TabsTrigger>
//             <TabsTrigger value="campaigns">Campaigns</TabsTrigger>
//             <TabsTrigger value="analytics">Analytics</TabsTrigger>
//           </TabsList>

//           <TabsContent value="overview" className="space-y-6">
//             {/* Stats Preview */}
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//               {[
//                 { title: "Total Campaigns", value: "0", icon: Target, description: "Create your first campaign" },
//                 { title: "Tokens Distributed", value: "0", icon: Coins, description: "Start rewarding users" },
//                 { title: "Active Users", value: "0", icon: Users, description: "Build your community" },
//                 { title: "QR Scans", value: "0", icon: QrCode, description: "Generate QR codes" },
//               ].map((stat, index) => (
//                 <Card key={index} className="border-0 shadow-lg bg-gradient-to-br from-gray-50 to-gray-100">
//                   <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//                     <CardTitle className="text-sm font-medium text-gray-600">{stat.title}</CardTitle>
//                     <stat.icon className="h-4 w-4 text-gray-400" />
//                   </CardHeader>
//                   <CardContent>
//                     <div className="text-2xl font-bold text-gray-400">{stat.value}</div>
//                     <p className="text-xs text-gray-500">{stat.description}</p>
//                   </CardContent>
//                 </Card>
//               ))}
//             </div>

//             {/* Features Overview */}
//             <Card className="border-0 shadow-lg">
//               <CardHeader>
//                 <CardTitle className="flex items-center gap-2">
//                   <Zap className="w-6 h-6" />
//                   What You Can Do with LaaS
//                 </CardTitle>
//                 <CardDescription>Powerful features to build engaging loyalty programs</CardDescription>
//               </CardHeader>
//               <CardContent>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                   {features.map((feature, index) => {
//                     const FeatureIcon = feature.icon
//                     return (
//                       <div
//                         key={index}
//                         className="flex items-start gap-4 p-4 bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg"
//                       >
//                         <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center shrink-0">
//                           <FeatureIcon className="w-5 h-5 text-white" />
//                         </div>
//                         <div>
//                           <h4 className="font-medium mb-1">{feature.title}</h4>
//                           <p className="text-sm text-gray-600">{feature.description}</p>
//                         </div>
//                       </div>
//                     )
//                   })}
//                 </div>
//               </CardContent>
//             </Card>
//           </TabsContent>

//           <TabsContent value="campaigns" className="space-y-6">
//             <Card className="border-0 shadow-lg">
//               <CardContent className="py-16">
//                 <div className="text-center">
//                   <div className="w-24 h-24 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
//                     <Target className="w-12 h-12 text-gray-400" />
//                   </div>
//                   <h3 className="text-2xl font-bold mb-4">No Campaigns Yet</h3>
//                   <p className="text-gray-600 mb-8 max-w-md mx-auto">
//                     Create your first loyalty campaign to start rewarding your customers with blockchain-powered tokens.
//                   </p>
//                   <div className="flex flex-col sm:flex-row gap-4 justify-center">
//                     <Link href="/admin/campaign/new">
//                       <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
//                         <Plus className="w-4 h-4 mr-2" />
//                         Create Your First Campaign
//                       </Button>
//                     </Link>
//                     <Button variant="outline">
//                       <PlayCircle className="w-4 h-4 mr-2" />
//                       Watch Tutorial
//                     </Button>
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>
//           </TabsContent>

//           <TabsContent value="analytics" className="space-y-6">
//             <Card className="border-0 shadow-lg">
//               <CardContent className="py-16">
//                 <div className="text-center">
//                   <div className="w-24 h-24 bg-gradient-to-br from-purple-100 to-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
//                     <TrendingUp className="w-12 h-12 text-gray-400" />
//                   </div>
//                   <h3 className="text-2xl font-bold mb-4">Analytics Coming Soon</h3>
//                   <p className="text-gray-600 mb-8 max-w-md mx-auto">
//                     Once you create campaigns and users start claiming tokens, you'll see detailed analytics and
//                     insights here.
//                   </p>
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-lg mx-auto text-left">
//                     <div className="p-4 bg-blue-50 rounded-lg">
//                       <h4 className="font-medium text-blue-900 mb-2">📊 Campaign Performance</h4>
//                       <p className="text-sm text-blue-700">Track token distribution and claim rates</p>
//                     </div>
//                     <div className="p-4 bg-purple-50 rounded-lg">
//                       <h4 className="font-medium text-purple-900 mb-2">👥 User Engagement</h4>
//                       <p className="text-sm text-purple-700">Monitor user activity and retention</p>
//                     </div>
//                     <div className="p-4 bg-green-50 rounded-lg">
//                       <h4 className="font-medium text-green-900 mb-2">📈 Growth Metrics</h4>
//                       <p className="text-sm text-green-700">Analyze program growth over time</p>
//                     </div>
//                     <div className="p-4 bg-orange-50 rounded-lg">
//                       <h4 className="font-medium text-orange-900 mb-2">🎯 ROI Tracking</h4>
//                       <p className="text-sm text-orange-700">Measure loyalty program effectiveness</p>
//                     </div>
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>
//           </TabsContent>
//         </Tabs>

//         {/* Quick Actions */}
//         <Card className="border-0 shadow-lg mt-8 bg-gradient-to-br from-blue-50 to-purple-50">
//           <CardHeader>
//             <CardTitle className="flex items-center gap-2">
//               <BookOpen className="w-6 h-6" />
//               Need Help Getting Started?
//             </CardTitle>
//             <CardDescription>Resources to help you launch your first campaign successfully</CardDescription>
//           </CardHeader>
//           <CardContent>
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//               <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2">
//                 <PlayCircle className="w-6 h-6" />
//                 <div className="text-center">
//                   <div className="font-medium">Video Tutorial</div>
//                   <div className="text-xs text-gray-600">5 min walkthrough</div>
//                 </div>
//               </Button>
//               <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2">
//                 <BookOpen className="w-6 h-6" />
//                 <div className="text-center">
//                   <div className="font-medium">Documentation</div>
//                   <div className="text-xs text-gray-600">Complete guide</div>
//                 </div>
//               </Button>
//               <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2">
//                 <Users className="w-6 h-6" />
//                 <div className="text-center">
//                   <div className="font-medium">Community</div>
//                   <div className="text-xs text-gray-600">Get support</div>
//                 </div>
//               </Button>
//             </div>
//           </CardContent>
//         </Card>
//       </div>
//     </div>
//   )
// }

const EmptyCampaing = () => {
  return (
    <Card className="border-0 shadow-lg">
        <CardContent className="">
            <div className="text-center">
                <div className="w-24 h-24 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Target className="w-12 h-12 text-gray-400" />
                </div>
                <h3 className="text-2xl font-bold mb-4">No Campaigns Yet</h3>
                <p className="text-gray-600 mb-8 max-w-md mx-auto">
                    Create your first loyalty campaign to start rewarding your customers with blockchain-powered tokens.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link href="/admin/campaign/new">
                        <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                            <Plus className="w-4 h-4 mr-2" />
                            Create Your First Campaign
                        </Button>
                    </Link>
                    <Button variant="outline">
                      <PlayCircle className="w-4 h-4 mr-2" />
                      Watch Tutorial
                    </Button>
                </div>
            </div>
        </CardContent>
    </Card>
  )
}

export default EmptyCampaing