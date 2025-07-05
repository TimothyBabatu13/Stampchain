import { toast } from "sonner"

interface ValidationIssue {
  code: string
  expected?: string
  received?: string
  path: (string | number)[]
  message: string
}


interface ValidationError {
  issues: ValidationIssue[]
  name: string
}

export function formatFieldPath(path: (string | number)[]): string {
  if (path.length === 0) return "Root"

  return path
    .map((segment, index) => {
      if (typeof segment === "number") {
        return `[${segment}]`
      }
      return index === 0 ? segment : `.${segment}`
    })
    .join("")
}

export function formatErrorMessage(issue: ValidationIssue): string {
  const fieldPath = formatFieldPath(issue.path)

  // Use the provided message if it's descriptive enough
  if (
    issue.message &&
    !issue.message.toLowerCase().includes("required") &&
    !issue.message.toLowerCase().includes("invalid")
  ) {
    return `${fieldPath}: ${issue.message}`
  }

  // Create more descriptive messages based on error code
  switch (issue.code) {
    case "invalid_type":
      return `${fieldPath}: Expected ${issue.expected}, but received ${issue.received}`
    case "too_small":
      return `${fieldPath}: Value is too small`
    case "too_big":
      return `${fieldPath}: Value is too large`
    case "invalid_string":
      return `${fieldPath}: Invalid string format`
    case "invalid_enum_value":
      return `${fieldPath}: Invalid option selected`
    case "unrecognized_keys":
      return `${fieldPath}: Contains unrecognized fields`
    case "invalid_date":
      return `${fieldPath}: Invalid date format`
    case "custom":
      return `${fieldPath}: ${issue.message}`
    default:
      return `${fieldPath}: ${issue.message || "Validation error"}`
  }
}

export function showValidationErrors(error: ValidationError | Error) {
  // Handle different error formats
  if (!error || typeof error !== "object") {
    toast.error("An unexpected error occurred")
    return
  }


  // Check if it's a validation error with issues array
  // if (error.issues && Array.isArray(error.issues)) {
  //   const issues = error.issues as ValidationIssue[]

  //   if (issues.length === 1) {
  //     // Single error - show as simple toast
  //     const formattedMessage = formatErrorMessage(issues[0])
  //     toast.error("Validation Error", {
  //       description: formattedMessage,
  //       duration: 5000,
  //     })
  //   } else {
  //     // Multiple errors - show as expandable list
  //     const errorCount = issues.length
  //     // const firstError = formatErrorMessage(issues[0])

  //     toast.error(`${errorCount} Validation Errors`, {
  //       description: (
  //         <div className="space-y-2">
  //         <p className="font-medium">Please fix the following issues:</p>
  //         <ul className="space-y-1 text-sm">
  //           {issues.slice(0, 3).map((issue, index) => (
  //             <li key={index} className="flex items-start gap-2">
  //               <span className="text-red-500 mt-0.5">•</span>
  //               <span>{formatErrorMessage(issue)}</span>
  //             </li>
  //           ))}
  //           {issues.length > 3 && (
  //             <li className="text-muted-foreground italic">
  //               ...and {issues.length - 3} more error{issues.length - 3 !== 1 ? "s" : ""}
  //             </li>
  //           )}
  //         </ul>
  //         </div>
  //       ),
  //       duration: 8000,
  //     })
  //   }
  // } else if (error instanceof Error) {
  //   // Generic error with message
  //   toast.error("Error", {
  //     description: error.message,
  //     duration: 5000,
  //   })
  // } else {
  //   // Fallback for unknown error format
  //   toast.error("An error occurred", {
  //     description: "Please check your input and try again",
  //     duration: 5000,
  //   })
  // }
}

// Alternative function for showing all errors in a detailed format
export function showDetailedValidationErrors(error: ValidationError | Error) {
  console.log(error)
  // if (!error?.issues || !Array.isArray(error.issues)) {
  //   showValidationErrors(error)
  //   return
  // }

  // const issues = error.issues as ValidationIssue[]

  const issues = [{
    expected: true,
    received: true,
    message: ''
  }];
  toast.error("", {
    style:{
      width: 'fit-content'
    },
    description: (
      <div className="space-y-3 w-[fit-content]">
        <p className="font-medium text-sm text-red-600">
          Found {issues.length} error{issues.length !== 1 ? "s" : ""}:
        </p>
        <div className="space-y-2">
          {issues.map((issue, index) => (
            <div key={index} className="bg-red-50 border border-red-200 rounded-md p-2">
              <div className="flex items-start gap-2">
                {/* <span className="text-red-600 font-mono text-xs bg-red-100 px-1 rounded">{issue.code}</span> */}
                <div className="flex-1 min-w-0">
                  {/* <p className="text-xs font-medium text-red-800">{formatFieldPath(issue.path)}</p> */}
                  <p className="text-xs text-red-700 mt-1">{issue.message}</p>
                  {issue.expected && issue.received && (
                    <p className="text-xs text-red-600 mt-1">
                      Expected: {issue.expected}, Got: {issue.received}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    ),
    // duration: 10000,
  })
}

