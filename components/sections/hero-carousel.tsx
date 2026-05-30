'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'

export function HeroCarousel() {
  const heroBanners = [
    {
      id: 1,
      image: 'https://i.pinimg.com/1200x/c5/c9/3e/c5c93e4a1cfdf91ceb5d6c1531543188.jpg',
      tag: '✦ NUEVA COLECCIÓN // OUTWEAR',
      title: 'Streetwear Premium',
      desc: 'Camisetas y sudaderas de algodón de alta densidad con estampados de fidelidad absoluta.',
      link: '#catalog',
      btnText: 'Explorar Colección'
    },
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?q=80&w=1400&auto=format&fit=crop',
      tag: '✦ PERSONALIZACIÓN DIRECTA',
      title: 'Tu Estilo, Sin Límites',
      desc: 'Envíanos tu logotipo o ilustración por WhatsApp y nosotros nos encargamos del mockup 100% gratis.',
      link: '#personalizacion',
      btnText: 'Cotizar en WhatsApp'
    },
    {
      id: 3,
      image: 'https://i.pinimg.com/736x/f0/66/08/f06608824a77260eb43e9265a9b17446.jpg',
      tag: '✦ DISEÑO EXCLUSIVO // DROP 01',
      title: 'Ediciones Limitadas',
      desc: 'Explora lanzamientos exclusivos inspirados en anime, música y cultura contemporánea.',
      link: '#catalog',
      btnText: 'Ver Destacados'
    }
  ]

  const [currentBannerIdx, setCurrentBannerIdx] = useState(0)

  useEffect(() => {
    const slideTimer = setInterval(() => {
      setCurrentBannerIdx((prev) => (prev + 1) % heroBanners.length)
    }, 6000)
    return () => clearInterval(slideTimer)
  }, [heroBanners.length])

  const handleBtnClick = (link: string) => {
    if (link.startsWith('#')) {
      const target = document.getElementById(link.substring(1))
      target?.scrollIntoView({ behavior: 'smooth' })
    } else {
      window.open(link, '_blank')
    }
  }

  return (
    <section className="bg-[#020202] relative h-[320px] sm:h-[420px] md:h-[480px] w-full overflow-hidden border-b border-neutral-900 z-10">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentBannerIdx}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
          className="absolute inset-0 w-full h-full"
        >
          {/* Background Image Banner */}
          <div className="absolute inset-0 w-full h-full">
            <img
              src={heroBanners[currentBannerIdx].image}
              alt={heroBanners[currentBannerIdx].title}
              className="w-full h-full object-cover brightness-[0.4] scale-100 transition-all duration-1000"
            />
          </div>

          {/* Subtle Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#020202] via-black/30 to-black/10" />

          {/* Banner Content Container */}
          <div className="absolute inset-0 flex flex-col justify-center px-6 md:px-16 lg:px-24">
            <div className="max-w-2xl text-left flex flex-col gap-3 md:gap-4">
              <motion.span
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 0.9, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-[9px] sm:text-[10px] uppercase tracking-[0.3em] text-[#FFDE00] font-black"
              >
                {heroBanners[currentBannerIdx].tag}
              </motion.span>
              <motion.h1
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="font-black uppercase tracking-tight leading-none text-2xl sm:text-4xl md:text-5xl lg:text-6xl text-white"
                style={{ fontFamily: 'var(--font-barlow-condensed)' }}
              >
                {heroBanners[currentBannerIdx].title}
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-xs sm:text-sm text-neutral-300 max-w-lg leading-relaxed font-normal"
              >
                {heroBanners[currentBannerIdx].desc}
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="pt-2"
              >
                <button
                  onClick={() => handleBtnClick(heroBanners[currentBannerIdx].link)}
                  className="bg-white text-black px-6 sm:px-8 py-2.5 sm:py-3.5 uppercase text-[9px] sm:text-[10px] font-black tracking-widest hover:bg-[#FFDE00] hover:text-black transition-colors duration-300 rounded-full hover:scale-105 active:scale-95 transition-all shadow-lg cursor-pointer"
                >
                  {heroBanners[currentBannerIdx].btnText}
                </button>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Slide Dots Indicator */}
      <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-20">
        {heroBanners.map((_, idx) => {
          const isActive = currentBannerIdx === idx
          return (
            <button
              key={idx}
              onClick={() => setCurrentBannerIdx(idx)}
              className={`h-1.5 transition-all duration-300 rounded-full cursor-pointer ${isActive ? 'w-6 bg-[#FFDE00]' : 'w-1.5 bg-white/40 hover:bg-white'}`}
              aria-label={`Ver diapositiva ${idx + 1}`}
            />
          )
        })}
      </div>

      {/* Slider Navigation Chevron Arrows */}
      <button
        onClick={() => setCurrentBannerIdx((prev) => (prev - 1 + heroBanners.length) % heroBanners.length)}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/20 hover:bg-black/60 text-white/60 hover:text-[#FFDE00] border border-white/5 hover:border-white/20 w-8 h-8 flex items-center justify-center rounded-full hover:scale-105 active:scale-95 cursor-pointer transition-all duration-300 z-20 hidden md:flex"
        aria-label="Diapositiva anterior"
      >
        <ChevronLeft size={18} />
      </button>
      <button
        onClick={() => setCurrentBannerIdx((prev) => (prev + 1) % heroBanners.length)}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/20 hover:bg-black/60 text-white/60 hover:text-[#FFDE00] border border-white/5 hover:border-white/20 w-8 h-8 flex items-center justify-center rounded-full hover:scale-105 active:scale-95 cursor-pointer transition-all duration-300 z-20 hidden md:flex"
        aria-label="Siguiente diapositiva"
      >
        <ChevronRight size={18} />
      </button>
    </section>
  )
}
