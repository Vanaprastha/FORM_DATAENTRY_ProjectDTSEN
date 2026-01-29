"use client"

import { useState, useMemo } from "react"
import { Eye, Edit, Trash2, MoreVertical, Upload, RefreshCw, ChevronDown, Search, ArrowUp } from "lucide-react"
import DetailModal from "./detail-modal"
import SurveyForm from "./survey-form"

const sampleData = [
  {
    id: 1,
    kodeIdentitas: "357826110050008004-40",
    namaKKPrelist: "INDRA MULIANA",
    namaKKBaru: "",
    alamat: "SUTOREJO SELATAN NO. 35 SBY",
    keberadaanKeluarga: "8 - Tidak dapat ditemui sampai akhir pendataan",
    statusAlur: "SUBMITTED BY Pencacah",
    userSaatIni: "Pengawas (yohanesfranklin@gmail.com)",
    mode: "CAPI",
    keterangan: "-",
  },
  {
    id: 2,
    kodeIdentitas: "357814110020096002-12",
    namaKKPrelist: "SUKMAWATI",
    namaKKBaru: "",
    alamat: "GEDANGASIN 2/82",
    keberadaanKeluarga: "1 - Ditemukan",
    statusAlur: "APPROVED BY Pengawas",
    userSaatIni: "Pengawas (dwiyaniprastani70@gmail.com)",
    mode: "CAPI",
    keterangan: "-",
  },
  {
    id: 3,
    kodeIdentitas: "357804110060111003-42",
    namaKKPrelist: "SUGENG PANCA SIPUTRA",
    namaKKBaru: "",
    alamat: "PERWIRA 4",
    keberadaanKeluarga: "1 - Ditemukan",
    statusAlur: "APPROVED BY Pengawas",
    userSaatIni: "Pengawas (mayasari9506@gmail.com)",
    mode: "CAPI",
    keterangan: "-",
  },
  {
    id: 4,
    kodeIdentitas: "357813110030010001-131",
    namaKKPrelist: "HOLIL",
    namaKKBaru: "",
    alamat: "GUNDIH REL 1/25",
    keberadaanKeluarga: "1 - Ditemukan",
    statusAlur: "SUBMITTED BY Pencacah",
    userSaatIni: "Pengawas (ayaherlambang@gmail.com)",
    mode: "CAPI",
    keterangan: "-",
  },
  {
    id: 5,
    kodeIdentitas: "357813110050010100-71",
    namaKKPrelist: "ARIF NOVIANTO",
    namaKKBaru: "",
    alamat: "TEMBOK DUKUH 8/10 A",
    keberadaanKeluarga: "2 - Pindah/Tidak Ditemukan",
    statusAlur: "APPROVED BY Pengawas",
    userSaatIni: "Pengawas (nurlailakusry@gmail.com)",
    mode: "CAPI",
    keterangan: "-",
  },
  {
    id: 6,
    kodeIdentitas: "357826110020010003-79",
    namaKKPrelist: "TEGUH WIDODO",
    namaKKBaru: "",
    alamat: "MANYAR SABRANGAN 3/31 SBY",
    keberadaanKeluarga: "2 - Pindah/Tidak Ditemukan",
    statusAlur: "APPROVED BY Pengawas",
    userSaatIni: "Pengawas (elzarsalean447@gmail.com)",
    mode: "CAPI",
    keterangan: "-",
  },
  {
    id: 7,
    kodeIdentitas: "357806110060040013-29",
    namaKKPrelist: "IRA SETIAWATI",
    namaKKBaru: "",
    alamat: "PAKIS GUNUNG 1C/7-B",
    keberadaanKeluarga: "2 - Pindah/Tidak Ditemukan",
    statusAlur: "SUBMITTED BY Pencacah",
    userSaatIni: "Pengawas (sugihdu1@yahoo.com)",
    mode: "CAPI",
    keterangan: "-",
  },
  {
    id: 8,
    kodeIdentitas: "357813110030010001-170",
    namaKKPrelist: "KASIYA WIDODO",
    namaKKBaru: "",
    alamat: "GUNDIH 2/5 C",
    keberadaanKeluarga: "1 - Ditemukan",
    statusAlur: "APPROVED BY Pengawas",
    userSaatIni: "Pengawas (ayaherlambang@gmail.com)",
    mode: "CAPI",
    keterangan: "-",
  },
  {
    id: 9,
    kodeIdentitas: "357826110050008004-55",
    namaKKPrelist: "HERMANSYAH DWIRAHARJO",
    namaKKBaru: "",
    alamat: "SUTOREJO SELATAN 3/9 SBY",
    keberadaanKeluarga: "8 - Tidak dapat ditemui sampai akhir pendataan",
    statusAlur: "APPROVED BY Pengawas",
    userSaatIni: "Pengawas (yohanesfranklin@gmail.com)",
    mode: "CAPI",
    keterangan: "-",
  },
  {
    id: 10,
    kodeIdentitas: "357826110050008004",
    namaKKPrelist: "BILLY",
    namaKKBaru: "",
    alamat: "SUTOREJO",
    keberadaanKeluarga: "8 - Tidak dapat ditemui sampai akhir",
    statusAlur: "SUBMITTED BY Pencacah",
    userSaatIni: "Pengawas",
    mode: "CAPI",
    keterangan: "-",
  },
  // Data REJECTED BY Pengawas
  {
    id: 11,
    kodeIdentitas: "357826110050008004-61",
    namaKKPrelist: "AHMAD SUBHAN",
    namaKKBaru: "",
    alamat: "WONOKROMO 5/12",
    keberadaanKeluarga: "1 - Ditemukan",
    statusAlur: "REJECTED BY Pengawas",
    userSaatIni: "Pencacah (ahmad.subhan@gmail.com)",
    mode: "CAPI",
    keterangan: "Data tidak lengkap",
  },
  {
    id: 12,
    kodeIdentitas: "357826110050008004-62",
    namaKKPrelist: "SITI RAHAYU",
    namaKKBaru: "",
    alamat: "RUNGKUT ASRI 3/8",
    keberadaanKeluarga: "1 - Ditemukan",
    statusAlur: "REJECTED BY Pengawas",
    userSaatIni: "Pencacah (siti.rahayu@gmail.com)",
    mode: "CAPI",
    keterangan: "Foto tidak jelas",
  },
  {
    id: 13,
    kodeIdentitas: "357826110050008004-63",
    namaKKPrelist: "BUDI SANTOSO",
    namaKKBaru: "",
    alamat: "MULYOREJO 2/15",
    keberadaanKeluarga: "2 - Pindah/Tidak Ditemukan",
    statusAlur: "REJECTED BY Pengawas",
    userSaatIni: "Pencacah (budi.santoso@gmail.com)",
    mode: "CAPI",
    keterangan: "Alamat tidak sesuai",
  },
  // Data OPEN
  {
    id: 14,
    kodeIdentitas: "357826110050008004-71",
    namaKKPrelist: "DEWI LESTARI",
    namaKKBaru: "",
    alamat: "SUKOLILO 4/20",
    keberadaanKeluarga: "",
    statusAlur: "OPEN",
    userSaatIni: "Pencacah (dewi.lestari@gmail.com)",
    mode: "CAPI",
    keterangan: "Belum dikunjungi",
  },
  {
    id: 15,
    kodeIdentitas: "357826110050008004-72",
    namaKKPrelist: "AGUS WIJAYA",
    namaKKBaru: "",
    alamat: "KENJERAN 6/10",
    keberadaanKeluarga: "",
    statusAlur: "OPEN",
    userSaatIni: "Pencacah (agus.wijaya@gmail.com)",
    mode: "CAPI",
    keterangan: "Menunggu jadwal",
  },
  {
    id: 16,
    kodeIdentitas: "357826110050008004-73",
    namaKKPrelist: "RINA SUSANTI",
    namaKKBaru: "",
    alamat: "TAMBAKSARI 1/5",
    keberadaanKeluarga: "",
    statusAlur: "OPEN",
    userSaatIni: "Pencacah (rina.susanti@gmail.com)",
    mode: "CAPI",
    keterangan: "Baru assign",
  },
  // Data REVOKED BY Pengawas
  {
    id: 17,
    kodeIdentitas: "357826110050008004-81",
    namaKKPrelist: "HENDRA GUNAWAN",
    namaKKBaru: "",
    alamat: "TANDES 3/7",
    keberadaanKeluarga: "1 - Ditemukan",
    statusAlur: "REVOKED BY Pengawas",
    userSaatIni: "Pencacah (hendra.gunawan@gmail.com)",
    mode: "CAPI",
    keterangan: "Perlu verifikasi ulang",
  },
  {
    id: 18,
    kodeIdentitas: "357826110050008004-82",
    namaKKPrelist: "YUNI ASTUTI",
    namaKKBaru: "",
    alamat: "SAWAHAN 2/9",
    keberadaanKeluarga: "1 - Ditemukan",
    statusAlur: "REVOKED BY Pengawas",
    userSaatIni: "Pencacah (yuni.astuti@gmail.com)",
    mode: "CAPI",
    keterangan: "Data duplikat",
  },
]

export default function DataTable({ activeTab = "all" }) {
  const [entriesPerPage, setEntriesPerPage] = useState(10)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedRows, setSelectedRows] = useState([])
  const [selectAll, setSelectAll] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedData, setSelectedData] = useState(null)
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [formData, setFormData] = useState(null)

  // Filter data berdasarkan tab status dan pencarian
  const filteredData = useMemo(() => {
    let data = sampleData

    // Filter berdasarkan tab yang dipilih
    if (activeTab !== "all") {
      data = data.filter((item) => {
        const status = item.statusAlur.toLowerCase()
        switch (activeTab) {
          case "approved":
            return status.includes("approved")
          case "submitted":
            return status.includes("submitted")
          case "rejected":
            return status.includes("rejected")
          case "open":
            return status.includes("open") || (!status.includes("approved") && !status.includes("submitted") && !status.includes("rejected") && !status.includes("revoked"))
          case "revoked":
            return status.includes("revoked")
          default:
            return true
        }
      })
    }

    // Filter berdasarkan pencarian nama dan kode identitas
    if (searchTerm.trim()) {
      const searchLower = searchTerm.toLowerCase().trim()
      data = data.filter((item) => {
        const matchKode = item.kodeIdentitas.toLowerCase().includes(searchLower)
        const matchNama = item.namaKKPrelist.toLowerCase().includes(searchLower)
        const matchNamaBaru = item.namaKKBaru?.toLowerCase().includes(searchLower)
        return matchKode || matchNama || matchNamaBaru
      })
    }

    return data
  }, [searchTerm, activeTab])

  const handleOpenDetail = (row) => {
    setSelectedData(row)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedData(null)
  }

  const handleOpenForm = (row) => {
    setFormData(row)
    setIsFormOpen(true)
  }

  const handleCloseForm = () => {
    setIsFormOpen(false)
    setFormData(null)
  }

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedRows([])
    } else {
      setSelectedRows(filteredData.map((item) => item.id))
    }
    setSelectAll(!selectAll)
  }

  const handleSelectRow = (id) => {
    if (selectedRows.includes(id)) {
      setSelectedRows(selectedRows.filter((rowId) => rowId !== id))
    } else {
      setSelectedRows([...selectedRows, id])
    }
  }

  const getStatusColor = (status) => {
    if (status.includes("SUBMITTED")) return "text-amber-600"
    if (status.includes("APPROVED")) return "text-green-600"
    if (status.includes("REJECTED")) return "text-red-600"
    return "text-gray-600"
  }

  return (
    <div className="bg-white">
      {/* Detail Modal */}
      <DetailModal isOpen={isModalOpen} onClose={handleCloseModal} data={selectedData} />

      {/* Survey Form */}
      <SurveyForm isOpen={isFormOpen} onClose={handleCloseForm} data={formData} />

      {/* Table Controls */}
      <div className="p-3 md:p-4 flex flex-col md:flex-row md:flex-wrap md:items-center md:justify-between gap-3 md:gap-4 border-b border-gray-200">
        <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-6">
          {/* Show entries */}
          <div className="flex items-center gap-2">
            <span className="text-xs md:text-sm text-gray-600">Show</span>
            <select
              value={entriesPerPage}
              onChange={(e) => setEntriesPerPage(Number(e.target.value))}
              className="border border-gray-300 rounded px-2 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#1e88e5] bg-white"
            >
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
            </select>
            <span className="text-xs md:text-sm text-gray-600">entries</span>
          </div>

          {/* Search - tepat di sebelah Show */}
          <div className="flex items-center gap-2 w-full md:w-auto">
            <span className="text-xs md:text-sm text-gray-600 hidden md:inline">Search:</span>
            <div className="relative flex-1 md:flex-none">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Cari nama atau kode..."
                className="border border-gray-300 rounded px-3 py-1.5 text-sm w-full md:w-64 focus:outline-none focus:ring-2 focus:ring-[#1e88e5] pr-8"
              />
              <Search className="w-4 h-4 text-gray-400 absolute right-2.5 top-1/2 -translate-y-1/2" />
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 px-2 md:px-3 py-2 bg-[#1e88e5] text-white rounded hover:bg-[#1976d2] transition-colors">
            <ArrowUp className="w-4 h-4" />
          </button>
          <button className="flex items-center gap-1 md:gap-2 px-2 md:px-4 py-2 border border-gray-300 rounded hover:bg-gray-50 transition-colors">
            <Upload className="w-4 h-4" />
            <span className="text-xs md:text-sm hidden md:inline">Assign</span>
            <ChevronDown className="w-4 h-4" />
          </button>
          <button className="p-2 border border-gray-300 rounded hover:bg-gray-50 transition-colors">
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Search Results Info */}
      {searchTerm && (
        <div className="px-4 py-2 bg-blue-50 border-b border-blue-100">
          <p className="text-sm text-blue-700">
            Menampilkan <strong>{filteredData.length}</strong> hasil untuk pencarian "<strong>{searchTerm}</strong>"
          </p>
        </div>
      )}

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-[#37474f] text-white">
              <th className="px-3 py-3 text-left w-10">
                <input
                  type="checkbox"
                  checked={selectAll}
                  onChange={handleSelectAll}
                  className="w-4 h-4 rounded"
                />
              </th>
              <th className="px-3 py-3 text-left font-medium whitespace-nowrap">Kode Identitas</th>
              <th className="px-3 py-3 text-left font-medium whitespace-nowrap">Nama KK Prelist</th>
              <th className="px-3 py-3 text-left font-medium whitespace-nowrap">Nama KK Baru</th>
              <th className="px-3 py-3 text-left font-medium whitespace-nowrap">Alamat</th>
              <th className="px-3 py-3 text-left font-medium whitespace-nowrap">Keberadaan Keluarga</th>
              <th className="px-3 py-3 text-left font-medium whitespace-nowrap">Status Alur</th>
              <th className="px-3 py-3 text-left font-medium whitespace-nowrap">User Saat Ini</th>
              <th className="px-3 py-3 text-left font-medium whitespace-nowrap">Mode</th>
              <th className="px-3 py-3 text-left font-medium whitespace-nowrap">Keterangan</th>
              <th className="px-3 py-3 text-center font-medium whitespace-nowrap">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.length === 0 ? (
              <tr>
                <td colSpan={11} className="px-3 py-8 text-center text-gray-500">
                  <div className="flex flex-col items-center gap-2">
                    <Search className="w-8 h-8 text-gray-300" />
                    <p>Tidak ada data yang ditemukan untuk "{searchTerm}"</p>
                  </div>
                </td>
              </tr>
            ) : (
              filteredData.slice(0, entriesPerPage).map((row, index) => (
                <tr
                  key={row.id}
                  className={`border-b border-gray-200 hover:bg-blue-50 transition-colors ${index % 2 === 0 ? "bg-white" : "bg-gray-50"
                    }`}
                >
                  <td className="px-3 py-3">
                    <input
                      type="checkbox"
                      checked={selectedRows.includes(row.id)}
                      onChange={() => handleSelectRow(row.id)}
                      className="w-4 h-4 rounded"
                    />
                  </td>
                  <td className="px-3 py-3">
                    <button
                      onClick={() => handleOpenDetail(row)}
                      className="text-[#1e88e5] hover:underline text-left font-medium"
                    >
                      {row.kodeIdentitas}
                    </button>
                  </td>
                  <td className="px-3 py-3 text-gray-700 font-medium">{row.namaKKPrelist}</td>
                  <td className="px-3 py-3 text-gray-500">{row.namaKKBaru || "-"}</td>
                  <td className="px-3 py-3 text-gray-700 max-w-[150px] truncate" title={row.alamat}>{row.alamat}</td>
                  <td className="px-3 py-3 text-gray-700 max-w-[180px] truncate" title={row.keberadaanKeluarga}>{row.keberadaanKeluarga}</td>
                  <td className={`px-3 py-3 font-medium whitespace-nowrap ${getStatusColor(row.statusAlur)}`}>
                    {row.statusAlur}
                  </td>
                  <td className="px-3 py-3 text-gray-700 max-w-[180px] truncate" title={row.userSaatIni}>{row.userSaatIni}</td>
                  <td className="px-3 py-3 text-gray-700 text-center">{row.mode}</td>
                  <td className="px-3 py-3 text-gray-500 text-center">{row.keterangan}</td>
                  <td className="px-3 py-3">
                    <div className="flex items-center justify-center gap-1">
                      <button
                        onClick={() => handleOpenDetail(row)}
                        className="p-1.5 text-[#1e88e5] hover:bg-blue-100 rounded transition-colors"
                        title="Lihat Detail"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleOpenForm(row)}
                        className="p-1.5 text-green-600 hover:bg-green-100 rounded transition-colors"
                        title="Edit Data"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        className="p-1.5 text-red-500 hover:bg-red-100 rounded transition-colors"
                        title="Hapus Data"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Table Footer */}
      <div className="px-4 py-3 border-t border-gray-200 flex items-center justify-between text-sm text-gray-600">
        <div>
          Showing {Math.min(entriesPerPage, filteredData.length)} of {filteredData.length} entries
          {searchTerm && ` (filtered from ${sampleData.length} total entries)`}
        </div>
        <div className="flex items-center gap-2">
          <button className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50" disabled>
            Previous
          </button>
          <button className="px-3 py-1 bg-[#1e88e5] text-white rounded">1</button>
          <button className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50">
            Next
          </button>
        </div>
      </div>
    </div>
  )
}

