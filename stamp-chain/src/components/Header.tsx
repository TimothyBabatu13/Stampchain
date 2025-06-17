'use client';
import { Activity, ArrowLeft, ArrowRight, Plus, Sparkles } from "lucide-react"
import Link from "next/link"
import { Button } from "./ui/button"
import { usePathname } from "next/navigation";
import { Badge } from "./ui/badge";

const Logo = () => (
<Link href="/" className="flex items-center gap-2">
    <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
        <Sparkles className="w-5 h-5 text-white" />
    </div>
    <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
        LaaS
    </span>
</Link>
)

const Header = () => {

    const path = usePathname();

    if (path === '/login') {
        return (
            <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Logo />
          <Badge variant="outline" className="hidden sm:inline-flex">
            Secure Sign In
          </Badge>
        </div>
      </header>
        )
    }
    
    if(path === '/claim') {
        return(
        <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
            <div className="container mx-auto px-4 py-4 flex items-center justify-between">
                <Logo />
                <Badge variant="outline" className="hidden sm:inline-flex">
                    Claim Rewards
                </Badge>
            </div>
        </header>
        )
    }

    if(path === '/admin') {
        return(
        <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
            <div className="container mx-auto px-4 py-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Logo />
                </div>
          <Link href="/admin/campaign/new">
            <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
              <Plus className="w-4 h-4 mr-2" />
              New Campaign
            </Button>
          </Link>
        </div>
      </header>
        )
    }

    if(path === '/admin/campaign/new'){
        return(
        <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
            <div className="container mx-auto px-4 py-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Link href="/admin" className="flex items-center gap-2 text-gray-600 hover:text-gray-900">
                        <ArrowLeft className="w-5 h-5" />
                        Back to Dashboard
                    </Link>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                        <Sparkles className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                        New Campaign
                    </span>
          </div>
        </div>
      </header>
    )
    }

    if(path === '/admin/campaign/success'){
        return(
            <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Logo />
        </div>
      </header>
        )
    }
  return (
    <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Logo />
          <nav className="hidden md:flex items-center gap-6">
            <Link href="#features" className="text-gray-600 hover:text-gray-900 transition-colors">
              Features
            </Link>
            <Link href="#use-cases" className="text-gray-600 hover:text-gray-900 transition-colors">
              Use Cases
            </Link>
            <Link href="/admin" className="text-gray-600 hover:text-gray-900 transition-colors">
              Dashboard
            </Link>
          </nav>
          <div className="flex items-center gap-3">
            <Link href="/admin">
              <Button variant="outline" className="hidden sm:inline-flex">
                Admin Panel
              </Button>
            </Link>
            <Link href="/login">
              <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                Get Started
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </header>
  )
}

export default Header