import { useQuery } from '@tanstack/react-query'
import {
    fetchFlashSale,
    fetchRecommendations,
    fetchProductById,
} from '../services/dummyJSONService'

export const useFlashSale = () =>
    useQuery({
        queryKey: ['products', 'flash-sale'],
        queryFn: fetchFlashSale,
        staleTime: 1000 * 60 * 5,
    })

export const useRecommendations = () =>
    useQuery({
        queryKey: ['products', 'recommendations'],
        queryFn: fetchRecommendations,
        staleTime: 1000 * 60 * 5,
    })

export const useProduct = (id: string) =>
    useQuery({
        queryKey: ['product', id],
        queryFn: () => fetchProductById(id),
        enabled: !!id,
        staleTime: 1000 * 60 * 5,
    })