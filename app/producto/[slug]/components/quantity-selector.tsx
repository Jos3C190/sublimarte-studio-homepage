'use client'

import React from 'react'
import { Minus, Plus } from 'lucide-react'

interface QuantitySelectorProps {
  quantity: number
  maxStock: number
  onQuantityChange: (qty: number) => void
}

/**
 * RF-PDP-07: Quantity selector with +/- controls and real-time stock validation.
 */
export function QuantitySelector({ quantity, maxStock, onQuantityChange }: QuantitySelectorProps) {
  const handleDecrease = () => {
    if (quantity > 1) onQuantityChange(quantity - 1)
  }

  const handleIncrease = () => {
    if (quantity < maxStock) onQuantityChange(quantity + 1)
  }

  const isLowStock = maxStock > 0 && maxStock <= 5

  return (
    <div className="flex flex-col gap-2.5">
      <span className="text-[10px] md:text-xs uppercase tracking-widest font-black text-neutral-400">
        Cantidad
      </span>
      <div className="flex items-center gap-3">
        <div className="flex items-center border-2 border-neutral-200 rounded-full overflow-hidden">
          <button
            onClick={handleDecrease}
            disabled={quantity <= 1}
            className="w-11 h-11 flex items-center justify-center text-neutral-600 hover:bg-neutral-100 hover:text-black transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
            aria-label="Reducir cantidad"
          >
            <Minus size={14} />
          </button>
          <span className="w-12 text-center text-sm font-black font-sans select-none">
            {quantity}
          </span>
          <button
            onClick={handleIncrease}
            disabled={quantity >= maxStock}
            className="w-11 h-11 flex items-center justify-center text-neutral-600 hover:bg-neutral-100 hover:text-black transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
            aria-label="Aumentar cantidad"
          >
            <Plus size={14} />
          </button>
        </div>

        {isLowStock && (
          <span className="text-[10px] md:text-xs font-bold text-orange-500 uppercase tracking-wider animate-pulse">
            ¡Solo {maxStock === 1 ? 'queda 1' : `quedan ${maxStock}`}!
          </span>
        )}
      </div>
    </div>
  )
}
