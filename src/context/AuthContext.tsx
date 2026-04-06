import { createContext, useContext, useState, type ReactNode } from 'react'

const AUTH_KEY = 'tomad_auth'

interface AuthContextType {
    isLoggedIn: boolean
    login: () => void
    logout: () => void
}

const AuthContext = createContext<AuthContextType | null>(null)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => {
        try { return localStorage.getItem(AUTH_KEY) === 'true' } catch { return false }
    })

    const login = () => {
        localStorage.setItem(AUTH_KEY, 'true')
        setIsLoggedIn(true)
    }

    const logout = () => {
        localStorage.removeItem(AUTH_KEY)
        setIsLoggedIn(false)
    }

    return (
        <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const ctx = useContext(AuthContext)
    if (!ctx) throw new Error('useAuth must be used inside AuthProvider')
    return ctx
}