import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Activity } from "lucide-react"

const ViewSettings = () => {
  return (
    <div className="space-y-6">
        <div>
              <h2 className="text-2xl font-bold mb-2">Account Settings</h2>
              <p className="text-gray-600">Manage your account preferences and security settings</p>
            </div>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Coming Soon</CardTitle>
                <CardDescription>Account settings panel will be available in the next update</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-32 flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg">
                  <div className="text-center text-gray-500">
                    <Activity className="w-8 h-8 mx-auto mb-2" />
                    <p>Settings panel coming soon</p>
                  </div>
                </div>
              </CardContent>
            </Card>
    </div>
  )
}

export default ViewSettings