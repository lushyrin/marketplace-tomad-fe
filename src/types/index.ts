export interface Product {
    id: string
    name: string
    shop: string
    shopId?: string
    price: number
    originalPrice?: number
    discount?: number
    rating: number
    sold: string
    location: string
    badge?: 'sale' | 'new' | 'hot'
    icon?: string
    thumbnail?: string
    images?: string[]
    category?: string
    stock?: number
    description?: string
    reviews?: Review[]
    brand?: string
    warrantyInformation?: string
    shippingInformation?: string
    returnPolicy?: string
}

export interface Review {
    rating: number
    comment: string
    date: string
    reviewerName: string
    images?: string[]
}

export interface Category {
    id: string
    label: string
    slug: string
}

export interface CartItem {
    productId: string
    name: string
    price: number
    quantity: number
    icon?: string
    thumbnail?: string
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