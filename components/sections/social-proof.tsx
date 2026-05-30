'use client'

import React from 'react'
import { motion } from 'framer-motion'

export function SocialProof() {
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const stats = [
    { stat: '+500', label: 'Diseños Exclusivos' },
    { stat: '100%', label: 'Envíos Nacionales' },
    { stat: 'Premium', label: 'Impresión de Gama Alta' },
    { stat: 'A Pedido', label: 'Personalizado Para Ti' },
  ]

  return (
    <section className="bg-black text-white py-16 md:py-28 px-4 md:px-8 border-t border-neutral-950 relative overflow-hidden">
      {/* Soft Ambient Light Orb */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-[#FFDE00]/2 blur-[150px] rounded-full pointer-events-none z-0" />

      <div className="max-w-5xl mx-auto text-center relative z-10">
        <motion.blockquote
          className="text-3xl sm:text-4xl md:text-6xl font-black uppercase tracking-tight leading-none mb-12 md:mb-20 select-none"
          style={{ fontFamily: 'var(--font-barlow-condensed)' }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          No vendemos solo camisetas.<br />
          <span className="font-extralight italic text-[#FFDE00] block mt-2 sm:mt-4">Vendemos identidad.</span>
        </motion.blockquote>

        <motion.div
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
        >
          {stats.map((item, idx) => (
            <motion.div
              key={idx}
              variants={fadeInUp}
              className="py-6 px-4 md:py-8 md:px-6 flex flex-col items-center justify-center gap-1 md:gap-2 border border-neutral-900 bg-[#060608]/60 rounded-2xl hover:border-neutral-800 hover:bg-[#0c0c0e]/80 transition-all duration-300 cursor-default"
            >
              <span className="text-2xl md:text-3xl lg:text-4xl font-black tracking-tight text-white">{item.stat}</span>
              <span className="text-[8px] md:text-[9px] tracking-[0.2em] text-neutral-500 uppercase font-bold text-center mt-1">{item.label}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
