import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import {
    ShoppingCartOutlined,
    EnvironmentOutlined,
    ArrowLeftOutlined,
    ShopOutlined,
} from '@ant-design/icons'
import { useProduct } from '../hooks/UseProduct'
import { useCart } from '../hooks/UseCart'
import { StarRating } from '../components/atoms/StarRating'
import { PriceTag } from '../components/atoms/PriceTag'
import { ProductBadge } from '../components/atoms/ProductBadge'
import { ReviewSection } from '../components/organisms/ReviewSection'
import { LoadingSpinner } from '../components/atoms/LoadingSpinner'

export const ProductDetailPage = () => {
    const { id } = useParams<{ id: string }>()
    const navigate = useNavigate()
    const { addToCart } = useCart()

    const { data: product, isLoading, isError } = useProduct(id ?? '')

    // selected image index for gallery
    const [selectedImg, setSelectedImg] = useState(0)
    const [qty, setQty] = useState(1)
    const [added, setAdded] = useState(false)

    if (isLoading) return <LoadingSpinner fullPage />

    if (isError || !product) return (
        <div className="py-20 text-center">
            <p className="text-gray-400 text-[14px]">Produk tidak ditemukan.</p>
            <button
                onClick={() => navigate('/products')}
                className="mt-4 text-red text-[13px] font-bold"
            >
                ← Kembali ke produk
            </button>
        </div>
    )

    const images = product.images?.length ? product.images : [product.thumbnail ?? '']

    const handleAddToCart = () => {
        for (let i = 0; i < qty; i++) addToCart(product)
        setAdded(true)
        setTimeout(() => setAdded(false), 2000)
    }

    return (
        <div className="py-8">
            {/* breadcrumb */}
            <button
                onClick={() => navigate(-1)}
                className="flex items-center gap-1.5 text-[12px] text-gray-400 hover:text-gray-900 transition-colors mb-6"
            >
                <ArrowLeftOutlined className="text-[11px]" />
                Kembali
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                {/* image gallery */}
                <div className="flex flex-col gap-3">
                    {/* main image */}
                    <div className="aspect-square bg-gray-50 rounded-sm border border-gray-200 overflow-hidden relative">
                        <img
                            src={images[selectedImg]}
                            alt={product.name}
                            className="w-full h-full object-cover"
                        />
                        {product.badge && (
                            <div className="absolute top-3 left-3">
                                <ProductBadge type={product.badge} />
                            </div>
                        )}
                    </div>

                    {/* thumbnails */}
                    {images.length > 1 && (
                        <div className="flex gap-2 flex-wrap">
                            {images.map((img, i) => (
                                <button
                                    key={i}
                                    onClick={() => setSelectedImg(i)}
                                    className={`w-16 h-16 rounded-sm border overflow-hidden flex-shrink-0 transition-all ${selectedImg === i
                                        ? 'border-red'
                                        : 'border-gray-200 hover:border-gray-400'
                                        }`}
                                >
                                    <img src={img} alt="" className="w-full h-full object-cover" />
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {/* product info */}
                <div className="flex flex-col gap-5">
                    {/* shop */}
                    <div className="flex items-center gap-1.5 text-[12px] text-gray-400">
                        <ShopOutlined className="text-[12px]" />
                        <span>{product.shop}</span>
                    </div>

                    {/* name */}
                    <h1 className="font-display text-[1.5rem] font-bold text-gray-900 leading-snug">
                        {product.name}
                    </h1>

                    {/* rating + sold */}
                    <div className="flex items-center gap-3">
                        <StarRating rating={product.rating} />
                        <span className="text-[12px] text-gray-400">{product.rating} / 5</span>
                        <span className="text-gray-200">|</span>
                        <span className="text-[12px] text-gray-400">{product.sold} terjual</span>
                        <span className="text-gray-200">|</span>
                        <div className="flex items-center gap-1 text-[12px] text-gray-400">
                            <EnvironmentOutlined className="text-[11px]" />
                            {product.location}
                        </div>
                    </div>

                    {/* price */}
                    <div className="p-4 bg-gray-50 border border-gray-200 rounded-sm">
                        <PriceTag
                            price={product.price}
                            originalPrice={product.originalPrice}
                            discount={product.discount}
                        />
                    </div>

                    {/* description */}
                    <div>
                        <div className="text-[11px] font-bold tracking-widest uppercase text-gray-400 mb-2">
                            Deskripsi
                        </div>
                        <p className="text-[13px] text-gray-600 leading-relaxed">
                            {product.description}
                        </p>
                    </div>

                    {/* shipping info */}
                    <div className="flex flex-col gap-1.5 text-[12px] text-gray-500">
                        {product.shippingInformation && (
                            <div>Pengiriman: {product.shippingInformation}</div>
                        )}
                        {product.warrantyInformation && (
                            <div>Garansi: {product.warrantyInformation}</div>
                        )}
                        {product.returnPolicy && (
                            <div>Pengembalian: {product.returnPolicy}</div>
                        )}
                    </div>

                    {/* stock */}
                    <div className="text-[12px] text-gray-500">
                        Stok: <span className="font-medium text-gray-900">{product.stock}</span>
                    </div>

                    {/* qty + cart */}
                    <div className="flex flex-col gap-3 pt-2 border-t border-gray-200">
                        {/* quantity control */}
                        <div className="flex items-center gap-3">
                            <span className="text-[12px] text-gray-500">Jumlah</span>
                            <div className="flex items-center border border-gray-300 rounded-sm overflow-hidden">
                                <button
                                    onClick={() => setQty(q => Math.max(1, q - 1))}
                                    className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-100 transition-colors text-lg"
                                >
                                    −
                                </button>
                                <span className="w-10 text-center text-[13px] font-medium text-gray-900">
                                    {qty}
                                </span>
                                <button
                                    onClick={() => setQty(q => Math.min(product.stock ?? 99, q + 1))}
                                    className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-100 transition-colors text-lg"
                                >
                                    +
                                </button>
                            </div>
                        </div>

                        {/* add to cart button */}
                        <button
                            onClick={handleAddToCart}
                            className={`w-full py-3 flex items-center justify-center gap-2 text-[13px] font-bold tracking-widest uppercase rounded-sm border-2 transition-all ${added
                                ? 'bg-gray-900 border-gray-900 text-white'
                                : 'bg-red border-red text-white hover:bg-red-dark hover:border-red-dark'
                                }`}
                        >
                            <ShoppingCartOutlined className="text-[14px]" />
                            {added ? 'Ditambahkan!' : '+ Keranjang'}
                        </button>
                    </div>
                </div>
            </div>

            {/* reviews */}
            {product.reviews && product.reviews.length > 0 && (
                <div className="mt-12">
                    <ReviewSection reviews={product.reviews} rating={product.rating} />
                </div>
            )}
        </div>
    )
}