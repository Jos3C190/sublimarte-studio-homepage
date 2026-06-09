'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { ShoppingCart, Zap } from 'lucide-react'

interface ProductActionsProps {
  onAddToCart: () => void
  onBuyNow: () => void
  isDisabled: boolean
  price: number
  quantity: number
}

/**
 * RF-PDP-09: Primary "Add to cart" and secondary "Buy now" buttons.
 */
export function ProductActions({
  onAddToCart,
  onBuyNow,
  isDisabled,
  price,
  quantity,
}: ProductActionsProps) {
  const subtotal = price * quantity

  return (
    <div className="flex flex-col gap-3">
      {/* Subtotal line */}
      {quantity > 1 && (
        <div className="flex items-center justify-between px-1">
          <span className="text-[10px] uppercase tracking-widest font-bold text-neutral-400">
            Subtotal ({quantity} {quantity === 1 ? 'unidad' : 'unidades'})
          </span>
          <span className="text-sm font-black font-sans">${subtotal.toFixed(2)}</span>
        </div>
      )}

      {/* Add to cart — Primary CTA */}
      <motion.button
        onClick={onAddToCart}
        disabled={isDisabled}
        whileTap={!isDisabled ? { scale: 0.97 } : undefined}
        className={`w-full flex items-center justify-center gap-2.5 py-4 uppercase text-xs font-black tracking-widest rounded-full transition-all duration-300 cursor-pointer ${
          isDisabled
            ? 'bg-neutral-200 text-neutral-400 cursor-not-allowed'
            : 'bg-black text-white hover:bg-[#FFDE00] hover:text-black shadow-lg hover:shadow-xl hover:shadow-[#FFDE00]/10'
        }`}
      >
        <ShoppingCart size={16} />
        Agregar al carrito
      </motion.button>

      {/* Buy now — Secondary CTA */}
      <motion.button
        onClick={onBuyNow}
        disabled={isDisabled}
        whileTap={!isDisabled ? { scale: 0.97 } : undefined}
        className={`w-full flex items-center justify-center gap-2.5 py-4 uppercase text-xs font-black tracking-widest rounded-full border-2 transition-all duration-300 cursor-pointer ${
          isDisabled
            ? 'border-neutral-200 text-neutral-300 cursor-not-allowed'
            : 'border-black text-black bg-transparent hover:bg-black hover:text-white'
        }`}
      >
        <Zap size={16} />
        Comprar ahora
      </motion.button>

      {/* Free shipping hint */}
      {subtotal < 50 && (
        <p className="text-center text-[10px] text-neutral-400 font-medium">
          Agrega <span className="font-black text-black">${(50 - subtotal).toFixed(2)}</span> más
          para envío gratis a todo El Salvador 🇸🇻
        </p>
      )}
      {subtotal >= 50 && (
        <p className="text-center text-[10px] text-green-600 font-bold uppercase tracking-wider">
          ✓ ¡Envío gratis a todo El Salvador!
        </p>
      )}
    </div>
  )
}
