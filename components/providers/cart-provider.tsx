'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'

export interface CartItem {
  id: string
  name: string
  price: number
  size: string
  qty: number
  image: string
}

interface CartContextType {
  cart: CartItem[]
  isCartOpen: boolean
  setIsCartOpen: (open: boolean) => void
  selectedSizes: Record<string, string>
  setSelectedSizes: React.Dispatch<React.SetStateAction<Record<string, string>>>
  addToCart: (product: { name: string; price: number; image: string }, size: string, quantity?: number) => void
  updateQty: (id: string, delta: number) => void
  removeFromCart: (id: string) => void
  totalCartQty: number
  cartSubtotal: number
  handleCheckout: () => void
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([])
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [selectedSizes, setSelectedSizes] = useState<Record<string, string>>({})

  // Load cart from localStorage on mount (for persistent shopping cart)
  useEffect(() => {
    const savedCart = localStorage.getItem('sublimarte_cart')
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart))
      } catch (e) {
        console.error('Failed to parse cart from localStorage:', e)
      }
    }
  }, [])

  // Save cart to localStorage on changes
  useEffect(() => {
    localStorage.setItem('sublimarte_cart', JSON.stringify(cart))
  }, [cart])

  const addToCart = (product: { name: string; price: number; image: string }, size: string, quantity: number = 1) => {
    setCart((prevCart) => {
      const existingItemIndex = prevCart.findIndex(
        (item) => item.name === product.name && item.size === size
      )

      if (existingItemIndex > -1) {
        return prevCart.map((item, idx) =>
          idx === existingItemIndex ? { ...item, qty: item.qty + quantity } : item
        )
      }

      const newItem: CartItem = {
        id: `${product.name}-${size}-${Date.now()}`,
        name: product.name,
        price: product.price,
        size: size,
        qty: quantity,
        image: product.image,
      }
      return [...prevCart, newItem]
    })
    setIsCartOpen(true)
  }

  const updateQty = (id: string, delta: number) => {
    setCart((prevCart) =>
      prevCart.map(item => {
        if (item.id === id) {
          const nextQty = item.qty + delta
          return { ...item, qty: nextQty < 1 ? 1 : nextQty }
        }
        return item
      })
    )
  }

  const removeFromCart = (id: string) => {
    setCart((prevCart) => prevCart.filter(item => item.id !== id))
  }

  const totalCartQty = cart.reduce((acc, item) => acc + item.qty, 0)
  const cartSubtotal = cart.reduce((acc, item) => acc + (item.price * item.qty), 0)

  const handleCheckout = () => {
    const message = encodeURIComponent(
      `Hola Sublimarte Studio 🇸🇻\n\nMe gustaría realizar el siguiente pedido:\n\n` +
      cart.map(item => `• ${item.name} | Talla: ${item.size} | Cantidad: ${item.qty} | Subtotal: $${(item.price * item.qty).toFixed(2)}`).join('\n') +
      `\n\n────────────────\n💰 *Subtotal:* $${cartSubtotal.toFixed(2)}\n🚚 *Envío:* ${cartSubtotal >= 50 ? 'Gratis' : '$3.50 (Estándar)'}\n💵 *Total Estimado:* $${(cartSubtotal + (cartSubtotal >= 50 ? 0 : 3.5)).toFixed(2)}\n\nPor favor, confírmenme disponibilidad para proceder con el pago y envío. ¡Gracias!`
    )
    window.open(`https://wa.me/50370581121?text=${message}`, '_blank')
  }

  return (
    <CartContext.Provider
      value={{
        cart,
        isCartOpen,
        setIsCartOpen,
        selectedSizes,
        setSelectedSizes,
        addToCart,
        updateQty,
        removeFromCart,
        totalCartQty,
        cartSubtotal,
        handleCheckout,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}
