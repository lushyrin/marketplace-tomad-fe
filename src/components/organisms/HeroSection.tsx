import { useNavigate } from 'react-router-dom'

export const HeroSection = () => {
    const navigate = useNavigate()

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 border-b border-gray-200">
            {/* left */}
            <div className="flex flex-col justify-between gap-6 py-10 md:pr-10 md:border-r border-gray-200">
                <div>
                    <div className="flex items-center gap-2 text-[10px] font-bold tracking-[0.12em] uppercase text-red mb-3">
                        <span className="w-5 h-[1.5px] bg-red inline-block" />
                        Marketplace Terpercaya Indonesia
                    </div>

                    <h1 className="font-display text-[2.6rem] font-bold leading-[1.05] tracking-tight text-gray-900">
                        Semua ada.<br />
                        <em className="italic text-red font-medium">Harga bicara.</em><br />
                        Belanja di sini.
                    </h1>

                    <p className="mt-4 text-[14px] text-gray-500 leading-relaxed max-w-sm">
                        Jutaan produk dari ribuan penjual terpercaya se-Indonesia.
                        Pengiriman cepat, harga jujur.
                    </p>

                    <div className="flex gap-2.5 mt-6 flex-wrap">
                        <button
                            onClick={() => navigate('/products')}
                            className="px-6 py-3 bg-red text-white text-[12px] font-bold tracking-widest uppercase rounded-sm hover:bg-red-dark transition-colors"
                        >
                            Mulai Belanja
                        </button>
                        <button
                            onClick={() => navigate('/seller/register')}
                            className="px-6 py-3 border-2 border-gray-900 text-gray-900 text-[12px] font-bold tracking-widest uppercase rounded-sm hover:bg-gray-900 hover:text-white transition-all"
                        >
                            Buka Toko
                        </button>
                    </div>
                </div>

                {/* stats */}
                <div className="flex gap-0 border-t border-gray-200 pt-6">
                    <div className="flex-1">
                        <div className="font-display text-[1.7rem] font-bold text-red leading-none">2.4M+</div>
                        <div className="text-[11px] text-gray-400 mt-1 tracking-wide">Produk aktif</div>
                    </div>
                    <div className="flex-1 pl-6 border-l border-gray-200">
                        <div className="font-display text-[1.7rem] font-bold text-red leading-none">180K+</div>
                        <div className="text-[11px] text-gray-400 mt-1 tracking-wide">Penjual terdaftar</div>
                    </div>
                    <div className="flex-1 pl-6 border-l border-gray-200">
                        <div className="font-display text-[1.7rem] font-bold text-red leading-none">4.9★</div>
                        <div className="text-[11px] text-gray-400 mt-1 tracking-wide">Rating platform</div>
                    </div>
                </div>
            </div>

            {/* promo Cards */}
            <div className="flex flex-col md:pl-10 py-10">
                <div className="flex-1 flex flex-col justify-between p-6 bg-red rounded-sm cursor-pointer mb-0">
                    <div>
                        <div className="text-[10px] font-bold tracking-[0.1em] uppercase text-red-mid mb-2">
                            Promo Hari Ini
                        </div>
                        <div className="font-display text-[1.2rem] font-bold text-white leading-snug">
                            Gratis Ongkir<br />Seluruh Indonesia
                        </div>
                        <div className="text-[12px] text-red-mid mt-2">
                            Min. pembelian Rp 50.000
                        </div>
                    </div>
                    <div className="text-[11px] font-bold tracking-widest uppercase text-white/90 mt-4 cursor-pointer">
                        Klaim Sekarang →
                    </div>
                </div>

                <div className="border-t border-gray-200" />

                <div className="flex-1 flex flex-col justify-between p-6 cursor-pointer">
                    <div>
                        <div className="text-[10px] font-bold tracking-[0.1em] uppercase text-gray-400 mb-2">
                            Jadi Penjual
                        </div>
                        <div className="font-display text-[1.2rem] font-bold text-gray-900 leading-snug">
                            Buka toko gratis,<br />raih jutaan pembeli
                        </div>
                        <div className="text-[12px] text-gray-400 mt-2">
                            Daftar dalam 5 menit
                        </div>
                    </div>
                    <div
                        className="text-[11px] font-bold tracking-widest uppercase text-red mt-4 cursor-pointer hover:text-red-dark"
                        onClick={() => navigate('/seller/register')}
                    >
                        Daftar Sekarang →
                    </div>
                </div>
            </div>
        </div>
    )
}