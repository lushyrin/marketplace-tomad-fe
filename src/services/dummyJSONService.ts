import type { Product } from '../types'

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
})

export const fetchFlashSale = async (): Promise<Product[]> => {
    const res = await fetch(
        'https://dummyjson.com/products?limit=8&sortBy=discountPercentage&order=desc'
    )
    const data: DummyResponse = await res.json()
    return data.products.map(toProduct)
}

export const fetchRecommendations = async (): Promise<Product[]> => {
    const res = await fetch(
        'https://dummyjson.com/products?limit=8&sortBy=rating&order=desc&skip=8'
    )
    const data: DummyResponse = await res.json()
    return data.products.map(toProduct)
}

// 'all' returns top rated products, otherwise fetches by category slug
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
        ...data.map(cat => ({
            id: cat.slug,
            label: cat.name,
            slug: cat.slug,
        })),
    ]
}

export const fetchProductById = async (id: string): Promise<Product> => {
    const res = await fetch(`https://dummyjson.com/products/${id}`)
    const data: DummyProduct = await res.json()
    return toProduct(data)
}