'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { ShoppingCart } from 'lucide-react'

interface StickyAddBarProps {
  productName: string
  price: number
  onAddToCart: () => void
  isDisabled: boolean
}

/**
 * Mobile-only sticky bottom bar with "Add to cart" always visible while scrolling.
 */
export function StickyAddBar({ productName, price, onAddToCart, isDisabled }: StickyAddBarProps) {
  return (
    <motion.div
      className="fixed bottom-0 left-0 right-0 z-[90] md:hidden bg-white border-t border-neutral-200 px-4 py-3 shadow-[0_-4px_20px_rgba(0,0,0,0.08)]"
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ delay: 0.5, type: 'spring', damping: 25, stiffness: 200 }}
    >
      <div className="flex items-center gap-3 max-w-lg mx-auto">
        <div className="flex flex-col flex-1 min-w-0">
          <span className="text-[10px] uppercase tracking-widest font-bold text-neutral-400 truncate">
            {productName}
          </span>
          <span className="text-lg font-black font-sans">${price.toFixed(2)}</span>
        </div>
        <button
          onClick={onAddToCart}
          disabled={isDisabled}
          className={`flex items-center gap-2 px-6 py-3.5 rounded-full uppercase text-[10px] font-black tracking-widest transition-all duration-300 cursor-pointer flex-shrink-0 ${
            isDisabled
              ? 'bg-neutral-200 text-neutral-400 cursor-not-allowed'
              : 'bg-black text-white hover:bg-[#FFDE00] hover:text-black shadow-lg'
          }`}
        >
          <ShoppingCart size={14} />
          Agregar
        </button>
      </div>
    </motion.div>
  )
}
