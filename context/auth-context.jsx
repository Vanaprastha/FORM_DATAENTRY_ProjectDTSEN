"use client"

import { createContext, useContext, useState, useEffect } from "react"

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        // Check if user is logged in from localStorage
        const savedUser = localStorage.getItem("fasih_user")
        if (savedUser) {
            setUser(JSON.parse(savedUser))
        }
        setIsLoading(false)
    }, [])

    const login = (email, password) => {
        // Dummy authentication - in real app, this would be an API call
        const dummyUsers = [
            { email: "admin@fasih.go.id", password: "admin123", name: "Bilal Ali Maghshar Sri Muljono SST", role: "Pengawas" },
            { email: "pencacah@fasih.go.id", password: "pencacah123", name: "Ahmad Pencacah", role: "Pencacah" },
        ]

        const foundUser = dummyUsers.find((u) => u.email === email && u.password === password)

        if (foundUser) {
            const userData = { email: foundUser.email, name: foundUser.name, role: foundUser.role }
            setUser(userData)
            localStorage.setItem("fasih_user", JSON.stringify(userData))
            return { success: true }
        }

        return { success: false, error: "Email atau password salah" }
    }

    const logout = () => {
        setUser(null)
        localStorage.removeItem("fasih_user")
    }

    return (
        <AuthContext.Provider value={{ user, isLoading, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider")
    }
    return context
}
