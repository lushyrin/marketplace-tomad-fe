import type { Product, Review } from '../types'

interface DummyReview {
    rating: number
    comment: string
    date: string
    reviewerName: string
    reviewerEmail: string
}

interface DummyProduct {
    id: number
    title: string
    description: string
    price: number
    discountPercentage: number
    rating: number
    stock: number
    brand: string
    category: string
    thumbnail: string
    images: string[]
    reviews?: DummyReview[]
    warrantyInformation?: string
    shippingInformation?: string
    returnPolicy?: string
}

interface DummyResponse {
    products: DummyProduct[]
    total: number
    skip: number
    limit: number
}

interface DummyCategory {
    slug: string
    name: string
    url: string
}

export interface ProductListParams {
    q?: string
    category?: string
    sort?: 'rating' | 'price_asc' | 'price_desc' | 'discount'
    page?: number
    limit?: number
}

const toProduct = (p: DummyProduct): Product => ({
    id: String(p.id),
    name: p.title,
    shop: p.brand ?? 'Official Store',
    shopId: `shop-${p.category}`,
    price: Math.round(p.price * 15000),
    originalPrice: p.discountPercentage > 1
        ? Math.round((p.price / (1 - p.discountPercentage / 100)) * 15000)
        : undefined,
    discount: p.discountPercentage > 1
        ? Math.round(p.discountPercentage)
        : undefined,
    badge: p.discountPercentage >= 40 ? 'sale' : undefined,
    rating: p.rating,
    sold: `${Math.floor(Math.random() * 900) + 100}`,
    location: 'Jakarta',
    category: p.category,
    stock: p.stock,
    description: p.description,
    thumbnail: p.thumbnail,
    images: p.images,
    brand: p.brand,
    warrantyInformation: p.warrantyInformation,
    shippingInformation: p.shippingInformation,
    returnPolicy: p.returnPolicy,
    reviews: p.reviews?.map((r): Review => ({
        rating: r.rating,
        comment: r.comment,
        date: r.date,
        reviewerName: r.reviewerName,
    })),
})

const sortProducts = (products: Product[], sort?: string): Product[] => {
    const sorted = [...products]
    switch (sort) {
        case 'price_asc': return sorted.sort((a, b) => a.price - b.price)
        case 'price_desc': return sorted.sort((a, b) => b.price - a.price)
        case 'rating': return sorted.sort((a, b) => b.rating - a.rating)
        case 'discount': return sorted.sort((a, b) => (b.discount ?? 0) - (a.discount ?? 0))
        default: return sorted
    }
}

export const fetchProductList = async (params: ProductListParams): Promise<{ products: Product[]; total: number }> => {
    const { q, category, sort, page = 1, limit = 20 } = params
    const skip = (page - 1) * limit

    let url: string
    if (q) {
        url = `https://dummyjson.com/products/search?q=${encodeURIComponent(q)}&limit=${limit}&skip=${skip}`
    } else if (category && category !== 'all') {
        url = `https://dummyjson.com/products/category/${category}?limit=100&skip=0`
    } else {
        url = `https://dummyjson.com/products?limit=100&skip=0`
    }

    const res = await fetch(url)
    const data: DummyResponse = await res.json()
    const allProducts = sortProducts(data.products.map(toProduct), sort)
    const paginated = allProducts.slice(skip, skip + limit)
    return { products: paginated, total: allProducts.length }
}

export const fetchFlashSale = async (): Promise<Product[]> => {
    const res = await fetch('https://dummyjson.com/products?limit=8&sortBy=discountPercentage&order=desc')
    const data: DummyResponse = await res.json()
    return data.products.map(toProduct)
}

export const fetchRecommendations = async (): Promise<Product[]> => {
    const res = await fetch('https://dummyjson.com/products?limit=8&sortBy=rating&order=desc&skip=8')
    const data: DummyResponse = await res.json()
    return data.products.map(toProduct)
}

export const fetchProductsByCategory = async (slug: string): Promise<Product[]> => {
    const url = slug === 'all'
        ? 'https://dummyjson.com/products?limit=16&sortBy=rating&order=desc'
        : `https://dummyjson.com/products/category/${slug}?limit=16`
    const res = await fetch(url)
    const data: DummyResponse = await res.json()
    return data.products.map(toProduct)
}

export const fetchCategories = async () => {
    const res = await fetch('https://dummyjson.com/products/categories')
    const data: DummyCategory[] = await res.json()
    return [
        { id: 'all', label: 'Semua', slug: 'all' },
        ...data.map(cat => ({ id: cat.slug, label: cat.name, slug: cat.slug })),
    ]
}

// includes reviews in the response
export const fetchProductById = async (id: string): Promise<Product> => {
    const res = await fetch(`https://dummyjson.com/products/${id}`)
    const data: DummyProduct = await res.json()
    return toProduct(data)
}