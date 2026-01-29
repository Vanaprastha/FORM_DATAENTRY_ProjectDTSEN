"use client"

import { useState } from "react"
import { X, Clock, MapPin, ChevronRight, ChevronDown, Settings, FileText, Edit } from "lucide-react"

const menuItems = [
  {
    id: "identitas-wilayah",
    label: "IDENTITAS WILAYAH",
    isSection: true,
  },
  {
    id: "identitas-keluarga",
    label: "I. IDENTITAS KELUARGA",
    isSection: false,
  },
  {
    id: "keterangan-pendataan",
    label: "KETERANGAN PENDATAAN ANGGOTA KELUARGA",
    isSection: false,
  },
  {
    id: "keterangan-sosial",
    label: "II. KETERANGAN SOSIAL EKONOMI ANGGOTA KELUARGA",
    isSection: false,
    children: [
      { id: "keterangan-individu", label: "KETERANGAN INDIVIDU" }
    ]
  },
  {
    id: "keterangan-perumahan",
    label: "III. KETERANGAN PERUMAHAN",
    isSection: false,
    children: [
      { id: "daya-listrik", label: "Daya yang terpasang di rumah ini" }
    ]
  },
  {
    id: "kepemilikan-aset",
    label: "IV. KEPEMILIKAN ASET",
    isSection: false,
  },
  {
    id: "dokumentasi",
    label: "V. DOKUMENTASI",
    isSection: false,
  },
  {
    id: "catatan",
    label: "CATATAN",
    isSection: false,
  },
]

const keberadaanOptions = [
  { value: "1", label: "1 - Ditemukan" },
  { value: "2", label: "2 - Pindah/Tidak Ditemukan" },
  { value: "3", label: "3 - Menolak Survei --> seluruh Keluarga menolak survei" },
  { value: "4", label: "4 - Meninggal --> seluruh anggota Keluarga meninggal" },
  { value: "5", label: "5 - Tidak Eligible" },
  { value: "6", label: "6 - Dalam Lembaga" },
  { value: "8", label: "8 - Tidak dapat ditemui sampai akhir pendataan" },
]

export default function SurveyForm({ isOpen, onClose, data }) {
  const [activeSection, setActiveSection] = useState("identitas-wilayah")
  const [expandedMenus, setExpandedMenus] = useState(["keterangan-sosial", "keterangan-perumahan"])
  const [isSummaryOpen, setIsSummaryOpen] = useState(false)

  // Summary data - logika menunggu dari user
  const summaryData = {
    totalAnswers: 146,
    error: 0,
    warning: 0,
    remark: 0,
    blank: 1,
  }
  const [formData, setFormData] = useState({
    // Identitas Wilayah
    waktuMulai: "2026-01-20T23:55:32",
    statusKeluarga: "PRELIST",
    provinsi: "[35] JAWA TIMUR",
    kabupatenKota: "[78] KOTA SURABAYA",
    kecamatan: "[14] TANDES",
    desaKelurahan: "[1002] TANDES",
    rwKotaSurabaya: "9",
    rtKotaSurabaya: "2",
    rtRw: "002/009",
    alamat: data?.alamat || "GEDANGASIN 2/82",
    namaKK: data?.namaKKPrelist || "SUKMAWATI",
    keberadaanKeluarga: "1",
    koordinat: "-7.25060724,112.66923979 (3.79000244826617188m)",
    // Identitas Keluarga
    noKK: "3578142212240002",
    namaKepalaKK: data?.namaKKPrelist || "SUKMAWATI",
    nikKepalaKK: "3578145601010003",
    provinsiFam: "JAWA TIMUR",
    kabupatenKotaFam: "KOTA SURABAYA",
    kecamatanFam: "TANDES",
    desaKelurahanFam: "TANDES",
    rtRwFam: "RW 009/RT 002",
    alamatFam: data?.alamat || "GEDANGASIN 2/82",
    alamatDomisili: "sesuai",
    // Keterangan Pendataan Anggota Keluarga
    namaInforman: data?.namaKKPrelist || "SUKMAWATI",
    tanggalPendataan: "2026-01-20",
    // Keterangan Individu
    selectedAnggota: null,
  })

  // Daftar Anggota Keluarga
  const [anggotaKeluarga, setAnggotaKeluarga] = useState([
    {
      id: 1,
      nama: "SUKMAWATI",
      nik: "3578145601010003",
      noKK: "3578142312240001",
      keberadaan: "1",
      alamatDomisili: "1",
      jenisKelamin: "2",
      tanggalLahir: "2001-01-15",
      tanggalLahirPrelist: "2001-01-15",
      // Birth details
      tanggalLahirDay: "15",
      tanggalLahirMonth: "januari",
      tanggalLahirYear: "2001",
      usahTanggalLahir: "ya",
      umur: "24:00:00",
      referensiUmur: "",
      statusPerkawinan: "1",
      statusHubungan: "1",
      // Education
      partisipasiSekolah: "3",
      ijazahPendidikan: "15 SMAK",
      kelasTerakkhir: "1",
      ijazahSTTB: "15 SMAK",
      // Employment
      bekerja: "ya",
      lapanganUsaha: "",
      statusPekerjaan: "Buruh/pekerja/pengrajin",
      pendapatan: "500000",
      ketampakanYangDimiliki: ["01"],
      // Skills training
      keahlianPelatihan: ["25"],
      // Program Padat Karya & Employment
      programPadatKarya: ["23"],
      jaminanKetenagakerjaan: "ya",
      memilikiUsaha: "ya",
      // Health
      memilikiDisabilitas: false,
      disabilitasTypes: [],
      keluhanKronis: "",
      sedangHamil: "tidak",
      jaminanKesehatanBPJS: "1",
    },
    {
      id: 2,
      nama: "SINGGIH SITIAJI",
      nik: "3578145601010004",
      noKK: "3578142312240001",
      keberadaan: "1",
      alamatDomisili: "1",
      jenisKelamin: "1",
      tanggalLahir: "1998-05-20",
      tanggalLahirPrelist: "1998-05-20",
      tanggalLahirDay: "20",
      tanggalLahirMonth: "mei",
      tanggalLahirYear: "1998",
      usahTanggalLahir: "ya",
      umur: "27:08:07",
      referensiUmur: "",
      statusPerkawinan: "2",
      statusHubungan: "2",
      partisipasiSekolah: "2",
      ijazahPendidikan: "SMA",
      kelasTerakkhir: "2",
      ijazahSTTB: "SMA",
      bekerja: "ya",
      lapanganUsaha: "",
      statusPekerjaan: "Karyawan Swasta",
      pendapatan: "1500000",
      ketampakanYangDimiliki: [],
      keahlianPelatihan: [],
      programPadatKarya: [],
      jaminanKetenagakerjaan: "tidak",
      memilikiUsaha: "tidak",
      memilikiDisabilitas: false,
      disabilitasTypes: [],
      keluhanKronis: "",
      sedangHamil: "tidak",
      jaminanKesehatanBPJS: "1",
    },
    {
      id: 3,
      nama: "SHAKA ARSYANENDRA",
      nik: "3578145601010005",
      noKK: "3578142312240001",
      keberadaan: "1",
      alamatDomisili: "1",
      jenisKelamin: "1",
      tanggalLahir: "2020-03-10",
      tanggalLahirPrelist: "2020-03-10",
      tanggalLahirDay: "10",
      tanggalLahirMonth: "maret",
      tanggalLahirYear: "2020",
      usahTanggalLahir: "ya",
      umur: "5:10:17",
      referensiUmur: "",
      statusPerkawinan: "1",
      statusHubungan: "3",
      partisipasiSekolah: "2",
      ijazahPendidikan: "TK",
      kelasTerakkhir: "1",
      ijazahSTTB: "TK",
      bekerja: "tidak",
      lapanganUsaha: "",
      statusPekerjaan: "",
      pendapatan: "0",
      ketampakanYangDimiliki: [],
      keahlianPelatihan: [],
      programPadatKarya: [],
      jaminanKetenagakerjaan: "tidak",
      memilikiUsaha: "tidak",
      memilikiDisabilitas: false,
      disabilitasTypes: [],
      keluhanKronis: "",
      sedangHamil: "tidak",
      jaminanKesehatanBPJS: "1",
    },
  ])

  const keberadaanAnggotaOptions = [
    { value: "1", label: "1. Tinggal bersama keluarga" },
    { value: "2", label: "2. Meninggal" },
    { value: "3", label: "3. Tidak tinggal bersama keluarga/pindah ke wilayah (daerah) lain di Indonesia" },
    { value: "4", label: "4. Tidak tinggal bersama keluarga/pindah ke luar negeri" },
    { value: "5", label: "5. Tidak ditemukan/Tidak dikenal" },
  ]

  const alamatDomisiliAnggotaOptions = [
    { value: "1", label: "1. Sesuai KK dan KTP" },
    { value: "2", label: "2. Sesuai KK (alamat pada KK dan KTP berbeda)" },
    { value: "3", label: "3. Sesuai KTP (alamat pada KK dan KTP berbeda)" },
    { value: "4", label: "4. Sesuai alamat domisili keluarga" },
    { value: "5", label: "5. Lainnya" },
  ]

  const handleViewAnggota = (anggota) => {
    setFormData(prev => ({ ...prev, selectedAnggota: anggota }))
    setActiveSection("keterangan-individu")
  }

  const handleUpdateAnggota = (id, field, value) => {
    setAnggotaKeluarga(prev => prev.map(a =>
      a.id === id ? { ...a, [field]: value } : a
    ))
  }

  const toggleMenu = (menuId) => {
    setExpandedMenus(prev =>
      prev.includes(menuId)
        ? prev.filter(id => id !== menuId)
        : [...prev, menuId]
    )
  }

  const handleGetTime = () => {
    const now = new Date()
    setFormData(prev => ({
      ...prev,
      waktuMulai: now.toISOString().slice(0, 19).replace('T', ' ')
    }))
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">
      <div className="bg-[#f5f5f5] w-full h-full overflow-hidden flex flex-col">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <X className="w-5 h-5 text-gray-600" />
            </button>
            <div>
              <h1 className="font-semibold text-gray-800">PDTSEN 2025 KOTA SURABAYA</h1>
              <p className="text-sm text-gray-500">PEMUTAKHIRAN DATA TUNGGAL SOSIAL DAN EKONOMI NASIONAL 2025</p>
            </div>
          </div>
          <button
            onClick={() => setIsSummaryOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-[#1e88e5] text-white rounded hover:bg-[#1976d2] transition-colors"
          >
            <FileText className="w-4 h-4" />
            <span>Summary</span>
          </button>
        </div>

        {/* Summary Modal */}
        {isSummaryOpen && (
          <div className="fixed inset-0 z-[60] bg-black/50 flex items-center justify-center">
            <div className="bg-white rounded-lg shadow-xl w-[400px] max-w-[90vw]">
              {/* Modal Header */}
              <div className="flex items-center justify-between p-4 border-b border-gray-200">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Summary</h3>
                  <p className="text-sm text-gray-500">{summaryData.totalAnswers} Answers</p>
                </div>
                <button
                  onClick={() => setIsSummaryOpen(false)}
                  className="p-1 hover:bg-gray-100 rounded transition-colors"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>

              {/* Modal Content */}
              <div className="p-4">
                <div className="grid grid-cols-2 gap-4">
                  {/* Error Card */}
                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 text-center">
                    <p className="text-2xl font-semibold text-gray-900">{summaryData.error}</p>
                    <p className="text-sm text-gray-500 mt-1">Error</p>
                  </div>

                  {/* Warning Card */}
                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 text-center">
                    <p className="text-2xl font-semibold text-gray-900">{summaryData.warning}</p>
                    <p className="text-sm text-gray-500 mt-1">Warning</p>
                  </div>

                  {/* Remark Card */}
                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 text-center">
                    <p className="text-2xl font-semibold text-gray-900">{summaryData.remark}</p>
                    <p className="text-sm text-gray-500 mt-1">Remark</p>
                  </div>

                  {/* Blank Card */}
                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 text-center">
                    <p className="text-2xl font-semibold text-gray-900">{summaryData.blank}</p>
                    <p className="text-sm text-gray-500 mt-1">Blank</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="flex flex-1 overflow-hidden">
          {/* Sidebar Menu */}
          <div className="w-72 bg-white border-r border-gray-200 overflow-y-auto">
            <div className="p-4">
              <h2 className="font-medium text-gray-700 mb-4">PDTSEN 2025 KOTA...</h2>
              <nav className="space-y-1">
                {menuItems.map((item) => (
                  <div key={item.id}>
                    <button
                      onClick={() => {
                        setActiveSection(item.id)
                        if (item.children) toggleMenu(item.id)
                      }}
                      className={`w-full text-left px-3 py-2.5 rounded text-sm flex items-center justify-between transition-colors ${activeSection === item.id
                        ? "bg-[#1e88e5] text-white"
                        : "text-gray-700 hover:bg-gray-100"
                        }`}
                    >
                      <span className={item.id === "keterangan-perumahan" && activeSection !== item.id ? "text-[#1e88e5]" : ""}>
                        {item.label}
                      </span>
                      {item.children && (
                        <ChevronDown
                          className={`w-4 h-4 transition-transform ${expandedMenus.includes(item.id) ? "rotate-180" : ""
                            }`}
                        />
                      )}
                    </button>
                    {item.children && expandedMenus.includes(item.id) && (
                      <div className="ml-4 mt-1 space-y-1">
                        {item.children.map((child) => (
                          <div key={child.id}>
                            <button
                              onClick={() => setActiveSection(child.id)}
                              className={`w-full text-left px-3 py-2 rounded text-sm flex items-center gap-2 ${activeSection === child.id
                                ? "text-[#1e88e5] bg-blue-50"
                                : "text-[#1e88e5] hover:bg-gray-50"
                                }`}
                            >
                              <ChevronRight className="w-3 h-3" />
                              {child.label}
                            </button>
                            {/* Show family members under KETERANGAN INDIVIDU */}
                            {child.id === "keterangan-individu" && (
                              <div className="ml-4 mt-1 space-y-1">
                                {anggotaKeluarga.map((anggota) => (
                                  <button
                                    key={anggota.id}
                                    onClick={() => handleViewAnggota(anggota)}
                                    className={`w-full text-left px-3 py-2 rounded text-sm ${activeSection === "keterangan-individu" && formData.selectedAnggota?.id === anggota.id
                                      ? "bg-[#1e88e5] text-white"
                                      : "text-gray-600 hover:bg-gray-50"
                                      }`}
                                  >
                                    {anggota.nama}
                                  </button>
                                ))}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 overflow-y-auto p-6">
            {/* Title Banner */}
            <div className="bg-[#546e7a] text-white text-center py-4 rounded-t-lg mb-0">
              <h2 className="font-medium">PEMUTAKHIRAN DATA TUNGGAL SOSIAL DAN EKONOMI NASIONAL 2025</h2>
            </div>

            {/* Form Content - Identitas Wilayah */}
            {activeSection === "identitas-wilayah" && (
              <div className="bg-white rounded-b-lg shadow p-6 space-y-6">
                {/* Waktu Mulai Pendataan */}
                <div className="grid grid-cols-3 gap-4 items-start">
                  <label className="text-sm text-gray-700 pt-2">
                    Waktu Mulai Pendataan <span className="text-red-500">*</span>
                  </label>
                  <div className="col-span-2 space-y-2">
                    <input
                      type="text"
                      value={formData.waktuMulai}
                      readOnly
                      className="w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded text-sm text-gray-600"
                    />
                    <button
                      onClick={handleGetTime}
                      className="flex items-center gap-2 px-4 py-2 bg-[#ffc107] text-gray-800 rounded text-sm hover:bg-[#ffb300] transition-colors"
                    >
                      <Clock className="w-4 h-4" />
                      Get Time
                    </button>
                  </div>
                </div>

                {/* Status Keluarga */}
                <div className="grid grid-cols-3 gap-4 items-center">
                  <label className="text-sm text-gray-700">Status Keluarga</label>
                  <div className="col-span-2">
                    <input
                      type="text"
                      value={formData.statusKeluarga}
                      readOnly
                      className="w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded text-sm text-gray-600"
                    />
                  </div>
                </div>

                {/* Provinsi */}
                <div className="grid grid-cols-3 gap-4 items-center">
                  <label className="text-sm text-gray-700">Provinsi</label>
                  <div className="col-span-2">
                    <input
                      type="text"
                      value={formData.provinsi}
                      readOnly
                      className="w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded text-sm text-gray-600"
                    />
                  </div>
                </div>

                {/* Kabupaten/Kota */}
                <div className="grid grid-cols-3 gap-4 items-center">
                  <label className="text-sm text-gray-700">Kabupaten/Kota</label>
                  <div className="col-span-2">
                    <input
                      type="text"
                      value={formData.kabupatenKota}
                      readOnly
                      className="w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded text-sm text-gray-600"
                    />
                  </div>
                </div>

                {/* Kecamatan */}
                <div className="grid grid-cols-3 gap-4 items-center">
                  <label className="text-sm text-gray-700">Kecamatan</label>
                  <div className="col-span-2">
                    <input
                      type="text"
                      value={formData.kecamatan}
                      readOnly
                      className="w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded text-sm text-gray-600"
                    />
                  </div>
                </div>

                {/* Desa/Kelurahan */}
                <div className="grid grid-cols-3 gap-4 items-center">
                  <label className="text-sm text-gray-700">Desa/Kelurahan</label>
                  <div className="col-span-2">
                    <input
                      type="text"
                      value={formData.desaKelurahan}
                      readOnly
                      className="w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded text-sm text-gray-600"
                    />
                  </div>
                </div>

                {/* RW Kota Surabaya */}
                <div className="grid grid-cols-3 gap-4 items-center">
                  <label className="text-sm text-gray-700">RW Kota Surabaya</label>
                  <div className="col-span-2">
                    <input
                      type="text"
                      value={formData.rwKotaSurabaya}
                      readOnly
                      className="w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded text-sm text-gray-600"
                    />
                  </div>
                </div>

                {/* RT Kota Surabaya */}
                <div className="grid grid-cols-3 gap-4 items-center">
                  <label className="text-sm text-gray-700">RT Kota Surabaya</label>
                  <div className="col-span-2">
                    <input
                      type="text"
                      value={formData.rtKotaSurabaya}
                      readOnly
                      className="w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded text-sm text-gray-600"
                    />
                  </div>
                </div>

                {/* RT/RW */}
                <div className="grid grid-cols-3 gap-4 items-start">
                  <div>
                    <label className="text-sm text-gray-700 font-medium">RT/RW</label>
                    <p className="text-xs text-[#1e88e5] italic mt-1">
                      Isikan Strip (-) jika RT RW sudah sesuai<br />
                      Format Penulisan Contoh: RT 007/RW 003
                    </p>
                  </div>
                  <div className="col-span-2">
                    <input
                      type="text"
                      value={formData.rtRw}
                      onChange={(e) => setFormData(prev => ({ ...prev, rtRw: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
                    />
                  </div>
                </div>

                {/* Alamat */}
                <div className="grid grid-cols-3 gap-4 items-center">
                  <label className="text-sm text-gray-700">Alamat</label>
                  <div className="col-span-2">
                    <input
                      type="text"
                      value={formData.alamat}
                      onChange={(e) => setFormData(prev => ({ ...prev, alamat: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
                    />
                  </div>
                </div>

                {/* Nama Kepala Keluarga */}
                <div className="grid grid-cols-3 gap-4 items-center">
                  <label className="text-sm text-gray-700">Nama Kepala Keluarga (KK)</label>
                  <div className="col-span-2">
                    <input
                      type="text"
                      value={formData.namaKK}
                      onChange={(e) => setFormData(prev => ({ ...prev, namaKK: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
                    />
                  </div>
                </div>

                {/* Keberadaan Keluarga */}
                <div className="grid grid-cols-3 gap-4 items-start">
                  <div>
                    <label className="text-sm text-[#1e88e5] font-medium">3. Keberadaan Keluarga</label>
                    <p className="text-xs text-[#1e88e5] italic mt-1">
                      Pilih status keberadaan keluarga sesuai<br />
                      identifikasi di lapangan
                    </p>
                  </div>
                  <div className="col-span-2 space-y-2">
                    {keberadaanOptions.map((option) => (
                      <label key={option.value} className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="radio"
                          name="keberadaanKeluarga"
                          value={option.value}
                          checked={formData.keberadaanKeluarga === option.value}
                          onChange={(e) => setFormData(prev => ({ ...prev, keberadaanKeluarga: e.target.value }))}
                          className="w-4 h-4 text-[#1e88e5]"
                        />
                        <span className="text-sm text-gray-700">{option.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Koordinat Lokasi Keluarga */}
                <div className="grid grid-cols-3 gap-4 items-start">
                  <label className="text-sm text-gray-700">
                    Koordinat Lokasi Keluarga <span className="text-red-500">*</span>
                  </label>
                  <div className="col-span-2 space-y-3">
                    {/* Map Embed */}
                    <div className="w-full h-48 rounded overflow-hidden border border-gray-300">
                      <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3957.5!2d112.6692!3d-7.2506!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zN8KwMTUnMDIuMiJTIDExMsKwNDAnMDkuMiJF!5e0!3m2!1sen!2sid!4v1620000000000!5m2!1sen!2sid"
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen=""
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                      />
                    </div>
                    <input
                      type="text"
                      value={formData.koordinat}
                      readOnly
                      className="w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded text-sm text-[#1e88e5]"
                    />
                    <button className="flex items-center gap-2 px-4 py-2 bg-[#ffc107] text-gray-800 rounded text-sm hover:bg-[#ffb300] transition-colors">
                      <MapPin className="w-4 h-4" />
                      Get Location
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Form Content - Identitas Keluarga */}
            {activeSection === "identitas-keluarga" && (
              <div className="bg-white rounded-b-lg shadow p-6 space-y-6">
                {/* Section Header */}
                <div className="bg-[#7c4dff] text-white text-center py-3 rounded-lg">
                  <h3 className="font-medium">I. IDENTITAS KELUARGA</h3>
                </div>

                {/* 101. Nomor Kartu Keluarga */}
                <div className="grid grid-cols-3 gap-4 items-start">
                  <div>
                    <label className="text-sm text-gray-700">101. Nomor Kartu Keluarga (KK)</label>
                    <p className="text-xs text-[#1e88e5] italic mt-1">
                      Rincian ini merupakan Prelist sehingga tidak bisa diedit
                    </p>
                  </div>
                  <div className="col-span-2">
                    <input
                      type="text"
                      value={formData.noKK}
                      readOnly
                      className="w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded text-sm text-gray-600"
                    />
                  </div>
                </div>

                {/* 102. Nama Kepala Keluarga */}
                <div className="grid grid-cols-3 gap-4 items-center">
                  <label className="text-sm text-gray-700">102. Nama Kepala Keluarga (KK)</label>
                  <div className="col-span-2">
                    <input
                      type="text"
                      value={formData.namaKepalaKK}
                      onChange={(e) => setFormData(prev => ({ ...prev, namaKepalaKK: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
                    />
                  </div>
                </div>

                {/* 103. NIK Kepala Keluarga */}
                <div className="grid grid-cols-3 gap-4 items-start">
                  <div>
                    <label className="text-sm text-gray-700">103. Nomor Induk Kependudukan (NIK) Kepala Keluarga</label>
                    <p className="text-xs text-[#1e88e5] italic mt-1">
                      Rincian ini merupakan Prelist sehingga bisa tetap Submit walau Blank
                    </p>
                  </div>
                  <div className="col-span-2">
                    <input
                      type="text"
                      value={formData.nikKepalaKK}
                      readOnly
                      className="w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded text-sm text-gray-600"
                    />
                  </div>
                </div>

                {/* Button Alamat Sesuai KK */}
                <div className="flex justify-center">
                  <button className="px-6 py-3 bg-[#7c4dff] text-white rounded-lg hover:bg-[#6a3de8] transition-colors font-medium">
                    ALAMAT SESUAI KK
                  </button>
                </div>

                {/* 104. Provinsi */}
                <div className="grid grid-cols-3 gap-4 items-start">
                  <div>
                    <label className="text-sm text-gray-700">104. Provinsi</label>
                    <p className="text-xs text-[#1e88e5] italic mt-1">
                      Rincian ini merupakan Prelist sehingga tetap bisa submit walau Blank
                    </p>
                  </div>
                  <div className="col-span-2">
                    <input
                      type="text"
                      value={formData.provinsiFam}
                      readOnly
                      className="w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded text-sm text-gray-600"
                    />
                  </div>
                </div>

                {/* 105. Kabupaten/Kota */}
                <div className="grid grid-cols-3 gap-4 items-start">
                  <div>
                    <label className="text-sm text-gray-700">105. Kabupaten/Kota</label>
                    <p className="text-xs text-[#1e88e5] italic mt-1">
                      Rincian ini merupakan Prelist sehingga tetap bisa submit walau Blank
                    </p>
                  </div>
                  <div className="col-span-2">
                    <input
                      type="text"
                      value={formData.kabupatenKotaFam}
                      readOnly
                      className="w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded text-sm text-gray-600"
                    />
                  </div>
                </div>

                {/* 106. Kecamatan */}
                <div className="grid grid-cols-3 gap-4 items-start">
                  <div>
                    <label className="text-sm text-gray-700">106. Kecamatan</label>
                    <p className="text-xs text-[#1e88e5] italic mt-1">
                      Rincian ini merupakan Prelist sehingga tetap bisa submit walau Blank
                    </p>
                  </div>
                  <div className="col-span-2">
                    <input
                      type="text"
                      value={formData.kecamatanFam}
                      readOnly
                      className="w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded text-sm text-gray-600"
                    />
                  </div>
                </div>

                {/* 107. Desa/Kelurahan */}
                <div className="grid grid-cols-3 gap-4 items-start">
                  <div>
                    <label className="text-sm text-gray-700">107. Desa/Kelurahan</label>
                    <p className="text-xs text-[#1e88e5] italic mt-1">
                      Rincian ini merupakan Prelist sehingga tetap bisa submit walau Blank
                    </p>
                  </div>
                  <div className="col-span-2">
                    <input
                      type="text"
                      value={formData.desaKelurahanFam}
                      readOnly
                      className="w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded text-sm text-gray-600"
                    />
                  </div>
                </div>

                {/* 108. RT/RW */}
                <div className="grid grid-cols-3 gap-4 items-start">
                  <div>
                    <label className="text-sm text-gray-700">108. RT/RW</label>
                    <p className="text-xs text-[#1e88e5] italic mt-1">
                      Rincian ini merupakan Prelist sehingga tetap bisa submit walau Blank
                    </p>
                  </div>
                  <div className="col-span-2">
                    <input
                      type="text"
                      value={formData.rtRwFam}
                      onChange={(e) => setFormData(prev => ({ ...prev, rtRwFam: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
                    />
                  </div>
                </div>

                {/* 109. Alamat */}
                <div className="grid grid-cols-3 gap-4 items-start">
                  <div>
                    <label className="text-sm text-gray-700">109. Alamat (Jalan/Gang, Nomor Rumah)</label>
                    <p className="text-xs text-[#1e88e5] italic mt-1">
                      Rincian ini merupakan Prelist sehingga tetap bisa submit walau Blank
                    </p>
                  </div>
                  <div className="col-span-2">
                    <input
                      type="text"
                      value={formData.alamatFam}
                      onChange={(e) => setFormData(prev => ({ ...prev, alamatFam: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
                    />
                  </div>
                </div>

                {/* Alamat domisili keluarga */}
                <div className="grid grid-cols-3 gap-4 items-start">
                  <label className="text-sm text-gray-700">
                    Alamat domisili keluarga <span className="text-red-500">*</span>
                  </label>
                  <div className="col-span-2 space-y-2">
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="radio"
                        name="alamatDomisili"
                        value="sesuai"
                        checked={formData.alamatDomisili === "sesuai"}
                        onChange={(e) => setFormData(prev => ({ ...prev, alamatDomisili: e.target.value }))}
                        className="w-4 h-4 text-[#1e88e5]"
                      />
                      <span className="text-sm text-gray-700">Sesuai KK</span>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="radio"
                        name="alamatDomisili"
                        value="tidak-sesuai"
                        checked={formData.alamatDomisili === "tidak-sesuai"}
                        onChange={(e) => setFormData(prev => ({ ...prev, alamatDomisili: e.target.value }))}
                        className="w-4 h-4 text-[#1e88e5]"
                      />
                      <span className="text-sm text-gray-700">Tidak Sesuai KK</span>
                    </label>
                  </div>
                </div>
              </div>
            )}

            {/* Form Content - Keterangan Pendataan Anggota Keluarga */}
            {activeSection === "keterangan-pendataan" && (
              <div className="bg-white rounded-b-lg shadow p-6 space-y-6">
                {/* Nama Informan */}
                <div className="grid grid-cols-3 gap-4 items-center">
                  <label className="text-sm text-gray-700">
                    Nama Informan <span className="text-red-500">*</span>
                  </label>
                  <div className="col-span-2">
                    <input
                      type="text"
                      value={formData.namaInforman}
                      onChange={(e) => setFormData(prev => ({ ...prev, namaInforman: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
                    />
                  </div>
                </div>

                {/* Tanggal Pendataan Anggota Keluarga */}
                <div className="grid grid-cols-3 gap-4 items-center">
                  <label className="text-sm text-gray-700">
                    Tanggal Pendataan Anggota Keluarga <span className="text-red-500">*</span>
                  </label>
                  <div className="col-span-2">
                    <div className="relative">
                      <input
                        type="date"
                        value={formData.tanggalPendataan}
                        onChange={(e) => setFormData(prev => ({ ...prev, tanggalPendataan: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded text-sm pr-10"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Form Content - Keterangan Sosial Ekonomi Anggota Keluarga */}
            {activeSection === "keterangan-sosial" && (
              <div className="bg-white rounded-b-lg shadow p-6 space-y-6">
                {/* Section Header */}
                <div className="bg-[#7c4dff] text-white text-center py-3 rounded-lg">
                  <h3 className="font-medium">II. KETERANGAN SOSIAL EKONOMI ANGGOTA KELUARGA</h3>
                </div>

                {/* Helper Text */}
                <div className="text-sm space-y-1">
                  <p className="text-gray-700">Format Penulisan Anggota Keluarga Baru:</p>
                  <p className="text-[#1e88e5]">
                    Klik "+ Tambah Baru" untuk menambahkan anggota keluarga baru
                  </p>
                  <p className="text-[#1e88e5]">
                    Format penulisan: NIK (spasi) / (spasi) NAMA ANGGOTA KELUARGA
                  </p>
                  <p className="text-[#1e88e5]">
                    Nama Anggota Keluarga hanya boleh terdiri karakter: A-Z, a-z, spasi.
                  </p>
                </div>

                {/* Daftar Anggota Keluarga */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium text-gray-700">DAFTAR ANGGOTA KELUARGA</h4>
                    <button className="px-4 py-2 bg-[#ff9800] text-white rounded hover:bg-[#f57c00] transition-colors text-sm">
                      + Add New
                    </button>
                  </div>

                  {/* List of Family Members */}
                  <div className="space-y-3">
                    {anggotaKeluarga.map((anggota) => (
                      <div key={anggota.id} className="flex items-center justify-between py-3 border-b border-gray-200">
                        <span className="text-gray-700">{anggota.nama}</span>
                        <button
                          onClick={() => handleViewAnggota(anggota)}
                          className="px-4 py-1.5 bg-[#7c4dff] text-white rounded text-sm hover:bg-[#6a3de8] transition-colors flex items-center gap-1"
                        >
                          + View
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Form Content - Keterangan Individu */}
            {activeSection === "keterangan-individu" && formData.selectedAnggota && (
              <div className="bg-white rounded-b-lg shadow p-6 space-y-6">
                {/* Section Header */}
                <div className="bg-[#7c4dff] text-white text-center py-3 rounded-lg">
                  <h3 className="font-medium">A. KETERANGAN DEMOGRAFI</h3>
                </div>

                {/* 205a. NIK */}
                <div className="grid grid-cols-3 gap-4 items-start">
                  <div>
                    <label className="text-sm text-gray-700">205a. NIK {formData.selectedAnggota.nama}</label>
                    <p className="text-xs text-[#1e88e5] italic mt-1">
                      Rincian ini merupakan Prelist sehingga bisa tetap Submit walau Blank
                    </p>
                  </div>
                  <div className="col-span-2 flex items-center gap-2">
                    <input
                      type="text"
                      value={formData.selectedAnggota.nik}
                      readOnly
                      className="flex-1 px-3 py-2 bg-gray-100 border border-gray-300 rounded text-sm text-gray-600"
                    />
                    <button className="p-2 text-gray-400 hover:text-gray-600">
                      <Edit className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* 203. Keterangan keberadaan anggota keluarga */}
                <div className="grid grid-cols-3 gap-4 items-start">
                  <div>
                    <label className="text-sm text-gray-700">203. Keterangan keberadaan anggota keluarga {formData.selectedAnggota.nama}</label>
                  </div>
                  <div className="col-span-2 space-y-2">
                    {keberadaanAnggotaOptions.map((option) => (
                      <label key={option.value} className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="radio"
                          name="keberadaanAnggota"
                          value={option.value}
                          checked={formData.selectedAnggota.keberadaan === option.value}
                          onChange={(e) => handleUpdateAnggota(formData.selectedAnggota.id, 'keberadaan', e.target.value)}
                          className="w-4 h-4 text-[#1e88e5]"
                        />
                        <span className="text-sm text-gray-700">{option.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* 206a. Nomor Kartu Keluarga */}
                <div className="grid grid-cols-3 gap-4 items-start">
                  <div>
                    <label className="text-sm text-gray-700">206a. Nomor Kartu Keluarga (KK) {formData.selectedAnggota.nama}</label>
                    <p className="text-xs text-[#1e88e5] italic mt-1">
                      Rincian ini merupakan Prelist sehingga bisa tetap Submit walau Blank
                    </p>
                  </div>
                  <div className="col-span-2 flex items-center gap-2">
                    <input
                      type="text"
                      value={formData.selectedAnggota.noKK}
                      readOnly
                      className="flex-1 px-3 py-2 bg-gray-100 border border-gray-300 rounded text-sm text-gray-600"
                    />
                    <button className="p-2 text-gray-400 hover:text-gray-600">
                      <Edit className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* 207a. Alamat domisili */}
                <div className="grid grid-cols-3 gap-4 items-start">
                  <label className="text-sm text-gray-700">
                    207a. Alamat domisili {formData.selectedAnggota.nama} <span className="text-red-500">*</span>
                  </label>
                  <div className="col-span-2 space-y-2">
                    {alamatDomisiliAnggotaOptions.map((option) => (
                      <label key={option.value} className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="radio"
                          name="alamatDomisiliAnggota"
                          value={option.value}
                          checked={formData.selectedAnggota.alamatDomisili === option.value}
                          onChange={(e) => handleUpdateAnggota(formData.selectedAnggota.id, 'alamatDomisili', e.target.value)}
                          className="w-4 h-4 text-[#1e88e5]"
                        />
                        <span className="text-sm text-gray-700">{option.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* 208. Jenis Kelamin */}
                <div className="grid grid-cols-3 gap-4 items-start">
                  <div>
                    <label className="text-sm text-gray-700">208. Jenis Kelamin {formData.selectedAnggota.nama}</label>
                    <p className="text-xs text-[#1e88e5] italic mt-1">
                      Prelist - Jenis Kelamin {formData.selectedAnggota.nama} : {formData.selectedAnggota.jenisKelamin === "2" ? "2. Perempuan" : "1. Laki-laki"}
                    </p>
                  </div>
                  <div className="col-span-2 space-y-2">
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="radio"
                        name="jenisKelamin"
                        value="1"
                        checked={formData.selectedAnggota.jenisKelamin === "1"}
                        onChange={(e) => handleUpdateAnggota(formData.selectedAnggota.id, 'jenisKelamin', e.target.value)}
                        className="w-4 h-4 text-[#1e88e5]"
                      />
                      <span className="text-sm text-gray-700">1. Laki-laki</span>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="radio"
                        name="jenisKelamin"
                        value="2"
                        checked={formData.selectedAnggota.jenisKelamin === "2"}
                        onChange={(e) => handleUpdateAnggota(formData.selectedAnggota.id, 'jenisKelamin', e.target.value)}
                        className="w-4 h-4 text-[#1e88e5]"
                      />
                      <span className="text-sm text-gray-700">2. Perempuan</span>
                    </label>
                  </div>
                </div>

                {/* Birth Details */}
                <div className="grid grid-cols-3 gap-4 items-center">
                  <label className="text-sm text-gray-700">Tanggal lahir</label>
                  <input
                    type="number"
                    value={formData.selectedAnggota.tanggalLahirDay}
                    onChange={(e) => handleUpdateAnggota(formData.selectedAnggota.id, 'tanggalLahirDay', e.target.value)}
                    placeholder="dd"
                    className="px-3 py-2 border border-gray-300 rounded text-sm"
                  />
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={formData.selectedAnggota.tanggalLahirMonth}
                      readOnly
                      className="flex-1 px-3 py-2 bg-gray-100 border border-gray-300 rounded text-sm text-gray-600"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 items-center">
                  <label className="text-sm text-gray-700">Bulan lahir</label>
                  <select
                    value={formData.selectedAnggota.tanggalLahirMonth}
                    onChange={(e) => handleUpdateAnggota(formData.selectedAnggota.id, 'tanggalLahirMonth', e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded text-sm"
                  >
                    <option value="januari">Januari</option>
                    <option value="februari">Februari</option>
                    <option value="maret">Maret</option>
                    <option value="april">April</option>
                    <option value="mei">Mei</option>
                    <option value="juni">Juni</option>
                    <option value="juli">Juli</option>
                    <option value="agustus">Agustus</option>
                    <option value="september">September</option>
                    <option value="oktober">Oktober</option>
                    <option value="november">November</option>
                    <option value="desember">Desember</option>
                  </select>
                </div>

                <div className="grid grid-cols-3 gap-4 items-center">
                  <label className="text-sm text-gray-700">Tahun lahir</label>
                  <input
                    type="number"
                    value={formData.selectedAnggota.tanggalLahirYear}
                    onChange={(e) => handleUpdateAnggota(formData.selectedAnggota.id, 'tanggalLahirYear', e.target.value)}
                    placeholder="yyyy"
                    className="px-3 py-2 border border-gray-300 rounded text-sm"
                  />
                </div>

                {/* 209. Usah Tanggal Lahir */}
                <div className="grid grid-cols-3 gap-4 items-start">
                  <label className="text-sm text-gray-700">
                    209. Usah Tanggal Lahir {formData.selectedAnggota.nama} <span className="text-red-500">*</span>
                  </label>
                  <div className="col-span-2 space-y-2">
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="radio"
                        name="usahTanggalLahir"
                        value="ya"
                        checked={formData.selectedAnggota.usahTanggalLahir === "ya"}
                        onChange={(e) => handleUpdateAnggota(formData.selectedAnggota.id, 'usahTanggalLahir', e.target.value)}
                        className="w-4 h-4 text-[#1e88e5]"
                      />
                      <span className="text-sm text-gray-700">Ya</span>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="radio"
                        name="usahTanggalLahir"
                        value="tidak"
                        checked={formData.selectedAnggota.usahTanggalLahir === "tidak"}
                        onChange={(e) => handleUpdateAnggota(formData.selectedAnggota.id, 'usahTanggalLahir', e.target.value)}
                        className="w-4 h-4 text-[#1e88e5]"
                      />
                      <span className="text-sm text-gray-700">Tidak</span>
                    </label>
                  </div>
                </div>

                {/* 209.b. Umur */}
                <div className="grid grid-cols-3 gap-4 items-center">
                  <label className="text-sm text-gray-700">209.b. Umur {formData.selectedAnggota.nama}</label>
                  <div className="col-span-2">
                    <input
                      type="text"
                      value={formData.selectedAnggota.umur}
                      onChange={(e) => handleUpdateAnggota(formData.selectedAnggota.id, 'umur', e.target.value)}
                      placeholder="dd:mm:yyyy"
                      className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
                    />
                  </div>
                </div>

                {/* Referensi Umur */}
                <div className="grid grid-cols-3 gap-4 items-center">
                  <label className="text-sm text-gray-700">Referensi Umur</label>
                  <div className="col-span-2">
                    <input
                      type="text"
                      value={formData.selectedAnggota.referensiUmur}
                      onChange={(e) => handleUpdateAnggota(formData.selectedAnggota.id, 'referensiUmur', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
                    />
                  </div>
                </div>

                {/* 210. Status Perkawinan */}
                <div className="grid grid-cols-3 gap-4 items-start">
                  <label className="text-sm text-gray-700">
                    210. Status Perkawinan {formData.selectedAnggota.nama} <span className="text-red-500">*</span>
                  </label>
                  <div className="col-span-2 space-y-2">
                    {[
                      { value: "1", label: "1. Belum Kawin" },
                      { value: "2", label: "2. Kawin (Pisah)" },
                      { value: "3", label: "3. Cerai Hidup" },
                      { value: "4", label: "4. Cerai Mati" },
                    ].map((option) => (
                      <label key={option.value} className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="radio"
                          name="statusPerkawinan"
                          value={option.value}
                          checked={formData.selectedAnggota.statusPerkawinan === option.value}
                          onChange={(e) => handleUpdateAnggota(formData.selectedAnggota.id, 'statusPerkawinan', e.target.value)}
                          className="w-4 h-4 text-[#1e88e5]"
                        />
                        <span className="text-sm text-gray-700">{option.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* 211. Status Hubungan */}
                <div className="grid grid-cols-3 gap-4 items-start">
                  <label className="text-sm text-gray-700">
                    211. Status Hubungan {formData.selectedAnggota.nama} <span className="text-red-500">*</span>
                  </label>
                  <div className="col-span-2 space-y-2">
                    {[
                      { value: "1", label: "1. Kepala keluarga" },
                      { value: "2", label: "2. (Istri/Suami)" },
                      { value: "3", label: "3. Anak" },
                      { value: "4", label: "4. Menantu" },
                      { value: "5", label: "5. Cucu" },
                      { value: "6", label: "6. Orangtua/mertuа" },
                      { value: "7", label: "7. Pembant/sopir" },
                      { value: "8", label: "8. Lainnya" },
                    ].map((option) => (
                      <label key={option.value} className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="radio"
                          name="statusHubungan"
                          value={option.value}
                          checked={formData.selectedAnggota.statusHubungan === option.value}
                          onChange={(e) => handleUpdateAnggota(formData.selectedAnggota.id, 'statusHubungan', e.target.value)}
                          className="w-4 h-4 text-[#1e88e5]"
                        />
                        <span className="text-sm text-gray-700">{option.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Section Header - Education */}
                <div className="bg-[#a5d6ff] text-gray-800 text-center py-2 rounded-lg mt-6">
                  <h3 className="font-medium text-sm">B. PENDIDIKAN</h3>
                </div>

                {/* 212. Partisipasi Sekolah */}
                <div className="grid grid-cols-3 gap-4 items-start">
                  <label className="text-sm text-gray-700">212. Partisipasi sekolah {formData.selectedAnggota.nama}</label>
                  <div className="col-span-2 space-y-2">
                    {[
                      { value: "1", label: "1. Tidak/belum pernah sekolah" },
                      { value: "2", label: "2. Masih sekolah" },
                      { value: "3", label: "3. Tidak bersekolah lagi" },
                    ].map((option) => (
                      <label key={option.value} className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="radio"
                          name="partisipasiSekolah"
                          value={option.value}
                          checked={formData.selectedAnggota.partisipasiSekolah === option.value}
                          onChange={(e) => handleUpdateAnggota(formData.selectedAnggota.id, 'partisipasiSekolah', e.target.value)}
                          className="w-4 h-4 text-[#1e88e5]"
                        />
                        <span className="text-sm text-gray-700">{option.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* 213. Ijazah dan Jenis Pendidikan */}
                <div className="grid grid-cols-3 gap-4 items-center">
                  <label className="text-sm text-gray-700">213. Ijazah dan jenis pendidikan tertinggi yang pernah/sedang dieroleh {formData.selectedAnggota.nama}</label>
                  <div className="col-span-2">
                    <input
                      type="text"
                      value={formData.selectedAnggota.ijazahPendidikan}
                      onChange={(e) => handleUpdateAnggota(formData.selectedAnggota.id, 'ijazahPendidikan', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
                    />
                  </div>
                </div>

                {/* 214. Kelas Terakhir */}
                <div className="grid grid-cols-3 gap-4 items-start">
                  <label className="text-sm text-gray-700">214. Kelas terakhir yang pernah/sedang dieroleh {formData.selectedAnggota.nama}</label>
                  <div className="col-span-2 space-y-2">
                    {[
                      { value: "1", label: "1. Belum sekolah" },
                      { value: "2", label: "2. Belum Tamat SD/MI" },
                      { value: "3", label: "3. Tamat SD/MI" },
                      { value: "4", label: "4. Tamat SMP/MTs" },
                      { value: "5", label: "5. Tamat SMA/SMK/MA" },
                      { value: "6", label: "6. Tamat D1/D2/D3" },
                      { value: "7", label: "7. Tamat S1/S2/S3" },
                    ].map((option) => (
                      <label key={option.value} className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="radio"
                          name="kelasTerakkhir"
                          value={option.value}
                          checked={formData.selectedAnggota.kelasTerakkhir === option.value}
                          onChange={(e) => handleUpdateAnggota(formData.selectedAnggota.id, 'kelasTerakkhir', e.target.value)}
                          className="w-4 h-4 text-[#1e88e5]"
                        />
                        <span className="text-sm text-gray-700">{option.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* 215. Ijazah/STTB Tertinggi */}
                <div className="grid grid-cols-3 gap-4 items-center">
                  <label className="text-sm text-gray-700">215. Ijazah/STTB tertinggi yang dimiliki {formData.selectedAnggota.nama}</label>
                  <div className="col-span-2">
                    <input
                      type="text"
                      value={formData.selectedAnggota.ijazahSTTB}
                      onChange={(e) => handleUpdateAnggota(formData.selectedAnggota.id, 'ijazahSTTB', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
                    />
                  </div>
                </div>

                {/* Section Header - Employment */}
                <div className="bg-[#a5d6ff] text-gray-800 text-center py-2 rounded-lg mt-6">
                  <h3 className="font-medium text-sm">C. KETERANGAN KERAJAAN</h3>
                </div>

                {/* 216. Apakah Biasanya Bekerja */}
                <div className="grid grid-cols-3 gap-4 items-start">
                  <label className="text-sm text-gray-700">216. Apakah {formData.selectedAnggota.nama} biasanya bekerja/membantu bekerja?</label>
                  <div className="col-span-2 space-y-2">
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="radio"
                        name="bekerja"
                        value="ya"
                        checked={formData.selectedAnggota.bekerja === "ya"}
                        onChange={(e) => handleUpdateAnggota(formData.selectedAnggota.id, 'bekerja', e.target.value)}
                        className="w-4 h-4 text-[#1e88e5]"
                      />
                      <span className="text-sm text-gray-700">1. Ya</span>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="radio"
                        name="bekerja"
                        value="tidak"
                        checked={formData.selectedAnggota.bekerja === "tidak"}
                        onChange={(e) => handleUpdateAnggota(formData.selectedAnggota.id, 'bekerja', e.target.value)}
                        className="w-4 h-4 text-[#1e88e5]"
                      />
                      <span className="text-sm text-gray-700">2. Tidak</span>
                    </label>
                  </div>
                </div>

                {/* 217. Lapangan Usaha */}
                <div className="grid grid-cols-3 gap-4 items-center">
                  <label className="text-sm text-gray-700">217. Lapangan usaha atau bidang pekerjaan utama dari {formData.selectedAnggota.nama}</label>
                  <div className="col-span-2">
                    <input
                      type="text"
                      value={formData.selectedAnggota.lapanganUsaha}
                      onChange={(e) => handleUpdateAnggota(formData.selectedAnggota.id, 'lapanganUsaha', e.target.value)}
                      placeholder="24 Aktivitas pula lainnya"
                      className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
                    />
                  </div>
                </div>

                {/* 218. Status Pekerjaan */}
                <div className="grid grid-cols-3 gap-4 items-center">
                  <label className="text-sm text-gray-700">218. Status dalam pekerjaan utama {formData.selectedAnggota.nama}</label>
                  <div className="col-span-2">
                    <input
                      type="text"
                      value={formData.selectedAnggota.statusPekerjaan}
                      onChange={(e) => handleUpdateAnggota(formData.selectedAnggota.id, 'statusPekerjaan', e.target.value)}
                      placeholder="Buruh/pekerja/pengrajin uccak"
                      className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
                    />
                  </div>
                </div>

                {/* 219. Pendapatan */}
                <div className="grid grid-cols-3 gap-4 items-center">
                  <label className="text-sm text-gray-700">219. Pendapatan sebulan terakkhir {formData.selectedAnggota.nama}</label>
                  <div className="col-span-2">
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-600">IDR</span>
                      <input
                        type="number"
                        value={formData.selectedAnggota.pendapatan}
                        onChange={(e) => handleUpdateAnggota(formData.selectedAnggota.id, 'pendapatan', e.target.value)}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded text-sm"
                      />
                    </div>
                  </div>
                </div>

                {/* 219a. Ketampakan yang Dimiliki */}
                <div className="grid grid-cols-3 gap-4 items-start">
                  <label className="text-sm text-gray-700">219a. Ketampakan yang dimiliki {formData.selectedAnggota.nama}</label>
                  <div className="col-span-2 space-y-2">
                    {[
                      { value: "01", label: "01. Administrasi Perkantoran" },
                      { value: "02", label: "02. Agribisnis" },
                      { value: "03", label: "03. Jasa Kesehatan" },
                      { value: "04", label: "04. Teknologi Informasi dan Komunikasi" },
                      { value: "05", label: "05. Keahlian Bahasa" },
                      { value: "06", label: "06. Teknik Mesin" },
                      { value: "07", label: "07. Jasa Rumah Tangga" },
                      { value: "08", label: "08. Bahasa" },
                      { value: "09", label: "09. Penyelaikan Makanan Minuman" },
                      { value: "10", label: "10. Batik&Kerajinan" },
                    ].map((option) => (
                      <label key={option.value} className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={formData.selectedAnggota.ketampakanYangDimiliki?.includes(option.value) || false}
                          onChange={(e) => {
                            const current = formData.selectedAnggota.ketampakanYangDimiliki || []
                            if (e.target.checked) {
                              handleUpdateAnggota(formData.selectedAnggota.id, 'ketampakanYangDimiliki', [...current, option.value])
                            } else {
                              handleUpdateAnggota(formData.selectedAnggota.id, 'ketampakanYangDimiliki', current.filter(v => v !== option.value))
                            }
                          }}
                          className="w-4 h-4 text-[#1e88e5]"
                        />
                        <span className="text-sm text-gray-700">{option.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* 219b. Keahlian Pelatihan */}
                <div className="grid grid-cols-3 gap-4 items-start">
                  <label className="text-sm text-gray-700">219b. Keahlian {formData.selectedAnggota.nama} mengikuti Pelatihan?</label>
                  <div className="col-span-2 space-y-2">
                    {[
                      { value: "01", label: "01. Refleksologi" },
                      { value: "02", label: "02. Perawatan Rambut, Pemangkasan dan Teknik Barber" },
                      { value: "03", label: "03. Baby Massage" },
                      { value: "04", label: "04. Cleaning Service" },
                      { value: "05", label: "05. Perawat Lansia (Caregiver)" },
                      { value: "06", label: "06. K3 Umum" },
                      { value: "07", label: "07. Administrasi Perkantoran" },
                      { value: "08", label: "08. Akuntansi Dasar" },
                      { value: "09", label: "09. Ekspor Impor" },
                      { value: "10", label: "10. Desain Grafis" },
                      { value: "11", label: "11. IT Support" },
                      { value: "12", label: "12. Teknik Komputer" },
                      { value: "13", label: "13. Fotografi" },
                      { value: "14", label: "14. Multimedia" },
                      { value: "15", label: "15. Digital Marketing" },
                      { value: "16", label: "16. Barista" },
                      { value: "17", label: "17. Tour guide" },
                      { value: "18", label: "18. Pastry Cook" },
                      { value: "19", label: "19. Perhelian" },
                      { value: "20", label: "20. Jasa Roga" },
                      { value: "21", label: "21. Alat Angkat Angkut" },
                      { value: "22", label: "22. Teknik Penawean Mesin Pendingin / AC" },
                      { value: "23", label: "23. Las SMAW / Las FCAW" },
                      { value: "24", label: "24. Otomotif Mobil / Motor" },
                      { value: "25", label: "25. Traik Bersedia" },
                      { value: "26", label: "26. Lainnya" },
                    ].map((option) => (
                      <label key={option.value} className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={formData.selectedAnggota.keahlianPelatihan?.includes(option.value) || false}
                          onChange={(e) => {
                            const current = formData.selectedAnggota.keahlianPelatihan || []
                            if (e.target.checked) {
                              handleUpdateAnggota(formData.selectedAnggota.id, "keahlianPelatihan", [...current, option.value])
                            } else {
                              handleUpdateAnggota(formData.selectedAnggota.id, "keahlianPelatihan", current.filter(v => v !== option.value))
                            }
                          }}
                          className="w-4 h-4 text-[#1e88e5]"
                        />
                        <span className="text-sm text-gray-700">{option.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* 219c. Program Padat Karya */}
                <div className="grid grid-cols-3 gap-4 items-start">
                  <label className="text-sm text-gray-700">219c. Keahlian {formData.selectedAnggota.nama} mengikuti Program Padat Karya?</label>
                  <div className="col-span-2 space-y-2">
                    {[
                      { value: "01", label: "01. Budidaya Ikan" },
                      { value: "02", label: "02. Budidaya Pertanian" },
                      { value: "03", label: "03. Budidaya Peternakan" },
                      { value: "04", label: "04. Deterjaan Ondo Serangan dan Hijau / Penghijauan Konservasi" },
                      { value: "05", label: "05. Perawatan Pembuat Sigpor" },
                      { value: "06", label: "06. Perawatan Pembukuan Tas" },
                      { value: "07", label: "07. Pelatihan Batik" },
                      { value: "08", label: "08. Pelatihan Coffee Shop" },
                      { value: "09", label: "09. Pelatihan Jahit Saragan" },
                      { value: "10", label: "10. Pelatihan Kue Basah" },
                      { value: "11", label: "11. Pelatihan Laundry" },
                      { value: "12", label: "12. Pelatihan Pembuatan Paving" },
                      { value: "13", label: "13. Pelatihan Pembuatan Sepatu" },
                      { value: "14", label: "14. Pelatihan Servis HP" },
                      { value: "15", label: "15. Pelatihan Toko Pakaian/msos" },
                      { value: "16", label: "16. Pembuatan Saragan Untuk Lensa" },
                      { value: "17", label: "17. Pembinaan dan Pengembangor AMH Seniorstat" },
                      { value: "18", label: "18. Pembuatan Hendels Hotel" },
                      { value: "19", label: "19. Peningkatan Kapasitas Sugel" },
                      { value: "20", label: "20. Penyeranan Makrja Keluargan Pelulaon Rumah Tidak Layak lluni" },
                      { value: "21", label: "21. Perikanan Tangkap" },
                      { value: "22", label: "22. Pergiuaan Stand Kosong di DIKI / Pasar" },
                      { value: "23", label: "23. Tidak Bersedia" },
                      { value: "24", label: "24. Lainnya" },
                    ].map((option) => (
                      <label key={option.value} className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={formData.selectedAnggota.programPadatKarya?.includes(option.value) || false}
                          onChange={(e) => {
                            const current = formData.selectedAnggota.programPadatKarya || []
                            if (e.target.checked) {
                              handleUpdateAnggota(formData.selectedAnggota.id, "programPadatKarya", [...current, option.value])
                            } else {
                              handleUpdateAnggota(formData.selectedAnggota.id, "programPadatKarya", current.filter(v => v !== option.value))
                            }
                          }}
                          className="w-4 h-4 text-[#1e88e5]"
                        />
                        <span className="text-sm text-gray-700">{option.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* 219d. Jaminan Ketenagakerjaan */}
                <div className="grid grid-cols-3 gap-4 items-start">
                  <label className="text-sm text-gray-700">219d. Apakah {formData.selectedAnggota.nama} memiliki Jaminan Ketenagakerjaan dalam Bentuk Bpjs Ketenagakerjaan?</label>
                  <div className="col-span-2 space-y-2">
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="radio"
                        name="jaminanKetenagakerjaan"
                        value="ya"
                        checked={formData.selectedAnggota.jaminanKetenagakerjaan === "ya"}
                        onChange={(e) => handleUpdateAnggota(formData.selectedAnggota.id, "jaminanKetenagakerjaan", e.target.value)}
                        className="w-4 h-4 text-[#1e88e5]"
                      />
                      <span className="text-sm text-gray-700">1. Ya</span>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="radio"
                        name="jaminanKetenagakerjaan"
                        value="tidak"
                        checked={formData.selectedAnggota.jaminanKetenagakerjaan === "tidak"}
                        onChange={(e) => handleUpdateAnggota(formData.selectedAnggota.id, "jaminanKetenagakerjaan", e.target.value)}
                        className="w-4 h-4 text-[#1e88e5]"
                      />
                      <span className="text-sm text-gray-700">2. Tidak</span>
                    </label>
                  </div>
                </div>

                {/* Section Header - Business Ownership */}
                <div className="bg-[#a5d6ff] text-gray-800 text-center py-2 rounded-lg mt-6">
                  <h3 className="font-medium text-sm">D. KEPEMILIKAN USAHA</h3>
                </div>

                {/* 220. Apakah Memiliki Usaha Sendiri */}
                <div className="grid grid-cols-3 gap-4 items-start">
                  <label className="text-sm text-gray-700">220. Apakah {formData.selectedAnggota.nama} memiliki usaha sendiri/bersama?</label>
                  <div className="col-span-2 space-y-2">
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="radio"
                        name="memilikiUsaha"
                        value="ya"
                        checked={formData.selectedAnggota.memilikiUsaha === "ya"}
                        onChange={(e) => handleUpdateAnggota(formData.selectedAnggota.id, "memilikiUsaha", e.target.value)}
                        className="w-4 h-4 text-[#1e88e5]"
                      />
                      <span className="text-sm text-gray-700">1. Ya</span>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="radio"
                        name="memilikiUsaha"
                        value="tidak"
                        checked={formData.selectedAnggota.memilikiUsaha === "tidak"}
                        onChange={(e) => handleUpdateAnggota(formData.selectedAnggota.id, "memilikiUsaha", e.target.value)}
                        className="w-4 h-4 text-[#1e88e5]"
                      />
                      <span className="text-sm text-gray-700">2. Tidak</span>
                    </label>
                  </div>
                </div>

                {/* Section Header - Health */}
                <div className="bg-[#a5d6ff] text-gray-800 text-center py-2 rounded-lg mt-6">
                  <h3 className="font-medium text-sm">E. KESEHATAN</h3>
                </div>

                {/* 226. Apakah Memiliki Disabilitas */}
                <div className="grid grid-cols-3 gap-4 items-start">
                  <div className="text-sm text-gray-700">
                    <p>226. Apakah {formData.selectedAnggota.nama} memiliki disabilitas?</p>
                    <p className="text-blue-600 text-xs mt-1">Pilihan bisa lebih dari satu</p>
                  </div>
                  <div className="col-span-2 space-y-2">
                    {[
                      { value: "tidak", label: "Tidak memiliki disabilitas" },
                      { value: "fisik", label: "Disabilitas Fisik" },
                      { value: "mental", label: "Disabilitas Mental" },
                      { value: "intelektual", label: "Disabilitas Intelektual" },
                      { value: "sensorik_netra", label: "Disabilitas Sensorik Netra" },
                      { value: "sensorik_rungu", label: "Disabilitas Sensorik Rungu" },
                      { value: "wicara", label: "Disabilitas Wicara" },
                    ].map((option) => (
                      <label key={option.value} className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={formData.selectedAnggota.disabilitasTypes?.includes(option.value) || false}
                          onChange={(e) => {
                            const current = formData.selectedAnggota.disabilitasTypes || []
                            if (e.target.checked) {
                              handleUpdateAnggota(formData.selectedAnggota.id, "disabilitasTypes", [...current, option.value])
                            } else {
                              handleUpdateAnggota(formData.selectedAnggota.id, "disabilitasTypes", current.filter(v => v !== option.value))
                            }
                          }}
                          className="w-4 h-4 text-[#1e88e5]"
                        />
                        <span className="text-sm text-gray-700">{option.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* 227. Keluhan Kesehatan Kronis */}
                <div className="grid grid-cols-3 gap-4 items-center">
                  <label className="text-sm text-gray-700">227. Apakah {formData.selectedAnggota.nama} memiliki keluhan kesehatan kronis/menahun</label>
                  <div className="col-span-2 flex items-center gap-2">
                    <select
                      value={formData.selectedAnggota.keluhanKronis || "01"}
                      onChange={(e) => handleUpdateAnggota(formData.selectedAnggota.id, "keluhanKronis", e.target.value)}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded text-sm"
                    >
                      <option value="01">01. Tidak Ada</option>
                      <option value="02">02. Jantung</option>
                      <option value="03">03. TBC</option>
                      <option value="04">04. Liver/Hati</option>
                      <option value="05">05. Ginjal</option>
                      <option value="06">06. Stroke</option>
                      <option value="07">07. Diabetes Melitus</option>
                      <option value="08">08. Kanker/Tumor</option>
                      <option value="09">09. Darah Tinggi</option>
                      <option value="10">10. Asma</option>
                      <option value="11">11. Lainnya</option>
                    </select>
                    <button className="p-2 text-gray-400 hover:text-gray-600">
                      <span className="text-lg">×</span>
                    </button>
                    <button className="p-2 text-gray-400 hover:text-gray-600">
                      <span className="text-lg">−</span>
                    </button>
                    <button className="p-2 text-gray-400 hover:text-gray-600">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                      </svg>
                    </button>
                  </div>
                </div>

                {/* 228. Apakah Sedang Hamil */}
                <div className="grid grid-cols-3 gap-4 items-start">
                  <label className="text-sm text-gray-700">228. Apakah {formData.selectedAnggota.nama} saat ini sedang hamil?</label>
                  <div className="col-span-2 space-y-2">
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="radio"
                        name="sedangHamil"
                        value="ya"
                        checked={formData.selectedAnggota.sedangHamil === "ya"}
                        onChange={(e) => handleUpdateAnggota(formData.selectedAnggota.id, "sedangHamil", e.target.value)}
                        className="w-4 h-4 text-[#1e88e5]"
                      />
                      <span className="text-sm text-gray-700">1. Ya</span>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="radio"
                        name="sedangHamil"
                        value="tidak"
                        checked={formData.selectedAnggota.sedangHamil === "tidak"}
                        onChange={(e) => handleUpdateAnggota(formData.selectedAnggota.id, "sedangHamil", e.target.value)}
                        className="w-4 h-4 text-[#1e88e5]"
                      />
                      <span className="text-sm text-gray-700">2. Tidak</span>
                    </label>
                  </div>
                </div>

                {/* 229. Jaminan Kesehatan BPJS */}
                <div className="grid grid-cols-3 gap-4 items-start">
                  <label className="text-sm text-gray-700">229. Apakah {formData.selectedAnggota.nama} memiliki Jaminan Kesehatan dalam Bentuk BPJS Kesehatan?</label>
                  <div className="col-span-2 space-y-2">
                    {[
                      { value: "1", label: "1. BPJS PBI" },
                      { value: "2", label: "2. BPJS Mandiri" },
                      { value: "3", label: "3. Tidak Memiliki" },
                    ].map((option) => (
                      <label key={option.value} className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="radio"
                          name="jaminanKesehatanBPJS"
                          value={option.value}
                          checked={formData.selectedAnggota.jaminanKesehatanBPJS === option.value}
                          onChange={(e) => handleUpdateAnggota(formData.selectedAnggota.id, "jaminanKesehatanBPJS", e.target.value)}
                          className="w-4 h-4 text-[#1e88e5]"
                        />
                        <span className="text-sm text-gray-700">{option.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* 230. Jaminan Kesehatan Lainnya */}
                <div className="grid grid-cols-3 gap-4 items-start">
                  <label className="text-sm text-gray-700">230. Apakah {formData.selectedAnggota.nama} memiliki jaminan kesehatan lainnya?</label>
                  <div className="col-span-2 space-y-2">
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="radio"
                        name="jaminanKesehatanLainnya"
                        value="ya"
                        checked={formData.selectedAnggota.jaminanKesehatanLainnya === "ya"}
                        onChange={(e) => handleUpdateAnggota(formData.selectedAnggota.id, "jaminanKesehatanLainnya", e.target.value)}
                        className="w-4 h-4 text-[#1e88e5]"
                      />
                      <span className="text-sm text-gray-700">1. Ya</span>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="radio"
                        name="jaminanKesehatanLainnya"
                        value="tidak"
                        checked={formData.selectedAnggota.jaminanKesehatanLainnya === "tidak"}
                        onChange={(e) => handleUpdateAnggota(formData.selectedAnggota.id, "jaminanKesehatanLainnya", e.target.value)}
                        className="w-4 h-4 text-[#1e88e5]"
                      />
                      <span className="text-sm text-gray-700">2. Tidak</span>
                    </label>
                  </div>
                </div>

                {/* 231. Merokok */}
                <div className="grid grid-cols-3 gap-4 items-start">
                  <label className="text-sm text-gray-700">231. Selama sebulan terakhir apakah {formData.selectedAnggota.nama} merokok? (Termasuk Rokok Elektrik)</label>
                  <div className="col-span-2 space-y-2">
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="radio"
                        name="merokok"
                        value="ya"
                        checked={formData.selectedAnggota.merokok === "ya"}
                        onChange={(e) => handleUpdateAnggota(formData.selectedAnggota.id, "merokok", e.target.value)}
                        className="w-4 h-4 text-[#1e88e5]"
                      />
                      <span className="text-sm text-gray-700">1. Ya</span>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="radio"
                        name="merokok"
                        value="tidak"
                        checked={formData.selectedAnggota.merokok === "tidak"}
                        onChange={(e) => handleUpdateAnggota(formData.selectedAnggota.id, "merokok", e.target.value)}
                        className="w-4 h-4 text-[#1e88e5]"
                      />
                      <span className="text-sm text-gray-700">2. Tidak</span>
                    </label>
                  </div>
                </div>

                {/* 233. Persalinan di Fasilitas Kesehatan */}
                <div className="grid grid-cols-3 gap-4 items-start">
                  <label className="text-sm text-gray-700">233. Apakah {formData.selectedAnggota.nama} melakukan persalinan di fasilitas kesehatan (Untuk Wanita Usia 10-49 Tahun dan Pernah Melahirkan)</label>
                  <div className="col-span-2 space-y-2">
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="radio"
                        name="persalinanFaskes"
                        value="ya"
                        checked={formData.selectedAnggota.persalinanFaskes === "ya"}
                        onChange={(e) => handleUpdateAnggota(formData.selectedAnggota.id, "persalinanFaskes", e.target.value)}
                        className="w-4 h-4 text-[#1e88e5]"
                      />
                      <span className="text-sm text-gray-700">1. Ya</span>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="radio"
                        name="persalinanFaskes"
                        value="tidak"
                        checked={formData.selectedAnggota.persalinanFaskes === "tidak"}
                        onChange={(e) => handleUpdateAnggota(formData.selectedAnggota.id, "persalinanFaskes", e.target.value)}
                        className="w-4 h-4 text-[#1e88e5]"
                      />
                      <span className="text-sm text-gray-700">2. Tidak</span>
                    </label>
                  </div>
                </div>

                {/* 239. Pemerlu Pelayanan Kesejahteraan Sosial (PPKS) */}
                <div className="grid grid-cols-3 gap-4 items-start">
                  <div className="text-sm text-gray-700">
                    <p>239. Apakah {formData.selectedAnggota.nama} merupakan Pemerlu Pelayanan Kesejahteraan Sosial (PPKS)?</p>
                    <p className="text-blue-600 text-xs mt-1">Pilihan bisa lebih dari satu</p>
                  </div>
                  <div className="col-span-2 space-y-2">
                    {[
                      { value: "a", label: "a. Anak Balita Terlantar" },
                      { value: "b", label: "b. Anak Berhadapan Dengan Hukum" },
                      { value: "c", label: "c. Anak Dengan Kedisabilitasan" },
                      { value: "d", label: "d. Anak Jalanan" },
                      { value: "e", label: "e. Anak Korban Tindak Kekerasan" },
                      { value: "f", label: "f. Anak Terlantar" },
                      { value: "g", label: "g. Anak Yang Memerlukan Perlindungan Khusus" },
                      { value: "h", label: "h. Bekas Warga Binaan Lembaga Pemasyarakatan" },
                      { value: "i", label: "i. Gelandangan" },
                      { value: "j", label: "j. Keluarga Bermasalah Sosial Psikologis" },
                      { value: "k", label: "k. Keluarga Berumah Tak Layak Huni" },
                      { value: "l", label: "l. Korban Bencana Alam" },
                      { value: "m", label: "m. Korban Bencana Sosial" },
                      { value: "n", label: "n. Korban Penyalahgunaan NAPZA" },
                      { value: "o", label: "o. Korban Tindak Kekerasan" },
                      { value: "p", label: "p. Korban Trafficking" },
                      { value: "q", label: "q. Lanjut Usia Terlantar" },
                      { value: "r", label: "r. Orang Dengan HIV / AIDS (ODHA)" },
                      { value: "s", label: "s. Pekerja Migran Bermasalah Sosial" },
                      { value: "t", label: "t. Pemulung" },
                      { value: "u", label: "u. Pengemis" },
                      { value: "v", label: "v. Penyandang Disabilitas" },
                      { value: "w", label: "w. Perempuan Rawan Sosial Ekonomi" },
                      { value: "x", label: "x. Tuna Susila" },
                      { value: "y", label: "y. Kelompok Minoritas" },
                      { value: "z", label: "z. Bukan PPKS" },
                    ].map((option) => (
                      <label key={option.value} className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={formData.selectedAnggota.ppksTypes?.includes(option.value) || false}
                          onChange={(e) => {
                            const current = formData.selectedAnggota.ppksTypes || []
                            if (e.target.checked) {
                              handleUpdateAnggota(formData.selectedAnggota.id, "ppksTypes", [...current, option.value])
                            } else {
                              handleUpdateAnggota(formData.selectedAnggota.id, "ppksTypes", current.filter(v => v !== option.value))
                            }
                          }}
                          className="w-4 h-4 text-[#1e88e5]"
                        />
                        <span className="text-sm text-gray-700">{option.label}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* III. KETERANGAN PERUMAHAN Section */}
            {activeSection === "keterangan-perumahan" && (
              <div className="bg-white rounded-b-lg shadow p-6 space-y-6">
                {/* Section Header */}
                <div className="bg-[#7c3aed] text-white text-center py-3 rounded-lg">
                  <h3 className="font-medium">III. KETERANGAN PERUMAHAN</h3>
                </div>

                {/* 301.a. Jumlah keluarga yang tinggal dalam 1 rumah (Prelist) */}
                <div className="grid grid-cols-3 gap-4 items-center">
                  <label className="text-sm text-gray-700">301.a. Jumlah keluarga yang tinggal dalam 1 (satu) rumah (Prelist)</label>
                  <div className="col-span-2">
                    <input
                      type="number"
                      value={formData.jumlahKeluargaPrelist || ""}
                      onChange={(e) => setFormData({ ...formData, jumlahKeluargaPrelist: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
                    />
                  </div>
                </div>

                {/* 301.a. Jumlah keluarga yang tinggal dalam 1 rumah */}
                <div className="grid grid-cols-3 gap-4 items-start">
                  <div className="text-sm text-gray-700">
                    <p>301.a. Jumlah keluarga yang tinggal dalam 1 (satu) rumah</p>
                    <p className="text-blue-600 text-xs mt-1">(Sesuai isian rincian 110 - Alamat domisili keluarga)</p>
                  </div>
                  <div className="col-span-2 flex items-center gap-2">
                    <input
                      type="number"
                      value={formData.jumlahKeluarga || "1"}
                      onChange={(e) => setFormData({ ...formData, jumlahKeluarga: e.target.value })}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded text-sm"
                    />
                    <button className="p-2 text-gray-400 hover:text-gray-600 border border-gray-300 rounded">
                      <span className="text-lg">−</span>
                    </button>
                    <button className="p-2 text-gray-400 hover:text-gray-600 border border-gray-300 rounded">
                      <span className="text-lg">+</span>
                    </button>
                  </div>
                </div>

                {/* 301.b. Jumlah kamar tidur */}
                <div className="grid grid-cols-3 gap-4 items-center">
                  <label className="text-sm text-gray-700">301.b. Jumlah kamar tidur</label>
                  <div className="col-span-2 flex items-center gap-2">
                    <input
                      type="number"
                      value={formData.jumlahKamarTidur || "2"}
                      onChange={(e) => setFormData({ ...formData, jumlahKamarTidur: e.target.value })}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded text-sm"
                    />
                    <button className="p-2 text-gray-400 hover:text-gray-600 border border-gray-300 rounded">
                      <span className="text-lg">−</span>
                    </button>
                    <button className="p-2 text-gray-400 hover:text-gray-600 border border-gray-300 rounded">
                      <span className="text-lg">+</span>
                    </button>
                  </div>
                </div>

                {/* 301.c. Anak tanggungan tidak tinggal serumah */}
                <div className="grid grid-cols-3 gap-4 items-start">
                  <label className="text-sm text-gray-700">301.c. Apakah ada anak dari kepala keluarga yang masih menjadi tanggungan tetapi sedang sekolah/kuliah dan tidak tinggal dalam rumah tangga ini</label>
                  <div className="col-span-2 space-y-2">
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="radio"
                        name="anakTanggunganTidakSerumah"
                        value="ya"
                        checked={formData.anakTanggunganTidakSerumah === "ya"}
                        onChange={(e) => setFormData({ ...formData, anakTanggunganTidakSerumah: e.target.value })}
                        className="w-4 h-4 text-[#1e88e5]"
                      />
                      <span className="text-sm text-gray-700">1. Ya</span>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="radio"
                        name="anakTanggunganTidakSerumah"
                        value="tidak"
                        checked={formData.anakTanggunganTidakSerumah === "tidak"}
                        onChange={(e) => setFormData({ ...formData, anakTanggunganTidakSerumah: e.target.value })}
                        className="w-4 h-4 text-[#1e88e5]"
                      />
                      <span className="text-sm text-gray-700">2. Tidak</span>
                    </label>
                  </div>
                </div>

                {/* 302. Status kepemilikan bangunan (Prelist) */}
                <div className="grid grid-cols-3 gap-4 items-center">
                  <label className="text-sm text-gray-700">302. Status kepemilikan bangunan tempat tinggal yang ditempati (Prelist)</label>
                  <div className="col-span-2">
                    <input
                      type="text"
                      value={formData.statusBangunanPrelist || "1. Milik sendiri"}
                      onChange={(e) => setFormData({ ...formData, statusBangunanPrelist: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded text-sm bg-gray-50"
                      readOnly
                    />
                  </div>
                </div>

                {/* 302. Status kepemilikan bangunan */}
                <div className="grid grid-cols-3 gap-4 items-start">
                  <div className="text-sm text-gray-700">
                    <p>302. Status kepemilikan bangunan tempat tinggal yang ditempati</p>
                    <p className="text-blue-600 text-xs mt-1">(Sesuai isian rincian 110 - Alamat domisili keluarga)</p>
                  </div>
                  <div className="col-span-2 space-y-2">
                    {[
                      { value: "1", label: "1. Milik sendiri" },
                      { value: "2", label: "2. Kontrak/sewa" },
                      { value: "3", label: "3. Bebas sewa" },
                      { value: "4", label: "4. Dinas" },
                      { value: "5", label: "5. Lainnya" },
                    ].map((option) => (
                      <label key={option.value} className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="radio"
                          name="statusBangunan"
                          value={option.value}
                          checked={formData.statusBangunan === option.value}
                          onChange={(e) => setFormData({ ...formData, statusBangunan: e.target.value })}
                          className="w-4 h-4 text-[#1e88e5]"
                        />
                        <span className="text-sm text-gray-700">{option.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* 302.a. Status kepemilikan lahan bangunan */}
                <div className="grid grid-cols-3 gap-4 items-start">
                  <div className="text-sm text-gray-700">
                    <p>302.a. Status kepemilikan lahan bangunan tempat tinggal yang ditempati</p>
                    <p className="text-blue-600 text-xs mt-1">(Sesuai isian rincian 110 - Alamat domisili keluarga)</p>
                  </div>
                  <div className="col-span-2 space-y-2">
                    {[
                      { value: "1", label: "1. Milik sendiri" },
                      { value: "2", label: "2. Kontrak/sewa" },
                      { value: "3", label: "3. Bebas sewa" },
                      { value: "4", label: "4. Dinas" },
                      { value: "5", label: "5. Lainnya" },
                    ].map((option) => (
                      <label key={option.value} className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="radio"
                          name="statusLahanBangunan"
                          value={option.value}
                          checked={formData.statusLahanBangunan === option.value}
                          onChange={(e) => setFormData({ ...formData, statusLahanBangunan: e.target.value })}
                          className="w-4 h-4 text-[#1e88e5]"
                        />
                        <span className="text-sm text-gray-700">{option.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* 303. Luas lantai bangunan */}
                <div className="grid grid-cols-3 gap-4 items-start">
                  <div className="text-sm text-gray-700">
                    <p>303. Luas lantai bangunan tempat tinggal ... (m²)</p>
                    <p className="text-blue-600 text-xs mt-1">(Sesuai isian rincian 110 - Alamat domisili keluarga)</p>
                  </div>
                  <div className="col-span-2 flex items-center gap-2">
                    <input
                      type="number"
                      value={formData.luasLantai || "40"}
                      onChange={(e) => setFormData({ ...formData, luasLantai: e.target.value })}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded text-sm"
                    />
                    <button className="p-2 text-gray-400 hover:text-gray-600 border border-gray-300 rounded">
                      <span className="text-lg">−</span>
                    </button>
                    <button className="p-2 text-gray-400 hover:text-gray-600 border border-gray-300 rounded">
                      <span className="text-lg">+</span>
                    </button>
                  </div>
                </div>

                {/* 304. Jenis lantai terluas (Prelist) */}
                <div className="grid grid-cols-3 gap-4 items-center">
                  <label className="text-sm text-gray-700">304. Jenis lantai terluas (Prelist)</label>
                  <div className="col-span-2">
                    <input
                      type="text"
                      value={formData.jenisLantaiPrelist || "02. Keramik"}
                      onChange={(e) => setFormData({ ...formData, jenisLantaiPrelist: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded text-sm bg-gray-50"
                      readOnly
                    />
                  </div>
                </div>

                {/* 304. Jenis lantai terluas */}
                <div className="grid grid-cols-3 gap-4 items-start">
                  <div className="text-sm text-gray-700">
                    <p>304. Jenis lantai terluas</p>
                    <p className="text-blue-600 text-xs mt-1">(Sesuai isian rincian 110 - Alamat domisili keluarga)</p>
                  </div>
                  <div className="col-span-2 space-y-2">
                    {[
                      { value: "01", label: "01. Marmer/granit" },
                      { value: "02", label: "02. Keramik" },
                      { value: "03", label: "03. Parket/vinil/karpet" },
                      { value: "04", label: "04. Ubin/tegel/teraso" },
                      { value: "05", label: "05. Kayu/papan" },
                      { value: "06", label: "06. Semen/bata merah" },
                      { value: "07", label: "07. Bambu" },
                      { value: "08", label: "08. Tanah" },
                      { value: "09", label: "09. Lainnya" },
                    ].map((option) => (
                      <label key={option.value} className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="radio"
                          name="jenisLantai"
                          value={option.value}
                          checked={formData.jenisLantai === option.value}
                          onChange={(e) => setFormData({ ...formData, jenisLantai: e.target.value })}
                          className="w-4 h-4 text-[#1e88e5]"
                        />
                        <span className="text-sm text-gray-700">{option.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* 305. Jenis dinding terluas (Prelist) */}
                <div className="grid grid-cols-3 gap-4 items-center">
                  <label className="text-sm text-gray-700">305. Jenis dinding terluas (Prelist)</label>
                  <div className="col-span-2">
                    <input
                      type="text"
                      value={formData.jenisDindingPrelist || "1. Tembok"}
                      onChange={(e) => setFormData({ ...formData, jenisDindingPrelist: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded text-sm bg-gray-50"
                      readOnly
                    />
                  </div>
                </div>

                {/* 305. Jenis dinding terluas */}
                <div className="grid grid-cols-3 gap-4 items-start">
                  <div className="text-sm text-gray-700">
                    <p>305. Jenis dinding terluas</p>
                    <p className="text-blue-600 text-xs mt-1">(Sesuai isian rincian 110 - Alamat domisili keluarga)</p>
                  </div>
                  <div className="col-span-2 space-y-2">
                    {[
                      { value: "1", label: "1. Tembok" },
                      { value: "2", label: "2. Plesteran anyaman bambu/kawat" },
                      { value: "3", label: "3. Kayu/papan/gypsum/GRC/calciboard" },
                      { value: "4", label: "4. Anyaman bambu" },
                      { value: "5", label: "5. Batang kayu" },
                      { value: "6", label: "6. Bambu" },
                      { value: "7", label: "7. Lainnya" },
                    ].map((option) => (
                      <label key={option.value} className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="radio"
                          name="jenisDinding"
                          value={option.value}
                          checked={formData.jenisDinding === option.value}
                          onChange={(e) => setFormData({ ...formData, jenisDinding: e.target.value })}
                          className="w-4 h-4 text-[#1e88e5]"
                        />
                        <span className="text-sm text-gray-700">{option.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* 306. Jenis atap terluas (Prelist) */}
                <div className="grid grid-cols-3 gap-4 items-center">
                  <label className="text-sm text-gray-700">306. Jenis atap terluas (Prelist)</label>
                  <div className="col-span-2">
                    <input
                      type="text"
                      value={formData.jenisAtapPrelist || "2. Genteng"}
                      onChange={(e) => setFormData({ ...formData, jenisAtapPrelist: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded text-sm bg-gray-50"
                      readOnly
                    />
                  </div>
                </div>

                {/* 306. Jenis atap terluas */}
                <div className="grid grid-cols-3 gap-4 items-start">
                  <div className="text-sm text-gray-700">
                    <p>306. Jenis atap terluas</p>
                    <p className="text-blue-600 text-xs mt-1">(Sesuai isian rincian 110 - Alamat domisili keluarga)</p>
                  </div>
                  <div className="col-span-2 space-y-2">
                    {[
                      { value: "1", label: "1. Beton" },
                      { value: "2", label: "2. Genteng" },
                      { value: "3", label: "3. Seng" },
                      { value: "4", label: "4. Asbes" },
                      { value: "5", label: "5. Bambu" },
                      { value: "6", label: "6. Kayu/sirap" },
                      { value: "7", label: "7. Jerami/ijuk/daun-daunan/rumbia" },
                      { value: "8", label: "8. Lainnya" },
                    ].map((option) => (
                      <label key={option.value} className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="radio"
                          name="jenisAtap"
                          value={option.value}
                          checked={formData.jenisAtap === option.value}
                          onChange={(e) => setFormData({ ...formData, jenisAtap: e.target.value })}
                          className="w-4 h-4 text-[#1e88e5]"
                        />
                        <span className="text-sm text-gray-700">{option.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* 307.a. Sumber air minum utama (Prelist) */}
                <div className="grid grid-cols-3 gap-4 items-center">
                  <label className="text-sm text-gray-700">307.a. Sumber air minum utama (Prelist)</label>
                  <div className="col-span-2">
                    <input
                      type="text"
                      value={formData.sumberAirMinumPrelist || ""}
                      onChange={(e) => setFormData({ ...formData, sumberAirMinumPrelist: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded text-sm bg-gray-50"
                      readOnly
                    />
                  </div>
                </div>

                {/* 307.a. Sumber air minum utama */}
                <div className="grid grid-cols-3 gap-4 items-start">
                  <div className="text-sm text-gray-700">
                    <p>307.a. Sumber air minum utama</p>
                    <p className="text-blue-600 text-xs mt-1">(Sesuai isian rincian 110 - Alamat domisili keluarga)</p>
                  </div>
                  <div className="col-span-2 space-y-2">
                    {[
                      { value: "01", label: "01. Air kemasan bermerk" },
                      { value: "02", label: "02. Air isi ulang" },
                      { value: "03", label: "03. Leding" },
                      { value: "04", label: "04. Sumur bor/pompa" },
                      { value: "05", label: "05. Sumur terlindung" },
                      { value: "06", label: "06. Sumur tak terlindung" },
                      { value: "07", label: "07. Mata air terlindung" },
                      { value: "08", label: "08. Mata air tak terlindung" },
                      { value: "09", label: "09. Air permukaan (sungai/danau/waduk/kolam/irigasi)" },
                      { value: "10", label: "10. Air hujan" },
                      { value: "11", label: "11. Lainnya" },
                    ].map((option) => (
                      <label key={option.value} className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="radio"
                          name="sumberAirMinum"
                          value={option.value}
                          checked={formData.sumberAirMinum === option.value}
                          onChange={(e) => setFormData({ ...formData, sumberAirMinum: e.target.value })}
                          className="w-4 h-4 text-[#1e88e5]"
                        />
                        <span className="text-sm text-gray-700">{option.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* 307.c. Cara memperoleh air minum */}
                <div className="grid grid-cols-3 gap-4 items-start">
                  <label className="text-sm text-gray-700">307.c. Cara memperoleh air minum</label>
                  <div className="col-span-2 space-y-2">
                    {[
                      { value: "1", label: "1. Membeli eceran" },
                      { value: "2", label: "2. Langganan" },
                      { value: "3", label: "3. Tidak membeli" },
                    ].map((option) => (
                      <label key={option.value} className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="radio"
                          name="caraPerolehAirMinum"
                          value={option.value}
                          checked={formData.caraPerolehAirMinum === option.value}
                          onChange={(e) => setFormData({ ...formData, caraPerolehAirMinum: e.target.value })}
                          className="w-4 h-4 text-[#1e88e5]"
                        />
                        <span className="text-sm text-gray-700">{option.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* 308.a. Sumber penerangan utama (Prelist) */}
                <div className="grid grid-cols-3 gap-4 items-center">
                  <label className="text-sm text-gray-700">308.a. Sumber penerangan utama (Prelist)</label>
                  <div className="col-span-2">
                    <input
                      type="text"
                      value={formData.sumberPeneranganPrelist || "1. Listrik PLN dengan meteran"}
                      onChange={(e) => setFormData({ ...formData, sumberPeneranganPrelist: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded text-sm bg-gray-50"
                      readOnly
                    />
                  </div>
                </div>

                {/* 308.a. Sumber penerangan utama */}
                <div className="grid grid-cols-3 gap-4 items-start">
                  <div className="text-sm text-gray-700">
                    <p>308.a. Sumber penerangan utama</p>
                    <p className="text-blue-600 text-xs mt-1">(Sesuai isian rincian 110 - Alamat domisili keluarga)</p>
                  </div>
                  <div className="col-span-2 space-y-2">
                    {[
                      { value: "1", label: "1. Listrik PLN dengan meteran" },
                      { value: "2", label: "2. Listrik PLN tanpa meteran" },
                      { value: "3", label: "3. Listrik non-PLN" },
                      { value: "4", label: "4. Bukan listrik" },
                    ].map((option) => (
                      <label key={option.value} className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="radio"
                          name="sumberPenerangan"
                          value={option.value}
                          checked={formData.sumberPenerangan === option.value}
                          onChange={(e) => setFormData({ ...formData, sumberPenerangan: e.target.value })}
                          className="w-4 h-4 text-[#1e88e5]"
                        />
                        <span className="text-sm text-gray-700">{option.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* 308.b. Jumlah meteran listrik terpasang (Prelist) */}
                <div className="grid grid-cols-3 gap-4 items-center">
                  <label className="text-sm text-gray-700">308.b. Jumlah meteran listrik terpasang? (Prelist)</label>
                  <div className="col-span-2">
                    <input
                      type="number"
                      value={formData.jumlahMeteranPrelist || "1"}
                      onChange={(e) => setFormData({ ...formData, jumlahMeteranPrelist: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded text-sm bg-gray-50"
                      readOnly
                    />
                  </div>
                </div>

                {/* 308.b. Jumlah meteran listrik terpasang */}
                <div className="grid grid-cols-3 gap-4 items-center">
                  <label className="text-sm text-gray-700">308.b. Jumlah meteran listrik terpasang?</label>
                  <div className="col-span-2 flex items-center gap-2">
                    <input
                      type="number"
                      value={formData.jumlahMeteran || "1"}
                      onChange={(e) => setFormData({ ...formData, jumlahMeteran: e.target.value })}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded text-sm"
                    />
                    <button className="p-2 text-gray-400 hover:text-gray-600 border border-gray-300 rounded">
                      <span className="text-lg">−</span>
                    </button>
                    <button className="p-2 text-gray-400 hover:text-gray-600 border border-gray-300 rounded">
                      <span className="text-lg">+</span>
                    </button>
                  </div>
                </div>

                {/* 308.b. Jumlah meteran listrik terpasang (dengan View) */}
                <div className="grid grid-cols-3 gap-4 items-center">
                  <label className="text-sm text-gray-700">308.b. Jumlah meteran listrik terpasang?</label>
                  <div className="col-span-2 flex items-center gap-2">
                    <input
                      type="number"
                      value={formData.jumlahMeteranView || "1"}
                      onChange={(e) => setFormData({ ...formData, jumlahMeteranView: e.target.value })}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded text-sm"
                    />
                    <button className="px-4 py-2 bg-[#1e88e5] text-white rounded hover:bg-[#1976d2] transition-colors text-sm">
                      + View
                    </button>
                  </div>
                </div>

                {/* 309. Bahan bakar/energi utama untuk memasak (Prelist) */}
                <div className="grid grid-cols-3 gap-4 items-center">
                  <label className="text-sm text-gray-700">309. Bahan bakar/energi utama untuk memasak (Prelist)</label>
                  <div className="col-span-2">
                    <input
                      type="text"
                      value={formData.bahanBakarPrelist || "04. Gas elpiji 3 kg"}
                      onChange={(e) => setFormData({ ...formData, bahanBakarPrelist: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded text-sm bg-gray-50"
                      readOnly
                    />
                  </div>
                </div>

                {/* 309. Bahan bakar/energi utama untuk memasak */}
                <div className="grid grid-cols-3 gap-4 items-start">
                  <div className="text-sm text-gray-700">
                    <p>309. Bahan bakar/energi utama untuk memasak</p>
                    <p className="text-blue-600 text-xs mt-1">(Sesuai isian rincian 110 - Alamat domisili keluarga)</p>
                  </div>
                  <div className="col-span-2 space-y-2">
                    {[
                      { value: "00", label: "00. Tidak memasak di rumah" },
                      { value: "01", label: "01. Listrik" },
                      { value: "02", label: "02. Gas elpiji 5,5kg" },
                      { value: "03", label: "03. Gas elpiji 12 kg" },
                      { value: "04", label: "04. Gas elpiji 3 kg" },
                      { value: "05", label: "05. Gas kota/meteran PGN" },
                      { value: "06", label: "06. Biogas" },
                      { value: "07", label: "07. Minyak tanah" },
                      { value: "08", label: "08. Briket" },
                      { value: "09", label: "09. Arang" },
                      { value: "10", label: "10. Kayu bakar" },
                      { value: "11", label: "11. Lainnya" },
                    ].map((option) => (
                      <label key={option.value} className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="radio"
                          name="bahanBakar"
                          value={option.value}
                          checked={formData.bahanBakar === option.value}
                          onChange={(e) => setFormData({ ...formData, bahanBakar: e.target.value })}
                          className="w-4 h-4 text-[#1e88e5]"
                        />
                        <span className="text-sm text-gray-700">{option.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* 310.a. Kepemilikan dan penggunaan fasilitas tempat buang air besar (Prelist) */}
                <div className="grid grid-cols-3 gap-4 items-center">
                  <label className="text-sm text-gray-700">310.a. Kepemilikan dan penggunaan fasilitas tempat buang air besar (Prelist)</label>
                  <div className="col-span-2">
                    <input
                      type="text"
                      value={formData.fasilitasBABPrelist || "1. Ada, digunakan hanya Anggota Keluarga sendiri"}
                      onChange={(e) => setFormData({ ...formData, fasilitasBABPrelist: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded text-sm bg-gray-50"
                      readOnly
                    />
                  </div>
                </div>

                {/* 310.a. Kepemilikan dan penggunaan fasilitas tempat buang air besar */}
                <div className="grid grid-cols-3 gap-4 items-start">
                  <div className="text-sm text-gray-700">
                    <p>310.a. Kepemilikan dan penggunaan fasilitas tempat buang air besar</p>
                    <p className="text-blue-600 text-xs mt-1">(Sesuai isian rincian 110 - Alamat domisili keluarga)</p>
                  </div>
                  <div className="col-span-2 space-y-2">
                    {[
                      { value: "1", label: "1. Ada, digunakan hanya Anggota Keluarga sendiri" },
                      { value: "2", label: "2. Ada, digunakan bersama Anggota Keluarga dari Keluarga tertentu" },
                      { value: "3", label: "3. Ada, di MCK komunal" },
                      { value: "4", label: "4. Ada, di MCK umum/siapapun menggunakan" },
                      { value: "5", label: "5. Ada, Anggota Keluarga tidak menggunakan" },
                      { value: "6", label: "6. Tidak ada fasilitas" },
                    ].map((option) => (
                      <label key={option.value} className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="radio"
                          name="fasilitasBAB"
                          value={option.value}
                          checked={formData.fasilitasBAB === option.value}
                          onChange={(e) => setFormData({ ...formData, fasilitasBAB: e.target.value })}
                          className="w-4 h-4 text-[#1e88e5]"
                        />
                        <span className="text-sm text-gray-700">{option.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* 310.b. Jenis kloset yang digunakan (Prelist) */}
                <div className="grid grid-cols-3 gap-4 items-center">
                  <label className="text-sm text-gray-700">310.b. Jenis kloset yang digunakan (Prelist)</label>
                  <div className="col-span-2">
                    <input
                      type="text"
                      value={formData.jenisKlosetPrelist || "1. Leher angsa"}
                      onChange={(e) => setFormData({ ...formData, jenisKlosetPrelist: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded text-sm bg-gray-50"
                      readOnly
                    />
                  </div>
                </div>

                {/* 310.b. Jenis kloset yang digunakan */}
                <div className="grid grid-cols-3 gap-4 items-start">
                  <div className="text-sm text-gray-700">
                    <p>310.b. Jenis kloset yang digunakan</p>
                    <p className="text-blue-600 text-xs mt-1">(Sesuai isian rincian 110 - Alamat domisili keluarga)</p>
                  </div>
                  <div className="col-span-2 space-y-2">
                    {[
                      { value: "1", label: "1. Leher angsa" },
                      { value: "2", label: "2. Plengsengan dengan tutup" },
                      { value: "3", label: "3. Plengsengan tanpa tutup" },
                      { value: "4", label: "4. Cemplung/cubluk" },
                    ].map((option) => (
                      <label key={option.value} className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="radio"
                          name="jenisKloset"
                          value={option.value}
                          checked={formData.jenisKloset === option.value}
                          onChange={(e) => setFormData({ ...formData, jenisKloset: e.target.value })}
                          className="w-4 h-4 text-[#1e88e5]"
                        />
                        <span className="text-sm text-gray-700">{option.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* 311. Tempat pembuangan akhir tinja (Prelist) */}
                <div className="grid grid-cols-3 gap-4 items-center">
                  <label className="text-sm text-gray-700">311. Tempat pembuangan akhir tinja (Prelist)</label>
                  <div className="col-span-2">
                    <input
                      type="text"
                      value={formData.tempatPembuanganTinjaPrelist || "1. Tangki septik"}
                      onChange={(e) => setFormData({ ...formData, tempatPembuanganTinjaPrelist: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded text-sm bg-gray-50"
                      readOnly
                    />
                  </div>
                </div>

                {/* 311. Tempat pembuangan akhir tinja */}
                <div className="grid grid-cols-3 gap-4 items-start">
                  <div className="text-sm text-gray-700">
                    <p>311. Tempat pembuangan akhir tinja</p>
                    <p className="text-blue-600 text-xs mt-1">(Sesuai isian rincian 110 - Alamat domisili keluarga)</p>
                  </div>
                  <div className="col-span-2 space-y-2">
                    {[
                      { value: "1", label: "1. Tangki septik" },
                      { value: "2", label: "2. IPAL" },
                      { value: "3", label: "3. Kolam/sawah/sungai/danau/laut" },
                      { value: "4", label: "4. Lubang tanah" },
                      { value: "5", label: "5. Pantai/tanah lapang/kebun" },
                      { value: "6", label: "6. Lainnya" },
                    ].map((option) => (
                      <label key={option.value} className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="radio"
                          name="tempatPembuanganTinja"
                          value={option.value}
                          checked={formData.tempatPembuanganTinja === option.value}
                          onChange={(e) => setFormData({ ...formData, tempatPembuanganTinja: e.target.value })}
                          className="w-4 h-4 text-[#1e88e5]"
                        />
                        <span className="text-sm text-gray-700">{option.label}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Daya yang terpasang di rumah ini Section */}
            {activeSection === "daya-listrik" && (
              <div className="bg-white rounded-b-lg shadow p-6 space-y-6">
                {/* Section Header */}
                <div className="bg-[#7c3aed] text-white text-center py-3 rounded-lg">
                  <h3 className="font-medium">Keterangan Daya Terpasang</h3>
                </div>

                {/* Meteran Ke */}
                <div className="grid grid-cols-3 gap-4 items-center">
                  <label className="text-sm text-gray-700">Meteran Ke- *</label>
                  <div className="col-span-2">
                    <input
                      type="text"
                      value={formData.meteranKe || "1"}
                      onChange={(e) => setFormData({ ...formData, meteranKe: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
                    />
                  </div>
                </div>

                {/* 308.c. Daya terpasang */}
                <div className="grid grid-cols-3 gap-4 items-start">
                  <label className="text-sm text-gray-700">308.c. Daya terpasang *</label>
                  <div className="col-span-2 space-y-2">
                    {[
                      { value: "1", label: "1. 450 watt" },
                      { value: "2", label: "2. 900 watt" },
                      { value: "3", label: "3. 1.300 watt" },
                      { value: "4", label: "4. 2.200 watt" },
                      { value: "5", label: "5. >2.200 watt" },
                    ].map((option) => (
                      <label key={option.value} className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="radio"
                          name="dayaTerpasang"
                          value={option.value}
                          checked={formData.dayaTerpasang === option.value}
                          onChange={(e) => setFormData({ ...formData, dayaTerpasang: e.target.value })}
                          className="w-4 h-4 text-[#1e88e5]"
                        />
                        <span className="text-sm text-gray-700">{option.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* 308.d. ID Pelanggan PLN */}
                <div className="grid grid-cols-3 gap-4 items-center">
                  <label className="text-sm text-gray-700">308.d. ID Pelanggan PLN *</label>
                  <div className="col-span-2">
                    <input
                      type="text"
                      value={formData.idPelangganPLN || ""}
                      onChange={(e) => setFormData({ ...formData, idPelangganPLN: e.target.value })}
                      placeholder="512143078890"
                      className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
                    />
                  </div>
                </div>

                {/* 308.e. Biaya listrik dalam 1 bulan */}
                <div className="grid grid-cols-3 gap-4 items-center">
                  <label className="text-sm text-gray-700">308.e. Biaya listrik dalam 1 bulan *</label>
                  <div className="col-span-2 flex items-center gap-2">
                    <span className="text-sm text-gray-500 bg-gray-100 px-3 py-2 rounded-l border border-r-0 border-gray-300">IDR</span>
                    <input
                      type="text"
                      value={formData.biayaListrik || ""}
                      onChange={(e) => setFormData({ ...formData, biayaListrik: e.target.value })}
                      placeholder="200,000"
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-r text-sm"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* IV. KEPEMILIKAN ASET Section */}
            {activeSection === "kepemilikan-aset" && (
              <div className="bg-white rounded-b-lg shadow p-6 space-y-6">
                {/* Section Header */}
                <div className="bg-[#7c3aed] text-white text-center py-3 rounded-lg">
                  <h3 className="font-medium">IV. KEPEMILIKAN ASET</h3>
                </div>

                {/* 401. Intro text */}
                <div className="text-sm text-gray-700">
                  <p>401. Berapa jumlah aset bergerak berikut yang dimiliki oleh keluarga <span className="text-blue-600 font-medium">SUKMAWATI</span> saat ini:</p>
                </div>

                {/* 401a. Jumlah tabung gas minimal 5.5kg */}
                <div className="grid grid-cols-3 gap-4 items-center">
                  <label className="text-sm text-gray-700">401a. Jumlah <span className="text-blue-600">tabung gas minimal 5.5kg</span> yang dimiliki *</label>
                  <div className="col-span-2 flex items-center gap-2">
                    <input
                      type="number"
                      value={formData.jumlahTabungGas || "0"}
                      onChange={(e) => setFormData({ ...formData, jumlahTabungGas: e.target.value })}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded text-sm"
                    />
                    <button className="p-2 text-gray-400 hover:text-gray-600 border border-gray-300 rounded">
                      <span className="text-lg">−</span>
                    </button>
                    <button className="p-2 text-gray-400 hover:text-gray-600 border border-gray-300 rounded">
                      <span className="text-lg">+</span>
                    </button>
                  </div>
                </div>

                {/* 401b. Jumlah lemari es atau kulkas */}
                <div className="grid grid-cols-3 gap-4 items-center">
                  <label className="text-sm text-gray-700">401b. Jumlah <span className="text-blue-600">lemari es atau kulkas</span> yang dimiliki *</label>
                  <div className="col-span-2 flex items-center gap-2">
                    <input
                      type="number"
                      value={formData.jumlahLemariEs || "1"}
                      onChange={(e) => setFormData({ ...formData, jumlahLemariEs: e.target.value })}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded text-sm"
                    />
                    <button className="p-2 text-gray-400 hover:text-gray-600 border border-gray-300 rounded">
                      <span className="text-lg">−</span>
                    </button>
                    <button className="p-2 text-gray-400 hover:text-gray-600 border border-gray-300 rounded">
                      <span className="text-lg">+</span>
                    </button>
                  </div>
                </div>

                {/* 401c. Jumlah AC */}
                <div className="grid grid-cols-3 gap-4 items-center">
                  <label className="text-sm text-gray-700">401c. Jumlah <span className="text-blue-600">AC (Air Conditioner)</span> yang dimiliki *</label>
                  <div className="col-span-2 flex items-center gap-2">
                    <input
                      type="number"
                      value={formData.jumlahAC || "0"}
                      onChange={(e) => setFormData({ ...formData, jumlahAC: e.target.value })}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded text-sm"
                    />
                    <button className="p-2 text-gray-400 hover:text-gray-600 border border-gray-300 rounded">
                      <span className="text-lg">−</span>
                    </button>
                    <button className="p-2 text-gray-400 hover:text-gray-600 border border-gray-300 rounded">
                      <span className="text-lg">+</span>
                    </button>
                  </div>
                </div>

                {/* 401d. Jumlah pemanas air */}
                <div className="grid grid-cols-3 gap-4 items-center">
                  <label className="text-sm text-gray-700">401d. Jumlah <span className="text-blue-600">pemanas air (Water Heater)</span> *</label>
                  <div className="col-span-2 flex items-center gap-2">
                    <input
                      type="number"
                      value={formData.jumlahWaterHeater || "0"}
                      onChange={(e) => setFormData({ ...formData, jumlahWaterHeater: e.target.value })}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded text-sm"
                    />
                    <button className="p-2 text-gray-400 hover:text-gray-600 border border-gray-300 rounded">
                      <span className="text-lg">−</span>
                    </button>
                    <button className="p-2 text-gray-400 hover:text-gray-600 border border-gray-300 rounded">
                      <span className="text-lg">+</span>
                    </button>
                  </div>
                </div>

                {/* 401e. Jumlah telepon rumah atau PSTN */}
                <div className="grid grid-cols-3 gap-4 items-center">
                  <label className="text-sm text-gray-700">401e. Jumlah <span className="text-blue-600">telepon rumah atau PSTN</span> yang dimiliki *</label>
                  <div className="col-span-2 flex items-center gap-2">
                    <input
                      type="number"
                      value={formData.jumlahTeleponRumah || "0"}
                      onChange={(e) => setFormData({ ...formData, jumlahTeleponRumah: e.target.value })}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded text-sm"
                    />
                    <button className="p-2 text-gray-400 hover:text-gray-600 border border-gray-300 rounded">
                      <span className="text-lg">−</span>
                    </button>
                    <button className="p-2 text-gray-400 hover:text-gray-600 border border-gray-300 rounded">
                      <span className="text-lg">+</span>
                    </button>
                  </div>
                </div>

                {/* 401f. Jumlah televisi datar */}
                <div className="grid grid-cols-3 gap-4 items-center">
                  <label className="text-sm text-gray-700">401f. Jumlah <span className="text-blue-600">televisi datar (min. 30 inch)</span> yang dimiliki *</label>
                  <div className="col-span-2 flex items-center gap-2">
                    <input
                      type="number"
                      value={formData.jumlahTV || "1"}
                      onChange={(e) => setFormData({ ...formData, jumlahTV: e.target.value })}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded text-sm"
                    />
                    <button className="p-2 text-gray-400 hover:text-gray-600 border border-gray-300 rounded">
                      <span className="text-lg">−</span>
                    </button>
                    <button className="p-2 text-gray-400 hover:text-gray-600 border border-gray-300 rounded">
                      <span className="text-lg">+</span>
                    </button>
                  </div>
                </div>

                {/* 401g. Banyaknya Emas/perhiasan */}
                <div className="grid grid-cols-3 gap-4 items-center">
                  <label className="text-sm text-gray-700">401g. Banyaknya <span className="text-blue-600">Emas/perhiasan (gram)</span> *</label>
                  <div className="col-span-2 flex items-center gap-2">
                    <input
                      type="number"
                      value={formData.beratEmas || "0"}
                      onChange={(e) => setFormData({ ...formData, beratEmas: e.target.value })}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded text-sm"
                    />
                    <button className="p-2 text-gray-400 hover:text-gray-600 border border-gray-300 rounded">
                      <span className="text-lg">−</span>
                    </button>
                    <button className="p-2 text-gray-400 hover:text-gray-600 border border-gray-300 rounded">
                      <span className="text-lg">+</span>
                    </button>
                  </div>
                </div>

                {/* 401h. Jumlah Komputer/Laptop/Tablet */}
                <div className="grid grid-cols-3 gap-4 items-center">
                  <label className="text-sm text-gray-700">401h. Jumlah <span className="text-blue-600">Komputer/Laptop/Tablet</span> yang dimiliki *</label>
                  <div className="col-span-2 flex items-center gap-2">
                    <input
                      type="number"
                      value={formData.jumlahKomputer || "0"}
                      onChange={(e) => setFormData({ ...formData, jumlahKomputer: e.target.value })}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded text-sm"
                    />
                    <button className="p-2 text-gray-400 hover:text-gray-600 border border-gray-300 rounded">
                      <span className="text-lg">−</span>
                    </button>
                    <button className="p-2 text-gray-400 hover:text-gray-600 border border-gray-300 rounded">
                      <span className="text-lg">+</span>
                    </button>
                  </div>
                </div>

                {/* 401i. Jumlah sepeda motor */}
                <div className="grid grid-cols-3 gap-4 items-center">
                  <label className="text-sm text-gray-700">401i. Jumlah <span className="text-blue-600">sepeda motor</span> yang dimiliki *</label>
                  <div className="col-span-2 flex items-center gap-2">
                    <input
                      type="number"
                      value={formData.jumlahMotor || "2"}
                      onChange={(e) => setFormData({ ...formData, jumlahMotor: e.target.value })}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded text-sm"
                    />
                    <button className="p-2 text-gray-400 hover:text-gray-600 border border-gray-300 rounded">
                      <span className="text-lg">−</span>
                    </button>
                    <button className="p-2 text-gray-400 hover:text-gray-600 border border-gray-300 rounded">
                      <span className="text-lg">+</span>
                    </button>
                  </div>
                </div>

                {/* 401j. Jumlah sepeda */}
                <div className="grid grid-cols-3 gap-4 items-center">
                  <label className="text-sm text-gray-700">401j. Jumlah <span className="text-blue-600">sepeda</span> yang dimiliki *</label>
                  <div className="col-span-2 flex items-center gap-2">
                    <input
                      type="number"
                      value={formData.jumlahSepeda || "0"}
                      onChange={(e) => setFormData({ ...formData, jumlahSepeda: e.target.value })}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded text-sm"
                    />
                    <button className="p-2 text-gray-400 hover:text-gray-600 border border-gray-300 rounded">
                      <span className="text-lg">−</span>
                    </button>
                    <button className="p-2 text-gray-400 hover:text-gray-600 border border-gray-300 rounded">
                      <span className="text-lg">+</span>
                    </button>
                  </div>
                </div>

                {/* 401k. Jumlah mobil */}
                <div className="grid grid-cols-3 gap-4 items-center">
                  <label className="text-sm text-gray-700">401k. Jumlah <span className="text-blue-600">mobil</span> yang dimiliki *</label>
                  <div className="col-span-2 flex items-center gap-2">
                    <input
                      type="number"
                      value={formData.jumlahMobil || "0"}
                      onChange={(e) => setFormData({ ...formData, jumlahMobil: e.target.value })}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded text-sm"
                    />
                    <button className="p-2 text-gray-400 hover:text-gray-600 border border-gray-300 rounded">
                      <span className="text-lg">−</span>
                    </button>
                    <button className="p-2 text-gray-400 hover:text-gray-600 border border-gray-300 rounded">
                      <span className="text-lg">+</span>
                    </button>
                  </div>
                </div>

                {/* 401l. Jumlah perahu */}
                <div className="grid grid-cols-3 gap-4 items-center">
                  <label className="text-sm text-gray-700">401l. Jumlah <span className="text-blue-600">perahu</span> yang dimiliki *</label>
                  <div className="col-span-2 flex items-center gap-2">
                    <input
                      type="number"
                      value={formData.jumlahPerahu || "0"}
                      onChange={(e) => setFormData({ ...formData, jumlahPerahu: e.target.value })}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded text-sm"
                    />
                    <button className="p-2 text-gray-400 hover:text-gray-600 border border-gray-300 rounded">
                      <span className="text-lg">−</span>
                    </button>
                    <button className="p-2 text-gray-400 hover:text-gray-600 border border-gray-300 rounded">
                      <span className="text-lg">+</span>
                    </button>
                  </div>
                </div>

                {/* 401n. Jumlah smartphone */}
                <div className="grid grid-cols-3 gap-4 items-center">
                  <label className="text-sm text-gray-700">401n. Jumlah <span className="text-blue-600">smartphone</span> yang dimiliki *</label>
                  <div className="col-span-2 flex items-center gap-2">
                    <input
                      type="number"
                      value={formData.jumlahSmartphone || "2"}
                      onChange={(e) => setFormData({ ...formData, jumlahSmartphone: e.target.value })}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded text-sm"
                    />
                    <button className="p-2 text-gray-400 hover:text-gray-600 border border-gray-300 rounded">
                      <span className="text-lg">−</span>
                    </button>
                    <button className="p-2 text-gray-400 hover:text-gray-600 border border-gray-300 rounded">
                      <span className="text-lg">+</span>
                    </button>
                  </div>
                </div>

                {/* 402. Luas lahan sawah/kebun */}
                <div className="grid grid-cols-3 gap-4 items-start">
                  <label className="text-sm text-gray-700">402. Luas lahan <span className="text-blue-600">sawah/kebun diusahakan milik sendiri</span> (Ha)</label>
                  <div className="col-span-2 space-y-2">
                    {[
                      { value: "1", label: "1. <1.000 m2 (< 0,1 Ha)" },
                      { value: "2", label: "2. 1.000 m2 - < 5.000 m2(0,1 Ha - < 0,5 Ha)" },
                      { value: "3", label: "3. 5.000 m2 - <10.000 m2(0,5 Ha - < 1 Ha)" },
                      { value: "4", label: "4. >10.000 m2 (> 1 Ha)" },
                      { value: "5", label: "5. Tidak memiliki" },
                    ].map((option) => (
                      <label key={option.value} className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="radio"
                          name="luasLahan"
                          value={option.value}
                          checked={formData.luasLahan === option.value}
                          onChange={(e) => setFormData({ ...formData, luasLahan: e.target.value })}
                          className="w-4 h-4 text-[#1e88e5]"
                        />
                        <span className="text-sm text-gray-700">{option.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* 403. Intro text */}
                <div className="text-sm text-gray-700 mt-4">
                  <p>403. Berapa jumlah aset tidak bergerak berikut yang dimiliki oleh keluarga <span className="text-blue-600 font-medium">SUKMAWATI</span> saat ini:</p>
                </div>

                {/* 403a. Jumlah Rumah/bangunan */}
                <div className="grid grid-cols-3 gap-4 items-center">
                  <label className="text-sm text-gray-700">403a. Jumlah <span className="text-blue-600">Rumah/bangunan (selain yang ditempati)</span> yang dimiliki oleh keluarga SUKMAWATI saat ini ... (unit) *</label>
                  <div className="col-span-2 flex items-center gap-2">
                    <input
                      type="number"
                      value={formData.jumlahRumah || "0"}
                      onChange={(e) => setFormData({ ...formData, jumlahRumah: e.target.value })}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded text-sm"
                    />
                    <button className="p-2 text-gray-400 hover:text-gray-600 border border-gray-300 rounded">
                      <span className="text-lg">−</span>
                    </button>
                    <button className="p-2 text-gray-400 hover:text-gray-600 border border-gray-300 rounded">
                      <span className="text-lg">+</span>
                    </button>
                  </div>
                </div>

                {/* 403b. Jumlah Lahan */}
                <div className="grid grid-cols-3 gap-4 items-center">
                  <label className="text-sm text-gray-700">403b. Jumlah <span className="text-blue-600">Lahan (selain yang ditempati)</span> yang dimiliki oleh keluarga SUKMAWATI saat ini.... (bidang) *</label>
                  <div className="col-span-2 flex items-center gap-2">
                    <input
                      type="number"
                      value={formData.jumlahLahan || "0"}
                      onChange={(e) => setFormData({ ...formData, jumlahLahan: e.target.value })}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded text-sm"
                    />
                    <button className="p-2 text-gray-400 hover:text-gray-600 border border-gray-300 rounded">
                      <span className="text-lg">−</span>
                    </button>
                    <button className="p-2 text-gray-400 hover:text-gray-600 border border-gray-300 rounded">
                      <span className="text-lg">+</span>
                    </button>
                  </div>
                </div>

                {/* 404. Intro text */}
                <div className="text-sm text-gray-700 mt-4">
                  <p>404. Jumlah ternak yang dimiliki (ekor):</p>
                </div>

                {/* 404a. Jumlah kepemilikan ternak sapi */}
                <div className="grid grid-cols-3 gap-4 items-center">
                  <label className="text-sm text-gray-700">404a. Jumlah kepemilikan <span className="text-blue-600">ternak sapi</span> (ekor) *</label>
                  <div className="col-span-2 flex items-center gap-2">
                    <input
                      type="number"
                      value={formData.jumlahSapi || "0"}
                      onChange={(e) => setFormData({ ...formData, jumlahSapi: e.target.value })}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded text-sm"
                    />
                    <button className="p-2 text-gray-400 hover:text-gray-600 border border-gray-300 rounded">
                      <span className="text-lg">−</span>
                    </button>
                    <button className="p-2 text-gray-400 hover:text-gray-600 border border-gray-300 rounded">
                      <span className="text-lg">+</span>
                    </button>
                  </div>
                </div>

                {/* 404b. Jumlah kepemilikan ternak kerbau */}
                <div className="grid grid-cols-3 gap-4 items-center">
                  <label className="text-sm text-gray-700">404b. Jumlah kepemilikan <span className="text-blue-600">ternak kerbau</span> (ekor) *</label>
                  <div className="col-span-2 flex items-center gap-2">
                    <input
                      type="number"
                      value={formData.jumlahKerbau || "0"}
                      onChange={(e) => setFormData({ ...formData, jumlahKerbau: e.target.value })}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded text-sm"
                    />
                    <button className="p-2 text-gray-400 hover:text-gray-600 border border-gray-300 rounded">
                      <span className="text-lg">−</span>
                    </button>
                    <button className="p-2 text-gray-400 hover:text-gray-600 border border-gray-300 rounded">
                      <span className="text-lg">+</span>
                    </button>
                  </div>
                </div>

                {/* 404c. Jumlah kepemilikan ternak kuda */}
                <div className="grid grid-cols-3 gap-4 items-center">
                  <label className="text-sm text-gray-700">404c. Jumlah kepemilikan <span className="text-blue-600">ternak kuda</span> (ekor) *</label>
                  <div className="col-span-2 flex items-center gap-2">
                    <input
                      type="number"
                      value={formData.jumlahKuda || "0"}
                      onChange={(e) => setFormData({ ...formData, jumlahKuda: e.target.value })}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded text-sm"
                    />
                    <button className="p-2 text-gray-400 hover:text-gray-600 border border-gray-300 rounded">
                      <span className="text-lg">−</span>
                    </button>
                    <button className="p-2 text-gray-400 hover:text-gray-600 border border-gray-300 rounded">
                      <span className="text-lg">+</span>
                    </button>
                  </div>
                </div>

                {/* 404d. Jumlah kepemilikan ternak babi */}
                <div className="grid grid-cols-3 gap-4 items-center">
                  <label className="text-sm text-gray-700">404d. Jumlah kepemilikan <span className="text-blue-600">ternak babi</span> (ekor) *</label>
                  <div className="col-span-2 flex items-center gap-2">
                    <input
                      type="number"
                      value={formData.jumlahBabi || "0"}
                      onChange={(e) => setFormData({ ...formData, jumlahBabi: e.target.value })}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded text-sm"
                    />
                    <button className="p-2 text-gray-400 hover:text-gray-600 border border-gray-300 rounded">
                      <span className="text-lg">−</span>
                    </button>
                    <button className="p-2 text-gray-400 hover:text-gray-600 border border-gray-300 rounded">
                      <span className="text-lg">+</span>
                    </button>
                  </div>
                </div>

                {/* 404e. Jumlah kepemilikan ternak kambing atau domba */}
                <div className="grid grid-cols-3 gap-4 items-center">
                  <label className="text-sm text-gray-700">404e. Jumlah kepemilikan <span className="text-blue-600">ternak kambing atau domba</span> (ekor) *</label>
                  <div className="col-span-2 flex items-center gap-2">
                    <input
                      type="number"
                      value={formData.jumlahKambing || "0"}
                      onChange={(e) => setFormData({ ...formData, jumlahKambing: e.target.value })}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded text-sm"
                    />
                    <button className="p-2 text-gray-400 hover:text-gray-600 border border-gray-300 rounded">
                      <span className="text-lg">−</span>
                    </button>
                    <button className="p-2 text-gray-400 hover:text-gray-600 border border-gray-300 rounded">
                      <span className="text-lg">+</span>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* V. DOKUMENTASI Section */}
            {activeSection === "dokumentasi" && (
              <div className="bg-white rounded-b-lg shadow p-6 space-y-8">
                {/* Info ukuran file */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                  <p className="text-sm text-blue-700">
                    <span className="font-medium">⚠️ Perhatian:</span> Ukuran maksimal foto dokumentasi adalah <strong>1MB</strong> per file.
                  </p>
                </div>

                {/* Foto bersama responden */}
                <div className="grid grid-cols-3 gap-4 items-start">
                  <label className="text-sm text-gray-700">Foto <span className="text-blue-600">bersama responden</span> *</label>
                  <div className="col-span-2">
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 bg-gray-50">
                      {formData.fotoResponden ? (
                        <div className="relative">
                          <img
                            src={formData.fotoResponden}
                            alt="Foto bersama responden"
                            className="w-full h-48 object-cover rounded-lg"
                          />
                          <div className="mt-3 flex items-center justify-between">
                            <span className="text-xs text-gray-500">Foto berhasil diupload</span>
                            <div className="flex gap-2">
                              <button
                                onClick={() => setFormData({ ...formData, fotoResponden: null })}
                                className="px-3 py-1 text-xs bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                              >
                                Hapus Foto
                              </button>
                              <button
                                onClick={() => setFormData({ ...formData, fotoResponden: null })}
                                className="px-3 py-1 text-xs bg-gray-400 text-white rounded hover:bg-gray-500 transition-colors"
                              >
                                Batal
                              </button>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <label className="cursor-pointer flex flex-col items-center justify-center h-48">
                          <div className="text-center">
                            <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                              <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            <p className="mt-2 text-sm text-gray-600">Klik untuk upload foto</p>
                            <p className="text-xs text-gray-500">PNG, JPG (Maks. 1MB)</p>
                          </div>
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => {
                              const file = e.target.files[0];
                              if (file) {
                                if (file.size > 1024 * 1024) {
                                  alert("Ukuran file melebihi 1MB. Silakan pilih file yang lebih kecil.");
                                  e.target.value = "";
                                  return;
                                }
                                const reader = new FileReader();
                                reader.onloadend = () => {
                                  setFormData({ ...formData, fotoResponden: reader.result });
                                };
                                reader.readAsDataURL(file);
                              }
                            }}
                          />
                        </label>
                      )}
                    </div>
                  </div>
                </div>

                {/* Foto bangunan rumah tampak depan */}
                <div className="grid grid-cols-3 gap-4 items-start">
                  <label className="text-sm text-gray-700">Foto <span className="text-blue-600">bangunan rumah tampak depan</span> *</label>
                  <div className="col-span-2">
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 bg-gray-50">
                      {formData.fotoRumahDepan ? (
                        <div className="relative">
                          <img
                            src={formData.fotoRumahDepan}
                            alt="Foto bangunan rumah tampak depan"
                            className="w-full h-48 object-cover rounded-lg"
                          />
                          <div className="mt-3 flex items-center justify-between">
                            <span className="text-xs text-gray-500">Foto berhasil diupload</span>
                            <div className="flex gap-2">
                              <button
                                onClick={() => setFormData({ ...formData, fotoRumahDepan: null })}
                                className="px-3 py-1 text-xs bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                              >
                                Hapus Foto
                              </button>
                              <button
                                onClick={() => setFormData({ ...formData, fotoRumahDepan: null })}
                                className="px-3 py-1 text-xs bg-gray-400 text-white rounded hover:bg-gray-500 transition-colors"
                              >
                                Batal
                              </button>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <label className="cursor-pointer flex flex-col items-center justify-center h-48">
                          <div className="text-center">
                            <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                              <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            <p className="mt-2 text-sm text-gray-600">Klik untuk upload foto</p>
                            <p className="text-xs text-gray-500">PNG, JPG (Maks. 1MB)</p>
                          </div>
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => {
                              const file = e.target.files[0];
                              if (file) {
                                if (file.size > 1024 * 1024) {
                                  alert("Ukuran file melebihi 1MB. Silakan pilih file yang lebih kecil.");
                                  e.target.value = "";
                                  return;
                                }
                                const reader = new FileReader();
                                reader.onloadend = () => {
                                  setFormData({ ...formData, fotoRumahDepan: reader.result });
                                };
                                reader.readAsDataURL(file);
                              }
                            }}
                          />
                        </label>
                      )}
                    </div>
                  </div>
                </div>

                {/* Foto bagian dalam bangunan */}
                <div className="grid grid-cols-3 gap-4 items-start">
                  <label className="text-sm text-gray-700">Foto <span className="text-blue-600">bagian dalam bangunan</span> *</label>
                  <div className="col-span-2">
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 bg-gray-50">
                      {formData.fotoDalamBangunan ? (
                        <div className="relative">
                          <img
                            src={formData.fotoDalamBangunan}
                            alt="Foto bagian dalam bangunan"
                            className="w-full h-48 object-cover rounded-lg"
                          />
                          <div className="mt-3 flex items-center justify-between">
                            <span className="text-xs text-gray-500">Foto berhasil diupload</span>
                            <div className="flex gap-2">
                              <button
                                onClick={() => setFormData({ ...formData, fotoDalamBangunan: null })}
                                className="px-3 py-1 text-xs bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                              >
                                Hapus Foto
                              </button>
                              <button
                                onClick={() => setFormData({ ...formData, fotoDalamBangunan: null })}
                                className="px-3 py-1 text-xs bg-gray-400 text-white rounded hover:bg-gray-500 transition-colors"
                              >
                                Batal
                              </button>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <label className="cursor-pointer flex flex-col items-center justify-center h-48">
                          <div className="text-center">
                            <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                              <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            <p className="mt-2 text-sm text-gray-600">Klik untuk upload foto</p>
                            <p className="text-xs text-gray-500">PNG, JPG (Maks. 1MB)</p>
                          </div>
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => {
                              const file = e.target.files[0];
                              if (file) {
                                if (file.size > 1024 * 1024) {
                                  alert("Ukuran file melebihi 1MB. Silakan pilih file yang lebih kecil.");
                                  e.target.value = "";
                                  return;
                                }
                                const reader = new FileReader();
                                reader.onloadend = () => {
                                  setFormData({ ...formData, fotoDalamBangunan: reader.result });
                                };
                                reader.readAsDataURL(file);
                              }
                            }}
                          />
                        </label>
                      )}
                    </div>
                  </div>
                </div>

                {/* Foto Kloset/WC/Jamban */}
                <div className="grid grid-cols-3 gap-4 items-start">
                  <label className="text-sm text-gray-700">Foto <span className="text-blue-600">Kloset/WC/Jamban</span> *</label>
                  <div className="col-span-2">
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 bg-gray-50">
                      {formData.fotoKloset ? (
                        <div className="relative">
                          <img
                            src={formData.fotoKloset}
                            alt="Foto Kloset/WC/Jamban"
                            className="w-full h-48 object-cover rounded-lg"
                          />
                          <div className="mt-3 flex items-center justify-between">
                            <span className="text-xs text-gray-500">Foto berhasil diupload</span>
                            <div className="flex gap-2">
                              <button
                                onClick={() => setFormData({ ...formData, fotoKloset: null })}
                                className="px-3 py-1 text-xs bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                              >
                                Hapus Foto
                              </button>
                              <button
                                onClick={() => setFormData({ ...formData, fotoKloset: null })}
                                className="px-3 py-1 text-xs bg-gray-400 text-white rounded hover:bg-gray-500 transition-colors"
                              >
                                Batal
                              </button>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <label className="cursor-pointer flex flex-col items-center justify-center h-48">
                          <div className="text-center">
                            <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                              <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            <p className="mt-2 text-sm text-gray-600">Klik untuk upload foto</p>
                            <p className="text-xs text-gray-500">PNG, JPG (Maks. 1MB)</p>
                          </div>
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => {
                              const file = e.target.files[0];
                              if (file) {
                                if (file.size > 1024 * 1024) {
                                  alert("Ukuran file melebihi 1MB. Silakan pilih file yang lebih kecil.");
                                  e.target.value = "";
                                  return;
                                }
                                const reader = new FileReader();
                                reader.onloadend = () => {
                                  setFormData({ ...formData, fotoKloset: reader.result });
                                };
                                reader.readAsDataURL(file);
                              }
                            }}
                          />
                        </label>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* CATATAN Section */}
            {activeSection === "catatan" && (
              <div className="bg-white rounded-b-lg shadow p-6 space-y-6">
                {/* Section Header */}
                <div className="bg-[#7c3aed] text-white text-center py-3 rounded-lg">
                  <h3 className="font-medium">CATATAN</h3>
                </div>

                {/* CATATAN Text Area */}
                <div className="grid grid-cols-3 gap-4 items-start">
                  <label className="text-sm text-gray-700">CATATAN</label>
                  <div className="col-span-2">
                    <div className="relative">
                      <textarea
                        value={formData.catatan || "1 KK"}
                        onChange={(e) => setFormData({ ...formData, catatan: e.target.value })}
                        placeholder="Masukkan catatan..."
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded text-sm resize-none"
                      />
                      <button className="absolute top-2 right-2 text-gray-400 hover:text-gray-600">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Waktu Selesai Pendataan */}
                <div className="grid grid-cols-3 gap-4 items-start">
                  <label className="text-sm text-gray-700">Waktu Selesai Pendataan *</label>
                  <div className="col-span-2 space-y-2">
                    <input
                      type="text"
                      value={formData.waktuSelesai || ""}
                      onChange={(e) => setFormData({ ...formData, waktuSelesai: e.target.value })}
                      placeholder="2026-01-20T20:58:04"
                      className="w-full px-3 py-2 border border-gray-300 rounded text-sm bg-gray-50"
                      readOnly
                    />
                    <button
                      onClick={() => {
                        const now = new Date();
                        const formatted = now.toISOString().slice(0, 19).replace('T', 'T');
                        setFormData({ ...formData, waktuSelesai: formatted });
                      }}
                      className="px-4 py-2 bg-[#7c3aed] text-white text-sm rounded hover:bg-[#6d28d9] transition-colors flex items-center gap-2"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Get Time
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Default content for other sections */}
            {activeSection !== "identitas-wilayah" &&
              activeSection !== "identitas-keluarga" &&
              activeSection !== "keterangan-pendataan" &&
              activeSection !== "keterangan-sosial" &&
              activeSection !== "keterangan-individu" &&
              activeSection !== "keterangan-perumahan" &&
              activeSection !== "daya-listrik" &&
              activeSection !== "kepemilikan-aset" &&
              activeSection !== "dokumentasi" &&
              activeSection !== "catatan" && (
                <div className="bg-white rounded-b-lg shadow p-6">
                  <div className="text-center py-12 text-gray-500">
                    <p>Konten untuk section ini akan ditambahkan sesuai kebutuhan.</p>
                  </div>
                </div>
              )}

            {/* Footer Navigation */}
            <div className="mt-6 bg-white rounded-lg shadow p-4 flex items-center justify-between">
              {activeSection === "identitas-wilayah" ? (
                <>
                  <div className="flex items-center gap-4">
                    <span className="text-sm text-gray-500">IDENTITAS WILAYAH</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-500">Next</span>
                    <ChevronRight className="w-4 h-4 text-gray-500" />
                    <button
                      onClick={() => setActiveSection("identitas-keluarga")}
                      className="px-4 py-2 bg-[#1e88e5] text-white rounded hover:bg-[#1976d2] transition-colors text-sm"
                    >
                      I. IDENTITAS KELUARGA
                    </button>
                  </div>
                </>
              ) : activeSection === "identitas-keluarga" ? (
                <>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setActiveSection("identitas-wilayah")}
                      className="px-4 py-2 border border-gray-300 text-gray-700 rounded hover:bg-gray-50 transition-colors text-sm flex items-center gap-2"
                    >
                      <span>Previous</span>
                      <span>IDENTITAS WILAYAH</span>
                    </button>
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-medium text-gray-700">I. IDENTITAS KELUARGA</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-500">Next</span>
                    <ChevronRight className="w-4 h-4 text-gray-500" />
                    <button
                      onClick={() => setActiveSection("keterangan-pendataan")}
                      className="px-4 py-2 bg-[#1e88e5] text-white rounded hover:bg-[#1976d2] transition-colors text-sm"
                    >
                      KETERANGAN PENDATAAN ANGGOTA KELUARGA
                    </button>
                  </div>
                </>
              ) : activeSection === "keterangan-pendataan" ? (
                <>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setActiveSection("identitas-keluarga")}
                      className="px-4 py-2 border border-gray-300 text-gray-700 rounded hover:bg-gray-50 transition-colors text-sm flex items-center gap-2"
                    >
                      <span>Previous</span>
                      <span>I. IDENTITAS KELUARGA</span>
                    </button>
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-medium text-gray-700">KETERANGAN PENDATAAN ANGGOTA KELUARGA</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-500">Next</span>
                    <ChevronRight className="w-4 h-4 text-gray-500" />
                    <button
                      onClick={() => setActiveSection("keterangan-sosial")}
                      className="px-4 py-2 bg-[#1e88e5] text-white rounded hover:bg-[#1976d2] transition-colors text-sm"
                    >
                      II. KETERANGAN SOSIAL EKONOMI
                    </button>
                  </div>
                </>
              ) : activeSection === "keterangan-sosial" ? (
                <>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setActiveSection("keterangan-pendataan")}
                      className="px-4 py-2 border border-gray-300 text-gray-700 rounded hover:bg-gray-50 transition-colors text-sm flex items-center gap-2"
                    >
                      <span>Previous</span>
                      <span>KETERANGAN PENDATAAN</span>
                    </button>
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-medium text-gray-700">II. KETERANGAN SOSIAL EKONOMI ANGGOTA KELUARGA</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-500">Next</span>
                    <ChevronRight className="w-4 h-4 text-gray-500" />
                    <button
                      onClick={() => setActiveSection("keterangan-perumahan")}
                      className="px-4 py-2 bg-[#1e88e5] text-white rounded hover:bg-[#1976d2] transition-colors text-sm"
                    >
                      III. KETERANGAN PERUMAHAN
                    </button>
                  </div>
                </>
              ) : activeSection === "keterangan-individu" ? (
                <>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setActiveSection("keterangan-sosial")}
                      className="px-4 py-2 border border-gray-300 text-gray-700 rounded hover:bg-gray-50 transition-colors text-sm flex items-center gap-2"
                    >
                      <span>Previous</span>
                      <span>KETERANGAN SOSIAL</span>
                    </button>
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-medium text-gray-700">
                      KETERANGAN INDIVIDU {formData.selectedAnggota?.nama || ""}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-500">Next</span>
                    <ChevronRight className="w-4 h-4 text-gray-500" />
                    <button
                      onClick={() => setActiveSection("keterangan-perumahan")}
                      className="px-4 py-2 bg-[#1e88e5] text-white rounded hover:bg-[#1976d2] transition-colors text-sm"
                    >
                      III. KETERANGAN PERUMAHAN
                    </button>
                  </div>
                </>
              ) : activeSection === "keterangan-perumahan" ? (
                <>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setActiveSection("keterangan-individu")}
                      className="px-4 py-2 border border-gray-300 text-gray-700 rounded hover:bg-gray-50 transition-colors text-sm flex items-center gap-2"
                    >
                      <span>Previous</span>
                      <span>KETERANGAN INDIVIDU</span>
                    </button>
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-medium text-gray-700">III. KETERANGAN PERUMAHAN</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-500">Next</span>
                    <ChevronRight className="w-4 h-4 text-gray-500" />
                    <button
                      onClick={() => setActiveSection("daya-listrik")}
                      className="px-4 py-2 bg-[#1e88e5] text-white rounded hover:bg-[#1976d2] transition-colors text-sm"
                    >
                      DAYA LISTRIK
                    </button>
                  </div>
                </>
              ) : activeSection === "daya-listrik" ? (
                <>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setActiveSection("keterangan-perumahan")}
                      className="px-4 py-2 border border-gray-300 text-gray-700 rounded hover:bg-gray-50 transition-colors text-sm flex items-center gap-2"
                    >
                      <span>Previous</span>
                      <span>KETERANGAN PERUMAHAN</span>
                    </button>
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-medium text-gray-700">DAYA YANG TERPASANG</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-500">Next</span>
                    <ChevronRight className="w-4 h-4 text-gray-500" />
                    <button
                      onClick={() => setActiveSection("kepemilikan-aset")}
                      className="px-4 py-2 bg-[#1e88e5] text-white rounded hover:bg-[#1976d2] transition-colors text-sm"
                    >
                      IV. KEPEMILIKAN ASET
                    </button>
                  </div>
                </>
              ) : activeSection === "kepemilikan-aset" ? (
                <>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setActiveSection("daya-listrik")}
                      className="px-4 py-2 border border-gray-300 text-gray-700 rounded hover:bg-gray-50 transition-colors text-sm flex items-center gap-2"
                    >
                      <span>Previous</span>
                      <span>DAYA LISTRIK</span>
                    </button>
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-medium text-gray-700">IV. KEPEMILIKAN ASET</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-500">Next</span>
                    <ChevronRight className="w-4 h-4 text-gray-500" />
                    <button
                      onClick={() => setActiveSection("dokumentasi")}
                      className="px-4 py-2 bg-[#1e88e5] text-white rounded hover:bg-[#1976d2] transition-colors text-sm"
                    >
                      V. DOKUMENTASI
                    </button>
                  </div>
                </>
              ) : activeSection === "dokumentasi" ? (
                <>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setActiveSection("kepemilikan-aset")}
                      className="px-4 py-2 border border-gray-300 text-gray-700 rounded hover:bg-gray-50 transition-colors text-sm flex items-center gap-2"
                    >
                      <span>Previous</span>
                      <span>KEPEMILIKAN ASET</span>
                    </button>
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-medium text-gray-700">V. DOKUMENTASI</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-500">Next</span>
                    <ChevronRight className="w-4 h-4 text-gray-500" />
                    <button
                      onClick={() => setActiveSection("catatan")}
                      className="px-4 py-2 bg-[#1e88e5] text-white rounded hover:bg-[#1976d2] transition-colors text-sm"
                    >
                      CATATAN
                    </button>
                  </div>
                </>
              ) : activeSection === "catatan" ? (
                <>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setActiveSection("dokumentasi")}
                      className="px-4 py-2 border border-gray-300 text-gray-700 rounded hover:bg-gray-50 transition-colors text-sm flex items-center gap-2"
                    >
                      <span>Previous</span>
                      <span>V. DOKUMENTASI</span>
                    </button>
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-medium text-gray-700">CATATAN</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => alert("Survey selesai! Data akan disimpan.")}
                      className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors text-sm"
                    >
                      Selesai & Simpan
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setActiveSection("identitas-wilayah")}
                      className="px-4 py-2 border border-gray-300 text-gray-700 rounded hover:bg-gray-50 transition-colors text-sm"
                    >
                      Back to Start
                    </button>
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-medium text-gray-700">{activeSection.toUpperCase().replace(/-/g, " ")}</p>
                  </div>
                  <div className="w-32" />
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
