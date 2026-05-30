'use client'

import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ShoppingCart, Minus, Plus, Trash2 } from 'lucide-react'
import { useCart } from '../providers/cart-provider'

export function CartDrawer() {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    updateQty,
    removeFromCart,
    totalCartQty,
    cartSubtotal,
    handleCheckout,
  } = useCart()

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-xs z-[100] cursor-pointer"
          />

          {/* Sliding Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-black text-white border-l border-[#222222] shadow-2xl z-[101] flex flex-col justify-between md:rounded-l-3xl"
          >
            {/* Drawer Header */}
            <div className="p-6 border-b border-[#222222] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <h3 className="font-black text-lg uppercase tracking-widest text-[#FFDE00]">Tu Carrito</h3>
                <span className="bg-[#222222] text-white px-2 py-0.5 text-xs font-bold font-sans rounded-full">
                  {totalCartQty}
                </span>
              </div>
              <button
                onClick={() => setIsCartOpen(false)}
                className="text-white hover:text-[#FFDE00] transition-colors duration-300 p-1"
                aria-label="Cerrar carrito"
              >
                <X size={24} />
              </button>
            </div>

            {/* Drawer Content */}
            <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6">
              {cart.length === 0 ? (
                <div className="flex-1 flex flex-col items-center justify-center text-center gap-4 py-20">
                  <ShoppingCart size={48} className="text-white/20" />
                  <p className="font-bold text-sm tracking-widest text-white/50 uppercase">Tu carrito está vacío</p>
                  <button
                    onClick={() => setIsCartOpen(false)}
                    className="bg-white text-black px-6 py-2.5 uppercase text-[10px] font-black tracking-widest hover:bg-[#FFDE00] hover:text-black transition-colors duration-300 rounded-full"
                  >
                    Explorar tienda
                  </button>
                </div>
              ) : (
                <>
                  {/* Free Shipping Tracker */}
                  <div className="bg-[#111111] p-4 border border-[#222222] flex flex-col gap-2 rounded-2xl">
                    <div className="flex items-center justify-between text-xs font-black uppercase tracking-wider">
                      <span>Envío Gratis a SV</span>
                      <span className="text-[#FFDE00]">
                        {cartSubtotal >= 50 ? '¡Conseguido!' : `Faltan $${(50 - cartSubtotal).toFixed(2)}`}
                      </span>
                    </div>
                    <div className="h-1.5 bg-[#222222] w-full overflow-hidden rounded-full">
                      <motion.div
                        className="h-full bg-[#FFDE00]"
                        initial={{ width: 0 }}
                        animate={{ width: `${Math.min(100, (cartSubtotal / 50) * 100)}%` }}
                        transition={{ duration: 0.5 }}
                      />
                    </div>
                    <p className="text-[10px] text-[#888888] font-medium leading-relaxed">
                      {cartSubtotal >= 50
                        ? '🎉 ¡Tu pedido califica para envío gratis a todo El Salvador!'
                        : `Agrega $${(50 - cartSubtotal).toFixed(2)} más en productos sublimados para no pagar envío.`}
                    </p>
                  </div>

                  {/* Cart Items List */}
                  <div className="flex flex-col gap-4">
                    {cart.map((item) => (
                      <div key={item.id} className="flex gap-4 p-3 border border-[#222222] bg-[#0c0c0c] hover:border-white/20 transition-all duration-300 rounded-2xl">
                        {/* Thumbnail */}
                        <div className="w-20 h-20 bg-[#151515] flex-shrink-0 overflow-hidden border border-[#222222] rounded-xl">
                          <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                        </div>

                        {/* Info */}
                        <div className="flex-1 flex flex-col justify-between">
                          <div className="flex flex-col">
                            <div className="flex justify-between items-start gap-2">
                              <h4 className="font-black text-xs md:text-sm uppercase tracking-wide truncate max-w-[160px]">
                                {item.name}
                              </h4>
                              <button
                                onClick={() => removeFromCart(item.id)}
                                className="text-white/40 hover:text-red-500 transition-colors duration-300"
                                aria-label="Eliminar producto"
                              >
                                <Trash2 size={16} />
                              </button>
                            </div>
                            <span className="text-[10px] text-white/50 uppercase font-bold mt-1">
                              Talla: {item.size}
                            </span>
                          </div>

                          {/* Qty & Price Row */}
                          <div className="flex items-center justify-between">
                            <div className="flex items-center border border-[#222222] bg-black rounded-full overflow-hidden">
                              <button
                                onClick={() => updateQty(item.id, -1)}
                                className="px-2 py-1 text-white/60 hover:text-[#FFDE00] hover:bg-[#111] transition-colors"
                                aria-label="Reducir cantidad"
                              >
                                <Minus size={12} />
                              </button>
                              <span className="px-3 py-1 text-xs font-black font-sans min-w-[24px] text-center">
                                {item.qty}
                              </span>
                              <button
                                onClick={() => updateQty(item.id, 1)}
                                className="px-2 py-1 text-white/60 hover:text-[#FFDE00] hover:bg-[#111] transition-colors"
                                aria-label="Aumentar cantidad"
                              >
                                <Plus size={12} />
                              </button>
                            </div>
                            <span className="font-black text-sm text-[#FFDE00]">
                              ${((item.price) * item.qty).toFixed(2)}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Drawer Footer Checkout Panel */}
            {cart.length > 0 && (
              <div className="p-6 border-t border-[#222222] bg-[#080808] flex flex-col gap-4">
                <div className="flex flex-col gap-1.5">
                  <div className="flex items-center justify-between text-xs font-medium text-white/60 uppercase">
                    <span>Subtotal</span>
                    <span>${cartSubtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs font-medium text-white/60 uppercase">
                    <span>Envío</span>
                    <span>{cartSubtotal >= 50 ? 'Gratis' : '$3.50'}</span>
                  </div>
                  <div className="border-t border-[#222222] my-1" />
                  <div className="flex items-center justify-between text-sm font-black uppercase tracking-wider text-[#FFDE00]">
                    <span>Total Estimado</span>
                    <span className="text-lg font-sans">
                      ${(cartSubtotal + (cartSubtotal >= 50 ? 0 : 3.5)).toFixed(2)}
                    </span>
                  </div>
                </div>

                <button
                  onClick={handleCheckout}
                  className="w-full bg-[#FFDE00] text-black py-4 uppercase text-xs font-black tracking-widest hover:bg-white hover:text-black transition-all duration-300 rounded-full cursor-pointer shadow-lg hover:scale-[1.02] transform active:scale-95"
                >
                  Finalizar Compra vía WhatsApp
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
