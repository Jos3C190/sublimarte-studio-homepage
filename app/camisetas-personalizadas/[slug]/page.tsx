import React from 'react'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { departmentsData, productsData, featuredImages, featuredImagesBack } from '@/lib/products'
import { CartActions } from './cart-actions'

interface Props {
  params: Promise<{ slug: string }>
}

// Generate static routes at compile-time for perfect INP and LCP
export async function generateStaticParams() {
  return departmentsData.map((dept) => ({
    slug: dept.slug,
  }))
}

// Generate rich, localized metadata for each department dynamically
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const dept = departmentsData.find((d) => d.slug === slug)

  if (!dept) {
    return {}
  }

  const title = `Camisetas Personalizadas en ${dept.name} — Streetwear Premium | Sublimarte Studio`
  const description = `${dept.description} Envíos express en ${dept.shippingTime} a ${dept.cities.slice(0, 3).join(', ')}. ¡Cotiza tu mockup gratis hoy!`

  return {
    title,
    description,
    keywords: dept.localKeywords,
    alternates: {
      canonical: `https://sublimarte.sv/camisetas-personalizadas/${dept.slug}`,
    },
    openGraph: {
      title,
      description,
      url: `https://sublimarte.sv/camisetas-personalizadas/${dept.slug}`,
      siteName: 'Sublimarte Studio',
      locale: 'es_SV',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  }
}

export default async function DepartmentPage({ params }: Props) {
  const { slug } = await params
  const dept = departmentsData.find((d) => d.slug === slug)

  if (!dept) {
    notFound()
  }

  // Construct localized JSON-LD
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ClothingStore",
        "@id": `https://sublimarte.sv/camisetas-personalizadas/${dept.slug}/#store`,
        "name": `Sublimarte Studio - ${dept.name}`,
        "description": dept.description,
        "image": "https://sublimarte.sv/logo.jpg",
        "telephone": "+503 7058-1121",
        "priceRange": "$$",
        "url": `https://sublimarte.sv/camisetas-personalizadas/${dept.slug}`,
        "address": {
          "@type": "PostalAddress",
          "streetAddress": dept.capital,
          "addressLocality": dept.name,
          "addressCountry": "SV"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": dept.latitude.toString(),
          "longitude": dept.longitude.toString()
        },
        "openingHoursSpecification": {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday"
          ],
          "opens": "09:00",
          "closes": "18:00"
        },
        "areaServed": {
          "@type": "AdministrativeArea",
          "name": dept.name,
          "containedInPlace": {
            "@type": "Country",
            "name": "El Salvador"
          }
        }
      },
      {
        "@type": "FAQPage",
        "@id": `https://sublimarte.sv/camisetas-personalizadas/${dept.slug}/#faq`,
        "mainEntity": [
          {
            "@type": "Question",
            "name": `¿Hacen entregas en todo el departamento de ${dept.name}?`,
            "acceptedAnswer": {
              "@type": "Answer",
              "text": `Sí, despachamos a todos los municipios y caseríos de ${dept.name}, incluyendo especialmente ${dept.cities.join(', ')}.`
            }
          },
          {
            "@type": "Question",
            "name": `¿Cuál es el tiempo de entrega para ${dept.name}?`,
            "acceptedAnswer": {
              "@type": "Answer",
              "text": `Nuestros envíos express toman aproximadamente ${dept.shippingTime} para llegar a ${dept.name}. Realizamos despachos utilizando ${dept.carrier}.`
            }
          },
          {
            "@type": "Question",
            "name": `¿Cómo solicito un diseño personalizado desde ${dept.name}?`,
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Es facilísimo. Haz clic en cualquiera de nuestros enlaces de WhatsApp, envíanos tu imagen o idea, indícanos si prefieres corte Oversize o Regular y te prepararemos un mockup digital 100% gratis para tu confirmación antes de estampar."
            }
          }
        ]
      }
    ]
  }

  // Double-check WhatsApp pre-filled text
  const waText = encodeURIComponent(`¡Hola! Me interesa cotizar una camiseta personalizada premium para enviar al departamento de ${dept.name}. Me gustaría saber más sobre el mockup digital gratis.`)
  const waLink = `https://wa.me/50370581121?text=${waText}`

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center bg-black text-white py-20 px-4 md:px-8 overflow-hidden">
        {/* Streetwear Background Design Elements */}
        <div className="absolute inset-0 opacity-20 pointer-events-none select-none">
          <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#FFDE00] rounded-full filter blur-[150px]" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-neutral-800 rounded-full filter blur-[150px]" />
          <div className="absolute inset-0 bg-[radial-gradient(#111111_1px,transparent_1px)] [background-size:16px_16px]" />
        </div>

        <div className="max-w-5xl mx-auto text-center relative z-10">
          <span className="inline-block bg-[#FFDE00] text-black text-xs font-black uppercase px-4 py-1.5 rounded-full mb-6 tracking-widest">
            Streetwear Premium & Sublimación
          </span>
          <h1
            className="text-5xl sm:text-6xl md:text-8xl font-black uppercase tracking-tighter mb-6 leading-none"
            style={{ fontFamily: 'var(--font-barlow-condensed)' }}
          >
            Camisetas <br />
            Personalizadas <br />
            <span className="text-[#FFDE00]">{dept.name}</span>
          </h1>
          <p className="text-sm md:text-lg text-neutral-300 max-w-2xl mx-auto mb-10 leading-relaxed">
            {dept.description} Estampados de alta durabilidad en telas premium de algodón peinado de alta densidad.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#FFDE00] text-black hover:bg-white text-xs md:text-sm font-black uppercase px-8 py-4 rounded-full tracking-widest transition-all duration-300 inline-block border-2 border-transparent hover:border-black cursor-pointer shadow-lg shadow-[#FFDE00]/10"
            >
              Cotizar Mockup Gratis por WhatsApp
            </a>
            <a
              href="#catalog"
              className="bg-transparent border-2 border-white hover:bg-white hover:text-black text-xs md:text-sm font-black uppercase px-8 py-4 rounded-full tracking-widest transition-all duration-300 inline-block cursor-pointer"
            >
              Ver Catálogo Destacado
            </a>
          </div>
        </div>
      </section>

      {/* Local Shipping Information Ribbon */}
      <section className="bg-[#FFDE00] text-black py-6 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 text-center divide-y md:divide-y-0 md:divide-x divide-black/10 font-bold uppercase tracking-wider text-xs md:text-sm">
          <div className="py-2 md:py-0">
            <p className="text-black/50 text-[10px] font-black tracking-widest mb-1">Área de Servicio</p>
            <p className="text-black">{dept.name} y Zonas Aledañas</p>
          </div>
          <div className="py-2 md:py-0">
            <p className="text-black/50 text-[10px] font-black tracking-widest mb-1">Tiempo de Entrega</p>
            <p className="text-black">{dept.shippingTime} Express</p>
          </div>
          <div className="py-2 md:py-0">
            <p className="text-black/50 text-[10px] font-black tracking-widest mb-1">Cobertura</p>
            <p className="text-black">{dept.carrier}</p>
          </div>
        </div>
      </section>

      {/* Step Guide Section */}
      <section className="bg-white py-16 md:py-24 px-4 md:px-8 border-b border-neutral-100">
        <div className="max-w-6xl mx-auto text-center">
          <h2
            className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-4"
            style={{ fontFamily: 'var(--font-barlow-condensed)' }}
          >
            ¿Cómo pedir tu camiseta personalizada?
          </h2>
          <p className="text-sm text-neutral-400 max-w-xl mx-auto mb-16">
            Proceso de diseño y fabricación ultra-rápido para todos los clientes en {dept.name}.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              {
                step: '01',
                title: 'Envía tu idea',
                desc: 'Escríbenos por WhatsApp y compártenos el diseño, frase o logo que quieras estampar.'
              },
              {
                step: '02',
                title: 'Elige tu corte',
                desc: 'Selecciona entre nuestros estilos premium: Oversize Streetwear o Regular Unisex.'
              },
              {
                step: '03',
                title: 'Mockup Digital Gratis',
                desc: 'Nuestros diseñadores preparan un bosquejo en 3D para tu revisión sin costo alguno.'
              },
              {
                step: '04',
                title: 'Envío a tu Puerta',
                desc: `Estampamos con la más alta definición y enviamos a ${dept.name} vía express.`
              }
            ].map((item, idx) => (
              <div key={idx} className="flex flex-col items-center md:items-start text-center md:text-left p-6 border border-neutral-100 rounded-2xl hover:shadow-xl hover:shadow-neutral-900/5 hover:-translate-y-1 transition-all duration-300">
                <span className="text-4xl md:text-5xl font-black text-[#FFDE00] mb-4" style={{ fontFamily: 'var(--font-barlow-condensed)' }}>{item.step}</span>
                <h3 className="font-extrabold uppercase text-sm tracking-wider mb-2">{item.title}</h3>
                <p className="text-xs text-neutral-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Catalog & Shopping Section */}
      <section id="catalog" className="bg-[#fafafa] py-16 md:py-24 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12 md:mb-16 text-left">
            <span className="text-[10px] md:text-xs uppercase tracking-widest text-[#FFDE00] font-black">Prendas Streetwear Listas para Enviar</span>
            <h2
              className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-4 mt-2"
              style={{ fontFamily: 'var(--font-barlow-condensed)' }}
            >
              Colección Destacada
            </h2>
            <p className="text-xs text-neutral-400">Los estilos favoritos de nuestros clientes en {dept.name}. Agrégalos al carrito o utilízalos como inspiración para tus diseños.</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
            {productsData.map((product) => (
              <div
                key={product.id}
                className="flex flex-col gap-2 md:gap-4 border border-neutral-100 p-2 md:p-4 rounded-2xl bg-white hover:shadow-2xl hover:shadow-neutral-900/5 hover:-translate-y-1 hover:border-neutral-200 transition-all duration-500 group/card"
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
                  <p className="text-xs text-neutral-400 hidden sm:block leading-relaxed">Streetwear premium confeccionado en 100% algodón de alta densidad.</p>
                </div>

                {/* Client Cart Actions Wrapper Component */}
                <CartActions 
                  productId={product.id} 
                  productName={product.name} 
                  productPrice={product.price} 
                  productImage={featuredImages[product.imageIdx]} 
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Local References and Cities Segment */}
      <section className="bg-black text-white py-16 md:py-24 px-4 md:px-8 relative overflow-hidden">
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2
            className="text-3xl md:text-5xl font-black uppercase tracking-tighter mb-6"
            style={{ fontFamily: 'var(--font-barlow-condensed)' }}
          >
            Envíos Express Cobertura Total en {dept.name}
          </h2>
          <p className="text-sm md:text-base text-neutral-400 mb-8 leading-relaxed max-w-2xl mx-auto">
            Hacemos entregas a todos los municipios, residenciales y caseríos de la zona. Contamos con entregas rápidas a domicilio y puntos de referencia locales.
          </p>

          <div className="flex flex-wrap justify-center gap-2 max-w-3xl mx-auto">
            {dept.cities.map((city, index) => (
              <span
                key={index}
                className="bg-neutral-900 border border-neutral-800 text-xs text-neutral-300 font-medium px-4 py-2 rounded-full hover:bg-[#FFDE00] hover:text-black hover:border-[#FFDE00] transition-all duration-300"
              >
                {city}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Localized FAQ Section */}
      <section className="bg-white py-16 md:py-24 px-4 md:px-8 border-t border-neutral-100">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-[10px] md:text-xs uppercase tracking-widest text-[#FFDE00] font-black">Resolvemos tus dudas</span>
            <h2
              className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-4 mt-2"
              style={{ fontFamily: 'var(--font-barlow-condensed)' }}
            >
              Preguntas Frecuentes ({dept.name})
            </h2>
            <p className="text-xs text-neutral-400">Todo lo que necesitas saber sobre el servicio de estampado personalizado en {dept.name}.</p>
          </div>

          <div className="space-y-6">
            {[
              {
                q: `¿Cuánto cuesta el envío a mi localidad en ${dept.name}?`,
                a: `Por compras superiores a $50.00, tu envío express en el departamento de ${dept.name} es totalmente GRATIS. Para compras menores de $50.00, el costo de envío es de tan solo $4.00 a cualquier dirección.`
              },
              {
                q: `¿Qué pasa si mi diseño no queda como esperaba?`,
                a: `¡No te preocupes! Nunca estampamos nada sin tu aprobación. Te preparamos un mockup digital 3D hiperrealista para que verifiques la posición, los colores y las proporciones. Puedes solicitar todos los cambios que desees antes del estampado final.`
              },
              {
                q: `¿Qué métodos de pago aceptan para pedidos de ${dept.name}?`,
                a: `Aceptamos transferencias bancarias de Banco Agrícola, BAC Credomatic, Banco Cuscatlán, pagos con Chivo Wallet, y tarjetas de crédito/débito directamente en nuestro portal. ¡100% seguro!`
              }
            ].map((faq, idx) => (
              <div key={idx} className="border-b border-neutral-100 pb-6 text-left">
                <h3 className="font-extrabold text-sm md:text-base uppercase tracking-wider mb-2 flex items-start gap-3">
                  <span className="text-[#FFDE00] font-black">Q.</span>
                  {faq.q}
                </h3>
                <p className="text-xs md:text-sm text-neutral-500 leading-relaxed pl-6">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
