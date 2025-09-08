"use client";

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { Button } from "./button"
import { Menu, X, ShoppingCart } from "lucide-react"
import { SparklesCore } from "./sparkles"

export function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false)
  const pathname = usePathname()

  const navItems = [
    { name: 'Accueil', href: '/' },
    { name: 'Shop', href: '/boutique' },
    { name: 'Contact', href: '/contact' },
  ]

  return (
    <header className="fixed top-0 z-50 w-full border-b border-white/10 bg-black/50 backdrop-blur-md">
      {/* Animated Background */}
      <div className="absolute inset-0 -z-10 h-full w-full">
        <SparklesCore
          id="navbar-sparkles"
          background="transparent"
          minSize={0.2}
          maxSize={0.8}
          particleDensity={50}
          className="h-full w-full"
          particleColor="#60A5FA"
        />
      </div>

      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-r from-blue-500 to-blue-600">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-6 w-6 text-white"
            >
              <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
            </svg>
          </div>
          <span className="text-xl font-bold text-white">Lightning Lucie</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center space-x-6 md:flex">
          {navItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "relative px-2 py-1 text-sm font-medium text-gray-300 transition-colors hover:text-white",
                  isActive && "text-white"
                )}
              >
                {isActive && (
                  <motion.span
                    layoutId="activeNavItem"
                    className="absolute inset-0 -z-10 rounded-md bg-blue-500/20"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <span className="relative z-10">{item.name}</span>
                {isActive && (
                  <motion.span
                    layoutId="activeNavUnderline"
                    className="absolute bottom-0 left-0 h-0.5 w-full bg-blue-500"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </Link>
            )
          })}
        </nav>

        {/* Mobile Menu Button */}
        <div className="flex items-center space-x-4 md:hidden">
          <Button variant="ghost" size="icon" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? (
              <X className="h-5 w-5 text-white" />
            ) : (
              <Menu className="h-5 w-5 text-white" />
            )}
            <span className="sr-only">Toggle menu</span>
          </Button>
        </div>

        {/* Desktop Actions */}
        <div className="hidden items-center space-x-4 md:flex">
          <Button variant="ghost" size="icon" className="text-gray-300 hover:bg-blue-500/10 hover:text-white">
            <ShoppingCart className="h-5 w-5" />
            <span className="sr-only">Panier</span>
          </Button>
          <Button className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700">
            Se connecter
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="overflow-hidden border-t border-white/10 bg-black/95 md:hidden"
        >
          <div className="space-y-1 px-4 py-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`block rounded-md px-3 py-2 text-base font-medium ${
                  pathname === item.href
                    ? 'bg-blue-500/10 text-white'
                    : 'text-gray-300 hover:bg-white/5 hover:text-white'
                }`}
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <div className="border-t border-white/10 pt-2">
              <Button className="w-full justify-start bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700">
                Se connecter
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </header>
  )
}
