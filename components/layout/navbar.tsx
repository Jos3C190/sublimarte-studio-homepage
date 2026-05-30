'use client'

import React, { useState } from 'react'
import { Search, User, ShoppingCart, Menu, X, ChevronDown } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useCart } from '../providers/cart-provider'

interface NavNode {
  name: string
  targetId?: string
  href?: string
  children?: NavNode[]
}

const menuData: NavNode[] = [
  { name: 'Inicio', targetId: 'inicio' },
  {
    name: 'Catálogo',
    children: [
      {
        name: 'Camisetas',
        children: [
          { name: 'Estilo Oversize', targetId: 'catalog' },
          { name: 'Corte Regular', targetId: 'catalog' },
          { name: 'Corte Slim', targetId: 'catalog' }
        ]
      },
      {
        name: 'Sudaderas & Hoodies',
        children: [
          { name: 'Colección Anime Drop', targetId: 'catalog' },
          { name: 'Streetwear Art', targetId: 'catalog' }
        ]
      },
      { name: 'Ver todo el Catálogo', targetId: 'catalog' }
    ]
  },
  {
    name: 'Colecciones',
    children: [
      { name: 'Colección Anime', targetId: 'collections' },
      { name: 'Colección Artistas', targetId: 'collections' },
      { name: 'Colección Deportes', targetId: 'collections' },
      { name: 'Colección Series', targetId: 'collections' },
      { name: 'Colección Películas', targetId: 'collections' },
      { name: 'Colección Videojuegos', targetId: 'collections' }
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

export function Navbar() {
  const { totalCartQty, setIsCartOpen } = useCart()
  const [menuOpen, setMenuOpen] = useState(false)

  const navItems = ['Inicio', 'Catálogo', 'Colecciones', 'Personaliza', 'Nosotros']

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, item: string) => {
    if (item === 'Personaliza') {
      e.preventDefault()
      setMenuOpen(false)
      document.getElementById('personalizacion')?.scrollIntoView({ behavior: 'smooth' })
    } else if (item === 'Catálogo') {
      e.preventDefault()
      setMenuOpen(false)
      document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth' })
    } else if (item === 'Colecciones') {
      e.preventDefault()
      setMenuOpen(false)
      document.getElementById('collections')?.scrollIntoView({ behavior: 'smooth' })
    } else if (item === 'Inicio') {
      e.preventDefault()
      setMenuOpen(false)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  return (
    <nav className="sticky top-0 z-50 bg-black text-white h-16 sm:h-20 flex items-center px-4 md:px-8 border-b border-neutral-900 transition-all duration-300">
      <div className="max-w-7xl mx-auto w-full flex items-center justify-between relative h-full">
        
        {/* LEFT MENU - Mobile Hamburger only */}
        <div className="flex md:hidden items-center z-10">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="w-10 h-10 flex items-center justify-center text-neutral-400 hover:text-white transition-all duration-300 cursor-pointer rounded-full hover:bg-neutral-900/50"
            aria-label="Alternar menú móvil"
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* LOGO - Left on Desktop, Center on Mobile */}
        <div className="absolute left-1/2 -translate-x-1/2 md:static md:translate-x-0 flex-shrink-0 flex items-center h-12 md:h-16 z-10">
          <img
            src="/logo.jpg"
            alt="Sublimarte Studio Logo"
            className="h-full object-contain hover:scale-[1.03] active:scale-95 transition-all duration-300 cursor-pointer"
          />
        </div>

        {/* CENTER NAV - Centered relative to navbar on desktop */}
        <div className="hidden md:flex items-center justify-center gap-8 absolute left-1/2 -translate-x-1/2 h-full z-0">
          {navItems.map((item) => (
            <a
              key={item}
              href="#"
              onClick={(e) => handleNavClick(e, item)}
              className="text-[11px] sm:text-xs uppercase tracking-[0.2em] font-semibold transition-colors duration-300 text-neutral-400 hover:text-white relative group py-2"
            >
              {item}
              <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-[#FFDE00] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center" />
            </a>
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
            className="w-10 h-10 flex items-center justify-center text-neutral-400 hover:text-white hover:bg-neutral-900/50 transition-all duration-300 hidden md:flex cursor-pointer rounded-full"
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
              className="fixed inset-0 bg-black/60 backdrop-blur-xs z-40 md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMenuOpen(false)}
            />
            {/* Menu Sliding Panel */}
            <motion.div
              className="absolute top-16 sm:top-20 left-0 right-0 bg-neutral-950 border-b border-neutral-900/80 p-6 flex flex-col gap-1.5 md:hidden z-50 shadow-2xl overflow-y-auto max-h-[80vh]"
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
  const [isOpen, setIsOpen] = useState(false)
  const hasChildren = node.children && node.children.length > 0

  const handleNodeClick = (e: React.MouseEvent) => {
    if (hasChildren) {
      e.preventDefault()
      setIsOpen(!isOpen)
    } else {
      onClose()
      if (node.targetId) {
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
        className={`w-full flex items-center justify-between text-left py-3.5 border-b border-neutral-900/30 transition-colors cursor-pointer select-none ${
          depth === 0
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
