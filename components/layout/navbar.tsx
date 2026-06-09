'use client'

import React, { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { Search, User, ShoppingCart, Menu, X, ChevronDown } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useCart } from '../providers/cart-provider'
import { getAssetPath } from '@/lib/utils'

interface NavNode {
  name: string
  targetId?: string
  href?: string
  children?: NavNode[]
}

const menuData: NavNode[] = [
  { name: 'Inicio', targetId: 'inicio', href: '/' },
  {
    name: 'Catálogo',
    children: [
      { name: 'Camisetas', targetId: 'catalog', href: '/camisetas' },
      { name: 'Sudaderas & Hoodies', targetId: 'catalog', href: '/hoodies' },
      { name: 'Accesorios', targetId: 'catalog', href: '/accesorios' },
      { name: 'Ver todo el Catálogo', targetId: 'catalog', href: '/catalogo' }
    ]
  },
  {
    name: 'Colecciones',
    children: [
      { name: 'Anime', targetId: 'collections', href: '/colecciones/anime' },
      { name: 'Artistas', targetId: 'collections', href: '/colecciones/artistas' },
      { name: 'Deportes', targetId: 'collections', href: '/colecciones/deportes' },
      { name: 'Series', targetId: 'collections', href: '/colecciones/series' },
      { name: 'Películas', targetId: 'collections', href: '/colecciones/peliculas' },
      { name: 'Videojuegos', targetId: 'collections', href: '/colecciones/videojuegos' }
    ]
  },
  {
    name: 'Personalizar',
    children: [
      { name: 'Solicitar Mockup Gratis', targetId: 'personalizacion' },
      { name: 'Cotizar Prenda Especial', targetId: 'personalizacion' }
    ]
  },
  { name: 'Nosotros', targetId: 'footer' }
]

interface NavItemConfig {
  name: string
  href?: string
  targetId?: string
  hasDropdown?: boolean
}

const navItemsList: NavItemConfig[] = [
  { name: 'Inicio', targetId: 'inicio', href: '/' },
  { name: 'Catálogo', targetId: 'catalog', href: '/catalogo', hasDropdown: true },
  { name: 'Colecciones', targetId: 'collections', href: '/#collections', hasDropdown: true },
  { name: 'Personaliza', targetId: 'personalizacion', href: '/#personalizacion' },
  { name: 'Nosotros', targetId: 'footer', href: '/#footer' }
]

export function Navbar() {
  const { totalCartQty, setIsCartOpen } = useCart()
  const [menuOpen, setMenuOpen] = useState(false)
  const pathname = usePathname()
  const router = useRouter()

  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  const handleMouseEnter = (item: string) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    setActiveDropdown(item)
  }

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setActiveDropdown(null)
    }, 200)
  }

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [])

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, item: string) => {
    if (item === 'Personaliza') {
      e.preventDefault()
      setMenuOpen(false)
      if (pathname === '/') {
        document.getElementById('personalizacion')?.scrollIntoView({ behavior: 'smooth' })
      } else {
        router.push('/#personalizacion')
      }
    } else if (item === 'Catálogo') {
      e.preventDefault()
      setMenuOpen(false)
      router.push('/catalogo')
    } else if (item === 'Colecciones') {
      e.preventDefault()
      setMenuOpen(false)
      if (pathname === '/') {
        document.getElementById('collections')?.scrollIntoView({ behavior: 'smooth' })
      } else {
        router.push('/#collections')
      }
    } else if (item === 'Inicio') {
      e.preventDefault()
      setMenuOpen(false)
      if (pathname === '/') {
        window.scrollTo({ top: 0, behavior: 'smooth' })
      } else {
        router.push('/')
      }
    } else if (item === 'Nosotros') {
      e.preventDefault()
      setMenuOpen(false)
      if (pathname === '/') {
        document.getElementById('footer')?.scrollIntoView({ behavior: 'smooth' })
      } else {
        router.push('/#footer')
      }
    }
  }

  return (
    <nav className="sticky top-0 z-50 bg-black text-white h-16 sm:h-20 flex items-center px-4 md:px-8 border-b border-neutral-900 transition-all duration-300">
      <div className="max-w-7xl mx-auto w-full flex items-center justify-between relative h-full">

        {/* LEFT MENU - Mobile & Tablet Hamburger */}
        <div className="flex lg:hidden items-center z-10">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="w-10 h-10 flex items-center justify-center text-neutral-400 hover:text-white transition-all duration-300 cursor-pointer rounded-full hover:bg-neutral-900/50"
            aria-label="Alternar menú móvil"
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* LOGO - Left on Desktop, Center on Mobile/Tablet */}
        <div className="absolute left-1/2 -translate-x-1/2 lg:static lg:translate-x-0 flex-shrink-0 flex items-center h-12 lg:h-16 z-10">
          <img
            src={getAssetPath('/logo.jpg')}
            alt="Sublimarte Studio Logo"
            className="h-full object-contain hover:scale-[1.03] active:scale-95 transition-all duration-300 cursor-pointer"
          />
        </div>

        {/* CENTER NAV - Centered relative to navbar on desktop (lg screens) */}
        <div className="hidden lg:flex items-center justify-center gap-4 lg:gap-8 absolute left-1/2 -translate-x-1/2 h-full z-20">
          {navItemsList.map((item) => (
            <div
              key={item.name}
              className="relative h-full flex items-center"
              onMouseEnter={() => item.hasDropdown && handleMouseEnter(item.name)}
              onMouseLeave={() => item.hasDropdown && handleMouseLeave()}
            >
              <a
                href={item.href || '#'}
                onClick={(e) => handleNavClick(e, item.name)}
                className="text-[11px] sm:text-xs uppercase tracking-[0.2em] font-semibold transition-colors duration-300 text-neutral-400 hover:text-white relative group py-2 flex items-center gap-1 cursor-pointer"
              >
                <span>{item.name}</span>
                {item.hasDropdown && (
                  <ChevronDown
                    size={11}
                    className={`transition-transform duration-300 ${activeDropdown === item.name ? 'rotate-180 text-white' : 'text-neutral-500 group-hover:text-white'
                      }`}
                  />
                )}
                <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-[#FFDE00] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center" />
              </a>

              {/* Dropdown panel */}
              <AnimatePresence>
                {activeDropdown === item.name && item.hasDropdown && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.98 }}
                    transition={{ duration: 0.18, ease: 'easeOut' }}
                    className="absolute top-full left-1/2 -translate-x-1/2 mt-1 z-50 pointer-events-auto"
                  >
                    {item.name === 'Catálogo' && <CatalogDropdown />}
                    {item.name === 'Colecciones' && <CollectionsDropdown />}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

        {/* RIGHT ACTIONS - Search, Account, Cart */}
        <div className="flex items-center gap-2 sm:gap-3 z-10 ml-auto md:ml-0">
          <button
            className="w-10 h-10 flex items-center justify-center text-neutral-400 hover:text-white hover:bg-neutral-900/50 transition-all duration-300 flex cursor-pointer rounded-full"
            aria-label="Buscar productos"
          >
            <Search size={18} />
          </button>

          <button
            className="w-10 h-10 flex items-center justify-center text-neutral-400 hover:text-white hover:bg-neutral-900/50 transition-all duration-300 hidden lg:flex cursor-pointer rounded-full"
            aria-label="Mi Cuenta"
          >
            <User size={18} />
          </button>

          {/* Shopping Cart Icon with Badge */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="w-10 h-10 flex items-center justify-center text-neutral-400 hover:text-white hover:bg-neutral-900/50 transition-all duration-300 relative cursor-pointer rounded-full"
            aria-label="Abrir carrito"
          >
            <ShoppingCart size={18} />
            {totalCartQty > 0 && (
              <span
                className="absolute top-1.5 right-1.5 bg-[#FFDE00] text-black text-[9px] font-black font-mono w-4 h-4 rounded-full flex items-center justify-center select-none shadow-md"
              >
                {totalCartQty}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* MOBILE NAV DRAWER */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 bg-black/60 backdrop-blur-xs z-40 lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMenuOpen(false)}
            />
            {/* Menu Sliding Panel */}
            <motion.div
              className="absolute top-16 sm:top-20 left-0 right-0 bg-neutral-950 border-b border-neutral-900/80 p-6 flex flex-col gap-1.5 lg:hidden z-50 shadow-2xl overflow-y-auto max-h-[80vh]"
              initial={{ opacity: 0, y: -15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
            >
              {menuData.map((node, idx) => (
                <MobileNavNode key={idx} node={node} depth={0} onClose={() => setMenuOpen(false)} />
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  )
}

function MobileNavNode({ node, depth = 0, onClose }: { node: NavNode; depth: number; onClose: () => void }) {
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)
  const hasChildren = node.children && node.children.length > 0

  const handleNodeClick = (e: React.MouseEvent) => {
    if (hasChildren) {
      e.preventDefault()
      setIsOpen(!isOpen)
    } else {
      onClose()
      if (node.href) {
        router.push(node.href)
      } else if (node.targetId) {
        if (node.targetId === 'inicio') {
          window.scrollTo({ top: 0, behavior: 'smooth' })
        } else {
          const target = document.getElementById(node.targetId)
          target?.scrollIntoView({ behavior: 'smooth' })
        }
      }
    }
  }

  return (
    <div className="w-full flex flex-col text-left">
      <button
        onClick={handleNodeClick}
        className={`w-full flex items-center justify-between text-left py-3.5 border-b border-neutral-900/30 transition-colors cursor-pointer select-none ${depth === 0
          ? 'text-xs font-black uppercase tracking-[0.22em] text-white'
          : depth === 1
            ? 'text-[11px] font-bold uppercase tracking-[0.18em] text-neutral-400 pl-4'
            : 'text-[10px] font-semibold uppercase tracking-[0.15em] text-neutral-500 pl-8 hover:text-[#FFDE00]'
          }`}
      >
        <span>{node.name}</span>
        {hasChildren && (
          <motion.span
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.2 }}
            className="text-neutral-500 mr-1"
          >
            <ChevronDown size={14} />
          </motion.span>
        )}
      </button>

      {hasChildren && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
          transition={{ duration: 0.25, ease: 'easeInOut' }}
          className="overflow-hidden flex flex-col bg-neutral-950/40"
        >
          {node.children!.map((child, idx) => (
            <MobileNavNode key={idx} node={child} depth={depth + 1} onClose={onClose} />
          ))}
        </motion.div>
      )}
    </div>
  )
}

function CatalogDropdown() {
  const categoriesList = [
    {
      name: 'Camisetas',
      href: '/camisetas',
      image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=200&auto=format&fit=crop'
    },
    {
      name: 'Sudaderas & Hoodies',
      href: '/hoodies',
      image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=200&auto=format&fit=crop'
    },
    {
      name: 'Accesorios',
      href: '/accesorios',
      image: 'https://images.unsplash.com/photo-1576243345690-4e4b79b63288?q=80&w=200&auto=format&fit=crop'
    }
  ]

  return (
    <div className="w-[320px] min-w-[320px] bg-neutral-950 border border-neutral-800 rounded-2xl p-6 shadow-[0_20px_50px_rgba(0,0,0,0.9)] flex flex-col gap-5 text-left">
      <div className="flex flex-col gap-3">
        <h4 className="text-[10px] tracking-[0.2em] font-black text-neutral-500 uppercase border-b border-neutral-900 pb-2 mb-1">
          Categorías
        </h4>
        <div className="flex flex-col gap-1">
          {categoriesList.map((cat) => (
            <Link
              key={cat.href}
              href={cat.href}
              className="text-[11px] font-bold uppercase tracking-wider text-neutral-300 hover:text-[#FFDE00] transition-colors py-1.5 flex items-center justify-between gap-4 border-b border-neutral-900/40 group/item"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg overflow-hidden bg-neutral-900 border border-neutral-800 relative flex-shrink-0">
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="w-full h-full object-cover grayscale opacity-80 group-hover/item:grayscale-0 group-hover/item:opacity-100 transition-all duration-300"
                    loading="lazy"
                  />
                </div>
                <span>{cat.name}</span>
              </div>
              <span className="text-[10px] opacity-0 group-hover/item:opacity-100 transition-opacity text-[#FFDE00] transform translate-x-[-4px] group-hover/item:translate-x-0 transition-transform duration-300">
                →
              </span>
            </Link>
          ))}
          <Link
            href="/catalogo"
            className="mt-2 text-[11px] font-bold uppercase tracking-widest text-[#FFDE00] hover:underline flex items-center gap-1 group/all whitespace-nowrap py-1.5"
          >
            <span>Ver todo el Catálogo</span>
            <span className="transform translate-x-0 group-hover/all:translate-x-1 transition-transform">→</span>
          </Link>
        </div>
      </div>
    </div>
  )
}

function CollectionsDropdown() {
  const collectionsList = [
    {
      name: 'Anime',
      slug: 'anime',
      image: 'https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExN3ZlNTM3bXl4Mjdzemk5aXA1c2Zmb3Nnb3BsYXd3b3RoeG1idDJlbyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/jzHFPlw89eTqU/giphy.gif'
    },
    {
      name: 'Artistas',
      slug: 'artistas',
      image: 'https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExNmxoMXpvc2Q2ZW13eG1vZ2V6aGIzbmg2MnI1ODQxc3VqaW95N3NvdSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/ixabsauEfriKCqgtgw/giphy.gif'
    },
    {
      name: 'Deportes',
      slug: 'deportes',
      image: 'https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExOXZqZjM2b3U2Nno3aGQ5Z2Nubzh4ZTd2Y240Ym92aGgxaGJpcWswdSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/LDbiy8jVbDb7dgKtZp/giphy.gif'
    },
    {
      name: 'Series',
      slug: 'series',
      image: 'https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExZjgydmI2aW9scTZvcW1xejRsbHB6azJpemRneGg4MzhuMnRxZnJxdyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/vFtGDTXTNr4Z3uG4St/giphy.gif'
    },
    {
      name: 'Películas',
      slug: 'peliculas',
      image: 'https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExaTg2ZmxyZGJrMjdsZWhvNW0yZm5jcnpvZnVjNG92a2tyZHk4djI5bSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/GkCcRey2Hq5NVH8sfM/giphy.gif'
    },
    {
      name: 'Videojuegos',
      slug: 'videojuegos',
      image: 'https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExZmpxOTFuN2IzcDQ1M3J2eXU4OW1pdWQwNXRlaG1udG03azV4emJjbiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/SFPQxFOlyN9NBQ5oh6/giphy.gif'
    },
  ]

  return (
    <div className="w-[320px] min-w-[320px] bg-neutral-950 border border-neutral-800 rounded-2xl p-6 shadow-[0_20px_50px_rgba(0,0,0,0.9)] flex flex-col gap-4 text-left">
      <h4 className="text-[10px] tracking-[0.2em] font-black text-neutral-500 uppercase border-b border-neutral-900 pb-2 mb-1">
        Nuestras Colecciones
      </h4>
      <div className="flex flex-col gap-1.5">
        {collectionsList.map((col) => (
          <Link
            key={col.slug}
            href={`/colecciones/${col.slug}`}
            className="text-[11px] font-bold uppercase tracking-wider text-neutral-300 hover:text-[#FFDE00] transition-colors py-1.5 flex items-center justify-between gap-4 border-b border-neutral-900/40 group/item"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg overflow-hidden bg-neutral-900 border border-neutral-800 relative flex-shrink-0">
                <img
                  src={col.image}
                  alt={col.name}
                  className="w-full h-full object-cover grayscale opacity-80 group-hover/item:grayscale-0 group-hover/item:opacity-100 transition-all duration-300"
                  loading="lazy"
                />
              </div>
              <span>{col.name}</span>
            </div>
            <span className="text-[10px] opacity-0 group-hover/item:opacity-100 transition-opacity text-[#FFDE00] transform translate-x-[-4px] group-hover/item:translate-x-0 transition-transform duration-300">
              →
            </span>
          </Link>
        ))}
      </div>
    </div>
  )
}
