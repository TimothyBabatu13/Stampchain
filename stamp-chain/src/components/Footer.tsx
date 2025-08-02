'use client';
import { Sparkles } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation";

const Footer = () => {

    const pathName = usePathname();

    if(pathName === '/login') return null

  return (
    <footer className="border-t bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <div className="w-6 h-6 bg-black rounded-lg flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <span className="font-bold bg-black bg-clip-text text-transparent">
                LaaS
              </span>
            </div>
            <div className="flex items-center gap-6 text-sm text-gray-600">
              <span>© 2024 Loyalty-as-a-Service</span>
              <Link prefetch={false} href="/privacy" className="hover:text-gray-900 transition-colors">
                Privacy
              </Link>
              <Link prefetch={false} href="/terms" className="hover:text-gray-900 transition-colors">
                Terms
              </Link>
            </div>
          </div>
        </div>
      </footer>
  )
}

export default Footer