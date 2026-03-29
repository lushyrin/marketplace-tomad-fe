export interface Product {
    id: string
    icon?: string
    badge?: 'sale' | 'new' | 'hot'
    shop: string
    shopId?: string
    name: string
    price: number
    originalPrice?: number
    discount?: number
    rating: number
    sold: string
    location: string
    category?: string
    stock?: number
    description?: string
    images?: string[]
    thumbnail?: string
}

export interface CartItem {
    productId: string
    name: string
    price: number
    quantity: number
    icon?: string
    shop: string
}

export interface ApiResponse<T> {
    data: T
    message: string
    success: boolean
}

export interface PaginatedResponse<T> {
    data: T[]
    total: number
    page: number
    limit: number
}