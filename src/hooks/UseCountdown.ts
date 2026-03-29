import { useState, useEffect } from 'react'

interface CountdownResult {
    h: string
    m: string
    s: string
    isExpired: boolean
}

export const useCountdown = (initialSeconds: number): CountdownResult => {
    const [secs, setSecs] = useState(initialSeconds)

    useEffect(() => {
        if (secs <= 0) return
        const timer = setInterval(() => setSecs(s => s - 1), 1000)
        return () => clearInterval(timer)
    }, [])

    return {
        h: String(Math.floor(secs / 3600)).padStart(2, '0'),
        m: String(Math.floor((secs % 3600) / 60)).padStart(2, '0'),
        s: String(secs % 60).padStart(2, '0'),
        isExpired: secs <= 0,
    }
}