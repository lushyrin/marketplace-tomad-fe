import { useNavigate } from 'react-router-dom'
import { ShoppingCartOutlined } from '@ant-design/icons'
import { useCart } from '../hooks/UseCart'
import { CartItemRow } from '../components/molecules/CartItemRow'
import { formatIDR } from '../utils/format'

const SHIPPING_FEE = 15000
const FREE_SHIPPING_MIN = 50000

export const CartPage = () => {
    const navigate = useNavigate()
    const {
        items,
        selectedIds,
        removeFromCart,
        updateQuantity,
        clearCart,
        toggleSelect,
        toggleSelectAll,
        totalItems,
        totalPrice,
        selectedCount,
    } = useCart()

    const grouped = items.reduce<Record<string, typeof items>>((acc, item) => {
        if (!acc[item.shop]) acc[item.shop] = []
        acc[item.shop].push(item)
        return acc
    }, {})

    const allSelected = selectedIds.size === items.length && items.length > 0
    const shippingFee = totalPrice >= FREE_SHIPPING_MIN ? 0 : SHIPPING_FEE
    const grandTotal = totalPrice + shippingFee

    if (items.length === 0) return (
        <div className="py-24 flex flex-col items-center gap-4">
            <ShoppingCartOutlined className="text-[64px] text-gray-200" />
            <p className="font-display text-[1.2rem] font-bold text-gray-400">
                Keranjang kamu kosong
            </p>
            <p className="text-[13px] text-gray-400">
                Yuk, mulai belanja produk favoritmu!
            </p>
            <button
                onClick={() => navigate('/products')}
                className="mt-2 px-6 py-3 bg-red text-white text-[12px] font-bold tracking-widest uppercase rounded-sm hover:bg-red-dark transition-colors"
            >
                Mulai Belanja
            </button>
        </div>
    )

    return (
        <div className="py-8 pb-32">

            {/* header */}
            <div className="flex items-baseline gap-3 mb-4 pb-4 border-b border-gray-200">
                <h1 className="font-display text-[1.4rem] font-bold text-gray-900">
                    Keranjang
                </h1>
                <span className="text-[13px] text-gray-400">{totalItems} produk</span>
                <button
                    onClick={clearCart}
                    className="ml-auto text-[12px] font-bold text-red hover:text-red-dark transition-colors"
                >
                    Hapus Semua
                </button>
            </div>

            {/* select all */}
            <div className="flex items-center gap-3 py-3 mb-2">
                <input
                    type="checkbox"
                    checked={allSelected}
                    onChange={toggleSelectAll}
                    className="w-4 h-4 accent-red cursor-pointer"
                />
                <span className="text-[13px] font-medium text-gray-700">Pilih Semua</span>
                {selectedIds.size > 0 && (
                    <span className="text-[12px] text-gray-400">({selectedIds.size} dipilih)</span>
                )}
            </div>

            {/* items grouped by shop */}
            <div className="flex flex-col gap-3">
                {Object.entries(grouped).map(([shop, shopItems]) => (
                    <div key={shop} className="border border-gray-200 rounded-sm overflow-hidden">
                        {/*checkbox + name */}
                        <div className="flex items-center gap-2.5 px-4 py-2.5 border-b border-gray-100 bg-gray-50">
                            <input
                                type="checkbox"
                                checked={shopItems.every(i => selectedIds.has(i.productId))}
                                onChange={() => {
                                    const allShopSelected = shopItems.every(i => selectedIds.has(i.productId))
                                    shopItems.forEach(i => {
                                        const isSelected = selectedIds.has(i.productId)
                                        if (allShopSelected && isSelected) toggleSelect(i.productId)
                                        if (!allShopSelected && !isSelected) toggleSelect(i.productId)
                                    })
                                }}
                                className="w-3.5 h-3.5 accent-red cursor-pointer"
                            />
                            <span className="text-[11px] font-bold tracking-widest uppercase text-gray-600">
                                {shop}
                            </span>
                        </div>

                        <div className="px-4">
                            {shopItems.map(item => (
                                <CartItemRow
                                    key={item.productId}
                                    item={item}
                                    selected={selectedIds.has(item.productId)}
                                    onToggleSelect={toggleSelect}
                                    onRemove={removeFromCart}
                                    onUpdateQty={updateQuantity}
                                />
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            {/*sticky bottom bar */}
            <div className="fixed bottom-0 left-0 right-0 bg-white border-t-2 border-gray-200 z-50">
                <div className="max-w-[1160px] mx-auto px-4 sm:px-6 py-3 flex items-center gap-4">
                    <div className="flex items-center gap-2 flex-shrink-0">
                        <input
                            type="checkbox"
                            checked={allSelected}
                            onChange={toggleSelectAll}
                            className="w-4 h-4 accent-red cursor-pointer"
                        />
                        <span className="text-[12px] text-gray-600 hidden sm:block">Semua</span>
                    </div>

                    <div className="flex-1">
                        <div className="flex items-baseline gap-1.5">
                            <span className="text-[12px] text-gray-500">Total:</span>
                            <span className="font-display text-[1.1rem] font-bold text-gray-900">
                                {formatIDR(grandTotal)}
                            </span>
                        </div>
                        {selectedCount > 0 && shippingFee === 0 && (
                            <div className="text-[10px] text-green-600 font-medium">Gratis ongkir</div>
                        )}
                        {selectedCount > 0 && shippingFee > 0 && (
                            <div className="text-[10px] text-gray-400">
                                +{formatIDR(shippingFee)} ongkir
                            </div>
                        )}
                    </div>

                    <button
                        onClick={() => navigate('/checkout')}
                        disabled={selectedCount === 0}
                        className="flex-shrink-0 px-6 py-3 bg-red text-white text-[13px] font-bold tracking-wide rounded-sm hover:bg-red-dark transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                        Beli ({selectedCount})
                    </button>
                </div>
            </div>
        </div>
    )
}