import { CardContent } from "@/components/ui/card"
import { TokenClaim, TotalSupply } from "./client-text";

const CapaignSummary = ({ id } : {
  id: string
}) => {
  return (
    <CardContent>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="text-center p-4 bg-white rounded-lg shadow-sm">
          <TotalSupply id={id}/>
          <div className="text-sm text-gray-600">Total Supply</div>
        </div>
        <div className="text-center p-4 bg-white rounded-lg shadow-sm">
          <TokenClaim id={id}/>
          <div className="text-sm text-gray-600">Tokens per Claim</div>
        </div>
        <div className="text-center p-4 bg-white rounded-lg shadow-sm">
          <div className="text-2xl font-bold text-green-600 mb-1">Active</div>
          <div className="text-sm text-gray-600">Campaign Status</div>
        </div>
      </div>
    </CardContent>
  )
}

export default CapaignSummary