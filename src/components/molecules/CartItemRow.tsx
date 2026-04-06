import { DeleteOutlined } from '@ant-design/icons'
import type { CartItem } from '../../types'
import { formatIDR } from '../../utils/format'

interface Props {
    item: CartItem
    selected: boolean
    onToggleSelect: (productId: string) => void
    onRemove: (productId: string) => void
    onUpdateQty: (productId: string, qty: number) => void
}

export const CartItemRow = ({
    item,
    selected,
    onToggleSelect,
    onRemove,
    onUpdateQty,
}: Props) => (
    <div className={`flex gap-3 py-4 border-b border-gray-100 last:border-0 transition-opacity ${!selected ? 'opacity-50' : ''}`}>

        {/* checkbox */}
        <div className="flex items-center pt-1 flex-shrink-0">
            <input
                type="checkbox"
                checked={selected}
                onChange={() => onToggleSelect(item.productId)}
                className="w-4 h-4 accent-red cursor-pointer"
            />
        </div>

        {/* thumbnail */}
        <div className="w-20 h-20 flex-shrink-0 bg-gray-50 border border-gray-200 rounded-sm overflow-hidden">
            {item.thumbnail
                ? <img src={item.thumbnail} alt={item.name} className="w-full h-full object-cover" />
                : <div className="w-full h-full flex items-center justify-center text-2xl">{item.icon}</div>
            }
        </div>

        {/* info */}
        <div className="flex-1 min-w-0">
            <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-0.5">
                {item.shop}
            </div>
            <div className="text-[13px] font-medium text-gray-900 line-clamp-2 mb-2">
                {item.name}
            </div>
            <div className="font-display text-[1rem] font-bold text-gray-900 mb-3">
                {formatIDR(item.price)}
            </div>

            {/* qty + remove */}
            <div className="flex items-center gap-3">
                <div className="flex items-center border border-gray-200 rounded-sm overflow-hidden">
                    <button
                        onClick={() => onUpdateQty(item.productId, item.quantity - 1)}
                        className="w-7 h-7 flex items-center justify-center text-gray-500 hover:bg-gray-100 transition-colors"
                    >
                        −
                    </button>
                    <span className="w-8 text-center text-[13px] font-medium text-gray-900">
                        {item.quantity}
                    </span>
                    <button
                        onClick={() => onUpdateQty(item.productId, item.quantity + 1)}
                        className="w-7 h-7 flex items-center justify-center text-gray-500 hover:bg-gray-100 transition-colors"
                    >
                        +
                    </button>
                </div>

                <span className="text-gray-200">|</span>

                <button
                    onClick={() => onRemove(item.productId)}
                    className="flex items-center gap-1 text-[11px] text-gray-400 hover:text-red transition-colors"
                >
                    <DeleteOutlined className="text-[11px]" />
                    Hapus
                </button>
            </div>
        </div>

        {/* subtotal */}
        <div className="flex-shrink-0 text-right pt-1">
            <div className="text-[12px] font-bold text-gray-900">
                {formatIDR(item.price * item.quantity)}
            </div>
        </div>
    </div>
)