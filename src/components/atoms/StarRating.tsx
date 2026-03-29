import { StarFilled } from '@ant-design/icons'

interface Props {
    rating: number
    showValue?: boolean
}

export const StarRating = ({ rating, showValue = true }: Props) => (
    <div className="flex items-center gap-1">
        <StarFilled className="text-amber-400 text-[11px]" />
        {showValue && (
            <span className="text-[11px] font-medium text-gray-600">{rating}</span>
        )}
    </div>
)