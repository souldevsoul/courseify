"use client"

import * as React from "react"
import Link from "next/link"
import { RiGraduationCapLine } from "react-icons/ri"
import { Menu, X } from "lucide-react"

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false)

  React.useEffect(() => {
    const handleScroll = () => {}
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navLinks = [
    { label: "Features", href: "/#features" },
    { label: "Pricing", href: "/#pricing" },
    { label: "Demo", href: "/demo" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ]

  return (
    <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-sm border-b border-gray-200 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-6">
        <nav className="flex items-center justify-between h-20">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-purple-600 rounded flex items-center justify-center">
              <RiGraduationCapLine className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold">Coursify</span>
          </Link>
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link, index) => (
              <Link key={index} href={link.href} className="text-sm font-medium text-gray-700 hover:text-purple-700 transition-colors">
                {link.label}
              </Link>
            ))}
          </div>
          <div className="hidden md:flex items-center gap-4">
            <Link href="/dashboard" className="bg-purple-600 text-white hover:bg-purple-700 font-medium px-6 py-2 rounded transition-colors">
              Get Started
            </Link>
          </div>
          <button className="md:hidden p-2" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} aria-label="Toggle menu">
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </nav>
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4">
            <div className="flex flex-col gap-4">
              {navLinks.map((link, index) => (
                <Link key={index} href={link.href} className="text-sm font-medium text-gray-700 hover:text-purple-700 transition-colors py-2" onClick={() => setMobileMenuOpen(false)}>
                  {link.label}
                </Link>
              ))}
              <Link href="/dashboard" className="bg-purple-600 text-white hover:bg-purple-700 font-medium px-6 py-3 rounded transition-colors w-full text-center" onClick={() => setMobileMenuOpen(false)}>
                Get Started
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
