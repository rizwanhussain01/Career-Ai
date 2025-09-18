import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertCircle } from "lucide-react"

export default function AuthCodeError() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
            <AlertCircle className="h-6 w-6 text-red-600" />
          </div>
          <CardTitle className="mt-4 text-xl font-semibold text-gray-900">Authentication Error</CardTitle>
          <CardDescription className="mt-2 text-sm text-gray-600">
            There was an error processing your authentication request.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-gray-600 text-center">
            This could be due to an expired or invalid authentication code. Please try signing in again.
          </p>
          <div className="flex flex-col space-y-2">
            <Button asChild className="w-full">
              <Link href="/auth/login">Try Again</Link>
            </Button>
            <Button variant="outline" asChild className="w-full bg-transparent">
              <Link href="/">Back to Home</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
