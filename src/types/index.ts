export interface Product {
    id: string
    icon: string
    badge?: 'sale' | 'new' | 'hot'
    shop: string
    name: string
    price: number
    originalPrice?: number
    discount?: number
    rating: number
    sold: number
    location: string
}
