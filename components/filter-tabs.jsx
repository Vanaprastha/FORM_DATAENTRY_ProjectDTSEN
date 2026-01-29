"use client"

import { useMemo } from "react"

// Sample data - sama dengan yang ada di data-table.jsx
const sampleData = [
  { id: 1, statusAlur: "SUBMITTED BY Pencacah" },
  { id: 2, statusAlur: "APPROVED BY Pengawas" },
  { id: 3, statusAlur: "APPROVED BY Pengawas" },
  { id: 4, statusAlur: "SUBMITTED BY Pencacah" },
  { id: 5, statusAlur: "APPROVED BY Pengawas" },
  { id: 6, statusAlur: "APPROVED BY Pengawas" },
  { id: 7, statusAlur: "SUBMITTED BY Pencacah" },
  { id: 8, statusAlur: "APPROVED BY Pengawas" },
  { id: 9, statusAlur: "APPROVED BY Pengawas" },
  { id: 10, statusAlur: "SUBMITTED BY Pencacah" },
  { id: 11, statusAlur: "REJECTED BY Pengawas" },
  { id: 12, statusAlur: "REJECTED BY Pengawas" },
  { id: 13, statusAlur: "REJECTED BY Pengawas" },
  { id: 14, statusAlur: "OPEN" },
  { id: 15, statusAlur: "OPEN" },
  { id: 16, statusAlur: "OPEN" },
  { id: 17, statusAlur: "REVOKED BY Pengawas" },
  { id: 18, statusAlur: "REVOKED BY Pengawas" },
]

export default function FilterTabs({ activeTab, onTabChange }) {
  // Hitung jumlah data untuk setiap status
  const counts = useMemo(() => {
    const approved = sampleData.filter(item => item.statusAlur.toLowerCase().includes("approved")).length
    const submitted = sampleData.filter(item => item.statusAlur.toLowerCase().includes("submitted")).length
    const rejected = sampleData.filter(item => item.statusAlur.toLowerCase().includes("rejected")).length
    const open = sampleData.filter(item => item.statusAlur.toLowerCase() === "open").length
    const revoked = sampleData.filter(item => item.statusAlur.toLowerCase().includes("revoked")).length
    const all = sampleData.length

    return { all, approved, submitted, rejected, open, revoked }
  }, [])

  const tabs = [
    { id: "all", label: "All", shortLabel: "All", count: counts.all, color: "bg-gray-500" },
    { id: "approved", label: "APPROVED BY Pengawas", shortLabel: "APPROVED", count: counts.approved, color: "bg-[#1e88e5]" },
    { id: "submitted", label: "SUBMITTED BY Pencacah", shortLabel: "SUBMITTED", count: counts.submitted, color: "bg-[#1e88e5]" },
    { id: "rejected", label: "REJECTED BY Pengawas", shortLabel: "REJECTED", count: counts.rejected, color: "bg-[#1e88e5]" },
    { id: "open", label: "OPEN", shortLabel: "OPEN", count: counts.open, color: "bg-gray-600" },
    { id: "revoked", label: "REVOKED BY Pengawas", shortLabel: "REVOKED", count: counts.revoked, color: "bg-gray-800" },
  ]

  return (
    <div className="overflow-x-auto bg-gray-50 border-b border-gray-200">
      <div className="flex items-center gap-2 p-3 md:p-4 min-w-max">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`px-2 md:px-3 py-1.5 rounded text-xs md:text-sm font-medium transition-colors flex items-center gap-1 md:gap-2 whitespace-nowrap ${activeTab === tab.id
              ? "bg-[#1e88e5] text-white"
              : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-100"
              }`}
          >
            <span className="hidden md:inline">{tab.label}</span>
            <span className="md:hidden">{tab.shortLabel}</span>
            <span className={`px-1.5 md:px-2 py-0.5 rounded text-xs text-white ${activeTab === tab.id ? "bg-white/20" : tab.color
              }`}>
              {tab.count}
            </span>
          </button>
        ))}
      </div>
    </div>
  )
}
