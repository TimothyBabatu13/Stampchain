import Form from "./components/form"

export default function QRGenerator() {
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Generate QR Codes</h1>
          <p className="text-gray-600">
            Create unique QR codes for your loyalty campaign that users can scan to claim tokens
          </p>
        </div>
        <Form />
      </div>
    </div>
  )
}
