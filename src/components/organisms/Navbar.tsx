import { useNavigate } from 'react-router-dom'
import { ShoppingCartOutlined, UserOutlined } from '@ant-design/icons'
import { SearchBar } from '../molecules/SearchBar'

interface Props {
    cartCount: number
}

export const Navbar = ({ cartCount }: Props) => {
    const navigate = useNavigate()

    return (
        <nav className="flex items-center gap-4 py-3.5 border-b-2 border-gray-900">
            {/* logo */}
            <div
                className="font-display text-[1.6rem] font-bold text-red tracking-tight leading-none cursor-pointer flex-shrink-0"
                onClick={() => navigate('/')}
            >
                Tomad<sup className="text-[0.45rem] text-gray-400 font-body font-normal tracking-widest align-super">ID</sup>
            </div>

            <SearchBar />

            {/* actions */}
            <div className="flex items-center gap-1.5 flex-shrink-0">
                <button
                    className="hidden sm:flex items-center gap-1.5 px-3 py-2 text-[12px] font-medium text-gray-500 hover:text-gray-900 transition-colors"
                    onClick={() => navigate('/login')}
                >
                    <UserOutlined className="text-[14px]" />
                    Masuk
                </button>
                <button
                    className="hidden sm:block px-4 py-2 bg-gray-900 text-white text-[12px] font-bold tracking-widest uppercase rounded-sm hover:opacity-85 transition-opacity"
                    onClick={() => navigate('/register')}
                >
                    Daftar
                </button>

                {/* carticon with item count badge */}
                <div
                    className="relative cursor-pointer p-1"
                    onClick={() => navigate('/cart')}
                >
                    <ShoppingCartOutlined className="text-[22px] text-gray-900" />
                    {cartCount > 0 && (
                        <div className="absolute -top-1 -right-1 bg-red text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                            {cartCount}
                        </div>
                    )}
                </div>
            </div>
        </nav>
    )
}