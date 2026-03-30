type BadgeType = 'sale' | 'new' | 'hot'

interface Props {
  type: BadgeType
}

const CONFIG: Record<BadgeType, { label: string; className: string }> = {
  sale: { label: 'Diskon', className: 'bg-red text-white' },
  new: { label: 'Baru', className: 'bg-gray-900 text-white' },
  hot: { label: 'Populer', className: 'bg-amber-100 text-amber-800' },
}

export const ProductBadge = ({ type }: Props) => {
  const { label, className } = CONFIG[type]
  return (
    <div className={`absolute top-0 left-0 text-[9px] font-bold px-2 py-1 tracking-widest uppercase rounded-sm ${className}`}>
      {label}
    </div>
  )
}