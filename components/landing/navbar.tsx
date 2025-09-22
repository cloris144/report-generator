"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X, Stethoscope } from "lucide-react"
import { ModeToggle } from "@/components/mode-toggle"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="fixed top-0 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <img
                  src="/notext.png"
                  alt="logo"
                  className="h-10 w-10 text-primary"
              />
              <span className="text-xl font-bold">ChickadeeX</span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <Link href="#features" className="hover:text-primary px-3 py-2 text-sm font-medium transition-colors">
                功能特色
              </Link>
              <Link href="#how-it-works" className="hover:text-primary px-3 py-2 text-sm font-medium transition-colors">
                運作原理
              </Link>
              
              <Link href="#faq" className="hover:text-primary px-3 py-2 text-sm font-medium transition-colors">
                常見問題
              </Link>
            </div>
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <ModeToggle />
            <Link href="/auth/login">
              
            </Link>
            <Link href="/demo">
              
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2">
            <ModeToggle />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md hover:bg-accent"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t">
              <Link
                href="#features"
                className="block px-3 py-2 text-base font-medium hover:text-primary transition-colors"
                onClick={() => setIsOpen(false)}
              >
                功能特色
              </Link>
              <Link
                href="#how-it-works"
                className="block px-3 py-2 text-base font-medium hover:text-primary transition-colors"
                onClick={() => setIsOpen(false)}
              >
                運作原理
              </Link>
              <Link
                href="#pricing"
                className="block px-3 py-2 text-base font-medium hover:text-primary transition-colors"
                onClick={() => setIsOpen(false)}
              >
                方案價格
              </Link>
              <Link
                href="#faq"
                className="block px-3 py-2 text-base font-medium hover:text-primary transition-colors"
                onClick={() => setIsOpen(false)}
              >
                常見問題
              </Link>
              <div className="flex flex-col space-y-2 px-3 pt-4">
                <Link href="/auth/login">
                  <Button variant="outline" className="w-full bg-transparent">
                    登入
                  </Button>
                </Link>
                <Link href="/demo">
                  <Button className="w-full">免費試用</Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
