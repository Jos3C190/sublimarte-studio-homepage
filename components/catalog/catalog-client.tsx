'use client'

import React, { useState, useMemo } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { SlidersHorizontal, X, RotateCcw, Check, ShoppingBag, Grid, List, Truck, Shield, Box } from 'lucide-react'
import {
  Product,
  collectionsData,
  productsDetailData,
  featuredImages,
  featuredImagesBack
} from '@/lib/products'
import { CartActions } from '@/app/camisetas-personalizadas/[slug]/cart-actions'

interface CatalogClientProps {
  initialProducts: Product[]
  defaultGarmentType?: 'camisetas' | 'hoodies' | 'accesorios'
}

const GARMENT_OPTIONS = [
  { label: 'Camisetas', value: 'camisetas' },
  { label: 'Hoodies', value: 'hoodies' },
  { label: 'Accesorios', value: 'accesorios' }
]

const THEME_OPTIONS = [
  { label: 'Anime', value: 'anime' },
  { label: 'Películas', value: 'peliculas' },
  { label: 'Videojuegos', value: 'videojuegos' },
  { label: 'Deportes', value: 'deportes' },
  { label: 'Música / Artistas', value: 'artistas' },
  { label: 'Series', value: 'series' }
]

const SIZE_OPTIONS = ['S', 'M', 'L', 'XL', 'XXL']

const FIT_OPTIONS = ['Oversize', 'Regular', 'Slim']

const SORT_OPTIONS = [
  { label: 'Destacados', value: 'destacados' },
  { label: 'Más nuevos', value: 'nuevo' },
  { label: 'Precio: Menor a Mayor', value: 'price_asc' },
  { label: 'Precio: Mayor a Menor', value: 'price_desc' }
]

export function CatalogClient({ initialProducts, defaultGarmentType }: CatalogClientProps) {
  // Filters State
  const [selectedGarmentTypes, setSelectedGarmentTypes] = useState<string[]>(
    defaultGarmentType ? [defaultGarmentType] : []
  )
  const [selectedThemes, setSelectedThemes] = useState<string[]>([])
  const [selectedCollections, setSelectedCollections] = useState<string[]>([])
  const [selectedSizes, setSelectedSizes] = useState<string[]>([])
  const [selectedFits, setSelectedFits] = useState<string[]>([])
  const [maxPrice, setMaxPrice] = useState<number>(50)
  const [sortBy, setSortBy] = useState<string>('destacados')
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState<boolean>(false)

  // Dynamically filter active collections options based on selected themes
  const availableCollectionsOptions = useMemo(() => {
    if (selectedThemes.length === 0) return collectionsData
    return collectionsData.filter((col) => selectedThemes.includes(col.theme.toLowerCase()))
  }, [selectedThemes])

  // Helper to check size stock using productsDetailData
  const isSizeInStock = (productId: string, size: string) => {
    const detail = productsDetailData.find((d) => d.id === productId)
    if (!detail) return false
    return Object.keys(detail.stockMap).some((key) => {
      const parts = key.split('-') // ['Color', 'Size', 'Fit']
      return parts[1] === size && detail.stockMap[key] > 0
    })
  }

  // Helper to check fit stock using productsDetailData
  const isFitInStock = (productId: string, fit: string) => {
    const detail = productsDetailData.find((d) => d.id === productId)
    if (!detail) return false
    return Object.keys(detail.stockMap).some((key) => {
      const parts = key.split('-') // ['Color', 'Size', 'Fit']
      return parts[2] === fit && detail.stockMap[key] > 0
    })
  }

  // Filter and Sort Products
  const processedProducts = useMemo(() => {
    let result = [...initialProducts]

    // 1. Filter by Garment Type
    if (selectedGarmentTypes.length > 0) {
      result = result.filter((p) => selectedGarmentTypes.includes(p.garmentType))
    }

    // 2. Filter by Theme
    if (selectedThemes.length > 0) {
      result = result.filter((p) => selectedThemes.includes(p.theme.toLowerCase()))
    }

    // 3. Filter by Collection
    if (selectedCollections.length > 0) {
      result = result.filter((p) => selectedCollections.includes(p.collection.toLowerCase()))
    }

    // 4. Filter by Size Stock
    if (selectedSizes.length > 0) {
      result = result.filter((p) =>
        selectedSizes.some((size) => isSizeInStock(p.id, size))
      )
    }

    // 4b. Filter by Fit Stock (Corte)
    if (selectedFits.length > 0) {
      result = result.filter((p) =>
        selectedFits.some((fit) => isFitInStock(p.id, fit))
      )
    }

    // 5. Filter by Price Range
    result = result.filter((p) => p.price <= maxPrice)

    // 6. Sort
    if (sortBy === 'price_asc') {
      result.sort((a, b) => a.price - b.price)
    } else if (sortBy === 'price_desc') {
      result.sort((a, b) => b.price - a.price)
    } else if (sortBy === 'nuevo') {
      result.sort((a, b) => {
        const aDetail = productsDetailData.find((d) => d.id === a.id)
        const bDetail = productsDetailData.find((d) => d.id === b.id)
        const aNew = aDetail?.badges.includes('nuevo') ? 1 : 0
        const bNew = bDetail?.badges.includes('nuevo') ? 1 : 0
        return bNew - aNew
      })
    } else {
      // 'destacados' sort
      result.sort((a, b) => {
        const aDetail = productsDetailData.find((d) => d.id === a.id)
        const bDetail = productsDetailData.find((d) => d.id === b.id)
        const aDest = aDetail?.badges.includes('destacado') ? 1 : 0
        const bDest = bDetail?.badges.includes('destacado') ? 1 : 0
        return bDest - aDest
      })
    }

    return result
  }, [
    initialProducts,
    selectedGarmentTypes,
    selectedThemes,
    selectedCollections,
    selectedSizes,
    selectedFits,
    maxPrice,
    sortBy
  ])

  // Clear all filters
  const handleResetFilters = () => {
    setSelectedThemes([])
    setSelectedCollections([])
    setSelectedSizes([])
    setSelectedFits([])
    setMaxPrice(50)
    if (!defaultGarmentType) {
      setSelectedGarmentTypes([])
    }
  }

  // Toggle handlers
  const handleGarmentToggle = (val: string) => {
    if (defaultGarmentType) return
    setSelectedGarmentTypes((prev) =>
      prev.includes(val) ? prev.filter((v) => v !== val) : [...prev, val]
    )
  }

  const handleThemeToggle = (val: string) => {
    setSelectedThemes((prev) => {
      const next = prev.includes(val) ? prev.filter((v) => v !== val) : [...prev, val]
      // Clear collections that no longer belong to selected themes
      if (next.length > 0) {
        setSelectedCollections((prevCol) =>
          prevCol.filter((colSlug) => {
            const col = collectionsData.find((c) => c.slug === colSlug)
            return col && next.includes(col.theme.toLowerCase())
          })
        )
      }
      return next
    })
  }

  const handleCollectionToggle = (val: string) => {
    setSelectedCollections((prev) =>
      prev.includes(val) ? prev.filter((v) => v !== val) : [...prev, val]
    )
  }

  const handleSizeToggle = (val: string) => {
    setSelectedSizes((prev) =>
      prev.includes(val) ? prev.filter((v) => v !== val) : [...prev, val]
    )
  }

  const handleFitToggle = (val: string) => {
    setSelectedFits((prev) =>
      prev.includes(val) ? prev.filter((v) => v !== val) : [...prev, val]
    )
  }

  // Active filters count
  const activeFiltersCount =
    (defaultGarmentType ? 0 : selectedGarmentTypes.length) +
    selectedThemes.length +
    selectedCollections.length +
    selectedSizes.length +
    selectedFits.length +
    (maxPrice < 50 ? 1 : 0)

  // Get Page Title & Description
  const getHeaderInfo = () => {
    if (defaultGarmentType === 'camisetas') {
      return {
        title: 'Camisetas Premium',
        description: 'Explora nuestra colección de camisetas de algodón 100% de alta densidad con estampados de definición urbana ultra duraderos.'
      }
    }
    if (defaultGarmentType === 'hoodies') {
      return {
        title: 'Hoodies & Sudaderas',
        description: 'Confeccionados con felpa de algodón de alto gramaje para darte abrigo sin sacrificar tu estilo streetwear.'
      }
    }
    if (defaultGarmentType === 'accesorios') {
      return {
        title: 'Accesorios Streetwear',
        description: 'Completa tu estilo con gorras, tote bags y stickers exclusivos diseñados para combinar con tus prendas favoritas.'
      }
    }
    return {
      title: 'Catálogo de Streetwear',
      description: 'Explora nuestra gama de camisetas, sudaderas y accesorios streetwear premium en El Salvador. Diseños de tendencia e impresión inalterable.'
    }
  }

  const headerInfo = getHeaderInfo()

  return (
    <div className="bg-white min-h-screen">
      {/* Header Banner */}
      <section className="bg-black text-white py-16 md:py-24 px-4 relative overflow-hidden">
        <div className="absolute inset-0 opacity-15 pointer-events-none select-none">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
          <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-[#FFDE00] rounded-full filter blur-[120px] -translate-x-1/2 -translate-y-1/2" />
        </div>

        <div className="max-w-7xl mx-auto text-left relative z-10">
          <div className="flex items-center gap-2 mb-4 text-xs font-bold text-[#FFDE00] uppercase tracking-widest">
            <Link href="/" className="hover:underline">Inicio</Link>
            <span>/</span>
            <span>{defaultGarmentType ? headerInfo.title : 'Catálogo'}</span>
          </div>

          <h1
            className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-4"
            style={{ fontFamily: 'var(--font-barlow-condensed)' }}
          >
            {headerInfo.title}
          </h1>
          <p className="text-sm md:text-lg text-neutral-400 max-w-2xl leading-relaxed">
            {headerInfo.description}
          </p>
        </div>
      </section>

      {/* Control bar */}
      <section className="sticky top-[72px] sm:top-20 z-40 bg-neutral-50/95 backdrop-blur-md border-b border-neutral-200/50 py-4 px-4 md:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <button
            onClick={() => setMobileFiltersOpen(true)}
            className="lg:hidden flex items-center gap-2 bg-black text-white px-4 py-2.5 rounded-full text-xs font-black uppercase tracking-wider cursor-pointer active:scale-95 transition-transform"
          >
            <SlidersHorizontal size={14} />
            <span>Filtros</span>
            {activeFiltersCount > 0 && (
              <span className="w-5 h-5 bg-[#FFDE00] text-black rounded-full flex items-center justify-center text-[10px] font-bold">
                {activeFiltersCount}
              </span>
            )}
          </button>

          {/* Desktop Filter Summary */}
          <div className="hidden lg:flex items-center gap-3">
            <span className="text-xs uppercase font-bold text-neutral-400 tracking-wider">
              {processedProducts.length} {processedProducts.length === 1 ? 'prenda encontrada' : 'prendas encontradas'}
            </span>
            {activeFiltersCount > 0 && (
              <button
                onClick={handleResetFilters}
                className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-black border border-neutral-200 hover:border-black bg-white px-3 py-1.5 rounded-full transition-colors cursor-pointer"
              >
                <RotateCcw size={12} />
                <span>Limpiar filtros ({activeFiltersCount})</span>
              </button>
            )}
          </div>

          {/* Sort Selector */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-neutral-500 hidden sm:inline">Ordenar por:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-white border border-neutral-200 rounded-full px-4 py-2 text-xs font-bold uppercase tracking-wider cursor-pointer outline-none hover:border-neutral-400 transition-colors"
            >
              {SORT_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </section>

      {/* Main Grid & Filters Content */}
      <section className="py-8 md:py-16 px-4 md:px-8">
        <div className="max-w-7xl mx-auto flex gap-8">

          {/* DESKTOP SIDEBAR FILTERS */}
          <aside className="w-64 flex-shrink-0 hidden lg:flex flex-col gap-6 select-none">
            {/* Reset button */}
            {activeFiltersCount > 0 && (
              <button
                onClick={handleResetFilters}
                className="w-full flex items-center justify-center gap-2 border border-black hover:bg-black hover:text-white text-black py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer"
              >
                <RotateCcw size={14} />
                <span>Limpiar todo</span>
              </button>
            )}

            {/* Filter Section: Garment Type (Only if no default) */}
            {!defaultGarmentType && (
              <div className="border-b border-neutral-100 pb-5">
                <h3 className="text-xs uppercase font-black tracking-widest text-neutral-900 mb-3">Tipo de prenda</h3>
                <div className="flex flex-col gap-2">
                  {GARMENT_OPTIONS.map((opt) => {
                    const checked = selectedGarmentTypes.includes(opt.value)
                    return (
                      <button
                        key={opt.value}
                        onClick={() => handleGarmentToggle(opt.value)}
                        className="flex items-center gap-2.5 text-left text-xs font-semibold text-neutral-600 hover:text-black transition-colors py-1 cursor-pointer w-full"
                      >
                        <div className={`w-4 h-4 rounded-md border flex items-center justify-center transition-all ${checked ? 'bg-black border-black text-white' : 'border-neutral-300 hover:border-neutral-400'
                          }`}>
                          {checked && <Check size={10} strokeWidth={3} />}
                        </div>
                        <span className={checked ? 'text-black font-bold' : ''}>{opt.label}</span>
                      </button>
                    )
                  })}
                </div>
              </div>
            )}

            {/* Filter Section: Theme */}
            <div className="border-b border-neutral-100 pb-5">
              <h3 className="text-xs uppercase font-black tracking-widest text-neutral-900 mb-3">Tema</h3>
              <div className="flex flex-col gap-2">
                {THEME_OPTIONS.map((opt) => {
                  const checked = selectedThemes.includes(opt.value)
                  return (
                    <button
                      key={opt.value}
                      onClick={() => handleThemeToggle(opt.value)}
                      className="flex items-center gap-2.5 text-left text-xs font-semibold text-neutral-600 hover:text-black transition-colors py-1 cursor-pointer w-full"
                    >
                      <div className={`w-4 h-4 rounded-md border flex items-center justify-center transition-all ${checked ? 'bg-black border-black text-white' : 'border-neutral-300 hover:border-neutral-400'
                        }`}>
                        {checked && <Check size={10} strokeWidth={3} />}
                      </div>
                      <span className={checked ? 'text-black font-bold' : ''}>{opt.label}</span>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Filter Section: Collections (Dynamic based on selected themes) */}
            <div className="border-b border-neutral-100 pb-5">
              <h3 className="text-xs uppercase font-black tracking-widest text-neutral-900 mb-3">Colección</h3>
              <div className="flex flex-col gap-2 max-h-52 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-neutral-200">
                {availableCollectionsOptions.length === 0 ? (
                  <p className="text-xs text-neutral-400 italic">No hay colecciones disponibles</p>
                ) : (
                  availableCollectionsOptions.map((opt) => {
                    const checked = selectedCollections.includes(opt.slug)
                    return (
                      <button
                        key={opt.slug}
                        onClick={() => handleCollectionToggle(opt.slug)}
                        className="flex items-center gap-2.5 text-left text-xs font-semibold text-neutral-600 hover:text-black transition-colors py-1 cursor-pointer w-full"
                      >
                        <div className={`w-4 h-4 rounded-md border flex items-center justify-center transition-all ${checked ? 'bg-black border-black text-white' : 'border-neutral-300 hover:border-neutral-400'
                          }`}>
                          {checked && <Check size={10} strokeWidth={3} />}
                        </div>
                        <span className={checked ? 'text-black font-bold' : ''}>{opt.name}</span>
                      </button>
                    )
                  })
                )}
              </div>
            </div>

            {/* Filter Section: Sizes */}
            <div className="border-b border-neutral-100 pb-5">
              <h3 className="text-xs uppercase font-black tracking-widest text-neutral-900 mb-3">Tallas en Stock</h3>
              <div className="flex flex-wrap gap-2">
                {SIZE_OPTIONS.map((size) => {
                  const active = selectedSizes.includes(size)
                  return (
                    <button
                      key={size}
                      onClick={() => handleSizeToggle(size)}
                      className={`w-10 h-10 border rounded-full text-xs font-black transition-all flex items-center justify-center cursor-pointer ${active
                        ? 'bg-black text-white border-black shadow-lg shadow-black/10'
                        : 'bg-white text-neutral-600 border-neutral-200 hover:border-neutral-400'
                        }`}
                    >
                      {size}
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Filter Section: Fits (Corte) */}
            <div className="border-b border-neutral-100 pb-5">
              <h3 className="text-xs uppercase font-black tracking-widest text-neutral-900 mb-3">Corte en Stock</h3>
              <div className="flex flex-col gap-2">
                {FIT_OPTIONS.map((fit) => {
                  const checked = selectedFits.includes(fit)
                  return (
                    <button
                      key={fit}
                      onClick={() => handleFitToggle(fit)}
                      className="flex items-center gap-2.5 text-left text-xs font-semibold text-neutral-600 hover:text-black transition-colors py-1 cursor-pointer w-full"
                    >
                      <div className={`w-4 h-4 rounded-md border flex items-center justify-center transition-all ${checked ? 'bg-black border-black text-white' : 'border-neutral-300 hover:border-neutral-400'
                        }`}>
                        {checked && <Check size={10} strokeWidth={3} />}
                      </div>
                      <span className={checked ? 'text-black font-bold' : ''}>{fit}</span>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Filter Section: Price */}
            <div className="pb-5">
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-xs uppercase font-black tracking-widest text-neutral-900">Precio Máximo</h3>
                <span className="text-xs font-bold text-black">${maxPrice.toFixed(2)}</span>
              </div>
              <input
                type="range"
                min="0"
                max="50"
                step="1"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-black h-1 bg-neutral-200 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-neutral-400 font-semibold mt-1">
                <span>$0.00</span>
                <span>$50.00</span>
              </div>
            </div>
          </aside>

          {/* PRODUCTS CATALOG LIST */}
          <main className="flex-1">
            {processedProducts.length === 0 ? (
              <div className="text-center py-24 flex flex-col items-center justify-center gap-4">
                <ShoppingBag size={48} className="text-neutral-300" />
                <h3 className="font-bold text-lg text-neutral-800">No encontramos productos que coincidan</h3>
                <p className="text-sm text-neutral-400 max-w-sm">Prueba limpiando los filtros seleccionados o cambiando tus criterios de búsqueda.</p>
                <button
                  onClick={handleResetFilters}
                  className="bg-black text-white px-6 py-3 uppercase text-xs font-bold tracking-wider rounded-full hover:bg-[#FFDE00] hover:text-black transition-colors duration-300 mt-2 cursor-pointer"
                >
                  Restablecer Filtros
                </button>
              </div>
            ) : (
              <motion.div
                layout
                className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-3 md:gap-6"
              >
                <AnimatePresence mode="popLayout">
                  {processedProducts.map((product) => {
                    const productSlug = productsDetailData.find((d) => d.id === product.id)?.slug ?? product.id
                    return (
                      <motion.div
                        layout
                        key={product.id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.4 }}
                        className="flex flex-col gap-2 md:gap-4 border border-neutral-100 p-2 md:p-4 rounded-2xl hover:shadow-2xl hover:shadow-neutral-900/5 hover:-translate-y-1 hover:border-neutral-200 transition-all duration-500 bg-white group/card"
                      >
                        <Link href={`/producto/${productSlug}`} className="flex flex-col gap-2 md:gap-4">
                          <div className="aspect-square bg-[#f5f5f5] flex items-center justify-center overflow-hidden rounded-lg relative group">
                            <img
                              src={featuredImages[product.imageIdx]}
                              alt={product.name}
                              className="w-full h-full object-cover scale-100 group-hover:scale-105 transition-all duration-700 ease-out absolute inset-0"
                              loading="lazy"
                            />
                            <img
                              src={featuredImagesBack[product.imageIdx]}
                              alt={`${product.name} detail`}
                              className="w-full h-full object-cover scale-100 group-hover:scale-105 opacity-0 group-hover:opacity-100 transition-all duration-700 ease-out absolute inset-0 z-10"
                              loading="lazy"
                            />
                          </div>
                          <div className="flex flex-col gap-0.5 md:gap-2 text-left">
                            <span className="text-[8px] md:text-[9px] uppercase tracking-widest text-neutral-400 font-semibold">
                              {product.category}
                            </span>
                            <h3 className="font-bold text-[11px] md:text-sm uppercase tracking-wide truncate group-hover/card:text-[#FFDE00] transition-colors duration-300">
                              {product.name}
                            </h3>
                            <p className="text-xs text-neutral-400 hidden sm:block leading-relaxed">Impresión de definición ultra premium en cortes holgados streetwear.</p>
                          </div>
                        </Link>

                        <CartActions
                          productId={product.id}
                          productName={product.name}
                          productPrice={product.price}
                          productImage={featuredImages[product.imageIdx]}
                        />
                      </motion.div>
                    )
                  })}
                </AnimatePresence>
              </motion.div>
            )}
          </main>
        </div>
      </section>

      {/* MOBILE FILTERS SHEET (SLIDE OVER) */}
      <AnimatePresence>
        {mobileFiltersOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileFiltersOpen(false)}
              className="fixed inset-0 bg-black z-50 lg:hidden"
            />
            {/* Drawer */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="fixed inset-y-0 right-0 max-w-sm w-full bg-white z-50 shadow-2xl p-6 flex flex-col justify-between select-none lg:hidden"
            >
              <div className="flex flex-col gap-5 overflow-y-auto max-h-[80vh] pr-2">
                {/* Header */}
                <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
                  <h2 className="text-lg font-black uppercase tracking-tight">Filtros</h2>
                  <button onClick={() => setMobileFiltersOpen(false)} className="cursor-pointer">
                    <X size={20} />
                  </button>
                </div>

                {/* Garment type */}
                {!defaultGarmentType && (
                  <div>
                    <h3 className="text-xs uppercase font-black tracking-widest text-neutral-900 mb-3">Tipo de prenda</h3>
                    <div className="flex flex-col gap-2">
                      {GARMENT_OPTIONS.map((opt) => {
                        const checked = selectedGarmentTypes.includes(opt.value)
                        return (
                          <button
                            key={opt.value}
                            onClick={() => handleGarmentToggle(opt.value)}
                            className="flex items-center gap-2.5 text-left text-xs font-semibold text-neutral-600 hover:text-black py-1 cursor-pointer w-full"
                          >
                            <div className={`w-4 h-4 rounded-md border flex items-center justify-center transition-all ${checked ? 'bg-black border-black text-white' : 'border-neutral-300'
                              }`}>
                              {checked && <Check size={10} strokeWidth={3} />}
                            </div>
                            <span>{opt.label}</span>
                          </button>
                        )
                      })}
                    </div>
                  </div>
                )}

                {/* Theme */}
                <div>
                  <h3 className="text-xs uppercase font-black tracking-widest text-neutral-900 mb-3">Tema</h3>
                  <div className="flex flex-col gap-2">
                    {THEME_OPTIONS.map((opt) => {
                      const checked = selectedThemes.includes(opt.value)
                      return (
                        <button
                          key={opt.value}
                          onClick={() => handleThemeToggle(opt.value)}
                          className="flex items-center gap-2.5 text-left text-xs font-semibold text-neutral-600 hover:text-black py-1 cursor-pointer w-full"
                        >
                          <div className={`w-4 h-4 rounded-md border flex items-center justify-center transition-all ${checked ? 'bg-black border-black text-white' : 'border-neutral-300'
                            }`}>
                            {checked && <Check size={10} strokeWidth={3} />}
                          </div>
                          <span>{opt.label}</span>
                        </button>
                      )
                    })}
                  </div>
                </div>

                {/* Collections */}
                <div>
                  <h3 className="text-xs uppercase font-black tracking-widest text-neutral-900 mb-3">Colección</h3>
                  <div className="flex flex-col gap-2 max-h-40 overflow-y-auto pr-1">
                    {availableCollectionsOptions.length === 0 ? (
                      <p className="text-xs text-neutral-400 italic">No hay colecciones disponibles</p>
                    ) : (
                      availableCollectionsOptions.map((opt) => {
                        const checked = selectedCollections.includes(opt.slug)
                        return (
                          <button
                            key={opt.slug}
                            onClick={() => handleCollectionToggle(opt.slug)}
                            className="flex items-center gap-2.5 text-left text-xs font-semibold text-neutral-600 hover:text-black py-1 cursor-pointer w-full"
                          >
                            <div className={`w-4 h-4 rounded-md border flex items-center justify-center transition-all ${checked ? 'bg-black border-black text-white' : 'border-neutral-300'
                              }`}>
                              {checked && <Check size={10} strokeWidth={3} />}
                            </div>
                            <span>{opt.name}</span>
                          </button>
                        )
                      })
                    )}
                  </div>
                </div>

                {/* Sizes */}
                <div>
                  <h3 className="text-xs uppercase font-black tracking-widest text-neutral-900 mb-3">Tallas en Stock</h3>
                  <div className="flex flex-wrap gap-2">
                    {SIZE_OPTIONS.map((size) => {
                      const active = selectedSizes.includes(size)
                      return (
                        <button
                          key={size}
                          onClick={() => handleSizeToggle(size)}
                          className={`w-9 h-9 border rounded-full text-xs font-black transition-all flex items-center justify-center cursor-pointer ${active
                            ? 'bg-black text-white border-black shadow-md'
                            : 'bg-white text-neutral-600 border-neutral-200'
                            }`}
                        >
                          {size}
                        </button>
                      )
                    })}
                  </div>
                </div>

                {/* Fits (Corte) */}
                <div>
                  <h3 className="text-xs uppercase font-black tracking-widest text-neutral-900 mb-3">Corte en Stock</h3>
                  <div className="flex flex-col gap-2">
                    {FIT_OPTIONS.map((fit) => {
                      const checked = selectedFits.includes(fit)
                      return (
                        <button
                          key={fit}
                          onClick={() => handleFitToggle(fit)}
                          className="flex items-center gap-2.5 text-left text-xs font-semibold text-neutral-600 hover:text-black py-1 cursor-pointer w-full"
                        >
                          <div className={`w-4 h-4 rounded-md border flex items-center justify-center transition-all ${checked ? 'bg-black border-black text-white' : 'border-neutral-300'
                            }`}>
                            {checked && <Check size={10} strokeWidth={3} />}
                          </div>
                          <span className={checked ? 'text-black font-bold' : ''}>{fit}</span>
                        </button>
                      )
                    })}
                  </div>
                </div>

                {/* Price */}
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="text-xs uppercase font-black tracking-widest text-neutral-900">Precio Máximo</h3>
                    <span className="text-xs font-bold text-black">${maxPrice.toFixed(2)}</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="50"
                    step="1"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(Number(e.target.value))}
                    className="w-full accent-black h-1 bg-neutral-200 rounded-lg cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-neutral-400 font-semibold mt-1">
                    <span>$0.00</span>
                    <span>$50.00</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 mt-6 pt-4 border-t border-neutral-100">
                <button
                  onClick={handleResetFilters}
                  className="flex-1 py-3 border border-neutral-200 rounded-full text-xs font-bold uppercase tracking-wider text-neutral-600 hover:text-black cursor-pointer active:scale-95 transition-transform"
                >
                  Limpiar ({activeFiltersCount})
                </button>
                <button
                  onClick={() => setMobileFiltersOpen(false)}
                  className="flex-1 py-3 bg-black text-white rounded-full text-xs font-bold uppercase tracking-wider hover:bg-neutral-800 cursor-pointer active:scale-95 transition-transform"
                >
                  Ver Resultados
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Trust & Delivery Ribbons */}
      <section className="bg-neutral-950 text-white py-6 px-4 md:px-8 border-t border-neutral-900 select-none">
        <div className="max-w-6xl mx-auto flex flex-row items-center md:items-start justify-between gap-3 md:gap-8 text-left">
          <div className="flex-1 flex items-center md:items-start gap-2 md:gap-4 min-w-0">
            <div className="flex-shrink-0 p-1.5 md:p-2 bg-neutral-900 rounded-lg border border-neutral-800/80 text-[#FFDE00]">
              <Truck className="w-4 h-4 md:w-5 md:h-5" />
            </div>
            <div className="min-w-0 flex flex-col justify-center">
              <span className="text-[10px] md:text-sm font-black uppercase tracking-wider text-[#FFDE00]">Envíos Express</span>
              <p className="hidden md:block text-[9px] md:text-xs text-neutral-400 leading-snug mt-0.5">Gratis en SV por compras mayores a $50</p>
            </div>
          </div>
          <div className="flex-1 flex items-center md:items-start gap-2 md:gap-4 min-w-0">
            <div className="flex-shrink-0 p-1.5 md:p-2 bg-neutral-900 rounded-lg border border-neutral-800/80 text-[#FFDE00]">
              <Shield className="w-4 h-4 md:w-5 md:h-5" />
            </div>
            <div className="min-w-0 flex flex-col justify-center">
              <span className="text-[10px] md:text-sm font-black uppercase tracking-wider text-[#FFDE00]">Impresión HD</span>
              <p className="hidden md:block text-[9px] md:text-xs text-neutral-400 leading-snug mt-0.5">Colores inalterables con el lavado</p>
            </div>
          </div>
          <div className="flex-1 flex items-center md:items-start gap-2 md:gap-4 min-w-0">
            <div className="flex-shrink-0 p-1.5 md:p-2 bg-neutral-900 rounded-lg border border-neutral-800/80 text-[#FFDE00]">
              <Box className="w-4 h-4 md:w-5 md:h-5" />
            </div>
            <div className="min-w-0 flex flex-col justify-center">
              <span className="text-[10px] md:text-sm font-black uppercase tracking-wider text-[#FFDE00]">Mockup 3D Gratis</span>
              <p className="hidden md:block text-[9px] md:text-xs text-neutral-400 leading-snug mt-0.5">Previsualiza antes de imprimir</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
