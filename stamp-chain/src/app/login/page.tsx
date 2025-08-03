import { Card, CardContent } from "@/components/ui/card"
import { Sparkles, Shield, Zap, Users } from "lucide-react"
import Link from "next/link"
import GoogleSignInBtn from "./google-btn"

const LoginPage = () => {

  return (
    <div className="min-h-screen overflow-hidden">

      <div className="relative z-10 container mx-auto px-4 py-8 min-h-[calc(100vh-80px)] flex items-center justify-center">
        <div className="w-full max-w-md">

          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-black rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-blue-500/25 animate-pulse">
              <Sparkles className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl font-bold mb-4 bg-black bg-clip-text text-transparent">
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

                
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-200"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-4 bg-white text-gray-500">Secure & Fast Authentication</span>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 text-center">
                  <div className="p-3 rounded-lg border shadow">
                    <Shield className="w-6 h-6 text-black mx-auto mb-2" />
                    <p className="text-xs text-black font-medium">Secure</p>
                  </div>
                  <div className="p-3 rounded-lg border shadow">
                    <Zap className="w-6 h-6 text-black mx-auto mb-2" />
                    <p className="text-xs text-black font-medium">Fast</p>
                  </div>
                  <div className="p-3 rounded-lg border shadow">
                    <Users className="w-6 h-6 text-black mx-auto mb-2" />
                    <p className="text-xs text-black font-medium">Trusted</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="mt-8 text-center space-y-4">
            <p className="text-sm text-gray-500">
              By signing in, you agree to our{" "}
              <Link href="/terms" className="text-gray-600">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link href="/privacy" className="text-gray-600 underline">
                Privacy Policy
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginPage