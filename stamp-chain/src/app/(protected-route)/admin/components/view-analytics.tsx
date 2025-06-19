import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, Users } from "lucide-react"

const ViewAnalytics = () => {
  return (
    <div className="space-y-6">
        <div>
            <h2 className="text-2xl font-bold mb-2">Analytics Overview</h2>
            <p className="text-gray-600">Track your campaign performance and user engagement</p>
        </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle>Token Distribution Trends</CardTitle>
                  <CardDescription>Daily token claims over the last 30 days</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg">
                    <div className="text-center text-gray-500">
                      <TrendingUp className="w-12 h-12 mx-auto mb-2" />
                      <p>Analytics chart would appear here</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle>User Engagement</CardTitle>
                  <CardDescription>Campaign performance metrics</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center bg-gradient-to-br from-purple-50 to-blue-50 rounded-lg">
                    <div className="text-center text-gray-500">
                      <Users className="w-12 h-12 mx-auto mb-2" />
                      <p>Engagement metrics would appear here</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
    </div>
  )
}

export default ViewAnalytics