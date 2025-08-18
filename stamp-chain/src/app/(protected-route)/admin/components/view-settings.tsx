import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Activity } from "lucide-react"
import SettingsPage from "./settings"

const ViewSettings = () => {
  return (
    <div className="space-y-6">
        <div>
              <h2 className="text-2xl font-bold mb-2">Account Settings</h2>
              <p className="text-gray-600">Manage your account preferences and security settings</p>
            </div>

            <Card className="border-0 shadow-lg">
              
              <CardContent>
                <div 
                  // className="flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg"
                >
                  <SettingsPage />
                </div>
              </CardContent>
            </Card>
    </div>
  )
}

export default ViewSettings