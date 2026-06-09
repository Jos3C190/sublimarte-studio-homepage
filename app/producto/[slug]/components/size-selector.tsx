'use client'

import React from 'react'
import { motion } from 'framer-motion'
import type { Size } from '@/lib/products'

interface SizeSelectorProps {
  sizes: readonly Size[]
  selectedSize: string
  /** Map of size => whether it's available for current color/fit combo */
  availabilityMap: Record<string, boolean>
  onSizeChange: (size: string) => void
  onOpenSizeGuide: () => void
}

/**
 * RF-PDP-04: Size selector with availability indication per variant.
 */
export function SizeSelector({
  sizes,
  selectedSize,
  availabilityMap,
  onSizeChange,
  onOpenSizeGuide,
}: SizeSelectorProps) {
  return (
    <div className="flex flex-col gap-2.5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-[10px] md:text-xs uppercase tracking-widest font-black text-neutral-400">
            Talla
          </span>
          <span className="text-[10px] md:text-xs uppercase tracking-widest font-bold text-black">
            {selectedSize}
          </span>
        </div>
        <button
          onClick={onOpenSizeGuide}
          className="text-[10px] md:text-xs uppercase tracking-widest font-bold text-neutral-500 hover:text-black transition-colors duration-300 underline underline-offset-2 cursor-pointer"
        >
          Guía de tallas
        </button>
      </div>
      <div className="flex gap-2 flex-wrap">
        {sizes.map((size) => {
          const isAvailable = availabilityMap[size] !== false
          const isActive = selectedSize === size

          return (
            <motion.button
              key={size}
              onClick={() => isAvailable && onSizeChange(size)}
              whileTap={isAvailable ? { scale: 0.93 } : undefined}
              disabled={!isAvailable}
              className={`relative min-w-[44px] h-11 px-4 text-xs font-black uppercase tracking-wider rounded-full border-2 transition-all duration-300 cursor-pointer ${
                !isAvailable
                  ? 'border-neutral-100 text-neutral-300 cursor-not-allowed line-through bg-neutral-50'
                  : isActive
                    ? 'bg-black text-white border-black'
                    : 'bg-white text-black border-neutral-200 hover:border-[#FFDE00] hover:bg-[#FFDE00]/5'
              }`}
              aria-label={`Talla ${size}${!isAvailable ? ' — Agotada' : ''}`}
              aria-pressed={isActive}
            >
              {size}
            </motion.button>
          )
        })}
      </div>
    </div>
  )
}
