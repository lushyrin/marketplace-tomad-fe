import { useState, useEffect } from 'react'
import type { CartItem, Product } from '../types'

const CART_KEY = 'tomad_cart'

const loadCart = (): CartItem[] => {
    try {
        const raw = localStorage.getItem(CART_KEY)
        return raw ? JSON.parse(raw) : []
    } catch {
        return []
    }
}

export const useCart = () => {
    const [items, setItems] = useState<CartItem[]>(loadCart)

    useEffect(() => {
        localStorage.setItem(CART_KEY, JSON.stringify(items))
    }, [items])

    const addToCart = (product: Product) => {
        setItems(prev => {
            const existing = prev.find(i => i.productId === product.id)
            if (existing) {
                return prev.map(i =>
                    i.productId === product.id ? { ...i, quantity: i.quantity + 1 } : i
                )
            }
            return [...prev, {
                productId: product.id,
                name: product.name,
                price: product.price,
                quantity: 1,
                icon: product.icon,
                shop: product.shop,
            }]
        })
    }

    const removeFromCart = (productId: string) =>
        setItems(prev => prev.filter(i => i.productId !== productId))

    const updateQuantity = (productId: string, quantity: number) => {
        if (quantity <= 0) return removeFromCart(productId)
        setItems(prev =>
            prev.map(i => i.productId === productId ? { ...i, quantity } : i)
        )
    }

    const clearCart = () => setItems([])

    const totalItems = items.reduce((sum, i) => sum + i.quantity, 0)
    const totalPrice = items.reduce((sum, i) => sum + i.price * i.quantity, 0)

    return { items, addToCart, removeFromCart, updateQuantity, clearCart, totalItems, totalPrice }
}