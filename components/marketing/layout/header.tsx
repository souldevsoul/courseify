"use client"

import * as React from "react"
import { Container } from "@/components/ui/container"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Menu, X } from "lucide-react"
import { RiGraduationCapLine } from "react-icons/ri"

export interface NavLink {
  label: string
  href: string
}

export interface HeaderProps extends React.HTMLAttributes<HTMLElement> {
  logo?: React.ReactNode
  logoText?: string
  navLinks?: NavLink[]
  ctaButton?: {
    text: string
    href?: string
    onClick?: () => void
  }
  transparent?: boolean
}

const Header = React.forwardRef<HTMLElement, HeaderProps>(
  ({
    logo,
    logoText = "Coursify",
    navLinks = [],
    ctaButton,
    transparent = false,
    className,
    ...props
  }, ref) => {
    const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false)
    const [scrolled, setScrolled] = React.useState(false)

    React.useEffect(() => {
      const handleScroll = () => {
        setScrolled(window.scrollY > 10)
      }
      window.addEventListener("scroll", handleScroll)
      return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    const headerBg = transparent && !scrolled
      ? "bg-transparent"
      : "bg-white border-b-2 border-purple-200"

    return (
      <header
        ref={ref}
        className={cn(
          "sticky top-0 z-50 w-full transition-all duration-300",
          headerBg,
          className
        )}
        {...props}
      >
        <Container maxWidth="xl">
          <nav className="flex items-center justify-between h-20">
            {/* Logo */}
            <a href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
              {logo || (
                <>
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl flex items-center justify-center shadow-lg">
                    <RiGraduationCapLine className="w-7 h-7 text-white" />
                  </div>
                  <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">{logoText}</span>
                </>
              )}
            </a>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  className="text-sm font-semibold text-gray-700 hover:text-pink-500 transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>

            {/* CTA Button */}
            <div className="hidden md:flex items-center gap-4">
              {ctaButton && (
                <button
                  onClick={ctaButton.onClick}
                  className="bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700 font-bold px-6 py-2 rounded-lg shadow-lg transition-all"
                >
                  {ctaButton.href ? (
                    <a href={ctaButton.href}>{ctaButton.text}</a>
                  ) : (
                    ctaButton.text
                  )}
                </button>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </nav>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden border-t-2 border-purple-200 py-4">
              <div className="flex flex-col gap-4">
                {navLinks.map((link, index) => (
                  <a
                    key={index}
                    href={link.href}
                    className="text-sm font-semibold text-gray-700 hover:text-pink-500 transition-colors py-2"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.label}
                  </a>
                ))}
                {ctaButton && (
                  <button
                    className="bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700 font-bold px-6 py-3 rounded-lg shadow-lg transition-all w-full"
                    onClick={() => {
                      ctaButton.onClick?.()
                      setMobileMenuOpen(false)
                    }}
                  >
                    {ctaButton.href ? (
                      <a href={ctaButton.href}>{ctaButton.text}</a>
                    ) : (
                      ctaButton.text
                    )}
                  </button>
                )}
              </div>
            </div>
          )}
        </Container>
      </header>
    )
  }
)
Header.displayName = "Header"

export { Header }
