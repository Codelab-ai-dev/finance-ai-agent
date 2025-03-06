"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { BarChart3, MessageSquare, PieChart, Settings, CreditCard, DollarSign, Menu, X, Wallet } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface DashboardLayoutProps {
  children: React.ReactNode
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  return (
    <div className="flex min-h-screen bg-background">
      {/* Mobile sidebar toggle */}
      <Button
        variant="ghost"
        size="icon"
        className="fixed top-4 left-4 z-50 md:hidden"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        {isSidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </Button>

      {/* Sidebar */}
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-40 w-64 bg-card border-r transform transition-transform duration-200 ease-in-out md:translate-x-0",
          isSidebarOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex flex-col h-full">
          <div className="p-4 border-b">
            <h1 className="text-2xl font-bold text-primary">FinanzAI</h1>
            <p className="text-sm text-muted-foreground">Tu agente financiero personal</p>
          </div>
          <nav className="flex-1 p-4 space-y-1">
            <NavItem href="/" icon={<BarChart3 className="mr-2 h-5 w-5" />} active>
              Dashboard
            </NavItem>
            <NavItem href="/chat" icon={<MessageSquare className="mr-2 h-5 w-5" />}>
              Asistente IA
            </NavItem>
            <NavItem href="/analysis" icon={<PieChart className="mr-2 h-5 w-5" />}>
              Análisis
            </NavItem>
            <NavItem href="/transactions" icon={<CreditCard className="mr-2 h-5 w-5" />}>
              Transacciones
            </NavItem>
            <NavItem href="/budget" icon={<Wallet className="mr-2 h-5 w-5" />}>
              Presupuesto
            </NavItem>
            <NavItem href="/income" icon={<DollarSign className="mr-2 h-5 w-5" />}>
              Ingresos
            </NavItem>
            <NavItem href="/settings" icon={<Settings className="mr-2 h-5 w-5" />}>
              Configuración
            </NavItem>
          </nav>
        </div>
      </div>

      {/* Main content */}
      <div
        className={cn("flex-1 transition-all duration-200 ease-in-out", isSidebarOpen ? "md:ml-64" : "ml-0 md:ml-64")}
      >
        <main className="p-4 md:p-8">{children}</main>
      </div>
    </div>
  )
}

interface NavItemProps {
  href: string
  icon: React.ReactNode
  children: React.ReactNode
  active?: boolean
}

function NavItem({ href, icon, children, active }: NavItemProps) {
  return (
    <Link
      href={href}
      className={cn(
        "flex items-center px-3 py-2 text-sm rounded-md hover:bg-accent hover:text-accent-foreground transition-colors",
        active ? "bg-primary text-primary-foreground hover:bg-primary/90" : "text-foreground",
      )}
    >
      {icon}
      {children}
    </Link>
  )
}

