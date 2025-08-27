'use client';
import { ArrowLeft, ArrowRight, Plus, Sparkles } from "lucide-react"
import Link from "next/link"
import { Button } from "./ui/button"
import { usePathname } from "next/navigation";
import { Badge } from "./ui/badge";
import { useSession, signOut } from "next-auth/react";

const LogOutButton = () => {

  const handleLogOut = () => {
    signOut();
  }

  return (
    <Button
      onClick={handleLogOut}
      variant={'outline'}
    >
      Logout
    </Button>
  )
}

const Logo = () => (
  <Link href="/" className="flex items-center gap-2">
    <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
      <Sparkles className="w-5 h-5 text-white" />
    </div>
    <span className="text-xl font-bold bg-black bg-clip-text text-transparent">
      LaaS
    </span>
  </Link>
)

// const HeaderComponent = ({path} : {
//   path: '/login' | '/'
// }) => {
//   const render = () => {
//     switch (path) {
//       case path = '/login':
//         return <h1>This is for login</h1>
//       case path = '/':
//         return <h1>This is for others</h1>
//       default:
//         return null
//     }
//   }
//   return <>{render()}</>
// }

const Header = () => {

  const { status } = useSession()

  const path = usePathname();

  // return <HeaderComponent path="/login" />
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

  if (path === '/claim') {
    return (
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="flex items-center gap-6 max-w-[80%] mx-auto">
          <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            <Logo />
            <Badge variant="outline" className="hidden sm:inline-flex">
              Claim Rewards
            </Badge>
          </div>
          <LogOutButton />
        </div>
      </header>
    )
  }

  if (path === '/admin') {
    return (
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Logo />
          </div>
          <div className="flex items-center gap-6">
            <Link
              href="/admin/campaign/new"
            >
              <Button
                variant={'outline'}
              >
                <Plus className="w-4 h-4 md:mr-2" />
                <span className="hidden md:inline">New Campaign</span>
              </Button>
            </Link>
            <LogOutButton />
          </div>
        </div>
      </header>
    )
  }

  if (path === '/admin/campaign/new') {
    return (
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              href="/admin"
              className="flex items-center md:gap-2 text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="hidden md:inline">Back to Dashboard</span>
            </Link>
          </div>
          <LogOutButton />
        </div>
      </header>
    )
  }

  if (path === '/admin/campaign/success') {
    return (
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="flex items-center justify-between max-w-[80%] mx-auto">
          <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            <Logo />
          </div>
          <LogOutButton />
        </div>
      </header>
    )
  }

  if (path === '/qr-generator') {
    return (
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/admin" className="flex items-center md:gap-2 text-gray-600 hover:text-gray-900">
              <ArrowLeft className="w-5 h-5" />
              <span className="hidden md:inline">Back to Dashboard</span>
            </Link>
          </div>
          <LogOutButton />
        </div>
      </header>
    )
  }
  return (
    <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Logo />
        <nav className="hidden md:flex items-center gap-6">
          <a href="#features" className="text-gray-600 hover:text-gray-900 transition-colors">
            Features
          </a>
          <a href="#use-cases" className="text-gray-600 hover:text-gray-900 transition-colors">
            Use Cases
          </a>
        </nav>
        <div className="flex items-center gap-3">
          {
            status === 'authenticated' ? (
              <div className="flex items-center gap-6">
                <Link 
                  href="/admin"
                  className="hidden sm:inline-flex"
                >
                  <Button 
                    variant="outline" 
                  >
                    Admin Panel
                  </Button>
                </Link>
                <LogOutButton />
              </div>
            ) :
              (
                <Link href={'/login'}>
                  <Button
                    variant={'outline'}
                  >
                    Get Started
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              )
          }
        </div>
      </div>
    </header>
  )
}

export default Header