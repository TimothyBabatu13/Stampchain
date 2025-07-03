// "use client"

// import { useState } from "react"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// // import { showValidationErrors, showDetailedValidationErrors } from "@/lib/error-handler"
// import { toast } from "sonner"

// export default function ApiExample() {
//   const [formData, setFormData] = useState({
//     name: "",
//     totalSupply: "",
//     price: "",
//     email: "",
//   })
//   const [loading, setLoading] = useState(false)

//   // Simulate API call with validation errors
//   const simulateApiCall = async (useDetailedErrors = false) => {
//     setLoading(true)

//     // Simulate API delay
//     await new Promise((resolve) => setTimeout(resolve, 1000))

//     // Simulate different types of validation errors
//     const mockErrors = {
//       issues: [
//         {
//           code: "invalid_type",
//           expected: "number",
//           received: "string",
//           path: ["totalSupply"],
//           message: "Total supply must be a number.",
//         },
//         {
//           code: "invalid_string",
//           expected: "email",
//           received: "invalid-email",
//           path: ["email"],
//           message: "Please enter a valid email address.",
//         },
//         {
//           code: "too_small",
//           expected: "minimum 1",
//           received: "0",
//           path: ["price"],
//           message: "Price must be greater than 0.",
//         },
//         {
//           code: "invalid_type",
//           expected: "string",
//           received: "undefined",
//           path: ["name"],
//           message: "Name is required.",
//         },
//       ],
//       name: "ZodError",
//     }

//     setLoading(false)

//     // Show errors using the appropriate function
//     if (useDetailedErrors) {
//       showDetailedValidationErrors(mockErrors)
//     } else {
//       showValidationErrors(mockErrors)
//     }
//   }

//   const simulateSuccess = async () => {
//     setLoading(true)
//     await new Promise((resolve) => setTimeout(resolve, 1000))
//     setLoading(false)

//     toast.success("Success!", {
//       description: "Data submitted successfully",
//       duration: 3000,
//     })
//   }

//   const simulateSingleError = () => {
//     const singleError = {
//       issues: [
//         {
//           code: "invalid_type",
//           expected: "number",
//           received: "string",
//           path: ["totalSupply"],
//           message: "Total supply must be a number.",
//         },
//       ],
//       name: "ZodError",
//     }

//     showValidationErrors(singleError)
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 p-4">
//       <div className="max-w-2xl mx-auto space-y-6">
//         <Card>
//           <CardHeader>
//             <CardTitle>API Error Handling Demo</CardTitle>
//           </CardHeader>
//           <CardContent className="space-y-4">
//             <div className="grid grid-cols-2 gap-4">
//               <div>
//                 <Label htmlFor="name">Name</Label>
//                 <Input
//                   id="name"
//                   value={formData.name}
//                   onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
//                   placeholder="Enter name"
//                 />
//               </div>
//               <div>
//                 <Label htmlFor="email">Email</Label>
//                 <Input
//                   id="email"
//                   type="email"
//                   value={formData.email}
//                   onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
//                   placeholder="Enter email"
//                 />
//               </div>
//             </div>

//             <div className="grid grid-cols-2 gap-4">
//               <div>
//                 <Label htmlFor="totalSupply">Total Supply</Label>
//                 <Input
//                   id="totalSupply"
//                   value={formData.totalSupply}
//                   onChange={(e) => setFormData((prev) => ({ ...prev, totalSupply: e.target.value }))}
//                   placeholder="Enter number"
//                 />
//               </div>
//               <div>
//                 <Label htmlFor="price">Price</Label>
//                 <Input
//                   id="price"
//                   value={formData.price}
//                   onChange={(e) => setFormData((prev) => ({ ...prev, price: e.target.value }))}
//                   placeholder="Enter price"
//                 />
//               </div>
//             </div>

//             <div className="flex flex-wrap gap-2 pt-4">
//               <Button onClick={() => simulateApiCall(false)} disabled={loading} variant="destructive">
//                 {loading ? "Loading..." : "Simulate Multiple Errors"}
//               </Button>

//               <Button onClick={() => simulateApiCall(true)} disabled={loading} variant="destructive">
//                 {loading ? "Loading..." : "Detailed Error View"}
//               </Button>

//               <Button onClick={simulateSingleError} disabled={loading} variant="outline">
//                 Single Error
//               </Button>

//               <Button onClick={simulateSuccess} disabled={loading} variant="default">
//                 {loading ? "Loading..." : "Simulate Success"}
//               </Button>
//             </div>
//           </CardContent>
//         </Card>

//         <Card>
//           <CardHeader>
//             <CardTitle className="text-lg">Usage Example</CardTitle>
//           </CardHeader>
//           <CardContent>
//             <pre className="bg-gray-100 p-4 rounded-md text-sm overflow-x-auto">
//               {`// In your API call
// try {
//   const response = await fetch('/api/endpoint', {
//     method: 'POST',
//     body: JSON.stringify(data)
//   })
  
//   if (!response.ok) {
//     const error = await response.json()
//     showValidationErrors(error)
//     return
//   }
  
//   // Handle success
//   toast.success("Success!")
// } catch (error) {
//   showValidationErrors(error)
// }`}
//             </pre>
//           </CardContent>
//         </Card>
//       </div>
//     </div>
//   )
// }

export const Readd = () => {
    return(
        <div></div>
    )
}