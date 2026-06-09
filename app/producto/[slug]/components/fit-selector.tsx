'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Check } from 'lucide-react'
import { FIT_PRICES, type Fit } from '@/lib/products'

interface FitSelectorProps {
  fits: readonly Fit[]
  selectedFit: string
  onFitChange: (fit: string) => void
}

const FIT_DESCRIPTIONS: Record<Fit, string> = {
  Oversize: 'Holgado y ancho — El corte streetwear por excelencia',
  Regular: 'Ajuste clásico — Cómodo y versátil para el día a día',
  Slim: 'Entallado — Silueta moderna y definida',
}

/**
 * RF-PDP-05: Fit/cut selector with dynamic price update on selection change.
 */
export function FitSelector({ fits, selectedFit, onFitChange }: FitSelectorProps) {
  return (
    <div className="flex flex-col gap-2.5">
      <div className="flex items-center gap-2">
        <span className="text-[10px] md:text-xs uppercase tracking-widest font-black text-neutral-400">
          Corte
        </span>
        <span className="text-[10px] md:text-xs uppercase tracking-widest font-bold text-black">
          {selectedFit}
        </span>
      </div>
      <div className="flex flex-col gap-2">
        {fits.map((fit) => {
          const isActive = selectedFit === fit
          const price = FIT_PRICES[fit]

          return (
            <motion.button
              key={fit}
              onClick={() => onFitChange(fit)}
              whileTap={{ scale: 0.98 }}
              className={`relative flex items-center justify-between gap-3 px-4 py-3 rounded-xl border-2 transition-all duration-300 cursor-pointer text-left ${
                isActive
                  ? 'border-black bg-black text-white'
                  : 'border-neutral-200 bg-white text-black hover:border-[#FFDE00]'
              }`}
              aria-label={`Corte ${fit} — $${price.toFixed(2)}`}
              aria-pressed={isActive}
            >
              <div className="flex flex-col gap-0.5">
                <span className="text-xs font-black uppercase tracking-wider">{fit}</span>
                <span className={`text-[10px] leading-tight ${
                  isActive ? 'text-white/60' : 'text-neutral-400'
                }`}>
                  {FIT_DESCRIPTIONS[fit]}
                </span>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <span className={`text-sm font-black font-sans ${
                  isActive ? 'text-[#FFDE00]' : 'text-black'
                }`}>
                  ${price.toFixed(2)}
                </span>
                {isActive && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-5 h-5 bg-[#FFDE00] rounded-full flex items-center justify-center"
                  >
                    <Check size={12} className="text-black" />
                  </motion.div>
                )}
              </div>
            </motion.button>
          )
        })}
      </div>
    </div>
  )
}
