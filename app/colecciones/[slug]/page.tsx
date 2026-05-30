import React from 'react'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { productsData, featuredImages, featuredImagesBack } from '@/lib/products'
import { CartActions } from '@/app/camisetas-personalizadas/[slug]/cart-actions'

interface Props {
  params: Promise<{ slug: string }>
}

// Collections categories mapping
const collectionsMap: Record<string, { name: string; title: string; desc: string }> = {
  anime: {
    name: 'Anime',
    title: 'Camisetas de Anime Premium — Colección Streetwear | Sublimarte',
    desc: 'Camisetas y sudaderas premium inspiradas en tus series y personajes favoritos de Anime. Estampados de alta durabilidad en cortes Oversize de tendencia.'
  },
  artistas: {
    name: 'Artistas',
    title: 'Camisetas de Bandas & Música Streetwear | Sublimarte Studio',
    desc: 'Estilo grunge, rock, rap y urbano premium. Colección exclusiva dedicada a los artistas de la música y la cultura que definen generaciones.'
  },
  deportes: {
    name: 'Deportes',
    title: 'Streetwear Deportivo y Skateboarding Retro | Sublimarte Studio',
    desc: 'Diseños urbanos premium inspirados en el baloncesto clásico, streetwear urbano y skateboarding. Alta calidad textil 100% de algodón peinado.'
  }
}

export async function generateStaticParams() {
  return Object.keys(collectionsMap).map((slug) => ({
    slug,
  }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const config = collectionsMap[slug]

  if (!config) {
    return {}
  }

  return {
    title: config.title,
    description: config.desc,
    alternates: {
      canonical: `https://sublimarte.sv/colecciones/${slug}`,
    },
    openGraph: {
      title: config.title,
      description: config.desc,
      url: `https://sublimarte.sv/colecciones/${slug}`,
      siteName: 'Sublimarte Studio',
      locale: 'es_SV',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: config.title,
      description: config.desc,
    },
  }
}

export default async function CollectionPage({ params }: Props) {
  const { slug } = await params
  const config = collectionsMap[slug]

  if (!config) {
    notFound()
  }

  // Filter products by category
  const filteredProducts = productsData.filter(
    (p) => p.category.toLowerCase() === config.name.toLowerCase()
  )

  // Construct schemas
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `https://sublimarte.sv/colecciones/${slug}/#webpage`,
        "url": `https://sublimarte.sv/colecciones/${slug}`,
        "name": config.title,
        "description": config.desc
      },
      {
        "@type": "BreadcrumbList",
        "@id": `https://sublimarte.sv/colecciones/${slug}/#breadcrumb`,
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Inicio",
            "item": "https://sublimarte.sv"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Colecciones",
            "item": `https://sublimarte.sv/#collections`
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": config.name,
            "item": `https://sublimarte.sv/colecciones/${slug}`
          }
        ]
      }
    ]
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Header Banner */}
      <section className="bg-black text-white py-16 md:py-24 px-4 relative overflow-hidden">
        <div className="absolute inset-0 opacity-15 pointer-events-none select-none">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
          <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-[#FFDE00] rounded-full filter blur-[120px] -translate-x-1/2 -translate-y-1/2" />
        </div>

        <div className="max-w-7xl mx-auto text-left relative z-10">
          <div className="flex items-center gap-2 mb-4 text-xs font-bold text-[#FFDE00] uppercase tracking-widest">
            <a href="/" className="hover:underline">Inicio</a>
            <span>/</span>
            <span>Colección</span>
          </div>

          <h1
            className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-4"
            style={{ fontFamily: 'var(--font-barlow-condensed)' }}
          >
            Colección {config.name}
          </h1>
          <p className="text-sm md:text-lg text-neutral-400 max-w-2xl leading-relaxed">
            {config.desc}
          </p>
        </div>
      </section>

      {/* Catalog Grid */}
      <section className="bg-white py-12 md:py-20 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          {filteredProducts.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-lg text-neutral-500 mb-4">No se encontraron productos en esta colección temporalmente.</p>
              <a href="/" className="bg-black text-white px-6 py-3 uppercase text-xs font-bold tracking-wider rounded-full hover:bg-[#FFDE00] hover:text-black transition-colors duration-300">
                Volver a inicio
              </a>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className="flex flex-col gap-2 md:gap-4 border border-neutral-100 p-2 md:p-4 rounded-2xl hover:shadow-2xl hover:shadow-neutral-900/5 hover:-translate-y-1 hover:border-neutral-200 transition-all duration-500 bg-white group/card"
                >
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

                  <CartActions
                    productId={product.id}
                    productName={product.name}
                    productPrice={product.price}
                    productImage={featuredImages[product.imageIdx]}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Trust & Delivery Ribbons */}
      <section className="bg-neutral-950 text-white py-12 px-4 md:px-8 border-t border-neutral-800">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
          <div className="flex flex-col gap-2">
            <span className="text-[#FFDE00] font-black text-lg">01. Envíos Rápidos</span>
            <p className="text-xs text-neutral-400 leading-relaxed">Enviamos a todo El Salvador vía Express. Envíos gratis por compras mayores a $50.00.</p>
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-[#FFDE00] font-black text-lg">02. Impresión Inalterable</span>
            <p className="text-xs text-neutral-400 leading-relaxed">Nuestra técnica de sublimación de alta definición garantiza colores que no se decoloran con el lavado.</p>
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-[#FFDE00] font-black text-lg">03. Mockup 3D Gratis</span>
            <p className="text-xs text-neutral-400 leading-relaxed">Mira cómo se verá tu prenda terminada en 3D antes de imprimirla, totalmente gratis por WhatsApp.</p>
          </div>
        </div>
      </section>
    </>
  )
}
