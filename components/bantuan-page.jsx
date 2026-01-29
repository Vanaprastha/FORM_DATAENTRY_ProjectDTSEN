"use client"

import { Book, FileQuestion, MessageCircle, Phone, Mail, ExternalLink, ChevronRight, Search } from "lucide-react"

export default function BantuanPage() {
    const faqItems = [
        {
            question: "Bagaimana cara memulai pendataan?",
            answer: "Pilih 'Survey Collection' dari sidebar, lalu klik ikon Edit pada baris data yang ingin Anda datai."
        },
        {
            question: "Bagaimana cara mengupload foto dokumentasi?",
            answer: "Pada halaman form survey, pilih section 'V. DOKUMENTASI', lalu klik area upload untuk memilih foto. Ukuran maksimal foto adalah 1MB."
        },
        {
            question: "Apa yang harus dilakukan jika responden tidak ditemukan?",
            answer: "Pilih opsi 'Tidak Ditemukan' pada field Keberadaan Keluarga dan isi catatan dengan keterangan yang jelas."
        },
        {
            question: "Bagaimana cara menyimpan data yang sudah diisi?",
            answer: "Klik tombol 'Selesai & Simpan' di bagian bawah form setelah mengisi semua data yang diperlukan."
        },
        {
            question: "Apa perbedaan status SUBMITTED dan APPROVED?",
            answer: "SUBMITTED berarti data sudah dikirim oleh Pencacah dan menunggu verifikasi. APPROVED berarti data sudah diverifikasi dan disetujui oleh Pengawas."
        },
    ]

    const guides = [
        {
            title: "Panduan Pengisian Form Survey",
            description: "Langkah-langkah lengkap mengisi form pendataan dari awal hingga selesai",
            icon: Book,
        },
        {
            title: "Panduan Upload Dokumentasi",
            description: "Cara mengupload foto responden, rumah, dan dokumentasi lainnya",
            icon: FileQuestion,
        },
        {
            title: "Panduan Verifikasi Data",
            description: "Proses verifikasi data oleh Pengawas dan penanganan revisi",
            icon: MessageCircle,
        },
    ]

    return (
        <div className="p-4 md:p-6 space-y-4 md:space-y-6">
            {/* Header */}
            <div className="bg-white rounded-lg shadow p-4 md:p-6">
                <h1 className="text-xl md:text-2xl font-bold text-gray-800 mb-2">Pusat Bantuan</h1>
                <p className="text-sm md:text-base text-gray-600">Temukan jawaban atas pertanyaan Anda tentang aplikasi FASIH</p>

                {/* Search */}
                <div className="mt-4 relative">
                    <input
                        type="text"
                        placeholder="Cari bantuan..."
                        className="w-full px-4 py-2.5 md:py-3 pl-10 md:pl-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1e88e5] focus:border-transparent text-sm md:text-base"
                    />
                    <Search className="w-4 h-4 md:w-5 md:h-5 text-gray-400 absolute left-3 md:left-4 top-1/2 -translate-y-1/2" />
                </div>
            </div>

            {/* Quick Guides */}
            <div className="bg-white rounded-lg shadow p-4 md:p-6">
                <h2 className="text-base md:text-lg font-semibold text-gray-800 mb-3 md:mb-4">Panduan Cepat</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
                    {guides.map((guide, index) => (
                        <button
                            key={index}
                            className="p-3 md:p-4 border border-gray-200 rounded-lg hover:border-[#1e88e5] hover:bg-blue-50 transition-colors text-left group"
                        >
                            <div className="flex items-start gap-3">
                                <div className="p-2 bg-blue-100 rounded-lg group-hover:bg-[#1e88e5] transition-colors flex-shrink-0">
                                    <guide.icon className="w-4 h-4 md:w-5 md:h-5 text-[#1e88e5] group-hover:text-white transition-colors" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h3 className="font-medium text-sm md:text-base text-gray-800 group-hover:text-[#1e88e5] transition-colors">{guide.title}</h3>
                                    <p className="text-xs md:text-sm text-gray-500 mt-1 line-clamp-2">{guide.description}</p>
                                </div>
                                <ChevronRight className="w-4 h-4 md:w-5 md:h-5 text-gray-400 group-hover:text-[#1e88e5] transition-colors flex-shrink-0" />
                            </div>
                        </button>
                    ))}
                </div>
            </div>

            {/* FAQ */}
            <div className="bg-white rounded-lg shadow p-4 md:p-6">
                <h2 className="text-base md:text-lg font-semibold text-gray-800 mb-3 md:mb-4">Pertanyaan yang Sering Diajukan (FAQ)</h2>
                <div className="space-y-2 md:space-y-3">
                    {faqItems.map((item, index) => (
                        <details
                            key={index}
                            className="border border-gray-200 rounded-lg group"
                        >
                            <summary className="px-3 md:px-4 py-2.5 md:py-3 cursor-pointer font-medium text-sm md:text-base text-gray-700 hover:text-[#1e88e5] hover:bg-gray-50 rounded-lg list-none flex items-center justify-between gap-2">
                                <span className="flex-1">{item.question}</span>
                                <ChevronRight className="w-4 h-4 md:w-5 md:h-5 text-gray-400 group-open:rotate-90 transition-transform flex-shrink-0" />
                            </summary>
                            <div className="px-3 md:px-4 py-2.5 md:py-3 text-sm md:text-base text-gray-600 border-t border-gray-200 bg-gray-50">
                                {item.answer}
                            </div>
                        </details>
                    ))}
                </div>
            </div>

            {/* Contact Support */}
            <div className="bg-white rounded-lg shadow p-4 md:p-6">
                <h2 className="text-base md:text-lg font-semibold text-gray-800 mb-3 md:mb-4">Butuh Bantuan Lebih Lanjut?</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
                    <div className="flex items-center gap-3 p-3 md:p-4 border border-gray-200 rounded-lg">
                        <div className="p-2 md:p-3 bg-green-100 rounded-full flex-shrink-0">
                            <Phone className="w-4 h-4 md:w-5 md:h-5 text-green-600" />
                        </div>
                        <div className="min-w-0">
                            <p className="text-xs md:text-sm text-gray-500">Telepon</p>
                            <p className="font-medium text-sm md:text-base text-gray-800">(031) 123-4567</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3 p-3 md:p-4 border border-gray-200 rounded-lg">
                        <div className="p-2 md:p-3 bg-blue-100 rounded-full flex-shrink-0">
                            <Mail className="w-4 h-4 md:w-5 md:h-5 text-blue-600" />
                        </div>
                        <div className="min-w-0">
                            <p className="text-xs md:text-sm text-gray-500">Email</p>
                            <p className="font-medium text-sm md:text-base text-gray-800 truncate">bantuan@fasih.go.id</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3 p-3 md:p-4 border border-gray-200 rounded-lg">
                        <div className="p-2 md:p-3 bg-purple-100 rounded-full flex-shrink-0">
                            <MessageCircle className="w-4 h-4 md:w-5 md:h-5 text-purple-600" />
                        </div>
                        <div className="min-w-0">
                            <p className="text-xs md:text-sm text-gray-500">Live Chat</p>
                            <p className="font-medium text-sm md:text-base text-gray-800">Senin - Jumat, 08:00 - 17:00</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Version Info */}
            <div className="text-center text-xs md:text-sm text-gray-500 pb-4">
                <p>FASIH v1.0.0 | © 2025 Dinas Sosial Kota Surabaya</p>
            </div>
        </div>
    )
}

