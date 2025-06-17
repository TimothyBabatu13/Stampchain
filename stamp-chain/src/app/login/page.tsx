import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Sparkles, Shield, Zap, Users } from "lucide-react"
import Link from "next/link"
import GoogleSignInBtn from "./google-btn"

const LoginPage = () => {

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 relative overflow-hidden">
    
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-purple-400/20 to-blue-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-blue-300/10 to-purple-300/10 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

    
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-4 h-4 bg-blue-400/30 rounded-full animate-bounce delay-300"></div>
        <div className="absolute top-40 right-32 w-3 h-3 bg-purple-400/30 rounded-full animate-bounce delay-700"></div>
        <div className="absolute bottom-32 left-40 w-5 h-5 bg-blue-300/30 rounded-full animate-bounce delay-1000"></div>
        <div className="absolute bottom-20 right-20 w-2 h-2 bg-purple-300/30 rounded-full animate-bounce delay-500"></div>
        <div className="absolute top-1/3 left-1/4 w-3 h-3 bg-blue-400/20 rounded-full animate-bounce delay-200"></div>
        <div className="absolute top-2/3 right-1/4 w-4 h-4 bg-purple-400/20 rounded-full animate-bounce delay-900"></div>
      </div>


      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 py-8 min-h-[calc(100vh-80px)] flex items-center justify-center">
        <div className="w-full max-w-md">
          {/* Welcome Section */}
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-blue-500/25 animate-pulse">
              <Sparkles className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Welcome Back
            </h1>
            <p className="text-lg text-gray-600 leading-relaxed">
              Sign in to access your loyalty campaigns and start rewarding your community
            </p>
          </div>


          <Card className="border-0 shadow-2xl shadow-blue-500/10 backdrop-blur-sm bg-white/90 hover:shadow-3xl transition-all duration-500 hover:-translate-y-1">
            <CardContent className="p-8">
              <div className="space-y-6">

                <GoogleSignInBtn />

                {/* Divider */}
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-200"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-4 bg-white text-gray-500">Secure & Fast Authentication</span>
                  </div>
                </div>

                {/* Security Features */}
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div className="p-3 rounded-lg bg-blue-50 hover:bg-blue-100 transition-colors">
                    <Shield className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                    <p className="text-xs text-blue-700 font-medium">Secure</p>
                  </div>
                  <div className="p-3 rounded-lg bg-purple-50 hover:bg-purple-100 transition-colors">
                    <Zap className="w-6 h-6 text-purple-600 mx-auto mb-2" />
                    <p className="text-xs text-purple-700 font-medium">Fast</p>
                  </div>
                  <div className="p-3 rounded-lg bg-green-50 hover:bg-green-100 transition-colors">
                    <Users className="w-6 h-6 text-green-600 mx-auto mb-2" />
                    <p className="text-xs text-green-700 font-medium">Trusted</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Additional Info */}
          <div className="mt-8 text-center space-y-4">
            <p className="text-sm text-gray-500">
              By signing in, you agree to our{" "}
              <Link href="/terms" className="text-blue-600 hover:text-blue-700 underline">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link href="/privacy" className="text-blue-600 hover:text-blue-700 underline">
                Privacy Policy
              </Link>
            </p>

            <div className="flex items-center justify-center gap-6 text-xs text-gray-400">
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span>All systems operational</span>
              </div>
              <div className="flex items-center gap-1">
                <Shield className="w-3 h-3" />
                <span>256-bit SSL encryption</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Decoration */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600"></div>
    </div>
  )
}

export default LoginPage