import { useNavigate } from 'react-router-dom'
import type { Product } from '../../types'
import { ProductGrid } from './ProductGrid'

interface Props {
    products: Product[]
    onAddToCart: (product: Product) => void
}

export const RecommendationSection = ({ products, onAddToCart }: Props) => {
    const navigate = useNavigate()

    return (
        <section className="py-8">
            <div className="flex items-baseline justify-between mb-5">
                <span className="font-display text-[1.3rem] font-bold text-gray-900">
                    Rekomendasi untuk Kamu
                </span>
                <button
                    onClick={() => navigate('/products')}
                    className="text-[11px] font-bold tracking-widest uppercase text-red hover:text-red-dark transition-colors"
                >
                    Lihat Semua →
                </button>
            </div>

            <ProductGrid products={products} onAddToCart={onAddToCart} />
        </section>
    )
}