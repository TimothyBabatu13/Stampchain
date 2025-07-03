import { Steps } from "./components/steps"
import Page from "./components/page"

export default function ClaimPage() {
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <Steps />
        <Page />
      </div>
    </div>
  )
}
