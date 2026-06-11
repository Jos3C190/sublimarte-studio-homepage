'use client'

import React, { useState, useMemo, useCallback } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Star, Check, Truck, Shield, Palette } from 'lucide-react'
import { useCart } from '@/components/providers/cart-provider'
import {
  AVAILABLE_COLORS,
  AVAILABLE_SIZES,
  AVAILABLE_FITS,
  FIT_PRICES,
  getVariantStock,
  isSizeAvailable,
  featuredImages,
  featuredImagesBack,
  type ProductDetail,
  type Fit,
} from '@/lib/products'
import { ProductGallery } from './product-gallery'
import { ColorSelector } from './color-selector'
import { SizeSelector } from './size-selector'
import { FitSelector } from './fit-selector'
import { QuantitySelector } from './quantity-selector'
import { ProductActions } from './product-actions'
import { SizeGuideModal } from './size-guide-modal'
import { ShareProduct } from './share-product'

interface ProductDetailClientProps {
  product: ProductDetail
}

/**
 * Client-side orchestrator for the PDP.
 * Manages all variant selection state and connects sub-components.
 */
export function ProductDetailClient({ product }: ProductDetailClientProps) {
  const { addToCart } = useCart()

  // Variant selection state
  const [selectedColor, setSelectedColor] = useState(AVAILABLE_COLORS[0].name)
  const [selectedSize, setSelectedSize] = useState<string>('M')
  const [selectedFit, setSelectedFit] = useState<string>('Oversize')
  const [quantity, setQuantity] = useState(1)
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false)
  const [addedFeedback, setAddedFeedback] = useState(false)

  // Derived values
  const currentPrice = FIT_PRICES[selectedFit] ?? 24.99
  const currentStock = getVariantStock(product.stockMap, selectedColor, selectedSize, selectedFit)
  const isOutOfStock = currentStock <= 0

  // Build gallery images based on selected color
  const galleryImages = useMemo(() => {
    const front = featuredImages[product.imageIdx]
    const back = featuredImagesBack[product.imageIdx]
    // With real backend, images would change per color.
    // For demo: show front and back for all colors.
    return [front, back]
  }, [product.imageIdx])

  // Size availability map for current color
  const sizeAvailabilityMap = useMemo(() => {
    const map: Record<string, boolean> = {}
    for (const size of AVAILABLE_SIZES) {
      map[size] = isSizeAvailable(product.stockMap, selectedColor, size)
    }
    return map
  }, [product.stockMap, selectedColor])

  // Average rating
  const avgRating = product.reviews.length > 0
    ? product.reviews.reduce((sum, r) => sum + r.rating, 0) / product.reviews.length
    : 0

  const handleAddToCart = useCallback(() => {
    addToCart(
      {
        name: product.name,
        price: currentPrice,
        image: featuredImages[product.imageIdx],
      },
      `${selectedFit} · ${selectedSize} · ${selectedColor}`,
      quantity
    )
    setAddedFeedback(true)
    setTimeout(() => setAddedFeedback(false), 2000)
  }, [addToCart, product.name, product.imageIdx, currentPrice, selectedFit, selectedSize, selectedColor, quantity])

  const handleBuyNow = useCallback(() => {
    const message = encodeURIComponent(
      `¡Hola Sublimarte Studio! 🇸🇻\n\n` +
      `Quiero comprar:\n` +
      `• ${product.name}\n` +
      `• Color: ${selectedColor}\n` +
      `• Talla: ${selectedSize}\n` +
      `• Corte: ${selectedFit}\n` +
      `• Cantidad: ${quantity}\n` +
      `• Precio unitario: $${currentPrice.toFixed(2)}\n` +
      `• Total: $${(currentPrice * quantity).toFixed(2)}\n\n` +
      `¡Por favor confírmenme disponibilidad para proceder con el pago!`
    )
    window.open(`https://wa.me/50370581121?text=${message}`, '_blank')
  }, [product.name, selectedColor, selectedSize, selectedFit, quantity, currentPrice])

  return (
    <>
      {/* Main PDP Section */}
      <section className="bg-white py-8 md:py-16 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 mb-6 md:mb-10 text-[10px] md:text-xs font-bold uppercase tracking-widest" aria-label="Breadcrumb">
            <Link href="/" className="text-neutral-400 hover:text-black transition-colors duration-300">
              Inicio
            </Link>
            <span className="text-neutral-300">/</span>
            <Link href={`/colecciones/${product.category.toLowerCase()}`} className="text-neutral-400 hover:text-black transition-colors duration-300">
              {product.category}
            </Link>
            <span className="text-neutral-300">/</span>
            <span className="text-[#FFDE00]">{product.name}</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
            {/* LEFT: Gallery */}
            <div className="lg:sticky lg:top-28 lg:self-start">
              <ProductGallery images={galleryImages} productName={product.name} />
            </div>

            {/* RIGHT: Product Info + Selectors */}
            <div className="flex flex-col gap-6 md:gap-8">
              {/* Badges */}
              {product.badges.length > 0 && (
                <div className="flex gap-2">
                  {product.badges.map((badge) => (
                    <span
                      key={badge}
                      className={`text-[9px] md:text-[10px] uppercase tracking-widest font-black px-3 py-1 rounded-full ${
                        badge === 'nuevo'
                          ? 'bg-[#FFDE00] text-black'
                          : 'bg-black text-white'
                      }`}
                    >
                      {badge}
                    </span>
                  ))}
                  <span className="text-[9px] md:text-[10px] uppercase tracking-widest font-semibold px-3 py-1 rounded-full bg-neutral-100 text-neutral-500">
                    {product.category}
                  </span>
                </div>
              )}

              {/* Product name */}
              <div>
                <h1
                  className="text-4xl sm:text-5xl md:text-6xl font-black uppercase tracking-tighter leading-[0.9]"
                  style={{ fontFamily: 'var(--font-barlow-condensed)' }}
                >
                  {product.name}
                </h1>

                {/* Rating summary inline */}
                {product.reviews.length > 0 && (
                  <div className="flex items-center gap-2 mt-3">
                    <div className="flex gap-0.5">
                      {[1, 2, 3, 4, 5].map(star => (
                        <Star
                          key={star}
                          size={14}
                          className={star <= Math.round(avgRating)
                            ? 'text-[#FFDE00] fill-[#FFDE00]'
                            : 'text-neutral-200'
                          }
                        />
                      ))}
                    </div>
                    <span className="text-xs text-neutral-500 font-semibold">
                      {avgRating.toFixed(1)} · {product.reviews.length} reseñas
                    </span>
                  </div>
                )}
              </div>

              {/* Dynamic price */}
              <div className="flex items-end gap-3">
                <motion.span
                  key={currentPrice}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-3xl md:text-4xl font-black font-sans"
                >
                  ${currentPrice.toFixed(2)}
                </motion.span>
                {selectedFit !== 'Oversize' && (
                  <span className="text-sm text-neutral-400 line-through font-sans mb-1">
                    $24.99
                  </span>
                )}
              </div>

              {/* Description */}
              <p className="text-sm md:text-base text-neutral-600 leading-relaxed">
                {product.description}
              </p>

              {/* Divider */}
              <div className="border-t border-neutral-100" />

              {/* Color selector */}
              <ColorSelector
                colors={AVAILABLE_COLORS}
                selectedColor={selectedColor}
                onColorChange={setSelectedColor}
              />

              {/* Size selector */}
              <SizeSelector
                sizes={AVAILABLE_SIZES}
                selectedSize={selectedSize}
                availabilityMap={sizeAvailabilityMap}
                onSizeChange={setSelectedSize}
                onOpenSizeGuide={() => setIsSizeGuideOpen(true)}
              />

              {/* Fit selector */}
              <FitSelector
                fits={AVAILABLE_FITS}
                selectedFit={selectedFit}
                onFitChange={setSelectedFit}
              />

              {/* Quantity selector */}
              <QuantitySelector
                quantity={quantity}
                maxStock={currentStock}
                onQuantityChange={setQuantity}
              />

              {/* Divider */}
              <div className="border-t border-neutral-100" />

              {/* Action buttons */}
              <ProductActions
                onAddToCart={handleAddToCart}
                onBuyNow={handleBuyNow}
                isDisabled={isOutOfStock}
                price={currentPrice}
                quantity={quantity}
              />

              {/* Added feedback toast */}
              {addedFeedback && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="flex items-center gap-2 bg-black text-white px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-wider"
                >
                  <Check size={16} className="text-[#FFDE00]" />
                  ¡Producto agregado al carrito!
                </motion.div>
              )}

              {/* Share + Social */}
              <div className="flex items-center justify-between flex-wrap gap-4">
                <ShareProduct
                  productName={product.name}
                  productUrl={`/producto/${product.slug}`}
                />
              </div>

              {/* Trust signals */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-2">
                {[
                  { icon: Truck, label: 'Envío express', desc: 'Gratis +$50' },
                  { icon: Shield, label: 'Mockup gratis', desc: 'Antes de estampar' },
                  { icon: Palette, label: '100+ lavados', desc: 'Sin decolorar' },
                ].map(({ icon: Icon, label, desc }) => (
                  <div key={label} className="flex items-center gap-2.5 p-3 bg-neutral-50 rounded-xl">
                    <div className="w-9 h-9 flex items-center justify-center bg-neutral-100 rounded-lg flex-shrink-0">
                      <Icon size={16} className="text-black" />
                    </div>
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-wider">{label}</p>
                      <p className="text-[10px] text-neutral-400">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Features list */}
              <div className="flex flex-col gap-2 mt-2">
                <h3 className="text-xs font-black uppercase tracking-widest text-neutral-400">
                  Características
                </h3>
                <ul className="space-y-2">
                  {product.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs md:text-sm text-neutral-600 leading-relaxed">
                      <Check size={14} className="text-[#FFDE00] mt-0.5 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Size Guide Modal */}
      <SizeGuideModal
        isOpen={isSizeGuideOpen}
        onClose={() => setIsSizeGuideOpen(false)}
      />
    </>
  )
}
