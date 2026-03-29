export const Footer = () => (
    <footer className="border-t-2 border-gray-900 mt-8 pt-10 pb-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
            {/* brand */}
            <div className="col-span-2 md:col-span-1">
                <div className="font-display text-[1.4rem] font-bold text-red tracking-tight mb-2">
                    Tomad<sup className="text-[0.4rem] text-gray-400 font-body font-normal tracking-widest align-super">ID</sup>
                </div>
                <p className="text-[12px] text-gray-400 leading-relaxed max-w-[200px]">
                    Belanja apa saja, temukan harga terbaik.
                </p>
            </div>

            {/* layanan */}
            <div>
                <div className="text-[11px] font-bold tracking-widest uppercase text-gray-900 mb-3">Layanan</div>
                {['Pusat Bantuan', 'Cara Belanja', 'Cara Pembayaran', 'Lacak Pesanan'].map(item => (
                    <div key={item} className="text-[13px] text-gray-400 mb-2 cursor-pointer hover:text-gray-900 transition-colors">{item}</div>
                ))}
            </div>

            {/* pnjual */}
            <div>
                <div className="text-[11px] font-bold tracking-widest uppercase text-gray-900 mb-3">Penjual</div>
                {['Daftar Jadi Penjual', 'Panduan Penjual', 'Kebijakan Toko'].map(item => (
                    <div key={item} className="text-[13px] text-gray-400 mb-2 cursor-pointer hover:text-gray-900 transition-colors">{item}</div>
                ))}
            </div>

            {/* prusahaan */}
            <div>
                <div className="text-[11px] font-bold tracking-widest uppercase text-gray-900 mb-3">Perusahaan</div>
                {['Tentang Kami', 'Karir', 'Blog', 'Kebijakan Privasi'].map(item => (
                    <div key={item} className="text-[13px] text-gray-400 mb-2 cursor-pointer hover:text-gray-900 transition-colors">{item}</div>
                ))}
            </div>
        </div>

        <div className="border-t border-gray-200 pt-5 flex flex-wrap justify-between items-center gap-2 text-[11px] text-gray-400">
            <span>© 2025 Tomad ID. Semua hak dilindungi.</span>
            <span>Dibuat dengan ❤ di Indonesia</span>
        </div>
    </footer>
)