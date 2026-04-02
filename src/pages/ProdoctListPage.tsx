import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { FilterSidebar } from '../components/organisms/FilterSidebar'
import { ProductGrid } from '../components/organisms/ProductGrid'
import { LoadingSpinner } from '../components/atoms/LoadingSpinner'
import { useCart } from '../hooks/UseCart'
import { useProductList } from '../hooks/UseProductList'

const LIMIT = 20

export const ProductListPage = () => {
    const [searchParams, setSearchParams] = useSearchParams()
    const { addToCart } = useCart()

    // read filters from URL so they are shareable/bookmarkable
    const [category, setCategory] = useState(searchParams.get('category') ?? 'all')
    const [sort, setSort] = useState(searchParams.get('sort') ?? 'rating')
    const [page, setPage] = useState(Number(searchParams.get('page') ?? 1))
    const q = searchParams.get('q') ?? ''

    // sync state back to URL when filters change
    useEffect(() => {
        const params: Record<string, string> = { sort, category, page: String(page) }
        if (q) params.q = q
        setSearchParams(params, { replace: true })
    }, [category, sort, page])

    const { data, isLoading, isFetching } = useProductList({ q, category, sort: sort as any, page, limit: LIMIT })

    const totalPages = Math.ceil((data?.total ?? 0) / LIMIT)

    const handleReset = () => {
        setCategory('all')
        setSort('rating')
        setPage(1)
    }

    const handleCategoryChange = (slug: string) => {
        setCategory(slug)
        setPage(1) // reset to first page on filter change
    }

    const handleSortChange = (s: string) => {
        setSort(s)
        setPage(1)
    }

    return (
        <div className="py-8">
            {/* header */}
            <div className="flex items-baseline justify-between mb-6">
                <div>
                    <h1 className="font-display text-[1.4rem] font-bold text-gray-900">
                        {q ? `Hasil pencarian: "${q}"` : 'Semua Produk'}
                    </h1>
                    {data && (
                        <p className="text-[12px] text-gray-400 mt-1">
                            {data.total} produk ditemukan
                        </p>
                    )}
                </div>

                {/* opacity indicator when fetching next page */}
                {isFetching && !isLoading && (
                    <span className="text-[12px] text-gray-400">Memuat...</span>
                )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-[220px_1fr] gap-6 items-start">
                {/* sidebar */}
                <FilterSidebar
                    selectedCategory={category}
                    selectedSort={sort}
                    onCategoryChange={handleCategoryChange}
                    onSortChange={handleSortChange}
                    onReset={handleReset}
                />

                {/* product grid */}
                <div>
                    {isLoading
                        ? <LoadingSpinner />
                        : <ProductGrid products={data?.products ?? []} onAddToCart={addToCart} />
                    }

                    {/* pagination */}
                    {totalPages > 1 && (
                        <div className="flex items-center justify-center gap-2 mt-8">
                            <button
                                onClick={() => setPage(p => Math.max(1, p - 1))}
                                disabled={page === 1}
                                className="px-4 py-2 border border-gray-300 text-[12px] font-medium text-gray-500 rounded-sm hover:border-gray-900 hover:text-gray-900 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                            >
                                ← Sebelumnya
                            </button>

                            {Array.from({ length: totalPages }, (_, i) => i + 1)
                                .filter(n => n === 1 || n === totalPages || Math.abs(n - page) <= 1)
                                .reduce<(number | '...')[]>((acc, n, i, arr) => {
                                    if (i > 0 && n - (arr[i - 1] as number) > 1) acc.push('...')
                                    acc.push(n)
                                    return acc
                                }, [])
                                .map((n, i) =>
                                    n === '...'
                                        ? <span key={`ellipsis-${i}`} className="text-gray-400 px-1">...</span>
                                        : <button
                                            key={n}
                                            onClick={() => setPage(n as number)}
                                            className={`w-9 h-9 text-[12px] font-medium rounded-sm border transition-all
                                                ${page === n
                                                    ? 'bg-red border-red text-white'
                                                    : 'border-gray-300 text-gray-500 hover:border-gray-900 hover:text-gray-900'
                                                }`}
                                        >
                                            {n}
                                        </button>
                                )
                            }

                            <button
                                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                                disabled={page === totalPages}
                                className="px-4 py-2 border border-gray-300 text-[12px] font-medium text-gray-500 rounded-sm hover:border-gray-900 hover:text-gray-900 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                            >
                                Berikutnya →
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
} 