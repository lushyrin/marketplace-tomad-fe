import { useQuery } from '@tanstack/react-query'
import { fetchProductList, type ProductListParams } from '../services/dummyJSONService'

export const useProductList = (params: ProductListParams) =>
    useQuery({
        queryKey: ['products', 'list', params],
        queryFn: () => fetchProductList(params),
        staleTime: 1000 * 60 * 5,
        placeholderData: prev => prev, // keeps old data while loading next page
    })