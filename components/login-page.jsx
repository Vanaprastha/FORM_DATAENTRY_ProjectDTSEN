"use client"

import { useState } from "react"
import { useAuth } from "@/context/auth-context"
import { Eye, EyeOff, Lock, Mail, AlertCircle } from "lucide-react"

export default function LoginPage() {
    const { login } = useAuth()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [showPassword, setShowPassword] = useState(false)
    const [error, setError] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError("")
        setIsLoading(true)

        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 800))

        const result = login(email, password)

        if (!result.success) {
            setError(result.error)
        }

        setIsLoading(false)
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#1e88e5] via-[#1976d2] to-[#0d47a1] flex items-center justify-center p-4">
            {/* Background Pattern */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/5 rounded-full blur-3xl" />
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-white/5 rounded-full blur-3xl" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-white/5 rounded-full blur-3xl" />
            </div>

            {/* Login Card */}
            <div className="relative w-full max-w-md">
                {/* Logo */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-white rounded-2xl shadow-2xl mb-4">
                        <span className="text-4xl font-bold text-[#1e88e5]">F</span>
                    </div>
                    <h1 className="text-3xl font-bold text-white mb-2">FASIH</h1>
                    <p className="text-white/80 text-sm">Sistem Pendataan DTSEN Kota Surabaya</p>
                </div>

                {/* Card */}
                <div className="bg-white rounded-2xl shadow-2xl p-6 md:p-8">
                    <div className="text-center mb-6">
                        <h2 className="text-xl font-semibold text-gray-800">Selamat Datang</h2>
                        <p className="text-gray-500 text-sm mt-1">Silakan masuk untuk melanjutkan</p>
                    </div>

                    {/* Error Message */}
                    {error && (
                        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2 text-red-600">
                            <AlertCircle className="w-5 h-5 flex-shrink-0" />
                            <span className="text-sm">{error}</span>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Email Field */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                Email
                            </label>
                            <div className="relative">
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Masukkan email Anda"
                                    required
                                    className="w-full px-4 py-3 pl-11 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1e88e5] focus:border-transparent transition-all"
                                />
                                <Mail className="w-5 h-5 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                            </div>
                        </div>

                        {/* Password Field */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                Password
                            </label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Masukkan password Anda"
                                    required
                                    className="w-full px-4 py-3 pl-11 pr-11 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1e88e5] focus:border-transparent transition-all"
                                />
                                <Lock className="w-5 h-5 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                >
                                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                </button>
                            </div>
                        </div>

                        {/* Remember & Forgot */}
                        <div className="flex items-center justify-between text-sm">
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-[#1e88e5] focus:ring-[#1e88e5]" />
                                <span className="text-gray-600">Ingat saya</span>
                            </label>
                            <button type="button" className="text-[#1e88e5] hover:underline">
                                Lupa password?
                            </button>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full py-3 bg-[#1e88e5] text-white font-medium rounded-lg hover:bg-[#1976d2] focus:outline-none focus:ring-2 focus:ring-[#1e88e5] focus:ring-offset-2 transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                            {isLoading ? (
                                <>
                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    <span>Memproses...</span>
                                </>
                            ) : (
                                "Masuk"
                            )}
                        </button>
                    </form>

                    {/* Demo Credentials */}
                    <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                        <p className="text-xs font-medium text-blue-800 mb-2">Demo Credentials:</p>
                        <div className="space-y-1 text-xs text-blue-700">
                            <p><span className="font-medium">Pengawas:</span> admin@fasih.go.id / admin123</p>
                            <p><span className="font-medium">Pencacah:</span> pencacah@fasih.go.id / pencacah123</p>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <p className="text-center text-white/60 text-xs mt-6">
                    © 2025 Dinas Sosial Kota Surabaya. All rights reserved.
                </p>
            </div>
        </div>
    )
}
