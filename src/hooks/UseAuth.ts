// Placeholder auth hook — swap internals when backend is ready
// LoginPage should call setLoggedIn(true) on success
// and logout should call setLoggedIn(false)

import { useState } from 'react'

const AUTH_KEY = 'tomad_auth'

const loadAuth = (): boolean => {
    try {
        return localStorage.getItem(AUTH_KEY) === 'true'
    } catch {
        return false
    }
}

export const useAuth = () => {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(loadAuth)

    const login = () => {
        localStorage.setItem(AUTH_KEY, 'true')
        setIsLoggedIn(true)
    }

    const logout = () => {
        localStorage.removeItem(AUTH_KEY)
        setIsLoggedIn(false)
    }

    return { isLoggedIn, login, logout }
}