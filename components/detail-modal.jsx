"use client"

import { useState } from "react"
import { X, CheckSquare, RotateCcw, ChevronLeft, ChevronRight } from "lucide-react"

const historyData = [
  {
    no: 1,
    status: "SUBMITTED BY Pencacah",
    tanggal: "03/12/2025 @ 16:30:03 GMT+7",
  },
  {
    no: 2,
    status: "APPROVED BY Pengawas",
    tanggal: "04/12/2025 @ 09:16:04 GMT+7",
  },
  {
    no: 3,
    status: "REVOKED BY Pengawas",
    tanggal: "27/12/2025 @ 19:53:28 GMT+7",
  },
  {
    no: 4,
    status: "REJECTED BY Pengawas",
    tanggal: "27/12/2025 @ 19:53:39 GMT+7",
  },
  {
    no: 5,
    status: "SUBMITTED BY Pencacah",
    tanggal: "20/01/2026 @ 23:59:13 GMT+7",
  },
  {
    no: 6,
    status: "APPROVED BY Pengawas",
    tanggal: "20/01/2026 @ 23:59:55 GMT+7",
  },
]

export default function DetailModal({ isOpen, onClose, data }) {
  const [entriesPerPage, setEntriesPerPage] = useState(10)
  const [searchTerm, setSearchTerm] = useState("")

  if (!isOpen || !data) return null

  const getStatusColor = (status) => {
    if (status.includes("SUBMITTED")) return "text-amber-600"
    if (status.includes("APPROVED")) return "text-green-600"
    if (status.includes("REJECTED")) return "text-red-600"
    if (status.includes("REVOKED")) return "text-orange-600"
    return "text-gray-600"
  }

  const assignmentInfo = {
    surveyPeriode: "30266576-b52d-403b-a4ad-8a003f6dc588",
    codeIdentity: data.kodeIdentitas,
    namakk: data.namaKKPrelist,
    namakk_new: data.namaKKBaru || "",
    alamat: data.alamat,
    berada_kk: data.keberadaanKeluarga,
    statusAssignment: data.statusAlur,
    statusPencacahan: "4",
    jenisSample: "Utama",
    strata: "PRIMARY",
    provinsi: "JAWA TIMUR",
    kotaKabupaten: "KOTA SURABAYA",
    kecamatan: "TANDES",
    desaKelurahan: "TANDES",
    blokSensus: "RW 009",
    tarikSample: "Belum tarik sample",
  }

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-start justify-center pt-10 overflow-y-auto">
      <div className="bg-white w-full max-w-6xl mx-4 my-8 rounded-lg shadow-xl">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <div></div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="flex flex-col lg:flex-row">
          {/* Left Panel - Assignment Info */}
          <div className="flex-1 p-6 border-r border-gray-200">
            {/* Struktur Approval Assignment */}
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-4">
                <CheckSquare className="w-5 h-5 text-gray-600" />
                <h3 className="font-semibold text-gray-800">Struktur Approval Assignment</h3>
              </div>
              <div className="space-y-2 ml-2">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-green-500"></span>
                  <span className="text-green-600 font-medium">DwiYani (Pengawas)</span>
                  <svg className="w-4 h-4 text-[#1e88e5]" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                  </svg>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-green-500"></span>
                  <span className="text-green-600 font-medium">MAnru (Pencacah)</span>
                  <svg className="w-4 h-4 text-[#1e88e5]" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Informasi Assignment */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-5 h-5 rounded-full border-2 border-gray-400 flex items-center justify-center">
                  <span className="text-gray-400 text-xs">i</span>
                </div>
                <h3 className="font-semibold text-gray-800">Informasi Assignment</h3>
              </div>
              <div className="space-y-3 text-sm">
                <div className="flex">
                  <span className="w-40 text-gray-600">Survey Periode</span>
                  <span className="text-gray-500">:</span>
                  <span className="ml-2 text-gray-800">{assignmentInfo.surveyPeriode}</span>
                </div>
                <div className="flex">
                  <span className="w-40 text-gray-600">Code Identity</span>
                  <span className="text-gray-500">:</span>
                  <span className="ml-2 text-gray-800">{assignmentInfo.codeIdentity}</span>
                </div>
                <div className="flex">
                  <span className="w-40 text-gray-600">namakk</span>
                  <span className="text-gray-500">:</span>
                  <span className="ml-2 text-gray-800">{assignmentInfo.namakk}</span>
                </div>
                <div className="flex">
                  <span className="w-40 text-gray-600">namakk_new</span>
                  <span className="text-gray-500">:</span>
                  <span className="ml-2 text-gray-800">{assignmentInfo.namakk_new || "-"}</span>
                </div>
                <div className="flex">
                  <span className="w-40 text-gray-600">alamat</span>
                  <span className="text-gray-500">:</span>
                  <span className="ml-2 text-gray-800">{assignmentInfo.alamat}</span>
                </div>
                <div className="flex">
                  <span className="w-40 text-gray-600">berada_kk</span>
                  <span className="text-gray-500">:</span>
                  <span className="ml-2 text-gray-800">{assignmentInfo.berada_kk}</span>
                </div>
                <div className="flex">
                  <span className="w-40 text-gray-600">Status Assignment</span>
                  <span className="text-gray-500">:</span>
                  <span className="ml-2 text-gray-800">{assignmentInfo.statusAssignment}</span>
                </div>
                <div className="flex">
                  <span className="w-40 text-gray-600">Status Pencacahan</span>
                  <span className="text-gray-500">:</span>
                  <span className="ml-2 text-gray-800">{assignmentInfo.statusPencacahan}</span>
                </div>
                <div className="flex">
                  <span className="w-40 text-gray-600">Jenis Sample</span>
                  <span className="text-gray-500">:</span>
                  <span className="ml-2 text-gray-800">{assignmentInfo.jenisSample}</span>
                </div>
                <div className="flex">
                  <span className="w-40 text-gray-600">Strata</span>
                  <span className="text-gray-500">:</span>
                  <span className="ml-2 text-gray-800">{assignmentInfo.strata}</span>
                </div>
                <div className="flex">
                  <span className="w-40 text-gray-600">Provinsi</span>
                  <span className="text-gray-500">:</span>
                  <span className="ml-2 text-gray-800">{assignmentInfo.provinsi}</span>
                </div>
                <div className="flex">
                  <span className="w-40 text-gray-600">Kota/Kabupaten</span>
                  <span className="text-gray-500">:</span>
                  <span className="ml-2 text-gray-800">{assignmentInfo.kotaKabupaten}</span>
                </div>
                <div className="flex">
                  <span className="w-40 text-gray-600">Kecamatan</span>
                  <span className="text-gray-500">:</span>
                  <span className="ml-2 text-gray-800">{assignmentInfo.kecamatan}</span>
                </div>
                <div className="flex">
                  <span className="w-40 text-gray-600">Desa/Kelurahan</span>
                  <span className="text-gray-500">:</span>
                  <span className="ml-2 text-gray-800">{assignmentInfo.desaKelurahan}</span>
                </div>
                <div className="flex">
                  <span className="w-40 text-gray-600">Blok Sensus</span>
                  <span className="text-gray-500">:</span>
                  <span className="ml-2 text-gray-800">{assignmentInfo.blokSensus}</span>
                </div>
                <div className="flex">
                  <span className="w-40 text-gray-600">Tarik Sample</span>
                  <span className="text-gray-500">:</span>
                  <span className="ml-2 text-gray-800">{assignmentInfo.tarikSample}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Panel - History */}
          <div className="w-full lg:w-[450px] p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <RotateCcw className="w-5 h-5 text-gray-600" />
              </div>
              <h3 className="font-semibold text-gray-800">Riwayat</h3>
            </div>

            {/* History Controls */}
            <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">Show</span>
                <select
                  value={entriesPerPage}
                  onChange={(e) => setEntriesPerPage(Number(e.target.value))}
                  className="border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-[#1e88e5]"
                >
                  <option value={10}>10</option>
                  <option value={25}>25</option>
                  <option value={50}>50</option>
                </select>
                <span className="text-sm text-gray-600">entries</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">Search:</span>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="border border-gray-300 rounded px-2 py-1 text-sm w-32 focus:outline-none focus:ring-2 focus:ring-[#1e88e5]"
                />
              </div>
            </div>

            {/* History Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-[#37474f] text-white">
                    <th className="px-3 py-2 text-left font-medium">No.</th>
                    <th className="px-3 py-2 text-left font-medium">Status</th>
                    <th className="px-3 py-2 text-left font-medium">Tanggal</th>
                  </tr>
                </thead>
                <tbody>
                  {historyData.map((item, index) => (
                    <tr
                      key={item.no}
                      className={`border-b border-gray-200 ${
                        index % 2 === 0 ? "bg-white" : "bg-gray-50"
                      }`}
                    >
                      <td className="px-3 py-2 text-gray-700">{item.no}</td>
                      <td className={`px-3 py-2 font-medium ${getStatusColor(item.status)}`}>
                        {item.status}
                      </td>
                      <td className="px-3 py-2 text-[#1e88e5]">{item.tanggal}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination Info */}
            <div className="flex items-center justify-between mt-4 text-sm text-gray-600">
              <span>Showing 0 to 0 of 0 entries</span>
              <div className="flex items-center gap-2">
                <button className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50 transition-colors">
                  Previous
                </button>
                <button className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50 transition-colors">
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
