import { useState } from 'react'
import { StarFilled, StarOutlined, CameraOutlined, SendOutlined } from '@ant-design/icons'
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
    const [commentText, setCommentText] = useState('')
    const [commentRating, setCommentRating] = useState(0)
    const [hoverRating, setHoverRating] = useState(0)
    const [submitted, setSubmitted] = useState(false)
    const [localReviews, setLocalReviews] = useState<Review[]>(reviews)

    const breakdown = getRatingBreakdown(localReviews)
    const filtered = filterStar
        ? localReviews.filter(r => r.rating === filterStar)
        : localReviews

    const handleSubmit = () => {
        if (!commentText.trim() || commentRating === 0) return
        const newReview: Review = {
            rating: commentRating,
            comment: commentText,
            date: new Date().toISOString(),
            reviewerName: 'Kamu',
        }
        setLocalReviews(prev => [newReview, ...prev])
        setCommentText('')
        setCommentRating(0)
        setSubmitted(true)
        setTimeout(() => setSubmitted(false), 3000)
    }

    return (
        <div className="pt-8 border-t border-gray-200">

            <h2 className="font-display text-[1.2rem] font-bold text-gray-900 mb-6">
                Ulasan Pembeli
            </h2>

            {/* summary — score left, bars right */}
            <div className="flex gap-6 p-5 bg-gray-50 border border-gray-200 rounded-sm mb-6">
                <div className="flex flex-col items-center justify-center flex-shrink-0 w-28 border-r border-gray-200 pr-6">
                    <div className="font-display text-[3.5rem] font-bold text-gray-900 leading-none">
                        {rating.toFixed(1)}
                    </div>
                    <ReviewStars rating={Math.round(rating)} size={14} />
                    <div className="text-[11px] text-gray-400 mt-1.5 text-center">
                        {localReviews.length} ulasan
                    </div>
                </div>

                {/* clickable bars to filter by star */}
                <div className="flex-1 flex flex-col justify-center gap-2">
                    {[5, 4, 3, 2, 1].map(star => {
                        const count = breakdown[star] ?? 0
                        const pct = localReviews.length > 0 ? (count / localReviews.length) * 100 : 0
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
                        {filterStar} bintang × hapus
                    </button>
                </div>
            )}

            {/* write a review box */}
            <div className="border border-gray-200 rounded-sm p-4 mb-6">
                <div className="text-[12px] font-bold tracking-widest uppercase text-gray-900 mb-3">
                    Tulis Ulasan
                </div>

                {/* interactive star picker */}
                <div className="flex items-center gap-1 mb-3">
                    <span className="text-[12px] text-gray-500 mr-1">Rating:</span>
                    {[1, 2, 3, 4, 5].map(s => (
                        <button
                            key={s}
                            onMouseEnter={() => setHoverRating(s)}
                            onMouseLeave={() => setHoverRating(0)}
                            onClick={() => setCommentRating(s)}
                        >
                            {s <= (hoverRating || commentRating)
                                ? <StarFilled style={{ fontSize: 22, color: '#f59e0b' }} />
                                : <StarOutlined style={{ fontSize: 22, color: '#d1d5db' }} />
                            }
                        </button>
                    ))}
                    {commentRating > 0 && (
                        <span className="text-[11px] text-gray-400 ml-1">{commentRating}/5</span>
                    )}
                </div>

                <textarea
                    value={commentText}
                    onChange={e => setCommentText(e.target.value)}
                    placeholder="Ceritakan pengalamanmu dengan produk ini..."
                    rows={3}
                    className="w-full border border-gray-200 rounded-sm px-3 py-2.5 text-[13px] text-gray-900 placeholder-gray-400 outline-none focus:border-gray-400 resize-none transition-colors"
                />

                <div className="flex items-center justify-between mt-3">
                    <button className="flex items-center gap-1.5 text-[12px] text-gray-400 hover:text-gray-600 border border-dashed border-gray-300 rounded-sm px-3 py-1.5 transition-colors">
                        <CameraOutlined className="text-[13px]" />
                        Tambah foto
                    </button>

                    <button
                        onClick={handleSubmit}
                        disabled={!commentText.trim() || commentRating === 0}
                        className={`flex items-center gap-1.5 px-4 py-2 text-[12px] font-bold tracking-widest uppercase rounded-sm transition-all ${submitted
                            ? 'bg-gray-900 text-white'
                            : 'bg-red text-white hover:bg-red-dark disabled:opacity-40 disabled:cursor-not-allowed'
                            }`}
                    >
                        <SendOutlined className="text-[11px]" />
                        {submitted ? 'Terkirim!' : 'Kirim'}
                    </button>
                </div>
            </div>

            {/* review cards */}
            <div className="flex flex-col gap-3">
                {filtered.length === 0 ? (
                    <div className="text-center py-10 text-[13px] text-gray-400">
                        Tidak ada ulasan untuk {filterStar} bintang.
                    </div>
                ) : (
                    filtered.map((review, i) => (
                        <div key={i} className="border border-gray-200 rounded-sm p-4">
                            {/* top row: avatar + name + stars */}
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

                            {/* comment */}
                            <p className="text-[13px] text-gray-600 leading-relaxed">
                                {review.comment}
                            </p>

                            {/* only show images if the review has them */}
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