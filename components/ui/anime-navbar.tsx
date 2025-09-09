"use client"

import React, { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { LucideIcon, Home, BookOpen, Info, Mail, ShoppingCart } from "lucide-react"
import { cn } from "@/lib/utils"

interface NavItem {
  name: string
  url: string
  icon: LucideIcon
}

interface NavBarProps {
  items: NavItem[]
  className?: string
  defaultActive?: string
}

export function AnimeNavBar({ items, className, defaultActive = "Accueil" }: NavBarProps) {
  const pathname = usePathname()
  const [mounted, setMounted] = useState(false)
  const [hoveredTab, setHoveredTab] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState<string>(defaultActive)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  if (!mounted) return null

  return (
    <div className="fixed top-5 left-0 right-0 z-[9999]">
      <div className="flex justify-center pt-6">
        <motion.div 
          className="flex items-center gap-1 glass-effect border border-white/10 py-1 px-1 rounded-full shadow-xl chrome-effect"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 25,
          }}
        >
          {items.map((item) => {
            const Icon = item.icon
            const isActive = activeTab === item.name || pathname === item.url
            const isHovered = hoveredTab === item.name

            return (
              <Link
                key={item.name}
                href={item.url}
                onClick={(e) => {
                  e.preventDefault()
                  setActiveTab(item.name)
                  window.location.href = item.url
                }}
                onMouseEnter={() => setHoveredTab(item.name)}
                onMouseLeave={() => setHoveredTab(null)}
                className={cn(
                  "relative cursor-pointer text-sm font-medium px-5 py-2.5 rounded-full transition-all duration-300 reflect-effect",
                  "text-white/80 hover:text-white",
                  isActive ? "text-white font-semibold" : ""
                )}
                style={{ fontFamily: 'Arial, sans-serif' }}
              >
                {isActive && (
                  <motion.div
                    className="absolute inset-0 rounded-full -z-10 overflow-hidden chrome-border"
                    initial={{ opacity: 0 }}
                    animate={{ 
                      opacity: [0.4, 0.6, 0.4],
                      scale: [1, 1.02, 1]
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    <div className="absolute inset-0 bg-white/10 rounded-full" />
                  </motion.div>
                )}
                
                <div className="flex items-center gap-2">
                  <Icon className="h-4 w-4" />
                  <motion.span
                    className="hidden md:inline relative z-10"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.2 }}
                  >
                    {item.name}
                  </motion.span>
                  <motion.span 
                    className="md:hidden relative z-10"
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Icon size={18} strokeWidth={2.5} />
                  </motion.span>
                </div>
                
                <AnimatePresence>
                  {isHovered && !isActive && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      className="absolute inset-0 bg-white/10 rounded-full -z-10"
                    />
                  )}
                </AnimatePresence>
              </Link>
            )
          })}
        </motion.div>
      </div>
    </div>
  )
}

// Component to use in the app
export function MainNavBar() {
  const navItems = [
    {
      name: "Accueil",
      url: "/",
      icon: Home,
    },
    {
      name: "Shop",
      url: "/boutique",
      icon: BookOpen,
    },
    {
      name: "Panier",
      url: "/panier",
      icon: ShoppingCart,
    },
  ]

  return <AnimeNavBar items={navItems} defaultActive="Accueil" />
}
