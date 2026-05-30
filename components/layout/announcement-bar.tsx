'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export function AnnouncementBar() {
  const promoMessages = [
    "✦ ¡Envío gratis a todo El Salvador por compras mayores a $50.00! 🇸🇻 ✦",
    "✦ 10% OFF en tu primera compra — Código: SUBLIM10 ✦",
    "✦ Confección Premium 100% Algodón & Personalización Directa ✦"
  ]
  const [currentPromoIdx, setCurrentPromoIdx] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentPromoIdx((prev) => (prev + 1) % promoMessages.length)
    }, 4500)
    return () => clearInterval(timer)
  }, [promoMessages.length])

  return (
    <div className="bg-[#0f0f11] text-neutral-300 h-9 border-b border-neutral-900 flex items-center justify-center overflow-hidden select-none relative z-50">
      <div className="max-w-7xl mx-auto w-full px-4 flex items-center justify-center text-center relative h-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPromoIdx}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="text-[10px] md:text-xs tracking-[0.18em] font-medium uppercase flex items-center justify-center gap-2"
          >
            {currentPromoIdx === 1 ? (
              <span className="flex items-center gap-1 flex-wrap justify-center">
                ✦ 10% OFF en tu primera compra — Código: <span className="bg-neutral-800 text-[#FFDE00] px-2 py-0.5 rounded font-mono font-bold text-[9px] md:text-[10px]">SUBLIM10</span> ✦
              </span>
            ) : (
              <span>{promoMessages[currentPromoIdx]}</span>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}
