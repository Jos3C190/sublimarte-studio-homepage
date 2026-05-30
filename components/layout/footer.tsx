'use client'

import React from 'react'
import { getAssetPath } from '@/lib/utils'

export function Footer() {
  const socialLinks = [
    {
      name: 'Instagram',
      url: 'https://instagram.com/Sublimartestudio_25',
      icon: (
        <svg className="w-5 h-5 fill-none stroke-current" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
        </svg>
      )
    },
    {
      name: 'TikTok',
      url: 'https://tiktok.com/@sublimarte.studio',
      icon: (
        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M12.525.02c1.31.02 2.61-.01 3.91.02.08 1.53.63 3.02 1.62 4.17.92.97 2.19 1.54 3.49 1.74v3.58a8.311 8.311 0 0 1-5.12-1.8c-.03 2.87-.01 5.75-.02 8.62-.08 2.29-.98 4.54-2.67 6.1-2.07 1.98-5.13 2.76-7.9 2.01-2.6-.61-4.83-2.58-5.6-5.11-.97-3.07-.05-6.66 2.37-8.79 1.76-1.58 4.2-2.23 6.53-1.78v3.66c-1.39-.42-2.97-.04-4 1-.95.94-1.28 2.4-1 3.68.25 1.25 1.15 2.32 2.35 2.7 1.23.41 2.68.08 3.58-.87.89-.92 1.03-2.33.99-3.55v-16.5c.01-.01.01-.02.01-.03z"/>
        </svg>
      )
    },
    {
      name: 'WhatsApp',
      url: 'https://wa.me/50370581121',
      icon: (
        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.455 5.703 1.456h.004c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      )
    }
  ]

  const columns = [
    {
      title: 'Tienda',
      items: ['Catálogo', 'Colecciones', 'Nuevos', 'Ofertas'],
    },
    {
      title: 'Información',
      items: ['Sobre nosotros', 'Blog', 'FAQ', 'Envíos'],
    },
    {
      title: 'Legal',
      items: ['Términos', 'Privacidad', 'Cookies', 'Devoluciones'],
    },
    {
      title: 'Contacto',
      items: ['info@sublimarte.sv', 'WhatsApp: +503 7058-1121', 'Lunes-Viernes', '9:00 AM - 6:00 PM'],
    },
  ]

  return (
    <footer className="bg-black text-white py-12 md:py-20 px-4 md:px-8 border-t border-neutral-900 z-10 relative">
      <div className="max-w-7xl mx-auto">
        {/* TOP */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 mb-12 pb-12 border-b border-neutral-900">
          <div className="flex items-center h-16">
            <img
              src={getAssetPath('/logo.jpg')}
              alt="Sublimarte Studio Logo"
              className="h-full object-contain"
            />
          </div>
          <div className="flex items-center gap-5">
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-[#FFDE00] transition-all duration-300 flex items-center justify-center p-1.5 hover:scale-110 transform"
                aria-label={`Seguir en ${social.name}`}
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>

        {/* COLUMNS */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12 pb-12 border-b border-neutral-900 text-left">
          {columns.map((col, idx) => (
            <div key={idx}>
              <h4 className="text-xs uppercase tracking-widest font-black mb-4">{col.title}</h4>
              <ul className="flex flex-col gap-2">
                {col.items.map((item) => (
                  <li key={item}>
                    <a href="#" className="text-xs text-[#888888] hover:text-white transition-colors">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* BOTTOM */}
        <div className="text-center">
          <p className="text-xs text-[#888888] tracking-widest">
            © {new Date().getFullYear()} SUBLIMARTE STUDIO. TODOS LOS DERECHOS RESERVADOS.
          </p>
        </div>
      </div>
    </footer>
  )
}
