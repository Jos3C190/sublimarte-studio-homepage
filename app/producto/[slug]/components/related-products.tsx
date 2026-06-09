'use client'

import React from 'react'
import Link from 'next/link'
import { featuredImages, featuredImagesBack, productsDetailData } from '@/lib/products'

interface RelatedProductsProps {
  productIds: string[]
  currentProductId: string
}

/**
 * RF-PDP-13: Related products grid from the same category.
 */
export function RelatedProducts({ productIds, currentProductId }: RelatedProductsProps) {
  const products = productIds
    .filter(id => id !== currentProductId)
    .map(id => productsDetailData.find(p => p.id === id))
    .filter(Boolean)
    .slice(0, 4)

  if (products.length === 0) return null

  return (
    <section className="py-16 md:py-24 px-4 md:px-8 bg-[#fafafa] border-t border-neutral-100">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12 text-left">
          <span className="text-[10px] md:text-xs uppercase tracking-widest text-[#FFDE00] font-black">
            Más estilos que te van a gustar
          </span>
          <h2
            className="text-3xl md:text-5xl font-black uppercase tracking-tighter mt-2"
            style={{ fontFamily: 'var(--font-barlow-condensed)' }}
          >
            Productos Relacionados
          </h2>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
          {products.map((product) => {
            if (!product) return null
            return (
              <Link
                key={product.id}
                href={`/producto/${product.slug}`}
                className="flex flex-col gap-2 md:gap-4 border border-neutral-100 p-2 md:p-4 rounded-2xl bg-white hover:shadow-2xl hover:shadow-neutral-900/5 hover:-translate-y-1 hover:border-neutral-200 transition-all duration-500 group/card"
              >
                <div className="aspect-square bg-[#f5f5f5] overflow-hidden rounded-lg relative group">
                  <img
                    src={featuredImages[product.imageIdx]}
                    alt={product.name}
                    className="w-full h-full object-cover scale-100 group-hover:scale-105 transition-all duration-700 ease-out absolute inset-0"
                    loading="lazy"
                  />
                  <img
                    src={featuredImagesBack[product.imageIdx]}
                    alt={`${product.name} detalle`}
                    className="w-full h-full object-cover scale-100 group-hover:scale-105 opacity-0 group-hover:opacity-100 transition-all duration-700 ease-out absolute inset-0 z-10"
                    loading="lazy"
                  />
                  {product.badges.length > 0 && (
                    <div className="absolute top-2 left-2 z-20 flex flex-col gap-1">
                      {product.badges.map((badge) => (
                        <span
                          key={badge}
                          className={`text-[8px] md:text-[9px] uppercase tracking-widest font-black px-2.5 py-1 rounded-full ${
                            badge === 'nuevo' ? 'bg-[#FFDE00] text-black' : 'bg-black text-white'
                          }`}
                        >
                          {badge}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
                <div className="flex flex-col gap-0.5 md:gap-1.5 text-left">
                  <span className="text-[8px] md:text-[9px] uppercase tracking-widest text-neutral-400 font-semibold">
                    {product.category}
                  </span>
                  <h3 className="font-bold text-[11px] md:text-sm uppercase tracking-wide truncate group-hover/card:text-[#FFDE00] transition-colors duration-300">
                    {product.name}
                  </h3>
                  <p className="font-bold text-xs md:text-base mt-1">Desde $16.99</p>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
