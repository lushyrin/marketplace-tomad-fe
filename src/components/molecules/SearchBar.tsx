import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export const SearchBar = () => {
    const [query, setQuery] = useState('')
    const navigate = useNavigate()

    const handleSearch = () => {
        if (query.trim()) navigate(`/products?q=${encodeURIComponent(query.trim())}`)
    }

    return (
        <div className="flex flex-1 border border-gray-200 bg-gray-50 rounded-sm overflow-hidden focus-within:border-gray-400 transition-colors">
            <input
                type="text"
                placeholder="Cari produk, toko, atau merek..."
                value={query}
                onChange={e => setQuery(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleSearch()}
                className="flex-1 px-4 py-2.5 bg-transparent text-[13px] text-gray-900 placeholder-gray-400 outline-none font-body"
            />
            <button
                onClick={handleSearch}
                className="px-5 py-2.5 bg-red text-white text-[12px] font-bold tracking-widest uppercase hover:bg-red-dark transition-colors font-body"
            >
                Cari
            </button>
        </div>
    )
}