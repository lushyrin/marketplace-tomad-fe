import { useState, useEffect } from 'react'
import type { CartItem, Product } from '../types'

const CART_KEY = 'tomad_cart'

const load = <T,>(key: string): T[] => {
    try {
        const raw = localStorage.getItem(key)
        return raw ? JSON.parse(raw) : []
    } catch {
        return []
    }
}

export const useCart = () => {
    const [items, setItems] = useState<CartItem[]>(() => load(CART_KEY))
    const [selectedIds, setSelectedIds] = useState<Set<string>>(
        () => new Set(load<CartItem>(CART_KEY).map(i => i.productId))
    )

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
            // auto-select newly added items
            setSelectedIds(s => new Set([...s, product.id]))
            return [...prev, {
                productId: product.id,
                name: product.name,
                price: product.price,
                quantity: 1,
                icon: product.icon,
                thumbnail: product.thumbnail,
                shop: product.shop,
            }]
        })
    }

    const removeFromCart = (productId: string) => {
        setItems(prev => prev.filter(i => i.productId !== productId))
        setSelectedIds(prev => { const s = new Set(prev); s.delete(productId); return s })
    }

    const updateQuantity = (productId: string, quantity: number) => {
        if (quantity <= 0) return removeFromCart(productId)
        setItems(prev =>
            prev.map(i => i.productId === productId ? { ...i, quantity } : i)
        )
    }

    const clearCart = () => {
        setItems([])
        setSelectedIds(new Set())
    }

    const toggleSelect = (productId: string) =>
        setSelectedIds(prev => {
            const s = new Set(prev)
            s.has(productId) ? s.delete(productId) : s.add(productId)
            return s
        })

    const toggleSelectAll = () => {
        if (selectedIds.size === items.length) {
            setSelectedIds(new Set())
        } else {
            setSelectedIds(new Set(items.map(i => i.productId)))
        }
    }

    const selectedItems = items.filter(i => selectedIds.has(i.productId))
    const totalItems = items.reduce((sum, i) => sum + i.quantity, 0)
    const totalPrice = selectedItems.reduce((sum, i) => sum + i.price * i.quantity, 0)
    const selectedCount = selectedItems.reduce((sum, i) => sum + i.quantity, 0)

    return {
        items,
        selectedIds,
        selectedItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        toggleSelect,
        toggleSelectAll,
        totalItems,
        totalPrice,
        selectedCount,
    }
}