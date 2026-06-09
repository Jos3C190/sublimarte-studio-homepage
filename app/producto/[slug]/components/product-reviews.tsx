'use client'

import React from 'react'
import { Star, BadgeCheck } from 'lucide-react'
import type { ProductReview } from '@/lib/products'

interface ProductReviewsProps {
  reviews: ProductReview[]
  productName: string
}

/**
 * RF-PDP-11: Customer reviews with 1-5 star rating and comments.
 * RF-PDP-12: Only users with delivered order can publish (UI shows disabled form).
 */
export function ProductReviews({ reviews, productName }: ProductReviewsProps) {
  const avgRating = reviews.length > 0
    ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
    : 0

  const ratingDistribution = [5, 4, 3, 2, 1].map(star => ({
    star,
    count: reviews.filter(r => r.rating === star).length,
    percentage: reviews.length > 0
      ? (reviews.filter(r => r.rating === star).length / reviews.length) * 100
      : 0,
  }))

  return (
    <section className="py-16 md:py-24 px-4 md:px-8 bg-white border-t border-neutral-100">
      <div className="max-w-5xl mx-auto">
        {/* Section header */}
        <div className="mb-12 text-left">
          <span className="text-[10px] md:text-xs uppercase tracking-widest text-[#FFDE00] font-black">
            Lo que dicen nuestros clientes
          </span>
          <h2
            className="text-3xl md:text-5xl font-black uppercase tracking-tighter mt-2"
            style={{ fontFamily: 'var(--font-barlow-condensed)' }}
          >
            Reseñas
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {/* Rating summary */}
          <div className="flex flex-col gap-4">
            <div className="flex items-end gap-3">
              <span className="text-5xl font-black font-sans leading-none">
                {avgRating.toFixed(1)}
              </span>
              <div className="flex flex-col gap-1 pb-1">
                <div className="flex gap-0.5">
                  {[1, 2, 3, 4, 5].map(star => (
                    <Star
                      key={star}
                      size={16}
                      className={star <= Math.round(avgRating)
                        ? 'text-[#FFDE00] fill-[#FFDE00]'
                        : 'text-neutral-200'
                      }
                    />
                  ))}
                </div>
                <span className="text-[10px] text-neutral-400 font-bold uppercase tracking-wider">
                  {reviews.length} {reviews.length === 1 ? 'reseña' : 'reseñas'}
                </span>
              </div>
            </div>

            {/* Distribution bars */}
            <div className="flex flex-col gap-1.5">
              {ratingDistribution.map(({ star, count, percentage }) => (
                <div key={star} className="flex items-center gap-2">
                  <span className="text-xs font-bold text-neutral-500 w-3 text-right">{star}</span>
                  <Star size={10} className="text-[#FFDE00] fill-[#FFDE00] flex-shrink-0" />
                  <div className="flex-1 h-2 bg-neutral-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#FFDE00] rounded-full transition-all duration-500"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                  <span className="text-[10px] text-neutral-400 font-sans font-bold w-4 text-right">
                    {count}
                  </span>
                </div>
              ))}
            </div>

            {/* Write review CTA (disabled for demo) */}
            <div className="mt-4 p-4 bg-neutral-50 rounded-xl border border-neutral-100">
              <p className="text-xs text-neutral-500 leading-relaxed mb-3">
                Para dejar una reseña, necesitas haber recibido tu pedido de este producto.
              </p>
              <button
                disabled
                className="w-full bg-neutral-200 text-neutral-400 py-3 uppercase text-[10px] font-black tracking-widest rounded-full cursor-not-allowed"
              >
                Inicia sesión para reseñar
              </button>
            </div>
          </div>

          {/* Reviews list */}
          <div className="md:col-span-2 flex flex-col gap-6">
            {reviews.map((review) => (
              <div
                key={review.id}
                className="p-5 border border-neutral-100 rounded-2xl hover:border-neutral-200 transition-all duration-300"
              >
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div className="flex items-center gap-3">
                    {/* Avatar */}
                    <div className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center text-xs font-black uppercase">
                      {review.author.charAt(0)}
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-bold">{review.author}</span>
                        {review.verified && (
                          <BadgeCheck size={14} className="text-[#FFDE00]" />
                        )}
                      </div>
                      <span className="text-[10px] text-neutral-400 font-medium">
                        {new Date(review.date).toLocaleDateString('es-SV', {
                          day: '2-digit',
                          month: '2-digit',
                          year: 'numeric',
                        })}
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-0.5 flex-shrink-0">
                    {[1, 2, 3, 4, 5].map(star => (
                      <Star
                        key={star}
                        size={12}
                        className={star <= review.rating
                          ? 'text-[#FFDE00] fill-[#FFDE00]'
                          : 'text-neutral-200'
                        }
                      />
                    ))}
                  </div>
                </div>
                <p className="text-xs md:text-sm text-neutral-600 leading-relaxed">
                  {review.comment}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
