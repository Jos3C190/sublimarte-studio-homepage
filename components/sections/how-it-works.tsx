'use client'

import React from 'react'
import { motion } from 'framer-motion'

export function HowItWorks() {
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

  const steps = [
    { num: '01', title: 'Elige tu diseño', desc: 'Explora nuestro catálogo exclusivo o envíanos tu propia idea y diseño por WhatsApp para confeccionarlo a tu gusto.' },
    { num: '02', title: 'Ajuste a tu medida', desc: 'Selecciona el corte que mejor se adapte a tu estilo: Oversize urbano, Ajuste regular o Slim.' },
    { num: '03', title: 'Pedido al instante', desc: 'Finaliza tu orden de forma directa y segura. Se genera tu pedido formateado directo a WhatsApp.' },
    { num: '04', title: 'Despacho Express', desc: 'Confeccionamos tu prenda con sublimación de alta gama y te la entregamos en tu domicilio en todo El Salvador.' },
  ]

  return (
    <section className="bg-white py-12 md:py-24 px-4 md:px-8 border-t border-neutral-100">
      <div className="max-w-7xl mx-auto">
        <motion.h2
          className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-12 md:mb-20 text-center"
          style={{ fontFamily: 'var(--font-barlow-condensed)' }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          ¿Cómo funciona?
        </motion.h2>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 relative text-left"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
        >
          {steps.map((step, idx) => (
            <motion.div
              key={idx}
              variants={fadeInUp}
              className="flex flex-col gap-4 pt-6 border-t border-neutral-200 hover:border-black transition-colors duration-500 group/step relative cursor-default"
            >
              <span className="text-xs font-mono font-bold text-neutral-400 group-hover/step:text-[#FFDE00] transition-colors duration-300">
                {step.num}
              </span>

              <div className="flex flex-col gap-1 mt-2">
                <h3 className="font-bold uppercase text-sm tracking-widest text-neutral-900 group-hover/step:text-black">
                  {step.title}
                </h3>
                <p className="text-xs text-neutral-500 leading-relaxed mt-1 group-hover/step:text-neutral-800 transition-colors duration-300">
                  {step.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
