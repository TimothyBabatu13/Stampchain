import { Badge } from "@/components/ui/badge"
import { Sparkles } from "lucide-react"

const Loading = () => {
    
  return (
    <div className="fixed inset-0 bg-gradient-to-br from-blue-50/95 via-white/95 to-purple-50/95 backdrop-blur-sm z-50 flex items-center justify-center">
    {/* Animated Background */}
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-br from-blue-400/10 to-purple-400/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-gradient-to-br from-purple-400/10 to-blue-400/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
    </div>

    {/* Content */}
    <div className="relative z-10 text-center">
      {/* Spinner */}
      <div className="relative mb-6">
        <div className="w-20 h-20 mx-auto relative">
          <div className="absolute inset-0 rounded-full border-4 border-gray-200"></div>
          <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-blue-600 border-r-purple-600 animate-spin"></div>
          <div className="absolute inset-2 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
            <Sparkles className="w-8 h-8 text-white animate-pulse" />
          </div>
        </div>
      </div>

      {/* Progress */}
      <div className="w-64 mx-auto mb-4">
        <div className="w-full bg-gray-200 rounded-full h-1 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-blue-600 to-purple-600 rounded-full transition-all duration-300 ease-out"
          ></div>
        </div>
      </div>

      {/* Status */}
      <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
        <div className="w-2 h-2 mr-2 border border-blue-600 border-t-transparent rounded-full animate-spin"></div>
        Processing
      </Badge>
    </div>
  </div>
  )
}

export default Loading