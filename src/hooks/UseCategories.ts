import { useQuery } from '@tanstack/react-query'
import { fetchCategories } from '../services/dummyJSONService'

export const useCategories = () =>
    useQuery({
        queryKey: ['categories'],
        queryFn: fetchCategories,
        staleTime: 1000 * 60 * 60,
    })