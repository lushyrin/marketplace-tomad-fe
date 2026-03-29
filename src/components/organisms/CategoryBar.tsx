import { useState } from 'react'
import { useCategories } from '../../hooks/UseCategories'

interface Props {
    onSelect?: (slug: string) => void
}

export const CategoryBar = ({ onSelect }: Props) => {
    const [active, setActive] = useState('all')
    const { data: categories = [] } = useCategories()

    const handleClick = (slug: string) => {
        setActive(slug)
        onSelect?.(slug)
    }

    return (
        <div className="flex overflow-x-auto border-b border-gray-200" style={{ scrollbarWidth: 'none' }}>
            {categories.map(cat => (
                <button
                    key={cat.id}
                    onClick={() => handleClick(cat.slug)}
                    className={`
            flex-shrink-0 px-5 py-3 text-[12px] font-medium tracking-wide whitespace-nowrap
            border-b-2 -mb-px transition-all cursor-pointer bg-transparent
            ${active === cat.slug
                            ? 'text-red border-red font-bold'
                            : 'text-gray-400 border-transparent hover:text-gray-900'
                        }
          `}
                >
                    {cat.label}
                </button>
            ))}
        </div>
    )
}