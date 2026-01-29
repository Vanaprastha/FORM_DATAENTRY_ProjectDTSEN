"use client"

import { useState } from "react"
import { useAuth } from "@/context/auth-context"
import { Moon, User, LogOut, ChevronDown } from "lucide-react"

export default function Header() {
  const { user, logout } = useAuth()
  const [showDropdown, setShowDropdown] = useState(false)

  return (
    <header className="h-14 bg-white border-b border-gray-200 flex items-center justify-end px-4 md:px-6">
      <div className="flex items-center gap-2 md:gap-4">
        <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
          <Moon className="w-5 h-5 text-gray-600" />
        </button>

        {/* User Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowDropdown(!showDropdown)}
            className="flex items-center gap-2 md:gap-3 p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <span className="text-xs md:text-sm font-medium text-gray-700 truncate max-w-[120px] md:max-w-[200px]">
              {user?.name || "User"}
            </span>
            <div className="w-8 h-8 md:w-9 md:h-9 bg-[#1e88e5] rounded-full flex items-center justify-center flex-shrink-0">
              <User className="w-4 h-4 md:w-5 md:h-5 text-white" />
            </div>
            <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${showDropdown ? 'rotate-180' : ''}`} />
          </button>

          {/* Dropdown Menu */}
          {showDropdown && (
            <>
              <div
                className="fixed inset-0 z-10"
                onClick={() => setShowDropdown(false)}
              />
              <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-20">
                <div className="px-4 py-2 border-b border-gray-100">
                  <p className="text-sm font-medium text-gray-800">{user?.name}</p>
                  <p className="text-xs text-gray-500">{user?.email}</p>
                  <span className="inline-block mt-1 px-2 py-0.5 bg-blue-100 text-blue-700 text-xs rounded-full">
                    {user?.role}
                  </span>
                </div>
                <button
                  onClick={() => {
                    logout()
                    setShowDropdown(false)
                  }}
                  className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center gap-2 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  Keluar
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  )
}

