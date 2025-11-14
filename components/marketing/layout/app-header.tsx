"use client"

import * as React from "react"
import Link from "next/link"
import { RiGraduationCapLine, RiUserLine, RiLogoutBoxLine } from "react-icons/ri"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

type AppHeaderProps = {
  user?: {
    name: string
    email: string
  } | null
}

export function AppHeader({ user }: AppHeaderProps) {
  return (
    <header className="sticky top-0 z-50 border-b-2 border-purple-200 bg-white">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
          <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl flex items-center justify-center shadow-lg">
            <RiGraduationCapLine className="w-7 h-7 text-white" />
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Coursify</span>
        </Link>

        {/* Empty space for balance - nav links removed as they're in dropdown */}
        <div className="flex-1" />

        {/* User Dropdown or Get Started */}
        {user ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              {/* eslint-disable-next-line product-quality/no-button-without-handler */}
              <Button
                variant="outline"
                size="md"
                className="border-2 border-purple-300 font-medium hover:bg-purple-50"
              >
                <RiUserLine className="mr-2 h-4 w-4" />
                {user.name || "User"}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-64 border-2 border-purple-200">
              <DropdownMenuLabel className="font-bold uppercase">
                {user.name || "User"}
              </DropdownMenuLabel>
              <DropdownMenuLabel className="text-xs text-slate-600 font-normal">
                {user.email}
              </DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-purple-200" />
              <DropdownMenuItem asChild>
                <Link href="/dashboard" className="cursor-pointer">
                  Dashboard
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/my-courses" className="cursor-pointer">
                  My Courses
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/courses" className="cursor-pointer">
                  Browse Courses
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/builder" className="cursor-pointer">
                  Create Course
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator className="bg-purple-200" />
              <DropdownMenuItem className="text-red-600 cursor-pointer">
                <RiLogoutBoxLine className="mr-2 h-4 w-4" />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Button
            size="md"
            className="bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700"
            asChild
          >
            <Link href="/auth/signin">Get Started</Link>
          </Button>
        )}
      </div>
    </header>
  )
}
