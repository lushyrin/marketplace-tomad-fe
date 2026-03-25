interface Props {
    rating: number
    showValue?: boolean
}

export const StarRating = ({ rating, showValue = true }: Props) => (
    <div className="flex items-center gap-1">
        <span className="text-amber-500 text-[11px]">★</span>
        {showValue && (
            <span className="text-[11px] font-medium text-gray-600">{rating}</span>
        )}
    </div>
)