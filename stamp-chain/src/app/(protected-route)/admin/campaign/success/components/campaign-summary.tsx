import { CardContent } from "@/components/ui/card"
import { TokenClaim, TotalSupply } from "./client-text";
import { Suspense } from "react";

const CapaignSummary = ({ id } : {
  id: string
}) => {
  return (
    <CardContent>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="text-center p-4 bg-white rounded-lg shadow-sm">
          <Suspense fallback={<h1>Loading...</h1>}>
            <TotalSupply id={id}/>
          </Suspense>
          <div className="text-sm text-gray-600">Total Supply</div>
        </div>
        <div className="text-center p-4 bg-white rounded-lg shadow-sm">
          <Suspense fallback={<h1>Loading...</h1>}>
            <TokenClaim id={id}/>
          </Suspense>
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