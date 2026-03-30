import { formatIDR } from '../../utils/format'

interface Props {
    price: number
    originalPrice?: number
    discount?: number
}

export const PriceTag = ({ price, originalPrice, discount }: Props) => (
    <div className="flex flex-col gap-0.5">
        <span className="font-display text-[1.05rem] font-bold text-gray-900">
            {formatIDR(price)}
        </span>
        {originalPrice && originalPrice > price && (
            <div className="flex items-center gap-1.5">
                <span className="text-[11px] text-gray-400 line-through">
                    {formatIDR(originalPrice)}
                </span>
                {discount && (
                    <span className="text-[11px] font-bold text-red">
                        -{discount}%
                    </span>
                )}
            </div>
        )}
    </div>
)