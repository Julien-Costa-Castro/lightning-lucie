"use client"

import React, { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { 
  LucideIcon, 
  Home, 
  BookOpen, 
  Info, 
  Mail, 
  ShoppingCart, 
  User, 
  LogIn, 
  LogOut,
  UserPlus,
  Menu,
  X
} from "lucide-react"
import { cn } from "@/lib/utils"
import { useAuth } from "@/contexts/AuthContext"
import { Button } from "./button"

interface NavItem {
  name: string
  url: string
  icon: LucideIcon
  onClick?: () => void
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
    
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  if (!mounted) return null

  return (
    <div className="fixed top-0 left-0 right-0 z-[9999] bg-gradient-to-b from-black/80 to-transparent pt-2 pb-1 px-2 sm:px-4 md:px-8">
      <div className="flex justify-center">
        <motion.div 
          className="flex items-center justify-between glass-effect border border-white/10 py-1 px-0.5 rounded-full shadow-xl chrome-effect w-full max-w-2xl mx-2 md:max-w-4xl"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 25,
          }}
        >
          <div className="flex items-center justify-between w-full px-1">
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
                  if (item.onClick) {
                    item.onClick()
                  } else {
                    window.location.href = item.url
                  }
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
                
                <div className="flex items-center justify-center flex-1 min-w-0">
                  <motion.div 
                    className="relative z-10 flex items-center justify-center p-1.5 sm:p-2 rounded-full w-full"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <div className="flex items-center justify-center gap-1.5 px-2 sm:px-3 w-full">
                      <Icon className="h-4 w-4 sm:h-3.5 sm:w-3.5 flex-shrink-0" />
                      <span className="hidden sm:inline text-sm truncate">
                        {item.name}
                      </span>
                    </div>
                  </motion.div>
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
          </div>
        </motion.div>
      </div>

    </div>
  )
}

// Import du composant AuthModal
import { AuthModal } from '../auth/AuthModal';

// Component to use in the app
export function MainNavBar() {
  const { user, logout } = useAuth()
  const [isClient, setIsClient] = useState(false)
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  const handleLogout = async () => {
    try {
      await logout()
    } catch (error) {
      console.error('Erreur lors de la déconnexion:', error)
    }
  }

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
    ...(user ? [
      {
        name: "Profil",
        url: "/profil",
        icon: User,
      },
      {
        name: "Déconnexion",
        url: "#",
        icon: LogOut,
        onClick: handleLogout
      }
    ] : [
      {
        name: "Connexion",
        url: "#",
        icon: LogIn,
        onClick: () => setIsAuthModalOpen(true)
      }
    ])
  ]

  if (!isClient) {
    return null
  }

  return (
    <>
      <AnimeNavBar items={navItems} defaultActive="Accueil" />
      <AuthModal open={isAuthModalOpen} onOpenChange={setIsAuthModalOpen} />
    </>
  )
}
