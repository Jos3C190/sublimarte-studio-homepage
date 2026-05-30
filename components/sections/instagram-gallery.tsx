'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Instagram } from 'lucide-react'

export function InstagramGallery() {
  const instagramImages = [
    '/Instagram_Posts/image_post1.jpg',
    '/Instagram_Posts/image_post2.jpg',
    '/Instagram_Posts/image_post3.jpg',
    '/Instagram_Posts/image_post4.jpg',
    '/Instagram_Posts/image_post5.jpg',
    '/Instagram_Posts/image_post6.jpg',
    '/Instagram_Posts/image_post7.jpg',
  ]

  return (
    <section className="bg-white py-12 md:py-20 px-4 md:px-8 border-y border-neutral-100 overflow-hidden">
      {/* Header with Instagram Logo, Username and Tech Follow CTA */}
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 mb-12">
        <div className="flex items-center gap-3.5 text-left">
          <div className="bg-black text-white p-3 border border-[#333333] flex items-center justify-center">
            <Instagram size={22} className="text-white" />
          </div>
          <div className="flex flex-col">
            <span className="text-[9px] tracking-[0.25em] text-[#888888] uppercase font-black">Comunidad Streetwear</span>
            <a
              href="https://instagram.com/Sublimartestudio_25"
              target="_blank"
              rel="noopener noreferrer"
              className="font-black text-lg md:text-xl tracking-tight uppercase hover:text-[#888888] transition-colors leading-none mt-1"
            >
              @Sublimartestudio_25
            </a>
          </div>
        </div>
        <a
          href="https://instagram.com/Sublimartestudio_25"
          target="_blank"
          rel="noopener noreferrer"
          className="border border-black bg-black text-white hover:bg-[#FFDE00] hover:text-black hover:shadow-[3px_3px_0px_0px_#000] px-6 py-3 uppercase text-xs font-black tracking-widest transition-all duration-300 !rounded-none"
        >
          Seguir en Instagram
        </a>
      </div>

      {/* Infinite Marquee Container */}
      <div className="relative w-full overflow-hidden">
        {/* Subtle gradient fades on the edges to look incredibly high-end */}
        <div className="absolute left-0 top-0 bottom-0 w-10 md:w-24 bg-gradient-to-r from-white via-white/40 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-10 md:w-24 bg-gradient-to-l from-white via-white/40 to-transparent z-10 pointer-events-none" />

        <motion.div
          className="flex gap-4 md:gap-6 w-max"
          animate={{ x: ['0%', '-50%'] }}
          transition={{
            ease: 'linear',
            duration: 25,
            repeat: Infinity,
          }}
        >
          {[...instagramImages, ...instagramImages].map((imgUrl, idx) => (
            <div
              key={idx}
              className="flex-shrink-0 h-60 w-60 md:h-80 md:w-80 bg-[#f5f5f5] overflow-hidden border border-neutral-100 group cursor-pointer relative rounded-2xl"
            >
              <img
                src={imgUrl}
                alt={`Instagram Post ${idx + 1}`}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                loading="lazy"
              />
              {/* Interactive Editorial Hover Overlay Card */}
              <div className="absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center text-white p-6 text-center z-20">
                <Instagram size={28} className="text-[#FFDE00] mb-3" />
                <span className="text-[10px] tracking-[0.2em] uppercase font-black text-white/80">Ver Publicación</span>
                <p className="text-[11px] text-neutral-400 mt-2 line-clamp-2 max-w-[180px] leading-relaxed">¡Los drops más solicitados de esta semana ya en tienda! 🇸🇻</p>

                <div className="flex gap-5 mt-4 text-xs font-mono font-bold text-[#FFDE00]">
                  <span className="flex items-center gap-1">♥ {210 + (idx * 23) % 150}</span>
                  <span className="flex items-center gap-1 text-white">💬 {18 + (idx * 4) % 15}</span>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
