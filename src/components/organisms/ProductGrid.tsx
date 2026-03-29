import type { Product } from '../../types'
import { ProductCard } from '../molecules/ProductCard'

interface Props {
    products: Product[]
    onAddToCart: (product: Product) => void
}

export const ProductGrid = ({ products, onAddToCart }: Props) => (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.map(p => (
            <ProductCard key={p.id} product={p} onAddToCart={onAddToCart} />
        ))}
    </div>
)