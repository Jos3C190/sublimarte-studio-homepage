'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { useCart } from '../providers/cart-provider'
import { productsData, featuredImages, featuredImagesBack } from '@/lib/products'

export function FeaturedProducts() {
  const { addToCart, selectedSizes, setSelectedSizes } = useCart()

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  return (
    <section id="catalog" className="bg-white py-12 md:py-24 px-4 md:px-8 border-t border-neutral-100">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="mb-12 md:mb-16 text-left"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2
            className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-4"
            style={{ fontFamily: 'var(--font-barlow-condensed)' }}
          >
            Destacados
          </h2>
          <p className="text-sm text-[#888888]">Los diseños más vendidos de la temporada.</p>
        </motion.div>

        <motion.div
          className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
        >
          {productsData.map((product) => {
            const currentSize = selectedSizes[product.id] || 'Oversize'
            const currentPrice = currentSize === 'Oversize' ? 24.99 : currentSize === 'Slim' ? 16.99 : 18.99
            return (
              <motion.div
                key={product.id}
                layout
                variants={fadeInUp}
                className="flex flex-col gap-2 md:gap-4 border border-neutral-100 p-2 md:p-4 rounded-2xl hover:shadow-2xl hover:shadow-neutral-900/5 hover:-translate-y-1 hover:border-neutral-200 transition-all duration-500 bg-white group/card"
              >
                <div className="aspect-square bg-[#f5f5f5] flex items-center justify-center overflow-hidden rounded-lg group relative">
                  {/* Front Image */}
                  <img
                    src={featuredImages[product.imageIdx]}
                    alt={product.name}
                    className="w-full h-full object-cover scale-100 group-hover:scale-105 transition-all duration-700 ease-out absolute inset-0"
                    loading="lazy"
                  />
                  {/* Back / Detail Image */}
                  <img
                    src={featuredImagesBack[product.imageIdx]}
                    alt={`${product.name} detail`}
                    className="w-full h-full object-cover scale-100 group-hover:scale-105 opacity-0 group-hover:opacity-100 transition-all duration-700 ease-out absolute inset-0 z-10"
                    loading="lazy"
                  />
                </div>
                <div className="flex flex-col gap-0.5 md:gap-2 text-left">
                  <span className="text-[8px] md:text-[9px] uppercase tracking-widest text-neutral-400 font-semibold">
                    {product.category}
                  </span>
                  <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                    <h3 className="font-bold text-[11px] md:text-sm uppercase tracking-wide truncate group-hover/card:text-[#FFDE00] transition-colors duration-300">
                      {product.name}
                    </h3>
                  </div>
                  <p className="text-xs text-[#888888] hidden sm:block leading-relaxed">Impresión de calidad premium con sublimación avanzada.</p>
                  <p className="font-bold text-xs md:text-lg">${currentPrice.toFixed(2)}</p>
                </div>

                {/* FIT CHIPS */}
                <div className="flex gap-1 md:gap-2 flex-wrap mt-0.5">
                  {['Oversize', 'Regular', 'Slim'].map((fit) => {
                    const isActive = currentSize === fit
                    return (
                      <button
                        key={fit}
                        onClick={() => setSelectedSizes(prev => ({ ...prev, [product.id]: fit }))}
                        className={`text-[8px] md:text-xs border px-2 py-0.5 transition-all duration-300 uppercase font-semibold rounded-full ${isActive
                          ? 'bg-black text-white border-black'
                          : 'bg-white text-black border-neutral-200 hover:bg-[#FFDE00] hover:text-black hover:border-[#FFDE00]'
                          }`}
                      >
                        {fit}
                      </button>
                    )
                  })}
                </div>

                <button
                  onClick={() => addToCart({ name: product.name, price: currentPrice, image: featuredImages[product.imageIdx] }, currentSize)}
                  className="w-full bg-black text-white py-2 md:py-3 uppercase text-[9px] md:text-xs font-black tracking-widest hover:bg-[#FFDE00] hover:text-black transition-colors duration-300 rounded-full cursor-pointer"
                >
                  Agregar al carrito
                </button>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
