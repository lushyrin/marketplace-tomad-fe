import { useNavigate } from 'react-router-dom'
import type { Product } from '../../types'
import { PriceTag } from '../atoms/PriceTag'
import { ProductBadge } from '../atoms/ProductBadge'
import { StarRating } from '../atoms/StarRating'

interface Props {
    product: Product
    onAddToCart: (product: Product) => void
}

export const ProductCard = ({ product }: Props) => {
    const navigate = useNavigate()

    return (
        <div
            className="bg-white flex flex-col cursor-pointer group border border-gray-300 rounded-sm"
            onClick={() => navigate(`/products/${product.id}`)}
        >
            <div className="aspect-square bg-gray-50 flex items-center justify-center relative overflow-hidden group-hover:bg-red-pale transition-colors">
                {product.thumbnail
                    ? <img
                        src={product.thumbnail}
                        alt={product.name}
                        className="w-full h-full object-cover"
                    />
                    : <span className="text-5xl leading-none">{product.icon}</span>
                }
                {product.badge && <ProductBadge type={product.badge} />}
            </div>

            <div className="p-3 flex flex-col gap-1 flex-1">
                <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                    {product.shop}
                </div>

                <div className="text-[13px] font-medium text-gray-900 leading-snug line-clamp-2 flex-1 min-h-[36px]">
                    {product.name}
                </div>

                <PriceTag
                    price={product.price}
                    originalPrice={product.originalPrice}
                    discount={product.discount}
                />

                <div className="flex items-center justify-between mt-1">

                    <StarRating rating={product.rating} />
                    <span className="text-[10px] text-gray-400">{product.sold} terjual</span>
                </div>

                <div className="text-[10px] text-gray-400"> {product.location}</div>

            </div>
        </div>
    )
}