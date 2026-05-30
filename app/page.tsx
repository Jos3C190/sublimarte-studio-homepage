import type { Metadata } from 'next'
import { HeroCarousel } from '../components/sections/hero-carousel'
import { FeaturedProducts } from '../components/sections/featured-products'
import { CustomDesignSection } from '../components/sections/custom-design'
import { NewArrivals } from '../components/sections/new-arrivals'
import { FeaturedCollections } from '../components/sections/featured-collections'
import { HowItWorks } from '../components/sections/how-it-works'
import { SocialProof } from '../components/sections/social-proof'
import { InstagramGallery } from '../components/sections/instagram-gallery'

export const metadata: Metadata = {
  title: 'Streetwear Premium El Salvador — Camisetas Personalizadas | Sublimarte Studio',
  description: 'Cotiza y compra camisetas personalizadas premium 100% algodón en El Salvador. Diseños únicos de anime, música y cultura urbana. ¡Mockup gratis en WhatsApp hoy!',
  keywords: [
    'streetwear el salvador',
    'camisetas personalizadas el salvador',
    'sublimacion premium',
    'camisetas de anime el salvador',
    'ropa oversize san salvador',
    'sublimarte studio'
  ],
  alternates: {
    canonical: 'https://sublimarte.sv',
  },
  openGraph: {
    title: 'Streetwear Premium El Salvador — Camisetas Personalizadas | Sublimarte Studio',
    description: 'Cotiza y compra camisetas personalizadas premium 100% algodón en El Salvador. Diseños únicos de anime, música y cultura urbana. ¡Mockup gratis en WhatsApp hoy!',
    url: 'https://sublimarte.sv',
    siteName: 'Sublimarte Studio',
    locale: 'es_SV',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Streetwear Premium El Salvador — Camisetas Personalizadas | Sublimarte Studio',
    description: 'Cotiza y compra camisetas personalizadas premium 100% algodón en El Salvador. Diseños únicos de anime, música y cultura urbana. ¡Mockup gratis en WhatsApp hoy!',
  },
}

export default function Page() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://sublimarte.sv/#organization",
        "name": "Sublimarte Studio",
        "url": "https://sublimarte.sv",
        "logo": {
          "@type": "ImageObject",
          "url": "https://sublimarte.sv/logo.jpg"
        },
        "sameAs": [
          "https://instagram.com/Sublimartestudio_25"
        ]
      },
      {
        "@type": "WebSite",
        "@id": "https://sublimarte.sv/#website",
        "url": "https://sublimarte.sv",
        "name": "Sublimarte Studio",
        "publisher": {
          "@id": "https://sublimarte.sv/#organization"
        }
      },
      {
        "@type": "ClothingStore",
        "@id": "https://sublimarte.sv/#store",
        "name": "Sublimarte Studio",
        "image": "https://sublimarte.sv/logo.jpg",
        "telephone": "+503 7058-1121",
        "priceRange": "$$",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Paseo General Escalón",
          "addressLocality": "San Salvador",
          "addressCountry": "SV"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": "13.7018",
          "longitude": "-89.2244"
        },
        "openingHoursSpecification": {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday"
          ],
          "opens": "09:00",
          "closes": "18:00"
        },
        "areaServed": {
          "@type": "Country",
          "name": "El Salvador"
        }
      },
      {
        "@type": "FAQPage",
        "@id": "https://sublimarte.sv/#faq",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "¿Hacen envíos a todo El Salvador?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Sí, realizamos envíos express a los 14 departamentos de El Salvador. El envío es completamente gratis por compras mayores a $50.00."
            }
          },
          {
            "@type": "Question",
            "name": "¿Puedo personalizar una prenda con mi propio diseño?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "¡Claro que sí! Puedes enviarnos tu logotipo, ilustración o fotografía favorita directamente por WhatsApp. Confeccionamos tu prenda en cortes premium (Oversize o Regular) y te enviamos un mockup digital 100% gratis para tu aprobación antes de estampar."
            }
          },
          {
            "@type": "Question",
            "name": "¿Qué tipo de tela y estampados utilizan?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Utilizamos camisetas confeccionadas con algodón premium 100% de alta densidad, ofreciendo una textura suave y duradera. Nuestros estampados emplean tecnología de sublimación avanzada que garantiza colores vibrantes y fidelidad absoluta que no se desgasta con las lavadas."
            }
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
      <div className="flex flex-col gap-0 bg-white">
        <HeroCarousel />
        <FeaturedProducts />
        <CustomDesignSection />
        <NewArrivals />
        <FeaturedCollections />
        <HowItWorks />
        <SocialProof />
        <InstagramGallery />
      </div>
    </>
  )
}
