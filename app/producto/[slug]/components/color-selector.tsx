'use client'

import React from 'react'
import { motion } from 'framer-motion'
import type { ColorOption } from '@/lib/products'

interface ColorSelectorProps {
  colors: ColorOption[]
  selectedColor: string
  onColorChange: (colorName: string) => void
}

/**
 * RF-PDP-03: Color selector with visual chips showing only available colors.
 */
export function ColorSelector({ colors, selectedColor, onColorChange }: ColorSelectorProps) {
  return (
    <div className="flex flex-col gap-2.5">
      <div className="flex items-center gap-2">
        <span className="text-[10px] md:text-xs uppercase tracking-widest font-black text-neutral-400">
          Color
        </span>
        <span className="text-[10px] md:text-xs uppercase tracking-widest font-bold text-black">
          {selectedColor}
        </span>
      </div>
      <div className="flex gap-2.5">
        {colors.map((color) => {
          const isActive = selectedColor === color.name
          return (
            <motion.button
              key={color.name}
              onClick={() => onColorChange(color.name)}
              whileTap={{ scale: 0.9 }}
              className={`relative w-9 h-9 md:w-10 md:h-10 rounded-full cursor-pointer transition-all duration-300 ${
                isActive
                  ? 'ring-2 ring-offset-2 ring-[#FFDE00]'
                  : 'ring-1 ring-neutral-200 hover:ring-neutral-400'
              }`}
              style={{ backgroundColor: color.hex }}
              aria-label={`Seleccionar color ${color.name}`}
              aria-pressed={isActive}
              title={color.name}
            >
              {isActive && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    fill="none"
                    className={color.hex === '#f5f5f5' ? 'text-black' : 'text-white'}
                  >
                    <path
                      d="M2 7L5.5 10.5L12 3.5"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </motion.div>
              )}
            </motion.button>
          )
        })}
      </div>
    </div>
  )
}
