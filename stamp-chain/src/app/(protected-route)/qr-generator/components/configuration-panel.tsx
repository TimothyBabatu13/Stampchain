import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Settings } from "lucide-react";
import ConfigurationPanelForm from "./configuration-panel-form";


const ConfigurationPanel = () => {

  return (
    <div className="lg:col-span-1">
        <Card className="border-0 shadow-lg sticky top-24">
          <CardHeader>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
                <Settings className="w-4 h-4 text-white" />
              </div>
              <div>
                <CardTitle>QR Configuration</CardTitle>
                <CardDescription>Set up your QR code generation</CardDescription>
              </div>
            </div>
          </CardHeader>
          <ConfigurationPanelForm />
        </Card>
      </div>
  )
}

export default ConfigurationPanel