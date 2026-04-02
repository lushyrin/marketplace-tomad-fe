import { StarFilled, StarOutlined } from '@ant-design/icons'

interface Props {
    rating: number
    size?: number
}

export const ReviewStars = ({ rating, size = 12 }: Props) => (
    <div className="flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map(i => (
            i <= rating
                ? <StarFilled key={i} style={{ fontSize: size, color: '#f59e0b' }} />
                : <StarOutlined key={i} style={{ fontSize: size, color: '#d1d5db' }} />
        ))}
    </div>
)