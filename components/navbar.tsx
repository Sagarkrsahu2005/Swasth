import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Heart, MapPin, Ambulance, LogOut } from 'lucide-react'

export default function Navbar() {
  const handleLogout = () => {
    console.log("[v0] Logout clicked");
    // TODO: Add actual logout logic here
  }

  return (
    <nav className="glass sticky top-0 z-50 border-b">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-bold text-xl hover:opacity-80 transition">
          <Heart className="w-6 h-6 text-primary" />
          <span>Swasth Emergency</span>
        </Link>

        <div className="flex items-center gap-6">
          <Link href="/" className="hover:text-primary transition font-medium">
            Dashboard
          </Link>
          <Link href="/map" className="hover:text-primary transition flex items-center gap-1 font-medium">
            <MapPin className="w-4 h-4" />
            Map
          </Link>
          <Link href="/routing" className="hover:text-primary transition font-medium">
            Get Help
          </Link>
          <Link href="/ambulance" className="hover:text-primary transition flex items-center gap-1 font-medium">
            <Ambulance className="w-4 h-4" />
            Ambulance
          </Link>
          <Link href="/admin" className="hover:text-primary transition font-medium">
            Admin
          </Link>
          <Link href="/admin/gov" className="hover:text-primary transition font-medium">
            Analytics
          </Link>
          <Button variant="outline" size="sm" onClick={handleLogout} className="cursor-pointer">
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>
      </div>
    </nav>
  )
}
