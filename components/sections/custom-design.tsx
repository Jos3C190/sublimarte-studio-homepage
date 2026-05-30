'use client'

import React from 'react'

export function CustomDesignSection() {
  const handleScrollToCatalog = () => {
    const catalogSection = document.getElementById('catalog')
    catalogSection?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section id="personalizacion" className="bg-[#050505] text-white py-16 md:py-28 px-4 md:px-8 relative overflow-hidden border-t border-neutral-900">
      {/* Soft Ambient Light Orb */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[250px] h-[250px] bg-[#FFDE00]/3 blur-[120px] rounded-full pointer-events-none z-0" />

      <div className="max-w-2xl mx-auto text-center relative z-10 flex flex-col items-center gap-5 md:gap-7">
        <div className="text-[9px] uppercase tracking-[0.3em] text-[#FFDE00] font-black flex items-center gap-2 select-none">
          <span className="w-1.5 h-1.5 bg-[#FFDE00] rounded-full" />
          Servicio a Pedido
        </div>

        <h2
          className="text-3xl md:text-5xl font-black uppercase tracking-tight leading-none"
          style={{ fontFamily: 'var(--font-barlow-condensed)' }}
        >
          ¿Tienes tu propio diseño? <br />
          <span className="font-extralight italic text-[#FFDE00]">Lo hacemos realidad</span>
        </h2>

        <p className="text-xs md:text-sm leading-relaxed text-neutral-400 max-w-lg text-center font-normal">
          Envíanos tu ilustración, logotipo o fotografía favorita de forma directa. Confeccionamos tu prenda y te enviamos un mockup digital sin costo para tu aprobación antes de estampar.
        </p>

        {/* SIMPLIFIED CTA ACTION */}
        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto mt-2">
          <a
            href="https://wa.me/50370581121?text=Hola%20Sublimarte%20Studio%20%F0%9F%87%B8%F0%9F%87%B5%20Me%20gustar%C3%ADa%20personalizar%20una%20prenda%20con%20mi%20propio%20dise%C3%B1o.%20%C2%BFCu%C3%A1les%20son%20los%20requisitos%20y%20precios%3F%20%C2%A1Gracias%21"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#FFDE00] text-black px-8 py-3.5 uppercase text-[10px] font-black tracking-widest hover:bg-white hover:text-black transition-all duration-300 rounded-full hover:scale-105 transform active:scale-95 shadow-lg flex items-center justify-center gap-2.5 cursor-pointer"
          >
            {/* WhatsApp Icon */}
            <svg className="w-4 h-4 fill-current text-black" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.455 5.703 1.456h.004c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            WhatsApp
          </a>
          <button
            onClick={handleScrollToCatalog}
            className="border border-white/10 text-white hover:text-[#FFDE00] hover:border-[#FFDE00] px-8 py-3.5 uppercase text-[10px] font-black tracking-widest hover:bg-[#FFDE00]/5 transition-colors duration-300 rounded-full hover:scale-105 transform active:scale-95 cursor-pointer flex items-center justify-center"
          >
            Ver Catálogo
          </button>
        </div>
      </div>
    </section>
  )
}
