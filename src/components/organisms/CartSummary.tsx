import { useNavigate } from 'react-router-dom'
import { formatIDR } from '../../utils/format'

interface Props {
    selectedCount: number
    totalPrice: number
    onClear: () => void
}

const SHIPPING_FEE = 15000
const FREE_SHIPPING_MIN = 200000

export const CartSummary = ({ selectedCount, totalPrice, onClear }: Props) => {
    const navigate = useNavigate()

    const shippingFee = totalPrice >= FREE_SHIPPING_MIN ? 0 : SHIPPING_FEE
    const grandTotal = totalPrice + shippingFee

    return (
        <div className="border border-gray-200 rounded-sm p-5 sticky top-6">
            <div className="text-[12px] font-bold tracking-widest uppercase text-gray-900 mb-4">
                Ringkasan Pesanan
            </div>

            <div className="flex flex-col gap-2.5 mb-4">
                <div className="flex justify-between text-[13px] text-gray-600">
                    <span>Subtotal ({selectedCount} produk dipilih)</span>
                    <span>{formatIDR(totalPrice)}</span>
                </div>

                <div className="flex justify-between text-[13px] text-gray-600">
                    <span>Ongkos kirim</span>
                    <span className={shippingFee === 0 ? 'text-green-600 font-medium' : ''}>
                        {shippingFee === 0 ? 'Gratis' : formatIDR(shippingFee)}
                    </span>
                </div>

                {/* free shipping progress */}
                {totalPrice < FREE_SHIPPING_MIN && totalPrice > 0 && (
                    <div className="mt-1">
                        <div className="text-[11px] text-gray-400 mb-1">
                            Tambah {formatIDR(FREE_SHIPPING_MIN - totalPrice)} lagi untuk gratis ongkir
                        </div>
                        <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-red rounded-full transition-all"
                                style={{ width: `${Math.min((totalPrice / FREE_SHIPPING_MIN) * 100, 100)}%` }}
                            />
                        </div>
                    </div>
                )}

                <div className="border-t border-gray-200 pt-2.5 flex justify-between">
                    <span className="text-[14px] font-bold text-gray-900">Total</span>
                    <span className="font-display text-[1.1rem] font-bold text-gray-900">
                        {formatIDR(grandTotal)}
                    </span>
                </div>
            </div>

            <button
                onClick={() => navigate('/checkout')}
                disabled={selectedCount === 0}
                className="w-full py-3 bg-red text-white text-[13px] font-bold tracking-widest uppercase rounded-sm hover:bg-red-dark transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
                Beli ({selectedCount} produk)
            </button>

            <button
                onClick={() => navigate('/products')}
                className="w-full py-2.5 mt-2 border border-gray-300 text-gray-500 text-[12px] font-bold tracking-widest uppercase rounded-sm hover:border-gray-900 hover:text-gray-900 transition-all"
            >
                Lanjut Belanja
            </button>

            {selectedCount > 0 && (
                <button
                    onClick={onClear}
                    className="w-full mt-3 text-[11px] text-gray-400 hover:text-red transition-colors"
                >
                    Hapus semua item
                </button>
            )}
        </div>
    )
}