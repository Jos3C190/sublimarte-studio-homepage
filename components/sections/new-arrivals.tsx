'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { useCart } from '../providers/cart-provider'
import { getAssetPath } from '@/lib/utils'

export function NewArrivals() {
  const { addToCart } = useCart()

  const rawNewArrivalsData = [
    {
      id: 'na1',
      name: "Vinland Saga Premium Tee",
      desc: "Estampado de fidelidad extrema con diseño inspirado en Vinland Saga.",
      price: 26.99,
      frontImage: "/vinland_saga_desing1.png",
      backImage: "/vinland_saga_desing2.png",
      tag: "Anime Drop"
    },
    {
      id: 'na2',
      name: "Rick & Morty Cyberpunk",
      desc: "Estilo urbano con ilustración de Rick y Morty en alta definición.",
      price: 26.99,
      frontImage: "/rick_and_morty_desing1.png",
      backImage: "/rick_and_morty_desing2.png",
      tag: "Geek Aesthetic"
    },
    {
      id: 'na3',
      name: "San Valentín Love Drop",
      desc: "Edición especial limitada con ilustración minimalista de San Valentín.",
      price: 26.99,
      frontImage: "/san_valentin_desing1.png",
      backImage: "/san_valentin_desing2.png",
      tag: "Edición Especial"
    },
    {
      id: 'na4',
      name: "Anti Social Social Club",
      desc: "Clásico diseño urbano confeccionado en algodón de la más alta densidad.",
      price: 26.99,
      frontImage: "/anti_social_club_desing1.png",
      backImage: "/anti_social_club_desing2.png",
      tag: "Streetwear Icon"
    }
  ]

  const newArrivalsData = rawNewArrivalsData.map(item => ({
    ...item,
    frontImage: getAssetPath(item.frontImage),
    backImage: getAssetPath(item.backImage)
  }))

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
    <section className="bg-[#f5f5f5] py-12 md:py-24 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.h2
          className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-12 md:mb-20 text-left"
          style={{ fontFamily: 'var(--font-barlow-condensed)' }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Nuevos lanzamientos
        </motion.h2>

        <motion.div
          className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
        >
          {newArrivalsData.map((product) => (
            <motion.div
              key={product.id}
              variants={fadeInUp}
              className="bg-white flex flex-col border border-neutral-100 rounded-2xl overflow-hidden hover:shadow-2xl hover:shadow-neutral-900/5 hover:-translate-y-1 hover:border-neutral-200 transition-all duration-500 group/card relative"
            >
              <div className="aspect-square bg-[#e0e0e0] relative overflow-hidden flex items-center justify-center group rounded-lg m-2 md:m-3">
                <span className="absolute top-2 left-2 bg-[#FFDE00] text-black px-2.5 py-0.5 text-[9px] font-mono font-bold uppercase rounded-full z-10 shadow-md">Nuevo</span>
                {/* Front Image */}
                <img
                  src={product.frontImage}
                  alt={product.name}
                  className="w-full h-full object-cover scale-100 group-hover:scale-105 transition-all duration-700 ease-out absolute inset-0"
                  loading="lazy"
                />
                {/* Back Image */}
                <img
                  src={product.backImage}
                  alt={`${product.name} detalle`}
                  className="w-full h-full object-cover scale-100 group-hover:scale-105 opacity-0 group-hover:opacity-100 transition-all duration-700 ease-out absolute inset-0 z-10"
                  loading="lazy"
                />
              </div>
              <div className="p-2 md:p-4 pt-1 flex flex-col gap-1.5 md:gap-3 bg-white relative z-20 text-left">
                <span className="text-[8px] md:text-[9px] uppercase tracking-widest text-neutral-400 font-semibold">
                  {product.tag}
                </span>
                <h3 className="font-bold text-[11px] md:text-sm uppercase tracking-wide truncate group-hover/card:text-[#FFDE00] transition-colors duration-300">
                  {product.name}
                </h3>
                <p className="text-xs text-[#888888] hidden sm:block leading-relaxed">{product.desc}</p>
                <p className="font-bold text-xs md:text-lg">${product.price.toFixed(2)}</p>
                <button
                  onClick={() => addToCart({ name: product.name, price: product.price, image: product.frontImage }, 'Oversize')}
                  className="w-full bg-black text-white py-2 md:py-2.5 uppercase text-[9px] md:text-xs font-black hover:bg-[#FFDE00] hover:text-black transition-colors duration-300 rounded-full cursor-pointer"
                >
                  Agregar
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
