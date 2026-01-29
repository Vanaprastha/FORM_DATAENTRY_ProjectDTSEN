"use client"

import { FileText, HelpCircle, PanelLeftClose, PanelLeft } from "lucide-react"

export default function Sidebar({ isCollapsed, onToggle, activeMenu, onMenuChange }) {
  return (
    <aside className={`bg-white border-r border-gray-200 flex flex-col h-screen transition-all duration-300 ${isCollapsed ? 'w-16' : 'w-60'}`}>
      {/* Logo */}
      <div className="p-4 border-b border-gray-200">
        <div className={`flex items-center ${isCollapsed ? 'justify-center' : 'gap-2'}`}>
          {!isCollapsed && (
            <>
              <div className="w-8 h-8 bg-[#1e88e5] rounded flex items-center justify-center flex-shrink-0">
                <span className="text-white font-bold text-lg">F</span>
              </div>
              <span className="font-bold text-xl text-[#1e88e5]">FASIH</span>
            </>
          )}
          <button
            onClick={onToggle}
            className={`p-1 hover:bg-gray-100 rounded transition-colors ${isCollapsed ? '' : 'ml-auto'}`}
            title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {isCollapsed ? (
              <PanelLeft className="w-5 h-5 text-gray-400 hover:text-gray-600" />
            ) : (
              <PanelLeftClose className="w-5 h-5 text-gray-400 hover:text-gray-600" />
            )}
          </button>
        </div>
      </div>

      {/* Menu Items */}
      <nav className="flex-1 p-2">
        <button
          onClick={() => onMenuChange("survey")}
          className={`w-full flex items-center ${isCollapsed ? 'justify-center' : 'gap-3'} px-3 py-2.5 rounded-lg text-left transition-colors ${activeMenu === "survey"
            ? "bg-[#e3f2fd] text-[#1e88e5]"
            : "text-gray-600 hover:bg-gray-100"
            }`}
          title="Survey Collection"
        >
          <FileText className="w-5 h-5 flex-shrink-0" />
          {!isCollapsed && <span className="font-medium">Survey Collection</span>}
        </button>

        <button
          onClick={() => onMenuChange("bantuan")}
          className={`w-full flex items-center ${isCollapsed ? 'justify-center' : 'gap-3'} px-3 py-2.5 rounded-lg text-left transition-colors ${activeMenu === "bantuan"
            ? "bg-[#e3f2fd] text-[#1e88e5]"
            : "text-gray-600 hover:bg-gray-100"
            }`}
          title="Bantuan"
        >
          <HelpCircle className="w-5 h-5 flex-shrink-0" />
          {!isCollapsed && <span className="font-medium">Bantuan</span>}
        </button>
      </nav>
    </aside>
  )
}

