import { useCategories } from '../../hooks/UseCategories'

interface Props {
    selectedCategory: string
    selectedSort: string
    onCategoryChange: (slug: string) => void
    onSortChange: (sort: string) => void
    onReset: () => void
}

const SORT_OPTIONS = [
    { value: 'rating', label: 'Rating Tertinggi' },
    { value: 'price_asc', label: 'Harga Terendah' },
    { value: 'price_desc', label: 'Harga Tertinggi' },
    { value: 'discount', label: 'Diskon Terbesar' },
]

export const FilterSidebar = ({
    selectedCategory,
    selectedSort,
    onCategoryChange,
    onSortChange,
    onReset,
}: Props) => {
    const { data: categories = [] } = useCategories()

    return (
        <aside className="border border-gray-200 rounded-sm">
            {/* sort */}
            <div className="p-4 border-b border-gray-200">
                <div className="text-[11px] font-bold tracking-widest uppercase text-gray-900 mb-3">
                    Urutkan
                </div>
                {SORT_OPTIONS.map(opt => (
                    <label key={opt.value} className="flex items-center gap-2 mb-2 cursor-pointer">
                        <input
                            type="radio"
                            name="sort"
                            value={opt.value}
                            checked={selectedSort === opt.value}
                            onChange={() => onSortChange(opt.value)}
                            className="accent-red"
                        />
                        <span className="text-[13px] text-gray-600">{opt.label}</span>
                    </label>
                ))}
            </div>

            {/* category */}
            <div className="p-4 border-b border-gray-200">
                <div className="text-[11px] font-bold tracking-widest uppercase text-gray-900 mb-3">
                    Kategori
                </div>
                {categories.map(cat => (
                    <label key={cat.id} className="flex items-center gap-2 mb-2 cursor-pointer">
                        <input
                            type="radio"
                            name="category"
                            value={cat.slug}
                            checked={selectedCategory === cat.slug}
                            onChange={() => onCategoryChange(cat.slug)}
                            className="accent-red"
                        />
                        <span className="text-[13px] text-gray-600 capitalize">{cat.label}</span>
                    </label>
                ))}
            </div>

            {/* reset */}
            <div className="p-4">
                <button
                    onClick={onReset}
                    className="w-full py-2 border border-gray-300 text-gray-500 text-[11px] font-bold tracking-widest uppercase rounded-sm hover:border-red hover:text-red transition-all"
                >
                    Reset Filter
                </button>
            </div>
        </aside>
    )
}