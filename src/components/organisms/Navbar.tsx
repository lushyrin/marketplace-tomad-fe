import { useNavigate } from 'react-router-dom'
import { SearchBar } from '../molecules/SearchBar'

interface Props {
    cartCount: number
}

export const Navbar = ({ cartCount }: Props) => {
    const navigate = useNavigate()

    return (
        <nav className="flex items-center gap-4 py-3.5 border-b-2 border-gray-900">
            {/* Logo */}
            <div
                className="font-display text-[1.6rem] font-bold text-red tracking-tight leading-none cursor-pointer flex-shrink-0"
                onClick={() => navigate('/')}
            >
                Tomad<sup className="text-[0.45rem] text-gray-400 font-body font-normal tracking-widest align-super">ID</sup>
            </div>

            <SearchBar />

            {/* Actions */}
            <div className="flex items-center gap-1.5 flex-shrink-0">
                <button
                    className="hidden sm:block px-3 py-2 text-[12px] font-medium text-gray-500 hover:text-gray-900 transition-colors"
                    onClick={() => navigate('/login')}
                >
                    Masuk
                </button>
                <button
                    className="hidden sm:block px-4 py-2 bg-gray-900 text-white text-[12px] font-bold tracking-widest uppercase rounded-sm hover:opacity-85 transition-opacity"
                    onClick={() => navigate('/register')}
                >
                    Daftar
                </button>
                <div
                    className="relative cursor-pointer p-1"
                    onClick={() => navigate('/cart')}
                >
                    <span className="text-xl leading-none">🛒</span>
                    {cartCount > 0 && (
                        <div className="absolute -top-1 -right-1 bg-red text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center font-body">
                            {cartCount}
                        </div>
                    )}
                </div>
            </div>
        </nav>
    )
}