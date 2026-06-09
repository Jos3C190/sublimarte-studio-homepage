'use client'

import React, { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { SIZE_GUIDE, AVAILABLE_FITS, type Fit } from '@/lib/products'

interface SizeGuideModalProps {
  isOpen: boolean
  onClose: () => void
}

/**
 * RF-PDP-10: Size guide modal with measurements table in centimeters per fit.
 */
export function SizeGuideModal({ isOpen, onClose }: SizeGuideModalProps) {
  const [activeFit, setActiveFit] = useState<Fit>('Oversize')
  const [mounted, setMounted] = useState(false)
  const measurements = SIZE_GUIDE[activeFit]

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  return mounted && typeof document !== 'undefined' ? createPortal(
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[9990]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            className="fixed inset-x-4 top-1/2 -translate-y-1/2 md:inset-x-auto md:left-1/2 md:-translate-x-1/2 md:w-full md:max-w-lg bg-white rounded-3xl shadow-2xl z-[9991] overflow-hidden max-h-[85vh] flex flex-col"
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.95 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          >
            <div className="flex items-center justify-between p-6 border-b border-neutral-100">
              <div>
                <h3
                  className="text-xl font-black uppercase tracking-tighter"
                  style={{ fontFamily: 'var(--font-barlow-condensed)' }}
                >
                  Guía de Tallas
                </h3>
                <p className="text-[10px] text-neutral-400 uppercase tracking-widest font-bold mt-1">
                  Medidas en centímetros (cm)
                </p>
              </div>
              <button
                onClick={onClose}
                className="w-10 h-10 flex items-center justify-center text-neutral-400 hover:text-black hover:bg-neutral-100 rounded-full transition-all duration-300 cursor-pointer"
                aria-label="Cerrar guía de tallas"
              >
                <X size={18} />
              </button>
            </div>
            <div className="flex border-b border-neutral-100">
              {AVAILABLE_FITS.map((fit) => (
                <button
                  key={fit}
                  onClick={() => setActiveFit(fit)}
                  className={`flex-1 py-3 text-xs font-black uppercase tracking-widest transition-all duration-300 cursor-pointer relative ${
                    activeFit === fit ? 'text-black' : 'text-neutral-400 hover:text-neutral-600'
                  }`}
                >
                  {fit}
                  {activeFit === fit && (
                    <motion.div
                      layoutId="fit-tab-indicator"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#FFDE00]"
                    />
                  )}
                </button>
              ))}
            </div>
            <div className="p-6 overflow-y-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b-2 border-black">
                    <th className="text-left text-[10px] uppercase tracking-widest font-black py-3 pr-4">Talla</th>
                    <th className="text-center text-[10px] uppercase tracking-widest font-black py-3 px-2">Pecho</th>
                    <th className="text-center text-[10px] uppercase tracking-widest font-black py-3 px-2">Largo</th>
                    <th className="text-center text-[10px] uppercase tracking-widest font-black py-3 px-2">Manga</th>
                    <th className="text-center text-[10px] uppercase tracking-widest font-black py-3 pl-2">Hombro</th>
                  </tr>
                </thead>
                <tbody>
                  {measurements.map((row, idx) => (
                    <tr
                      key={row.size}
                      className={`border-b border-neutral-100 transition-colors duration-200 hover:bg-[#FFDE00]/5 ${
                        idx % 2 === 0 ? 'bg-white' : 'bg-neutral-50/50'
                      }`}
                    >
                      <td className="py-3 pr-4 text-sm font-black">{row.size}</td>
                      <td className="py-3 px-2 text-center text-sm text-neutral-600 font-sans">{row.chest}</td>
                      <td className="py-3 px-2 text-center text-sm text-neutral-600 font-sans">{row.length}</td>
                      <td className="py-3 px-2 text-center text-sm text-neutral-600 font-sans">{row.sleeve}</td>
                      <td className="py-3 pl-2 text-center text-sm text-neutral-600 font-sans">{row.shoulder}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="mt-6 p-4 bg-neutral-50 rounded-xl">
                <p className="text-[10px] uppercase tracking-widest font-black text-neutral-400 mb-2">
                  ¿Cómo medirse?
                </p>
                <ul className="space-y-1.5 text-xs text-neutral-500 leading-relaxed">
                  <li><span className="font-bold text-black">Pecho:</span> Mide alrededor de la parte más ancha del pecho.</li>
                  <li><span className="font-bold text-black">Largo:</span> Desde el punto más alto del hombro hasta el dobladillo inferior.</li>
                  <li><span className="font-bold text-black">Manga:</span> Desde la costura del hombro hasta el final de la manga.</li>
                  <li><span className="font-bold text-black">Hombro:</span> De costura a costura en la parte superior.</li>
                </ul>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>,
    document.body
  ) : null
}
