import { useState } from 'react'
import { StarFilled } from '@ant-design/icons'
import type { Review } from '../../types'
import { ReviewStars } from '../atoms/ReviewStars'

interface Props {
    reviews: Review[]
    rating: number
}

const formatDate = (dateStr: string) =>
    new Date(dateStr).toLocaleDateString('id-ID', {
        day: 'numeric', month: 'long', year: 'numeric',
    })

const getInitials = (name: string) =>
    name.split(' ').map(n => n[0]).slice(0, 2).join('').toUpperCase()

const getRatingBreakdown = (reviews: Review[]) => {
    const counts: Record<number, number> = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 }
    reviews.forEach(r => { if (counts[r.rating] !== undefined) counts[r.rating]++ })
    return counts
}

export const ReviewSection = ({ reviews, rating }: Props) => {
    const [filterStar, setFilterStar] = useState<number | null>(null)

    const breakdown = getRatingBreakdown(reviews)
    const filtered = filterStar
        ? reviews.filter(r => r.rating === filterStar)
        : reviews

    return (
        <div className="pt-8 border-t border-gray-200">
            <h2 className="font-display text-[1.2rem] font-bold text-gray-900 mb-6">
                Ulasan Pembeli
            </h2>

            {/* summary */}
            <div className="flex gap-6 p-5 bg-gray-50 border border-gray-200 rounded-sm mb-6">
                <div className="flex flex-col items-center justify-center flex-shrink-0 w-28 border-r border-gray-200 pr-6">
                    <div className="font-display text-[3.5rem] font-bold text-gray-900 leading-none mb-2">
                        {rating.toFixed(1)}
                    </div>
                    <ReviewStars rating={Math.round(rating)} size={14} />
                    <div className="text-[11px] text-gray-400 mt-1.5 text-center">
                        {reviews.length} ulasan
                    </div>
                </div>

                {/* clickable bars */}
                <div className="flex-1 flex flex-col justify-center gap-2">
                    {[5, 4, 3, 2, 1].map(star => {
                        const count = breakdown[star] ?? 0
                        const pct = reviews.length > 0 ? (count / reviews.length) * 100 : 0
                        const isActive = filterStar === star
                        return (
                            <button
                                key={star}
                                onClick={() => setFilterStar(isActive ? null : star)}
                                className={`flex items-center gap-2 transition-opacity ${filterStar && !isActive ? 'opacity-40' : 'opacity-100'}`}
                            >
                                <span className="text-[11px] font-medium text-gray-500 w-3 text-right">{star}</span>
                                <StarFilled style={{ fontSize: 10, color: '#f59e0b' }} />
                                <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                                    <div
                                        className={`h-full rounded-full transition-all ${isActive ? 'bg-red' : 'bg-amber-400'}`}
                                        style={{ width: `${pct}%` }}
                                    />
                                </div>
                                <span className="text-[11px] text-gray-400 w-4 text-left">{count}</span>
                            </button>
                        )
                    })}
                </div>
            </div>

            {/* active filter pill */}
            {filterStar && (
                <div className="flex items-center gap-2 mb-4">
                    <span className="text-[12px] text-gray-500">Filter:</span>
                    <button
                        onClick={() => setFilterStar(null)}
                        className="flex items-center gap-1.5 px-3 py-1 bg-red text-white text-[11px] font-bold rounded-sm"
                    >
                        {filterStar} bintang
                    </button>
                </div>
            )}

            {/* review cards */}
            <div className="flex flex-col gap-3">
                {filtered.length === 0 ? (
                    <div className="text-center py-10 text-[13px] text-gray-400">
                        Tidak ada ulasan untuk {filterStar} bintang.
                    </div>
                ) : (
                    filtered.map((review, i) => (
                        <div key={i} className="border border-gray-200 rounded-sm p-4">
                            <div className="flex items-start justify-between gap-3 mb-3">
                                <div className="flex items-center gap-3">
                                    <div className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center text-[11px] font-bold text-gray-500 flex-shrink-0">
                                        {getInitials(review.reviewerName)}
                                    </div>
                                    <div>
                                        <div className="text-[13px] font-medium text-gray-900">
                                            {review.reviewerName}
                                        </div>
                                        <div className="text-[11px] text-gray-400">
                                            {formatDate(review.date)}
                                        </div>
                                    </div>
                                </div>
                                <ReviewStars rating={review.rating} size={12} />
                            </div>

                            <p className="text-[13px] text-gray-600 leading-relaxed">
                                {review.comment}
                            </p>

                            {review.images && review.images.length > 0 && (
                                <div className="flex gap-2 mt-3">
                                    {review.images.map((img, j) => (
                                        <img
                                            key={j}
                                            src={img}
                                            alt=""
                                            className="w-16 h-16 object-cover rounded-sm border border-gray-200"
                                        />
                                    ))}
                                </div>
                            )}
                        </div>
                    ))
                )}
            </div>
        </div>
    )
}