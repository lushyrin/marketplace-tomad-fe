import { useNavigate } from 'react-router-dom'
import type { Product } from '../../types'
import { ProductGrid } from './ProductGrid'
import { useCountdown } from '../../hooks/UseCountdown'
import { FLASH_SALE_DURATION_SECONDS } from '../../constants'

interface Props {
    products: Product[]
    onAddToCart: (product: Product) => void
}

export const FlashSaleSection = ({ products, onAddToCart }: Props) => {
    const { h, m, s } = useCountdown(FLASH_SALE_DURATION_SECONDS)
    const navigate = useNavigate()

    return (
        <section className="py-8 border-b border-gray-200">
            <div className="flex items-center gap-2.5 mb-5 flex-wrap">
                <span className="font-display text-[1.3rem] font-bold text-gray-900">
                    Flash Sale
                </span>

                <span className="bg-red text-white text-[10px] font-bold px-2.5 py-1 rounded-sm tracking-widest uppercase">
                    ● Live
                </span>

                {/* contdown */}
                <div className="flex items-center gap-1">
                    {[h, m, s].map((unit, i) => (
                        <span key={i} className="flex items-center gap-1">
                            <span className="bg-gray-900 text-white text-[12px] font-bold font-body px-2 py-0.5 rounded-sm min-w-[28px] text-center tabular-nums">
                                {unit}
                            </span>
                            {i < 2 && <span className="text-[12px] font-bold text-gray-400">:</span>}
                        </span>
                    ))}
                </div>

                <button
                    onClick={() => navigate('/products?sale=flash')}
                    className="ml-auto text-[11px] font-bold tracking-widest uppercase text-red hover:text-red-dark transition-colors"
                >
                    Lihat Semua →
                </button>
            </div>

            <ProductGrid products={products} onAddToCart={onAddToCart} />
        </section>
    )
}