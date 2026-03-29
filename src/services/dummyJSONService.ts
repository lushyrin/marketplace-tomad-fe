import type { Product } from '../types'

// dummyjson product shape 
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

// maps dummyjson product to our product type
const toProduct = (p: DummyProduct): Product => ({
    id: String(p.id),
    name: p.title,
    shop: p.brand ?? 'Official Store',
    shopId: `shop-${p.category}`,
    price: Math.round(p.price * 15000),           // usd to idr approx
    originalPrice: p.discountPercentage > 0
        ? Math.round((p.price / (1 - p.discountPercentage / 100)) * 15000)
        : undefined,
    discount: p.discountPercentage > 0
        ? Math.round(p.discountPercentage)
        : undefined,
    badge: p.discountPercentage >= 30
        ? 'sale'
        : p.discountPercentage > 0
            ? 'hot'
            : undefined,
    rating: p.rating,
    sold: `${Math.floor(Math.random() * 900) + 100}`,
    location: 'Jakarta',
    category: p.category,
    stock: p.stock,
    description: p.description,
    thumbnail: p.thumbnail,
    images: p.images,
})

// flash sale — sorted by highest discount
export const fetchFlashSale = async (): Promise<Product[]> => {
    const res = await fetch(
        'https://dummyjson.com/products?limit=8&sortBy=discountPercentage&order=desc'
    )
    const data: DummyResponse = await res.json()
    return data.products.map(toProduct)
}

// recommendations 
export const fetchRecommendations = async (): Promise<Product[]> => {
    const res = await fetch(
        'https://dummyjson.com/products?limit=8&sortBy=rating&order=desc&skip=8'
    )
    const data: DummyResponse = await res.json()
    return data.products.map(toProduct)
}

// all categories
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

// single product by id
export const fetchProductById = async (id: string): Promise<Product> => {
    const res = await fetch(`https://dummyjson.com/products/${id}`)
    const data: DummyProduct = await res.json()
    return toProduct(data)
}