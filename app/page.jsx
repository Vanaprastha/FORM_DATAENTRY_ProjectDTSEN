"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@/context/auth-context"
import Sidebar from "@/components/sidebar"
import Header from "@/components/header"
import FilterTabs from "@/components/filter-tabs"
import DataTable from "@/components/data-table"
import BantuanPage from "@/components/bantuan-page"
import LoginPage from "@/components/login-page"
import { PanelLeft, Menu, X } from "lucide-react"

export default function DashboardPage() {
  const { user, isLoading } = useAuth()
  const [activeTab, setActiveTab] = useState("all")
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [activeMenu, setActiveMenu] = useState("survey")
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  // Detect mobile screen
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
      if (window.innerWidth < 768) {
        setSidebarCollapsed(true)
      }
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Show loading spinner while checking auth
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-[#1e88e5]/30 border-t-[#1e88e5] rounded-full animate-spin" />
          <p className="text-gray-600">Memuat...</p>
        </div>
      </div>
    )
  }

  // Show login page if not authenticated
  if (!user) {
    return <LoginPage />
  }

  // Show dashboard if authenticated
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Mobile Overlay */}
      {mobileMenuOpen && isMobile && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar - hidden on mobile unless menu is open */}
      <div className={`
        ${isMobile ? 'fixed inset-y-0 left-0 z-50 transform transition-transform duration-300' : ''}
        ${isMobile && !mobileMenuOpen ? '-translate-x-full' : 'translate-x-0'}
      `}>
        <Sidebar
          isCollapsed={isMobile ? false : sidebarCollapsed}
          onToggle={() => isMobile ? setMobileMenuOpen(false) : setSidebarCollapsed(!sidebarCollapsed)}
          activeMenu={activeMenu}
          onMenuChange={(menu) => {
            setActiveMenu(menu)
            if (isMobile) setMobileMenuOpen(false)
          }}
        />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden w-full">
        {/* Header with mobile menu button */}
        <div className="md:hidden bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between">
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            <Menu className="w-6 h-6 text-gray-600" />
          </button>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[#1e88e5] rounded flex items-center justify-center">
              <span className="text-white font-bold">F</span>
            </div>
            <span className="font-bold text-[#1e88e5]">FASIH</span>
          </div>
          <div className="w-10" /> {/* Spacer for centering */}
        </div>

        {/* Desktop Header */}
        <div className="hidden md:block">
          <Header />
        </div>

        {/* Content Area */}
        <main className="flex-1 overflow-auto">
          {activeMenu === "survey" ? (
            <>
              {/* Assignment Header */}
              <div className="bg-white border-b border-gray-200 px-4 md:px-6 py-3 md:py-4 flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                <div className="flex items-center gap-2">
                  {sidebarCollapsed && !isMobile && (
                    <button
                      onClick={() => setSidebarCollapsed(false)}
                      className="p-1 hover:bg-gray-100 rounded transition-colors"
                      title="Expand sidebar"
                    >
                      <PanelLeft className="w-5 h-5 text-gray-400 hover:text-gray-600" />
                    </button>
                  )}
                </div>
                <div className="text-left md:text-right">
                  <span className="text-xs md:text-sm text-gray-600">Assignment </span>
                  <span className="font-semibold text-gray-800 text-sm md:text-base">PENDATAAN DTSEN KOTA SURABAYA</span>
                </div>
              </div>

              {/* Filter Tabs */}
              <FilterTabs activeTab={activeTab} onTabChange={setActiveTab} />

              {/* Data Table */}
              <DataTable activeTab={activeTab} />
            </>
          ) : (
            <BantuanPage />
          )}
        </main>
      </div>
    </div>
  )
}

