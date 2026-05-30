'use client'

import React from 'react'
import { useCart } from '@/components/providers/cart-provider'

interface CartActionsProps {
  productId: string
  productName: string
  productPrice: number
  productImage: string
}

export function CartActions({
  productId,
  productName,
  productPrice,
  productImage
}: CartActionsProps) {
  const { addToCart, selectedSizes, setSelectedSizes } = useCart()
  const currentSize = selectedSizes[productId] || 'Oversize'
  const currentPrice = currentSize === 'Oversize' ? 24.99 : currentSize === 'Slim' ? 16.99 : 18.99

  return (
    <div className="flex flex-col gap-2 md:gap-4 w-full text-left">
      <p className="font-bold text-xs md:text-lg text-black">${currentPrice.toFixed(2)}</p>

      {/* FIT CHIPS */}
      <div className="flex gap-1 md:gap-2 flex-wrap mt-0.5 justify-start">
        {['Oversize', 'Regular', 'Slim'].map((fit) => {
          const isActive = currentSize === fit
          return (
            <button
              key={fit}
              onClick={() => setSelectedSizes((prev) => ({ ...prev, [productId]: fit }))}
              className={`text-[8px] md:text-xs border px-2.5 py-1 transition-all duration-300 uppercase font-semibold rounded-full cursor-pointer ${
                isActive
                  ? 'bg-black text-white border-black'
                  : 'bg-white text-black border-neutral-200 hover:bg-[#FFDE00] hover:text-black hover:border-[#FFDE00]'
              }`}
            >
              {fit}
            </button>
          )
        })}
      </div>

      <button
        onClick={() =>
          addToCart(
            {
              name: productName,
              price: currentPrice,
              image: productImage
            },
            currentSize
          )
        }
        className="w-full bg-black text-white py-2.5 md:py-3.5 uppercase text-[9px] md:text-xs font-black tracking-widest hover:bg-[#FFDE00] hover:text-black transition-colors duration-300 rounded-full cursor-pointer"
      >
        Agregar al carrito
      </button>
    </div>
  )
}
